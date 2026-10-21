import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMe, login } from "../api/auth";
import type { CurrentUser } from "../types/Auth";

export const TOKEN_KEY = "meetly-token";

interface AuthState {
    token: string | null;
    user: CurrentUser | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
    serverDown: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem(TOKEN_KEY),
    user: null,
    status: "idle",
    error: null,
    serverDown: false,
};

// Loggar in och hämtar användaren i samma steg
export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }) => {
        const { accessToken } = await login(email, password);
        const user = await getMe(accessToken);
        return { token: accessToken, user };
    },
);

// Efter omladdning: hämta användaren igen med den sparade tokenen
export const restoreSession = createAsyncThunk(
    "auth/restore",
    async (token: string) => getMe(token),
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "idle";
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Kunde inte logga in.";
            })
            .addCase(restoreSession.fulfilled, (state, action) => {
                state.user = action.payload;
                state.serverDown = false;
            })
            .addCase(restoreSession.rejected, (state, action) => {
                if (action.error.message === "unauthorized")
                {
                    // Tokenen har gått ut
                    state.token = null;
                    state.user = null;
                } else {
                    state.serverDown = true;
                }
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
