# 🚀 Guía de Despliegue - AnimeZone

## 📋 Resumen del Proyecto
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + SQLite
- **Hosting**: Vercel (Frontend) + Render (Backend)

## 🎯 Plan de Despliegue

### 1. Backend en Render
1. Crear cuenta en [Render.com](https://render.com)
2. Conectar repositorio de GitHub
3. Configurar variables de entorno
4. Desplegar

### 2. Frontend en Vercel
1. Crear cuenta en [Vercel.com](https://vercel.com)
2. Conectar repositorio de GitHub
3. Configurar variables de entorno
4. Desplegar

## 🔧 Configuración del Backend (Render)

### Variables de Entorno Necesarias:
```env
NODE_ENV=production
JWT_SECRET=tu_secreto_super_seguro_animezone_2024
MERCADOPAGO_ACCESS_TOKEN=tu_token_de_mercadopago
MERCADOPAGO_PUBLIC_KEY=tu_public_key_de_mercadopago
CORS_ORIGIN=https://tu-frontend.vercel.app
```

### Pasos en Render:
1. **Crear cuenta** en Render.com
2. **Nuevo Web Service**
3. **Conectar GitHub** y seleccionar el repositorio
4. **Configurar**:
   - **Name**: animezone-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`

### Configuración de Variables de Entorno:
1. Ir a **Environment** en Render
2. Agregar las variables listadas arriba
3. **Guardar** configuración

## 🎨 Configuración del Frontend (Vercel)

### Variables de Entorno Necesarias:
```env
REACT_APP_API_URL=https://tu-backend.onrender.com
REACT_APP_YOUTUBE_API_KEY=tu_youtube_api_key
REACT_APP_MERCADOPAGO_PUBLIC_KEY=tu_mercadopago_public_key
```

### Pasos en Vercel:
1. **Crear cuenta** en Vercel.com
2. **Import Project** desde GitHub
3. **Configurar**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Configuración de Variables de Entorno:
1. Ir a **Settings** > **Environment Variables**
2. Agregar las variables listadas arriba
3. **Deploy** el proyecto

## 🔗 URLs Finales

### Después del Despliegue:
- **Frontend**: `https://tu-app.vercel.app`
- **Backend**: `https://tu-backend.onrender.com`

## 🛠️ Comandos Útiles

### Desarrollo Local:
```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm start
```

### Build para Producción:
```bash
# Backend
cd server
npm install
npm start

# Frontend
cd client
npm install
npm run build
```

## 🔍 Verificación del Despliegue

### Backend:
- ✅ API responde en `/`
- ✅ Base de datos inicializada
- ✅ CORS configurado correctamente
- ✅ Variables de entorno cargadas

### Frontend:
- ✅ Aplicación carga sin errores
- ✅ Conexión con backend establecida
- ✅ Rutas funcionando correctamente
- ✅ Variables de entorno cargadas

## 🚨 Solución de Problemas

### Error de CORS:
- Verificar que `CORS_ORIGIN` apunte a la URL correcta del frontend
- Asegurar que la URL del frontend esté en la lista de orígenes permitidos

### Error de Base de Datos:
- Verificar que SQLite esté configurado correctamente
- En Render, la base de datos se reinicia en cada deploy

### Error de Variables de Entorno:
- Verificar que todas las variables estén configuradas
- Reiniciar el servicio después de cambiar variables

## 📞 Soporte

Si encuentras problemas:
1. Revisar logs en Render/Vercel
2. Verificar variables de entorno
3. Comprobar conectividad entre frontend y backend
4. Revisar configuración de CORS

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu aplicación estará disponible en:
- **Frontend**: https://tu-app.vercel.app
- **Backend**: https://tu-backend.onrender.com

¡Tu aplicación de streaming de anime estará online! 🎬✨
