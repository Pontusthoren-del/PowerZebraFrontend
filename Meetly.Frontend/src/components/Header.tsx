import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import "./styles/Header.css";

export default function Header() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          Meetly<span className="header-logo-dot" aria-hidden="true" />
        </Link>

        <nav className="header-nav" aria-label="Huvudmeny">
          {/* Inloggad: Meetups, Mina möten och Logga ut. Utloggad: bara Logga in (Skapa konto finns på startsidan) */}
          {user ? (
            <>
              {/* Sidorna ligger ihop i en grupp, den man är på markeras */}
              <div className="nav-tabs">
                <NavLink to="/" end className="nav-link">
                  Meetups
                </NavLink>
                <NavLink to="/profile" className="nav-link">
                  Mina möten
                </NavLink>
              </div>
              <button type="button" className="nav-link nav-logout" onClick={() => dispatch(logout())}>
                Logga ut
              </button>
            </>
          ) : (
            <button type="button" className="nav-link nav-soft" onClick={() => setShowLogin(true)}>
              Logga in
            </button>
          )}
        </nav>
      </div>

      <Modal open={showLogin} onClose={() => setShowLogin(false)} title="Logga in">
        <LoginForm onSuccess={() => setShowLogin(false)} />
      </Modal>
    </header>
  );
}
