import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { isAuthenticated } from './utils/auth';
import Parcelas from './pages/Parcelas';
import Login from './pages/Login';
import Graficos from './pages/Graficos';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Ruta pública de login */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }/>

        {/* Rutas privadas */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }/>
        
        <Route path="/parcelas" element={
          <PrivateRoute>
            <Parcelas />
          </PrivateRoute>
        }/>
        
        <Route path="/graficos" element={
          <PrivateRoute>
            <Graficos />
          </PrivateRoute>
        }/>

        {/* Ruta de error 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;