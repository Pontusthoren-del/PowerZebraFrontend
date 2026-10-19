import { Link } from "react-router-dom";

interface MeetupCardProps{
    meetup:{
    id: number;
    title: string;
    description: string; 
    startTime: string;
    location: string;
    host: string; 
    capacity: number; 
    category: string;
    registeredCount: number;
    availableSpots: number;
    }
}
    
export default function MeetupCard({ meetup }: MeetupCardProps) {

  return (
    <Link to={`/meetups/${meetup.id}`} className="meetup-card"> 
            <h3 className="meetup-card-title">{meetup.title}</h3>
            <p className="meetup-card-info">
                {new Date(meetup.startTime).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}
            </p>
            <p className="meetup-card-info">Plats: {meetup.location}</p>
            <p className="meetup-card-info">Värd: {meetup.host}</p>
            <p className="meetup-card-info">Lediga platser: {meetup.availableSpots}</p>
        </Link>
  );
}