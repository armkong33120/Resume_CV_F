'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Section from '@/components/Section';
import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';

interface Profile {
  name: string;
  title: string;
  location: string;
  summary: string;
  skills: {
    [category: string]: string[];
  };
  social: {
    [key: string]: string | undefined;
  };
}

export default function AboutPage() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <Section>
        <div className="text-center py-32">
          <p className="text-foreground/60">Loading...</p>
        </div>
      </Section>
    );
  }

  const skillCategories = Object.keys(profile.skills);

  return (
    <Section className="pt-20 xs:pt-24 sm:pt-32">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="mb-10 xs:mb-16 sm:mb-24 text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-4 xs:mb-6">
            {t.about.title}
          </h1>
          <p className="text-lg xs:text-xl sm:text-2xl text-foreground/70 max-w-2xl mx-auto tracking-tight px-4">
            {profile.title}
          </p>
          <p className="text-sm xs:text-base sm:text-lg text-foreground/60 mt-3 xs:mt-4">
            {profile.location}
          </p>
        </div>

        {/* Profile Image */}
        <div className="mb-10 xs:mb-16 sm:mb-24">
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-glass">
            {/* Try to load image, fallback to placeholder */}
            <Image
              src="/images/profile.jpg"
              alt={profile.name}
              fill
              className="object-cover"
              onError={(e) => {
                // Hide image on error, show placeholder
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
              priority
            />
            <div
              className="absolute inset-0 flex items-center justify-center text-foreground/20 text-xl font-semibold"
              style={{ display: 'none' }}
            >
              {language === 'th' ? 'รูปโปรไฟล์' : 'Profile Photo'}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-10 xs:mb-16 sm:mb-24">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 xs:mb-6">
            {t.about.overview}
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-foreground/80 leading-relaxed">
            {profile.summary}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-10 xs:mb-16 sm:mb-24">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6 xs:mb-8">
            {t.about.skills}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
            {skillCategories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold tracking-tight text-foreground mb-4">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {profile.skills[category].map((skill) => (
                    <li
                      key={skill}
                      className="text-sm sm:text-base text-foreground/70"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        {Object.keys(profile.social).length > 0 && (
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8">
              {t.about.connect}
            </h2>
            <div className="flex flex-wrap gap-3 xs:gap-4">
              {Object.entries(profile.social).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <a
                    key={platform}
                    href={url.startsWith('http') ? url : `mailto:${url}`}
                    target={url.startsWith('http') ? '_blank' : undefined}
                    rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="px-4 xs:px-6 py-2 xs:py-3 border border-border rounded-full font-medium tracking-tight hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 capitalize text-sm xs:text-base"
                  >
                    {platform}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
