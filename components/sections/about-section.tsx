'use client';

import { motion } from 'framer-motion';
import { Award, MapPin, Briefcase, Rocket } from 'lucide-react';
import { Container, Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui';
import { getPersonalInfo } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';

export function AboutSection() {
  const personalInfo = getPersonalInfo();

  const availabilityText = personalInfo.availability === 'open-to-work'
    ? 'Open to Work'
    : personalInfo.availability === 'employed-open-to-opportunities'
    ? 'Open to Opportunities'
    : (personalInfo.availability?.replace(/-/g, ' ') || 'Available');

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
              {/* Experience Card */}
              <div className="text-center p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Award className="h-6 w-6" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {personalInfo.yearsOfExperience}+ Years
                </p>
                <p className="mt-1 text-sm text-muted-foreground font-medium">Experience</p>
              </div>

              {/* Location Card */}
              {personalInfo.location && (
                <div className="text-center p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <p className="text-base sm:text-lg font-bold text-foreground">
                    {personalInfo.location}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground font-medium">Location</p>
                </div>
              )}

              {/* Role Card */}
              <div className="text-center p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <Briefcase className="h-6 w-6" />
                </div>
                <p className="text-base sm:text-lg font-bold text-foreground">
                  {personalInfo.role}
                </p>
                <p className="mt-1 text-sm text-muted-foreground font-medium">Role</p>
              </div>

              {/* Status / Availability Card */}
              <div className="text-center p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <Rocket className="h-6 w-6" />
                </div>
                <p className="text-base sm:text-lg font-bold text-foreground capitalize">
                  {availabilityText}
                </p>
                <p className="mt-1 text-sm text-muted-foreground font-medium">Status</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
