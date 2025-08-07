// Configuración de entorno para la aplicación
export const ENV_CONFIG = {
  // URL de la API backend
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  
  // URL del frontend
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
  
  // Entorno
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // API Keys
  YOUTUBE_API_KEY: process.env.REACT_APP_YOUTUBE_API_KEY || '',
  
  // Configuración de MercadoPago
  MERCADOPAGO_PUBLIC_KEY: process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY || '',
  
  // Configuración de la aplicación
  APP_NAME: 'AnimeZone',
  APP_VERSION: '1.0.0'
};

// Función para obtener la URL completa de la API
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = ENV_CONFIG.API_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Función para verificar si estamos en desarrollo
export const isDevelopment = (): boolean => {
  return ENV_CONFIG.NODE_ENV === 'development';
};

// Función para verificar si estamos en producción
export const isProduction = (): boolean => {
  return ENV_CONFIG.NODE_ENV === 'production';
};
