'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { getProjects } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';
import { Search } from 'lucide-react';
import { ProjectCard } from '@/components/sections/project-card';

export default function ProjectsPage() {
  const allProjects = getProjects();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return allProjects;
    const q = searchQuery.toLowerCase();
    return allProjects.filter((project) => {
      return (
        project.name.toLowerCase().includes(q) ||
        project.shortDescription.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.technologies.some(t => t.toLowerCase().includes(q)) ||
        (project.highlights && project.highlights.some(h => h.toLowerCase().includes(q)))
      );
    });
  }, [allProjects, searchQuery]);

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          {/* Header */}
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4">
              All Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore my production mobile applications, architectures, and engineering highlights
            </p>
          </motion.div>

          {/* Search */}
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects by name, tech stack, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-card/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
              />
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.p variants={ANIMATION_VARIANTS.slideUp} className="text-sm text-muted-foreground mb-6">
            Showing {filteredProjects.length} of {allProjects.length} projects
          </motion.p>

          {/* Projects Grid */}
          <motion.div
            variants={ANIMATION_VARIANTS.staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              variants={ANIMATION_VARIANTS.fadeIn}
              className="text-center py-16"
            >
              <p className="text-lg text-muted-foreground mb-4">
                No projects found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 rounded-xl font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm cursor-pointer"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
