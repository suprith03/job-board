"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createJobRepository,
  SEED_JOBS,
  type JobRepository,
} from "@/lib/jobs";
import type {
  CreateJobInput,
  Job,
  JobFilters,
  UpdateJobInput,
} from "@/types/job";

interface JobsContextValue {
  jobs: Job[];
  loading: boolean;
  getJobById: (id: string) => Job | undefined;
  createJob: (input: CreateJobInput) => Promise<Job>;
  updateJob: (id: string, input: UpdateJobInput) => Promise<Job | null>;
  deleteJob: (id: string) => Promise<boolean>;
  searchJobs: (filters: JobFilters) => Job[];
  refreshJobs: () => Promise<void>;
}

const JobsContext = createContext<JobsContextValue | null>(null);

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(SEED_JOBS);
  const [loading, setLoading] = useState(true);
  const repository = useMemo<JobRepository>(() => createJobRepository(), []);

  const refreshJobs = useCallback(async () => {
    const all = await repository.getAll();
    setJobs(all);
  }, [repository]);

  useEffect(() => {
    refreshJobs().finally(() => setLoading(false));
  }, [refreshJobs]);

  const getJobById = useCallback(
    (id: string) => jobs.find((j) => j.id === id),
    [jobs]
  );

  const createJob = useCallback(
    async (input: CreateJobInput) => {
      const job = await repository.create(input);
      await refreshJobs();
      return job;
    },
    [repository, refreshJobs]
  );

  const updateJob = useCallback(
    async (id: string, input: UpdateJobInput) => {
      const updated = await repository.update(id, input);
      await refreshJobs();
      return updated;
    },
    [repository, refreshJobs]
  );

  const deleteJob = useCallback(
    async (id: string) => {
      const deleted = await repository.delete(id);
      if (deleted) await refreshJobs();
      return deleted;
    },
    [repository, refreshJobs]
  );

  const searchJobs = useCallback(
    (filters: JobFilters) => {
      return jobs.filter((job) => {
        if (filters.title) {
          const query = filters.title.toLowerCase();
          const matchesTitle = job.title.toLowerCase().includes(query);
          const matchesCompany = job.company.toLowerCase().includes(query);
          if (!matchesTitle && !matchesCompany) return false;
        }
        if (filters.location) {
          if (
            !job.location.toLowerCase().includes(filters.location.toLowerCase())
          )
            return false;
        }
        if (filters.jobType && job.jobType !== filters.jobType) return false;
        if (filters.category && job.category !== filters.category) return false;
        return true;
      });
    },
    [jobs]
  );

  const value = useMemo(
    () => ({
      jobs,
      loading,
      getJobById,
      createJob,
      updateJob,
      deleteJob,
      searchJobs,
      refreshJobs,
    }),
    [
      jobs,
      loading,
      getJobById,
      createJob,
      updateJob,
      deleteJob,
      searchJobs,
      refreshJobs,
    ]
  );

  return (
    <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
  );
}

export function useJobs(): JobsContextValue {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
}
