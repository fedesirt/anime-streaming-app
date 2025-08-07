import { ENV_CONFIG } from '../config/environment';

// Configuración de APIs gratuitas
export const FREE_CONTENT_APIS = {
  // Jikan API (MyAnimeList) - Información de anime
  JIKAN: {
    BASE_URL: 'https://api.jikan.moe/v4',
    ENDPOINTS: {
      TOP_ANIME: '/top/anime',
      SEASONAL: '/seasons/now',
      SEARCH: '/anime',
      ANIME_DETAILS: '/anime',
      RECOMMENDATIONS: '/recommendations/anime'
    }
  },
  
  // Kitsu API - Información adicional
  KITSU: {
    BASE_URL: 'https://kitsu.io/api/edge',
    ENDPOINTS: {
      ANIME: '/anime',
      TRENDING: '/trending/anime'
    }
  },
  
  // YouTube API - Videos relacionados
  YOUTUBE: {
    BASE_URL: 'https://www.googleapis.com/youtube/v3',
    CHANNELS: {
      CRUNCHYROLL: 'UC6c1z7bA__gCIlr4LJz9XQg',
      FUNIMATION: 'UCW9pyonagDwyAC9YkI7yQ4g',
      ANIPLEX: 'UCvSwGWwN6TEnbS1e3jurf4Q',
      GIGGUK: 'UCpIC5X5oy0VQDV6tvJUiwoQ',
      MOTHERS_BASEMENT: 'UCBbsLlD6pyXL-7RGfT7u9DA'
    }
  }
};

// Tipos de contenido gratuito
export interface FreeAnimeContent {
  id: number;
  title: string;
  type: 'trailer' | 'review' | 'analysis' | 'clip' | 'promo';
  source: 'youtube' | 'jikan' | 'kitsu';
  url: string;
  thumbnail?: string;
  duration?: string;
  description?: string;
}

// Servicio para obtener contenido gratuito
export class FreeContentService {
  
  // Obtener anime populares gratuitos
  static async getPopularAnime(limit: number = 20): Promise<any[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN.BASE_URL}${FREE_CONTENT_APIS.JIKAN.ENDPOINTS.TOP_ANIME}?limit=${limit}`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error obteniendo anime populares:', error);
      return [];
    }
  }
  
  // Obtener anime de la temporada actual
  static async getCurrentSeasonAnime(): Promise<any[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN.BASE_URL}${FREE_CONTENT_APIS.JIKAN.ENDPOINTS.SEASONAL}`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error obteniendo anime de temporada:', error);
      return [];
    }
  }
  
  // Buscar anime
  static async searchAnime(query: string): Promise<any[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN.BASE_URL}${FREE_CONTENT_APIS.JIKAN.ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}&limit=20`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error buscando anime:', error);
      return [];
    }
  }
  
  // Obtener detalles de un anime
  static async getAnimeDetails(id: number): Promise<any> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN.BASE_URL}${FREE_CONTENT_APIS.JIKAN.ENDPOINTS.ANIME_DETAILS}/${id}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error obteniendo detalles del anime:', error);
      return null;
    }
  }
  
  // Obtener videos de YouTube relacionados
  static async getYouTubeVideos(animeTitle: string): Promise<FreeAnimeContent[]> {
    if (!ENV_CONFIG.YOUTUBE_API_KEY) {
      console.warn('YouTube API key no configurada');
      return [];
    }
    
    try {
      const query = `${animeTitle} anime trailer review`;
      const response = await fetch(
        `${FREE_CONTENT_APIS.YOUTUBE.BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${ENV_CONFIG.YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      
      return data.items?.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        type: this.detectVideoType(item.snippet.title),
        source: 'youtube' as const,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails?.medium?.url,
        description: item.snippet.description
      })) || [];
    } catch (error) {
      console.error('Error obteniendo videos de YouTube:', error);
      return [];
    }
  }
  
  // Detectar tipo de video basado en el título
  private static detectVideoType(title: string): 'trailer' | 'review' | 'analysis' | 'clip' | 'promo' {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('trailer')) return 'trailer';
    if (lowerTitle.includes('review')) return 'review';
    if (lowerTitle.includes('analysis') || lowerTitle.includes('análisis')) return 'analysis';
    if (lowerTitle.includes('clip')) return 'clip';
    return 'promo';
  }
  
  // Obtener recomendaciones
  static async getRecommendations(animeId: number): Promise<any[]> {
    try {
      const response = await fetch(`${FREE_CONTENT_APIS.JIKAN.BASE_URL}${FREE_CONTENT_APIS.JIKAN.ENDPOINTS.RECOMMENDATIONS}?page=1`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error obteniendo recomendaciones:', error);
      return [];
    }
  }
}

// Utilidades para contenido gratuito
export const FreeContentUtils = {
  // Verificar si un anime tiene contenido gratuito disponible
  async hasFreeContent(animeId: number): Promise<boolean> {
    try {
      const details = await FreeContentService.getAnimeDetails(animeId);
      return !!(details?.trailer?.url || details?.videos?.length > 0);
    } catch {
      return false;
    }
  },
  
  // Obtener todos los tipos de contenido gratuito para un anime
  async getAllFreeContent(animeTitle: string): Promise<FreeAnimeContent[]> {
    const [youtubeVideos, animeDetails] = await Promise.all([
      FreeContentService.getYouTubeVideos(animeTitle),
      FreeContentService.getAnimeDetails(1) // Placeholder
    ]);
    
    return [...youtubeVideos];
  }
};
