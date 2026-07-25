export type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "remote"
  | "internship";

export type JobCategory =
  | "engineering"
  | "design"
  | "marketing"
  | "sales"
  | "product"
  | "operations"
  | "finance"
  | "hr";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: JobType;
  category: JobCategory;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  featured: boolean;
  postedAt: string;
  employerEmail: string;
}

export interface CreateJobInput {
  title: string;
  company: string;
  location: string;
  jobType: JobType;
  category: JobCategory;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  featured?: boolean;
  employerEmail: string;
}

export type UpdateJobInput = Partial<CreateJobInput>;

export interface JobFilters {
  title?: string;
  location?: string;
  jobType?: JobType | "";
  category?: JobCategory | "";
}

export interface JobApplication {
  jobId: string;
  fullName: string;
  email: string;
  resumeUrl: string;
  coverLetter: string;
}

export const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "remote", label: "Remote" },
  { value: "internship", label: "Internship" },
];

export const JOB_CATEGORIES: { value: JobCategory; label: string }[] = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "product", label: "Product" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "Human Resources" },
];
