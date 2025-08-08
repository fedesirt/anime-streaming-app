import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Heart, TrendingUp, Clock, Crown, Sparkles, Zap, Target } from 'lucide-react';
import { animeAPIService } from '../services/animeAPI.ts';
import HeroLogo from '../components/HeroLogo.tsx';
import DemoContentSection from '../components/DemoContentSection.tsx';

interface Anime {
  id: number;
  title: string;
  englishTitle?: string;
  synopsis?: string;
  genres?: string[];
  year?: number;
  episodes?: number;
  status?: string;
  score?: number;
  image?: string;
  type?: string;
  requires_premium?: boolean;
}

const Home: React.FC = () => {
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularAnime = async () => {
      try {
        setLoading(true);
        const data = await animeAPIService.getPopularAnime();
        setPopularAnime(data.slice(0, 6));
      } catch (err) {
        setError('Error al cargar los animes populares');
        console.error('Error fetching popular anime:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularAnime();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Error al cargar</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo animado de anime */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        {/* Efectos de partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            />
          ))}
        </div>

        {/* Ondas de luz animadas */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Efectos de luz radiales */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-to-b from-purple-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-to-t from-indigo-500/20 to-transparent"></div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Hero Section con efectos de luz */}
        <section className="hero-gradient pt-20 pb-12 relative">
          {/* Efectos de luz adicionales */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-ping"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-blue-400/20 rounded-full blur-xl animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center animate-fade-in-up">
              {/* Logo con efectos de luz */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl rounded-full"></div>
                <HeroLogo />
              </div>

              <div className="mt-8 relative">
                {/* Efectos de sparkles */}
                <div className="absolute -top-4 left-1/4">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
                <div className="absolute -top-2 right-1/4">
                  <Zap className="w-5 h-5 text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="absolute top-2 left-1/3">
                  <Target className="w-4 h-4 text-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Explora miles de episodios de tus animes favoritos en la mejor calidad. 
                  Desde clásicos hasta las últimas novedades con efectos visuales espectaculares.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/search" className="btn-primary group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Explorar Animes
                    </div>
                  </Link>
                  <Link to="/donations" className="btn-outline group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <Crown className="w-5 h-5 mr-2" />
                      Hacer Donación
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de animes populares con efectos de luz */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 relative">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Animes Populares
                </span>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              </h2>
              <p className="text-gray-300 text-lg">Descubre los animes más populares del momento</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularAnime.map((anime) => (
                <div
                  key={anime.id}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 hover:from-purple-800/30 hover:to-pink-800/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
                >
                  {/* Efectos de luz en las tarjetas */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {anime.title}
                      </h3>
                      {anime.score && (
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">{anime.score}</span>
                        </div>
                      )}
                    </div>

                    {anime.image && (
                      <div className="relative mb-4 rounded-lg overflow-hidden">
                        <img
                          src={anime.image}
                          alt={anime.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}

                    {anime.synopsis && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {anime.synopsis}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {anime.genres?.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/anime/${anime.id}`}
                        className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        <span className="text-sm">Ver</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de características con efectos de luz */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Características Destacadas
                </span>
              </h2>
              <p className="text-gray-300 text-lg">Todo lo que necesitas para disfrutar del mejor anime</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Play className="w-8 h-8" />,
                  title: "Streaming HD",
                  description: "Disfruta de tus animes favoritos en la mejor calidad disponible"
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Favoritos",
                  description: "Guarda tus animes favoritos para verlos más tarde"
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Últimos Episodios",
                  description: "Mantente al día con los episodios más recientes"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 hover:from-purple-800/20 hover:to-pink-800/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  {/* Efectos de luz en las características */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Content Section */}
        <DemoContentSection />
      </div>
    </div>
  );
};

export default Home; 