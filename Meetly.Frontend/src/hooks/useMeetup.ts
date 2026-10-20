import { useEffect, useState } from "react";
import { getMeetupById } from "../api/meetups";
import type { Meetup } from "../types/Meetup";

export function useMeetup(id: number) {
    const [meetup, setMeetup] = useState<Meetup | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMeetupById(id)
            .then(setMeetup)
            .catch(() => setError("Kunde inte hämta meetupen"))
            .finally(() => setLoading(false));
    }, [id]);

    return { meetup, loading, error };
}
