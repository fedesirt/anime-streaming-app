import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Star, Play } from 'lucide-react';
import { animeAPIService } from '../services/animeAPI.ts';

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
}

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await animeAPIService.getGenres();
        setGenres(genresData.map(genre => genre.name));
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        let results: Anime[] = [];
        
        if (searchQuery) {
          results = await animeAPIService.searchAnime(searchQuery);
        } else if (selectedGenre) {
          results = await animeAPIService.getAnimeByGenre(selectedGenre);
        } else {
          // Si no hay filtros, mostrar animes populares
          results = await animeAPIService.getPopularAnime(1);
        }
        
        // Filtrar por estado si está seleccionado
        if (selectedStatus) {
          results = results.filter(anime => 
            selectedStatus === 'Completado' ? anime.status === 'Finished' : anime.status === 'Currently Airing'
          );
        }
        
        setAnimeList(results);
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [searchQuery, selectedGenre, selectedStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedGenre) params.set('genre', selectedGenre);
    if (selectedStatus) params.set('status', selectedStatus);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedStatus('');
    setSearchParams({});
  };

  const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => (
    <div className="card group overflow-hidden">
      <div className="relative">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <Link
              to={`/anime/${anime.id}`}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Ver</span>
            </Link>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-dark-800/90 rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{anime.score?.toFixed(1) || 'N/A'}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
        <p className="text-dark-300 text-sm mb-2 line-clamp-2">{anime.synopsis || anime.englishTitle || 'Sin descripción disponible'}</p>
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

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Buscar Anime</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por título o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field w-full pl-10"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="input-field"
                >
                  <option value="">Todos los géneros</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input-field"
                >
                  <option value="">Todos los estados</option>
                  <option value="Completado">Completado</option>
                  <option value="En emisión">En emisión</option>
                </select>
                <button type="submit" className="btn-primary flex items-center space-x-2">
                  <SearchIcon className="w-4 h-4" />
                  <span>Buscar</span>
                </button>
              </div>
            </div>
          </form>

          {/* Active Filters */}
          {(searchQuery || selectedGenre || selectedStatus) && (
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-dark-300">Filtros activos:</span>
              {searchQuery && (
                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                  "{searchQuery}"
                </span>
              )}
              {selectedGenre && (
                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                  {selectedGenre}
                </span>
              )}
              {selectedStatus && (
                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                  {selectedStatus}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-dark-300 hover:text-white transition-colors text-sm"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {animeList.length} resultado{animeList.length !== 1 ? 's' : ''} encontrado{animeList.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {animeList.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-12 h-12 text-dark-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No se encontraron resultados</h3>
                <p className="text-dark-300 mb-4">
                  Intenta ajustar tus filtros de búsqueda o explorar nuestro catálogo completo.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {animeList.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 