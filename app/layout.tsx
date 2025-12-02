import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/components/LanguageContext';
import { getProfile } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Theerachot Hengsimmakourup | IT Management & Cybersecurity Portfolio',
  description: 'Portfolio showcasing 6 years of IT Management Process, Cybersecurity, and Network Engineering experience in banking sector',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Theerachot H.',
  },
  themeColor: '#ffffff',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch profile for any global data needs
  const profile = await getProfile();

  return (
    <html lang="th" className="scroll-smooth">
      <body className="antialiased bg-background text-foreground">
        <LanguageProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded focus:font-medium"
          >
            Skip to main content
          </a>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

