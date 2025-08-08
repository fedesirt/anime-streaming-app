import React from 'react';
import { Play, Star, Crown, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const DemoContentSection: React.FC = () => {
  const demoAnimes = [
    {
      id: 1,
      title: "Demon Slayer",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      rating: 9.2,
      episodes: 26,
      status: "Completado",
      premium: false
    },
    {
      id: 2,
      title: "Attack on Titan",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      rating: 9.0,
      episodes: 25,
      status: "Completado",
      premium: true
    },
    {
      id: 3,
      title: "My Hero Academia",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      rating: 8.5,
      episodes: 13,
      status: "En emisión",
      premium: false
    },
    {
      id: 4,
      title: "One Piece",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      rating: 9.1,
      episodes: 1000,
      status: "En emisión",
      premium: true
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            🎬 Animes de Demostración
          </h2>
          <p className="text-gray-300 text-lg">
            Estos son ejemplos de cómo se verían los animes en la aplicación
          </p>
        </div>

        {/* Demo Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {demoAnimes.map((anime) => (
            <div key={anime.id} className="bg-dark-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    {anime.premium ? (
                      <div className="flex items-center space-x-2">
                        <Lock className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 text-sm font-medium">Premium</span>
                      </div>
                    ) : (
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Ver Demo</span>
                      </button>
                    )}
                  </div>
                </div>
                {anime.premium && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                    <Crown className="w-3 h-3" />
                    <span>Premium</span>
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-dark-800/90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-white">{anime.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-white">{anime.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{anime.episodes} episodios</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    anime.status === 'Completado' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {anime.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-dark-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            💡 Información sobre el contenido
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Contenido Gratuito</h4>
              <p className="text-gray-300 mb-4">
                Algunos animes están disponibles sin costo. Puedes verlos directamente desde la aplicación.
              </p>
              <Link
                to="/free-content"
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Ver Contenido Gratis
              </Link>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-2">Contenido Premium</h4>
              <p className="text-gray-300 mb-4">
                Los animes marcados como "Premium" requieren acceso premium para verlos.
              </p>
              <Link
                to="/donations"
                className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
              >
                <Crown className="w-4 h-4 mr-2" />
                Ver Opciones
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
            </div>
            <div className="ml-3">
              <h4 className="text-blue-300 font-semibold">Esta es una demostración</h4>
              <p className="text-blue-200 text-sm mt-1">
                Para implementar contenido real de anime, necesitarías:
              </p>
              <ul className="text-blue-200 text-sm mt-2 space-y-1">
                <li>• Licencias de distribución de anime</li>
                <li>• Videos de alta calidad de los episodios</li>
                <li>• Servidores de streaming optimizados</li>
                <li>• Acuerdos con estudios de anime</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoContentSection;
