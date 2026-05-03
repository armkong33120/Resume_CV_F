
"use client";

import { useState } from 'react';
import CyberLogoLoader from '@/components/CyberLogoLoader';
import ResumeContent from '@/components/ResumeContent';

export default function ResumePage() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <main className="min-h-screen pt-24 pb-16 safe-bottom">
            {isLoading && (
                <CyberLogoLoader
                    imageSrc="/images/cyber-suit-logo.png"
                    onComplete={() => setIsLoading(false)}
                />
            )}
            <ResumeContent />
        </main>
    );
}
