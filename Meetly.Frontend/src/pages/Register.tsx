import RegisterForm from "../components/RegisterForm";
import { useSignup } from "../hooks/useSignup";

export default function Register() {
  const { handleSignup, message, success } = useSignup();
  return (
    <div className="auth-page">
      <h1>Skapa konto</h1>
      {!success && <RegisterForm onSubmit={handleSignup} />}

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}
