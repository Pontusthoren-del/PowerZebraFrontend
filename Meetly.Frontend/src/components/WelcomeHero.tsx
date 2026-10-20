import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Modal from "./Modal";
import LoginForm from "./LoginForm";

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
                <p className="hero-text">Här är de kommande meetupsen.</p>
            </section>
        );
    }

    return (
        <section className="hero">
            <h1 className="hero-logo">
                Meetly <span className="header-logo-dot">.</span>
            </h1>
            <p className="hero-text">
                Hitta din nästa meetup på västkusten – teknik, sport, mat och mycket mer.
            </p>
            <div className="hero-actions">
                <button
                    type="button"
                    className="hero-button hero-button-primary"
                    onClick={() => setShowLogin(true)}
                >
                    Logga in
                </button>
                <Link to="/register" className="hero-button hero-button-outline">
                    Skapa konto
                </Link>
            </div>

            {/* Login-modalen öppnas av knappen ovan */}
            <Modal open={showLogin} onClose={() => setShowLogin(false)} title="Logga in">
                <LoginForm onSuccess={() => setShowLogin(false)} />
                <p className="modal-footer">
                    Inget konto? <Link to="/register">Skapa ett här</Link>
                </p>
            </Modal>
        </section>
    );
}
