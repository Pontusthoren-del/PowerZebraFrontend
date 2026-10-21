import { Link } from "react-router-dom";
import "../components/styles/MeetupCard.css";
import marker from "../assets/map_marker.png";
import user from "../assets/user.png";

interface MeetupCardProps {
    meetup: {
        id: number;
        title: string;
        description: string;
        startTime: string;
        location: string;
        host: string;
        capacity: number;
        category: string;
        registeredCount: number;
        availableSpots: number;
    };
    registered?: boolean;
}

export default function MeetupCard({ meetup, registered }: MeetupCardProps) {
    return (
        <div className={`meetup-card${registered ? " meetup-card-is-registered" : ""}`}>
            <div className="meetup-card-header">
                <p className="meetup-card-time">
                    {new Date(meetup.startTime).toLocaleDateString("sv-SE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                    {"\u00a0\u00a0\u00a0\u00a0"}
                    {new Date(meetup.startTime).toLocaleTimeString("sv-SE", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                {/* Anmäld: visa det i stället för antal platser */}
                {registered ? (
                    <p className="meetup-card-registered">✓ Du är anmäld</p>
                ) : (
                    <p
                        className={`meetup-card-spots${meetup.availableSpots <= 0 ? " meetup-card-spots-full" : ""}`}
                    >
                        {meetup.availableSpots <= 0
                            ? "Fullbokat"
                            : `Lediga platser: ${meetup.availableSpots}`}
                    </p>
                )}
            </div>
            <h3 className="meetup-card-title">{meetup.title}</h3>
            {/* Ikonerna är bara dekor, texten säger vad det är */}
            <div className="meetup-card-info-container">
                <img src={marker} alt="" className="meetup-card-icon" />
                <p className="meetup-card-info">{meetup.location}</p>
            </div>
            <div className="meetup-card-info-container">
                <img src={user} alt="" className="meetup-card-icon" />
                <p className="meetup-card-info">{meetup.host}</p>
            </div>
            <Link to={`/meetups/${meetup.id}`}>
                <button className="meetup-card-button">Läs mer</button>
            </Link>
        </div>
    );
}
