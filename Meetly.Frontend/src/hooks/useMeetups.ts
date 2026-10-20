// Hämtar meetups utifrån filtren och håller koll på laddning och fel
import { useEffect, useState } from "react";
import { getMeetups } from "../api/meetups";
import type { Meetup, MeetupFilters } from "../types/Meetup";

export function useMeetups(filters: MeetupFilters) {
    const [meetups, setMeetups] = useState<Meetup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Plocka ut fälten så useEffect bara körs när något faktiskt ändras
    const { search, category, location, from, to } = filters;

    useEffect(() => {
        getMeetups({ search, category, location, from, to })
            .then((data) => {
                setMeetups(data);
                setError(null);
            })
            .catch(() => setError("Kunde inte hämta meetups"))
            .finally(() => setLoading(false));
    }, [search, category, location, from, to]);

    return { meetups, loading, error };
}
