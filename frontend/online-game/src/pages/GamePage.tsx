// src/pages/GamePage.tsx

import "./GamePage.css";

export default function GamePage() {
  return (
    <div style={styles.container}>
      {/* CANVAS */}
      <div style={styles.canvas}>
        <p>🎮 Canvas del juego</p>
      </div>

      {/* USUARIOS ONLINE */}
      <div style={styles.users}>
        <p>👥 Usuarios online</p>
      </div>

      {/* CHAT */}
      <div style={styles.chat}>
        <p>💬 Chat</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 250px",
    gridTemplateRows: "1fr 200px",
    gridTemplateAreas: `
      "canvas users"
      "chat chat"
    `,
    gap: "4px",
    padding: "4px",
    boxSizing: "border-box",
  },
  canvas: {
    gridArea: "canvas",
    background: "#000",
    color: "#0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  users: {
    gridArea: "users",
    background: "#333",
    color: "#fff",
    padding: "0.5rem",
  },
  chat: {
    gridArea: "chat",
    background: "#111",
    color: "#fff",
    padding: "0.5rem",
  },
};
