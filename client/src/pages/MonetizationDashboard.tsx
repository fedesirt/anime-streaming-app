import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Eye, 
  Clock, 
  Star, 
  Download, 
  ShoppingCart,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';
import { analytics, RevenueMetrics, UserMetrics } from '../services/analytics.ts';

interface DashboardMetric {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const MonetizationDashboard: React.FC = () => {
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics | null>(null);
  const [userMetrics, setUserMetrics] = useState<UserMetrics | null>(null);
  const [watchTimeAnalytics, setWatchTimeAnalytics] = useState<any>(null);
  const [revenuePredictions, setRevenuePredictions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setLoading(true);
    
    // Cargar métricas
    const revenue = analytics.getRevenueMetrics();
    const user = analytics.getUserMetrics();
    const watchTime = analytics.getWatchTimeAnalytics();
    const predictions = analytics.predictRevenue(12);
    
    setRevenueMetrics(revenue);
    setUserMetrics(user);
    setWatchTimeAnalytics(watchTime);
    setRevenuePredictions(predictions);
    
    setLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-AR').format(num);
  };

  const getMetricColor = (change: number) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const metrics: DashboardMetric[] = [
    {
      title: 'Ingresos Mensuales',
      value: formatCurrency(revenueMetrics?.monthlyRevenue || 0),
      change: 12.5,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
              title: 'Donaciones Activas',
              value: formatNumber(revenueMetrics?.activeDonations || 0),
      change: 8.2,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Tasa de Conversión',
      value: `${(revenueMetrics?.conversionRate || 0).toFixed(1)}%`,
      change: 2.1,
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'ARPU',
      value: formatCurrency(revenueMetrics?.averageRevenuePerUser || 0),
      change: 5.8,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Tiempo de Visualización',
      value: `${Math.round((watchTimeAnalytics?.totalWatchTime || 0) / 3600)}h`,
      change: 15.3,
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-indigo-500'
    },
    {
      title: 'Vistas Totales',
      value: formatNumber(watchTimeAnalytics?.totalViews || 0),
      change: 22.7,
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-pink-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            💰 Dashboard de Monetización
          </h1>
          <p className="text-gray-300">
            Monitorea tus ingresos y métricas de crecimiento
          </p>
        </div>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-dark-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className={`text-sm font-medium ${getMetricColor(metric.change)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Gráficos y Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Predicción de Ingresos */}
          <div className="bg-dark-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-xl font-bold text-white">Predicción de Ingresos</h3>
            </div>
            <div className="space-y-3">
              {revenuePredictions.slice(0, 6).map((prediction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">Mes {index + 1}</span>
                  <span className="text-white font-medium">
                    {formatCurrency(prediction)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Análisis de Usuario */}
          <div className="bg-dark-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <PieChart className="w-6 h-6 text-green-400 mr-2" />
              <h3 className="text-xl font-bold text-white">Análisis de Usuario</h3>
            </div>
            {userMetrics && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Estado de Acceso Premium</span>
                  <span className="text-white font-medium capitalize">
                    {userMetrics.donationStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Episodios Vistos</span>
                  <span className="text-white font-medium">
                    {formatNumber(userMetrics.episodesWatched)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Gastado</span>
                  <span className="text-white font-medium">
                    {formatCurrency(userMetrics.totalSpent)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Referidos</span>
                  <span className="text-white font-medium">
                    {userMetrics.referralCount}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Estrategias de Monetización */}
        <div className="mt-8 bg-dark-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            🎯 Estrategias de Monetización
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Suscripciones</h4>
              <p className="text-gray-400 text-sm">
                Planes premium con contenido exclusivo
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Publicidad</h4>
              <p className="text-gray-400 text-sm">
                Anuncios dirigidos y no intrusivos
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">E-commerce</h4>
              <p className="text-gray-400 text-sm">
                Merchandising y productos digitales
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Referidos</h4>
              <p className="text-gray-400 text-sm">
                Programa de afiliados y referidos
              </p>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="mt-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            ⚡ Acciones para Aumentar Ingresos
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                              Optimizar Opciones de Donación
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
              Implementar Anuncios
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
              Lanzar Campaña de Marketing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonetizationDashboard;
