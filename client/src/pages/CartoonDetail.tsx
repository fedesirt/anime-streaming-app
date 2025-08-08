import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Star, Heart, Clock, Users, Award, ArrowLeft, Share2, Download, Bookmark, Tv, Film } from 'lucide-react';

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
  longDescription?: string;
  cast?: string[];
  director?: string;
  rating?: string;
}

const CartoonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cartoon, setCartoon] = useState<Cartoon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartoon = async () => {
      try {
        setLoading(true);
        // Simular datos de la API
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
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            description: "Serie de animación para adultos que satiriza la sociedad estadounidense.",
            longDescription: "South Park es una serie de animación para adultos creada por Trey Parker y Matt Stone. La serie sigue las aventuras de cuatro niños - Stan Marsh, Kyle Broflovski, Eric Cartman y Kenny McCormick - y sus familias en la pequeña ciudad de South Park, Colorado. La serie es conocida por su humor negro, sátira social y comentarios políticos.",
            cast: ["Trey Parker", "Matt Stone", "Isaac Hayes", "Mona Marshall"],
            director: "Trey Parker",
            rating: "TV-MA"
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
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            description: "Un niño de 10 años encuentra un reloj alienígena que le da poderes.",
            longDescription: "Ben 10 sigue las aventuras de Ben Tennyson, un niño de 10 años que encuentra un dispositivo alienígena llamado Omnitrix que le permite transformarse en 10 diferentes alienígenas. Junto con su abuelo Max y su prima Gwen, Ben viaja por el mundo luchando contra villanos alienígenas y protegiendo la Tierra.",
            cast: ["Tara Strong", "Meagan Smith", "Paul Eiding", "Steven Jay Blum"],
            director: "Man of Action",
            rating: "TV-Y7"
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
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            description: "Un joven avatar debe dominar los cuatro elementos para salvar el mundo.",
            longDescription: "Avatar: La Leyenda de Aang sigue la historia de Aang, un joven avatar que debe dominar los cuatro elementos (agua, tierra, fuego y aire) para salvar el mundo de la Nación del Fuego. Junto con sus amigos Katara, Sokka y Toph, Aang emprende un viaje épico para restaurar el equilibrio al mundo.",
            cast: ["Zach Tyler Eisen", "Mae Whitman", "Jack De Sena", "Jessie Flower"],
            director: "Michael Dante DiMartino",
            rating: "TV-Y7"
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
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            description: "Dos hermanos que crean inventos increíbles durante las vacaciones de verano.",
            longDescription: "Phineas y Ferb sigue las aventuras de dos hermanos que pasan sus vacaciones de verano creando inventos increíbles en su patio trasero. Mientras tanto, su hermana Candace intenta delatarlos a su madre, y su mascota Perry el Ornitorrinco lucha contra el Dr. Doofenshmirtz en secreto.",
            cast: ["Vincent Martella", "Thomas Brodie-Sangster", "Ashley Tisdale", "Dee Bradley Baker"],
            director: "Dan Povenmire",
            rating: "TV-G"
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
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            description: "Dos gemelos descubren misterios sobrenaturales en un pequeño pueblo.",
            longDescription: "Gravity Falls sigue a Dipper y Mabel Pines, dos gemelos de 12 años que pasan el verano con su tío abuelo Stan en el misterioso pueblo de Gravity Falls, Oregón. Allí descubren que el pueblo está lleno de criaturas sobrenaturales y misterios que deben resolver.",
            cast: ["Jason Ritter", "Kristen Schaal", "Alex Hirsch", "Linda Cardellini"],
            director: "Alex Hirsch",
            rating: "TV-Y7"
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
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            description: "Un científico loco y su nieto viajan por dimensiones paralelas.",
            longDescription: "Rick y Morty sigue las aventuras de Rick Sanchez, un científico brillante pero alcohólico, y su nieto Morty Smith, un adolescente tímido e inseguro. Juntos viajan por dimensiones paralelas, planetas alienígenas y realidades alternativas en increíbles aventuras científicas.",
            cast: ["Justin Roiland", "Chris Parnell", "Spencer Grammer", "Sarah Chalke"],
            director: "Justin Roiland",
            rating: "TV-MA"
          }
        ];

        const foundCartoon = cartoonsData.find(c => c.id === parseInt(id || '1'));
        if (foundCartoon) {
          setCartoon(foundCartoon);
        } else {
          setError('Serie no encontrada');
        }
      } catch (err) {
        setError('Error al cargar la serie');
        console.error('Error fetching cartoon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartoon();
  }, [id]);

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

  if (error || !cartoon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-400">{error || 'Serie no encontrada'}</p>
          <Link to="/" className="btn-primary mt-4 inline-block">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header con navegación */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al Inicio
          </Link>
        </div>

        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Imagen principal */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <img
                  src={cartoon.image}
                  alt={cartoon.title}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Botón de reproducción */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <Play className="w-8 h-8" />
                  </button>
                </div>
              </div>
            </div>

            {/* Información de la serie */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Título y puntuación */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    {cartoon.title}
                  </h1>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 mr-2 fill-current" />
                      <span className="text-lg font-semibold">{cartoon.score}</span>
                    </div>
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                      {cartoon.rating}
                    </span>
                    <span className="text-gray-400">{cartoon.year}</span>
                  </div>
                </div>

                {/* Información básica */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <div className="text-green-400 mb-2">
                      <Tv className="w-6 h-6 mx-auto" />
                    </div>
                    <p className="text-gray-300 text-sm">Red</p>
                    <p className="text-white font-semibold">{cartoon.network}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <div className="text-blue-400 mb-2">
                      <Film className="w-6 h-6 mx-auto" />
                    </div>
                    <p className="text-gray-300 text-sm">Género</p>
                    <p className="text-white font-semibold">{cartoon.genre}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <div className="text-purple-400 mb-2">
                      <Clock className="w-6 h-6 mx-auto" />
                    </div>
                    <p className="text-gray-300 text-sm">Episodios</p>
                    <p className="text-white font-semibold">{cartoon.episodes}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <div className="text-yellow-400 mb-2">
                      <Award className="w-6 h-6 mx-auto" />
                    </div>
                    <p className="text-gray-300 text-sm">Estado</p>
                    <p className="text-white font-semibold">{cartoon.status}</p>
                  </div>
                </div>

                {/* Descripción */}
                <div className="bg-gray-800/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Sinopsis</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {cartoon.longDescription || cartoon.description}
                  </p>
                </div>

                {/* Información adicional */}
                {cartoon.cast && (
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Reparto Principal</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {cartoon.cast.map((actor, index) => (
                        <div key={index} className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <p className="text-white text-sm font-medium">{actor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Reproducir Serie
                  </button>
                  <button className="btn-outline flex items-center justify-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Agregar a Favoritos
                  </button>
                  <button className="bg-gray-800/50 border border-gray-600 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Compartir
                  </button>
                </div>

                {/* Episodios recientes */}
                <div className="bg-gray-800/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Episodios Recientes</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((episode) => (
                      <div key={episode} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/50 transition-colors duration-300">
                        <div>
                          <h4 className="text-white font-medium">Episodio {episode}</h4>
                          <p className="text-gray-400 text-sm">Título del episodio {episode}</p>
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-300">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
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

export default CartoonDetail;
