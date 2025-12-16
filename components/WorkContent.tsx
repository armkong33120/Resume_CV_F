'use client';

import { useState, useMemo } from 'react';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import { ProjectListItem } from '@/lib/types';
import { useLanguage } from '@/components/LanguageContext';
import { getTranslation } from '@/lib/translations';

interface WorkContentProps {
    initialProjects: ProjectListItem[];
}

export default function WorkContent({ initialProjects }: WorkContentProps) {
    const { language, t: resolveText } = useLanguage();
    const t = getTranslation(language);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStack, setSelectedStack] = useState<string>('all');

    const allStacks = useMemo(() => {
        const stacks = new Set<string>();
        initialProjects.forEach((project) => {
            project.stack.forEach((stack) => stacks.add(stack));
        });
        return Array.from(stacks).sort();
    }, [initialProjects]);

    const filteredProjects = useMemo(() => {
        return initialProjects.filter((project) => {
            const title = resolveText(project.title);
            const tagline = resolveText(project.tagline);

            const matchesSearch =
                title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.stack.some((s) =>
                    s.toLowerCase().includes(searchQuery.toLowerCase())
                );

            const matchesStack =
                selectedStack === 'all' || project.stack.includes(selectedStack);

            return matchesSearch && matchesStack;
        });
    }, [initialProjects, searchQuery, selectedStack, resolveText]);

    return (
        <Section className="pt-20 xs:pt-24 sm:pt-32">
            <div className="mb-8 xs:mb-12 sm:mb-16">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-4 xs:mb-6">
                    {t.work.title}
                </h1>
                <p className="text-base xs:text-lg text-foreground/70 max-w-2xl px-2">
                    {t.work.description}
                </p>
            </div>

            <div className="mb-6 xs:mb-8 sm:mb-12 space-y-3 xs:space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
                <div className="flex-1 w-full">
                    <input
                        type="text"
                        placeholder={t.work.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-0 transition-all text-sm xs:text-base"
                        aria-label="Search projects"
                    />
                </div>
                <div className="flex-1 w-full sm:flex-initial sm:w-auto">
                    <select
                        value={selectedStack}
                        onChange={(e) => setSelectedStack(e.target.value)}
                        className="w-full sm:w-auto px-3 xs:px-4 py-2.5 xs:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-0 transition-all text-sm xs:text-base"
                        aria-label="Filter by technology"
                    >
                        <option value="all">{t.work.allTechnologies}</option>
                        {allStacks.map((stack) => (
                            <option key={stack} value={stack}>
                                {stack}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredProjects.length === 0 ? (
                <div className="text-center py-32">
                    <p className="text-foreground/60">{t.work.noProjects}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            )}
        </Section>
    );
}
