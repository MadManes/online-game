import { useState } from "react";
import { login as loginService, saveToken } from "../services/authService";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);    

        try {
            const result = await loginService(username, password);
            saveToken(result.access_token);
            await authLogin();
            navigate("/app", { replace: true });
        } catch (err) {
            setError("Usuario o contraseña incorrectos");
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto" }}>
            <h2>Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />    
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Ingresando..." : "Ingresar"}
            </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
