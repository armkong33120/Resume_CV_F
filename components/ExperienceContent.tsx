'use client';

import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';
import experienceData from '@/content/experience.json';
import PrintButton from '@/components/PrintButton';
import DownloadPdfButton from '@/components/DownloadPdfButton';
import SalaryPrivacy from '@/components/SalaryPrivacy';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/motion';
import profileData from '@/content/profile.json';
import Image from 'next/image';
import { Github, Linkedin, FileText, Mail, Phone, MapPin, Calendar, Globe } from 'lucide-react';

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

export default function ExperienceContent() {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.header
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-12 text-center flex flex-col items-center"
            >
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                    {language === 'th' ? 'ประสบการณ์ทำงาน' : 'Curriculum Vitae'}
                </h1>
                <div className="h-1 w-20 bg-foreground rounded-full mb-6"></div>
                <div className="flex items-center gap-3">
                    <PrintButton />
                    <DownloadPdfButton />
                </div>
            </motion.header>

            {/* Print Only Header */}
            <div className="hidden print:flex flex-col mb-8 font-sans text-black">
                <div className="flex justify-between items-start gap-8 mb-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                src="/images/profile.jpg"
                                alt={language === 'th' ? profileData.name.th : profileData.name.en}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <div className="col-span-2 mb-2">
                            <h1 className="text-2xl font-bold">{language === 'th' ? profileData.name.th : profileData.name.en}</h1>
                            <p className="text-gray-600">{language === 'th' ? profileData.title.th : profileData.title.en}</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{profileData.birthday} ({(() => {
                                    const birthDate = new Date(profileData.birthday!);
                                    const today = new Date();
                                    let age = today.getFullYear() - birthDate.getFullYear();
                                    const m = today.getMonth() - birthDate.getMonth();
                                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                        age--;
                                    }
                                    return `${age} ${language === 'th' ? 'ปี' : 'years'}`;
                                })()})</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <span className="leading-tight">{language === 'th' ? profileData.address.th : profileData.address.en}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>{profileData.social.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>{profileData.social.email}</span>
                            </div>
                            {profileData.social.line && (
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-xs bg-[#06C755] text-white px-1 rounded">LINE</span>
                                    <span>{profileData.social.line}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <a href="https://theerachot-cv-resume2026.vercel.app/" className="hover:underline">theerachot-cv-resume2026.vercel.app</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links Row */}
                <div className="flex gap-6 items-center border-t border-b border-gray-200 py-3 mb-6 text-sm">
                    {profileData.social.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin className="w-4 h-4" />
                            <a href={profileData.social.linkedin} target="_blank" className="hover:underline">LinkedIn</a>
                        </div>
                    )}
                    {profileData.social.github && (
                        <div className="flex items-center gap-2">
                            <Github className="w-4 h-4" />
                            <a href={profileData.social.github} target="_blank" className="hover:underline">GitHub</a>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <a href="https://drive.google.com/drive/folders/1DmaOziAzjVuBmNX7lF1PcdTYcUKPQ93I?usp=drive_link" target="_blank" className="hover:underline">
                            {language === 'th' ? 'เอกสารสำหรับ HR' : 'Documents for HR'}
                        </a>
                    </div>
                </div>
            </div>

            {/* Education Section (Print Only) */}
            <div className="hidden print:block mb-8 font-sans text-black">
                <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">
                    {language === 'th' ? 'การศึกษา' : 'Education'}
                </h2>
                <div className="space-y-4">
                    {profileData.education?.map((edu, index) => (
                        <div key={index} className="flex justify-between items-baseline">
                            <div>
                                <h3 className="font-bold text-lg">{getContent(edu.institution)}</h3>
                                <div className="flex gap-2 text-sm text-gray-700">
                                    <span>{getContent(edu.degree)}</span>
                                    <span>•</span>
                                    <span>{getContent(edu.field)}</span>
                                </div>
                            </div>
                            <span className="text-sm font-medium">{edu.period}</span>
                        </div>
                    ))}
                </div>
            </div>

            <motion.div
                className="space-y-12 relative"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {/* Vertical Line */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    className="hidden md:block absolute left-8 top-4 bottom-4 w-0.5 bg-border origin-top"
                ></motion.div>

                {jobs.map((job) => (
                    <motion.div
                        key={job.id}
                        variants={fadeInUp}
                        className="relative pl-0 md:pl-24 group"
                    >
                        {/* Timeline Dot */}
                        <motion.div
                            variants={scaleIn}
                            className="hidden md:block absolute left-[30px] top-6 w-4 h-4 rounded-full bg-background border-4 border-foreground z-10 group-hover:scale-125 transition-transform duration-300"
                        ></motion.div>

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
                                    <SalaryPrivacy value={getContent(job.salary)} />
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
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
