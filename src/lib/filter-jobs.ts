import type { Job, JobFilters } from "@/types/job";

export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  const titleQuery = (filters.title ?? filters.query ?? "").trim().toLowerCase();
  const locationQuery = (filters.location ?? "").trim().toLowerCase();

  return jobs.filter((job) => {
    if (titleQuery) {
      const searchable = [
        job.title,
        job.company,
        job.location,
        ...job.skills,
        job.description,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(titleQuery)) return false;
    }

    if (locationQuery) {
      const locationMatch = job.location.toLowerCase().includes(locationQuery);
      if (!locationMatch) return false;
    }

    if (filters.locationType && job.locationType !== filters.locationType) {
      return false;
    }

    if (filters.jobType && job.jobType !== filters.jobType) {
      return false;
    }

    if (
      filters.experienceLevel &&
      job.experienceLevel !== filters.experienceLevel
    ) {
      return false;
    }

    if (filters.category && job.category !== filters.category) {
      return false;
    }

    return true;
  });
}

export function getFeaturedJobs(jobs: Job[]): Job[] {
  return jobs.filter((job) => job.featured);
}

export function sortJobsByDate(jobs: Job[]): Job[] {
  return [...jobs].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
}
