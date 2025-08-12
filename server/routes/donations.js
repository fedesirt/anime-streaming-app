const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../database/anime.db');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt_super_seguro';

// Middleware para verificar token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Obtener todas las opciones de donación
router.get('/options', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  db.all('SELECT * FROM subscription_plans WHERE is_active = 1 ORDER BY price ASC', (err, options) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(options);
  });
  
  db.close();
});

// Obtener acceso premium actual del usuario
router.get('/current', authenticateToken, async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  const query = `
    SELECT s.*, sp.name as plan_name, sp.price, sp.features
    FROM subscriptions s
    JOIN subscription_plans sp ON s.plan_id = sp.id
    WHERE s.user_id = ? AND s.status = 'active'
    ORDER BY s.end_date DESC
    LIMIT 1
  `;
  
  db.get(query, [req.user.userId], (err, donation) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!donation) {
      res.json({ 
        donation: null, 
        status: 'free',
        message: 'No tienes acceso premium activo' 
      });
      return;
    }
    
    // Verificar si el acceso premium ha expirado
    const now = new Date();
    const endDate = new Date(donation.end_date);
    
    if (endDate < now) {
      // Marcar acceso premium como expirado
      db.run('UPDATE subscriptions SET status = ? WHERE id = ?', ['expired', donation.id]);
      res.json({ 
        donation: null, 
        status: 'expired',
        message: 'Tu acceso premium ha expirado' 
      });
    } else {
      res.json({ 
        donation,
        status: 'active',
        daysRemaining: Math.ceil((endDate - now) / (1000 * 60 * 60 * 24))
      });
    }
  });
  
  db.close();
});

// Crear nuevo acceso premium
router.post('/create', authenticateToken, async (req, res) => {
  const { planId, paymentMethod } = req.body;
  
  if (!planId) {
    return res.status(400).json({ error: 'ID de opción de donación es requerido' });
  }
  
  const db = new sqlite3.Database(dbPath);
  
  // Obtener información de la opción de donación
  db.get('SELECT * FROM subscription_plans WHERE id = ? AND is_active = 1', [planId], (err, plan) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!plan) {
      res.status(404).json({ error: 'Opción de donación no encontrada' });
      return;
    }
    
    // Calcular fecha de fin de acceso premium
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (plan.duration_days * 24 * 60 * 60 * 1000));
    
    // Crear el acceso premium
    const insertQuery = `
      INSERT INTO subscriptions (user_id, plan_id, end_date, payment_method, amount_paid)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(insertQuery, [
      req.user.userId,
      planId,
      endDate.toISOString(),
      paymentMethod || 'mercadopago',
      plan.price
    ], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      // Actualizar estado de acceso premium del usuario
      const updateUserQuery = `
        UPDATE users 
        SET premium_access_status = 'premium', premium_access_end_date = ?
        WHERE id = ?
      `;
      
      db.run(updateUserQuery, [endDate.toISOString(), req.user.userId], (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        
        res.json({
          message: 'Acceso premium creado exitosamente',
          donation: {
            id: this.lastID,
            planName: plan.name,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            amount: plan.price
          }
        });
      });
    });
  });
  
  db.close();
});

// Cancelar acceso premium
router.post('/cancel', authenticateToken, async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  // Marcar acceso premium como cancelado
  const updateQuery = `
    UPDATE subscriptions 
    SET status = 'cancelled' 
    WHERE user_id = ? AND status = 'active'
  `;
  
  db.run(updateQuery, [req.user.userId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Actualizar estado del usuario
    const updateUserQuery = `
      UPDATE users 
      SET premium_access_status = 'free', premium_access_end_date = NULL
      WHERE id = ?
    `;
    
    db.run(updateUserQuery, [req.user.userId], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({ message: 'Acceso premium cancelado exitosamente' });
    });
  });
  
  db.close();
});

// Obtener historial de donaciones
router.get('/history', authenticateToken, async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  const query = `
    SELECT s.*, sp.name as plan_name, sp.price
    FROM subscriptions s
    JOIN subscription_plans sp ON s.plan_id = sp.id
    WHERE s.user_id = ?
    ORDER BY s.created_at DESC
  `;
  
  db.all(query, [req.user.userId], (err, donations) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(donations);
  });
  
  db.close();
});

// Verificar acceso a contenido premium
router.get('/check-access/:animeId', authenticateToken, async (req, res) => {
  const { animeId } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  // Verificar si el anime requiere acceso premium
  db.get('SELECT requires_subscription FROM anime WHERE id = ?', [animeId], (err, anime) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!anime) {
      res.status(404).json({ error: 'Anime no encontrado' });
      return;
    }
    
    // Si no requiere acceso premium, permitir acceso
    if (!anime.requires_subscription) {
      res.json({ hasAccess: true, reason: 'Contenido gratuito' });
      return;
    }
    
    // Verificar si el usuario tiene acceso premium activo
    const subscriptionQuery = `
      SELECT s.* FROM subscriptions s
      WHERE s.user_id = ? AND s.status = 'active' AND s.end_date > datetime('now')
      ORDER BY s.end_date DESC
      LIMIT 1
    `;
    
    db.get(subscriptionQuery, [req.user.userId], (err, subscription) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (subscription) {
        res.json({ hasAccess: true, reason: 'Acceso premium activo' });
      } else {
        res.json({ 
          hasAccess: false, 
          reason: 'Se requiere acceso premium',
          message: 'Este contenido requiere acceso premium'
        });
      }
    });
  });
  
  db.close();
});

module.exports = router;
