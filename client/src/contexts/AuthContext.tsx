import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../config/axios';

interface User {
  id: number;
  username: string;
  email: string;
  premium_access_status?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verificar si el token sigue siendo válido
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await apiClient.get('/api/users/verify');
      setUser(response.data.user);
    } catch (error) {
      // Token inválido, limpiar estado
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/users/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Email o contraseña incorrectos');
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data.error || 'Datos inválidos');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('No se puede conectar con el servidor. Verifica que esté ejecutándose.');
      } else {
        throw new Error(error.response?.data?.error || 'Error en el servidor. Intenta nuevamente.');
      }
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/users/register', { 
        username, 
        email, 
        password 
      });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
    } catch (error: any) {
      if (error.response?.status === 400) {
        if (error.response.data.error.includes('ya existe')) {
          throw new Error('El usuario o email ya está registrado');
        } else {
          throw new Error(error.response.data.error || 'Datos inválidos');
        }
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('No se puede conectar con el servidor. Verifica que esté ejecutándose.');
      } else {
        throw new Error(error.response?.data?.error || 'Error en el servidor. Intenta nuevamente.');
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 