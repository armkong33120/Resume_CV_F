import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 xs:mt-24 sm:mt-32 safe-bottom">
      <div className="max-w-container mx-auto px-4 xs:px-6 sm:px-8 py-8 xs:py-12 safe-left safe-right">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-sm text-foreground/60">
            Built with{' '}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              Next.js
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

