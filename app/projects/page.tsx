'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Badge, Button } from '@/components/ui';
import { getProjects, getProjectCategories, getProjectTags } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';
import { Search, Star, Code2, ExternalLink } from 'lucide-react';
import { FaGithub, FaGooglePlay, FaAppStore } from 'react-icons/fa';

export default function ProjectsPage() {
  const allProjects = getProjects();
  const categories = getProjectCategories();
  const allTags = getProjectTags();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => project.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [allProjects, searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

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
              Explore my portfolio of projects spanning various technologies and domains
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
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-12 space-y-6">
            {/* Categories */}
            <div className="space-y-2">
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

            {/* Tags */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {tag}
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={ANIMATION_VARIANTS.scale}
                className="group relative rounded-xl border border-border bg-card overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.thumbnailImage}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-950 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold line-clamp-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {/* GitHub Button */}
                    {project.githubLink && (
  <a
    href={project.githubLink}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border hover:bg-accent transition-colors text-xs font-medium"
  >
    <FaGithub className="h-3.5 w-3.5" />
    <span>Code</span>
  </a>
)}
                    
                    {/* Play Store Button */}
                    {project.isLiveOnPlayStore && project.playStoreLink && (
                      <a
                        href={project.playStoreLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-green-500/50 bg-green-500/10 hover:bg-green-500/20 transition-colors text-xs font-medium text-green-600"
                      >
                        <FaGooglePlay className="h-3.5 w-3.5" />
                        <span>Play</span>
                      </a>
                    )}
                    
                    {/* App Store Button */}
                    {project.isLiveOnAppStore && project.appStoreLink && (
                      <a
                        href={project.appStoreLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-xs font-medium text-blue-600"
                      >
                        <FaAppStore className="h-3.5 w-3.5" />
                        <span>App</span>
                      </a>
                    )}
                    
                    {/* Live Demo Button */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-medium"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
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
                  setSelectedTags([]);
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
