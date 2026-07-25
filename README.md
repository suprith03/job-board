# JobBoard — Production-Ready Job Board Web Application

A full-featured job board built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**. Browse featured listings, search and filter jobs, apply via modal forms, post new jobs, and manage listings from an employer dashboard — all with a mock data layer ready for database integration.

---

## Table of Contents

- [Project Architecture & Tech Stack](#project-architecture--tech-stack)
- [Getting Started](#getting-started)
- [CI/CD & Vercel Setup Guide](#cicd--vercel-setup-guide)
- [API / Data Architecture](#api--data-architecture)
- [Future Roadmap](#future-roadmap)

---

## Project Architecture & Tech Stack

### Framework & Language

| Technology | Purpose |
|---|---|
| **Next.js 14** | App Router, file-based routing, SSR/SSG |
| **TypeScript** | Strict type safety across the entire codebase |
| **React 18** | UI rendering with Client/Server Components |

### UI & Styling

| Technology | Purpose |
|---|---|
| **Tailwind CSS** | Utility-first styling with custom design tokens |
| **Lucide React** | Consistent iconography |
| **class-variance-authority** | Variant-based component styling (Shadcn pattern) |
| **clsx + tailwind-merge** | Conditional class merging via `cn()` utility |

### Application Structure

```
job-board/
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── page.tsx               # Landing page (search, filters, featured jobs)
│   │   ├── jobs/[id]/page.tsx     # Job detail + Apply modal
│   │   ├── post-job/page.tsx      # Employer job posting form
│   │   ├── dashboard/page.tsx     # CRUD employer dashboard
│   │   ├── layout.tsx             # Root layout with providers
│   │   └── globals.css            # Design tokens & base styles
│   ├── components/
│   │   ├── ui/                    # Reusable Shadcn-style primitives
│   │   ├── jobs/                  # Job-specific components
│   │   └── layout/                # Header, Footer
│   ├── context/
│   │   └── JobsContext.tsx        # React Context for global job state
│   ├── lib/
│   │   ├── jobs.ts                # Mock data service + repository pattern
│   │   └── utils.ts               # Helpers (cn, formatSalary, formatDate)
│   └── types/
│       └── job.ts                 # TypeScript interfaces & constants
├── vercel.json                    # Vercel deployment configuration
└── README.md
```

### Key Components

| Component | Description |
|---|---|
| `JobCard` | Displays job summary with badges, salary, location |
| `JobSearchBar` | Filters by title/company, location, job type |
| `CategoryFilter` | Pill-style category selector |
| `ApplyModal` | Application form with success confirmation |
| `JobForm` | Dynamic form for creating/editing job listings |
| `JobsProvider` | Context provider wrapping CRUD operations |

---

## Getting Started

### Prerequisites

- **Node.js** v20 or later
- **npm** v9 or later

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/job-board.git
cd job-board

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build (type-check + compile) |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

---

## CI/CD & Vercel Setup Guide

### Pipeline Overview

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every **push** and **pull request** to `main`:

1. **Lint & Build** — Installs dependencies, runs ESLint, builds the Next.js project
2. **Deploy** — On push to `main` only, deploys to Vercel production using the official CLI

### Step 1: Create a Vercel Project

```bash
# Install Vercel CLI globally
npm install -g vercel

# Link your local project to Vercel
cd job-board
vercel link
```

Follow the prompts to create or link a project. This generates a `.vercel/project.json` file containing your IDs.

### Step 2: Obtain Required Credentials

| Secret | How to Obtain |
|---|---|
| `VERCEL_TOKEN` | [Vercel Dashboard](https://vercel.com/account/tokens) → Settings → Tokens → Create |
| `VERCEL_ORG_ID` | Found in `.vercel/project.json` after running `vercel link` |
| `VERCEL_PROJECT_ID` | Found in `.vercel/project.json` after running `vercel link` |

### Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret** and add each of:

```
VERCEL_TOKEN       = <your-vercel-token>
VERCEL_ORG_ID      = <orgId from .vercel/project.json>
VERCEL_PROJECT_ID  = <projectId from .vercel/project.json>
```

### Step 4: Push to Main

Once secrets are configured, any push to `main` will automatically lint, build, and deploy to Vercel production.

### Alternative: Vercel Git Integration

You can also connect your GitHub repo directly in the [Vercel Dashboard](https://vercel.com/new) for automatic deployments without GitHub Actions. The CI pipeline still provides lint/build validation on pull requests.

---

## API / Data Architecture

### Job Model Schema

```typescript
interface Job {
  id: string;              // Unique identifier (auto-generated)
  title: string;             // Job title
  company: string;         // Company name
  location: string;        // City, state, or "Remote"
  jobType: JobType;        // full-time | part-time | contract | remote | internship
  category: JobCategory;   // engineering | design | marketing | sales | ...
  salaryMin: number;       // Minimum salary (USD)
  salaryMax: number;       // Maximum salary (USD)
  description: string;     // Full job description
  requirements: string[];  // Array of key requirements
  featured: boolean;       // Show on homepage featured section
  postedAt: string;        // ISO 8601 timestamp
  employerEmail: string;   // Contact email for applications
}
```

### Data Management Layer

The application uses a **Repository Pattern** in `src/lib/jobs.ts`:

```
JobRepository (interface)
    └── LocalJobRepository (current implementation)
        ├── localStorage persistence (browser)
        └── SEED_JOBS (8 sample listings)
```

**CRUD Operations:**

| Method | Description |
|---|---|
| `getAll()` | Returns all jobs sorted by date |
| `getById(id)` | Fetch a single job by ID |
| `create(input)` | Create a new job listing |
| `update(id, input)` | Partial update of existing job |
| `delete(id)` | Remove a job listing |
| `search(filters)` | Filter by title, location, type, category |

**React Context (`JobsContext`):**

The `JobsProvider` wraps the app and exposes a `useJobs()` hook with reactive state. All pages consume this hook for seamless CRUD without prop drilling.

### Future Database Integration

Replace `LocalJobRepository` with a database-backed implementation:

```typescript
// Example: Prisma integration
class PrismaJobRepository implements JobRepository {
  constructor(private prisma: PrismaClient) {}
  async getAll() { return this.prisma.job.findMany({ orderBy: { postedAt: 'desc' } }); }
  // ... implement remaining methods
}
```

The `JobRepository` interface ensures zero changes to UI components when swapping data sources.

---

## Future Roadmap

### Phase 1 — Authentication & Multi-Tenancy
- Integrate **NextAuth.js** for employer and job-seeker accounts
- Role-based access control (employers can only edit their own listings)
- OAuth providers (Google, GitHub, LinkedIn)

### Phase 2 — Database Persistence
- Add **Prisma ORM** with **PostgreSQL** (via Supabase or Neon)
- Migrate `LocalJobRepository` to `PrismaJobRepository`
- Server Actions for mutations instead of client-side CRUD

### Phase 3 — Payments & Monetization
- **Stripe** integration for featured job post upgrades
- Tiered pricing (basic free, premium featured, enterprise bulk)
- Application tracking dashboard for employers

### Phase 4 — Enhanced Features
- Email notifications (Resend/SendGrid) for new applications
- Advanced search with full-text indexing (Algolia or PostgreSQL FTS)
- Job analytics (views, applications, conversion rates)
- Resume upload to cloud storage (S3/Cloudflare R2)
- Admin panel for moderation and analytics

### Phase 5 — Infrastructure
- Rate limiting and API route protection
- Redis caching for popular job listings
- CDN optimization for global performance
- Monitoring with Sentry and Vercel Analytics

---

## License

MIT
