import { useAuth } from "../auth/useAuth";

export default function AdminPage() {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: "2rem" }}>
            <h2> ---- Vieja pagina admin... Sirve o no?? ---- </h2>

            <p>
                Bienvenido <strong>{user?.username}</strong>
            </p>

            <p>Rol: {user?.role}</p>

            <button onClick={logout}>Cerrar sesión</button>

        </div>
    )
}