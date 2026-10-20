import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          Meetly <span className="header-logo-dot">.</span>
        </Link>

        <nav className="header-nav">
          <NavLink to="/" end className="nav-link">
            Meetups
          </NavLink>
          <NavLink to="/register" className="nav-button nav-button-outline">
            Registrera
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
