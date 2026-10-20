import { useParams } from "react-router-dom";
import { useMeetup } from "../hooks/useMeetup";

export default function MeetupDetails() {
    const { id } = useParams(); // Plockar ut ID:t ur URL:en
    const { meetup, loading, error } = useMeetup(Number(id));

    if (loading) return <p>Laddar...</p>;
    if (error) return <p>{error}</p>;

    if (!meetup) return <p>Hittade ingen meetup!</p>;

    return (
        <div>
            <h1>{meetup.title}</h1>
            <p>Värd: {meetup.host}</p>
            <p>Plats: {meetup.location}</p>
        </div>
    );
}
