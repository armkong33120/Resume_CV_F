'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Language } from '@/lib/translations';
import { selectionPillTransition } from '@/lib/motion';
import { useSelectionPill } from '@/lib/useSelectionPill';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const activeIndex = language === 'en' ? 1 : 0;
  const { containerRef, setItemRef, metrics } = useSelectionPill<HTMLDivElement, HTMLButtonElement>(
    activeIndex,
    language
  );

  const setLang = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div ref={containerRef} className="relative isolate inline-grid grid-cols-2 items-center rounded-full border border-border bg-background p-1 shadow-sm">
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-1 left-0 z-0 rounded-full bg-foreground shadow-sm"
        initial={false}
        animate={{ x: metrics.x, width: metrics.width, opacity: metrics.opacity }}
        transition={selectionPillTransition}
      />
      <button
        ref={setItemRef(0)}
        onClick={() => setLang('th')}
        className={`relative z-10 min-w-12 xs:min-w-14 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${
          language === 'th' ? 'text-background' : 'text-foreground/60 hover:text-foreground/80'
        }`}
        aria-label="Switch to Thai"
        aria-pressed={language === 'th'}
      >
        TH
      </button>
      <button
        ref={setItemRef(1)}
        onClick={() => setLang('en')}
        className={`relative z-10 min-w-12 xs:min-w-14 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${
          language === 'en' ? 'text-background' : 'text-foreground/60 hover:text-foreground/80'
        }`}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
      >
        ENG
      </button>
    </div>
  );
}
