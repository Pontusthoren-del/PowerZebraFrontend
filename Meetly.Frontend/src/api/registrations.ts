// Anmälan och avanmälan till meetups
import type { Meetup } from "../types/Meetup";

const API_URL = import.meta.env.VITE_API_URL;

// Svaret från POST /api/meetups/{id}/registrations (201)
export interface RegistrationConfirmation {
    meetupId: number;
    registeredAt: string;
    registeredCount: number;
    availableSpots: number;
}

// Fel från anmälan. status används för att skilja t.ex. 401 (utloggad) från 409 (full/redan anmäld)
export class RegistrationError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

// Backend skickar fel som { title: "..." }, t.ex. "Meetupen är full."
async function readTitle(res: Response): Promise<string> {
    try {
        const body = await res.json();
        if (body.title) return body.title;
    } catch {
        // Svaret var inte JSON
    }
    return "Något gick fel, försök igen.";
}

export async function registerForMeetup(id: number, token: string): Promise<RegistrationConfirmation> {
    const res = await fetch(`${API_URL}/api/meetups/${id}/registrations`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new RegistrationError(res.status, await readTitle(res));
    return res.json();
}

export async function unregisterFromMeetup(id: number, token: string): Promise<void> {
    const res = await fetch(`${API_URL}/api/meetups/${id}/registrations`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new RegistrationError(res.status, await readTitle(res));
}

// Tillfällig: byts mot getMyRegistrations från api/meetups.ts när Dev är inmergad
// Id:n på meetups som den inloggade redan är anmäld till
export async function getMyMeetupIds(token: string): Promise<number[]> {
    const res = await fetch(`${API_URL}/api/me/registrations`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Kunde inte hämta dina anmälningar");
    const body = await res.json();
    return [...body.upcoming, ...body.past].map((m: Meetup) => m.id);
}
