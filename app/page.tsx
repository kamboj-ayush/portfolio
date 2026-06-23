import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
} from '@/components/sections';
import ContactForm from '@/components/sections/contact-form';
import { getContactFormConfig } from '@/lib/profile';

export default function Home() {
  const contactFormConfig = getContactFormConfig();
  
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      {contactFormConfig && <ContactForm config={contactFormConfig} />}
    </>
  );
}

