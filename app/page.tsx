import { getProfile, getProjects } from '@/lib/content';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import FeaturedProjects from '@/components/FeaturedProjects';
import AboutContent from '@/components/AboutContent';

export default async function Home() {
  const [profile, projects] = await Promise.all([
    getProfile(),
    getProjects(),
  ]);

  return (
    <>
      <Hero profile={profile} />
      <div id="about">
        <AboutContent profile={profile} />
      </div>
      <Section id="work" className="bg-background">
        <FeaturedProjects projects={projects} />
      </Section>
    </>
  );
}

