
"use client";

import PasswordGate from './PasswordGate';

interface SalaryPrivacyProps {
    value: string;
}

export default function SalaryPrivacy({ value }: SalaryPrivacyProps) {
    return (
        <PasswordGate
            placeholder={
                <span className="opacity-70 font-mono tracking-wider hover:opacity-100 transition-opacity flex items-center gap-2">
                    xx,xxx <span className="text-xs opacity-50">(Click to view)</span>
                </span>
            }
        >
            <span className="font-semibold text-green-600 dark:text-green-400">{value}</span>
        </PasswordGate>
    );
}
