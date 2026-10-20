import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMyRegistrations } from "../store/registrationsSlice";
import "./styles/MyUpcomingMeetups.css";

// Visar högst så här många i hälsningen
const MAX_SHOWN = 3;

// "tis 5 nov · 18:00" i svensk tid
function formatTime(startTime: string) {
    const date = new Date(startTime);
    const day = date.toLocaleDateString("sv-SE", { weekday: "short", day: "numeric", month: "short" });
    const time = date.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
    return `${day} · ${time}`;
}

export default function MyUpcomingMeetups() {
    const dispatch = useAppDispatch();
    const { upcoming, status } = useAppSelector((s) => s.registrations);

    // Hämta anmälningarna när hälsningen visas
    useEffect(() => {
        dispatch(fetchMyRegistrations());
    }, [dispatch]);

    if (status === "failed") {
        return <p className="hero-text">Kunde inte hämta dina anmälningar just nu.</p>;
    }

    if (status === "loading" && upcoming.length === 0) {
        return <p className="hero-text">Hämtar dina meetups...</p>;
    }

    if (upcoming.length === 0) {
        return <p className="hero-text">Du är inte anmäld till något än – hitta en meetup nedan 👇</p>;
    }

    return (
        <div className="my-upcoming">
            <p className="my-upcoming-title">Dina kommande meetups</p>
            <ul className="my-upcoming-list">
                {upcoming.slice(0, MAX_SHOWN).map((meetup) => (
                    <li key={meetup.id}>
                        <Link to={`/meetups/${meetup.id}`} className="my-upcoming-item">
                            <span className="my-upcoming-time">{formatTime(meetup.startTime)}</span>
                            <span className="my-upcoming-name">{meetup.title}</span>
                            <span className="my-upcoming-arrow" aria-hidden="true">→</span>
                        </Link>
                    </li>
                ))}
            </ul>
            {upcoming.length > MAX_SHOWN && (
                <p className="my-upcoming-more">+ {upcoming.length - MAX_SHOWN} till</p>
            )}
        </div>
    );
}
