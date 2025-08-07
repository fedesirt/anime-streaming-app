@echo off
echo Configurando archivo hosts para animezone.com.ar...
echo.

REM Ejecutar PowerShell como administrador
powershell -Command "Start-Process powershell -ArgumentList '-ExecutionPolicy Bypass -File \"%~dp0configurar-hosts.ps1\"' -Verb RunAs"

echo.
echo Si se abrió una ventana de PowerShell, el archivo hosts se configuró correctamente.
echo Si no se abrió, ejecuta manualmente el archivo configurar-hosts.ps1 como administrador.
pause





