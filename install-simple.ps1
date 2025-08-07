Write-Host "Instalando dependencias de la aplicación de anime..." -ForegroundColor Green

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = & "D:\node\node.exe" --version
Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green

# Verificar npm
Write-Host "Verificando npm..." -ForegroundColor Yellow
$npmVersion = & "D:\node\npm.cmd" --version
Write-Host "npm version: $npmVersion" -ForegroundColor Green

# Navegar al directorio del proyecto
Write-Host "Navegando al directorio del proyecto..." -ForegroundColor Yellow
Set-Location "C:\Users\feder\anime-streaming-app"

# Instalar dependencias del proyecto raíz
Write-Host "Instalando dependencias del proyecto raíz..." -ForegroundColor Yellow
& "D:\node\npm.cmd" install
Write-Host "✓ Dependencias del proyecto raíz instaladas" -ForegroundColor Green

# Instalar dependencias del servidor
Write-Host "Instalando dependencias del servidor..." -ForegroundColor Yellow
Set-Location "server"
& "D:\node\npm.cmd" install
Write-Host "✓ Dependencias del servidor instaladas" -ForegroundColor Green
Set-Location ".."

# Instalar dependencias del cliente
Write-Host "Instalando dependencias del cliente..." -ForegroundColor Yellow
Set-Location "client"
& "D:\node\npm.cmd" install
Write-Host "✓ Dependencias del cliente instaladas" -ForegroundColor Green
Set-Location ".."

Write-Host "`n¡Instalación completada!" -ForegroundColor Green
Write-Host "Para ejecutar la aplicación, usa: D:\node\npm.cmd run dev" -ForegroundColor Cyan

Read-Host "Presiona Enter para continuar..." 