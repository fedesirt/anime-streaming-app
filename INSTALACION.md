# 📋 Instrucciones de Instalación - AnimeStream

## 🔧 Prerrequisitos

### 1. Instalar Node.js
1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación abriendo una terminal y ejecutando:
   ```bash
   node --version
   npm --version
   ```

### 2. Verificar la instalación
Abre PowerShell o Command Prompt y ejecuta:
```bash
node --version
npm --version
```

Si ves las versiones, Node.js está instalado correctamente.

## 🚀 Instalación de la Aplicación

### Paso 1: Navegar al directorio
```bash
cd anime-streaming-app
```

### Paso 2: Instalar dependencias del proyecto principal
```bash
npm install
```

### Paso 3: Instalar dependencias del servidor
```bash
cd server
npm install
cd ..
```

### Paso 4: Instalar dependencias del cliente
```bash
cd client
npm install
cd ..
```

## 🎯 Ejecutar la Aplicación

### Opción 1: Ejecutar todo junto (recomendado)
```bash
npm run dev
```

### Opción 2: Ejecutar por separado

**Terminal 1 - Servidor:**
```bash
cd server
npm run dev
```

**Terminal 2 - Cliente:**
```bash
cd client
npm start
```

## 🌐 Acceder a la Aplicación

Una vez que todo esté ejecutándose:

- **Frontend (Interfaz web)**: http://localhost:3000
- **Backend (API)**: http://localhost:5000

## 📱 Características de la Aplicación

### Funcionalidades Principales:
1. **Página de Inicio** - Con animes populares y recientes
2. **Sistema de Búsqueda** - Busca por título, género y estado
3. **Detalles del Anime** - Información completa y reproductor
4. **Sistema de Usuarios** - Registro e inicio de sesión
5. **Favoritos** - Guarda tus animes preferidos

### Datos de Ejemplo Incluidos:
- Attack on Titan
- Death Note
- One Piece
- Naruto
- Dragon Ball Z

## 🔧 Solución de Problemas

### Error: "npm no se reconoce"
- Asegúrate de que Node.js esté instalado correctamente
- Reinicia la terminal después de instalar Node.js
- Verifica que npm esté en el PATH del sistema

### Error: "Puerto ya en uso"
- Cierra otras aplicaciones que usen los puertos 3000 o 5000
- O cambia los puertos en los archivos de configuración

### Error: "Módulos no encontrados"
- Ejecuta `npm install` en cada directorio (root, server, client)
- Elimina la carpeta `node_modules` y ejecuta `npm install` nuevamente

## 📝 Comandos Útiles

```bash
# Instalar todas las dependencias
npm run install-all

# Solo servidor
npm run server

# Solo cliente
npm run client

# Construir para producción
npm run build
```

## 🎨 Personalización

### Agregar más animes:
1. Edita `server/database/init.js`
2. Agrega nuevos objetos al array `sampleAnime`
3. Reinicia el servidor

### Cambiar colores:
1. Edita `client/tailwind.config.js`
2. Modifica los colores en la sección `theme.extend.colors`

## 🆘 Soporte

Si tienes problemas:
1. Verifica que Node.js esté instalado (versión 16+)
2. Asegúrate de estar en el directorio correcto
3. Ejecuta los comandos de instalación paso a paso
4. Revisa los mensajes de error en la terminal

---

¡Disfruta de tu aplicación de anime! 🎌✨ 