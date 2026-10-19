import { useMeetups } from "../hooks/useMeetups";
import MeetupCard from "../components/MeetupCard";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
    const [search, setSearch] = useState("");
    const { meetups, loading, error } = useMeetups(search);

    if (loading) return <p>Laddar meetups...</p>;
    if (error) return <p>{error}</p>;
    
return (
        <div className="home">
            <h1 className="home-title">Kommande meetups</h1>

            <SearchBar value={search} onChange={setSearch} />
                {meetups.length === 0 && (
                <p className="home-empty">Inga meetups matchar din sökning.</p>
                )}

            <section className="meetup-list">
                {meetups.map((meetup) => (
                    <MeetupCard key={meetup.id} meetup={meetup} />
                ))}
            </section>

        </div>
    );}