// Pratar med backendens inloggning – sparar ingenting själv
import type { CurrentUser, LoginResponse, SignupForm } from "../types/Auth";

const API_URL = import.meta.env.VITE_API_URL;

// Plockar ut felmeddelandena ur backendens 400-svar
async function readErrors(res: Response): Promise<string[]> {
    try {
        const body = await res.json();
        if (body.errors) return Object.values(body.errors).flat() as string[];
        if (body.title) return [body.title];
    } catch {
        // Svaret var inte JSON
    }
    return ["Något gick fel, försök igen."];
}

export async function signup(form: SignupForm): Promise<void> {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error((await readErrors(res)).join("\n"));
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (res.status === 401) throw new Error("Fel e-post eller lösenord.");
    if (!res.ok) throw new Error("Kunde inte logga in.");
    return res.json();
}

export async function getMe(token: string): Promise<CurrentUser> {
    const res = await fetch(`${API_URL}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Inte inloggad.");
    return res.json();
}
