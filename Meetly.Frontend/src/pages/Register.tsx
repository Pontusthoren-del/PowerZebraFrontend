import RegisterForm from "../components/RegisterForm";
import { useSignup } from "../hooks/useSignup";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function Register() {
  const user = useAppSelector((s) => s.auth.user);
  const { handleSignup, message, success } = useSignup();

  if (user) return <Navigate to="/" replace />
  
  return (
    <div className="auth-page">
      <h1>Skapa konto</h1>
      {!success && <RegisterForm onSubmit={handleSignup} />}

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}
