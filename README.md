# Universal JSON-Driven Portfolio Platform

A modern, production-ready portfolio framework built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. This is a fully configurable portfolio platform that can be customized by any technical professional simply by editing configuration files—no code changes required.

## ✨ Features

### Core Features
- 🎨 **Universal Design System** - Premium UI inspired by Apple, Vercel, and Stripe
- 🌓 **Dark/Light/System Theme** - Fully responsive theme system with smooth transitions
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Performance Optimized** - Built for speed with Next.js 14 App Router
- 🎬 **Smooth Animations** - Professional animations using Framer Motion
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🔍 **SEO Optimized** - Complete SEO configuration with meta tags and structured data

### Page & Section Features
- **Hero Section** - Eye-catching introduction with profile image and CTAs
- **About Section** - Personal bio and professional highlights
- **Skills Section** - Categorized skills with proficiency indicators
- **Experience Section** - Timeline-based work history
- **Projects Section** - Portfolio showcase with filtering and search
- **Certifications** - Professional credentials display
- **Contact Section** - Easy-to-use contact information

### Technical Features
- 📦 **100% JSON-Driven** - All content configurable via `profile.json`
- 🎯 **TypeScript** - Full type safety throughout the application
- 🎨 **Tailwind CSS** - Utility-first styling with custom design system
- 🔄 **Git Ready** - Proper .gitignore and commit structure
- 📊 **Analytics Support** - Google Analytics, PostHog, Plausible ready
- 🚀 **Deploy Ready** - Optimized for Vercel, Netlify, and other platforms

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Customize your profile**
Edit `data/profile.json` with your information (see Configuration Guide below)

4. **Add your assets**
- Replace `public/profile.jpg` with your profile image
- Replace `public/resume.pdf` with your resume
- Add project images to `public/assets/projects/`

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📋 Configuration Guide

### Profile Data (`data/profile.json`)

The entire website is configured through a single JSON file. Here's what you can customize:

#### Personal Information
```json
{
  "personalInfo": {
    "name": "Your Name",
    "role": "Your Role",
    "tagline": "Your tagline",
    "bio": "Your bio",
    "email": "your@email.com",
    "phone": "+1234567890",
    "location": "City, Country",
    "profileImage": "/profile.jpg",
    "resumeUrl": "/resume.pdf",
    "yearsOfExperience": 5,
    "currentRole": "Your Current Role",
    "currentCompany": "Your Company",
    "availability": "available"
  }
}
```

#### Skills Categories
- `frontend` - Frontend technologies
- `backend` - Backend technologies
- `mobile` - Mobile development
- `database` - Databases
- `devops` - DevOps tools
- `cloud` - Cloud platforms
- `testing` - Testing frameworks
- `design` - Design tools
- `ai-ml` - AI/ML technologies
- `other` - Other skills

#### SEO Configuration
Update the `seo` object in `profile.json`:
```json
{
  "seo": {
    "title": "Your Name - Portfolio",
    "description": "Your description",
    "keywords": ["keyword1", "keyword2"],
    "siteUrl": "https://yoursite.com",
    "image": "/og-image.jpg"
  }
}
```

### Required Assets

Place these files in the `public` directory:
- **profile.jpg** - Your profile image (recommended: 800x800px)
- **resume.pdf** - Your resume
- **og-image.jpg** - Social media preview image (1200x630px)

Add project screenshots to `public/assets/projects/`

## 🎨 Customization

### Theme Colors

Edit `app/globals.css` to customize colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  /* Customize other colors */
}
```

### Adding Content

All sections automatically show/hide based on data availability:
- Add experience → Experience section appears
- Add projects → Projects section appears
- Add certifications → Certifications page appears

No code changes needed!

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Push code to GitHub
2. Import repository on Vercel
3. Deploy!

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository on Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects page
│   ├── experience/        # Experience page
│   └── certifications/    # Certifications page
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections
│   └── ui/                # UI components
├── data/
│   └── profile.json       # 🔥 YOUR CONFIGURATION
├── types/                 # TypeScript types
├── lib/                   # Utilities
├── hooks/                 # Custom hooks
├── constants/             # Constants
└── public/                # Static assets
    ├── profile.jpg        # Your profile image
    ├── resume.pdf         # Your resume
    └── assets/            # Project images
```

## 🛠️ Development

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Supported Professions

This platform works for ALL technical professionals:
- ✅ Frontend Developers
- ✅ Backend Developers
- ✅ Full Stack Developers
- ✅ Mobile Developers
- ✅ DevOps Engineers
- ✅ Cloud Engineers
- ✅ Software Architects
- ✅ AI/ML Engineers
- ✅ Data Engineers
- ✅ Game Developers
- ✅ And more!

## 📊 Performance Targets

- ⚡ Performance: 95+
- ♿ Accessibility: 95+
- 🔍 Best Practices: 95+
- 🎯 SEO: 95+

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 📝 License

MIT License - feel free to use for your portfolio!

## 🙏 Built With

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ for the developer community**
