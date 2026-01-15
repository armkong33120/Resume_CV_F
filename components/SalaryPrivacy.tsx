'use client';

import { useSalaryAuth } from './SalaryAuthContext';

interface SalaryPrivacyProps {
    value: string;
}

export default function SalaryPrivacy({ value }: SalaryPrivacyProps) {
    const { isSalaryUnlocked, openUnlockModal } = useSalaryAuth();

    return (
        <span
            className={`transition-colors duration-200 relative group ${!isSalaryUnlocked ? 'cursor-pointer hover:text-foreground' : ''}`}
            onClick={() => !isSalaryUnlocked && openUnlockModal()}
            role="button"
            tabIndex={!isSalaryUnlocked ? 0 : -1}
            aria-label={isSalaryUnlocked ? "Salary revealed" : "Click to reveal salary"}
        >
            {isSalaryUnlocked ? (
                <span>{value}</span>
            ) : (
                <span className="opacity-70 flex items-center gap-1">
                    xx,xxx
                </span>
            )}
        </span>
    );
}
