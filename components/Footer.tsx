'use client';

import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <footer className="border-t border-border mt-16 xs:mt-24 sm:mt-32 safe-bottom">
      <div className="max-w-container mx-auto px-4 xs:px-6 sm:px-8 py-8 xs:py-12 safe-left safe-right">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} {t.footer.rights}.
          </p>
          <div className="flex flex-col items-center md:items-end space-y-1 text-sm text-foreground/60">
            <p>
              {t.footer.builtWith} {t.footer.techStack} • {t.footer.ide}
            </p>
            <p>
              {t.footer.by} • {t.footer.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

