#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando AnimeZone para despliegue...\n');

// Verificar estructura del proyecto
const requiredFiles = [
  'server/index.js',
  'server/package.json',
  'client/package.json',
  'client/src/App.tsx'
];

console.log('📋 Verificando estructura del proyecto...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - NO ENCONTRADO`);
    process.exit(1);
  }
});

// Crear archivo .env.example para el servidor
const serverEnvExample = `# Configuración del servidor
NODE_ENV=production
JWT_SECRET=tu_secreto_super_seguro_animezone_2024
MERCADOPAGO_ACCESS_TOKEN=tu_token_de_mercadopago
MERCADOPAGO_PUBLIC_KEY=tu_public_key_de_mercadopago
CORS_ORIGIN=https://tu-frontend.vercel.app
`;

fs.writeFileSync('server/.env.example', serverEnvExample);
console.log('✅ Archivo server/.env.example creado');

// Crear archivo .env.example para el cliente
const clientEnvExample = `# Configuración del cliente
REACT_APP_API_URL=https://tu-backend.onrender.com
REACT_APP_YOUTUBE_API_KEY=tu_youtube_api_key
REACT_APP_MERCADOPAGO_PUBLIC_KEY=tu_mercadopago_public_key
`;

fs.writeFileSync('client/.env.example', clientEnvExample);
console.log('✅ Archivo client/.env.example creado');

// Crear archivo .gitignore si no existe
const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
build/
dist/

# Database
*.db
*.sqlite

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
`;

if (!fs.existsSync('.gitignore')) {
  fs.writeFileSync('.gitignore', gitignoreContent);
  console.log('✅ Archivo .gitignore creado');
} else {
  console.log('✅ Archivo .gitignore ya existe');
}

console.log('\n🎉 ¡Configuración completada!');
console.log('\n📋 Próximos pasos:');
console.log('1. Subir el código a GitHub');
console.log('2. Crear cuenta en Render.com');
console.log('3. Crear cuenta en Vercel.com');
console.log('4. Seguir la guía en DEPLOYMENT_GUIDE.md');
console.log('\n🔗 URLs importantes:');
console.log('- Render: https://render.com');
console.log('- Vercel: https://vercel.com');
console.log('- GitHub: https://github.com');
