# Guía para Obtener Contenido de Anime Legalmente

## 🎯 **Opciones Legales y Éticas**

### **1. APIs de Información de Anime (Gratuitas)**

#### **Jikan API (MyAnimeList)**
```javascript
// Base URL: https://api.jikan.moe/v4
// Documentación: https://docs.api.jikan.moe/

// Ejemplo de uso
const response = await fetch('https://api.jikan.moe/v4/top/anime');
const data = await response.json();
```

**Ventajas:**
- ✅ Completamente gratuito
- ✅ Sin límites estrictos
- ✅ Información detallada de animes
- ✅ Imágenes de alta calidad
- ✅ Datos de episodios y temporadas

#### **Kitsu API**
```javascript
// Base URL: https://kitsu.io/api/edge
// Documentación: https://kitsu.docs.apiary.io/

const response = await fetch('https://kitsu.io/api/edge/anime');
```

#### **AniList GraphQL API**
```javascript
// Endpoint: https://graphql.anilist.co
// Documentación: https://anilist.gitbook.io/anilist-apiv2-docs/
```

### **2. Contenido de Video Legal**

#### **YouTube Anime Channels**
- Canales oficiales de estudios de anime
- Trailers y promocionales
- Contenido educativo sobre anime

#### **Vimeo Anime Content**
- Cortometrajes de anime
- Contenido experimental
- Documentales sobre anime

#### **Plataformas de Streaming Legales**
- **Crunchyroll** (requiere partnership)
- **Funimation** (requiere partnership)
- **Netflix** (requiere partnership)
- **HIDIVE** (requiere partnership)

### **3. Implementación en tu Aplicación**

#### **Servicio de API (Ya creado)**
```typescript
import { animeAPIService } from './services/animeAPI';

// Obtener animes populares
const popularAnime = await animeAPIService.getPopularAnime();

// Buscar anime
const searchResults = await animeAPIService.searchAnime('Naruto');

// Obtener detalles
const animeDetails = await animeAPIService.getAnimeDetails(12345);
```

#### **Para Videos de Streaming**
```typescript
// Ejemplo de integración con YouTube API
const YOUTUBE_API_KEY = 'tu_api_key';

async function getAnimeTrailers(animeTitle: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${animeTitle}+trailer&type=video&key=${YOUTUBE_API_KEY}`
  );
  return response.json();
}
```

### **4. Opciones de Contenido Gratuito**

#### **Anime de Dominio Público**
- Animes antiguos que ya no tienen derechos de autor
- Obras experimentales y cortometrajes
- Contenido educativo sobre anime

#### **Contenido Creativo Commons**
- Animes con licencia Creative Commons
- Obras de fans autorizadas
- Contenido educativo

### **5. Estructura de Base de Datos Recomendada**

```sql
-- Tabla de animes
CREATE TABLE animes (
  id INTEGER PRIMARY KEY,
  mal_id INTEGER UNIQUE,  -- MyAnimeList ID
  title TEXT NOT NULL,
  english_title TEXT,
  synopsis TEXT,
  image_url TEXT,
  rating REAL,
  episodes INTEGER,
  status TEXT,
  type TEXT,
  year INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de episodios
CREATE TABLE episodes (
  id INTEGER PRIMARY KEY,
  anime_id INTEGER,
  episode_number INTEGER,
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,  -- URL del video (YouTube, Vimeo, etc.)
  duration INTEGER,
  FOREIGN KEY (anime_id) REFERENCES animes(id)
);

-- Tabla de géneros
CREATE TABLE genres (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE
);

-- Tabla de relación anime-género
CREATE TABLE anime_genres (
  anime_id INTEGER,
  genre_id INTEGER,
  FOREIGN KEY (anime_id) REFERENCES animes(id),
  FOREIGN KEY (genre_id) REFERENCES genres(id),
  PRIMARY KEY (anime_id, genre_id)
);
```

### **6. Consideraciones Legales**

#### **Derechos de Autor**
- ⚠️ **Nunca** uses contenido sin permiso
- ✅ Siempre verifica la licencia del contenido
- ✅ Respeta los términos de servicio de las APIs
- ✅ Atribuye correctamente el contenido

#### **Rate Limiting**
```javascript
// Implementar rate limiting para APIs
class RateLimiter {
  private requests: number = 0;
  private lastReset: number = Date.now();
  
  async makeRequest(url: string) {
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
}
```

### **7. Alternativas para Videos**

#### **YouTube Embeds**
```html
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

#### **Vimeo Embeds**
```html
<iframe 
  src="https://player.vimeo.com/video/VIDEO_ID" 
  width="640" 
  height="360" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

### **8. Monetización Legal**

#### **Opciones de Ingresos**
- **Publicidad** en trailers y contenido promocional
- **Suscripciones premium** para contenido exclusivo
- **Donaciones** de usuarios
- **Partnerships** con estudios de anime

#### **Modelo de Negocio**
```typescript
interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  videoQuality: '480p' | '720p' | '1080p';
  ads: boolean;
}
```

### **9. Recursos Adicionales**

#### **APIs Gratuitas**
- [Jikan API](https://docs.api.jikan.moe/) - MyAnimeList
- [Kitsu API](https://kitsu.docs.apiary.io/) - Base de datos de anime
- [AniList GraphQL](https://anilist.gitbook.io/anilist-apiv2-docs/) - Base de datos alternativa

#### **Herramientas de Desarrollo**
- [FFmpeg](https://ffmpeg.org/) - Procesamiento de video
- [Video.js](https://videojs.com/) - Reproductor de video
- [Plyr](https://plyr.io/) - Reproductor alternativo

#### **Plataformas de Hosting**
- **YouTube** - Para trailers y promocionales
- **Vimeo** - Para contenido premium
- **AWS S3** - Para contenido propio
- **Cloudflare Stream** - Para streaming en vivo

### **10. Implementación Recomendada**

1. **Fase 1**: Usar APIs gratuitas para información
2. **Fase 2**: Integrar embeds de YouTube/Vimeo
3. **Fase 3**: Establecer partnerships con estudios
4. **Fase 4**: Desarrollar contenido propio

### **⚠️ Advertencia Legal**

Este documento proporciona información para obtener contenido de anime de manera legal. Siempre:

- Verifica los derechos de autor
- Respeta los términos de servicio
- Obtén permisos cuando sea necesario
- Consulta con un abogado para asuntos legales específicos

---

**Recuerda**: La mejor estrategia es construir una comunidad alrededor del anime y luego establecer partnerships legítimos con los titulares de los derechos.
