export interface Meetup { //Mall för meetup innehåller 
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

export interface MyRegistrations {
    upcoming: Meetup[];
    past: Meetup[];
}