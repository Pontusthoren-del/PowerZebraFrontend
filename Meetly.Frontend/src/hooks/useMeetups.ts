//Hook som hämtar meetups och håller koll på laddning och fel
import { useEffect, useState } from "react";
import { getMeetups } from "../api/meetups";
import type { Meetup } from "../types/Meetup";

export function useMeetups() {
    const [meetups, setMeetups] = useState<Meetup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();
    
    useEffect(() => {
        getMeetups()
        .then(setMeetups)
        .catch(() => setError("Kunde inte hämta meetups"))
        .finally(() => setLoading(false));
    }, []);

    return { meetups, loading, error}; 
}