#!/bin/bash

echo "🚀 Iniciando build para Render..."

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar que las dependencias estén instaladas
echo "✅ Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules encontrado"
    ls -la node_modules | head -5
else
    echo "❌ node_modules no encontrado"
    exit 1
fi

# Verificar que express esté instalado
if [ -d "node_modules/express" ]; then
    echo "✅ Express instalado correctamente"
else
    echo "❌ Express no encontrado"
    exit 1
fi

echo "🎉 Build completado exitosamente!"
