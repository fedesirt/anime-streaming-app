import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Heart, TrendingUp, Clock, Crown } from 'lucide-react';
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
  const [recentAnime, setRecentAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        console.log('🔄 Iniciando fetch de animes desde API...');
        const [popularData, currentSeasonData] = await Promise.all([
          animeAPIService.getPopularAnime(1),
          animeAPIService.getCurrentSeasonAnime()
        ]);
        
        console.log('✅ Datos recibidos:', {
          popular: popularData.length,
          currentSeason: currentSeasonData.length
        });
        
        setPopularAnime(popularData);
        setRecentAnime(currentSeasonData.slice(0, 12)); // Limitar a 12 animes
      } catch (error) {
        console.error('❌ Error fetching anime:', error);
        setError('Error al cargar los animes');
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => (
    <div className="card card-hover group overflow-hidden">
      <div className="relative">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <Link
              to={`/anime/${anime.id}`}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Ver Anime</span>
            </Link>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <div className="flex items-center space-x-1 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 border border-yellow-500/30">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-white">{anime.score?.toFixed(1) || 'N/A'}</span>
          </div>
          {anime.status === 'Completado' ? (
            <div className="badge badge-success">
              Completado
            </div>
          ) : (
            <div className="badge badge-secondary">
              En emisión
            </div>
          )}
        </div>
        
        {/* Premium badge */}
        {anime.requires_premium && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm rounded-full px-3 py-1 border border-yellow-400/50">
              <Crown size={14} className="text-white" />
              <span className="text-xs font-medium text-white">Premium</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 line-clamp-1 text-white group-hover:text-red-300 transition-colors">
          {anime.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {anime.synopsis || anime.englishTitle || 'Sin descripción disponible'}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3 text-gray-400">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>{anime.year}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{anime.episodes} episodios</span>
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {anime.genres?.[0] || anime.type || 'Anime'}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando animes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Error al cargar</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="hero-gradient pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <HeroLogo />
            <div className="mt-8">
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Explora miles de episodios de tus animes favoritos en la mejor calidad. 
                Desde clásicos hasta las últimas novedades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/search" className="btn-primary">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Explorar Animes
                </Link>
                <Link to="/donations" className="btn-outline">
                  <Crown className="w-5 h-5 mr-2" />
                  Hacer Donación
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Anime Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8 animate-slide-in-right">
            <TrendingUp className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-white">Animes Populares</h2>
          </div>
          
          <div className="grid-anime">
            {popularAnime.map((anime, index) => (
              <div key={anime.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in-up">
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Anime Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8 animate-slide-in-right">
            <Clock className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-white">Recientes</h2>
          </div>
          
          <div className="grid-anime">
            {recentAnime.map((anime, index) => (
              <div key={anime.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in-up">
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">¿Por qué elegir AnimeStream?</h2>
            <p className="text-gray-400 text-lg">La mejor experiencia de streaming de anime</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Miles de Episodios</h3>
              <p className="text-gray-400">Accede a una extensa biblioteca de animes con episodios de alta calidad.</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Contenido Premium</h3>
              <p className="text-gray-400">Disfruta de animes exclusivos y sin anuncios con acceso premium.</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lista de Favoritos</h3>
              <p className="text-gray-400">Guarda tus animes favoritos y continúa donde lo dejaste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Content Section */}
      <DemoContentSection />
    </div>
  );
};

export default Home; 