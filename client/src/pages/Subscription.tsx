import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, CreditCard, Calendar, Star } from 'lucide-react';
import axios from 'axios';

interface Plan {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  features: string;
}

interface UserSubscription {
  id: number;
  plan_name: string;
  start_date: string;
  end_date: string;
  amount_paid: number;
  status: string;
}

const Subscription: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchPlans();
    fetchCurrentSubscription();
  }, [user, navigate]);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/subscriptions/plans');
      setPlans(response.data);
    } catch (error: any) {
      setError('Error al cargar los planes');
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const response = await axios.get('/api/subscriptions/current', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentSubscription(response.data.subscription);
    } catch (error: any) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: number) => {
    setSubscribing(true);
    setError('');
    setSuccess('');

    try {
      // Crear preferencia de pago con Mercado Pago
      const response = await axios.post('/api/payments/create-preference', 
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Redirigir a Mercado Pago
      window.location.href = response.data.initPoint;
      
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error al procesar el pago');
      setSubscribing(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('¿Estás seguro de que quieres cancelar tu suscripción?')) {
      return;
    }

    try {
      await axios.post('/api/subscriptions/cancel', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess('Suscripción cancelada exitosamente');
      fetchCurrentSubscription();
      
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error al cancelar la suscripción');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Planes de Suscripción
          </h1>
          <p className="text-gray-300 text-lg">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Suscripción actual */}
        {currentSubscription && (
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Tu Suscripción Actual
                </h3>
                <p className="text-red-100">
                  Plan: <span className="font-semibold">{currentSubscription.plan_name}</span>
                </p>
                <p className="text-red-100">
                  Válida hasta: {new Date(currentSubscription.end_date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={handleCancelSubscription}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancelar Suscripción
              </button>
            </div>
          </div>
        )}

        {/* Planes */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-dark-800 rounded-lg p-6 border-2 transition-all hover:scale-105 ${
                plan.price > 0 
                  ? 'border-red-500 hover:border-red-400' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              {/* Header del plan */}
              <div className="text-center mb-6">
                {plan.price > 0 && (
                  <div className="inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                    <Crown className="w-4 h-4 mr-2" />
                    Premium
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                
                                 <div className="text-3xl font-bold text-white mb-1">
                   ${plan.price.toLocaleString('es-AR')}
                   <span className="text-lg text-gray-400">
                     {plan.duration_days > 0 ? '/mes' : ''}
                   </span>
                 </div>
                
                {plan.duration_days > 0 && (
                  <p className="text-gray-400">
                    {plan.duration_days === 30 ? 'Mensual' : 'Anual'}
                  </p>
                )}
              </div>

              {/* Características */}
              <div className="mb-6">
                <ul className="space-y-3">
                  {plan.features.split(',').map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón de acción */}
              <div className="text-center">
                {currentSubscription ? (
                  <button
                    disabled
                    className="bg-gray-600 text-gray-400 px-6 py-3 rounded-lg cursor-not-allowed"
                  >
                    Ya tienes una suscripción
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={subscribing || plan.price === 0}
                                         className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                       plan.price > 0
                         ? 'bg-red-600 hover:bg-red-700 text-white'
                         : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                     }`}
                   >
                     {subscribing ? 'Procesando...' : plan.price === 0 ? 'Plan Gratuito' : `Pagar $${plan.price.toLocaleString('es-AR')}`}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-dark-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            ¿Por qué suscribirse?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <Star className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Contenido Exclusivo</h4>
                <p className="text-gray-300">
                  Acceso a animes premium que no están disponibles en el plan gratuito
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CreditCard className="w-6 h-6 text-green-500 mr-3 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Sin Anuncios</h4>
                <p className="text-gray-300">
                  Disfruta de tu contenido favorito sin interrupciones publicitarias
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="w-6 h-6 text-blue-500 mr-3 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Cancelación Gratuita</h4>
                <p className="text-gray-300">
                  Cancela tu suscripción en cualquier momento sin penalización
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Crown className="w-6 h-6 text-purple-500 mr-3 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Calidad Premium</h4>
                <p className="text-gray-300">
                  Mejor calidad de video y audio en todos los dispositivos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
