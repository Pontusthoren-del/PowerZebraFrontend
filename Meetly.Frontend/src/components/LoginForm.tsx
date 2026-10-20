import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../store/authSlice";
import "./AuthForm.css";

interface Props {
    // Körs när inloggningen lyckas, t.ex. för att stänga en modal
    onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: Props) {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((s) => s.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Väntar på svaret så vi vet om inloggningen lyckades
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) onSuccess?.();
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="E-post"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
            />
            <input
                type="password"
                placeholder="Lösenord"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {/* Felet kommer från Redux, t.ex. "Fel e-post eller lösenord." */}
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-button" disabled={status === "loading"}>
                {status === "loading" ? "Loggar in..." : "Logga in"}
            </button>
        </form>
    );
}
