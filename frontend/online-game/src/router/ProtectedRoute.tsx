import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Mientras se valida sesión (token + /users/me)
  if (loading) {
    return <p>Cargando sesión...</p>;
  }

  // No autenticado → login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Autenticado pero sin rol suficiente
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // Todo OK
  return children;
}
