import { useMeetups } from "../hooks/useMeetups";
import MeetupCard from "../components/MeetupCard";

export default function Home() {
    const { meetups, loading, error } = useMeetups();

    if (loading) return <p>Laddar meetups...</p>;
    if (error) return <p>{error}</p>;
    
return (
        <div className="home">
            <h1 className="home-title">Kommande meetups</h1>
            <section className="meetup-list">
                {meetups.map((meetup) => (
                    <MeetupCard key={meetup.id} meetup={meetup} />
                ))}
            </section>
        </div>
    );}