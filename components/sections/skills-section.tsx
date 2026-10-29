'use client';

import { motion } from 'framer-motion';
import { Container, Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui';
import { getSkills, isSectionEnabled } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';
import type { SkillCategory } from '@/types';
import {
  SiFlutter,
  SiDart,
  SiAndroid,
  SiKotlin,
  SiSwift,
  SiFirebase,
  SiSupabase,
  SiGraphql,
  SiPostgresql,
  SiSqlite,
  SiGit,
  SiGithub,
  SiGoogleplay,
  SiAppstore,
  SiPostman,
  SiCodemagic,
  SiFastlane,
  SiAndroidstudio,
  SiDocker,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbApi, TbBrandVscode } from 'react-icons/tb';
import { Cpu } from 'lucide-react';

interface SkillConfig {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

const SKILL_CONFIG_MAP: Record<string, SkillConfig> = {
  'Flutter': { icon: SiFlutter, color: '#02569B' },
  'Dart': { icon: SiDart, color: '#0175C2' },
  'Android Native': { icon: SiAndroid, color: '#3DDC84' },
  'Android': { icon: SiAndroid, color: '#3DDC84' },
  'Kotlin': { icon: SiKotlin, color: '#7F52FF' },
  'Java': { icon: FaJava, color: '#EA2D2E' },
  'iOS (Swift)': { icon: SiSwift, color: '#F05138' },
  'Swift': { icon: SiSwift, color: '#F05138' },
  'iOS': { icon: SiSwift, color: '#F05138' },
  'Firebase': { icon: SiFirebase, color: '#FFCA28' },
  'Supabase': { icon: SiSupabase, color: '#3ECF8E' },
  'REST APIs': { icon: TbApi, color: '#00B4D8' },
  'REST API': { icon: TbApi, color: '#00B4D8' },
  'GraphQL': { icon: SiGraphql, color: '#E10098' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'SQLite': { icon: SiSqlite, color: '#0086D6' },
  'Git': { icon: SiGit, color: '#F05032' },
  'GitHub': { icon: SiGithub, color: '#888888' },
  'Google Play Console': { icon: SiGoogleplay, color: '#0086F8' },
  'App Store Connect': { icon: SiAppstore, color: '#0D96F6' },
  'Postman': { icon: SiPostman, color: '#FF6C37' },
  'Codemagic': { icon: SiCodemagic, color: '#FFA100' },
  'Fastlane': { icon: SiFastlane, color: '#00F29E' },
  'Android Studio': { icon: SiAndroidstudio, color: '#3DDC84' },
  'VS Code': { icon: TbBrandVscode, color: '#007ACC' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#888888' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
};

const CATEGORY_META: Record<string, { label: string; icon: string; description: string }> = {
  mobile: {
    label: 'Mobile & Platforms',
    icon: '📱',
    description: 'Cross-platform mobile frameworks and native platform technologies',
  },
  backend: {
    label: 'Backend, Cloud & Databases',
    icon: '⚙️',
    description: 'Cloud databases, backend services, and REST/GraphQL APIs',
  },
  devops: {
    label: 'Developer Tools & DevOps',
    icon: '🛠️',
    description: 'Version control, app store deployment, and automated CI/CD pipelines',
  },
};

export function SkillsSection() {
  const allSkills = getSkills();

  if (!isSectionEnabled('skills')) return null;

  // Group skills by category in consistent order
  const categoryOrder: SkillCategory[] = ['mobile', 'backend', 'devops'];
  const visibleCategories = categoryOrder.filter(cat => allSkills.some(s => s.category === cat));

  return (
    <Section id="skills">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          <SectionHeader>
            <motion.div variants={ANIMATION_VARIANTS.slideUp}>
              <SectionTitle>Skills & Technologies</SectionTitle>
              <SectionDescription>
                Core technologies, frameworks, and developer tools I use to build scalable production apps
              </SectionDescription>
            </motion.div>
          </SectionHeader>

          {/* Categorized Skills Stack */}
          <div className="space-y-8 sm:space-y-10">
            {visibleCategories.map((catKey) => {
              const meta = CATEGORY_META[catKey] || {
                label: catKey,
                icon: '⚡',
                description: 'Technologies and tools',
              };
              const skillsInCategory = allSkills.filter(s => s.category === catKey);

              if (skillsInCategory.length === 0) return null;

              return (
                <motion.div
                  key={catKey}
                  variants={ANIMATION_VARIANTS.slideUp}
                  className="rounded-3xl border border-purple-200/80 bg-card/90 dark:border-purple-500/20 dark:bg-[#120b24]/90 backdrop-blur-md p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 border-b border-purple-200/60 dark:border-purple-500/15 pb-4 sm:pb-5 mb-6">
                    <span className="text-2xl sm:text-3xl select-none">{meta.icon}</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground dark:text-white">
                        {meta.label}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground dark:text-purple-300/70">
                        {meta.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-5">
                    {skillsInCategory.map((skill, index) => {
                      const config = SKILL_CONFIG_MAP[skill.name];
                      const IconComponent = config?.icon;

                      return (
                        <motion.div
                          key={skill.name}
                          variants={ANIMATION_VARIANTS.scale}
                          custom={index}
                          whileHover={{ y: -5, scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                          className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border border-purple-200/60 bg-muted/30 hover:bg-muted/80 hover:border-purple-400/60 dark:border-purple-500/15 dark:bg-[#180f30]/60 dark:hover:border-purple-400/50 dark:hover:bg-[#20143f] shadow-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-default"
                        >
                          <div 
                            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                            style={{ color: config?.color }}
                          >
                            {IconComponent ? (
                              <IconComponent
                                className={`w-9 h-9 sm:w-11 sm:h-11 drop-shadow-sm ${
                                  skill.name === 'GitHub' || skill.name === 'Next.js'
                                    ? 'text-slate-900 dark:text-white'
                                    : ''
                                }`}
                              />
                            ) : (
                              <Cpu className="w-9 h-9 sm:w-11 sm:h-11 text-primary" />
                            )}
                          </div>
                          <span className="mt-3 text-xs sm:text-sm font-semibold text-foreground dark:text-slate-200 text-center tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
