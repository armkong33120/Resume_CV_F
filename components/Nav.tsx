'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/work', key: 'work' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
  const t = getTranslation(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${
        isScrolled
          ? 'bg-glass/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
      style={{
        paddingTop: 'var(--safe-area-inset-top)',
      }}
    >
      <div className="max-w-container mx-auto px-4 xs:px-6 sm:px-8 safe-left safe-right">
        <div className="flex items-center justify-between h-14 xs:h-16 sm:h-20">
          <Link
            href="/"
            className="px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-base xs:text-lg font-semibold tracking-tight text-foreground/70 hover:bg-foreground hover:text-background transition-all duration-300"
            aria-label="Home"
          >
            Theerachot H.
          </Link>

          <div className="hidden sm:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium tracking-tight transition-all duration-300 ${
                    isActive
                      ? 'bg-foreground text-background'
                      : 'text-foreground/70 hover:bg-foreground hover:text-background'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <div className="sm:hidden flex items-center gap-4">
      <LanguageSwitcher />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 -mr-2"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-glass/95 backdrop-blur-xl border-b border-border shadow-glass safe-bottom">
          <div className="px-4 xs:px-6 py-4 space-y-3 xs:space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-full text-base font-medium tracking-tight transition-all duration-300 ${
                    isActive
                      ? 'bg-foreground text-background'
                      : 'text-foreground/70 hover:bg-foreground hover:text-background'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
