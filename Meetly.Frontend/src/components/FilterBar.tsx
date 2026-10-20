import { useEffect, useState } from "react";
import { getCategories } from "../api/meetups";
import type { MeetupFilters } from "../types/Meetup";
import "./styles/FilterBar.css";

interface Props {
    filters: MeetupFilters;
    onChange: (filters: MeetupFilters) => void;
}

export default function FilterBar({ filters, onChange }: Props) {
    const [categories, setCategories] = useState<string[]>([]);

    // Kategorierna hämtas från backend, så nya dyker upp automatiskt
    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    // Uppdaterar ett fält i taget och behåller resten
    const update = (key: keyof MeetupFilters, value: string) =>
        onChange({ ...filters, [key]: value });

    return (
        <div className="filter-bar">
            <label className="filter-field">
                Kategori
                <select
                    value={filters.category}
                    onChange={(e) => update("category", e.target.value)}
                >
                    <option value="">Alla kategorier</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}
