import { useAppSelector } from "../store/hooks";
import WelcomeHero from "../components/WelcomeHero";
import MeetupList from "../components/MeetupList";
import "../pages/styles/Home.css";

export default function Home() {
    const token = useAppSelector((s) => s.auth.token);

    return (
        <div className="home">
            <WelcomeHero />
            {/* Listan visas bara för inloggade */}
            {token && <MeetupList />}
        </div>
    );
}
