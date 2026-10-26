import { configureStore } from "@reduxjs/toolkit";
import authReducer, { TOKEN_KEY } from "./authSlice";
import registrationsReducer from "./registrationsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        registrations: registrationsReducer,
    },
});
//sparar tokenen så att man är inloggad även efter omladdning
store.subscribe(() => {
    const token = store.getState().auth.token;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
});

// Typer för hela store, används av useAppSelector och useAppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
