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
const PORT = config.port;

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
  res.json({ message: 'API de Anime Streaming funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Inicializar base de datos y arrancar servidor
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`🌐 Dominio configurado: ${config.domain}`);
    console.log(`📺 API de Anime Streaming lista`);
    console.log(`🔗 URL: http://${config.domain}:${PORT}`);
  });
}).catch(err => {
  console.error('Error inicializando la base de datos:', err);
}); 