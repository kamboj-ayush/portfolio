'use client';

import { motion } from 'framer-motion';
import { Container, Section, SectionHeader, SectionTitle, SectionDescription, Badge } from '@/components/ui';
import { getExperiences, isSectionEnabled } from '@/lib/profile';
import { formatDate, calculateDuration } from '@/lib/utils';
import { ANIMATION_VARIANTS, LOCATION_TYPE_LABELS } from '@/constants';
import { Building2, MapPin, Calendar } from 'lucide-react';

export function ExperienceSection() {
  const experiences = getExperiences();

  if (!isSectionEnabled('experience')) return null;

  return (
    <Section id="experience" className="bg-muted/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          <SectionHeader>
            <motion.div variants={ANIMATION_VARIANTS.slideUp}>
              <SectionTitle>Work Experience</SectionTitle>
              <SectionDescription>
                My professional journey and achievements
              </SectionDescription>
            </motion.div>
          </SectionHeader>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden sm:block" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={ANIMATION_VARIANTS.slideUp}
                  className="relative pl-0 sm:pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[30px] top-6 h-4 w-4 rounded-full border-4 border-primary bg-background hidden sm:block" />

                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      {exp.current && (
                        <Badge variant="success">Current</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                        <span className="text-xs">({calculateDuration(exp.startDate, exp.endDate)})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location} • {LOCATION_TYPE_LABELS[exp.locationType]}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <h4 className="font-semibold text-sm">Key Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
