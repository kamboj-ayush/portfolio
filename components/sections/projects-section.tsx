'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container, Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui';
import { getProjects, isSectionEnabled } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';
import { ArrowUpRight } from 'lucide-react';
import { ProjectCard } from './project-card';

export function ProjectsSection() {
  const featuredProjects = getProjects({ featured: true });

  if (!isSectionEnabled('projects')) return null;

  return (
    <Section id="projects" className="bg-muted/30">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          <SectionHeader>
            <motion.div variants={ANIMATION_VARIANTS.slideUp} className="text-center">
             
              <SectionTitle>Featured Projects</SectionTitle>
              <SectionDescription>
                Showcasing my production mobile applications and key achievements
              </SectionDescription>
            </motion.div>
          </SectionHeader>

          <motion.div
            variants={ANIMATION_VARIANTS.staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="text-center mt-16">
            <Link 
              href="/projects"
              className="group inline-flex items-center gap-3 justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-xl hover:shadow-primary/25 hover:scale-105 h-14 px-10 text-lg"
            >
              View All Projects
              <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
