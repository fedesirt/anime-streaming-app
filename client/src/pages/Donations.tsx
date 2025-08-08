import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, CreditCard, Calendar, Star } from 'lucide-react';
import axios from 'axios';

interface DonationOption {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  features: string;
}

interface UserDonation {
  id: number;
  plan_name: string;
  start_date: string;
  end_date: string;
  amount_paid: number;
  status: string;
}

const Donations: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [donationOptions, setDonationOptions] = useState<DonationOption[]>([]);
  const [currentDonation, setCurrentDonation] = useState<UserDonation | null>(null);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchDonationOptions();
    fetchCurrentDonation();
  }, [user, navigate, fetchDonationOptions, fetchCurrentDonation]);

  const fetchDonationOptions = useCallback(async () => {
    try {
      const response = await axios.get('/api/donations/options');
      setDonationOptions(response.data);
    } catch (error: any) {
      setError('Error al cargar las opciones de donación');
    }
  }, []);

  const fetchCurrentDonation = useCallback(async () => {
    try {
      const response = await axios.get('/api/donations/current', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentDonation(response.data.donation);
    } catch (error: any) {
      console.error('Error fetching donation:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDonate = async (optionId: number) => {
    setDonating(true);
    setError('');
    setSuccess('');

    try {
      // Crear donación con Mercado Pago
      const response = await axios.post('/api/payments/create-donation', 
        { planId: optionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Redirigir a Mercado Pago
      window.location.href = response.data.initPoint;
      
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error al procesar la donación');
      setDonating(false);
    }
  };

  const handleCancelDonation = async () => {
    if (!window.confirm('¿Estás seguro de que quieres cancelar tu acceso premium?')) {
      return;
    }

    try {
      await axios.post('/api/donations/cancel', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess('Acceso premium cancelado exitosamente');
      fetchCurrentDonation();
      
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error al cancelar el acceso premium');
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
            Opciones de Donación
          </h1>
          <p className="text-gray-300 text-lg">
            Apoya el proyecto y obtén acceso premium a todo el contenido
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

        {/* Acceso premium actual */}
        {currentDonation && (
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Tu Acceso Premium Actual
                </h3>
                <p className="text-red-100">
                  Donación: <span className="font-semibold">{currentDonation.plan_name}</span>
                </p>
                <p className="text-red-100">
                  Válido hasta: {new Date(currentDonation.end_date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={handleCancelDonation}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancelar Acceso
              </button>
            </div>
          </div>
        )}

        {/* Opciones de donación */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {donationOptions.map((option) => (
            <div
              key={option.id}
              className="bg-dark-800 rounded-lg p-6 border-2 transition-all hover:scale-105 border-red-500 hover:border-red-400"
            >
              {/* Header de la opción */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {option.name}
                </h3>
                
                <div className="text-3xl font-bold text-white mb-1">
                  ${option.price.toLocaleString('es-AR')}
                </div>
                
                <p className="text-gray-400">
                  {option.duration_days} días de acceso
                </p>
              </div>

              {/* Características */}
              <div className="mb-6">
                <ul className="space-y-3">
                  {option.features.split(',').map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón de acción */}
              <div className="text-center">
                {currentDonation ? (
                  <button
                    disabled
                    className="bg-gray-600 text-gray-400 px-6 py-3 rounded-lg cursor-not-allowed"
                  >
                    Ya tienes acceso premium
                  </button>
                ) : (
                  <button
                    onClick={() => handleDonate(option.id)}
                    disabled={donating}
                    className="w-full px-6 py-3 rounded-lg font-semibold transition-colors bg-red-600 hover:bg-red-700 text-white"
                  >
                    {donating ? 'Procesando...' : `Donar $${option.price.toLocaleString('es-AR')}`}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-dark-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            ¿Por qué hacer una donación?
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
                  Cancela tu acceso premium en cualquier momento sin penalización
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

export default Donations;

