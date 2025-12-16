'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import Section from '@/components/Section';
import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';

interface ProjectDetailProps {
    project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const { language, t: resolveText } = useLanguage();
    const t = getTranslation(language);

    return (
        <>
            {/* Hero Cover */}
            <div className="relative w-full h-[50vh] xs:h-[60vh] sm:h-[70vh] bg-gray-100 mb-8 xs:mb-12">
                <Image
                    src={project.coverImage}
                    alt={resolveText(project.title)}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white text-center px-4 max-w-4xl drop-shadow-lg">
                        {resolveText(project.title)}
                    </h1>
                </div>
            </div>

            <Section className="pt-8 xs:pt-12 sm:pt-16">
                {/* Meta Info */}
                <div className="mb-8 xs:mb-12 sm:mb-16 pb-6 xs:pb-8 sm:pb-12 border-b border-border">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 xs:gap-6 sm:gap-8 mb-4 xs:mb-6">
                        <div className="flex-1">
                            <p className="text-lg xs:text-xl sm:text-2xl text-foreground/70 tracking-tight mb-4 xs:mb-6">
                                {resolveText(project.tagline)}
                            </p>
                        </div>
                        <div className="flex-shrink-0 space-y-2 text-xs xs:text-sm sm:text-base">
                            <div>
                                <span className="text-foreground/60">{t.work.year}</span>
                                <div className="text-foreground font-medium">{project.year}</div>
                            </div>
                            <div>
                                <span className="text-foreground/60">{t.work.role}</span>
                                <div className="text-foreground font-medium">{resolveText(project.role)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-4 xs:mb-6">
                        {project.stack.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs xs:text-sm px-3 xs:px-4 py-1.5 xs:py-2 bg-foreground/5 rounded-full text-foreground/70"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {project.highlights.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
                            {project.highlights.map((highlight, index) => (
                                <div
                                    key={index}
                                    className="p-3 xs:p-4 bg-foreground/5 rounded-lg border border-border"
                                >
                                    <p className="text-xs xs:text-sm text-foreground/80">{resolveText(highlight)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Case Study Sections */}
                <div className="space-y-10 xs:space-y-16 sm:space-y-24 mb-10 xs:mb-16 sm:mb-24">
                    <div>
                        <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 xs:mb-6">
                            {t.work.problem}
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-sm xs:text-base sm:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                {resolveText(project.problem)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 xs:mb-6">
                            {t.work.approach}
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-sm xs:text-base sm:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                {resolveText(project.approach)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 xs:mb-6">
                            {t.work.results}
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-sm xs:text-base sm:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                {resolveText(project.results)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                {project.galleryImages.length > 0 && (
                    <div className="mb-10 xs:mb-16 sm:mb-24">
                        <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6 xs:mb-8">
                            {t.work.gallery}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
                            {project.galleryImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src={image}
                                        alt={`${resolveText(project.title)} gallery image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Links */}
                {Object.keys(project.links).length > 0 && (
                    <div className="flex flex-wrap gap-3 xs:gap-4">
                        {Object.entries(project.links).map(([label, url]) => (
                            <a
                                key={label}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 xs:px-6 py-2 xs:py-3 border border-border rounded-full font-medium tracking-tight hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 text-sm xs:text-base"
                            >
                                {/* Links keys are currently just strings like "caseStudy", might need dynamic mapping or just capitalization */}
                                {label.charAt(0).toUpperCase() + label.slice(1)}
                            </a>
                        ))}
                    </div>
                )}

                {/* Back Link */}
                <div className="mt-10 xs:mt-16 sm:mt-24 pt-6 xs:pt-8 border-t border-border">
                    <Link
                        href="/work"
                        className="text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-2"
                    >
                        ← {t.work.backToWork}
                    </Link>
                </div>
            </Section>
        </>
    );
}
