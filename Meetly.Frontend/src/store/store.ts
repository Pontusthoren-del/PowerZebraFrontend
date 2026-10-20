import { configureStore } from "@reduxjs/toolkit";
import authReducer, { TOKEN_KEY } from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
//sparar tokenen så att man är inloggad även efter omladdning
store.subscribe(() => {
    const token = store.getState().auth.token;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
});

//Just some typeScript-bullshit
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
