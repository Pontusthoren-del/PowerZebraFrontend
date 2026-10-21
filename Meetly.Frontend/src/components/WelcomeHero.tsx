import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import MyUpcomingMeetups from "./MyUpcomingMeetups";
import "./styles/WelcomeHero.css";

// Prickar i bakgrunden – som människor som samlas i små grupper
const dots = [
    { left: "8%", top: "14%", size: 132, color: "var(--sky-dot)" },
    { left: "18%", top: "26%", size: 72, color: "var(--sky-dot-light)" },
    { left: "15%", top: "10%", size: 28, color: "var(--fresh-strong)" },
    { left: "22%", top: "17%", size: 14, color: "var(--accent)" },
    { left: "76%", top: "56%", size: 168, color: "var(--sky-dot-light)" },
    { left: "72%", top: "70%", size: 80, color: "var(--sky-dot)" },
    { left: "88%", top: "51%", size: 36, color: "var(--fresh-strong)" },
    { left: "74%", top: "64%", size: 14, color: "var(--accent)" },
    { left: "84%", top: "15%", size: 44, color: "var(--sky-dot-light)" },
    { left: "89%", top: "20%", size: 20, color: "var(--sky-dot)" },
    { left: "12%", top: "74%", size: 52, color: "var(--sky-dot-light)" },
    { left: "17%", top: "80%", size: 22, color: "var(--fresh-strong)" },
];

export default function WelcomeHero() {
    const user = useAppSelector((s) => s.auth.user);
    const token = useAppSelector((s) => s.auth.token);
    const [showLogin, setShowLogin] = useState(false);

    // Token finns men användaren hämtas fortfarande (efter omladdning)
    if (token && !user) return null;

    // Inloggad: en mindre hälsning i stället för den stora loggan
    if (user) {
        return (
            <section className="hero hero-small">
                <h1 className="hero-greeting">Hej {user.firstName}! 👋</h1>
                <MyUpcomingMeetups />
            </section>
        );
    }

    return (
        <section className="hero hero-full">
            <div className="hero-dots" aria-hidden="true">
                {dots.map((dot, i) => (
                    <span
                        key={i}
                        className="hero-dot"
                        style={{
                            left: dot.left,
                            top: dot.top,
                            width: dot.size,
                            height: dot.size,
                            background: dot.color,
                            // Olika tempo så att prickarna inte rör sig i takt
                            animationDuration: `${8 + (i % 4) * 2}s`,
                            animationDelay: `${-i * 1.7}s`,
                        }}
                    />
                ))}
            </div>

            <h1 className="hero-logo">
                Meetly
                <span className="header-logo-dot" aria-hidden="true" />
            </h1>
            <p className="hero-text">
                Hitta din nästa meetup på västkusten – teknik, sport, mat och
                mycket mer.
            </p>
            <div className="hero-actions">
                <button
                    type="button"
                    className="hero-button hero-button-primary"
                    onClick={() => setShowLogin(true)}
                >
                    Logga in
                </button>
                <Link
                    to="/register"
                    className="hero-button hero-button-outline"
                >
                    Skapa konto
                </Link>
            </div>

            {/* Login-modalen öppnas av knappen ovan */}
            <Modal
                open={showLogin}
                onClose={() => setShowLogin(false)}
                title="Logga in"
            >
                <LoginForm onSuccess={() => setShowLogin(false)} />
                <p className="modal-footer">
                    Inget konto? <Link to="/register">Skapa ett här</Link>
                </p>
            </Modal>
        </section>
    );
}
