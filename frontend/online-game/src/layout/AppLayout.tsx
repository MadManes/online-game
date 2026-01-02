// src/layout/AppLayout.tsx

import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div style={styles.app}>
      {/* NAVBAR */}
      <header style={styles.navbar}>
        <div>
          <strong>Mi Juego</strong>
        </div>

        <div>
          <span style={{ marginRight: "1rem" }}>
            {user?.username} ({user?.role})
          </span>
          <button onClick={logout}>Salir</button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  navbar: {
    height: "50px",
    background: "#111",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    flexShrink: 0,
  },
  main: {
    flex: 1,
    overflow: "hidden",
    background: "#222",
  },
};
