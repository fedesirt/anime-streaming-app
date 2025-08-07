// Servicio para obtener información de anime desde APIs legales
export class AnimeAPIService {
  private jikanBaseURL = 'https://api.jikan.moe/v4';
  private kitsuBaseURL = 'https://kitsu.io/api/edge';
  private requests: number = 0;
  private lastReset: number = Date.now();

  // Rate limiting para evitar exceder límites de API
  private async makeRequest(url: string) {
    if (this.requests >= 60) { // 60 requests per minute
      const waitTime = 60000 - (Date.now() - this.lastReset);
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
      this.requests = 0;
      this.lastReset = Date.now();
    }
    
    this.requests++;
    return fetch(url);
  }

  // Obtener animes populares desde Jikan (MyAnimeList)
  async getPopularAnime(page: number = 1) {
    try {
      const response = await this.makeRequest(`${this.jikanBaseURL}/top/anime?page=${page}`);
      const data = await response.json();
      return data.data.map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        englishTitle: anime.title_english,
        image: anime.images.jpg.large_image_url,
        synopsis: anime.synopsis,
        rating: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        type: anime.type,
        year: anime.year,
        genres: anime.genres?.map((genre: any) => genre.name) || []
      }));
    } catch (error) {
      console.error('Error fetching popular anime:', error);
      return [];
    }
  }

  // Buscar anime por título
  async searchAnime(query: string) {
    try {
      const response = await this.makeRequest(`${this.jikanBaseURL}/anime?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.data.map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        englishTitle: anime.title_english,
        image: anime.images.jpg.large_image_url,
        synopsis: anime.synopsis,
        rating: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        type: anime.type,
        year: anime.year,
        genres: anime.genres?.map((genre: any) => genre.name) || []
      }));
    } catch (error) {
      console.error('Error searching anime:', error);
      return [];
    }
  }

  // Obtener detalles de un anime específico
  async getAnimeDetails(id: number) {
    try {
      const response = await this.makeRequest(`${this.jikanBaseURL}/anime/${id}/full`);
      const data = await response.json();
      return {
        id: data.data.mal_id,
        title: data.data.title,
        englishTitle: data.data.title_english,
        image: data.data.images.jpg.large_image_url,
        synopsis: data.data.synopsis,
        score: data.data.score,
        episodes: data.data.episodes,
        status: data.data.status,
        type: data.data.type,
        year: data.data.year,
        genres: data.data.genres?.map((genre: any) => genre.name) || [],
        studios: data.data.studios?.map((studio: any) => studio.name) || [],
        duration: data.data.duration,
        rating: data.data.rating,
        trailer: data.data.trailer?.url || null
      };
    } catch (error) {
      console.error('Error fetching anime details:', error);
      return null;
    }
  }

  // Obtener episodios de un anime
  async getAnimeEpisodes(id: number) {
    try {
      const response = await this.makeRequest(`${this.jikanBaseURL}/anime/${id}/episodes`);
      const data = await response.json();
      return data.data.map((episode: any) => ({
        id: episode.mal_id,
        number: episode.mal_id,
        title: episode.title,
        japaneseTitle: episode.title_japanese,
        aired: episode.aired?.string,
        score: episode.score
      }));
    } catch (error) {
      console.error('Error fetching anime episodes:', error);
      return [];
    }
  }

  // Obtener animes de temporada actual
  async getCurrentSeasonAnime() {
    try {
      const response = await this.makeRequest(`${this.jikanBaseURL}/seasons/now`);
      const data = await response.json();
      return data.data.map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        englishTitle: anime.title_english,
        image: anime.images.jpg.large_image_url,
        synopsis: anime.synopsis,
        rating: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        type: anime.type,
        year: anime.year,
        genres: anime.genres?.map((genre: any) => genre.name) || []
      }));
    } catch (error) {
      console.error('Error fetching current season anime:', error);
      return [];
    }
  }

  // Obtener animes por género
  async getAnimeByGenre(genre: string) {
    try {
      const response = await this.makeRequest(`${this.jikanBaseURL}/anime?genres=${encodeURIComponent(genre)}`);
      const data = await response.json();
      return data.data.map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        englishTitle: anime.title_english,
        image: anime.images.jpg.large_image_url,
        synopsis: anime.synopsis,
        rating: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        type: anime.type,
        year: anime.year,
        genres: anime.genres?.map((genre: any) => genre.name) || []
      }));
    } catch (error) {
      console.error('Error fetching anime by genre:', error);
      return [];
    }
  }

  // Obtener lista de géneros disponibles
  async getGenres() {
    try {
      const response = await this.makeRequest(`${this.jikanBaseURL}/genres/anime`);
      const data = await response.json();
      return data.data.map((genre: any) => ({
        id: genre.mal_id,
        name: genre.name,
        count: genre.count
      }));
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  }
}

export const animeAPIService = new AnimeAPIService();
