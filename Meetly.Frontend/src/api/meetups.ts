//Hämtar mmetups, returnerar testdata nu och byts mot fetch till backend sen. 
import type { Meetup } from "../types/Meetup";
import mockMeetingList from "../mocks/mockMeetingList";

export async function getMeetups (): Promise<Meetup[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMeetingList;
} 