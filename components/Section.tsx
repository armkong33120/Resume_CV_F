import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-12 xs:py-16 sm:py-24 safe-bottom ${className}`}>
      <div className="max-w-container mx-auto px-4 xs:px-6 sm:px-8 safe-left safe-right">{children}</div>
    </section>
  );
}

