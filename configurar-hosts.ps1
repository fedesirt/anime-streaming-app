# Script para configurar el archivo hosts
# Ejecutar como administrador

Write-Host "Configurando archivo hosts para animezone.com.ar..." -ForegroundColor Green

$hostsPath = "C:\Windows\System32\drivers\etc\hosts"
$entry = "127.0.0.1 animezone.com.ar"

# Verificar si la entrada ya existe
$currentContent = Get-Content $hostsPath
$entryExists = $currentContent -contains $entry

if ($entryExists) {
    Write-Host "La entrada ya existe en el archivo hosts." -ForegroundColor Yellow
} else {
    try {
        # Agregar la entrada al archivo hosts
        Add-Content -Path $hostsPath -Value "`n$entry" -Force
        Write-Host "Entrada agregada exitosamente al archivo hosts." -ForegroundColor Green
    } catch {
        Write-Host "Error al modificar el archivo hosts. Ejecuta este script como administrador." -ForegroundColor Red
        Write-Host "O agrega manualmente esta línea al archivo hosts: $entry" -ForegroundColor Yellow
    }
}

Write-Host "`nVerificando configuración..." -ForegroundColor Cyan
Write-Host "Archivo hosts actual:" -ForegroundColor Cyan
Get-Content $hostsPath | Select-String "animezone"

Write-Host "`nPara que los cambios tomen efecto, reinicia tu navegador." -ForegroundColor Green





