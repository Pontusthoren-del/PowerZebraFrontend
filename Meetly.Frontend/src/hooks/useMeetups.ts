//Hook som hämtar meetups och håller koll på laddning och fel
import { useEffect, useState } from "react";
import { getMeetups } from "../api/meetups";
import type { Meetup } from "../types/Meetup";

export function useMeetups(search: string) {
    const [meetups, setMeetups] = useState<Meetup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        getMeetups(search)
            .then((data) => {
                setMeetups(data);
                setError(null);
            })
            .catch(() => setError("Kunde inte hämta meetups"))
            .finally(() => setLoading(false));
    }, [search]);

    return { meetups, loading, error };
}
