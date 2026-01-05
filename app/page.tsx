import { getProfile, getProjects } from '@/lib/content';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import FeaturedProjects from '@/components/FeaturedProjects';
import AboutContent from '@/components/AboutContent';
import ContactContent from '@/components/ContactContent';
import ResumeContent from '@/components/ResumeContent';
import ExperienceContent from '@/components/ExperienceContent';

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
      <Section id="resume" className="bg-background">
        <ResumeContent />
      </Section>
      <Section id="experience" className="bg-background">
        <ExperienceContent />
      </Section>
      <Section id="work" className="bg-background">
        <FeaturedProjects projects={projects} />
      </Section>
      <div id="contact">
        <ContactContent profile={profile} />
      </div>
    </>
  );
}

