// src/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./router/ProtectedRoute";
import { useAuth } from "./auth/useAuth";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return (
    <Routes>
      {/* RUTA RAÍZ */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/app" replace /> : <Navigate to="/login" replace />
        }
      />

      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* APP PRIVADA */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<GamePage />} />
      </Route>
    </Routes>
  );
}
