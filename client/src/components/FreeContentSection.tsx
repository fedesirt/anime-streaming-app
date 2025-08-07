import React, { useState, useEffect } from 'react';
import { FreeContentService, FreeAnimeContent } from '../services/freeContentAPI';
import { Play, ExternalLink, Info, Star } from 'lucide-react';

interface FreeContentSectionProps {
  animeTitle?: string;
  showPopular?: boolean;
  showSeasonal?: boolean;
}

export const FreeContentSection: React.FC<FreeContentSectionProps> = ({
  animeTitle,
  showPopular = true,
  showSeasonal = true
}) => {
  const [popularAnime, setPopularAnime] = useState<any[]>([]);
  const [seasonalAnime, setSeasonalAnime] = useState<any[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<FreeAnimeContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'popular' | 'seasonal' | 'videos'>('popular');

  useEffect(() => {
    loadContent();
  }, [animeTitle]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const [popular, seasonal, videos] = await Promise.all([
        showPopular ? FreeContentService.getPopularAnime(12) : Promise.resolve([]),
        showSeasonal ? FreeContentService.getCurrentSeasonAnime() : Promise.resolve([]),
        animeTitle ? FreeContentService.getYouTubeVideos(animeTitle) : Promise.resolve([])
      ]);

      setPopularAnime(popular);
      setSeasonalAnime(seasonal);
      setYoutubeVideos(videos);
    } catch (error) {
      console.error('Error cargando contenido gratuito:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trailer': return <Play className="w-4 h-4" />;
      case 'review': return <Star className="w-4 h-4" />;
      case 'analysis': return <Info className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trailer': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      case 'analysis': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        🎬 Contenido Gratuito de Anime
      </h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {showPopular && (
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'popular'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🏆 Populares
          </button>
        )}
        {showSeasonal && (
          <button
            onClick={() => setActiveTab('seasonal')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'seasonal'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🌸 Temporada Actual
          </button>
        )}
        {animeTitle && youtubeVideos.length > 0 && (
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'videos'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📺 Videos Relacionados
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'popular' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularAnime.map((anime) => (
              <div key={anime.mal_id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                <img
                  src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url}
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-2">{anime.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{anime.type} • {anime.episodes} episodios</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 text-sm">⭐ {anime.score}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'seasonal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {seasonalAnime.map((anime) => (
              <div key={anime.mal_id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                <img
                  src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url}
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-2">{anime.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{anime.type} • {anime.episodes} episodios</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-sm">🆕 Nuevo</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeVideos.map((video) => (
              <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs text-white ${getTypeColor(video.type)}`}>
                    {getTypeIcon(video.type)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">{video.description}</p>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Ver en YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <p className="text-gray-400 text-sm text-center">
          💡 Todo el contenido mostrado es gratuito y legal. 
          Los videos provienen de canales oficiales y creadores de contenido.
        </p>
      </div>
    </div>
  );
};
