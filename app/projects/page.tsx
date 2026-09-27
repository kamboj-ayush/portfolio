'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { getProjects, getProjectCategories } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';
import { Search } from 'lucide-react';
import { ProjectCard } from '@/components/sections/project-card';

export default function ProjectsPage() {
  const allProjects = getProjects();
  const categories = getProjectCategories();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.highlights && project.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allProjects, searchQuery, selectedCategory]);

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          {/* Header */}
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-12">
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
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-12">
            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
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

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              variants={ANIMATION_VARIANTS.slideUp}
              className="text-center py-12"
            >
              <p className="text-lg text-muted-foreground">
                No projects found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
