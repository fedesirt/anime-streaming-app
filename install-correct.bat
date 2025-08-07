@echo off
echo Instalando dependencias de la aplicacion de anime...
echo.

echo Verificando Node.js...
D:\node.exe --version
echo.

echo Verificando npm...
D:\npm.cmd --version
echo.

echo Instalando dependencias del proyecto raiz...
D:\npm.cmd install
echo.

echo Instalando dependencias del servidor...
cd server
D:\npm.cmd install
cd ..
echo.

echo Instalando dependencias del cliente...
cd client
D:\npm.cmd install
cd ..
echo.

echo Instalacion completada!
echo Para ejecutar la aplicacion, usa: D:\npm.cmd run dev
pause 