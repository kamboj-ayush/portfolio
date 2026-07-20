'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section, SectionHeader, SectionTitle, SectionDescription, Button, Badge } from '@/components/ui';
import { getProjects, isSectionEnabled } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';
import { Star, Code2, ExternalLink, ArrowUpRight, Eye, Smartphone } from 'lucide-react';
import { FaGithub, FaGooglePlay, FaAppStore } from 'react-icons/fa';

export function ProjectsSection() {
  const featuredProjects = getProjects({ featured: true }).slice(0, 6);

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
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                Portfolio
              </span>
              <SectionTitle>Featured Projects</SectionTitle>
              <SectionDescription>
                Showcasing my best work and side projects that demonstrate my skills
              </SectionDescription>
            </motion.div>
          </SectionHeader>

          <motion.div
            variants={ANIMATION_VARIANTS.staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={ANIMATION_VARIANTS.scale}
                custom={index}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative rounded-2xl border-2 border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-purple-500/0 group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-purple-500/5 transition-all duration-500" />
                  
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={project.thumbnailImage}
                      alt={project.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-black rounded-lg font-semibold hover:bg-white transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                      >
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </motion.div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="relative p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs font-medium px-3 py-1">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {/* GitHub Button */}
                      {project.githubLink && (
  <a
    href={project.githubLink}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group/btn text-sm font-medium"
  >
    <FaGithub className="h-3.5 w-3.5 group-hover/btn:rotate-12 transition-transform" />
    <span>Code</span>
  </a>
)}
                      
                      {/* Play Store Button */}
                      {project.isLiveOnPlayStore && project.playStoreLink && (
                        <a
                          href={project.playStoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all duration-300 group/btn text-sm font-medium text-green-600"
                        >
                          <FaGooglePlay className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                          <span>Play</span>
                        </a>
                      )}
                      
                      {/* App Store Button */}
                      {project.isLiveOnAppStore && project.appStoreLink && (
                        <a
                          href={project.appStoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500 transition-all duration-300 group/btn text-sm font-medium text-blue-600"
                        >
                          <FaAppStore className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                          <span>App</span>
                        </a>
                      )}
                      
                      {/* Live Demo Button */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 group/btn text-sm"
                        >
                          <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
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
