import { useState } from "react";
import { useMeetups } from "../hooks/useMeetups";
import MeetupCard from "./MeetupCard";
import SearchBar from "./SearchBar";

export default function MeetupList() {
    const [search, setSearch] = useState("");
    const { meetups, loading, error } = useMeetups(search);

    return (
        <>
            <h2 className="home-title">Kommande meetups</h2>

            <SearchBar value={search} onChange={setSearch} />

            {/* Visas inne i sidan, så sökfältet finns kvar medan listan laddar */}
            {loading && <p>Laddar meetups...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && meetups.length === 0 && (
                <p className="home-empty">Inga meetups matchar din sökning.</p>
            )}

            <section className="meetup-list">
                {meetups.map((meetup) => (
                    <MeetupCard key={meetup.id} meetup={meetup} />
                ))}
            </section>
        </>
    );
}
