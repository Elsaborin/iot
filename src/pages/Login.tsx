import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { authenticateUser, isAuthenticated, saveUserSession } from "../utils/auth";
import { XCircleIcon, BarChart2 } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await authenticateUser(email, password);
      saveUserSession(data.token, data.user);
      
      console.log('Token guardado:', data.token);
      console.log('Usuario guardado:', data.user);
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error de autenticación:", error);
      setError(error.message);
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Image/Branding */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-sky-800 via-sky-700 to-sky-600 relative overflow-hidden flex flex-col justify-center items-center p-8 text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5"></path>
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.5"></path>
            <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5"></circle>
          </svg>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/4 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-md text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <BarChart2 className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MoniParce</h1>
          <p className="text-xl mb-8">Sistema inteligente de monitoreo agrícola</p>
          
          <div className="space-y-6 mt-12">
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Monitoreo en tiempo real</h3>
                <p className="text-white/80">Datos precisos de tus cultivos al instante</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Seguridad avanzada</h3>
                <p className="text-white/80">Protección de datos y acceso controlado</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Análisis predictivo</h3>
                <p className="text-white/80">Optimiza tus cosechas con datos inteligentes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          
          {/* Error message */}
          {error && (
            <div className="fixed top-4 right-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg shadow-md flex items-center animate-fadeIn">
              <XCircleIcon className="h-5 w-5 mr-2" />
              {error}
              <button
                onClick={() => setError(null)}
                className="ml-3 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <span className="sr-only">Cerrar</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;