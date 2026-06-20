'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Container, Section, SectionHeader, SectionTitle, SectionDescription, Badge } from '@/components/ui';
import { getSkills, isSectionEnabled } from '@/lib/profile';
import { ANIMATION_VARIANTS, SKILL_CATEGORY_LABELS } from '@/constants';
import type { SkillCategory } from '@/types';

export function SkillsSection() {
  const allSkills = getSkills();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');

  if (!isSectionEnabled('skills')) return null;

  // Get unique categories from skills data
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allSkills.map(skill => skill.category)));
    return ['all', ...uniqueCategories] as (SkillCategory | 'all')[];
  }, [allSkills]);

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') {
      return allSkills;
    }
    return allSkills.filter(skill => skill.category === selectedCategory);
  }, [allSkills, selectedCategory]);

  // Get display label for category
  const getCategoryLabel = (category: string): string => {
    if (category === 'all') return 'All';
    return SKILL_CATEGORY_LABELS[category] || category;
  };

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
              <SectionTitle>Skills & Expertise</SectionTitle>
              <SectionDescription>
                Technologies and tools I work with
              </SectionDescription>
            </motion.div>
          </SectionHeader>

          {/* Category Filter */}
          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  console.log('Selected category:', category);
                }}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:scale-102'
                  }
                `}
                aria-pressed={selectedCategory === category}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </motion.div>

          {/* Skills Count */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeIn}
            className="text-center mb-6 text-sm text-muted-foreground"
          >
            Showing {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            key={selectedCategory} // Re-animate when category changes
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${skill.category}`}
                variants={ANIMATION_VARIANTS.scale}
                custom={index}
                className="group relative p-6 rounded-xl border border-border bg-card hover:bg-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="space-y-3">
                  <h3 className="font-semibold text-center text-sm">{skill.name}</h3>
                  
                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                        className="h-full bg-gradient-to-r from-primary to-purple-500"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="font-medium">{skill.proficiency}%</span>
                      {'yearsOfExperience' in skill && skill.yearsOfExperience ? (
                        <span>{skill.yearsOfExperience as number}y</span>
                      ) : null}
                    </div>
                  </div>

                  <Badge variant="secondary" className="w-full justify-center text-xs">
                    {getCategoryLabel(skill.category)}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredSkills.length === 0 && (
            <motion.div
              variants={ANIMATION_VARIANTS.fadeIn}
              className="text-center py-12 text-muted-foreground"
            >
              <p>No skills found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
