# Script para instalar dependencias de la aplicación de anime
Write-Host "Configurando Node.js y npm..." -ForegroundColor Green

# Configurar alias para Node.js y npm
Set-Alias -Name node -Value "D:\node\node.exe" -Scope Global
Set-Alias -Name npm -Value "D:\node\npm.cmd" -Scope Global

# Verificar que funcionan
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = & "D:\node\node.exe" --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: No se pudo ejecutar Node.js" -ForegroundColor Red
    exit 1
}

Write-Host "Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = & "D:\node\npm.cmd" --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: No se pudo ejecutar npm" -ForegroundColor Red
    exit 1
}

# Navegar al directorio del proyecto
Write-Host "Navegando al directorio del proyecto..." -ForegroundColor Yellow
Set-Location "C:\Users\feder\anime-streaming-app"

# Instalar dependencias del proyecto raíz
Write-Host "Instalando dependencias del proyecto raíz..." -ForegroundColor Yellow
try {
    & "D:\node\npm.cmd" install
    Write-Host "✓ Dependencias del proyecto raíz instaladas" -ForegroundColor Green
} catch {
    Write-Host "✗ Error instalando dependencias del proyecto raíz" -ForegroundColor Red
}

# Instalar dependencias del servidor
Write-Host "Instalando dependencias del servidor..." -ForegroundColor Yellow
Set-Location "server"
try {
    & "D:\node\npm.cmd" install
    Write-Host "✓ Dependencias del servidor instaladas" -ForegroundColor Green
} catch {
    Write-Host "✗ Error instalando dependencias del servidor" -ForegroundColor Red
}
Set-Location ".."

# Instalar dependencias del cliente
Write-Host "Instalando dependencias del cliente..." -ForegroundColor Yellow
Set-Location "client"
try {
    & "D:\node\npm.cmd" install
    Write-Host "✓ Dependencias del cliente instaladas" -ForegroundColor Green
} catch {
    Write-Host "✗ Error instalando dependencias del cliente" -ForegroundColor Red
}
Set-Location ".."

Write-Host "`n¡Instalación completada!" -ForegroundColor Green
Write-Host "Para ejecutar la aplicación, usa: npm run dev" -ForegroundColor Cyan
Write-Host "O ejecuta: D:\node\npm.cmd run dev" -ForegroundColor Cyan

# Pausar para que el usuario vea los resultados
Read-Host "Presiona Enter para continuar..." 