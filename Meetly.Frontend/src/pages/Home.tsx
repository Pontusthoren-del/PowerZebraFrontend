//Home sidan, visar listan med kommande meetups 
import { useMeetups } from "../hooks/useMeetups";

export default function Home() {
    const {meetups, loading, error} = useMeetups();
    

    if(loading) {
        return <p>Laddar meetups...</p>
    };
    if(error) {
        return <p>{error}</p>
    };
    
    return (
        <div className="home">
            <h1 className="home-title">Kommande meetups</h1>
            <section className="meetup-list">
                {meetups.map((meetup) => (
                <div key={meetup.id} className="meetup-card">
                    <h3 className="meetup-card-title">{meetup.title}</h3>
                    <p className="meetup-card-info">
                        {new Date(meetup.date).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}
                    </p>
                    <p className="meetup-card-info">Plats: {meetup.location}</p>
                    <p className="meetup-card-info">Värd: {meetup.host} </p>
                </div>))}
            </section>
            </div>
    )};