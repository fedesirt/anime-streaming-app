const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const animeRoutes = require('./routes/anime');
const userRoutes = require('./routes/users');
const subscriptionRoutes = require('./routes/subscriptions');
const paymentRoutes = require('./routes/payments');
const episodeRoutes = require('./routes/episodes');
const { initializeDatabase } = require('./database/init');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || config.port || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors(config.cors));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/anime', animeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/episodes', episodeRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Anime Streaming funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Algo salió mal!',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Inicializar base de datos y arrancar servidor
initializeDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📺 API de Anime Streaming lista`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error inicializando la base de datos:', err);
  process.exit(1);
}); 