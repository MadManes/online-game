import { createContext } from "react";

/* =======================
   Types
======================= */

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

/* =======================
   Context
======================= */

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
