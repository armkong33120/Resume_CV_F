'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectListItem } from '@/lib/types';

import { useLanguage } from './LanguageContext';

interface ProjectCardProps {
  project: ProjectListItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t: resolveText } = useLanguage();

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block bg-background border border-border rounded-2xl overflow-hidden hover:shadow-hover transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <Image
          src={project.coverImage}
          alt={resolveText(project.title)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>
      <div className="p-4 xs:p-6 sm:p-8">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:opacity-70 transition-opacity flex-1">
            {resolveText(project.title)}
          </h3>
          <span className="text-xs xs:text-sm text-foreground/50 flex-shrink-0">
            {project.year}
          </span>
        </div>
        <p className="text-xs xs:text-sm sm:text-base text-foreground/70 mb-3 xs:mb-4 tracking-tight">
          {resolveText(project.tagline)}
        </p>
        <div className="flex flex-wrap gap-1.5 xs:gap-2">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 bg-foreground/5 rounded-full text-foreground/70"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-xs px-3 py-1 text-foreground/50">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

