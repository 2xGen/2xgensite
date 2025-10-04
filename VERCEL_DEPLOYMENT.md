# Vercel Deployment Guide for 2xGen Website

## Quick Setup

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from dist folder
```bash
cd dist
vercel --prod
```

### 4. Set Environment Variables (if needed)
In Vercel dashboard:
- Go to your project settings
- Add any environment variables you need

## What Vercel Configuration Does

### `vercel.json` handles:
- **React routing**: All routes go to `index.html` except static files
- **Blog posts**: `/insights/slug` → `/insights/slug.html`
- **Static files**: Served directly (CSS, JS, images)
- **Caching**: Optimized cache headers for assets

### File Structure on Vercel:
```
/
├── index.html              ← React app (handles /insights, /contact, etc.)
├── contact.html            ← Static contact page
├── insights/               ← 8 static HTML blog posts
│   ├── ai-transforming-web-development.html
│   ├── validating-saas-ideas.html
│   └── ...
├── assets/                 ← React app assets
└── vercel.json            ← Deployment configuration
```

## How It Works

1. **`/insights`** → React component with all 43 blog posts + filtering
2. **`/insights/ai-transforming-web-development`** → Static HTML blog post
3. **`/contact`** → Static HTML contact page  
4. **`/`** → React homepage
5. **All other routes** → React handles them

## Benefits of Vercel

✅ **Built for React**: No server configuration needed
✅ **Automatic HTTPS**: SSL certificates included
✅ **Global CDN**: Fast loading worldwide
✅ **Zero downtime**: Instant deployments
✅ **Custom domains**: Easy to connect your domain
✅ **Analytics**: Built-in performance monitoring

## Custom Domain Setup

1. Go to Vercel dashboard → Project Settings → Domains
2. Add your domain (e.g., `2xgen.com`)
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

## Deployment Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# Check deployment status
vercel ls
```

