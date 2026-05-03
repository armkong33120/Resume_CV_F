'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/lib/translations';
import { LocalizedText } from '@/lib/types';

type TranslatableContent = string | LocalizedText | null | undefined;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (content: TranslatableContent) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('th');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('portfolio-language') as Language;
    if (savedLanguage === 'th' || savedLanguage === 'en') {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
  };


  const t = (content: TranslatableContent): string => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    // Check if content matches LocalizedText shape
    if (typeof content === 'object' && 'en' in content && 'th' in content) {
      return content[language] || content['en'] || '';
    }
    return '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

