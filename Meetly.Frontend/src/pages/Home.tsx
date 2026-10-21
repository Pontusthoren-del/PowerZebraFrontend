import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import WelcomeHero from "../components/WelcomeHero";
import MeetupList from "../components/MeetupList";
import "../pages/styles/Home.css";

export default function Home() {
    const location = useLocation();

    // "Meetups" i menyn länkar till /#meetups – scrolla mjukt ner till listan.
    // location.key gör att det fungerar även om man klickar flera gånger
    useEffect(() => {
        if (location.hash === "#meetups") {
            document.getElementById("meetups")?.scrollIntoView({ behavior: "smooth" });
        }
    }, [location.key, location.hash]);

    return (
        <div className="home">
            <WelcomeHero />
            {/* Listan visas för alla – för att anmäla sig måste man logga in på detaljsidan */}
            <section id="meetups" className="home-meetups">
                <MeetupList />
            </section>
        </div>
    );
}
