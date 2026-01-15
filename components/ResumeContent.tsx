'use client';

import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';
import experienceData from '@/content/experience.json';
import profileData from '@/content/profile.json';
import PrintButton from '@/components/PrintButton';
import DownloadPdfButton from '@/components/DownloadPdfButton';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import Image from 'next/image';
import { Github, Linkedin, FileText, Mail, Phone, MapPin, Calendar, Globe } from 'lucide-react';

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
                                <div className="w-6 flex justify-center shrink-0">
                                    <Calendar className="w-4 h-4" />
                                </div>
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
                                <div className="w-6 flex justify-center shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="leading-tight">{language === 'th' ? profileData.address.th : profileData.address.en}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="w-6 flex justify-center shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span>{profileData.social.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 flex justify-center shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span>{profileData.social.email}</span>
                            </div>
                            {profileData.social.line && (
                                <div className="flex items-center gap-2">
                                    <div className="w-6 flex justify-center shrink-0">
                                        <span className="font-bold text-[10px] bg-[#06C755] text-white px-1 rounded">LINE</span>
                                    </div>
                                    <span>{profileData.social.line}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <div className="w-6 flex justify-center shrink-0">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <a href="https://theerachot-cv-resume2026.vercel.app/" className="hover:underline break-all">theerachot-cv-resume2026.vercel.app</a>
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

            {/* Education Section */}
            <motion.div
                className="mb-12 space-y-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-border flex-1"></div>
                    <h2 className="text-2xl font-bold text-foreground">
                        {language === 'th' ? 'การศึกษา' : 'Education'}
                    </h2>
                    <div className="h-px bg-border flex-1"></div>
                </div>

                {profileData.education?.map((edu, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="border-b border-border pb-6 last:border-0 last:pb-0"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                            <h3 className="text-xl font-bold text-foreground">
                                {getContent(edu.institution)}
                            </h3>
                            <span className="text-foreground/70 font-medium text-sm">
                                {edu.period}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                            <span className="text-foreground/80 font-medium">
                                {getContent(edu.degree)}
                            </span>
                            <span className="hidden sm:inline text-foreground/40">•</span>
                            <span className="text-foreground/60 text-sm">
                                {getContent(edu.field)}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

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
