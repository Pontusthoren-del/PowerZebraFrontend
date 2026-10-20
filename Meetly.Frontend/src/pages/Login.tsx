import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import LoginForm from "../components/LoginForm";

export default function Login() {
    const user = useAppSelector((s) => s.auth.user);

    // Redan inloggad: skicka till startsidan
    if (user) return <Navigate to="/" replace />;

    return (
        <div className="auth-page">
            <h1>Logga in</h1>
            <LoginForm />
            <p>
                Inget konto? <Link to="/register">Skapa ett här</Link>
            </p>
        </div>
    );
}
