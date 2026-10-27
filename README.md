# Keywords Planner

A private SEO intelligence platform built for keyword research, content strategy, search intent, competitors, and opportunity discovery.

## Features

- Keyword discovery and opportunity tracking
- Search intent and trend tagging
- Competitor comparison and keyword gap review
- SERP and trend modules inspired by SEO tooling workflows
- Content planning and social media content ideas
- Demo-mode data with clear labels for estimated metrics
- Ready for future provider integrations via modular API architecture

## Tech stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Server-side API routes
- Vercel-ready structure

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Start the app:
   ```bash
   npm run dev
   ```

4. Open: http://localhost:3000

## Production deployment

1. Set your environment variables in Vercel.
2. Deploy the project repository to Vercel.
3. Confirm the app builds successfully with:
   ```bash
   npm run build
   ```

## Important notes

- This starter version runs in demo mode when provider credentials are missing.
- All metrics shown are estimates and should be treated as research indicators rather than exact Google data.
- Real provider integrations require API approvals, billing, and credential setup.

## Future integrations

The app is structured so you can plug in real providers later for:
- Google Trends
- Google Ads keyword data
- SERP API
- PageSpeed Insights
- Backlink or keyword intelligence providers
