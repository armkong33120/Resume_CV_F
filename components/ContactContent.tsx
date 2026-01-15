'use client';

import { Profile } from '@/lib/types';
import Section from '@/components/Section';
import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';
import PasswordGate from '@/components/PasswordGate';


interface ContactContentProps {
    profile: Profile;
}

export default function ContactContent({ profile }: ContactContentProps) {
    const { language, t: resolveText } = useLanguage();
    const t = getTranslation(language);

    return (
        <div className="pt-20 xs:pt-24 sm:pt-32 min-h-screen safe-top">
            <div className="max-w-container mx-auto px-4 xs:px-6 sm:px-8 safe-left safe-right">
                <div className="mb-8 xs:mb-12 sm:mb-16 text-center">
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-4 xs:mb-6">
                        {t.contact.title}
                    </h1>
                    <p className="text-base xs:text-lg sm:text-xl text-foreground/70 max-w-xl mx-auto px-4">
                        {t.contact.description}
                    </p>
                </div>

                <div className="bg-glass/50 backdrop-blur-xl border border-border rounded-2xl p-6 xs:p-8 sm:p-12 shadow-glass">
                    <div className="space-y-6 xs:space-y-8">
                        {/* LINE */}
                        {profile.social.line && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4 pb-5 xs:pb-6 border-b border-border">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-[#06C755]/10 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6 text-[#06C755]"
                                        >
                                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.028 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-foreground/60 mb-1">{t.contact.line}</h3>
                                    <a
                                        href={`https://line.me/ti/p/~${profile.social.line}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg sm:text-xl font-medium text-foreground hover:opacity-70 transition-opacity"
                                    >
                                        {profile.social.line}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Phone */}
                        {profile.social.phone && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4 pb-5 xs:pb-6 border-b border-border">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-blue-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-foreground/60 mb-1">{t.contact.phone}</h3>
                                    <a
                                        href={`tel:${profile.social.phone.replace(/\s/g, '')}`}
                                        className="text-lg sm:text-xl font-medium text-foreground hover:opacity-70 transition-opacity"
                                    >
                                        {profile.social.phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        {profile.social.email && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4 pb-5 xs:pb-6 border-b border-border">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-red-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-foreground/60 mb-1">{t.contact.email}</h3>
                                    <a
                                        href={`mailto:${profile.social.email}`}
                                        className="text-lg sm:text-xl font-medium text-foreground hover:opacity-70 transition-opacity break-all"
                                    >
                                        {profile.social.email}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Birthday/Age */}
                        {profile.birthday && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4 pb-5 xs:pb-6 border-b border-border">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-pink-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-foreground/60 mb-1">{t.contact.birthday}</h3>
                                    <p className="text-lg sm:text-xl font-medium text-foreground">
                                        {profile.birthday} ({(() => {
                                            const birthDate = new Date(profile.birthday!);
                                            const today = new Date();
                                            let age = today.getFullYear() - birthDate.getFullYear();
                                            const m = today.getMonth() - birthDate.getMonth();
                                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                                age--;
                                            }
                                            return `${age} ${language === 'th' ? 'ปี' : 'years'}`;
                                        })()})
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Address */}
                        {profile.address && (
                            <div className="flex flex-col sm:flex-row sm:items-start gap-3 xs:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-emerald-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-foreground/60 mb-1">{t.contact.address}</h3>
                                    <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
                                        {resolveText(profile.address)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Social Links */}
                {(profile.social.linkedin || profile.social.github) && (
                    <div className="mt-8 xs:mt-12 text-center">
                        <p className="text-xs xs:text-sm text-foreground/60 mb-4 xs:mb-6">{t.contact.otherChannels}</p>
                        <div className="flex flex-wrap justify-center gap-3 xs:gap-4">
                            {profile.social.linkedin && (
                                <a
                                    href={profile.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 xs:px-6 py-2 xs:py-3 border border-border rounded-full font-medium tracking-tight hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 inline-flex items-center gap-2 text-sm xs:text-base"
                                >
                                    <svg
                                        className="w-5 h-5 text-[#0077B5]"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    LinkedIn
                                </a>
                            )}
                            {profile.social.github && (
                                <a
                                    href={profile.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 xs:px-6 py-2 xs:py-3 border border-border rounded-full font-medium tracking-tight hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 inline-flex items-center gap-2 text-sm xs:text-base"
                                >
                                    <svg
                                        className="w-5 h-5 text-[#6e5494]"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    GitHub
                                </a>
                            )}
                            <PasswordGate
                                actionUrl="https://drive.google.com/drive/folders/1DmaOziAzjVuBmNX7lF1PcdTYcUKPQ93I?usp=drive_link"
                                placeholder={
                                    <div className="px-4 xs:px-6 py-2 xs:py-3 border border-border rounded-full font-medium tracking-tight hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 inline-flex items-center gap-2 text-sm xs:text-base cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        {t.home.documents}
                                    </div>
                                }
                            >
                                <a
                                    href="https://drive.google.com/drive/folders/1DmaOziAzjVuBmNX7lF1PcdTYcUKPQ93I?usp=drive_link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 xs:px-6 py-2 xs:py-3 border border-border rounded-full font-medium tracking-tight hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 inline-flex items-center gap-2 text-sm xs:text-base"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                    {t.home.documents}
                                </a>
                            </PasswordGate>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
