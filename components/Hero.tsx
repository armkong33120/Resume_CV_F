import Link from 'next/link';
import { Profile } from '@/lib/types';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] sm:min-h-[90vh] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 safe-top">
      <div className="max-w-container mx-auto px-4 xs:px-6 sm:px-8 text-center">
        <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-4 xs:mb-6 sm:mb-8">
          {profile.name}
        </h1>
        <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-foreground/70 mb-3 xs:mb-4 sm:mb-6 tracking-tight px-2">
          {profile.title}
        </p>
        <p className="text-sm xs:text-base sm:text-lg text-foreground/60 mb-6 xs:mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          {profile.summary}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 xs:gap-4 sm:gap-6 px-4">
          <Link
            href="/work"
            className="w-full sm:w-auto px-6 xs:px-8 py-2.5 xs:py-3 bg-foreground text-background rounded-full font-medium tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 text-sm xs:text-base"
          >
            View Work
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 xs:px-8 py-2.5 xs:py-3 border border-border rounded-full font-medium tracking-tight hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 text-sm xs:text-base"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

