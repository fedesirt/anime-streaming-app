import React, { useState, useEffect } from 'react';
import { Play, Star, Clock, Users } from 'lucide-react';
import { FreeContentService } from '../services/freeContentAPI.ts';

interface FreeAnimeContent {
  id: number;
  title: string;
  synopsis?: string;
  score?: number;
  episodes?: number;
  status?: string;
  image?: string;
  type?: string;
  year?: number;
}

const FreeContentSection: React.FC = () => {
  const [popularAnime, setPopularAnime] = useState<FreeAnimeContent[]>([]);
  const [seasonalAnime, setSeasonalAnime] = useState<FreeAnimeContent[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'popular' | 'seasonal' | 'videos'>('popular');

  useEffect(() => {
    loadFreeContent();
  }, []);

  const loadFreeContent = async () => {
    setLoading(true);
    try {
      // Cargar animes populares
      const popular = await FreeContentService.getPopularAnime();
      setPopularAnime(popular.slice(0, 12));
      
      // Cargar animes de la temporada actual
      const seasonal = await FreeContentService.getCurrentSeasonAnime();
      setSeasonalAnime(seasonal.slice(0, 12));
      
      // Cargar videos de YouTube
      const videos = await FreeContentService.getYouTubeVideos('anime');
      setYoutubeVideos(videos.slice(0, 6));
      
    } catch (error) {
      console.error('Error cargando contenido gratuito:', error);
    } finally {
      setLoading(false);
    }
  };

  const AnimeCard: React.FC<{ anime: FreeAnimeContent }> = ({ anime }) => (
    <div className="bg-dark-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img
          src={anime.image || 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Anime'}
          alt={anime.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Ver Gratis</span>
            </button>
          </div>
        </div>
        {anime.score && (
          <div className="absolute top-2 right-2 bg-dark-800/90 rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-white">{anime.score.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-white">{anime.title}</h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{anime.synopsis || 'Sin descripción disponible'}</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{anime.year}</span>
          <span>{anime.episodes} episodios</span>
          <span className={`px-2 py-1 rounded text-xs ${
            anime.status === 'Finished' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {anime.status === 'Finished' ? 'Completado' : 'En emisión'}
          </span>
        </div>
      </div>
    </div>
  );

  const VideoCard: React.FC<{ video: any }> = ({ video }) => (
    <div className="bg-dark-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img
          src={video.snippet?.thumbnails?.medium?.url || 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Video'}
          alt={video.snippet?.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <a
              href={`https://www.youtube.com/watch?v=${video.id?.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Ver en YouTube</span>
            </a>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-white">{video.snippet?.title}</h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{video.snippet?.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{video.snippet?.channelTitle}</span>
          <span>{new Date(video.snippet?.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando contenido gratuito...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎬 Contenido Gratuito de Anime
          </h1>
          <p className="text-gray-300 text-lg">
            Disfruta de animes populares y videos sin costo
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-dark-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'popular'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Populares
            </button>
            <button
              onClick={() => setActiveTab('seasonal')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'seasonal'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Temporada Actual
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'videos'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Videos YouTube
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeTab === 'popular' && popularAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
          
          {activeTab === 'seasonal' && seasonalAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
          
          {activeTab === 'videos' && youtubeVideos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-dark-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            ¿Por qué contenido gratuito?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Star className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Animes Populares</h4>
                <p className="text-gray-300">
                  Acceso a animes populares y clásicos sin costo
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-green-500 mr-3 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Temporada Actual</h4>
                <p className="text-gray-300">
                  Los animes más recientes de la temporada actual
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="w-6 h-6 text-blue-500 mr-3 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Videos de YouTube</h4>
                <p className="text-gray-300">
                  Contenido relacionado con anime desde YouTube
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeContentSection;
