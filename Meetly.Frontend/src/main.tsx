import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { restoreSession } from "./store/authSlice.ts";
import "./index.css";
import App from "./App.tsx";

// Börja alltid högst upp vid omladdning, i stället för att webbläsaren hoppar tillbaka dit man var
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const token = store.getState().auth.token;
if (token) store.dispatch(restoreSession(token));

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>,
);
