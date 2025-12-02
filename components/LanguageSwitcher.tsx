'use client';

import { useLanguage } from './LanguageContext';
import { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const setLang = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background p-1 shadow-sm">
      <button
        onClick={() => setLang('th')}
        className={`relative px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${
          language === 'th'
            ? 'bg-foreground text-background shadow-sm'
            : 'text-foreground/60 hover:text-foreground/80'
        }`}
        aria-label="Switch to Thai"
        aria-pressed={language === 'th'}
      >
        TH
      </button>
      <button
        onClick={() => setLang('en')}
        className={`relative px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${
          language === 'en'
            ? 'bg-foreground text-background shadow-sm'
            : 'text-foreground/60 hover:text-foreground/80'
        }`}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
      >
        ENG
      </button>
    </div>
  );
}

