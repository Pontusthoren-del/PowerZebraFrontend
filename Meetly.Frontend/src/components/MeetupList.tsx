import { useState } from "react";
import { useMeetups } from "../hooks/useMeetups";
import { useAppSelector } from "../store/hooks";
import type { MeetupFilters } from "../types/Meetup";
import MeetupCard from "./MeetupCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import "./styles/MeetupList.css";

export default function MeetupList() {
  const [filters, setFilters] = useState<MeetupFilters>({
    search: "",
    category: "",
    location: "",
    from: "",
    to: "",
  });
  const { meetups, loading, error } = useMeetups(filters);

    // Mina anmälningar finns redan i store (hämtas av hälsningsrutan)
    const myUpcoming = useAppSelector((s) => s.registrations.upcoming);
    const registeredIds = new Set(myUpcoming.map((m) => m.id));

    return (
        <>
            <h1 className="home-title">Kommande meetups</h1>

      {/* Filter och sök på samma rad */}
      <div className="meetup-filters">
        <FilterBar filters={filters} onChange={setFilters} />
        <SearchBar
          value={filters.search}
          onChange={(search) => setFilters({ ...filters, search })}
        />
      </div>

      {/* Visas inne i sidan, så sökfältet finns kvar medan listan laddar */}
      {loading && meetups.length === 0 && <p>Laddar meetups...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && meetups.length === 0 && (
        <p className="home-empty">Inga meetups matchar dina filter.</p>
      )}

            <section className="meetup-list">
                {meetups.map((meetup) => (
                    <MeetupCard
                        key={meetup.id}
                        meetup={meetup}
                        registered={registeredIds.has(meetup.id)}
                    />
                ))}
            </section>
        </>
    );
}
