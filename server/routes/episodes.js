const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { authenticateToken } = require('../middleware/auth');

const db = new sqlite3.Database(path.join(__dirname, '../database/anime.db'));

// Obtener todas las temporadas de un anime
router.get('/anime/:animeId/seasons', async (req, res) => {
  try {
    const { animeId } = req.params;
    
    db.all(`
      SELECT s.*, COUNT(e.id) as episode_count 
      FROM seasons s 
      LEFT JOIN episodes e ON s.id = e.season_id 
      WHERE s.anime_id = ? 
      GROUP BY s.id 
      ORDER BY s.season_number
    `, [animeId], (err, seasons) => {
      if (err) {
        console.error('Error obteniendo temporadas:', err);
        return res.status(500).json({ error: 'Error al obtener las temporadas' });
      }
      
      res.json(seasons);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener episodios de una temporada
router.get('/season/:seasonId/episodes', async (req, res) => {
  try {
    const { seasonId } = req.params;
    
    db.all(`
      SELECT e.*, s.title as season_title, a.title as anime_title 
      FROM episodes e 
      JOIN seasons s ON e.season_id = s.id 
      JOIN anime a ON e.anime_id = a.id 
      WHERE e.season_id = ? 
      ORDER BY e.episode_number
    `, [seasonId], (err, episodes) => {
      if (err) {
        console.error('Error obteniendo episodios:', err);
        return res.status(500).json({ error: 'Error al obtener los episodios' });
      }
      
      res.json(episodes);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener un episodio específico
router.get('/episode/:episodeId', async (req, res) => {
  try {
    const { episodeId } = req.params;
    
    db.get(`
      SELECT e.*, s.title as season_title, a.title as anime_title, a.image_url as anime_image 
      FROM episodes e 
      JOIN seasons s ON e.season_id = s.id 
      JOIN anime a ON e.anime_id = a.id 
      WHERE e.id = ?
    `, [episodeId], (err, episode) => {
      if (err) {
        console.error('Error obteniendo episodio:', err);
        return res.status(500).json({ error: 'Error al obtener el episodio' });
      }
      
      if (!episode) {
        return res.status(404).json({ error: 'Episodio no encontrado' });
      }
      
      res.json(episode);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener episodios recientes
router.get('/recent', async (req, res) => {
  try {
    db.all(`
      SELECT e.*, s.title as season_title, a.title as anime_title, a.image_url as anime_image 
      FROM episodes e 
      JOIN seasons s ON e.season_id = s.id 
      JOIN anime a ON e.anime_id = a.id 
      ORDER BY e.created_at DESC 
      LIMIT 20
    `, (err, episodes) => {
      if (err) {
        console.error('Error obteniendo episodios recientes:', err);
        return res.status(500).json({ error: 'Error al obtener los episodios recientes' });
      }
      
      res.json(episodes);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener progreso de reproducción de un usuario
router.get('/watch-progress/:episodeId', authenticateToken, async (req, res) => {
  try {
    const { episodeId } = req.params;
    const userId = req.user.id;
    
    db.get(`
      SELECT * FROM watch_history 
      WHERE user_id = ? AND episode_id = ?
    `, [userId, episodeId], (err, progress) => {
      if (err) {
        console.error('Error obteniendo progreso:', err);
        return res.status(500).json({ error: 'Error al obtener el progreso' });
      }
      
      res.json(progress || { progress: 0, completed: false });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Guardar progreso de reproducción
router.post('/watch-progress', authenticateToken, async (req, res) => {
  try {
    const { episodeId, progress, completed } = req.body;
    const userId = req.user.id;
    
    db.run(`
      INSERT OR REPLACE INTO watch_history (user_id, episode_id, progress, completed, last_watched) 
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [userId, episodeId, progress, completed ? 1 : 0], function(err) {
      if (err) {
        console.error('Error guardando progreso:', err);
        return res.status(500).json({ error: 'Error al guardar el progreso' });
      }
      
      res.json({ success: true, id: this.lastID });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener historial de reproducción del usuario
router.get('/watch-history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    db.all(`
      SELECT wh.*, e.title as episode_title, e.episode_number, 
             s.title as season_title, a.title as anime_title, a.image_url as anime_image
      FROM watch_history wh 
      JOIN episodes e ON wh.episode_id = e.id 
      JOIN seasons s ON e.season_id = s.id 
      JOIN anime a ON e.anime_id = a.id 
      WHERE wh.user_id = ? 
      ORDER BY wh.last_watched DESC 
      LIMIT 50
    `, [userId], (err, history) => {
      if (err) {
        console.error('Error obteniendo historial:', err);
        return res.status(500).json({ error: 'Error al obtener el historial' });
      }
      
      res.json(history);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
