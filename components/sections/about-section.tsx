'use client';

import { motion } from 'framer-motion';
import { Container, Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui';
import { getPersonalInfo } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';

export function AboutSection() {
  const personalInfo = getPersonalInfo();

  return (
    <Section id="about" className="bg-muted/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          <SectionHeader>
            <motion.div variants={ANIMATION_VARIANTS.slideUp}>
              <SectionTitle>About Me</SectionTitle>
              <SectionDescription>
                Get to know more about my background and expertise
              </SectionDescription>
            </motion.div>
          </SectionHeader>

          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="mx-auto max-w-4xl space-y-6"
          >
            <p className="text-lg leading-relaxed text-foreground">
              {personalInfo.bio}
            </p>
            
            {personalInfo.currentRole && personalInfo.currentCompany && (
              <p className="text-lg leading-relaxed text-muted-foreground">
                Currently working as <span className="font-semibold text-foreground">{personalInfo.currentRole}</span> at{' '}
                <span className="font-semibold text-foreground">{personalInfo.currentCompany}</span>,
                where I leverage my {personalInfo.yearsOfExperience}+ years of experience to build
                scalable and impactful solutions.
              </p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center p-6 rounded-xl border border-border bg-background">
                <p className="text-4xl font-bold text-primary">{personalInfo.yearsOfExperience}+</p>
                <p className="mt-2 text-sm text-muted-foreground">Years of Experience</p>
              </div>
              {personalInfo.location && (
                <div className="text-center p-6 rounded-xl border border-border bg-background">
                  <p className="text-2xl font-bold text-primary">📍</p>
                  <p className="mt-2 text-sm text-muted-foreground">{personalInfo.location}</p>
                </div>
              )}
              <div className="text-center p-6 rounded-xl border border-border bg-background">
                <p className="text-2xl font-bold text-primary">💼</p>
                <p className="mt-2 text-sm text-muted-foreground">{personalInfo.role}</p>
              </div>
              <div className="text-center p-6 rounded-xl border border-border bg-background">
                <p className="text-2xl font-bold text-primary">🚀</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {personalInfo.availability?.replace(/-/g, ' ') || 'Available'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
