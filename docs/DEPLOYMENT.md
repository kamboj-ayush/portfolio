# Deployment Guide

## Overview

This portfolio can be deployed to multiple platforms. Choose the one that best fits your needs.

## Vercel (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js.

### Method 1: GitHub Integration (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Vercel will automatically:
- Build your project
- Deploy to production
- Set up continuous deployment
- Provide a custom URL

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

If you're using analytics or other services:
1. Go to your project on Vercel
2. Navigate to Settings → Environment Variables
3. Add your variables:
   - `NEXT_PUBLIC_GA_ID` - Google Analytics ID
   - `NEXT_PUBLIC_POSTHOG_KEY` - PostHog API Key
   - etc.

## Netlify

### Method 1: GitHub Integration

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Click "Deploy site"

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### netlify.toml Configuration

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## GitHub Pages

GitHub Pages requires additional configuration for Next.js:

1. Install `next-export`:
```bash
npm install -D @next/bundle-analyzer
```

2. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/your-repo-name', // if using project site
};
```

3. Build and export:
```bash
npm run build
```

4. Deploy the `out` directory to GitHub Pages

### Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## Custom Domain

### Vercel

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS settings:
   - Type: `CNAME`
   - Name: `www` (or `@`)
   - Value: `cname.vercel-dns.com`

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS settings as instructed

## Performance Optimization

Before deploying, ensure:

1. **Images are optimized**
   - Use WebP format when possible
   - Compress images (use tools like TinyPNG)
   - Proper dimensions (don't upload huge images)

2. **Remove unused dependencies**
```bash
npm prune
```

3. **Check bundle size**
```bash
npm run build
# Review the output for large bundles
```

4. **Enable caching**
   - Vercel/Netlify handle this automatically
   - For custom servers, configure proper cache headers

## Environment-Specific Configurations

### Development
```bash
npm run dev
```

### Production Build Locally
```bash
npm run build
npm run start
```

### Analyze Bundle
```bash
ANALYZE=true npm run build
```

## Monitoring

### Vercel Analytics
1. Enable in Vercel dashboard
2. View analytics in project settings

### Google Analytics
1. Add GA ID to `profile.json`:
```json
{
  "analytics": {
    "googleAnalyticsId": "G-XXXXXXXXXX"
  }
}
```

## Troubleshooting

### Build Fails

1. Check Node.js version (18+ required)
2. Clear cache:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading

1. Check image paths in `profile.json`
2. Ensure images exist in `public` directory
3. Use proper image formats (jpg, png, webp)

### Styles Not Applied

1. Check if globals.css is imported
2. Clear .next folder
3. Rebuild

## Support

If you encounter issues:
1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Check platform-specific docs (Vercel, Netlify, etc.)
3. Open an issue on GitHub

---

**Happy Deploying! 🚀**
