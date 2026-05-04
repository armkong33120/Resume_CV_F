'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

const terminalLines = [
  { text: 'Debug : I\'m Theerachot [Arm] Ready', animateReadyDots: true, blink: 'single' },
  { text: 'Debug : IT OPERATIONS Ready', animateReadyDots: true, blink: 'single' },
  { text: 'Debug : CYBERSECURITY Ready', animateReadyDots: true, blink: 'single' },
  { text: 'Debug : ITSM Procees Ready', animateReadyDots: true, blink: 'single' },
  { text: 'Debug : IT Automation Ready', animateReadyDots: true, blink: 'single' },
  { text: 'Log : Thank you for taking the time to review my profile.', animateReadyDots: false, blink: 'logGroup' },
  { text: 'I look forward to the opportunity to contribute to your organization...', animateReadyDots: false, blink: 'logGroup' },
];

const suitMaskStyle: CSSProperties = {
  WebkitMaskImage:
    'radial-gradient(circle at 50% 58%, black 0%, black 62%, rgba(0,0,0,0.72) 76%, transparent 91%)',
  maskImage:
    'radial-gradient(circle at 50% 58%, black 0%, black 62%, rgba(0,0,0,0.72) 76%, transparent 91%)',
};

interface TerminalLineState {
  text: string;
  dots: string;
  isBlinking: boolean;
}

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
  imageSrc = '/images/cyber-suit-logo-soft.png',
  alt = 'Theerachot H. cyber identity logo',
  onExitStart,
  onComplete,
  durationMs = 12500,
  minVisibleMs = 260,
  className = '',
}: CyberLogoLoaderProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [terminalRows, setTerminalRows] = useState<TerminalLineState[]>([]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [loadingDots, setLoadingDots] = useState('.');
  const [isLogBlinking, setIsLogBlinking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const loopDurationMs = 2500;
  const progressDuration = `${durationMs}ms`;

  useEffect(() => {
    const timers: number[] = [];
    const intervals: number[] = [];
    const startedAt = window.performance.now();

    const finishLoader = () => {
      const elapsed = window.performance.now() - startedAt;
      const remainingVisibleTime = Math.max(durationMs, minVisibleMs) - elapsed;

      timers.push(
        window.setTimeout(() => {
          onExitStart?.();
          setIsExiting(true);
        }, Math.max(remainingVisibleTime, 720))
      );
    };

    const runLine = (lineIndex: number) => {
      const line = terminalLines[lineIndex];

      if (!line) {
        finishLoader();
        return;
      }

      setActiveLineIndex(lineIndex);
      setTerminalRows((rows) => [...rows, { text: '', dots: '', isBlinking: false }]);

      let charIndex = 0;
      const typeInterval = window.setInterval(() => {
        charIndex += 1;

        setTerminalRows((rows) =>
          rows.map((row, index) => (index === lineIndex ? { ...row, text: line.text.slice(0, charIndex) } : row))
        );

        if (charIndex < line.text.length) return;

        window.clearInterval(typeInterval);
        const isFinalLogLine = line.blink === 'logGroup' && lineIndex === terminalLines.length - 1;
        const blinkDelay = line.animateReadyDots ? 760 : 180;
        const nextLineDelay = line.animateReadyDots ? 1080 : isFinalLogLine ? 1320 : 500;

        if (line.animateReadyDots) {
          const dotFrames = ['.', '..', '...'];

          dotFrames.forEach((dots, dotIndex) => {
            timers.push(
              window.setTimeout(() => {
                setTerminalRows((rows) =>
                  rows.map((row, index) => (index === lineIndex ? { ...row, dots } : row))
                );
              }, 180 * (dotIndex + 1))
            );
          });
        }

        if (line.blink === 'logGroup') {
          if (isFinalLogLine) {
            timers.push(window.setTimeout(() => setIsLogBlinking(true), blinkDelay));
          }
        } else {
          timers.push(
            window.setTimeout(() => {
              setTerminalRows((rows) =>
                rows.map((row, index) => (index === lineIndex ? { ...row, isBlinking: true } : row))
              );
            }, blinkDelay)
          );
        }

        timers.push(
          window.setTimeout(() => {
            setTerminalRows((rows) =>
              rows.map((row, index) => (index === lineIndex ? { ...row, isBlinking: false } : row))
            );
            if (isFinalLogLine) {
              setIsLogBlinking(false);
            }
            runLine(lineIndex + 1);
          }, nextLineDelay)
        );
      }, 18);

      intervals.push(typeInterval);
      timers.push(window.setTimeout(() => window.clearInterval(typeInterval), 2600));
    };

    timers.push(window.setTimeout(() => runLine(0), 620));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      intervals.forEach((interval) => window.clearInterval(interval));
    };
  }, [durationMs, minVisibleMs, onExitStart]);

  useEffect(() => {
    if (!isExiting) return;

    const exitTimer = window.setTimeout(() => {
      onComplete?.();
    }, 920);

    return () => window.clearTimeout(exitTimer);
  }, [isExiting, onComplete]);

  useEffect(() => {
    if (isExiting) return;

    const dotFrames = ['.', '..', '...'];
    let dotIndex = 0;
    const dotTimer = window.setInterval(() => {
      dotIndex = (dotIndex + 1) % dotFrames.length;
      setLoadingDots(dotFrames[dotIndex]);
    }, 360);

    return () => window.clearInterval(dotTimer);
  }, [isExiting]);

  return (
    <div
      className={[
        'fixed inset-0 z-[9999] isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#f3f3f1] px-5 text-zinc-950',
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
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_45%,rgba(39,39,42,0.12),transparent_34%),linear-gradient(180deg,#fafafa_0%,#eeeeec_52%,#f7f7f5_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(rgba(24,24,27,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,27,0.10)_1px,transparent_1px)] [background-size:34px_34px] motion-safe:animate-cyber-loader-grid" />
      <div className="absolute inset-x-0 top-[53%] -z-10 h-px bg-gradient-to-r from-transparent via-zinc-900/12 to-transparent" />
      <div className="absolute inset-x-0 top-[60%] -z-10 h-px bg-gradient-to-r from-transparent via-red-700/10 to-transparent" />

      <div className="flex w-full max-w-[24rem] flex-col items-center sm:max-w-[28rem] md:max-w-[34rem]">
        <div className="relative h-[46vh] min-h-[21rem] w-full max-w-[22rem] overflow-hidden sm:h-[51vh] sm:max-w-[25rem] md:h-[54vh] md:max-w-[31rem]">
          <div className="absolute left-1/2 bottom-0 h-[88%] aspect-square -translate-x-1/2 overflow-hidden rounded-full bg-[radial-gradient(circle_at_center,rgba(3,3,4,0.99)_0%,rgba(5,5,6,0.98)_58%,rgba(63,63,70,0.70)_74%,rgba(161,161,170,0.34)_86%,rgba(243,243,241,0)_95%)]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_0%,transparent_68%,rgba(244,244,245,0.10)_78%,rgba(244,244,245,0.16)_86%,transparent_96%)]" />
            {!imageFailed && (
              <div className="absolute inset-0 opacity-55" style={suitMaskStyle}>
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 352px, (max-width: 768px) 400px, 496px"
                  className="object-cover object-center opacity-45 contrast-125 brightness-115 motion-safe:animate-cyber-suit-ghost"
                />
              </div>
            )}

            <div className="absolute inset-0 overflow-hidden">
              <span className="absolute left-1/2 top-0 z-20 h-20 w-[82%] -translate-x-1/2 bg-gradient-to-b from-transparent via-zinc-900/20 to-transparent mix-blend-multiply blur-[1px] motion-safe:animate-cyber-suit-scan" />
              <span className="absolute left-1/2 top-[47%] z-20 h-px w-[72%] -translate-x-1/2 bg-red-700/55 shadow-[0_0_18px_rgba(185,28,28,0.30)] motion-safe:animate-cyber-suit-scan" />
            </div>

            <div
              className="absolute inset-0 motion-safe:animate-cyber-suit-resolve [will-change:transform,opacity,filter]"
              style={imageFailed ? undefined : suitMaskStyle}
            >
              {imageFailed ? (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-zinc-900/15 bg-zinc-100 text-3xl font-semibold tracking-[0.18em] text-zinc-900 shadow-[0_24px_60px_rgba(24,24,27,0.16),0_0_24px_rgba(185,28,28,0.08)] sm:h-32 sm:w-32 sm:text-4xl">
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
                  className="object-cover object-center contrast-150 brightness-125 saturate-75"
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>

            {!imageFailed && (
              <>
                <div
                  className="absolute inset-0 opacity-0 mix-blend-screen motion-safe:animate-cyber-suit-shock [will-change:transform,opacity]"
                  style={suitMaskStyle}
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 352px, (max-width: 768px) 400px, 496px"
                    className="object-cover object-center contrast-150 brightness-110"
                  />
                </div>
                <div
                  className="absolute inset-0 opacity-0 mix-blend-screen motion-safe:animate-cyber-suit-shock [animation-delay:70ms] [will-change:transform,opacity]"
                  style={suitMaskStyle}
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 352px, (max-width: 768px) 400px, 496px"
                    className="object-cover object-center contrast-125 brightness-105 [filter:drop-shadow(10px_0_0_rgba(185,28,28,0.28))]"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className="mt-5 min-h-[10.75rem] w-full max-w-[34rem] rounded-md border border-zinc-900/10 bg-white/55 px-4 py-3 text-left font-mono text-[0.62rem] leading-5 tracking-[0.02em] text-zinc-800 shadow-[0_24px_70px_rgba(24,24,27,0.10)] backdrop-blur-sm sm:min-h-[10rem] sm:text-xs"
          aria-label={terminalLines.map((line) => line.text).join('\n')}
        >
          {terminalRows.map((row, index) => (
            <div
              key={`${terminalLines[index]?.text}-${index}`}
              className={[
                'min-h-5 whitespace-pre-wrap',
                (row.isBlinking && terminalLines[index]?.blink === 'triple') ||
                (isLogBlinking && terminalLines[index]?.blink === 'logGroup')
                  ? 'motion-safe:animate-cyber-terminal-log-blink'
                  : '',
                row.isBlinking && terminalLines[index]?.blink !== 'triple' && terminalLines[index]?.blink !== 'logGroup'
                  ? 'motion-safe:animate-cyber-terminal-line-blink'
                  : '',
              ].join(' ')}
            >
              <span>{row.text}</span>
              <span>{row.dots}</span>
              {index === activeLineIndex && !row.isBlinking && (
                <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-zinc-900 shadow-[0_0_10px_rgba(24,24,27,0.28)] motion-safe:animate-cyber-terminal-cursor" />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-5 h-1.5 w-full max-w-[18rem] overflow-hidden rounded-full border border-zinc-900/15 bg-zinc-900/[0.04] shadow-inner">
          <div className="h-full origin-left rounded-full bg-gradient-to-r from-zinc-500/70 via-zinc-950 to-red-700/70 motion-safe:animate-cyber-loader-progress motion-reduce:scale-x-100" />
        </div>

        <p className="mt-5 text-center font-mono text-sm tracking-[0.02em] text-zinc-800 motion-safe:animate-cyber-loading-status-blink sm:text-base">
          Loading Resume and CV pages{loadingDots}
        </p>
      </div>
    </div>
  );
}
