#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de despliegue...\n');

let allGood = true;

// Verificar archivos de configuración
const configFiles = [
  'server/vercel.json',
  'client/vercel.json',
  'server/render.yaml',
  'DEPLOYMENT_GUIDE.md',
  'server/.env.example',
  'client/.env.example'
];

console.log('📋 Verificando archivos de configuración...');
configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - FALTANTE`);
    allGood = false;
  }
});

// Verificar package.json del servidor
console.log('\n📦 Verificando package.json del servidor...');
try {
  const serverPackage = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));
  
  if (serverPackage.scripts.build) {
    console.log('✅ Script build encontrado');
  } else {
    console.log('❌ Script build faltante');
    allGood = false;
  }
  
  if (serverPackage.engines && serverPackage.engines.node) {
    console.log('✅ Versión de Node especificada');
  } else {
    console.log('❌ Versión de Node no especificada');
    allGood = false;
  }
} catch (error) {
  console.log('❌ Error leyendo server/package.json');
  allGood = false;
}

// Verificar package.json del cliente
console.log('\n📦 Verificando package.json del cliente...');
try {
  const clientPackage = JSON.parse(fs.readFileSync('client/package.json', 'utf8'));
  
  if (clientPackage.scripts.build) {
    console.log('✅ Script build encontrado');
  } else {
    console.log('❌ Script build faltante');
    allGood = false;
  }
  
  // Verificar que no tenga proxy configurado
  if (!clientPackage.proxy) {
    console.log('✅ Proxy removido correctamente');
  } else {
    console.log('❌ Proxy aún configurado - debe removerse');
    allGood = false;
  }
} catch (error) {
  console.log('❌ Error leyendo client/package.json');
  allGood = false;
}

// Verificar estructura de directorios
console.log('\n📁 Verificando estructura de directorios...');
const requiredDirs = [
  'server',
  'client',
  'server/routes',
  'server/database',
  'client/src',
  'client/src/components',
  'client/src/pages'
];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/`);
  } else {
    console.log(`❌ ${dir}/ - FALTANTE`);
    allGood = false;
  }
});

// Verificar archivos principales
console.log('\n📄 Verificando archivos principales...');
const mainFiles = [
  'server/index.js',
  'server/config.js',
  'server/env.config.js',
  'client/src/App.tsx',
  'client/src/index.tsx',
  'client/public/index.html'
];

mainFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - FALTANTE`);
    allGood = false;
  }
});

// Resultado final
console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 ¡Todo está listo para el despliegue!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Subir código a GitHub');
  console.log('2. Crear cuenta en Render.com');
  console.log('3. Crear cuenta en Vercel.com');
  console.log('4. Seguir DEPLOYMENT_GUIDE.md');
} else {
  console.log('⚠️  Hay problemas que deben resolverse antes del despliegue');
  console.log('\n🔧 Revisa los errores marcados con ❌');
}
console.log('='.repeat(50));
