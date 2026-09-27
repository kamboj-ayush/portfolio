'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ANIMATION_VARIANTS } from '@/constants';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const hasLinks = Boolean(
    (project.isLiveOnPlayStore && project.playStoreLink) ||
    (project.isLiveOnAppStore && project.appStoreLink) ||
    project.githubLink ||
    project.liveUrl
  );

  return (
    <motion.div
      variants={ANIMATION_VARIANTS.scale}
      custom={index}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col h-full rounded-2xl sm:rounded-3xl border border-purple-200/80 bg-card shadow-sm hover:shadow-xl hover:border-purple-400/60 dark:border-purple-500/25 dark:bg-[#0c0819]/95 dark:hover:border-purple-500/50 dark:hover:shadow-2xl dark:hover:shadow-purple-500/15 backdrop-blur-sm overflow-hidden transition-all duration-300"
    >
      {/* Thumbnail Image */}
      <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-muted dark:bg-black/40">
        <Image
          src={project.thumbnailImage}
          alt={project.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Content Body */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 lg:p-5 xl:p-6 space-y-3">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-foreground dark:text-white tracking-tight">
          {project.name}
        </h3>

        {/* Purple Divider */}
        <div className="h-px w-full bg-purple-200 dark:bg-purple-500/25 my-1" />

        {/* Subtitle / Category */}
        <p className="text-base sm:text-lg font-semibold text-purple-600 dark:text-purple-400">
          {project.category}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 pb-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-cyan-600/30 bg-cyan-50 text-cyan-800 dark:border-cyan-500/40 dark:bg-cyan-950/20 dark:text-cyan-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bullet Points / Long Description Highlights */}
        <div className="space-y-2.5 pt-1">
          {(project.highlights && project.highlights.length > 0
            ? project.highlights
            : [project.shortDescription]
          ).map((point, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm leading-none mt-1 select-none flex-shrink-0">
                ▸
              </span>
              <span>{point}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {hasLinks && (
          <div className="flex flex-wrap items-center gap-2.5 pt-3 mt-auto">
            {project.isLiveOnPlayStore && project.playStoreLink && (
              <a
                href={project.playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-xl font-semibold transition-all text-xs sm:text-sm min-w-[95px] text-center bg-purple-700 hover:bg-purple-800 text-white shadow-sm hover:shadow-md hover:shadow-purple-700/20 dark:bg-gradient-to-b dark:from-[#241544] dark:to-[#140b2b] dark:border dark:border-purple-500/40 dark:hover:border-purple-400 dark:text-white dark:shadow-md dark:hover:shadow-purple-500/20"
              >
                Android
              </a>
            )}

            {project.isLiveOnAppStore && project.appStoreLink && (
              <a
                href={project.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-xl font-semibold transition-all text-xs sm:text-sm min-w-[95px] text-center bg-purple-700 hover:bg-purple-800 text-white shadow-sm hover:shadow-md hover:shadow-purple-700/20 dark:bg-gradient-to-b dark:from-[#241544] dark:to-[#140b2b] dark:border dark:border-purple-500/40 dark:hover:border-purple-400 dark:text-white dark:shadow-md dark:hover:shadow-purple-500/20"
              >
                iOS
              </a>
            )}

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-xl font-semibold transition-all text-xs sm:text-sm min-w-[95px] text-center bg-purple-700 hover:bg-purple-800 text-white shadow-sm hover:shadow-md hover:shadow-purple-700/20 dark:bg-gradient-to-b dark:from-[#241544] dark:to-[#140b2b] dark:border dark:border-purple-500/40 dark:hover:border-purple-400 dark:text-white dark:shadow-md dark:hover:shadow-purple-500/20"
              >
                Code
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-xl font-semibold transition-all text-xs sm:text-sm min-w-[95px] text-center bg-purple-700 hover:bg-purple-800 text-white shadow-sm hover:shadow-md hover:shadow-purple-700/20 dark:bg-gradient-to-b dark:from-[#241544] dark:to-[#140b2b] dark:border dark:border-purple-500/40 dark:hover:border-purple-400 dark:text-white dark:shadow-md dark:hover:shadow-purple-500/20"
              >
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
