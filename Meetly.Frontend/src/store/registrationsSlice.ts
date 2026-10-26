import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyRegistrations } from "../api/meetups";
import type { Meetup } from "../types/Meetup";
import { logout, restoreSession } from "./authSlice";
import type { RootState } from "./store";

interface RegistrationsState {
    upcoming: Meetup[];
    past: Meetup[];
    status: "idle" | "loading" | "failed";
}

const initialState: RegistrationsState = { upcoming: [], past: [], status: "idle" };

// Hämtar den inloggades anmälningar – tokenen tas från auth-delen av store
export const fetchMyRegistrations = createAsyncThunk(
    "registrations/fetchMine",
    async (_, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (!token) throw new Error("Inte inloggad");
        return getMyRegistrations(token);
    },
);

const registrationsSlice = createSlice({
    name: "registrations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyRegistrations.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMyRegistrations.fulfilled, (state, action) => {
                state.status = "idle";
                state.upcoming = action.payload.upcoming;
                state.past = action.payload.past;
            })
            .addCase(fetchMyRegistrations.rejected, (state) => {
                state.status = "failed";
            })
            // Töm listan när man loggar ut, så nästa person inte ser den
            .addCase(logout, () => initialState)
            .addCase(restoreSession.rejected, () => initialState);
    },
});

export default registrationsSlice.reducer;
