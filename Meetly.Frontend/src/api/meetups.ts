//Hämtar mmetups, returnerar testdata nu och byts mot fetch till backend sen. 
import type { Meetup } from "../types/Meetup";
import mockMeetingList from "../mocks/mockMeetingList";

export async function getMeetups (search: string): Promise<Meetup[]> {
   const term = search.trim().toLowerCase();
    if (!term) 
    {
        return mockMeetingList;
    }
    return mockMeetingList.filter((meetup) => 
         meetup.title.toLowerCase().includes(term) ||
        meetup.location.toLowerCase().includes(term) ||
        meetup.host.toLowerCase().includes(term) ||
        meetup.category.toLowerCase().includes(term)
    );
} 