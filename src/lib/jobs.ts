import {
  type CreateJobInput,
  type Job,
  type JobFilters,
  type UpdateJobInput,
} from "@/types/job";
import { MOCK_JOBS } from "@/data/jobs";
import { filterJobs, sortJobsByDate } from "@/lib/filter-jobs";
import { generateId } from "@/lib/utils";

export interface JobRepository {
  getAll(): Promise<Job[]>;
  getById(id: string): Promise<Job | null>;
  create(input: CreateJobInput): Promise<Job>;
  update(id: string, input: UpdateJobInput): Promise<Job | null>;
  delete(id: string): Promise<boolean>;
  search(filters: JobFilters): Promise<Job[]>;
}

const STORAGE_KEY = "jobpulse-jobs";

function loadFromStorage(): Job[] {
  if (typeof window === "undefined") return MOCK_JOBS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Job[];
  } catch {
    /* fall through */
  }
  return MOCK_JOBS;
}

function saveToStorage(jobs: Job[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export class LocalJobRepository implements JobRepository {
  private jobs: Job[];

  constructor(initialJobs?: Job[]) {
    this.jobs = initialJobs ?? loadFromStorage();
  }

  async getAll(): Promise<Job[]> {
    return sortJobsByDate(this.jobs);
  }

  async getById(id: string): Promise<Job | null> {
    return this.jobs.find((job) => job.id === id) ?? null;
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
    const index = this.jobs.findIndex((job) => job.id === id);
    if (index === -1) return null;
    this.jobs[index] = { ...this.jobs[index], ...input };
    saveToStorage(this.jobs);
    return this.jobs[index];
  }

  async delete(id: string): Promise<boolean> {
    const prevLength = this.jobs.length;
    this.jobs = this.jobs.filter((job) => job.id !== id);
    if (this.jobs.length < prevLength) {
      saveToStorage(this.jobs);
      return true;
    }
    return false;
  }

  async search(filters: JobFilters): Promise<Job[]> {
    const all = await this.getAll();
    return filterJobs(all, filters);
  }
}

export function createJobRepository(): JobRepository {
  return new LocalJobRepository();
}

export { MOCK_JOBS as SEED_JOBS } from "@/data/jobs";
export { filterJobs, getFeaturedJobs, sortJobsByDate } from "@/lib/filter-jobs";

export function getJobTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
  };
  return labels[type] ?? type;
}

export function getLocationTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    remote: "Remote",
    hybrid: "Hybrid",
    onsite: "Onsite",
  };
  return labels[type] ?? type;
}

export function getExperienceLabel(level: string): string {
  const labels: Record<string, string> = {
    senior: "Senior",
    mid: "Mid-level",
    entry: "Entry-level",
  };
  return labels[level] ?? level;
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
    data: "Data",
  };
  return labels[category] ?? category;
}
