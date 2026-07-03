<h1 align="center">GSSoC Tracker</h1>

<p align="center">A fast, premium tracker for GSSoC 2026 contributors and mentors — with hardware-accelerated animations, real-time analytics, and automated email alerts.</p>

<p align="center">
  <a href="https://gssoc-pr-tracker.vercel.app"><strong>🌐 Live Demo — gssoc-pr-tracker.vercel.app</strong></a>
</p>

<p align="center">
  <a href="https://github.com/pratyush06-aec/gssoc_pr_tracker/stargazers">
    <img src="https://badgen.net/github/stars/pratyush06-aec/gssoc_pr_tracker" alt="Stars" />
  </a>&nbsp;
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" />&nbsp;
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />&nbsp;
  <img src="https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel" alt="Vercel" />
</p>

> Not affiliated with GirlScript Summer of Code or GirlScript Foundation. Scores are filtered to officially registered GSSoC 2026 projects, so they align with the official leaderboard. For your exact official standing, always check the GSSoC leaderboard directly.

![GSSoC Tracker Home](public/home.png)

---

## Table of Contents

- [Why This Exists](#why-this-exists)
- [Features](#features)
  - [Contributor Tracker](#contributor-tracker)
  - [Mentor Tracker](#mentor-tracker)
  - [PR Validator](#pr-validator)
  - [Analytics](#analytics)
  - [Email Alerts](#email-alerts)
- [Visual Experience](#visual-experience)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
  - [Directory Structure](#directory-structure)
  - [Pages & Routing](#pages--routing)
  - [API Routes](#api-routes)
  - [Component Architecture](#component-architecture)
  - [Library Modules](#library-modules)
  - [Data Layer](#data-layer)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Setting Up Email Alerts](#setting-up-email-alerts)
  - [Step 1: Create a Gmail App Password](#step-1-create-a-gmail-app-password)
  - [Step 2: Configure Environment Variables](#step-2-configure-environment-variables)
  - [Step 3: Test Email Delivery](#step-3-test-email-delivery)
- [Deploying to Vercel](#deploying-to-vercel)
- [GitHub Actions (Automated Sync)](#github-actions-automated-sync)
  - [What the Sync Job Does](#what-the-sync-job-does)
  - [Required Repository Secrets](#required-repository-secrets)
  - [Running the Sync Manually](#running-the-sync-manually)
- [Scoring System](#scoring-system)
  - [Contributor Scoring Formula](#contributor-scoring-formula)
  - [Mentor Scoring Formula](#mentor-scoring-formula)
- [Developer Guidelines](#developer-guidelines)
- [NPM Scripts Reference](#npm-scripts-reference)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)

---

## Why This Exists

The official GSSoC leaderboard takes time to load, and that makes sense. It is processing 45,000+ contributors filtered to specific registered project repos — that is a genuinely hard problem at scale.

But as a contributor, I just wanted a fast personal view of my own PRs, with labels, charts, and a score breakdown I could actually read. So I built it for myself.

When I shared it with a few people, one thing became obvious: a lot of contributors had no idea whether their PRs had actually been accepted. They could not tell if a label had been applied, if their score had changed, or why two similar PRs gave different points. This tool answers those questions directly.

That is why it is out for the community. It is not trying to replace the official tracker. It is just a faster, clearer way to understand your own contributions. Over 800 people use it now.

---

## Features

### Contributor Tracker

![PR Tracker Dashboard](public/dashboard.png)

![PR Tracker Dashboard 2](public/dashboard2.png)

Fetches all your public **merged** PRs that carry GSSoC labels and scores them using the official formula. Open or closed-without-merge PRs are shown for reference but do not count toward your total. The dashboard includes:

- **Profile card** — Avatar, name, rank badge, and total points
- **Stats grid** — Total points, merged PRs, approved PRs, unique repos, streak, and rank
- **PR table** — Every PR with its labels, score breakdown, status, and repo
- **Contribution heatmap** — GitHub-style green activity grid of PR merge frequency
- **Analytics charts** — Level distribution, quality breakdown, and growth over time
- **Scoring guide** — In-app reference of the full points formula

### Mentor Tracker

If you are a GSSoC mentor, you can track the PRs you have reviewed. It searches for PRs labelled `mentor:yourusername` and `gssoc:approved` — filtered to official repos — and calculates your mentor score. Only **merged** PRs count toward your total.

### PR Validator

![PR Validator](public/pr-check.png)

Ever submitted a PR and wondered — does this actually count? Go to [/pr-check](https://gssoc-pr-tracker.vercel.app/pr-check), paste the GitHub PR link, and you get an instant answer.

It runs through every condition that matters:

- Is the `gssoc:approved` label on it?
- Has it been merged?
- Is the repo part of the officially registered GSSoC 2026 projects?
- Does it have any disqualifying flags like `gssoc:spam` or `gssoc:ai-slop`?

For each condition it tells you clearly what is passing, what is missing, and what you need to fix. If the PR does count, it shows the full points breakdown — base score, difficulty, quality multiplier, type bonuses — so you know exactly how many points it is worth.

No username needed. Just the PR link.

### Analytics

Both tracker pages include three interactive charts:

- **Level distribution** — breakdown of your PRs by difficulty level
- **Quality distribution** — how many PRs had a quality label vs none
- **Contribution growth** — a growth chart tracking PR merge velocity over time

All chart sections animate into view with a zig-zag scroll entrance as you navigate the dashboard.

### Email Alerts

![Subscribe Form](public/subscribe.png)

You can subscribe to get email alerts whenever your score or rank changes. Hit "Get alerts" on the home page, enter your GitHub username and email, and choose between:

- **On score change** — instant notification when your points or rank change
- **Daily digest** — a morning summary every day at 8 AM IST

![Email Alert](public/email-alert.png)

When your score changes, you get an email showing exactly what changed, which PRs contributed, and a one-click unsubscribe link. The first sync after subscribing silently records your baseline score — emails start from the second sync onward, only when an actual change is detected.

---

## Visual Experience

The tracker is designed to feel premium and interactive, not just functional. Here is what powers the visual layer:

### 🌌 WebGPU Galaxy Background
The landing page renders a `three.js` (WebGPU) interactive galaxy behind the UI. If the browser does not support WebGPU, it gracefully degrades without breaking the page. Type declarations for experimental Three.js modules live in `src/types/three.d.ts`.

### ✨ Click Explosions
Clicking anywhere on the screen spawns 20 neon-green snowflake icons at the cursor position using GSAP timelines (`src/components/animations/ClickExplosion.tsx`). DOM nodes are garbage-collected on animation completion to prevent memory leaks.

### 📦 3D Stacked Stats Grid
The stats grid (`src/components/pr-tracker/StatsGrid.tsx`) is a state-driven GSAP Client Component. Cards pile up in the center with 3D depth — staggered Y-offsets, horizontal fanning, descending scale, and alternating rotations — then fan out into their natural grid positions on hover or tap. An internal timer auto-collapses the stack after 7 seconds of inactivity.

### 🔀 Zig-Zag Scroll Animations
A reusable `ScrollSlideIn` wrapper component uses GSAP `ScrollTrigger` to slide sections in from alternating sides as the user scrolls, creating a deliberate left-right-left entrance sequence across the dashboard.

### 📊 Contribution Heatmap
A GitHub-style green activity grid (`ContributionHeatmap.tsx`) visualizes PR merge frequency over time, displayed alongside the analytics charts.

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, React Server Components, `unstable_cache`) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 with custom design tokens (`canvas-night`, `primary-deep`, glassmorphism) |
| **Animations** | GSAP 3.15 (`gsap`, `@gsap/react`, `ScrollTrigger`) — 3D stats grid, scroll entrances, click particles |
| **3D Graphics** | Three.js 0.185 (WebGPU renderer) — landing page galaxy background |
| **Charts** | Recharts 3.8 — level/quality distribution, contribution growth |
| **UI Primitives** | Radix UI (Dialog, Tooltip, Dropdown, Select), shadcn/ui |
| **Tables** | TanStack Table v8, TanStack Virtual v3 |
| **Email** | Nodemailer 8 (Gmail SMTP) |
| **Hosting** | Vercel (edge caching, serverless functions) |
| **CI/CD** | GitHub Actions (automated data sync every 6 hours) |
| **Analytics** | Vercel Analytics |

**No database. No auth. No external services** beyond the GitHub API and Gmail SMTP.

---

## Project Architecture

### Directory Structure

```
gssoc_pr_tracker/
├── .github/
│   └── workflows/
│       └── sync.yml              # GitHub Actions cron job (every 6 hours)
├── data/                          # Runtime JSON data (committed to repo)
│   ├── profile.json               # Latest PRODHOSH profile snapshot
│   ├── history.json               # Historical rank/score entries
│   ├── notifications.json         # Email notification log
│   └── subscribers.json           # Active email subscribers
├── public/                        # Static assets (screenshots, favicon)
├── scripts/
│   ├── sync.ts                    # Main sync script (run by GitHub Actions)
│   ├── email-templates.ts         # HTML email templates (change alert, daily digest)
│   └── test-email.ts              # Test script to verify SMTP setup
├── src/
│   ├── app/                       # Next.js App Router pages & API routes
│   │   ├── api/                   # REST API endpoints
│   │   │   ├── check-star/        # Check if user has starred the repo
│   │   │   ├── feedback/          # Submit NPS feedback (sends email)
│   │   │   ├── lookup/            # Look up a user on the GSSoC leaderboard
│   │   │   ├── mentor-tracker/    # Fetch mentor PR data
│   │   │   ├── pr-check/          # Validate a single PR
│   │   │   ├── pr-tracker/        # Fetch contributor PR data
│   │   │   ├── subscribe/         # Add email subscriber
│   │   │   ├── sync/              # Manual sync endpoint (protected)
│   │   │   └── unsubscribe/       # One-click unsubscribe (GET, renders HTML)
│   │   ├── dashboard/             # Personal dashboard page
│   │   ├── landing/               # Landing page route
│   │   ├── mentor/                # Mentor tracker page
│   │   ├── pr-check/              # PR validator page
│   │   ├── pr-tracker/[username]/ # Dynamic contributor tracker page
│   │   ├── project-admin/         # Project admin tracker page
│   │   ├── terms/                 # Terms of service page
│   │   ├── validate/              # PR validation page
│   │   ├── layout.tsx             # Root layout (fonts, metadata, analytics)
│   │   ├── page.tsx               # Home/landing page
│   │   ├── globals.css            # Global styles
│   │   ├── manifest.ts            # PWA manifest
│   │   ├── robots.ts              # SEO robots.txt
│   │   └── sitemap.ts             # SEO sitemap
│   ├── components/                # React components
│   │   ├── animations/            # ClickExplosion, ScrollSlideIn
│   │   ├── dashboard/             # Dashboard-specific components
│   │   ├── home/                  # HomeNavbar, HomeFooter, HomeHero
│   │   ├── landing/               # LandingHero, LandingFeatures, etc.
│   │   ├── mentor/                # MentorNavbar, MentorStats, MentorCharts
│   │   ├── pr-check/              # ValidatorNavbar, ValidatorSpecs, etc.
│   │   ├── pr-tracker/            # TrackerNavbar, GitHubProfileCard, StatsGrid, PRTable, etc.
│   │   ├── project-admin/         # Project admin components
│   │   ├── ui/                    # shadcn/ui primitives (Button, Dialog, etc.)
│   │   ├── AnalyticsCharts.tsx    # Recharts level/quality/growth charts
│   │   ├── HomePointsGuide.tsx    # Points system guide modal
│   │   ├── SubscribeModal.tsx     # Email subscription modal
│   │   ├── QuickFeedbackPopup.tsx # NPS feedback popup
│   │   ├── StarNudge.tsx          # GitHub star nudge banner
│   │   └── ...
│   ├── data/
│   │   ├── gssoc-repos.ts         # Set of officially registered GSSoC 2026 repos
│   │   └── mockData.ts            # Mock data for development
│   ├── lib/
│   │   ├── pr-tracker.ts          # Core contributor scoring engine + GitHub API
│   │   ├── mentor-tracker.ts      # Mentor scoring engine + GitHub API
│   │   ├── project-admin-tracker.ts # Project admin tracking
│   │   ├── github-file.ts         # Read/write JSON to GitHub repo via Contents API
│   │   ├── gssoc.ts               # GSSoC leaderboard API client
│   │   ├── mailer.ts              # Email sending utilities
│   │   ├── labelColors.ts         # Label color mappings
│   │   ├── data.ts                # Data utilities
│   │   ├── ds.ts                  # Design system utilities
│   │   └── utils.ts               # General utilities (cn)
│   └── types/
│       ├── index.ts               # Shared TypeScript interfaces
│       ├── pr-tracker.ts          # PR tracker specific types
│       └── three.d.ts             # Type declarations for experimental Three.js modules
├── .env.local.example             # Template for environment variables
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

### Pages & Routing

| Route | Description |
|---|---|
| `/` | Home / landing page with role selector |
| `/pr-tracker/[username]` | Contributor PR dashboard (dynamic route) |
| `/mentor/[username]` | Mentor review dashboard |
| `/pr-check` | PR validator — paste a PR link, get instant validation |
| `/project-admin/[username]` | Project admin view |
| `/dashboard` | Personal dashboard |
| `/terms` | Terms of service |

### API Routes

| Endpoint | Method | Description |
|---|---|---|
| `/api/pr-tracker` | `GET` | Fetch contributor PR data by username |
| `/api/mentor-tracker` | `GET` | Fetch mentor review data by username |
| `/api/pr-check` | `GET` | Validate a single PR by URL |
| `/api/check-star` | `GET` | Check if a user has starred this repository |
| `/api/lookup` | `GET` | Look up a user's profile on the GSSoC leaderboard |
| `/api/subscribe` | `POST` | Subscribe to email alerts (writes to `data/subscribers.json` via GitHub API) |
| `/api/unsubscribe` | `GET` | One-click unsubscribe via token (renders confirmation HTML page) |
| `/api/sync` | `POST` | Manual sync for tracked user (protected by `SYNC_SECRET` header) |
| `/api/feedback` | `POST` | Submit NPS feedback (sends email to admin) |

### Component Architecture

The UI is broken into focused, semantic React components:

- **Landing page:** `LandingHero`, `LandingFeatures`, `LandingProtocol`, `LandingScoring`, `HomeNavbar`
- **PR Tracker:** `TrackerNavbar`, `GitHubProfileCard`, `StatsGrid`, `PRTable`, `ContributionHeatmap`, `AnalyticsCharts`, `ScoringGuide`
- **Mentor dashboard:** `MentorNavbar`, `MentorStats`, `MentorCharts`
- **PR Validator:** `ValidatorNavbar`, `ValidatorSpecs`, `ValidatorHistory`
- **Shared animations:** `ClickExplosion`, `ScrollSlideIn`
- **Shared utilities:** `LiveClock`, `QuickFeedbackPopup`, `HomeFooter`, `SubscribeModal`, `HomePointsGuide`, `StarNudge`

### Library Modules

| Module | Purpose |
|---|---|
| `pr-tracker.ts` | Core contributor engine — fetches PRs from GitHub Search API, calculates scores using the official formula, computes streaks, ranks |
| `mentor-tracker.ts` | Mentor engine — searches for `mentor:username` labelled PRs, applies mentor-specific scoring |
| `project-admin-tracker.ts` | Project admin tracking logic |
| `github-file.ts` | Reads and writes JSON files to the GitHub repository via the GitHub Contents API. Used by the subscribe/unsubscribe APIs since Vercel serverless functions cannot write to the filesystem |
| `gssoc.ts` | Client for the GSSoC leaderboard API (`gssoc.girlscript.org/api/leaderboard`) with pagination, retry logic, and rate limit handling |
| `mailer.ts` | Email sending utilities using Nodemailer with Gmail SMTP |
| `labelColors.ts` | Mapping of GSSoC label names to hex colors for consistent UI rendering |

### Data Layer

The application uses **no traditional database**. Instead:

1. **GitHub API as the primary data source** — All PR data is fetched live from the GitHub Search API on each page load, with `unstable_cache` providing short-lived server-side caching to reduce API calls.

2. **GitHub Repository as a JSON store** — Subscriber data (`data/subscribers.json`) is persisted by reading/writing to the repository itself via the GitHub Contents API. This is necessary because Vercel serverless functions have an ephemeral filesystem.

3. **Local JSON files for sync data** — The GitHub Actions sync script reads/writes `data/profile.json`, `data/history.json`, and `data/notifications.json` directly to the repository filesystem, then commits and pushes the changes.

---

## Getting Started

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **npm** (comes with Node.js)
- **Git**
- A **GitHub Personal Access Token** (classic, with `public_repo` scope) — this increases your API rate limit from 60 to 5,000 requests/hour

### Installation

```bash
git clone https://github.com/pratyush06-aec/gssoc_pr_tracker.git
cd gssoc_pr_tracker
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `GITHUB_TOKEN` | **Yes** | GitHub Personal Access Token (classic, `public_repo` scope). Increases API rate limit from 60 to 5,000 req/hr. Without this, the tracker will quickly hit rate limits. |
| `SMTP_USER` | For email | Gmail address used as the sender for alert emails |
| `SMTP_PASS` | For email | Gmail App Password (**not** your regular Gmail password). Generate one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). Must be stored **without spaces**. |
| `NOTIFY_EMAIL` | For email | Email address that receives admin notifications and feedback submissions. Can be the same as `SMTP_USER`. |
| `SYNC_SECRET` | For sync | A secret key to protect the `/api/sync` endpoint from unauthorized access. Use any random string. |
| `GH_REPO` | For subscriptions | The `owner/repo` string for the repository where `subscribers.json` lives (e.g. `pratyush06-aec/gssoc_pr_tracker`). |
| `APP_URL` | For email links | The full URL of your deployed app, used for unsubscribe links in emails (e.g. `https://gssoc-pr-tracker.vercel.app`). Use `http://localhost:3000` for local development. |

**Example `.env.local`:**

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

SMTP_USER=your@gmail.com
SMTP_PASS=abcdefghijklmnop
NOTIFY_EMAIL=your@gmail.com

SYNC_SECRET=my-random-secret-string

GH_REPO=pratyush06-aec/gssoc_pr_tracker
APP_URL=http://localhost:3000
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you are good to go.

> **Note:** Any time you modify `.env.local`, you must restart the dev server (`Ctrl+C`, then `npm run dev` again) for the changes to take effect.

---

## Setting Up Email Alerts

Email alerts require a Gmail account with an App Password (2-Step Verification must be enabled).

### Step 1: Create a Gmail App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. If you haven't already, enable **2-Step Verification** on your Google account
3. Under "App passwords", create a new app password (name it something like `GSSoC Tracker`)
4. Google will show you a 16-character password like `phvh qgfz bfoh cjwt`
5. **Remove all spaces** before using it: `phvhqgfzbfohcjwt`

### Step 2: Configure Environment Variables

Add these to your `.env.local`:

```env
SMTP_USER=your@gmail.com
SMTP_PASS=phvhqgfzbfohcjwt
NOTIFY_EMAIL=your@gmail.com
```

### Step 3: Test Email Delivery

Run the built-in test script to verify your SMTP setup:

```bash
npm run test:email
```

This sends a test email to the address specified in `NOTIFY_EMAIL`. If it arrives, your email pipeline is configured correctly.

---

## Deploying to Vercel

1. Push your repository to GitHub (if not already done)

2. Go to [vercel.com](https://vercel.com) and click **"Add New → Project"**

3. Import your GitHub repository (`pratyush06-aec/gssoc_pr_tracker`)

4. Vercel will auto-detect it as a Next.js project. **Leave all build settings as default.**

5. Before deploying, add your **Environment Variables** under **Settings → Environment Variables**:

   | Key | Value |
   |---|---|
   | `GITHUB_TOKEN` | Your GitHub PAT |
   | `SMTP_USER` | Your Gmail address |
   | `SMTP_PASS` | Your Gmail App Password (no spaces) |
   | `NOTIFY_EMAIL` | Your notification email |
   | `SYNC_SECRET` | Your sync secret |
   | `GH_REPO` | `pratyush06-aec/gssoc_pr_tracker` |
   | `APP_URL` | Your Vercel deployment URL (update this after first deploy) |

6. Click **Deploy**

7. After the first deployment, copy your Vercel URL and update the `APP_URL` environment variable in Vercel settings to match it. Trigger a redeployment.

> **Important:** The `APP_URL` is used to generate unsubscribe links in emails. If it is set to `localhost`, email recipients will get broken unsubscribe links.

---

## GitHub Actions (Automated Sync)

The project includes a GitHub Actions workflow (`.github/workflows/sync.yml`) that runs the sync script automatically.

### What the Sync Job Does

1. **Fetches the entire GSSoC leaderboard** from the official API with intelligent pagination
2. **Updates the tracked user's profile** (`data/profile.json`) and score history (`data/history.json`)
3. **Loops through all email subscribers** — compares their current score/rank against their last known values
4. **Sends email alerts** to subscribers whose scores have changed (or daily digests in `--daily` mode)
5. **Commits data changes** back to the repository automatically

The job runs on a cron schedule: **every 6 hours** (`0 */6 * * *`).

### Required Repository Secrets

Go to your GitHub repository → **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret Name | Value |
|---|---|
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASS` | Your Gmail App Password (no spaces) |
| `NOTIFY_EMAIL` | Your notification email |
| `APP_URL` | Your deployment URL (e.g. `https://gssoc-pr-tracker.vercel.app`) |

> **Note:** `GITHUB_TOKEN` does **not** need to be added as a secret — GitHub Actions automatically provides it. However, the auto-provided token only has repository scope. For writing to `subscribers.json` via the Vercel API routes, you need a PAT with `public_repo` scope set in your Vercel environment variables.

### Running the Sync Manually

1. Go to your GitHub repository → **Actions** tab
2. Click **"Sync GSSoC Data"** in the left sidebar
3. Click **"Run workflow"** → select `main` branch → click the green **"Run workflow"** button
4. Watch the logs in real-time by clicking on the running workflow

---

## Scoring System

### Contributor Scoring Formula

```
Score per PR = 50 (base) + (difficulty × quality multiplier) + type bonus
Maximum per PR = 175 points
```

**Difficulty labels:**

| Label | Points |
|---|---|
| `level:beginner` | 20 pts |
| `level:intermediate` | 35 pts |
| `level:advanced` | 55 pts |
| `level:critical` | 80 pts |

**Quality multipliers:**

| Label | Multiplier |
|---|---|
| `quality:clean` | ×1.2 |
| `quality:exceptional` | ×1.5 |

**Type bonuses:**

| Label | Bonus |
|---|---|
| `type:docs` | +5 pts |
| `type:bug` / `type:feature` / `type:testing` / `type:design` / `type:refactor` | +10 pts |
| `type:accessibility` / `type:performance` / `type:devops` | +15 pts |
| `type:security` | +20 pts |

**Invalidation:** PRs tagged `gssoc:invalid`, `gssoc:spam`, or `gssoc:ai-slop` score **0 points**. PRs must have the `gssoc:approved` label to count.

**Rank thresholds:**

| Points Range | Rank |
|---|---|
| 0 – 100 | Beginner Contributor |
| 101 – 300 | Active Contributor |
| 301 – 700 | Advanced Contributor |
| 701 – 1,200 | Elite Contributor |
| 1,201+ | GSSoC Legend |

### Mentor Scoring Formula

```
Score per reviewed PR = level base + quality bonus
```

| Label | Points |
|---|---|
| `level:beginner` | 10 pts |
| `level:intermediate` | 20 pts |
| `level:advanced` | 30 pts |
| `level:critical` | 50 pts |
| `quality:clean` | +5 pts |
| `quality:exceptional` | +10 pts |

---

## Developer Guidelines

If you are contributing to or extending this project, keep the following in mind:

1. **GSAP is core.** GSAP is heavily integrated into the layout. If a component behaves strangely on mount, check for conflicting CSS transitions or GSAP `.set()` initializations. Always clean up GSAP timelines in your `useEffect` return function to prevent memory leaks.

2. **WebGPU nuances.** The Galaxy Background relies on experimental Three.js APIs. Keep `src/types/three.d.ts` updated if you import further experimental add-ons, or the Next.js production build will fail type-checking.

3. **Z-index management.** The `StatsGrid` dynamically alters `z-index` (from 50 down to 1) during its hover expansion. Ensure surrounding absolute elements (like the `ClickExplosion` wrapper at `z-index: 9999`) do not interfere with pointer events.

4. **Overflow discipline.** The `ScrollSlideIn` component offsets elements by `400px` off-screen before animating them in. Parent containers must enforce `overflow-x-hidden` to prevent horizontal scrollbar flashes.

5. **Server vs. Client Components.** Pages under `src/app/` are React Server Components by default. Any component using `useEffect`, `useState`, GSAP, or browser APIs must include `"use client"` at the top.

6. **GitHub API rate limits.** Without a `GITHUB_TOKEN`, the app is limited to 60 requests/hour. With a token, this increases to 5,000/hour. The `unstable_cache` wrapper in `pr-tracker.ts` provides short-lived caching to minimize redundant API calls.

7. **Subscriber data persistence.** The `github-file.ts` module reads/writes `data/subscribers.json` via the GitHub Contents API (not the local filesystem). This is critical because Vercel serverless functions have ephemeral storage — any local file writes would be lost between invocations.

8. **Registered repos whitelist.** The list of valid GSSoC 2026 repositories lives in `src/data/gssoc-repos.ts`. PRs outside this set are excluded from scoring. Update this file if new repos are registered.

9. **Email template changes.** The email HTML templates are in `scripts/email-templates.ts`. These are pure functions returning HTML strings — no framework dependency. Test changes with `npm run test:email`.

---

## NPM Scripts Reference

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start the Next.js development server on `localhost:3000` |
| `build` | `npm run build` | Create a production build |
| `start` | `npm run start` | Start the production server |
| `lint` | `npm run lint` | Run ESLint across the project |
| `sync` | `npm run sync` | Run the sync script manually (regular mode) |
| `sync:daily` | `npm run sync:daily` | Run the sync script in daily digest mode |
| `test:email` | `npm run test:email` | Send a test email to verify SMTP setup |

---

## Troubleshooting

### "Failed to save subscription. Try again."
- **Cause:** The `GITHUB_TOKEN` environment variable is missing, misspelled, or the token lacks `public_repo` scope.
- **Fix:** Ensure your `.env.local` has `GITHUB_TOKEN=ghp_xxxxx` (not `GH_TOKEN`). Restart `npm run dev` after any `.env.local` change.

### GitHub API rate limit errors
- **Cause:** No `GITHUB_TOKEN` configured — unauthenticated requests are limited to 60/hour.
- **Fix:** Generate a GitHub PAT at [github.com/settings/tokens](https://github.com/settings/tokens) with `public_repo` scope, and add it to your `.env.local`.

### Emails not sending
- **Cause:** SMTP credentials are incorrect, or the App Password contains spaces.
- **Fix:** Ensure `SMTP_PASS` has no spaces. Verify with `npm run test:email`. Make sure 2-Step Verification is enabled on your Google account.

### Subscriber email not received after first sync
- **Cause:** This is expected behavior. The first sync records your baseline score — emails start from the second sync onward, only when a score/rank change is detected.
- **Fix:** Wait for your score to actually change, or manually trigger another sync after modifying your score on a PR.

### WebGPU galaxy not rendering
- **Cause:** The browser does not support WebGPU (e.g. Firefox, older Safari).
- **Fix:** This is graceful — the galaxy simply doesn't render and the rest of the UI works perfectly. Chrome and Edge have the best WebGPU support.

### Build fails with Three.js type errors
- **Cause:** Experimental Three.js modules are missing type declarations.
- **Fix:** Update `src/types/three.d.ts` with the missing module declarations.

---

## Credits

**Originally created by [Prodhosh V.S](https://github.com/PRODHOSH)** — GSSoC 2026 Ambassador + Contributor, VIT Chennai. Built as a personal utility, kept because it turned out useful for over 800 people.

**Visual overhaul, animation layer, and email alerts by [Pratyush](https://github.com/pratyush06-aec)** — GSAP animations, Three.js WebGPU galaxy, 3D stacked stats grid, zig-zag scroll entrances, contribution heatmap, modular component architecture, and full email notification pipeline.

---

<p align="center">
  <a href="https://gssoc-pr-tracker.vercel.app"><strong>🌐 Try it live</strong></a>&nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://github.com/pratyush06-aec/gssoc_pr_tracker/stargazers">⭐ Star on GitHub</a>
</p>
