import profileData from '@/data/profile.json';
import { ProfileData } from '@/types';

/**
 * Get the complete profile data
 */
export function getProfileData(): ProfileData {
  return profileData as unknown as ProfileData;
}

/**
 * Get personal information
 */
export function getPersonalInfo() {
  return profileData.personalInfo;
}

/**
 * Get all skills, optionally filtered by category
 */
export function getSkills(category?: string) {
  if (!profileData.skills) return [];
  if (category) {
    return profileData.skills.filter((skill) => skill.category === category);
  }
  return profileData.skills;
}

/**
 * Get all experiences
 */
export function getExperiences() {
  return profileData.experience || [];
}

/**
 * Get all projects, optionally filtered
 */
export function getProjects(filter?: {
  featured?: boolean;
  category?: string;
  status?: string;
}) {
  let projects = profileData.projects || [];

  if (filter?.featured !== undefined) {
    projects = projects.filter((p) => p.featured === filter.featured);
  }

  if (filter?.category) {
    projects = projects.filter((p) => p.category === filter.category);
  }

  if (filter?.status) {
    projects = projects.filter((p) => p.status === filter.status);
  }

  return projects;
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string) {
  return profileData.projects?.find((p) => p.slug === slug);
}

/**
 * Get all unique project categories
 */
export function getProjectCategories(): string[] {
  const categories = profileData.projects?.map((p) => p.category) || [];
  return Array.from(new Set(categories));
}

/**
 * Get all unique project tags
 */
export function getProjectTags(): string[] {
  const tags = profileData.projects?.flatMap((p) => p.tags) || [];
  return Array.from(new Set(tags));
}

/**
 * Get education history
 */
export function getEducation() {
  return profileData.education || [];
}

/**
 * Get certifications
 */
export function getCertifications() {
  return profileData.certifications || [];
}

/**
 * Get services offered
 */
export function getServices() {
  return profileData.services || [];
}

/**
 * Get testimonials
 */
export function getTestimonials() {
  return profileData.testimonials || [];
}

/**
 * Get achievements
 */
export function getAchievements() {
  return profileData.achievements || [];
}

/**
 * Get coding profiles
 */
export function getCodingProfiles() {
  return profileData.codingProfiles || [];
}

/**
 * Get social links
 */
export function getSocialLinks() {
  return profileData.socialLinks || [];
}

/**
 * Get GitHub configuration
 */
export function getGitHubConfig() {
  return profileData.github;
}

/**
 * Get SEO configuration
 */
export function getSEOConfig() {
  return profileData.seo;
}

/**
 * Get analytics configuration
 */
export function getAnalyticsConfig() {
  return profileData.analytics;
}

/**
 * Get site configuration
 */
export function getSiteConfig() {
  return profileData.siteConfig;
}

/**
 * Get filtered navigation items (only show sections with data)
 */
export function getFilteredNavigation() {
  const siteConfig = profileData.siteConfig;
  
  // Map navigation hrefs to their corresponding data sections
  const sectionMap: { [key: string]: keyof ProfileData } = {
    '/projects': 'projects',
    '/experience': 'experience',
    '/certifications': 'certifications',
    '/contact': 'contactForm',
  };
  
  return siteConfig.navigation.filter((navItem) => {
    // Always show home page
    if (navItem.href === '/') return true;
    
    // Check if this navigation item has corresponding data
    const dataSection = sectionMap[navItem.href];
    if (!dataSection) return true; // Show if no mapping exists
    
    // For contact form, check if it's enabled
    if (dataSection === 'contactForm') {
      const contactConfig = profileData.contactForm;
      return contactConfig && (contactConfig as any).enabled === true;
    }
    
    return isSectionEnabled(dataSection);
  });
}

/**
 * Get theme configuration
 */
export function getThemeConfig() {
  return profileData.theme || { defaultTheme: 'system', enableThemeSwitcher: true };
}

/**
 * Get contact form configuration
 */
export function getContactFormConfig() {
  return profileData.contactForm;
}

/**
 * Check if a section should be displayed (has data)
 */
export function isSectionEnabled(section: keyof ProfileData): boolean {
  const data = (profileData as any)[section];
  
  if (Array.isArray(data)) {
    return data.length > 0;
  }
  
  if (typeof data === 'object' && data !== null) {
    return Object.keys(data).length > 0;
  }
  
  return !!data;
}
