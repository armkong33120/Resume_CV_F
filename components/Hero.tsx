'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Profile } from '@/lib/types';
import { useLanguage } from './LanguageContext';
import { getTranslation } from '@/lib/translations';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const { language, t: resolveText } = useLanguage();
  const t = getTranslation(language);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] sm:min-h-[90vh] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 safe-top">
      <div className="max-w-container mx-auto px-4 xs:px-6 sm:px-8 text-center">
        {/* Profile Image */}
        <div className="mb-8 xs:mb-10 sm:mb-12">
          <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden border-4 border-background shadow-glass">
            <Image
              src="/images/profile.jpg"
              alt={resolveText(profile.name)}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
              priority
            />
          </div>
        </div>

        <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-4 xs:mb-6 sm:mb-8">
          {resolveText(profile.name)}
        </h1>
        <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-foreground/70 mb-8 xs:mb-10 sm:mb-14 tracking-tight px-2">
          {resolveText(profile.title)}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 xs:gap-4 sm:gap-6 px-4">
          <Link
            href="/#work"
            className="w-full sm:w-auto px-6 xs:px-8 py-2.5 xs:py-3 bg-foreground text-background rounded-full font-medium tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 text-sm xs:text-base"
          >
            {t.home.viewWork}
          </Link>
          <Link
            href="https://drive.google.com/drive/folders/1DmaOziAzjVuBmNX7lF1PcdTYcUKPQ93I?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 xs:px-8 py-2.5 xs:py-3 bg-blue-600 text-white rounded-full font-medium tracking-tight hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 text-sm xs:text-base flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            {t.home.documents}
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 xs:px-8 py-2.5 xs:py-3 border border-border rounded-full font-medium tracking-tight hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 text-sm xs:text-base"
          >
            {t.home.getInTouch}
          </Link>
        </div>
      </div>
    </section>
  );
}

