import { Link, useParams } from "react-router-dom";
import { useMeetup } from "../hooks/useMeetup";
import "../pages/styles/MeetupDetailsPage.css";

export default function MeetupDetailsPage() {
    const { id } = useParams();
    const { meetup, loading, error } = useMeetup(Number(id));

    if (loading) return <p className="meetup-details-message">Laddar...</p>;
    if (error) return <p className="meetup-details-message">{error}</p>;
    if (!meetup) {
        return (
            <p className="meetup-details-message">Hittade ingen meetup!</p>
        );
    }

    const startTime = new Date(meetup.startTime);

    return (
        <main className="meetup-details">
            <Link to="/" className="meetup-details-back">
                ← Till kommande meetups
            </Link>

            <div className="meetup-details-grid">
                <article className="meetup-details-card">
                    <div className="meetup-details-header">
                        <span className="meetup-details-category">
                            {meetup.category}
                        </span>
                        <span
                            className={`meetup-details-spots${meetup.availableSpots <= 0 ? " meetup-details-spots-full" : ""}`}
                        >
                            {meetup.availableSpots <= 0
                                ? "Fullbokat"
                                : `${meetup.availableSpots} lediga platser`}
                        </span>
                    </div>

                    <h1 className="meetup-details-title">{meetup.title}</h1>
                    <p className="meetup-details-description">
                        {meetup.description}
                    </p>

                    <dl className="meetup-details-info">
                        <div>
                            <dt>Datum och tid</dt>
                            <dd>
                                {startTime.toLocaleString("sv-SE", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </dd>
                        </div>
                        <div>
                            <dt>Plats</dt>
                            <dd>{meetup.location}</dd>
                        </div>
                        <div>
                            <dt>Värd</dt>
                            <dd>{meetup.host}</dd>
                        </div>
                        <div>
                            <dt>Platser</dt>
                            <dd>
                                {meetup.registeredCount} av {meetup.capacity}{" "}
                                anmälda
                            </dd>
                        </div>
                    </dl>
                </article>

                <section className="meetup-registration-card">
                    <h2 className="meetup-registration-title">Anmäl dig</h2>
                    <p className="meetup-registration-description">
                        Anmäl dig till mötet med ditt konto.
                    </p>
                    <button
                        className="meetup-registration-button"
                        type="button"
                        disabled={meetup.availableSpots <= 0}
                    >
                        {meetup.availableSpots <= 0 ? "Fullbokat" : "Anmäl mig"}
                    </button>
                    <p className="meetup-registration-note">
                        Anmälan är inte aktiv ännu.
                    </p>
                </section>
            </div>
        </main>
    );
}
