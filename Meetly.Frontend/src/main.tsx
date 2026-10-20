import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { restoreSession } from "./store/authSlice.ts";
import "./index.css";
import App from "./App.tsx";

const token = store.getState().auth.token;
if (token) store.dispatch(restoreSession(token));

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>,
);
