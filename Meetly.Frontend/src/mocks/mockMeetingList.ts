//Testdata, tas bort sen!! 

import type { Meetup } from "../types/Meetup";

const mockMeetupList: Meetup[] = [
    {
    id: 1,
    title: "React för nybörjare",
    description: "Lär dig grunderna i React.",
    date: "2026-10-28T18:00:00",
    location: "Varberg, Sal A",
    host: "Anna Svensson",
    capacity: 20,
    registeredCount: 5,
  },
  {
    id: 2,
    title: "Fika & kod",
    description: "Ta med datorn och koda tillsammans.",
    date: "2026-11-02T10:00:00",
    location: "Göteborg, Rum 2",
    host: "Erik Lind",
    capacity: 15,
    registeredCount: 15, // Fullbokad, för att testa hur "fullt" ser ut
  },
  {
    id: 3,
    title: "C# meetup",
    description: "Allt om .NET och ASP.NET Core.",
    date: "2026-11-10T17:30:00",
    location: "Halmstad, Sal B",
    host: "Maria Holm",
    capacity: 30,
    registeredCount: 12,
  },
];

export default mockMeetupList;