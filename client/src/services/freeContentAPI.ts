import { ENV_CONFIG } from '../config/environment';

// Servicio para obtener contenido gratuito de anime desde APIs públicas
export interface FreeAnimeContent {
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

// APIs gratuitas disponibles
export const FREE_CONTENT_APIS = {
  JIKAN: 'https://api.jikan.moe/v4',
  KITSU: 'https://kitsu.io/api/edge',
  YOUTUBE: 'https://www.googleapis.com/youtube/v3'
};

export class FreeContentService {
  // Obtener animes populares desde Jikan API (MyAnimeList)
  static async getPopularAnime(limit: number = 20): Promise<FreeAnimeContent[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN}/top/anime?limit=${limit}`);
      const data = await response.json();
      
      return data.data?.map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        synopsis: anime.synopsis,
        score: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        image: anime.images?.jpg?.image_url || anime.images?.webp?.image_url,
        type: anime.type,
        year: anime.year
      })) || [];
    } catch (error) {
      console.error('Error fetching popular anime:', error);
      return [];
    }
  }

  // Obtener animes de la temporada actual
  static async getCurrentSeasonAnime(limit: number = 20): Promise<FreeAnimeContent[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN}/seasons/now?limit=${limit}`);
      const data = await response.json();
      
      return data.data?.map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        synopsis: anime.synopsis,
        score: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        image: anime.images?.jpg?.image_url || anime.images?.webp?.image_url,
        type: anime.type,
        year: anime.year
      })) || [];
    } catch (error) {
      console.error('Error fetching current season anime:', error);
      return [];
    }
  }

  // Buscar animes por término
  static async searchAnime(query: string, limit: number = 20): Promise<FreeAnimeContent[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN}/anime?q=${encodeURIComponent(query)}&limit=${limit}`);
      const data = await response.json();
      
      return data.data?.map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        synopsis: anime.synopsis,
        score: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        image: anime.images?.jpg?.image_url || anime.images?.webp?.image_url,
        type: anime.type,
        year: anime.year
      })) || [];
    } catch (error) {
      console.error('Error searching anime:', error);
      return [];
    }
  }

  // Obtener detalles de un anime específico
  static async getAnimeDetails(id: number): Promise<FreeAnimeContent | null> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN}/anime/${id}`);
      const data = await response.json();
      
      if (data.data) {
        const anime = data.data;
        return {
          id: anime.mal_id,
          title: anime.title,
          synopsis: anime.synopsis,
          score: anime.score,
          episodes: anime.episodes,
          status: anime.status,
          image: anime.images?.jpg?.image_url || anime.images?.webp?.image_url,
          type: anime.type,
          year: anime.year
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching anime details:', error);
      return null;
    }
  }

  // Obtener videos de YouTube relacionados con anime
  static async getYouTubeVideos(query: string, limit: number = 10): Promise<any[]> {
    try {
      // Nota: Para usar la API de YouTube necesitarías una API key
      // Por ahora retornamos datos de ejemplo
      return [
        {
          id: { videoId: 'dQw4w9WgXcQ' },
          snippet: {
            title: 'Anime Review - Demon Slayer',
            description: 'Revisión completa de Demon Slayer',
            thumbnails: {
              medium: {
                url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=320&h=180&fit=crop&crop=center'
              }
            },
            channelTitle: 'Anime Reviews',
            publishedAt: '2024-01-15T00:00:00Z'
          }
        },
        {
          id: { videoId: 'dQw4w9WgXcQ' },
          snippet: {
            title: 'Top 10 Animes 2024',
            description: 'Los mejores animes del año 2024',
            thumbnails: {
              medium: {
                url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=320&h=180&fit=crop&crop=center'
              }
            },
            channelTitle: 'Anime Top',
            publishedAt: '2024-01-10T00:00:00Z'
          }
        }
      ];
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      return [];
    }
  }

  // Obtener recomendaciones basadas en un anime
  static async getRecommendations(animeId: number, limit: number = 10): Promise<FreeAnimeContent[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN}/anime/${animeId}/recommendations?limit=${limit}`);
      const data = await response.json();
      
      return data.data?.map((rec: any) => ({
        id: rec.entry.mal_id,
        title: rec.entry.title,
        synopsis: rec.entry.synopsis,
        score: rec.entry.score,
        episodes: rec.entry.episodes,
        status: rec.entry.status,
        image: rec.entry.images?.jpg?.image_url || rec.entry.images?.webp?.image_url,
        type: rec.entry.type,
        year: rec.entry.year
      })) || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  }

  // Obtener géneros disponibles
  static async getGenres(): Promise<{ id: number; name: string }[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN}/genres/anime`);
      const data = await response.json();
      
      return data.data?.map((genre: any) => ({
        id: genre.mal_id,
        name: genre.name
      })) || [];
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  }

  // Obtener animes por género
  static async getAnimeByGenre(genreId: number, limit: number = 20): Promise<FreeAnimeContent[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN}/anime?genres=${genreId}&limit=${limit}`);
      const data = await response.json();
      
      return data.data?.map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        synopsis: anime.synopsis,
        score: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        image: anime.images?.jpg?.image_url || anime.images?.webp?.image_url,
        type: anime.type,
        year: anime.year
      })) || [];
    } catch (error) {
      console.error('Error fetching anime by genre:', error);
      return [];
    }
  }
}

// Exportar también como servicio por defecto para compatibilidad
export const animeAPIService = FreeContentService;
