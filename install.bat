@echo off
echo Instalando dependencias de la aplicacion de anime...
echo.

echo Instalando dependencias del proyecto raiz...
call npm install

echo.
echo Instalando dependencias del servidor...
cd server
call npm install
cd ..

echo.
echo Instalando dependencias del cliente...
cd client
call npm install
cd ..

echo.
echo Todas las dependencias han sido instaladas correctamente!
echo.
echo Para ejecutar la aplicacion, usa: npm run dev
pause 