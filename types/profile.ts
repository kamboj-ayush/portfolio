// Type definitions for the entire portfolio platform

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  profileImage: string;
  resumeUrl: string;
  yearsOfExperience: number;
  currentRole?: string;
  currentCompany?: string;
  availability?: 'available' | 'unavailable' | 'open-to-opportunities';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
  username?: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  icon?: string;
  yearsOfExperience?: number;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'database'
  | 'devops'
  | 'cloud'
  | 'testing'
  | 'design'
  | 'ai-ml'
  | 'data-engineering'
  | 'game-development'
  | 'other';

export interface Experience {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  startDate: string;
  endDate?: string; // null or "Present" for current
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string[];
  technologies: string[];
  featured: boolean;
  thumbnailImage: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  startDate: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'archived';
  problemStatement?: string;
  challenges?: string[];
  solution?: string;
  architecture?: string;
  results?: ProjectResult[];
  testimonial?: Testimonial;
  teamSize?: number;
  role?: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  image?: string;
  skills?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  pricing?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
  rating?: number;
  date?: string;
  projectId?: string;
  linkedinUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'publication' | 'open-source' | 'speaking' | 'certification' | 'other';
  icon?: string;
  url?: string;
  organization?: string;
}

export interface CodingProfile {
  platform: string;
  username: string;
  url: string;
  rating?: number;
  rank?: string;
  problemsSolved?: number;
  badges?: string[];
  icon?: string;
  stats?: Record<string, string | number>;
}

export interface GitHubConfig {
  username: string;
  showProfile: boolean;
  showPinnedRepos: boolean;
  showStats: boolean;
  showContributions: boolean;
  pinnedRepos?: string[]; // repo names to show if not using GitHub's pinned
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  image: string;
  twitterHandle?: string;
  locale: string;
  type: 'website' | 'profile';
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  posthogApiKey?: string;
  posthogHost?: string;
  plausibleDomain?: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
}

export interface ContactFormConfig {
  enabled: boolean;
  email: string;
  web3FormsAccessKey: string;
  fields: ContactFormField[];
  successMessage?: string;
  errorMessage?: string;
}

export interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'system';
  enableThemeSwitcher: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  navigation: NavigationItem[];
  footer: {
    copyright: string;
    links: NavigationItem[];
  };
  features: {
    showScrollProgress: boolean;
    showBackToTop: boolean;
    showCommandPalette: boolean;
    showBreadcrumbs: boolean;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishDate: string;
  updatedDate?: string;
  tags: string[];
  category: string;
  readTime: number;
  featured: boolean;
}

// Main Profile Data Structure
export interface ProfileData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  services?: Service[];
  testimonials?: Testimonial[];
  achievements?: Achievement[];
  codingProfiles?: CodingProfile[];
  github?: GitHubConfig;
  seo: SEOConfig;
  analytics?: AnalyticsConfig;
  contactForm?: ContactFormConfig;
  theme?: ThemeConfig;
  siteConfig: SiteConfig;
  blog?: BlogPost[];
}
