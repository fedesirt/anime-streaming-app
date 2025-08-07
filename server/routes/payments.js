const express = require('express');
const router = express.Router();
const { client, Preference, config } = require('../config/mercadopago');
const { authenticateToken } = require('../middleware/auth');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../database/anime.db'));

// Crear preferencia de pago
router.post('/create-preference', authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body;
    
    // Obtener información del plan
    db.get('SELECT * FROM subscription_plans WHERE id = ?', [planId], async (err, plan) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener el plan' });
      }
      
      if (!plan) {
        return res.status(404).json({ error: 'Plan no encontrado' });
      }

      // Crear preferencia de Mercado Pago
      const preference = new Preference(client);
      
      const preferenceData = {
        items: [
          {
            title: plan.name,
            unit_price: plan.price,
            quantity: 1,
            currency_id: 'ARS'
          }
        ],
        back_urls: {
          success: `${req.protocol}://${req.get('host')}/subscription/success`,
          failure: `${req.protocol}://${req.get('host')}/subscription/failure`,
          pending: `${req.protocol}://${req.get('host')}/subscription/pending`
        },
        auto_return: 'approved',
        external_reference: `user_${req.user.id}_plan_${planId}`,
        notification_url: config.webhookUrl,
        expires: true,
        expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
      };

      const response = await preference.create({ body: preferenceData });
      
      res.json({
        preferenceId: response.id,
        publicKey: config.publicKey,
        initPoint: response.init_point
      });
    });
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).json({ error: 'Error al crear la preferencia de pago' });
  }
});

// Webhook para recibir notificaciones de Mercado Pago
router.post('/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      
      // Obtener información del pago usando la nueva API
      const { Payment } = require('mercadopago');
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id: paymentId });
      
      if (paymentInfo.status === 'approved') {
        const externalReference = paymentInfo.external_reference;
        const [userId, planId] = externalReference.split('_').slice(1);
        
        // Activar suscripción
        const plan = await new Promise((resolve, reject) => {
          db.get('SELECT * FROM subscription_plans WHERE id = ?', [planId], (err, plan) => {
            if (err) reject(err);
            else resolve(plan);
          });
        });
        
        if (plan) {
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + plan.duration_days);
          
          // Insertar suscripción
          db.run(
            'INSERT INTO subscriptions (user_id, plan_id, start_date, end_date, status, payment_method, amount_paid) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, planId, new Date().toISOString(), endDate.toISOString(), 'active', 'mercadopago', plan.price],
            (err) => {
              if (err) {
                console.error('Error inserting subscription:', err);
              } else {
                console.log(`Suscripción activada para usuario ${userId}, plan ${planId}`);
              }
            }
          );
          
          // Actualizar estado del usuario
          db.run(
            'UPDATE users SET subscription_status = ?, subscription_end_date = ? WHERE id = ?',
            ['premium', endDate.toISOString(), userId]
          );
        }
      }
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error');
  }
});

// Verificar estado del pago
router.get('/payment-status/:paymentId', authenticateToken, async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { Payment } = require('mercadopago');
    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: paymentId });
    
    res.json({
      status: paymentInfo.status,
      externalReference: paymentInfo.external_reference
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ error: 'Error al verificar el estado del pago' });
  }
});

module.exports = router;
