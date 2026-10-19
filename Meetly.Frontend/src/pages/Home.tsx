//Home sidan, visar listan med kommande meetups
import { useMeetups } from "../hooks/useMeetups";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [search, setSearch] = useState("");
  const { meetups, loading, error } = useMeetups(search);

  if (loading) {
    return <p>Laddar meetups...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home">
      <h1 className="home-title">Kommande meetups</h1>
      <SearchBar value={search} onChange={setSearch} />
      {meetups.length === 0 && (
        <p className="home-empty">Inga meetups matchar din sökning.</p>
      )}
      <section className="meetup-list">
        {meetups.map((meetup) => (
          <div key={meetup.id} className="meetup-card">
            <h3 className="meetup-card-title">{meetup.title}</h3>
            <p className="meetup-card-info">
              {new Date(meetup.startTime).toLocaleString("sv-SE", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
            <p className="meetup-card-info">Plats: {meetup.location}</p>
            <p className="meetup-card-info">Värd: {meetup.host} </p>
            <p className="meetup-card-info">
              Lediga platser {meetup.availableSpots}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
