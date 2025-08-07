const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../database/anime.db');

// Obtener todos los animes
router.get('/', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { search, genre, status, limit = 20, offset = 0 } = req.query;
  
  let query = 'SELECT * FROM anime WHERE 1=1';
  const params = [];
  
  if (search) {
    query += ' AND (title LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  
  if (genre) {
    query += ' AND genre LIKE ?';
    params.push(`%${genre}%`);
  }
  
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  
  query += ' ORDER BY rating DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
  
  db.close();
});

// Obtener anime por ID
router.get('/:id', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { id } = req.params;
  
  db.get('SELECT * FROM anime WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Anime no encontrado' });
      return;
    }
    res.json(row);
  });
  
  db.close();
});

// Obtener géneros únicos
router.get('/genres/list', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  db.all('SELECT DISTINCT genre FROM anime', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    const genres = rows
      .map(row => row.genre)
      .filter(genre => genre)
      .flatMap(genre => genre.split(', '))
      .filter((genre, index, arr) => arr.indexOf(genre) === index);
    
    res.json(genres);
  });
  
  db.close();
});

// Obtener animes populares
router.get('/popular/list', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  db.all('SELECT * FROM anime ORDER BY rating DESC LIMIT 10', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
  
  db.close();
});

// Obtener animes recientes
router.get('/recent/list', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  db.all('SELECT * FROM anime ORDER BY created_at DESC LIMIT 10', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
  
  db.close();
});

module.exports = router; 