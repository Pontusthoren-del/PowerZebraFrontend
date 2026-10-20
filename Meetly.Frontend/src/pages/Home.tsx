import { useAppSelector } from "../store/hooks";
import WelcomeHero from "../components/WelcomeHero";
import MeetupList from "../components/MeetupList";
import { useMeetups } from "../hooks/useMeetups";
import MeetupCard from "../components/MeetupCard";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import "../pages/styles/Home.css";

export default function Home() {
    const token = useAppSelector((s) => s.auth.token);

    return (
        <div className="home">
            <WelcomeHero />
            {/* Listan visas bara för inloggade */}
            {token && <MeetupList />}
    if (loading) return <p>Laddar meetups...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="home">
            <div className="home-search-header">
                <h1 className="home-title">Kommande meetups</h1>
                <SearchBar value={search} onChange={setSearch} />
            </div>
            {meetups.length === 0 && (
                <p className="home-empty">Inga meetups matchar din sökning.</p>
            )}

            <section className="meetup-list">
                {meetups.map((meetup) => (
                    <MeetupCard key={meetup.id} meetup={meetup} />
                ))}
            </section>
        </div>
    );
}
