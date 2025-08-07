const env = require('./env.config');

const config = {
  // Configuración del servidor
  port: env.PORT,
  
  // Configuración del dominio
  domain: env.DOMAIN,
  
  // Configuración de CORS
  cors: {
    origin: [
      'http://localhost:3000',
      `http://${env.DOMAIN}`,
      `https://${env.DOMAIN}`,
      env.CORS_ORIGIN
    ].filter(Boolean),
    credentials: true
  },
  
  // Configuración de la base de datos
  database: {
    path: './database/anime.db'
  },
  
  // Configuración JWT
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '7d'
  }
};

module.exports = config;
