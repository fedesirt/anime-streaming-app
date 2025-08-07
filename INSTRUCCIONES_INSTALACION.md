# Instrucciones de Instalación - Aplicación de Anime

## Requisitos Previos

### 1. Instalar Node.js
- Ve a https://nodejs.org/
- Descarga la versión LTS (recomendada)
- Ejecuta el instalador
- Reinicia tu terminal/PowerShell después de la instalación

### 2. Verificar la instalación
Abre una nueva ventana de PowerShell y ejecuta:
```bash
node --version
npm --version
```

## Instalación de la Aplicación

### Opción 1: Usar el script automático (Recomendado)
1. Navega a la carpeta del proyecto:
   ```bash
   cd anime-streaming-app
   ```

2. Ejecuta el script de instalación:
   ```bash
   install.bat
   ```

### Opción 2: Instalación manual
1. Instalar dependencias del proyecto raíz:
   ```bash
   npm install
   ```

2. Instalar dependencias del servidor:
   ```bash
   cd server
   npm install
   cd ..
   ```

3. Instalar dependencias del cliente:
   ```bash
   cd client
   npm install
   cd ..
   ```

## Ejecutar la Aplicación

Una vez instaladas todas las dependencias:

```bash
npm run dev
```

Esto iniciará tanto el servidor backend (puerto 5000) como el cliente frontend (puerto 3000).

## Acceder a la Aplicación

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Solución de Problemas

### Error: "npm no se reconoce"
- Asegúrate de haber instalado Node.js correctamente
- Reinicia tu terminal después de instalar Node.js
- Verifica que Node.js esté en tu PATH del sistema

### Error: "Puerto ya en uso"
- Cierra otras aplicaciones que puedan estar usando los puertos 3000 o 5000
- O cambia los puertos en los archivos de configuración

### Error: "Módulo no encontrado"
- Ejecuta `npm install` en la carpeta correspondiente
- Verifica que todos los archivos `package.json` estén presentes

## Estructura del Proyecto

```
anime-streaming-app/
├── client/          # Frontend React
├── server/          # Backend Node.js
├── install.bat      # Script de instalación automática
└── README.md        # Documentación completa
``` 