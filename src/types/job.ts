export type JobType = "full-time" | "part-time" | "contract";

export type LocationType = "remote" | "hybrid" | "onsite";

export type ExperienceLevel = "senior" | "mid" | "entry";

export type JobCategory =
  | "engineering"
  | "design"
  | "marketing"
  | "sales"
  | "product"
  | "operations"
  | "finance"
  | "data";

export interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl?: string;
  location: string;
  locationType: LocationType;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  category: JobCategory;
  salaryMin: number;
  salaryMax: number;
  description: string;
  companyOverview: string;
  responsibilities: string[];
  requirements?: string[];
  skills: string[];
  applicationUrl?: string;
  applicationEmail?: string;
  employerEmail?: string;
  featured: boolean;
  postedAt: string;
}

export interface CreateJobInput {
  title: string;
  company: string;
  logoUrl?: string;
  location: string;
  locationType: LocationType;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  category: JobCategory;
  salaryMin: number;
  salaryMax: number;
  description: string;
  companyOverview: string;
  responsibilities: string[];
  requirements?: string[];
  skills: string[];
  applicationUrl?: string;
  applicationEmail?: string;
  employerEmail?: string;
  featured?: boolean;
}

export type UpdateJobInput = Partial<CreateJobInput>;

export interface JobFilters {
  title?: string;
  location?: string;
  query?: string;
  locationType?: LocationType | "";
  jobType?: JobType | "";
  experienceLevel?: ExperienceLevel | "";
  category?: JobCategory | "";
}

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
}

export const JOB_TYPES: FilterOption<JobType>[] = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
];

export const LOCATION_TYPES: FilterOption<LocationType>[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "Onsite" },
];

export const EXPERIENCE_LEVELS: FilterOption<ExperienceLevel>[] = [
  { value: "senior", label: "Senior" },
  { value: "mid", label: "Mid" },
  { value: "entry", label: "Entry" },
];

export const JOB_CATEGORIES: FilterOption<JobCategory>[] = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "data", label: "Data" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
];
