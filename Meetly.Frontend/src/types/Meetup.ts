export interface Meetup { //Mall för meetup innehåller 
    id: number;
    title: string;
    description: string; 
    date: string;
    location: string;
    host: string; 
    capacity: number; 
    category: string;
    registeredCount: number;
    availableSpots: number;
}