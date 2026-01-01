'use client';

import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';
import experienceData from '@/content/experience.json';

// Define the shape of the data based on the new JSON structure
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

export default function ExperiencePage() {
    const { language } = useLanguage();
    const t = getTranslation(language);

    // Cast the imported JSON to the correct type
    const jobs = experienceData as ExperienceItem[];

    // Helper to get content based on current language
    const getContent = (content: LocalizedString) => {
        return language === 'en' ? content.en : content.th;
    };

    const getListContent = (content: LocalizedArray) => {
        return language === 'en' ? content.en : content.th;
    };

    return (
        <main className="min-h-screen pt-24 pb-16 safe-bottom">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                        {language === 'th' ? 'ประวัติการทำงาน' : 'Experience'}
                    </h1>
                    <div className="h-1 w-20 bg-foreground mx-auto rounded-full"></div>
                </header>

                <div className="space-y-12 relative">
                    {/* Vertical Line */}
                    <div className="hidden md:block absolute left-8 top-4 bottom-4 w-0.5 bg-border"></div>

                    {jobs.map((job) => (
                        <div key={job.id} className="relative pl-0 md:pl-24 group">
                            {/* Timeline Dot */}
                            <div className="hidden md:block absolute left-[30px] top-6 w-4 h-4 rounded-full bg-background border-4 border-foreground z-10 group-hover:scale-125 transition-transform duration-300"></div>

                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-foreground/30 transition-colors duration-300 shadow-sm">

                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground mb-1">
                                            {getContent(job.role)}
                                        </h2>
                                        <h3 className="text-xl text-foreground/80 font-medium">
                                            {job.websiteUrl ? (
                                                <a
                                                    href={job.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-foreground hover:underline transition-colors decoration-dotted underline-offset-4"
                                                >
                                                    {getContent(job.company)}
                                                </a>
                                            ) : (
                                                getContent(job.company)
                                            )}
                                        </h3>
                                    </div>
                                    <div className="text-right md:text-right">
                                        <span className="inline-block px-4 py-1.5 rounded-full bg-foreground/10 text-foreground font-medium text-sm">
                                            {getContent(job.period)}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-foreground/70">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {job.googleMapsUrl ? (
                                            <a
                                                href={job.googleMapsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-foreground hover:underline transition-colors decoration-dotted underline-offset-4"
                                            >
                                                {getContent(job.location)}
                                            </a>
                                        ) : (
                                            getContent(job.location)
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {getContent(job.salary)}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-foreground/90 uppercase tracking-wider text-xs border-b border-border pb-2 mb-3">
                                        {language === 'th' ? 'รายละเอียดงาน' : 'Responsibilities'}
                                    </h4>
                                    <ul className="space-y-2">
                                        {getListContent(job.details).map((detail, index) => (
                                            <li key={index} className="flex items-start gap-3 text-foreground/80 leading-relaxed text-sm sm:text-base">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0"></span>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {job.reasonForLeaving && (
                                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 mt-6">
                                        <h4 className="flex items-center gap-2 font-semibold text-red-400 text-sm mb-1">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            {language === 'th' ? 'สาเหตุที่ออก' : 'Reason for leaving'}
                                        </h4>
                                        <p className="text-foreground/70 text-sm italic">

                                            &quot;{getContent(job.reasonForLeaving)}&quot;

                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
