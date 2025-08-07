// Configuración de APIs para la aplicación de anime
import { ENV_CONFIG } from './environment';

export const API_CONFIG = {
  // Jikan API (MyAnimeList)
  JIKAN: {
    BASE_URL: 'https://api.jikan.moe/v4',
    RATE_LIMIT: 60, // requests per minute
    TIMEOUT: 10000, // 10 seconds
  },
  
  // YouTube API
  YOUTUBE: {
    BASE_URL: 'https://www.googleapis.com/youtube/v3',
    API_KEY: ENV_CONFIG.YOUTUBE_API_KEY,
    RATE_LIMIT: 100, // requests per day
  },
  
  // Kitsu API
  KITSU: {
    BASE_URL: 'https://kitsu.io/api/edge',
    TIMEOUT: 10000,
  },
  
  // AniList GraphQL
  ANILIST: {
    ENDPOINT: 'https://graphql.anilist.co',
    TIMEOUT: 10000,
  }
};

// Canales oficiales de anime en YouTube
export const OFFICIAL_ANIME_CHANNELS = {
  CRUNCHYROLL: 'UC6c1z7bA__gCIlr4LJz9XQg',
  FUNIMATION: 'UCW9pyonagDwyAC9YkI7yQ4g',
  ANIPLEX: 'UCvSwGWwN6TEnbS1e3jurf4Q',
  SENTAI_FILMWORKS: 'UCW9pyonagDwyAC9YkI7yQ4g',
  VIZ_MEDIA: 'UCW9pyonagDwyAC9YkI7yQ4g',
};

// Géneros populares de anime
export const POPULAR_GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller'
];

// Estados de anime
export const ANIME_STATUS = {
  FINISHED: 'Finished',
  CURRENTLY_AIRING: 'Currently Airing',
  NOT_YET_AIRED: 'Not yet aired',
  CANCELLED: 'Cancelled'
};

// Tipos de anime
export const ANIME_TYPES = {
  TV: 'TV',
  MOVIE: 'Movie',
  OVA: 'OVA',
  ONA: 'ONA',
  SPECIAL: 'Special',
  MUSIC: 'Music'
};

// Configuración de rate limiting
export class RateLimiter {
  private requests: Map<string, number> = new Map();
  private lastReset: Map<string, number> = new Map();

  async makeRequest(apiName: string, url: string, options?: RequestInit): Promise<Response> {
    const config = API_CONFIG[apiName as keyof typeof API_CONFIG];
    if (!config) {
      throw new Error(`API ${apiName} no configurada`);
    }

    const now = Date.now();
    const lastReset = this.lastReset.get(apiName) || 0;
    const requests = this.requests.get(apiName) || 0;

    // Reset counter if a minute has passed
    if (now - lastReset >= 60000) {
      this.requests.set(apiName, 0);
      this.lastReset.set(apiName, now);
    }

    // Check rate limit
    if (requests >= config.RATE_LIMIT) {
      const waitTime = 60000 - (now - lastReset);
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
      this.requests.set(apiName, 0);
      this.lastReset.set(apiName, Date.now());
    }

    // Increment request counter
    this.requests.set(apiName, requests + 1);

    // Make the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.TIMEOUT || 10000);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}

export const rateLimiter = new RateLimiter();

// Utilidades para manejo de errores
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public api?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Función para manejar errores de API
export const handleAPIError = (error: any, apiName: string): APIError => {
  if (error instanceof APIError) {
    return error;
  }

  if (error.name === 'AbortError') {
    return new APIError(`Timeout en ${apiName}`, 408, apiName);
  }

  if (error.response) {
    return new APIError(
      `Error ${error.response.status} en ${apiName}: ${error.response.statusText}`,
      error.response.status,
      apiName
    );
  }

  return new APIError(`Error desconocido en ${apiName}: ${error.message}`, undefined, apiName);
};
