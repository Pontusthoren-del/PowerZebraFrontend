// Hook som anmäler/avanmäler den inloggade användaren till en meetup och håller koll på resultatet
import { useEffect, useState } from "react";
import {
    RegistrationError,
    getMyMeetupIds,
    registerForMeetup,
    unregisterFromMeetup,
    type RegistrationConfirmation,
} from "../api/registrations";
import { logout } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type Status = "idle" | "loading" | "success" | "error";

export function useRegistration(
    meetupId: number,
    onRegistered: (confirmation: RegistrationConfirmation) => void,
    refresh: () => void,
) {
    const token = useAppSelector((s) => s.auth.token);
    const dispatch = useAppDispatch();
    const [registered, setRegistered] = useState(false);
    const [status, setStatus] = useState<Status>("idle");
    const [message, setMessage] = useState("");

    // Vid sidladdning: är jag redan anmäld?
    useEffect(() => {
        if (!token) return;
        getMyMeetupIds(token)
            .then((ids) => setRegistered(ids.includes(meetupId)))
            .catch(() => {});
    }, [token, meetupId]);

    const handleError = (err: unknown) => {
        setStatus("error");
        if (err instanceof RegistrationError && err.status === 401) {
            // Tokenen har gått ut, logga ut så att användaren kan logga in igen
            dispatch(logout());
            setMessage("Din inloggning har gått ut. Logga in igen.");
            return;
        }
        // 409/400/404: visa backendens title, t.ex. "Meetupen är full."
        setMessage(err instanceof RegistrationError ? err.message : "Kunde inte nå servern, försök igen.");
        if (err instanceof RegistrationError) {
            // Håll knappen i takt med verkligheten
            if (err.status === 409 && err.message.includes("redan anmäld")) setRegistered(true);
            if (err.status === 404 && err.message.includes("inte anmäld")) setRegistered(false);
        }
        refresh();
    };

    const register = async () => {
        if (!token) return;
        setStatus("loading");
        setMessage("");
        try {
            const confirmation = await registerForMeetup(meetupId, token);
            onRegistered(confirmation);
            setRegistered(true);
            setStatus("success");
            setMessage("Du är anmäld!");
        } catch (err) {
            handleError(err);
        }
    };

    const unregister = async () => {
        if (!token) return;
        setStatus("loading");
        setMessage("");
        try {
            await unregisterFromMeetup(meetupId, token);
            setRegistered(false);
            setStatus("success");
            setMessage("Du är avanmäld.");
            refresh(); // hämtar om meetupen så att platserna räknas upp igen
        } catch (err) {
            handleError(err);
        }
    };

    return {
        toggle: registered ? unregister : register,
        registered: Boolean(token) && registered,
        status,
        message,
        isLoggedIn: Boolean(token),
    };
}
