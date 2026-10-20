import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SignupForm } from "../types/Auth";
import { signup } from "../api/auth";

export function useSignup() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (form: SignupForm) => {
    setMessage("Skapar konto...");
    try {
      await signup(form);
      setSuccess(true);
      setMessage("✅Kontot är skapat!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(`${(err as Error).message}`);
    }
  };

  return { handleSignup, message, success };
}
