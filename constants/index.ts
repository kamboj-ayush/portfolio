export const SITE_NAME = 'Portfolio';

export const TRANSITIONS = {
  default: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  slow: {
    duration: 0.6,
    ease: 'easeInOut',
  },
  fast: {
    duration: 0.15,
    ease: 'easeInOut',
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const SOCIAL_ICON_MAP: Record<string, string> = {
  github: 'Github',
  linkedin: 'Linkedin',
  twitter: 'Twitter',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'Youtube',
  'dev.to': 'Code',
  dev: 'Code',
  medium: 'BookOpen',
  stackoverflow: 'Stack',
  email: 'Mail',
  website: 'Globe',
};

export const SKILL_CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  database: 'Database',
  devops: 'DevOps',
  cloud: 'Cloud',
  testing: 'Testing',
  design: 'Design',
  'ai-ml': 'AI/ML',
  'data-engineering': 'Data Engineering',
  'game-development': 'Game Development',
  other: 'Other',
};

export const LOCATION_TYPE_LABELS: Record<string, string> = {
  remote: 'Remote',
  onsite: 'On-site',
  hybrid: 'Hybrid',
};

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  archived: 'Archived',
};

export const ACHIEVEMENT_TYPE_LABELS: Record<string, string> = {
  award: 'Award',
  publication: 'Publication',
  'open-source': 'Open Source',
  speaking: 'Speaking',
  certification: 'Certification',
  other: 'Other',
};
