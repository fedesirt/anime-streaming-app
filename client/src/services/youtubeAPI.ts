// Servicio para obtener trailers de anime desde YouTube API
export class YouTubeAPIService {
  private apiKey: string;
  private baseURL = 'https://www.googleapis.com/youtube/v3';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.REACT_APP_YOUTUBE_API_KEY || '';
  }

  // Buscar trailers de anime
  async searchAnimeTrailers(animeTitle: string, maxResults: number = 5) {
    if (!this.apiKey) {
      console.warn('YouTube API key no configurada');
      return [];
    }

    try {
      const query = `${animeTitle} anime trailer`;
      const response = await fetch(
        `${this.baseURL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`
      }));
    } catch (error) {
      console.error('Error fetching anime trailers:', error);
      return [];
    }
  }

  // Buscar videos relacionados con anime
  async searchAnimeVideos(query: string, maxResults: number = 10) {
    if (!this.apiKey) {
      console.warn('YouTube API key no configurada');
      return [];
    }

    try {
      const response = await fetch(
        `${this.baseURL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`
      }));
    } catch (error) {
      console.error('Error fetching anime videos:', error);
      return [];
    }
  }

  // Obtener detalles de un video específico
  async getVideoDetails(videoId: string) {
    if (!this.apiKey) {
      console.warn('YouTube API key no configurada');
      return null;
    }

    try {
      const response = await fetch(
        `${this.baseURL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.items.length === 0) {
        return null;
      }

      const video = data.items[0];
      return {
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high.url,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        duration: video.contentDetails.duration,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        embedUrl: `https://www.youtube.com/embed/${video.id}`
      };
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  }

  // Obtener videos de canales oficiales de anime
  async getOfficialAnimeChannelVideos(channelId: string, maxResults: number = 20) {
    if (!this.apiKey) {
      console.warn('YouTube API key no configurada');
      return [];
    }

    try {
      const response = await fetch(
        `${this.baseURL}/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=${maxResults}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`
      }));
    } catch (error) {
      console.error('Error fetching official anime channel videos:', error);
      return [];
    }
  }
}

export const youtubeAPIService = new YouTubeAPIService();
