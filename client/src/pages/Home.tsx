import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Heart, TrendingUp, Clock, Crown, Sparkles, Zap, Target, Tv, Film, Users, Award } from 'lucide-react';
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

interface Cartoon {
  id: number;
  title: string;
  network: string;
  genre: string;
  year: number;
  episodes: number;
  status: string;
  score: number;
  image: string;
  description: string;
}

const Home: React.FC = () => {
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [cartoons, setCartoons] = useState<Cartoon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const animeData = await animeAPIService.getPopularAnime();
        setPopularAnime(animeData.slice(0, 6));

        // Datos de dibujos animados y series
        const cartoonsData: Cartoon[] = [
          {
            id: 1,
            title: "South Park",
            network: "Comedy Central",
            genre: "Comedia",
            year: 1997,
            episodes: 300,
            status: "En emisión",
            score: 8.7,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Serie de animación para adultos que satiriza la sociedad estadounidense."
          },
          {
            id: 2,
            title: "Ben 10",
            network: "Cartoon Network",
            genre: "Acción/Aventura",
            year: 2005,
            episodes: 52,
            status: "Completado",
            score: 8.2,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Un niño de 10 años encuentra un reloj alienígena que le da poderes."
          },
          {
            id: 3,
            title: "Avatar: La Leyenda de Aang",
            network: "Nickelodeon",
            genre: "Fantasía/Aventura",
            year: 2005,
            episodes: 61,
            status: "Completado",
            score: 9.3,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Un joven avatar debe dominar los cuatro elementos para salvar el mundo."
          },
          {
            id: 4,
            title: "Phineas y Ferb",
            network: "Disney Channel",
            genre: "Comedia/Aventura",
            year: 2007,
            episodes: 222,
            status: "Completado",
            score: 8.1,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Dos hermanos que crean inventos increíbles durante las vacaciones de verano."
          },
          {
            id: 5,
            title: "Gravity Falls",
            network: "Disney Channel",
            genre: "Misterio/Comedia",
            year: 2012,
            episodes: 40,
            status: "Completado",
            score: 8.9,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Dos gemelos descubren misterios sobrenaturales en un pequeño pueblo."
          },
          {
            id: 6,
            title: "Rick y Morty",
            network: "Adult Swim",
            genre: "Ciencia Ficción/Comedia",
            year: 2013,
            episodes: 51,
            status: "En emisión",
            score: 9.2,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Un científico loco y su nieto viajan por dimensiones paralelas."
          },
          {
            id: 7,
            title: "Steven Universe",
            network: "Cartoon Network",
            genre: "Fantasía/Aventura",
            year: 2013,
            episodes: 160,
            status: "Completado",
            score: 8.5,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Un niño mitad humano, mitad gema descubre sus poderes y su herencia."
          },
          {
            id: 8,
            title: "Adventure Time",
            network: "Cartoon Network",
            genre: "Fantasía/Aventura",
            year: 2010,
            episodes: 283,
            status: "Completado",
            score: 8.6,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Un niño y su perro mágico exploran la Tierra post-apocalíptica."
          },
          {
            id: 9,
            title: "The Simpsons",
            network: "Fox",
            genre: "Comedia",
            year: 1989,
            episodes: 750,
            status: "En emisión",
            score: 8.7,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "La familia más famosa de Springfield en situaciones cómicas."
          },
          {
            id: 10,
            title: "Futurama",
            network: "Fox",
            genre: "Ciencia Ficción/Comedia",
            year: 1999,
            episodes: 140,
            status: "Completado",
            score: 8.4,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Un repartidor de pizza es congelado y despierta en el año 3000."
          },
          {
            id: 11,
            title: "Family Guy",
            network: "Fox",
            genre: "Comedia",
            year: 1999,
            episodes: 400,
            status: "En emisión",
            score: 8.1,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "La familia Griffin en situaciones absurdas y cómicas."
          },
          {
            id: 12,
            title: "American Dad!",
            network: "Fox",
            genre: "Comedia",
            year: 2005,
            episodes: 350,
            status: "En emisión",
            score: 7.8,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Un agente de la CIA y su familia extraterrestre en situaciones cómicas."
          }
        ];

        setCartoons(cartoonsData);
      } catch (err) {
        setError('Error al cargar el contenido');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center">
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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Efectos de luz radiales */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-to-b from-red-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-to-t from-gray-500/20 to-transparent"></div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Hero Section con efectos de luz */}
        <section className="hero-gradient pt-20 pb-12 relative">
          {/* Efectos de luz adicionales */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-ping"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-400/20 rounded-full blur-xl animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-gray-400/20 rounded-full blur-xl animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center animate-fade-in-up">
              {/* Logo con efectos de luz */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-gray-500/20 to-red-600/20 blur-3xl rounded-full"></div>
                <HeroLogo />
              </div>

              <div className="mt-8 relative">
                {/* Efectos de sparkles */}
                <div className="absolute -top-4 left-1/4">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
                <div className="absolute -top-2 right-1/4">
                  <Zap className="w-5 h-5 text-red-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="absolute top-2 left-1/3">
                  <Target className="w-4 h-4 text-gray-400 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Explora miles de episodios de tus animes favoritos y series de dibujos animados en la mejor calidad. 
                  Desde clásicos hasta las últimas novedades con efectos visuales espectaculares.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/search" className="btn-primary group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Explorar Contenido
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

        {/* Sección de dibujos animados y series */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 relative">
                <span className="bg-gradient-to-r from-red-400 via-gray-400 to-red-500 bg-clip-text text-transparent">
                  Dibujos Animados & Series
                </span>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
              </h2>
              <p className="text-gray-300 text-lg mb-6">Descubre las mejores series de Disney XD, Cartoon Network, Jetix y más</p>

              {/* Iconos de redes */}
              <div className="flex justify-center space-x-8 mb-8">
                <div className="flex items-center space-x-2 text-red-400">
                  <Tv className="w-5 h-5" />
                  <span className="text-sm font-medium">Disney XD</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Film className="w-5 h-5" />
                  <span className="text-sm font-medium">Cartoon Network</span>
                </div>
                <div className="flex items-center space-x-2 text-red-500">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium">Comedy Central</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium">Adult Swim</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cartoons.map((cartoon) => (
                <div
                  key={cartoon.id}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 hover:from-red-800/30 hover:to-gray-800/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 overflow-hidden"
                >
                  {/* Efectos de luz en las tarjetas */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors duration-300 line-clamp-1">
                        {cartoon.title}
                      </h3>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{cartoon.score}</span>
                      </div>
                    </div>

                    <div className="relative mb-4 rounded-lg overflow-hidden">
                      <img
                        src={cartoon.image}
                        alt={cartoon.title}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs">
                          {cartoon.network}
                        </span>
                        <span className="text-xs">{cartoon.year}</span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                        {cartoon.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{cartoon.episodes} episodios</span>
                        <span className={`px-2 py-1 rounded-full ${
                          cartoon.status === 'En emisión'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-gray-500/20 text-gray-300'
                        }`}>
                          {cartoon.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                          {cartoon.genre}
                        </span>
                      </div>
                      <Link
                        to={`/cartoon/${cartoon.id}`}
                        className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300"
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

        {/* Sección de animes populares con efectos de luz */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 relative">
                <span className="bg-gradient-to-r from-red-400 via-gray-400 to-red-500 bg-clip-text text-transparent">
                  Animes Populares
                </span>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
              </h2>
              <p className="text-gray-300 text-lg">Descubre los animes más populares del momento</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularAnime.map((anime) => (
                <div
                  key={anime.id}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 hover:from-red-800/30 hover:to-gray-800/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 overflow-hidden"
                >
                  {/* Efectos de luz en las tarjetas */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors duration-300">
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
                            className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/anime/${anime.id}`}
                        className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300"
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
                <span className="bg-gradient-to-r from-red-400 via-gray-400 to-red-500 bg-clip-text text-transparent">
                  Características Destacadas
                </span>
              </h2>
              <p className="text-gray-300 text-lg">Todo lo que necesitas para disfrutar del mejor contenido</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Play className="w-8 h-8" />,
                  title: "Streaming HD",
                  description: "Disfruta de animes y series en la mejor calidad disponible"
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Favoritos",
                  description: "Guarda tus contenidos favoritos para verlos más tarde"
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Últimos Episodios",
                  description: "Mantente al día con los episodios más recientes"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 hover:from-red-800/20 hover:to-gray-800/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                >
                  {/* Efectos de luz en las características */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-gray-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors duration-300">
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

        {/* Disclaimer Legal */}
        <section className="py-8 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="text-yellow-400 mr-2">⚠️</span>
                Aviso Legal
              </h3>
              <div className="text-gray-300 text-sm space-y-2">
                <p>
                  <strong className="text-white">Propósito Educativo:</strong> Esta página es un proyecto de desarrollo web con fines educativos y de portfolio.
                </p>
                <p>
                  <strong className="text-white">Derechos de Autor:</strong> Todo el contenido mostrado (animes, series, imágenes) pertenece a sus respectivos propietarios. No tenemos derechos de reproducción.
                </p>
                <p>
                  <strong className="text-white">Sin Reproducción:</strong> Esta plataforma no reproduce contenido real, solo muestra información y diseños de interfaz.
                </p>
                <p>
                  <strong className="text-white">Créditos:</strong> Las imágenes utilizadas provienen de Unsplash y están bajo licencia Creative Commons.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <Link
                    to="/terms"
                    className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors duration-300 text-sm"
                  >
                    <span className="mr-2">📋</span>
                    Ver Términos y Condiciones Completos
                  </Link>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  © 2024 AnimeZone - Proyecto de Desarrollo Web Educativo
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 