import { useEffect, useRef, type ReactNode } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

// Bygger på <dialog>, som ger Esc-stängning, fokus och mörk bakgrund gratis
export default function Modal({ open, onClose, title, children }: Props) {
    // Pekar på <dialog>-elementet så vi kan öppna och stänga det
    const ref = useRef<HTMLDialogElement>(null);

    // Håller dialogen i takt med open-propen
    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        <dialog
            ref={ref}
            className="modal"
            aria-labelledby="modal-title"
            onClose={onClose}
            onClick={(e) => {
                // Klick på den mörka bakgrunden stänger
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="modal-content">
                <button type="button" className="modal-close" onClick={onClose} aria-label="Stäng">
                    ×
                </button>
                <h2 id="modal-title" className="modal-title">{title}</h2>
                {/* Innehållet byggs bara när modalen är öppen, så formuläret börjar tomt varje gång */}
                {open && children}
            </div>
        </dialog>
    );
}
