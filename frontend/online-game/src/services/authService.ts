// frontend/src/services/authService.ts

const API_URL = "http://localhost:8000"; // ajustá si usás otro puerto

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
}

/**
 * Login contra el backend
 */
export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}

/**
 * Guarda token
 */
export function saveToken(token: string) {
  localStorage.setItem("access_token", token);
}

/**
 * Obtiene token
 */
export function getToken(): string | null {
  return localStorage.getItem("access_token");
}

/**
 * Borra sesión
 */
export function logout() {
  localStorage.removeItem("access_token");
}

/**
 * Obtiene usuario autenticado
 */
export async function getCurrentUser(): Promise<User> {
  const token = getToken();

  if (!token) {
    throw new Error("No token");
  }

  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log("ME RESPONSE: ", data);

  if (!response.ok) {
    throw new Error("Invalid session");
  }

  return data;
}
