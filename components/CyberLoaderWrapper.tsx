"use client";

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import CyberLogoLoader from '@/components/CyberLogoLoader';

interface CyberLoaderWrapperProps {
  children: ReactNode;
}

export default function CyberLoaderWrapper({ children }: CyberLoaderWrapperProps) {
  const [state, setState] = useState<'loading' | 'revealing' | 'done'>('loading');

  useEffect(() => {
    // Check if user has visited before (persists across sessions)
    const hasVisited = localStorage.getItem('hasVisited') === 'true';
    if (hasVisited) {
      setState('done');
    }
    // If first visit, stay in 'loading' state to show the loader
  }, []);

  const handleExitStart = useCallback(() => {
    setState('revealing');
  }, []);

  const handleComplete = useCallback(() => {
    // Mark as visited so loader won't show again on this browser
    localStorage.setItem('hasVisited', 'true');
    setState('done');
  }, []);

  // Already visited before — render children immediately, no loader
  if (state === 'done') {
    return <>{children}</>;
  }

  return (
    <>
      {state === 'loading' && (
        <CyberLogoLoader
          imageSrc="/images/cyber-suit-logo-soft.png"
          onExitStart={handleExitStart}
          onComplete={handleComplete}
        />
      )}
      <div className={state === 'revealing' ? 'motion-safe:animate-cyber-page-reveal' : 'opacity-0'}>
        {children}
      </div>
    </>
  );
}