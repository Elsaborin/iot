import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 15000,
});

// Interceptor for JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Global error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network error:', error.request);
      return Promise.reject({ 
        message: 'No se pudo establecer conexión con el servidor. Por favor, verifica tu conexión a internet.'
      });
    } else {
      // Request setup error
      console.error('Request error:', error.message);
      return Promise.reject({ 
        message: 'Error al procesar la solicitud. Por favor, intenta nuevamente.'
      });
    }
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    user: '/auth/user'
  },
  mediciones: {
    generales: '/mediciones/generales',
    parcelas: '/mediciones/parcelas',
    ultimasGeneral: '/mediciones/ultimas-general',
    ultimasParcela: '/mediciones/ultimas-parcela'
  },
  sensores: '/sensores'
};

export default api;