'use client';

import Section from '@/components/Section';
import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { Profile } from '@/lib/types';

interface AboutContentProps {
    profile: Profile;
}

export default function AboutContent({ profile }: AboutContentProps) {
    const { language, t: resolveText } = useLanguage();
    const t = getTranslation(language);

    const skillCategories = Object.keys(profile.skills);

    return (
        <Section>
            <div className="max-w-4xl mx-auto">
                <div className="space-y-6 text-center">
                    <div>
                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                            {resolveText(profile.summary)}
                        </p>
                    </div>

                    <div className="pt-2">
                        <p className="text-sm text-foreground/60">
                            <span className="font-semibold text-foreground/80">{t.contact.location}:</span> {resolveText(profile.location)}
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div className="mt-16 sm:mt-20">
                    <h2 className="text-2xl xs:text-3xl font-bold tracking-tight text-foreground mb-8 text-center">
                        {t.about.skills}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
                        {skillCategories.map((category) => (
                            <div key={category} className="bg-foreground/5 rounded-xl p-6">
                                <h3 className="text-lg font-semibold tracking-tight text-foreground mb-4">
                                    {category}
                                </h3>
                                <ul className="space-y-2">
                                    {profile.skills[category].map((skill, index) => (
                                        <li
                                            key={index} // Use index as key since skill is now an object
                                            className="text-sm sm:text-base text-foreground/70"
                                        >
                                            {resolveText(skill)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
