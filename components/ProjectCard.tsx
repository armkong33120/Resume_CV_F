'use client';

import Link from 'next/link';
import { ProjectListItem } from '@/lib/types';

interface ProjectCardProps {
  project: ProjectListItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block bg-background border border-border rounded-2xl overflow-hidden hover:shadow-hover transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-foreground/20 text-sm">
          {project.title}
        </div>
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>
      <div className="p-4 xs:p-6 sm:p-8">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:opacity-70 transition-opacity flex-1">
            {project.title}
          </h3>
          <span className="text-xs xs:text-sm text-foreground/50 flex-shrink-0">
            {project.year}
          </span>
        </div>
        <p className="text-xs xs:text-sm sm:text-base text-foreground/70 mb-3 xs:mb-4 tracking-tight">
          {project.tagline}
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

