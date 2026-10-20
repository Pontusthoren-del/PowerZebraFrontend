// Anrop till backend för meetups
import type { Meetup, MeetupFilters } from "../types/Meetup";

const API_URL = import.meta.env.VITE_API_URL;

export async function getMeetups(filters: MeetupFilters): Promise<Meetup[]> {
    const params = new URLSearchParams();

    // Skicka bara med filter som är ifyllda
    for (const [key, value] of Object.entries(filters)) {
        if (value.trim()) params.set(key, value.trim());
    }

  const res = await fetch(`${API_URL}/api/meetups?${params}`);
  if (!res.ok) throw new Error("Kunde inte hämta meetups");
  return res.json();
}

export async function getMeetupById(id: number): Promise<Meetup | null> {
  const res = await fetch(`${API_URL}/api/meetups/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Kunde inte hämta meetupen");
  return res.json();
}

export async function getMyRegistrations(
  token: string,
): Promise<MyRegistrations> {
  const res = await fetch(`${API_URL}/api/me/registrations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Kunde inte hämta dina meetups");
  return res.json();
}

export async function getCategories(): Promise<string[]> {
    const res = await fetch(`${API_URL}/api/meetups/categories`);
    if (!res.ok) throw new Error("Kunde inte hämta kategorier");
    return res.json();
}
