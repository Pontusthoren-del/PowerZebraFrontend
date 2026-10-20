import type { SignupForm } from "../types/Auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function signup(form: SignupForm): Promise<void> {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (res.status === 400)
    throw new Error(
      "Lösenordet måste ha minst 6 tecken, en stor bokstav, en liten bokstav, en siffra och ett specialtecken (t.ex. !). Eller så finns e-posten redan.",
    );
  if (!res.ok) throw new Error("Kunde inte skapa konto");
}
