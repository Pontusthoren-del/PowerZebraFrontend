import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { getMyRegistrations } from "../api/meetups";
import type { MyRegistrations } from "../types/Meetup";

export function useMyRegistrations() {
  const token = useAppSelector((s) => s.auth.token);
  const [data, setData] = useState<MyRegistrations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getMyRegistrations(token)
      .then(setData)
      .catch(() => setError("Kunde inte hämta dina meetups"))
      .finally(() => setLoading(false));
  }, [token]);

  return { data, loading, error, isLoggedIn: !!token };
}
