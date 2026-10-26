import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMeetupById } from "../api/meetups";
import Bubbles from "../components/Bubbles";
import Modal from "../components/Modal";
import { useMeetup } from "../hooks/useMeetup";
import { useRegistration } from "../hooks/useRegistration";
import "../pages/styles/MeetupDetailsPage.css";

export default function MeetupDetailsPage() {
    const { id } = useParams();
    const { meetup, setMeetup, loading, error } = useMeetup(Number(id));
    const [confirmOpen, setConfirmOpen] = useState(false);
    // Räknas upp vid varje lyckad anmälan så att bubblorna startar om
    const [bubbleBurst, setBubbleBurst] = useState(0);
    const { toggle, registered, status, message, isLoggedIn } = useRegistration(
        Number(id),
        // 201: uppdatera "X av Y platser" med siffrorna från svaret
        (c) => {
            setMeetup((m) =>
                m ? { ...m, registeredCount: c.registeredCount, availableSpots: c.availableSpots } : m,
            );
            setBubbleBurst((n) => n + 1);
        },
        // Efter fel eller avanmälan: hämta om meetupen så att platserna stämmer
        () => {
            getMeetupById(Number(id))
                .then((m) => m && setMeetup(m))
                .catch(() => {});
        },
    );

    if (loading) return <p className="meetup-details-message">Laddar...</p>;
    if (error) return <p className="meetup-details-message">{error}</p>;
    if (!meetup) {
        return (
            <p className="meetup-details-message">Hittade ingen meetup!</p>
        );
    }

    const startTime = new Date(meetup.startTime);
    // Passerad meetup: anmälan är stängd
    const isPast = startTime < new Date();

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
                    <h2 className="meetup-registration-title">{isPast ? "Anmälan stängd" : "Anmäl dig"}</h2>
                    <p className="meetup-registration-description">
                        {isPast ? "Meetupen har passerat" : "Anmäl dig till mötet med ditt konto."}
                    </p>
                    {isPast ? null : isLoggedIn ? (
                        <div className="meetup-registration-action">
                            <button
                                className={`meetup-registration-button${registered ? " meetup-registration-button-unregister" : ""}`}
                                type="button"
                                onClick={registered ? () => setConfirmOpen(true) : toggle}
                                disabled={
                                    status === "loading" ||
                                    (!registered && meetup.availableSpots <= 0)
                                }
                            >
                                {status === "loading"
                                    ? "Vänta..."
                                    : registered
                                      ? "Avanmäl mig"
                                      : meetup.availableSpots <= 0
                                        ? "Fullbokat"
                                        : "Anmäl mig"}
                            </button>
                            {bubbleBurst > 0 && <Bubbles key={bubbleBurst} />}
                        </div>
                    ) : (
                        <Link to="/login" className="meetup-registration-button">
                            Logga in för att anmäla dig
                        </Link>
                    )}
                    {/* Felmeddelande om det finns ett, annars bekräftelse när man är anmäld */}
                    <p
                        className={`meetup-registration-note${
                            status === "error"
                                ? " meetup-registration-error"
                                : registered || status === "success"
                                  ? " meetup-registration-success"
                                  : ""
                        }`}
                        role="status"
                        aria-live="polite"
                    >
                        {isPast ? "" : message || (registered ? "✓ Du är anmäld" : "")}
                    </p>
                </section>
            </div>

            <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Avanmäl dig?">
                <p>Vill du avanmäla dig från {meetup.title}? Din plats blir ledig för andra.</p>
                <div className="meetup-confirm-actions">
                    <button type="button" className="meetup-confirm-keep" onClick={() => setConfirmOpen(false)}>
                        Behåll min plats
                    </button>
                    <button
                        type="button"
                        className="meetup-confirm-yes"
                        onClick={() => {
                            setConfirmOpen(false);
                            toggle(); // registered är true, så toggle avanmäler
                        }}
                    >
                        Ja, avanmäl mig
                    </button>
                </div>
            </Modal>
        </main>
    );
}
