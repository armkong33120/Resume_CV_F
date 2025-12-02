import { getProfile, getProjects } from '@/lib/content';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';

export default async function Home() {
  const [profile, projects] = await Promise.all([
    getProfile(),
    getProjects(),
  ]);

  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <Hero profile={profile} />
      <Section id="work" className="bg-background">
        <div className="mb-8 xs:mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-3 xs:mb-4">
            Featured Work
          </h2>
          <p className="text-base xs:text-lg text-foreground/70 max-w-2xl mx-auto px-4">
            A selection of projects that showcase design thinking and technical
            execution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-8 xs:mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/work"
            className="inline-block px-6 xs:px-8 py-2.5 xs:py-3 border border-border rounded-full font-medium tracking-tight hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 text-sm xs:text-base"
          >
            View All Projects
          </Link>
        </div>
      </Section>
    </>
  );
}

