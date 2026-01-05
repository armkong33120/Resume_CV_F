'use client';

import { ProjectListItem } from '@/lib/types';
import ProjectCard from './ProjectCard';
import { useLanguage } from './LanguageContext';
import { getTranslation } from '@/lib/translations';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';

interface FeaturedProjectsProps {
    projects: ProjectListItem[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    const { language } = useLanguage();
    const t = getTranslation(language);

    return (
        <div className="mb-0">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="mb-8 xs:mb-12 sm:mb-16 text-center"
            >
                <motion.h2
                    variants={fadeInUp}
                    className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-3 xs:mb-4 px-2"
                >
                    {t.home.featuredWork}
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    className="text-base xs:text-lg text-foreground/70 max-w-2xl mx-auto px-4"
                >
                    {t.home.featuredDescription}
                </motion.p>
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8"
            >
                {projects.map((project) => (
                    <motion.div key={project.slug} variants={fadeInUp}>
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
