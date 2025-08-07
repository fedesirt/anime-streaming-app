# 🔧 Configuración de Mercado Pago

## 📋 Pasos para configurar Mercado Pago

### 1. Crear cuenta en Mercado Pago
- Ve a [mercadopago.com.ar](https://mercadopago.com.ar)
- Crea una cuenta de vendedor
- Completa la verificación de identidad

### 2. Obtener credenciales
- Ve a tu panel de desarrolladores
- Obtén tu **Access Token** y **Public Key**
- Para pruebas usa las credenciales de sandbox

### 3. Configurar variables de entorno
Crea un archivo `.env` en la carpeta `server/` con:

```env
MERCADOPAGO_ACCESS_TOKEN=TEST-1234567890abcdef
MERCADOPAGO_PUBLIC_KEY=TEST-12345678-1234-1234-1234-123456789012
MERCADOPAGO_WEBHOOK_URL=https://animezone.com.ar/api/payments/webhook
```

### 4. Configurar webhook
- En tu panel de Mercado Pago
- Configura la URL del webhook: `https://animezone.com.ar/api/payments/webhook`
- Selecciona los eventos: `payment` y `payment.updated`

### 5. Probar pagos
- Usa las tarjetas de prueba de Mercado Pago
- **Visa**: 4509 9535 6623 3704
- **Mastercard**: 5031 4332 1540 6351
- **American Express**: 3711 8030 3257 522

## 💰 Precios configurados
- **Plan Premium Mensual**: $3,500 ARS
- **Plan Premium Anual**: $25,000 ARS

## 🔄 Flujo de pago
1. Usuario selecciona un plan
2. Se crea una preferencia de pago
3. Usuario es redirigido a Mercado Pago
4. Usuario completa el pago
5. Mercado Pago notifica via webhook
6. Se activa la suscripción automáticamente

## ⚠️ Notas importantes
- Los pagos van directamente a tu cuenta de Mercado Pago
- El webhook debe ser accesible desde internet
- Para desarrollo local, usa ngrok para exponer el webhook
- Las credenciales de prueba no procesan pagos reales
