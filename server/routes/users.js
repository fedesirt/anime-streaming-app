const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../database/anime.db');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt_super_seguro';

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = new sqlite3.Database(dbPath);
    
    db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            res.status(400).json({ error: 'Usuario o email ya existe' });
          } else {
            res.status(500).json({ error: err.message });
          }
          return;
        }
        
        const token = jwt.sign({ userId: this.lastID }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ 
          message: 'Usuario registrado exitosamente',
          token,
          user: { id: this.lastID, username, email }
        });
      }
    );
    
    db.close();
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }
  
  const db = new sqlite3.Database(dbPath);
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }
    
    try {
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }
      
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
      res.json({
        message: 'Login exitoso',
        token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  db.close();
});

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

// Obtener favoritos del usuario
router.get('/favorites', authenticateToken, (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  db.all(`
    SELECT a.* FROM anime a
    INNER JOIN favorites f ON a.id = f.anime_id
    WHERE f.user_id = ?
    ORDER BY f.created_at DESC
  `, [req.user.userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
  
  db.close();
});

// Agregar anime a favoritos
router.post('/favorites/:animeId', authenticateToken, (req, res) => {
  const { animeId } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  db.run(
    'INSERT INTO favorites (user_id, anime_id) VALUES (?, ?)',
    [req.user.userId, animeId],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(400).json({ error: 'Anime ya está en favoritos' });
        } else {
          res.status(500).json({ error: err.message });
        }
        return;
      }
      res.json({ message: 'Anime agregado a favoritos' });
    }
  );
  
  db.close();
});

// Remover anime de favoritos
router.delete('/favorites/:animeId', authenticateToken, (req, res) => {
  const { animeId } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  db.run(
    'DELETE FROM favorites WHERE user_id = ? AND anime_id = ?',
    [req.user.userId, animeId],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Anime removido de favoritos' });
    }
  );
  
  db.close();
});

module.exports = router; 