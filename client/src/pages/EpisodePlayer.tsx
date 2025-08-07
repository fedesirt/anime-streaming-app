import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import { ArrowLeft, Play, Pause, Lock, Crown, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import axios from 'axios';

interface Episode {
  id: number;
  title: string;
  episode_number: number;
  description: string;
  video_url: string;
  requires_subscription: boolean;
  anime_title: string;
  season_title: string;
  anime_image: string;
}

interface Season {
  id: number;
  title: string;
  episode_count: number;
}

const EpisodePlayer: React.FC = () => {
  const { episodeId } = useParams<{ episodeId: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSeason, setCurrentSeason] = useState<number | null>(null);
  const [watchProgress, setWatchProgress] = useState(0);

  // Estados para el reproductor
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (episodeId) {
      fetchEpisode();
      fetchSeasons();
    }
  }, [episodeId]);

  useEffect(() => {
    if (currentSeason) {
      fetchEpisodes(currentSeason);
    }
  }, [currentSeason]);

  // Efectos para el reproductor
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const progress = (video.currentTime / video.duration) * 100;
      handleProgress(progress);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      handleComplete();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const fetchEpisode = async () => {
    try {
      const response = await axios.get(`/api/episodes/episode/${episodeId}`);
      setEpisode(response.data);
      
      // Obtener progreso de reproducción si el usuario está autenticado
      if (user && token) {
        try {
          const progressResponse = await axios.get(`/api/episodes/watch-progress/${episodeId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWatchProgress(progressResponse.data.progress || 0);
        } catch (error) {
          console.error('Error obteniendo progreso:', error);
        }
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error al cargar el episodio');
    } finally {
      setLoading(false);
    }
  };

  const fetchSeasons = async () => {
    if (!episode) return;
    
    try {
      const response = await axios.get(`/api/episodes/anime/${episode.anime_title}/seasons`);
      setSeasons(response.data);
      if (response.data.length > 0) {
        setCurrentSeason(response.data[0].id);
      }
    } catch (error: any) {
      console.error('Error obteniendo temporadas:', error);
    }
  };

  const fetchEpisodes = async (seasonId: number) => {
    try {
      const response = await axios.get(`/api/episodes/season/${seasonId}/episodes`);
      setEpisodes(response.data);
    } catch (error: any) {
      console.error('Error obteniendo episodios:', error);
    }
  };

  const handleProgress = async (progress: number) => {
    if (!user || !token) return;

    try {
      await axios.post('/api/episodes/watch-progress', {
        episodeId: episodeId,
        progress,
        completed: progress >= 90
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error guardando progreso:', error);
    }
  };

  const handleComplete = () => {
    // Auto-play siguiente episodio si existe
    if (episode && episodes.length > 0) {
      const currentIndex = episodes.findIndex(ep => ep.id === episode.id);
      if (currentIndex < episodes.length - 1) {
        const nextEpisode = episodes[currentIndex + 1];
        navigate(`/episode/${nextEpisode.id}`);
      }
    }
  };

  const handleEpisodeClick = (episodeId: number) => {
    navigate(`/episode/${episodeId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando episodio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">Episodio no encontrado</div>
      </div>
    );
  }

  // Verificar si el usuario tiene acceso al contenido premium
  const hasAccess = !episode.requires_subscription || (user && user.subscription_status === 'premium');

  // Funciones del reproductor
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, video.duration));
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="text-white hover:text-red-400 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-white text-xl font-bold">{episode.anime_title}</h1>
              <p className="text-gray-400">{episode.season_title} - {episode.title}</p>
            </div>
          </div>
          
          {episode.requires_subscription && (
            <div className="flex items-center space-x-2 text-red-400">
              <Crown size={20} />
              <span className="text-sm">Premium</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Reproductor */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-lg overflow-hidden aspect-video">
              {hasAccess ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    onClick={togglePlay}
                    onMouseMove={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                    poster="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop&crop=center"
                  >
                    <source src={episode.video_url} type="video/mp4" />
                    <div className="flex items-center justify-center h-full bg-black text-white">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">🎬 Demostración de Streaming</h3>
                        <p className="text-gray-300 mb-4">
                          Este es un video de demostración. En una aplicación real, aquí se reproduciría el episodio "{episode.title}".
                        </p>
                        <p className="text-sm text-gray-400">
                          Para implementar contenido real, necesitarías licencias y videos de los animes correspondientes.
                        </p>
                      </div>
                    </div>
                  </video>

                  {/* Controles */}
                  {showControls && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      {/* Barra de progreso */}
                      <div className="mb-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progress}
                          onChange={handleSeek}
                          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Controles principales */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Botón play/pause */}
                          <button
                            onClick={togglePlay}
                            className="text-white hover:text-red-400 transition-colors"
                          >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                          </button>

                          {/* Botones de saltar */}
                          <button
                            onClick={() => skipTime(-10)}
                            className="text-white hover:text-red-400 transition-colors"
                          >
                            <SkipBack size={20} />
                          </button>
                          <button
                            onClick={() => skipTime(10)}
                            className="text-white hover:text-red-400 transition-colors"
                          >
                            <SkipForward size={20} />
                          </button>

                          {/* Tiempo */}
                          <span className="text-white text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4">
                          {/* Control de volumen */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={toggleMute}
                              className="text-white hover:text-red-400 transition-colors"
                            >
                              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>

                          {/* Botón fullscreen */}
                          <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-red-400 transition-colors"
                          >
                            <Maximize size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Título del video */}
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold">{`${episode.anime_title} - ${episode.title}`}</h3>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Lock size={64} className="text-red-500 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-bold mb-2">Contenido Premium</h3>
                    <p className="text-gray-400 mb-4">
                      Este episodio requiere una suscripción premium
                    </p>
                    <button
                      onClick={() => navigate('/subscription')}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Suscribirse
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Información del episodio */}
            <div className="mt-6 bg-dark-800 rounded-lg p-6">
              <h2 className="text-white text-2xl font-bold mb-4">{episode.title}</h2>
              <p className="text-gray-300 mb-4">{episode.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Episodio {episode.episode_number}</span>
                <span>•</span>
                <span>{episode.season_title}</span>
              </div>
            </div>
          </div>

          {/* Lista de episodios */}
          <div className="lg:col-span-1">
            <div className="bg-dark-800 rounded-lg p-4">
              <h3 className="text-white font-bold mb-4">Episodios</h3>
              
              {/* Selector de temporada */}
              {seasons.length > 1 && (
                <div className="mb-4">
                  <select
                    value={currentSeason || ''}
                    onChange={(e) => setCurrentSeason(Number(e.target.value))}
                    className="w-full bg-dark-700 text-white border border-dark-600 rounded-lg px-3 py-2"
                  >
                    {seasons.map(season => (
                      <option key={season.id} value={season.id}>
                        {season.title} ({season.episode_count} episodios)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Lista de episodios */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {episodes.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => handleEpisodeClick(ep.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      ep.id === episode.id
                        ? 'bg-red-600 text-white'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Episodio {ep.episode_number}</p>
                        <p className="text-sm opacity-75">{ep.title}</p>
                      </div>
                      {ep.requires_subscription && (
                        <Crown size={16} className="text-red-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodePlayer;
