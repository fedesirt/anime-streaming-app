import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      navigate('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Validaciones en tiempo real
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = password === confirmPassword && confirmPassword.length > 0;
  const isUsernameValid = username.length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-lg w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          {/* Logo animado */}
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 transform hover:scale-110 transition-all duration-300">
            <Sparkles className="text-white w-8 h-8 animate-pulse" />
          </div>
          
          <h2 className="mt-8 text-center text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            ¡Únete a AnimeZone!
          </h2>
          
          <p className="mt-3 text-center text-lg text-gray-400">
            Crea tu cuenta y accede a todo el contenido
          </p>
          
          <p className="mt-4 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-blue-400/30 underline-offset-4 hover:decoration-blue-300/50"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl shadow-black/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm flex items-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>{error}</span>
              </div>
            )}

            {/* Campo de username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-300">
                Nombre de usuario
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors duration-200" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field w-full pl-12 pr-12 group-hover:border-gray-500/50 group-focus-within:border-blue-500/50"
                  placeholder="Tu nombre de usuario"
                />
                {isUsernameValid && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                )}
              </div>
              <p className="text-xs text-gray-500">Mínimo 3 caracteres</p>
            </div>

            {/* Campo de email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
                Correo electrónico
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors duration-200" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full pl-12 pr-12 group-hover:border-gray-500/50 group-focus-within:border-blue-500/50"
                  placeholder="tu@email.com"
                />
                {isEmailValid && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                )}
              </div>
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
                Contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors duration-200" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full pl-12 pr-12 group-hover:border-gray-500/50 group-focus-within:border-blue-500/50"
                  placeholder="Tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {isPasswordValid && (
                  <CheckCircle className="absolute right-16 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                )}
              </div>
              <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
            </div>

            {/* Campo de confirmar contraseña */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300">
                Confirmar contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors duration-200" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field w-full pl-12 pr-12 group-hover:border-gray-500/50 group-focus-within:border-blue-500/50"
                  placeholder="Confirma tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {isConfirmPasswordValid && (
                  <CheckCircle className="absolute right-16 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                )}
              </div>
            </div>

            {/* Indicadores de validación */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className={`flex items-center space-x-2 ${isUsernameValid ? 'text-green-400' : 'text-gray-500'}`}>
                <CheckCircle className="w-4 h-4" />
                <span>Usuario válido</span>
              </div>
              <div className={`flex items-center space-x-2 ${isEmailValid ? 'text-green-400' : 'text-gray-500'}`}>
                <CheckCircle className="w-4 h-4" />
                <span>Email válido</span>
              </div>
              <div className={`flex items-center space-x-2 ${isPasswordValid ? 'text-green-400' : 'text-gray-500'}`}>
                <CheckCircle className="w-4 h-4" />
                <span>Contraseña válida</span>
              </div>
              <div className={`flex items-center space-x-2 ${isConfirmPasswordValid ? 'text-green-400' : 'text-gray-500'}`}>
                <CheckCircle className="w-4 h-4" />
                <span>Contraseñas coinciden</span>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || !isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid}
                className="btn-primary w-full flex justify-center items-center py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Creando cuenta...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Crear Cuenta</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Enlaces adicionales */}
        <div className="text-center space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 