export interface Meetup {
    //Mall för meetup innehåller
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
export interface MeetupFilters {
    search: string;
    category: string;
    location: string;
    from: string; // "2026-11-05" – precis det <input type="date"> ger
    to: string;
}
