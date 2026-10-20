import MeetupCard from "../components/MeetupCard";
import type { Meetup } from "../types/Meetup";
import "./styles/ProfilePage.css";

export default function ProfilePage() {
    const registeredMeetups: Meetup[] = [];

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
                {registeredMeetups.length > 0 ? (
                    <div className="profile-meetups-list">
                        {registeredMeetups.map((meetup) => (
                            <MeetupCard key={meetup.id} meetup={meetup} />
                        ))}
                    </div>
                ) : (
                    <p className="profile-meetups-empty">
                        Du är inte anmäld till några möten ännu.
                    </p>
                )}
            </section>
        </main>
    );
}