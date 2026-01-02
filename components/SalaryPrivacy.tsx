
"use client";

import { useState } from 'react';

interface SalaryPrivacyProps {
    value: string;
}

export default function SalaryPrivacy({ value }: SalaryPrivacyProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <span
            className="cursor-pointer transition-colors duration-200 hover:text-foreground relative group"
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
            onClick={() => setIsRevealed(!isRevealed)}
            role="button"
            tabIndex={0}
            aria-label="Reveal salary"
        >
            {isRevealed ? (
                <span>{value}</span>
            ) : (
                <span className="opacity-70">xx,xxx</span>
            )}
        </span>
    );
}
