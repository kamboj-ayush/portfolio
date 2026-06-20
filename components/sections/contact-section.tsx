'use client';

import { motion } from 'framer-motion';
import { Container, Section, SectionHeader, SectionTitle, SectionDescription, Button } from '@/components/ui';
import { getPersonalInfo } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactSection() {
  const personalInfo = getPersonalInfo();

  return (
    <Section id="contact" className="bg-muted/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          <SectionHeader>
            <motion.div variants={ANIMATION_VARIANTS.slideUp}>
              <SectionTitle>Get In Touch</SectionTitle>
              <SectionDescription>
                Let's discuss your next project or opportunity
              </SectionDescription>
            </motion.div>
          </SectionHeader>

          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="mx-auto max-w-2xl"
          >
            <div className="rounded-xl border border-border bg-card p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {personalInfo.phone && (
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {personalInfo.location && (
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">{personalInfo.location}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-border">
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-13 px-8 text-lg w-full"
                >
                  Send Me an Email
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
