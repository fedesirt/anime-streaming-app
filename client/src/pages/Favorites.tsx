import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';
import { Heart, Star, Play, Trash2 } from 'lucide-react';

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
}

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/users/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const removeFavorite = async (animeId: number) => {
    try {
      await axios.delete(`/api/users/favorites/${animeId}`);
      setFavorites(favorites.filter(anime => anime.id !== animeId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => (
    <div className="card group overflow-hidden">
      <div className="relative">
        <img
          src={anime.image_url}
          alt={anime.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
            <Link
              to={`/anime/${anime.id}`}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Ver</span>
            </Link>
            <button
              onClick={() => removeFavorite(anime.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Quitar</span>
            </button>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-dark-800/90 rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{anime.rating}</span>
        </div>
        <div className="absolute top-2 left-2 bg-red-500 rounded-full p-1">
          <Heart className="w-4 h-4 text-white fill-current" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
        <p className="text-dark-300 text-sm mb-2 line-clamp-2">{anime.description}</p>
        <div className="flex items-center justify-between text-sm text-dark-400">
          <span>{anime.year}</span>
          <span>{anime.episodes} episodios</span>
          <span className={`px-2 py-1 rounded text-xs ${
            anime.status === 'Completado' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {anime.status}
          </span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Mis Favoritos</h1>
              <p className="text-dark-300">Tus animes guardados</p>
            </div>
          </div>
        </div>

        {/* Favorites List */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-dark-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tienes favoritos aún</h3>
            <p className="text-dark-300 mb-6">
              Explora nuestro catálogo y agrega tus animes favoritos para verlos aquí.
            </p>
            <Link to="/search" className="btn-primary">
              Explorar Anime
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {favorites.length} anime{favorites.length !== 1 ? 's' : ''} en favoritos
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favorites.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 bg-dark-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Acciones rápidas</h3>
              <div className="flex flex-wrap gap-4">
                <Link to="/search" className="btn-secondary">
                  Buscar más anime
                </Link>
                <Link to="/" className="btn-secondary">
                  Ver anime populares
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 