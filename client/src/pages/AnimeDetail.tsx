import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import axios from 'axios';
import { Play, Star, Heart, Crown, Calendar, Users, Clock, ArrowLeft } from 'lucide-react';

interface Anime {
  id: number;
  title: string;
  description: string;
  genre: string;
  year: number;
  episodes: number;
  status: string;
  rating: number;
  image_url: string;
  video_url: string;
  requires_premium: boolean;
}

interface Episode {
  id: number;
  title: string;
  episode_number: number;
  description: string;
  video_url: string;
  requires_premium: boolean;
}

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const [animeRes, episodesRes] = await Promise.all([
          axios.get(`/api/anime/${id}`),
          axios.get(`/api/episodes/anime/${id}/episodes`)
        ]);
        
        setAnime(animeRes.data);
        setEpisodes(episodesRes.data);
      } catch (error: any) {
        setError(error.response?.data?.error || 'Error al cargar el anime');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnime();
    }
  }, [id]);

  const handleFavorite = async () => {
    if (!user) return;
    
    try {
      if (isFavorite) {
        await axios.delete(`/api/anime/${id}/favorite`);
        setIsFavorite(false);
      } else {
        await axios.post(`/api/anime/${id}/favorite`);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error al manejar favoritos:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando anime...</p>
        </div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Error al cargar</h2>
          <p className="text-gray-400">{error || 'Anime no encontrado'}</p>
        </div>
      </div>
    );
  }

  const hasAccess = !anime.requires_premium || (user && user.premium_access_status === 'premium');

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={anime.image_url}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <div className="flex items-end space-x-6">
              <div className="w-32 h-48 md:w-48 md:h-72 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={anime.image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Link
                    to="/"
                    className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
                  >
                    <ArrowLeft size={20} />
                    <span>Volver</span>
                  </Link>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {anime.title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{anime.rating}</span>
                  </div>
                  
                  <div className="badge badge-success">
                    {anime.status}
                  </div>
                  
                  {anime.requires_premium && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Crown size={14} className="text-white" />
                      <span className="text-xs font-medium text-white">Premium</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-6 text-gray-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{anime.year}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{anime.episodes} episodios</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span>{anime.genre.split(', ')[0]}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {hasAccess ? (
                    <Link
                      to={`/episode/${episodes[0]?.id || 1}`}
                      className="btn-primary"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Reproducir
                    </Link>
                  ) : (
                    <Link
                      to="/donations"
                      className="btn-primary"
                    >
                      <Crown className="w-5 h-5 mr-2" />
                      Hacer Donación
                    </Link>
                  )}
                  
                  <button
                    onClick={handleFavorite}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                      isFavorite
                        ? 'border-red-500 bg-red-500/20 text-red-400'
                        : 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed">
                {anime.description}
              </p>
            </div>

            {/* Episodes */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">Episodios</h2>
              
              {episodes.length > 0 ? (
                <div className="grid gap-4">
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="w-16 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {episode.episode_number}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">
                          {episode.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-1">
                          {episode.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {episode.requires_premium && (
                          <Crown size={16} className="text-yellow-400" />
                        )}
                        
                        {hasAccess ? (
                          <Link
                            to={`/episode/${episode.id}`}
                            className="btn-primary text-sm px-4 py-2"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Ver
                          </Link>
                        ) : (
                          <Link
                            to="/donations"
                            className="btn-outline text-sm px-4 py-2"
                          >
                            <Crown className="w-4 h-4 mr-1" />
                            Premium
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No hay episodios disponibles</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Información</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Título</span>
                  <p className="text-white font-medium">{anime.title}</p>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Género</span>
                  <p className="text-white font-medium">{anime.genre}</p>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Año</span>
                  <p className="text-white font-medium">{anime.year}</p>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Episodios</span>
                  <p className="text-white font-medium">{anime.episodes}</p>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Estado</span>
                  <div className="badge badge-success">
                    {anime.status}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Calificación</span>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{anime.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail; 