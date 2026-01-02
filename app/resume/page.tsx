
"use client";

import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';
import experienceData from '@/content/experience.json';

interface LocalizedString {
    th: string;
    en: string;
}

interface LocalizedArray {
    th: string[];
    en: string[];
}

interface ExperienceItem {
    id: number;
    company: LocalizedString;
    role: LocalizedString;
    period: LocalizedString;
    salary: LocalizedString;
    location: LocalizedString;
    details: LocalizedArray;
    reasonForLeaving?: LocalizedString;
    googleMapsUrl?: string | null;
    websiteUrl?: string | null;
}

export default function ResumePage() {
    const { language } = useLanguage();
    const t = getTranslation(language);

    const jobs = experienceData as ExperienceItem[];

    const getContent = (content: LocalizedString) => {
        return language === 'en' ? content.en : content.th;
    };

    return (
        <main className="min-h-screen pt-24 pb-16 safe-bottom">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                        {language === 'th' ? 'เรซูเม่' : 'Resume'}
                    </h1>
                    <div className="h-1 w-20 bg-foreground mx-auto rounded-full"></div>
                </header>

                <div className="space-y-8">
                    {jobs.map((job) => (
                        <div key={job.id} className="border-b border-border pb-8 last:border-0 last:pb-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                <h2 className="text-xl font-bold text-foreground">
                                    {getContent(job.role)}
                                </h2>
                                <span className="text-foreground/70 font-medium text-sm">
                                    {getContent(job.period)}
                                </span>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg text-foreground/80 font-medium">
                                    {getContent(job.company)}
                                </h3>
                                <p className="text-sm text-foreground/60">{getContent(job.location)}</p>
                            </div>

                            <ul className="list-disc list-outside ml-5 space-y-1 text-foreground/80 text-sm">
                                {language === 'en'
                                    ? job.details.en.map((detail, idx) => (
                                        <li key={idx} className="pl-1">{detail}</li>
                                    ))
                                    : job.details.th.map((detail, idx) => (
                                        <li key={idx} className="pl-1">{detail}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
