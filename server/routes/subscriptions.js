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

// Obtener todos los planes de suscripción
router.get('/plans', async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  db.all('SELECT * FROM subscription_plans WHERE is_active = 1 ORDER BY price ASC', (err, plans) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(plans);
  });
  
  db.close();
});

// Obtener suscripción actual del usuario
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
  
  db.get(query, [req.user.userId], (err, subscription) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!subscription) {
      res.json({ 
        subscription: null, 
        status: 'free',
        message: 'No tienes suscripción activa' 
      });
      return;
    }
    
    // Verificar si la suscripción ha expirado
    const now = new Date();
    const endDate = new Date(subscription.end_date);
    
    if (endDate < now) {
      // Marcar suscripción como expirada
      db.run('UPDATE subscriptions SET status = ? WHERE id = ?', ['expired', subscription.id]);
      res.json({ 
        subscription: null, 
        status: 'expired',
        message: 'Tu suscripción ha expirado' 
      });
    } else {
      res.json({ 
        subscription,
        status: 'active',
        daysRemaining: Math.ceil((endDate - now) / (1000 * 60 * 60 * 24))
      });
    }
  });
  
  db.close();
});

// Crear nueva suscripción
router.post('/subscribe', authenticateToken, async (req, res) => {
  const { planId, paymentMethod } = req.body;
  
  if (!planId) {
    return res.status(400).json({ error: 'Plan ID es requerido' });
  }
  
  const db = new sqlite3.Database(dbPath);
  
  // Obtener información del plan
  db.get('SELECT * FROM subscription_plans WHERE id = ? AND is_active = 1', [planId], (err, plan) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!plan) {
      res.status(404).json({ error: 'Plan no encontrado' });
      return;
    }
    
    // Calcular fecha de fin de suscripción
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (plan.duration_days * 24 * 60 * 60 * 1000));
    
    // Crear la suscripción
    const insertQuery = `
      INSERT INTO subscriptions (user_id, plan_id, end_date, payment_method, amount_paid)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(insertQuery, [
      req.user.userId,
      planId,
      endDate.toISOString(),
      paymentMethod || 'tarjeta',
      plan.price
    ], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      // Actualizar estado de suscripción del usuario
      const updateUserQuery = `
        UPDATE users 
        SET subscription_status = 'premium', subscription_end_date = ?
        WHERE id = ?
      `;
      
      db.run(updateUserQuery, [endDate.toISOString(), req.user.userId], (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        
        res.json({
          message: 'Suscripción creada exitosamente',
          subscription: {
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

// Cancelar suscripción
router.post('/cancel', authenticateToken, async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  // Marcar suscripción como cancelada
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
      SET subscription_status = 'free', subscription_end_date = NULL
      WHERE id = ?
    `;
    
    db.run(updateUserQuery, [req.user.userId], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({ message: 'Suscripción cancelada exitosamente' });
    });
  });
  
  db.close();
});

// Obtener historial de suscripciones
router.get('/history', authenticateToken, async (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  const query = `
    SELECT s.*, sp.name as plan_name, sp.price
    FROM subscriptions s
    JOIN subscription_plans sp ON s.plan_id = sp.id
    WHERE s.user_id = ?
    ORDER BY s.created_at DESC
  `;
  
  db.all(query, [req.user.userId], (err, subscriptions) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(subscriptions);
  });
  
  db.close();
});

// Verificar acceso a contenido premium
router.get('/check-access/:animeId', authenticateToken, async (req, res) => {
  const { animeId } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  // Verificar si el anime requiere suscripción
  db.get('SELECT requires_subscription FROM anime WHERE id = ?', [animeId], (err, anime) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!anime) {
      res.status(404).json({ error: 'Anime no encontrado' });
      return;
    }
    
    // Si no requiere suscripción, permitir acceso
    if (!anime.requires_subscription) {
      res.json({ hasAccess: true, reason: 'Contenido gratuito' });
      return;
    }
    
    // Verificar si el usuario tiene suscripción activa
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
        res.json({ hasAccess: true, reason: 'Suscripción activa' });
      } else {
        res.json({ 
          hasAccess: false, 
          reason: 'Se requiere suscripción premium',
          message: 'Este contenido requiere una suscripción premium'
        });
      }
    });
  });
  
  db.close();
});

module.exports = router;
