# Configuration Guide

## Complete Configuration Reference

This document provides a detailed guide for configuring your portfolio through `data/profile.json`.

## Table of Contents
1. [Personal Information](#personal-information)
2. [Social Links](#social-links)
3. [Skills](#skills)
4. [Experience](#experience)
5. [Projects](#projects)
6. [Education](#education)
7. [Certifications](#certifications)
8. [Services](#services)
9. [Testimonials](#testimonials)
10. [Achievements](#achievements)
11. [Coding Profiles](#coding-profiles)
12. [SEO Configuration](#seo-configuration)
13. [Theme Configuration](#theme-configuration)

## Personal Information

```json
{
  "personalInfo": {
    "name": "string - Your full name",
    "role": "string - Your professional role",
    "tagline": "string - Your professional tagline",
    "bio": "string - Your bio/description",
    "email": "string - Your email address",
    "phone": "string (optional) - Your phone number",
    "location": "string - Your location",
    "profileImage": "string - Path to profile image",
    "resumeUrl": "string - Path to resume file",
    "yearsOfExperience": "number - Years of experience",
    "currentRole": "string (optional) - Your current role",
    "currentCompany": "string (optional) - Your current company",
    "availability": "'available' | 'unavailable' | 'open-to-opportunities'"
  }
}
```

## Skills

### Skill Object
```json
{
  "name": "string - Skill name",
  "category": "string - Skill category",
  "proficiency": "number (0-100) - Proficiency level",
  "yearsOfExperience": "number (optional) - Years of experience"
}
```

### Categories
- `frontend` - Frontend Development
- `backend` - Backend Development
- `mobile` - Mobile Development
- `database` - Databases
- `devops` - DevOps & CI/CD
- `cloud` - Cloud Platforms
- `testing` - Testing & QA
- `design` - Design Tools
- `ai-ml` - AI & Machine Learning
- `data-engineering` - Data Engineering
- `game-development` - Game Development
- `other` - Other Skills

## Experience

```json
{
  "id": "string - Unique identifier",
  "company": "string - Company name",
  "companyLogo": "string (optional) - Logo path",
  "role": "string - Your role",
  "location": "string - Location",
  "locationType": "'remote' | 'onsite' | 'hybrid'",
  "startDate": "string (YYYY-MM) - Start date",
  "endDate": "string | null - End date or null for current",
  "current": "boolean - Is current job",
  "description": "string - Job description",
  "achievements": "array of strings - Key achievements",
  "technologies": "array of strings - Technologies used",
  "companyUrl": "string (optional) - Company website"
}
```

## Projects

```json
{
  "id": "string - Unique identifier",
  "slug": "string - URL-friendly slug",
  "name": "string - Project name",
  "shortDescription": "string - Brief description",
  "fullDescription": "string - Detailed description",
  "category": "string - Project category",
  "tags": "array of strings - Project tags",
  "technologies": "array of strings - Technologies used",
  "featured": "boolean - Is featured project",
  "thumbnailImage": "string - Thumbnail path",
  "images": "array of strings - Additional images",
  "githubUrl": "string (optional) - GitHub repository",
  "liveUrl": "string (optional) - Live demo URL",
  "startDate": "string - Start date",
  "endDate": "string (optional) - End date",
  "status": "'completed' | 'in-progress' | 'archived'"
}
```

## SEO Configuration

```json
{
  "seo": {
    "title": "string - Site title",
    "description": "string - Site description",
    "keywords": "array of strings - SEO keywords",
    "author": "string - Author name",
    "siteUrl": "string - Full site URL",
    "image": "string - OG image path",
    "twitterHandle": "string (optional) - Twitter handle",
    "locale": "string - Locale (e.g., en_US)",
    "type": "'website' | 'profile'"
  }
}
```

## Theme Configuration

```json
{
  "theme": {
    "defaultTheme": "'light' | 'dark' | 'system'",
    "enableThemeSwitcher": "boolean"
  }
}
```

## Site Configuration

```json
{
  "siteConfig": {
    "navigation": [
      {
        "label": "string - Nav item label",
        "href": "string - Nav item URL"
      }
    ],
    "footer": {
      "copyright": "string - Copyright text",
      "links": "array - Footer links"
    },
    "features": {
      "showScrollProgress": "boolean",
      "showBackToTop": "boolean",
      "showCommandPalette": "boolean",
      "showBreadcrumbs": "boolean"
    }
  }
}
```

## Tips

1. **Required Fields**: Some fields are required for proper display
2. **Optional Fields**: Optional fields can be omitted
3. **Arrays**: Empty arrays will hide corresponding sections
4. **Images**: Use absolute paths from public directory
5. **Dates**: Use YYYY-MM format for consistency
6. **Validation**: The app validates data at build time

## Examples

See `data/profile.json` for a complete working example.

## Need Help?

Open an issue on GitHub if you need assistance with configuration!
