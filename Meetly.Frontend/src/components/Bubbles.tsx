import { useState, type CSSProperties } from "react";
import "./styles/Bubbles.css";

const COUNT = 16;

// Slumpar fram bubblorna en gång, när komponenten visas
function createBubbles() {
    return Array.from({ length: COUNT }, () => ({
        left: Math.random() * 100,          // var längs knappen den startar (%)
        size: 8 + Math.random() * 16,       // 8–24 px
        drift: (Math.random() - 0.5) * 60,  // hur långt den glider åt sidan (px)
        rise: 80 + Math.random() * 70,      // hur högt den åker (px)
        delay: Math.random() * 0.25,
        duration: 1 + Math.random() * 0.7,
    }));
}

// Små bubblor som stiger upp från knappen och försvinner
export default function Bubbles() {
    const [bubbles] = useState(createBubbles);

    return (
        <div className="bubbles" aria-hidden="true">
            {bubbles.map((b, i) => (
                <span
                    key={i}
                    className="bubble"
                    style={{
                        left: `${b.left}%`,
                        width: b.size,
                        height: b.size,
                        animationDelay: `${b.delay}s`,
                        animationDuration: `${b.duration}s`,
                        "--drift": `${b.drift}px`,
                        "--rise": `${-b.rise}px`,
                    } as CSSProperties}
                />
            ))}
        </div>
    );
}
