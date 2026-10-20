//Hämtar mmetups, returnerar testdata nu och byts mot fetch till backend sen.
import type { Meetup } from "../types/Meetup";
import mockMeetingList from "../mocks/mockMeetingList";

const API_URL = import.meta.env.VITE_API_URL;

export async function getMeetups(search: string): Promise<Meetup[]> {
    const params = new URLSearchParams();
    if (!search.trim) params.set("search", search.trim());

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
