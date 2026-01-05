'use client';

import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';
import experienceData from '@/content/experience.json';
import PrintButton from '@/components/PrintButton';
import DownloadPdfButton from '@/components/DownloadPdfButton';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';

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

export default function ResumeContent() {
    const { language } = useLanguage();
    const t = getTranslation(language);

    const jobs = experienceData as ExperienceItem[];

    const getContent = (content: LocalizedString) => {
        return language === 'en' ? content.en : content.th;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.header
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-12 text-center flex flex-col items-center"
            >
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                    {language === 'th' ? 'ประวัติย่อ' : 'Resume'}
                </h1>
                <div className="h-1 w-20 bg-foreground rounded-full mb-6"></div>
                <div className="flex items-center gap-3">
                    <PrintButton />
                    <DownloadPdfButton />
                </div>
            </motion.header>

            <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {jobs.map((job) => (
                    <motion.div
                        key={job.id}
                        variants={fadeInUp}
                        className="border-b border-border pb-8 last:border-0 last:pb-0"
                    >
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
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
