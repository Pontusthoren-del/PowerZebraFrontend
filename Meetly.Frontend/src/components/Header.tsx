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
          Meetly <span className="header-logo-dot">.</span>
        </Link>

        <nav className="header-nav">
          {/* Inloggad: Meetups, namn och Logga ut. Utloggad: Registrera och Logga in */}
          {user ? (
            <>
              <NavLink to="/" end className="nav-link">
                Meetups
              </NavLink>
              <span className="nav-user">{user.firstName}</span>
              <button type="button" className="nav-link nav-soft" onClick={() => dispatch(logout())}>
                Logga ut
              </button>
            </>
          ) : (
            <>
              <NavLink to="/register" className="nav-link nav-soft-outline">
                Registrera
              </NavLink>
              <button type="button" className="nav-link nav-soft" onClick={() => setShowLogin(true)}>
                Logga in
              </button>
            </>
          )}
        </nav>
      </div>

      <Modal open={showLogin} onClose={() => setShowLogin(false)} title="Logga in">
        <LoginForm onSuccess={() => setShowLogin(false)} />
      </Modal>
    </header>
  );
}
