@echo off
echo Instalando dependencias de la aplicacion de anime...
echo.

echo Verificando Node.js...
D:\node\node.exe --version
echo.

echo Verificando npm...
D:\node\npm.cmd --version
echo.

echo Instalando dependencias del proyecto raiz...
D:\node\npm.cmd install
echo.

echo Instalando dependencias del servidor...
cd server
D:\node\npm.cmd install
cd ..
echo.

echo Instalando dependencias del cliente...
cd client
D:\node\npm.cmd install
cd ..
echo.

echo Instalacion completada!
echo Para ejecutar la aplicacion, usa: D:\node\npm.cmd run dev
pause 