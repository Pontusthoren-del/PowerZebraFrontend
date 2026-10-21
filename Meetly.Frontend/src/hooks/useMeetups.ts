// Hämtar meetups utifrån filtren och håller koll på laddning och fel
import { useEffect, useState } from "react";
import { getMeetups } from "../api/meetups";
import type { Meetup, MeetupFilters } from "../types/Meetup";

function matchVisibleFields(meetup: Meetup, search: string) {
  const term = search.trim().toLocaleLowerCase();
  if (!term) return true;
  return (
    meetup.title.toLocaleLowerCase().includes(term) ||
    meetup.location.toLocaleLowerCase().includes(term) ||
    meetup.host.toLocaleLowerCase().includes(term)
  );
}

export function useMeetups(filters: MeetupFilters) {
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Plocka ut fälten så useEffect bara körs när något faktiskt ändras
  const { search, category, location, from, to } = filters;

  useEffect(() => {
    let ignore = false;

    const timer = setTimeout(() => {
      setLoading(true);
      getMeetups({ search, category, location, from, to })
        .then((data) => {
          if (!ignore) {
            setMeetups(data.filter((m) => matchVisibleFields(m, search)));
            setError(null);
          }
        })
        .catch(() => {
          if (!ignore) setError("Kunde inte hämta meetups");
        })
        .finally(() => {
          if (!ignore) setLoading(false);
        });
    }, 300);
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [search, category, location, from, to]);

  return { meetups, loading, error };
}
