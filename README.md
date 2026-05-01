# CareWise

CareWise is a B2B healthcare SaaS demo built with Next.js. It gives care teams a clinical operations dashboard with patient worklists, analytics, notifications, and a protected login flow.
<img width="1454" height="836" alt="Screenshot 2026-05-02 at 02 03 19" src="https://github.com/user-attachments/assets/5d790f56-bf56-4e7d-9722-e2288a78e38d" />

## Features

- Protected app routes with login and signup screens
- Firebase Auth support with a local demo fallback when Firebase env vars are not configured
- Home command center with care queues, alerts, capacity, acuity, and patient stats
- Patient directory, patient detail pages, filters, workflow controls, and patient drawers
- Analytics dashboard with operational metrics and Recharts visualizations
- Browser notification support through a small service worker
- Shared UI system using MUI, styled-components, lucide-react icons, and local design tokens
- Client state managed with Zustand stores

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- MUI
- styled-components
- Zustand
- Firebase
- Recharts
- lucide-react

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

The app can be used without Firebase configuration. In that mode, the login form accepts any valid email and a password of at least 6 characters. The default demo values are already filled in:

```text
clinician@carewise.test
carewise123
```

## Firebase Auth

Firebase is optional. To enable Firebase-backed authentication, create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Restart the dev server after changing environment variables.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/app/                 Next.js app routes
src/components/          Feature and shared UI components
src/components/layout/   Auth guard, app shell, notifications, demo data banner
src/components/home/     Home dashboard widgets
src/components/patients/ Patient directory and detail UI
src/components/analytics/Analytics dashboard components
src/store/               Zustand stores
src/data/                Mock care data
src/lib/                 Firebase and helper utilities
src/theme/               Theme providers, tokens, and global styles
src/types/               Shared TypeScript types
public/                  Static assets and service worker
```

## Notes

- Mock clinical data lives in `src/data/mockCare.ts`.
- The app registers `public/sw.js` for browser notification support.
- Authentication state is persisted locally under the `carewise-auth` key.
