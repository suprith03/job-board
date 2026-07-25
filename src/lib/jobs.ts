import {
  type CreateJobInput,
  type Job,
  type JobFilters,
  type UpdateJobInput,
} from "@/types/job";
import { generateId } from "@/lib/utils";

/**
 * Repository interface — swap this implementation for Prisma or Supabase
 * when connecting to a real database.
 */
export interface JobRepository {
  getAll(): Promise<Job[]>;
  getById(id: string): Promise<Job | null>;
  create(input: CreateJobInput): Promise<Job>;
  update(id: string, input: UpdateJobInput): Promise<Job | null>;
  delete(id: string): Promise<boolean>;
  search(filters: JobFilters): Promise<Job[]>;
}

const STORAGE_KEY = "job-board-jobs";

export const SEED_JOBS: Job[] = [
  {
    id: "job_001",
    title: "Senior Full-Stack Engineer",
    company: "TechNova Inc.",
    location: "San Francisco, CA",
    jobType: "full-time",
    category: "engineering",
    salaryMin: 140000,
    salaryMax: 185000,
    description:
      "Join TechNova's platform team to build scalable web applications used by millions. You'll architect microservices, mentor junior engineers, and drive technical decisions across the stack.",
    requirements: [
      "5+ years of experience with React and Node.js",
      "Strong TypeScript and system design skills",
      "Experience with cloud infrastructure (AWS/GCP)",
      "Excellent communication and mentoring abilities",
    ],
    featured: true,
    postedAt: "2026-07-10T10:00:00.000Z",
    employerEmail: "careers@technova.com",
  },
  {
    id: "job_002",
    title: "Product Designer",
    company: "PixelCraft Studio",
    location: "New York, NY",
    jobType: "full-time",
    category: "design",
    salaryMin: 95000,
    salaryMax: 130000,
    description:
      "Shape the future of digital products at PixelCraft. You'll own end-to-end design workflows from research to high-fidelity prototypes for B2B SaaS products.",
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma and design systems",
      "Portfolio demonstrating UX research skills",
      "Experience collaborating with engineering teams",
    ],
    featured: true,
    postedAt: "2026-07-12T14:30:00.000Z",
    employerEmail: "jobs@pixelcraft.io",
  },
  {
    id: "job_003",
    title: "DevOps Engineer",
    company: "CloudScale Systems",
    location: "Remote",
    jobType: "remote",
    category: "engineering",
    salaryMin: 120000,
    salaryMax: 160000,
    description:
      "Build and maintain CI/CD pipelines, Kubernetes clusters, and observability stacks. Help us achieve 99.99% uptime for mission-critical infrastructure.",
    requirements: [
      "Experience with Kubernetes and Docker",
      "Proficiency in Terraform and GitHub Actions",
      "Strong Linux and networking fundamentals",
      "On-call rotation experience preferred",
    ],
    featured: true,
    postedAt: "2026-07-15T09:00:00.000Z",
    employerEmail: "talent@cloudscale.dev",
  },
  {
    id: "job_004",
    title: "Marketing Manager",
    company: "GrowthLoop",
    location: "Austin, TX",
    jobType: "full-time",
    category: "marketing",
    salaryMin: 80000,
    salaryMax: 110000,
    description:
      "Lead multi-channel marketing campaigns that drive user acquisition and brand awareness. You'll manage a team of 4 and own the marketing budget.",
    requirements: [
      "4+ years in B2B SaaS marketing",
      "Experience with SEO, paid ads, and content strategy",
      "Strong analytics and A/B testing skills",
      "Team leadership experience",
    ],
    featured: false,
    postedAt: "2026-07-18T11:00:00.000Z",
    employerEmail: "hr@growthloop.com",
  },
  {
    id: "job_005",
    title: "Sales Development Representative",
    company: "RevenueForge",
    location: "Chicago, IL",
    jobType: "full-time",
    category: "sales",
    salaryMin: 55000,
    salaryMax: 75000,
    description:
      "Generate qualified pipeline for our enterprise sales team. You'll prospect, qualify leads, and book demos with decision-makers at Fortune 500 companies.",
    requirements: [
      "1+ years in SDR or inside sales role",
      "Excellent phone and email communication",
      "CRM experience (Salesforce preferred)",
      "Self-motivated with a competitive mindset",
    ],
    featured: false,
    postedAt: "2026-07-20T08:00:00.000Z",
    employerEmail: "sales@revenueforge.com",
  },
  {
    id: "job_006",
    title: "Product Manager",
    company: "LaunchPad AI",
    location: "Seattle, WA",
    jobType: "full-time",
    category: "product",
    salaryMin: 130000,
    salaryMax: 170000,
    description:
      "Own the roadmap for our AI-powered analytics platform. Work cross-functionally with engineering, design, and data science to ship features that delight users.",
    requirements: [
      "3+ years of product management experience",
      "Technical background or CS degree preferred",
      "Experience with AI/ML products is a plus",
      "Strong data-driven decision making",
    ],
    featured: true,
    postedAt: "2026-07-22T16:00:00.000Z",
    employerEmail: "pm@launchpad.ai",
  },
  {
    id: "job_007",
    title: "Frontend Intern",
    company: "StartupHub",
    location: "Boston, MA",
    jobType: "internship",
    category: "engineering",
    salaryMin: 25,
    salaryMax: 35,
    description:
      "Summer internship building React components for our job marketplace. Great opportunity to learn from senior engineers in a fast-paced startup environment.",
    requirements: [
      "Currently pursuing CS or related degree",
      "Basic React and JavaScript knowledge",
      "Eagerness to learn and take feedback",
      "Available for 12-week internship",
    ],
    featured: false,
    postedAt: "2026-07-23T10:00:00.000Z",
    employerEmail: "interns@startuphub.co",
  },
  {
    id: "job_008",
    title: "Financial Analyst",
    company: "FinEdge Capital",
    location: "Denver, CO",
    jobType: "full-time",
    category: "finance",
    salaryMin: 70000,
    salaryMax: 95000,
    description:
      "Support financial planning and analysis for a growing fintech company. Build models, prepare board reports, and partner with department heads on budgeting.",
    requirements: [
      "2+ years in FP&A or corporate finance",
      "Advanced Excel and financial modeling",
      "CPA or CFA progress preferred",
      "Strong attention to detail",
    ],
    featured: false,
    postedAt: "2026-07-24T09:30:00.000Z",
    employerEmail: "finance@finedge.com",
  },
];

function loadFromStorage(): Job[] {
  if (typeof window === "undefined") return SEED_JOBS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Job[];
  } catch {
    /* fall through to seed */
  }
  return SEED_JOBS;
}

function saveToStorage(jobs: Job[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

function applyFilters(jobs: Job[], filters: JobFilters): Job[] {
  return jobs.filter((job) => {
    if (filters.title) {
      const query = filters.title.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(query);
      const matchesCompany = job.company.toLowerCase().includes(query);
      if (!matchesTitle && !matchesCompany) return false;
    }
    if (filters.location) {
      if (!job.location.toLowerCase().includes(filters.location.toLowerCase()))
        return false;
    }
    if (filters.jobType && job.jobType !== filters.jobType) return false;
    if (filters.category && job.category !== filters.category) return false;
    return true;
  });
}

/**
 * In-memory + localStorage repository.
 * Replace with PrismaJobRepository or SupabaseJobRepository for production.
 */
export class LocalJobRepository implements JobRepository {
  private jobs: Job[];

  constructor(initialJobs?: Job[]) {
    this.jobs = initialJobs ?? loadFromStorage();
  }

  async getAll(): Promise<Job[]> {
    return [...this.jobs].sort(
      (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );
  }

  async getById(id: string): Promise<Job | null> {
    return this.jobs.find((j) => j.id === id) ?? null;
  }

  async create(input: CreateJobInput): Promise<Job> {
    const job: Job = {
      ...input,
      id: generateId(),
      featured: input.featured ?? false,
      postedAt: new Date().toISOString(),
    };
    this.jobs = [job, ...this.jobs];
    saveToStorage(this.jobs);
    return job;
  }

  async update(id: string, input: UpdateJobInput): Promise<Job | null> {
    const index = this.jobs.findIndex((j) => j.id === id);
    if (index === -1) return null;
    this.jobs[index] = { ...this.jobs[index], ...input };
    saveToStorage(this.jobs);
    return this.jobs[index];
  }

  async delete(id: string): Promise<boolean> {
    const prevLength = this.jobs.length;
    this.jobs = this.jobs.filter((j) => j.id !== id);
    if (this.jobs.length < prevLength) {
      saveToStorage(this.jobs);
      return true;
    }
    return false;
  }

  async search(filters: JobFilters): Promise<Job[]> {
    const all = await this.getAll();
    return applyFilters(all, filters);
  }

  resetToSeed(): void {
    this.jobs = [...SEED_JOBS];
    saveToStorage(this.jobs);
  }
}

export function createJobRepository(): JobRepository {
  return new LocalJobRepository();
}

export function getFeaturedJobs(jobs: Job[]): Job[] {
  return jobs.filter((j) => j.featured);
}

export function getJobTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "full-time": "Full Time",
    "part-time": "Part Time",
    contract: "Contract",
    remote: "Remote",
    internship: "Internship",
  };
  return labels[type] ?? type;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    engineering: "Engineering",
    design: "Design",
    marketing: "Marketing",
    sales: "Sales",
    product: "Product",
    operations: "Operations",
    finance: "Finance",
    hr: "Human Resources",
  };
  return labels[category] ?? category;
}
