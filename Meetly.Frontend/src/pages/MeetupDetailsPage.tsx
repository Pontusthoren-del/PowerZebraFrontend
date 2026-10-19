import { useParams } from "react-router-dom";
import { useMeetups } from "../hooks/useMeetups";

export default function MeetupDetails() {
    const { id } = useParams(); // Plockar ut ID:t ur URL:en
    const { meetups, loading, error } = useMeetups();

    if (loading) return <p>Laddar...</p>;
    if (error) return <p>{error}</p>;

    const meetup = meetups.find((m) => m.id === Number(id));

    if (!meetup) return <p>Hittade ingen meetup!</p>;

    return (
        <div>
            <h1>{meetup.title}</h1>
            <p>Värd: {meetup.host}</p>
            <p>Plats: {meetup.location}</p>
            {/* Här kan du nu slänga in all extra detaljinfo! */}
        </div>
    );
}