
"use client";

import { useCallback, useState } from 'react';
import CyberLogoLoader from '@/components/CyberLogoLoader';
import ResumeContent from '@/components/ResumeContent';

let hasShownResumeLoader = false;

export default function ResumePage() {
    const [isLoading, setIsLoading] = useState(() => !hasShownResumeLoader);
    const [isRevealing, setIsRevealing] = useState(() => hasShownResumeLoader);
    const handleExitStart = useCallback(() => setIsRevealing(true), []);
    const handleComplete = useCallback(() => {
        hasShownResumeLoader = true;
        setIsLoading(false);
    }, []);

    return (
        <main className="min-h-screen pt-24 pb-16 safe-bottom">
            {isLoading && (
                <CyberLogoLoader
                    imageSrc="/images/cyber-suit-logo-soft.png"
                    onExitStart={handleExitStart}
                    onComplete={handleComplete}
                />
            )}
            <div className={isRevealing ? 'motion-safe:animate-cyber-page-reveal' : 'opacity-0'}>
                <ResumeContent />
            </div>
        </main>
    );
}
