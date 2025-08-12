const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configuración de Mercado Pago para Donaciones
// Reemplaza con tus credenciales reales de Mercado Pago
const config = {
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-1234567890abcdef',
  publicKey: process.env.MERCADOPAGO_PUBLIC_KEY || 'TEST-12345678-1234-1234-1234-123456789012',
  webhookUrl: process.env.MERCADOPAGO_WEBHOOK_URL || 'https://animezone.com.ar/api/payments/webhook',
  alias: process.env.MERCADOPAGO_ALIAS || 'fedesirt.mp'
};

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: config.accessToken
});

module.exports = {
  client,
  Preference,
  config
};
