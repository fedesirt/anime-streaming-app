// Configuración de entorno para el servidor
module.exports = {
  PORT: process.env.PORT || 5000,
  DOMAIN: process.env.DOMAIN || 'localhost',
  JWT_SECRET: process.env.JWT_SECRET || 'tu_secreto_super_seguro_animezone_2024',
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Configuración de MercadoPago
  MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  MERCADOPAGO_PUBLIC_KEY: process.env.MERCADOPAGO_PUBLIC_KEY || '',
  
  // Configuración de la base de datos
  DATABASE_URL: process.env.DATABASE_URL || './database/anime.db',
  
  // Configuración de CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};





