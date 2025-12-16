'use client';

import Link from 'next/link';
import { ProjectListItem } from '@/lib/types';
import ProjectCard from './ProjectCard';
import { useLanguage } from './LanguageContext';
import { getTranslation } from '@/lib/translations';

interface FeaturedProjectsProps {
    projects: ProjectListItem[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    const { language } = useLanguage();
    const t = getTranslation(language);

    return (
        <div className="mb-0">
            <div className="mb-8 xs:mb-12 sm:mb-16 text-center">
                <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-3 xs:mb-4">
                    {t.home.featuredWork}
                </h2>
                <p className="text-base xs:text-lg text-foreground/70 max-w-2xl mx-auto px-4">
                    {t.home.featuredDescription}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </div>
    );
}
