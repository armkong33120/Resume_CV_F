import Link from 'next/link';
import Section from '@/components/Section';

export default function NotFound() {
  return (
    <Section className="pt-24 sm:pt-32 min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter text-foreground mb-6">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-foreground/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-foreground text-background rounded-full font-medium tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
        >
          Go Home
        </Link>
      </div>
    </Section>
  );
}

