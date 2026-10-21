import MeetupCard from "../components/MeetupCard";
// import type { Meetup } from "../types/Meetup";
import "./styles/ProfilePage.css";
import { fetchMyRegistrations } from "../store/registrationsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const { upcoming, past, status } = useAppSelector((s) => s.registrations);

  useEffect(() => {
    if (token) dispatch(fetchMyRegistrations());
  }, [dispatch, token]);

  if (!token) return <p>Du måste logga in för att se din profil.</p>;
  if (status === "loading" && upcoming.length === 0)
    return <p>Hämtar dina meetups...</p>;
  if (status === "failed") return <p>Kunde inte hämta dina meetups just nu.</p>;

  return (
    <main className="profile-page">
      <header className="profile-page-header">
        <p className="profile-page-eyebrow">Min sida</p>
        <h1 className="profile-page-title">Mina möten</h1>
        <p className="profile-page-description">
          Här hittar du möten som du har anmält dig till.
        </p>
      </header>

      <section
        className="profile-meetups-section"
        aria-labelledby="profile-meetups-title"
      >
        <h2 id="profile-meetups-title">Anmälda möten</h2>
        {upcoming.length > 0 ? (
          <div className="profile-meetups-list">
            {upcoming.map((meetup) => (
              <MeetupCard key={meetup.id} meetup={meetup} />
            ))}
          </div>
        ) : (
          <p className="profile-meetups-empty">
            Du är inte anmäld till några möten ännu.
          </p>
        )}
      </section>
      <section
        className="profile-meetups-section"
        aria-labelledby="profile-meetups-title"
      >
        <h2 id="profile-meetups-title">Tidigare möten</h2>
        {past.length > 0 ? (
          <div className="profile-meetups-list">
            {past.map((meetup) => (
              <MeetupCard key={meetup.id} meetup={meetup} />
            ))}
          </div>
        ) : (
          <p className="profile-meetups-empty">Inga tidigare möten</p>
        )}
      </section>
    </main>
  );
}
