# 🎌 AnimeStream - Aplicación de Streaming de Anime

Una aplicación web moderna y completa para ver anime, construida con React, Node.js y SQLite.

## ✨ Características

- 🎬 **Reproductor de video integrado** - Ve tus animes favoritos directamente en la aplicación
- 🔍 **Búsqueda avanzada** - Busca por título, descripción, género y estado
- ❤️ **Sistema de favoritos** - Guarda tus animes preferidos
- 👤 **Autenticación de usuarios** - Registro e inicio de sesión seguro
- 📱 **Diseño responsive** - Funciona perfectamente en móviles y desktop
- 🎨 **Interfaz moderna** - Diseño atractivo con tema oscuro
- ⚡ **Rendimiento optimizado** - Carga rápida y experiencia fluida

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de CSS utilitario
- **React Router** - Enrutamiento de la aplicación
- **Axios** - Cliente HTTP para las peticiones
- **Lucide React** - Iconos modernos

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **SQLite** - Base de datos ligera
- **bcryptjs** - Encriptación de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **CORS** - Configuración de CORS
- **Helmet** - Seguridad de headers

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd anime-streaming-app
   ```

2. **Instala todas las dependencias**
   ```bash
   npm run install-all
   ```

3. **Inicia la aplicación en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   - Frontend: http://localhost:3000
   - Backend API: http://animezone.com.ar:5000

### Scripts Disponibles

- `npm run dev` - Inicia tanto el servidor como el cliente en modo desarrollo
- `npm run server` - Solo inicia el servidor backend
- `npm run client` - Solo inicia el cliente frontend
- `npm run build` - Construye la aplicación para producción
- `npm run install-all` - Instala todas las dependencias del proyecto

## 📁 Estructura del Proyecto

```
anime-streaming-app/
├── client/                 # Frontend React
│   ├── public/            # Archivos públicos
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── contexts/      # Contextos de React
│   │   ├── pages/         # Páginas de la aplicación
│   │   └── index.tsx      # Punto de entrada
│   └── package.json
├── server/                # Backend Node.js
│   ├── database/          # Configuración de base de datos
│   ├── routes/            # Rutas de la API
│   └── index.js           # Servidor principal
└── package.json           # Configuración principal
```

## 🎯 Funcionalidades Principales

### Página de Inicio
- Hero section atractivo
- Sección de animes populares
- Sección de animes recientes
- Características de la plataforma

### Sistema de Búsqueda
- Búsqueda por texto
- Filtros por género
- Filtros por estado (Completado/En emisión)
- Resultados en tiempo real

### Detalles del Anime
- Información completa del anime
- Reproductor de video modal
- Botón de agregar/quitar de favoritos
- Información detallada (géneros, episodios, etc.)

### Sistema de Usuarios
- Registro de nuevos usuarios
- Inicio de sesión
- Gestión de favoritos
- Autenticación JWT

### Página de Favoritos
- Lista de animes favoritos
- Opción de quitar de favoritos
- Acciones rápidas

## 🔧 Configuración de la Base de Datos

La aplicación utiliza SQLite como base de datos. Al iniciar por primera vez, se creará automáticamente:

- **Tabla `users`** - Información de usuarios
- **Tabla `anime`** - Catálogo de animes
- **Tabla `favorites`** - Relación usuarios-animes favoritos

Los datos de ejemplo incluyen 5 animes populares para comenzar.

## 🎨 Personalización

### Colores y Tema
Los colores principales están definidos en `client/tailwind.config.js`:
- **Primary**: Rojo (#ef4444)
- **Dark**: Escala de grises oscuros
- **Gradientes**: Combinaciones atractivas

### Agregar Nuevos Animes
Para agregar más animes, modifica el archivo `server/database/init.js` y agrega nuevos objetos al array `sampleAnime`.

## 🚀 Despliegue

### Desarrollo Local
```bash
npm run dev
```

### Producción
1. Construye el frontend:
   ```bash
   cd client
   npm run build
   ```

2. Configura las variables de entorno:
   ```bash
   # .env
   PORT=5000
   JWT_SECRET=tu_secreto_super_seguro
   ```

3. Inicia el servidor:
   ```bash
   cd server
   npm start
   ```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [React](https://reactjs.org/) - Biblioteca de interfaz de usuario
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Lucide](https://lucide.dev/) - Iconos modernos
- [Express.js](https://expressjs.com/) - Framework web para Node.js

---

¡Disfruta viendo anime con AnimeStream! 🎌✨ 