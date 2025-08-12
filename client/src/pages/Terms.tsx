import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Copyright, Users, AlertTriangle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al Inicio
          </Link>
        </div>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-gray-500 rounded-full mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-gray-300 text-lg">
              Información legal importante sobre el uso de esta plataforma
            </p>
          </div>

          <div className="space-y-8">
            {/* Propósito del Sitio */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-red-400" />
                Propósito del Sitio
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong className="text-white">AnimeZone</strong> es un proyecto de desarrollo web creado con fines educativos y de portfolio. 
                  Esta plataforma demuestra habilidades de programación, diseño de interfaz de usuario y desarrollo frontend.
                </p>
                <p>
                  <strong className="text-yellow-400">IMPORTANTE:</strong> Este sitio NO es una plataforma de streaming real. 
                  No reproducimos contenido protegido por derechos de autor.
                </p>
              </div>
            </div>

            {/* Derechos de Autor */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Copyright className="w-6 h-6 mr-3 text-red-400" />
                Derechos de Autor
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong className="text-white">Contenido Mostrado:</strong> Los animes, series de televisión, nombres y referencias mostrados 
                  en este sitio pertenecen a sus respectivos propietarios y están protegidos por derechos de autor.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Animes: Propiedad de sus respectivos estudios y distribuidores</li>
                  <li>Series de TV: Propiedad de Disney, Cartoon Network, Comedy Central, etc.</li>
                  <li>Imágenes: Licenciadas bajo Creative Commons de Unsplash</li>
                  <li>Información: Obtenida de APIs públicas y fuentes educativas</li>
                </ul>
                <p className="text-red-400 font-medium">
                  No tenemos derechos de reproducción, distribución o comercialización de este contenido.
                </p>
              </div>
            </div>

            {/* Uso Permitido */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3 text-green-400" />
                Uso Permitido
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong className="text-white">Puedes:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Explorar el diseño y la interfaz de usuario</li>
                  <li>Ver las animaciones y efectos visuales</li>
                  <li>Revisar el código como referencia educativa</li>
                  <li>Usar el diseño como inspiración para tus propios proyectos</li>
                  <li>Compartir el enlace como ejemplo de portfolio</li>
                </ul>
              </div>
            </div>

            {/* Uso Prohibido */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-400" />
                Uso Prohibido
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong className="text-white">NO puedes:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reproducir contenido protegido por derechos de autor</li>
                  <li>Comercializar este sitio como plataforma de streaming</li>
                  <li>Usar el contenido para fines comerciales sin autorización</li>
                  <li>Distribuir contenido protegido</li>
                  <li>Vulnerar los derechos de autor de terceros</li>
                </ul>
              </div>
            </div>

            {/* Responsabilidades */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">
                Responsabilidades
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong className="text-white">Limitación de Responsabilidad:</strong> Este sitio se proporciona "tal como está" 
                  sin garantías de ningún tipo. No somos responsables por el uso indebido del contenido.
                </p>
                <p>
                  <strong className="text-white">Propósito Educativo:</strong> Este proyecto está diseñado únicamente para 
                  demostrar habilidades de desarrollo web y no debe interpretarse como una plataforma de streaming real.
                </p>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">
                Contacto
              </h2>
              <div className="text-gray-300">
                <p>
                  Si tienes preguntas sobre estos términos o crees que hay una violación de derechos de autor, 
                  por favor contacta a través de los canales apropiados.
                </p>
                <p className="mt-4 text-sm text-gray-400">
                  Última actualización: {new Date().toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

