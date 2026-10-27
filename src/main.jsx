# Keyword Planner

A free, real-use keyword planner built for SEO, website content, and social media strategy.

## What it includes
- Project-based keyword planning
- Keyword creation, filtering, and deletion
- SEO + social + website channel mapping
- Opportunity scoring and keyword prioritization
- Imported keyword lists from pasted text
- Content brief generation for selected keywords
- CSV export for planning and reporting
- Persistent SQLite database for real project storage
- Production-style app structure using React + Express + SQLite

## Stack
- Frontend: React + Vite
- Backend: Express.js
- Database: SQLite
- Local development: Vite proxy to Express API

## Quick start

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the app in development mode
   ```bash
   npm run dev
   ```

3. Open the app in the browser at the Vite URL shown in the terminal.

## Production-style run

Build the frontend:
```bash
npm run build
```

Serve the built app with the backend:
```bash
npm run start
```

The app will run from the Express backend on port 3001 and serve the built UI.

## Notes
This is a free, local-first production-style version for running on your own machine or a private server. It is designed to be practical and usable without paid SaaS services.

## Recommended future upgrades
- Authentication and user accounts
- Keyword trend and volume integrations
- Search console / GA4 reporting
- Content calendar workflow
- Team collaboration and roles
