'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from './LanguageSwitcher';
import { fadeIn } from '@/lib/motion';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/#work', key: 'work' },
  { href: '/experience', key: 'experience' },
  { href: '/resume', key: 'resume' },
  { href: '/#about', key: 'about' },
  { href: '/contact', key: 'contact' },
];

export default function Nav() {
  const [hash, setHash] = useState('');

  useEffect(() => {
    // Initial hash
    setHash(window.location.hash);

    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Also update on click since Next.js Link interactions might not always trigger hashchange immediately in all browsers
    const handleLinkClick = () => {
      setTimeout(() => setHash(window.location.hash), 100);
    };
    window.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const checkActive = (item: { href: string; key: string }) => {
    // Handle Work section (matches /work... pages OR #work hash on home)
    if (item.key === 'work') {
      return pathname.startsWith('/work') || (pathname === '/' && hash === '#work');
    }

    // Handle About section (matches #about hash on home)
    if (item.key === 'about') {
      return pathname === '/' && hash === '#about';
    }

    // Handle Home (matches / AND no section hash)
    if (item.key === 'home') {
      return pathname === '/' && !['#work', '#about'].includes(hash);
    }

    // Handle standard pages (exact match or sub-paths)
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${isScrolled || pathname !== '/'
        ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
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
            className="px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-base xs:text-lg font-semibold tracking-tight text-foreground/70 hover:bg-foreground hover:text-background transition-all duration-300 z-10"
            aria-label="Home"
          >
            Theerachot H.
          </Link>

          <div className="hidden sm:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = checkActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium tracking-tight transition-colors duration-300 ${isActive ? 'text-background' : 'text-foreground/70 hover:text-foreground'}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => {
                    // Force hash update on click for immediate feedback
                    if (item.href.includes('#')) {
                      setHash(item.href.substring(item.href.indexOf('#')));
                    } else {
                      setHash('');
                    }
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-foreground rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {t.nav[item.key as keyof typeof t.nav]}
                </Link>
              );
            })}
            <div className="pl-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <MobileMenu />
        </div>
      </div>
    </motion.nav>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = getTranslation(language);

  const [hash, setHash] = useState('');

  useEffect(() => {
    setHash(window.location.hash);
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    const handleLinkClick = () => setTimeout(() => setHash(window.location.hash), 100);
    window.addEventListener('click', handleLinkClick);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const checkActive = (item: { href: string; key: string }) => {
    if (item.key === 'work') return pathname.startsWith('/work') || (pathname === '/' && hash === '#work');
    if (item.key === 'about') return pathname === '/' && hash === '#about';
    if (item.key === 'home') return pathname === '/' && !['#work', '#about'].includes(hash);
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname]);

  return (
    <div className="sm:hidden flex items-center gap-4">
      <LanguageSwitcher />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 -mr-2 z-50 relative"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-foreground origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-6 bg-foreground"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-foreground origin-center"
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-glass/95 backdrop-blur-xl border-b border-border shadow-glass safe-bottom overflow-hidden"
          >
            <div className="px-4 xs:px-6 py-4 space-y-3 xs:space-y-4">
              {navItems.map((item, i) => {
                const isActive = checkActive(item);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        if (item.href.includes('#')) {
                          setHash(item.href.substring(item.href.indexOf('#')));
                        } else {
                          setHash('');
                        }
                      }}
                      className={`block px-4 py-2 rounded-full text-base font-medium tracking-tight transition-all duration-300 ${isActive
                        ? 'bg-foreground text-background'
                        : 'text-foreground/70 hover:bg-foreground hover:text-background'
                        }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
