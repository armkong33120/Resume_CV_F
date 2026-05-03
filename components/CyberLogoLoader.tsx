'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const terminalMessage =
  'Thank you for taking the time to review my profile.\nI look forward to the opportunity to contribute to your organization.';

interface CyberLogoLoaderProps {
  imageSrc?: string;
  alt?: string;
  onExitStart?: () => void;
  onComplete?: () => void;
  durationMs?: number;
  minVisibleMs?: number;
  className?: string;
}

export default function CyberLogoLoader({
  imageSrc = '/images/cyber-suit-logo.png',
  alt = 'Theerachot H. cyber identity logo',
  onExitStart,
  onComplete,
  durationMs = 5000,
  minVisibleMs = 260,
  className = '',
}: CyberLogoLoaderProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTerminalBlinking, setIsTerminalBlinking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const loopDurationMs = 2500;
  const progressDuration = `${durationMs}ms`;

  useEffect(() => {
    const timers: number[] = [];
    let typeInterval: number | undefined;
    let typedIndex = 0;
    const startedAt = window.performance.now();

    timers.push(
      window.setTimeout(() => {
        typeInterval = window.setInterval(() => {
          typedIndex += 1;
          setTypedText(terminalMessage.slice(0, typedIndex));

          if (typedIndex >= terminalMessage.length && typeInterval) {
            window.clearInterval(typeInterval);

            timers.push(
              window.setTimeout(() => {
                setIsTerminalBlinking(true);

                const elapsed = window.performance.now() - startedAt;
                const remainingVisibleTime = Math.max(durationMs, minVisibleMs) - elapsed;

                timers.push(
                  window.setTimeout(() => {
                    onExitStart?.();
                    setIsExiting(true);
                  }, Math.max(remainingVisibleTime, 960))
                );
              }, 180)
            );
          }
        }, 24);
      }, 850)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (typeInterval) window.clearInterval(typeInterval);
    };
  }, [durationMs, minVisibleMs, onExitStart]);

  useEffect(() => {
    if (!isExiting) return;

    const exitTimer = window.setTimeout(() => {
      onComplete?.();
    }, 920);

    return () => window.clearTimeout(exitTimer);
  }, [isExiting, onComplete]);

  return (
    <div
      className={[
        'fixed inset-0 z-[9999] isolate flex min-h-dvh items-center justify-center overflow-hidden bg-black px-5 text-white',
        'motion-safe:animate-cyber-loader-fade-in',
        isExiting ? 'pointer-events-none motion-safe:animate-cyber-loader-fade-out' : '',
        className,
      ].join(' ')}
      role="status"
      aria-live="polite"
      aria-label="Secure identity loading"
      style={
        {
          '--cyber-loader-duration': progressDuration,
          '--cyber-suit-loop-duration': `${loopDurationMs}ms`,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.055),transparent_30%),linear-gradient(180deg,#000_0%,#030304_50%,#000_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:34px_34px] motion-safe:animate-cyber-loader-grid" />
      <div className="absolute inset-x-0 top-[53%] -z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="absolute inset-x-0 top-[60%] -z-10 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />

      <div className="flex w-full max-w-[24rem] flex-col items-center sm:max-w-[28rem] md:max-w-[34rem]">
        <div className="relative h-[46vh] min-h-[21rem] w-full max-w-[22rem] sm:h-[51vh] sm:max-w-[25rem] md:h-[54vh] md:max-w-[31rem]">
          {!imageFailed && (
            <div className="absolute inset-x-0 bottom-0 mx-auto h-[68%] w-[92%] opacity-70 [mask-image:linear-gradient(to_top,rgba(0,0,0,0.74),rgba(0,0,0,0.22)_46%,transparent_84%)]">
              <Image
                src={imageSrc}
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 352px, (max-width: 768px) 400px, 496px"
                className="object-contain object-bottom grayscale opacity-40 motion-safe:animate-cyber-suit-ghost"
              />
            </div>
          )}

          <div className="absolute inset-0 overflow-hidden">
            <span className="absolute left-1/2 top-0 z-20 h-20 w-[82%] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/28 to-transparent mix-blend-screen blur-[1px] motion-safe:animate-cyber-suit-scan" />
            <span className="absolute left-1/2 top-[47%] z-20 h-px w-[72%] -translate-x-1/2 bg-red-500/65 shadow-[0_0_18px_rgba(239,68,68,0.65)] motion-safe:animate-cyber-suit-scan" />
          </div>

          <div className="absolute inset-0 motion-safe:animate-cyber-suit-resolve [will-change:transform,opacity,filter]">
            {imageFailed ? (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/25 bg-white/[0.03] text-3xl font-semibold tracking-[0.18em] text-white/90 shadow-[0_0_42px_rgba(255,255,255,0.10),0_0_24px_rgba(220,38,38,0.12)] sm:h-32 sm:w-32 sm:text-4xl">
                  TH
                </div>
              </div>
            ) : (
              <Image
                src={imageSrc}
                alt={alt}
                fill
                priority
                sizes="(max-width: 640px) 352px, (max-width: 768px) 400px, 496px"
                className="object-contain object-bottom grayscale contrast-110"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>

          {!imageFailed && (
            <>
              <div className="absolute inset-0 opacity-0 mix-blend-screen motion-safe:animate-cyber-suit-shock [will-change:transform,opacity]">
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 352px, (max-width: 768px) 400px, 496px"
                  className="object-contain object-bottom grayscale contrast-200"
                />
              </div>
              <div className="absolute inset-0 opacity-0 mix-blend-screen motion-safe:animate-cyber-suit-shock [animation-delay:70ms] [will-change:transform,opacity]">
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 352px, (max-width: 768px) 400px, 496px"
                  className="object-contain object-bottom grayscale contrast-125 [filter:drop-shadow(10px_0_0_rgba(239,68,68,0.38))]"
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-2 text-center sm:mt-1 md:-mt-1">
          <p className="text-xl font-semibold tracking-[0.18em] text-white sm:text-2xl">THEERACHOT H.</p>
          <p className="mt-2 text-[0.68rem] font-medium tracking-[0.22em] text-white/55 sm:text-xs">
            IT OPERATIONS <span className="text-red-400/80">•</span> CYBERSECURITY <span className="text-red-400/80">•</span> ITSM
          </p>
          <p className="mt-6 min-h-5 font-mono text-[0.7rem] tracking-[0.14em] text-white/60 sm:text-xs">
            SECURE IDENTITY LOADING<span className="motion-safe:animate-cyber-loader-caret">_</span>
          </p>
        </div>

        <div
          className={[
            'mt-5 min-h-[4.75rem] w-full max-w-[34rem] rounded-md border border-emerald-400/15 bg-emerald-400/[0.035] px-4 py-3 text-left font-mono text-[0.68rem] leading-5 tracking-[0.02em] text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.10)] sm:min-h-[4.25rem] sm:text-xs',
            isTerminalBlinking ? 'motion-safe:animate-cyber-terminal-final-blink' : '',
          ].join(' ')}
          aria-label={terminalMessage}
        >
          <span className="whitespace-pre-wrap">{typedText}</span>
          {!isTerminalBlinking && (
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.75)] motion-safe:animate-cyber-terminal-cursor" />
          )}
        </div>

        <div className="mx-auto mt-5 h-1.5 w-full max-w-[18rem] overflow-hidden rounded-full border border-white/15 bg-white/[0.04]">
          <div className="h-full origin-left rounded-full bg-gradient-to-r from-white/45 via-white to-red-400/80 motion-safe:animate-cyber-loader-progress motion-reduce:scale-x-100" />
        </div>

        <div className="mx-auto mt-3 flex w-full max-w-[18rem] items-center justify-between gap-4 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-white/35 sm:text-[0.65rem] sm:tracking-[0.16em]">
          <span className="whitespace-nowrap">encrypted</span>
          <span className="whitespace-nowrap">soc-ready</span>
        </div>
      </div>
    </div>
  );
}
