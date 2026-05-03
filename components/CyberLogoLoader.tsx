'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CyberLogoLoaderProps {
  imageSrc?: string;
  alt?: string;
  onComplete?: () => void;
  durationMs?: number;
  minVisibleMs?: number;
  className?: string;
}

export default function CyberLogoLoader({
  imageSrc = '/images/cyber-suit-logo.png',
  alt = 'Theerachot H. cyber identity logo',
  onComplete,
  durationMs = 2200,
  minVisibleMs = 260,
  className = '',
}: CyberLogoLoaderProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const progressDuration = `${durationMs}ms`;

  useEffect(() => {
    const completeTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, Math.max(durationMs, minVisibleMs));

    return () => window.clearTimeout(completeTimer);
  }, [durationMs, minVisibleMs]);

  useEffect(() => {
    if (!isExiting) return;

    const exitTimer = window.setTimeout(() => {
      onComplete?.();
    }, 360);

    return () => window.clearTimeout(exitTimer);
  }, [isExiting, onComplete]);

  return (
    <div
      className={[
        'fixed inset-0 z-[9999] isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#050506] px-5 text-white',
        'motion-safe:animate-cyber-loader-fade-in',
        isExiting ? 'pointer-events-none motion-safe:animate-cyber-loader-fade-out' : '',
        className,
      ].join(' ')}
      role="status"
      aria-live="polite"
      aria-label="Secure identity loading"
      style={{ '--cyber-loader-duration': progressDuration } as React.CSSProperties}
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,#08080a_0%,#020203_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px] motion-safe:animate-cyber-loader-grid" />
      <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 top-[58%] -z-10 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

      <div className="w-full max-w-[22rem] sm:max-w-[24rem] md:max-w-[26rem]">
        <div className="mx-auto mb-6 flex justify-center sm:mb-7">
          <div className="relative h-32 w-32 overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.03] shadow-[0_0_42px_rgba(255,255,255,0.10),0_0_24px_rgba(220,38,38,0.12)] sm:h-40 sm:w-40 md:h-44 md:w-44">
            <div className="absolute inset-0 z-20 overflow-hidden">
              <span className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-transparent via-white/35 to-transparent mix-blend-screen motion-safe:animate-cyber-loader-scan" />
              <span className="absolute inset-x-0 top-1/2 h-px bg-red-500/70 shadow-[0_0_14px_rgba(239,68,68,0.75)]" />
            </div>

            <div className="absolute inset-0 z-10 border border-white/10 [clip-path:polygon(0_0,34%_0,34%_1px,1px_1px,1px_34%,0_34%)]" />
            <div className="absolute inset-0 z-10 border border-red-500/40 [clip-path:polygon(100%_100%,66%_100%,66%_calc(100%-1px),calc(100%-1px)_calc(100%-1px),calc(100%-1px)_66%,100%_66%)]" />

            <div className="relative h-full w-full motion-safe:animate-cyber-loader-glitch">
              {imageFailed ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-white/[0.08] to-white/[0.02]">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/25 text-2xl font-semibold tracking-[0.18em] text-white/90 sm:h-24 sm:w-24 sm:text-3xl">
                    TH
                  </div>
                </div>
              ) : (
                <Image
                  src={imageSrc}
                  alt={alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
                  className="object-cover grayscale contrast-110"
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl font-semibold tracking-[0.18em] text-white sm:text-2xl">THEERACHOT H.</p>
          <p className="mt-2 text-[0.68rem] font-medium tracking-[0.22em] text-white/55 sm:text-xs">
            IT OPERATIONS <span className="text-red-400/80">•</span> CYBERSECURITY <span className="text-red-400/80">•</span> ITSM
          </p>
          <p className="mt-6 min-h-5 font-mono text-[0.7rem] tracking-[0.14em] text-white/60 sm:text-xs">
            SECURE IDENTITY LOADING<span className="motion-safe:animate-cyber-loader-caret">_</span>
          </p>
        </div>

        <div className="mx-auto mt-5 h-1.5 max-w-[18rem] overflow-hidden rounded-full border border-white/15 bg-white/[0.04]">
          <div className="h-full origin-left rounded-full bg-gradient-to-r from-white/45 via-white to-red-400/80 motion-safe:animate-cyber-loader-progress motion-reduce:scale-x-100" />
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35 sm:text-[0.65rem]">
          <span>encrypted profile</span>
          <span>soc-ready</span>
        </div>
      </div>
    </div>
  );
}
