"use client";

import { useMemo, useState } from "react";
import { Sparkles, SearchX } from "lucide-react";
import { useJobs } from "@/context/JobsContext";
import { JobCard } from "@/components/jobs/JobCard";
import { JobSearchBar } from "@/components/jobs/JobSearchBar";
import { CategoryFilter } from "@/components/jobs/CategoryFilter";
import { getFeaturedJobs } from "@/lib/jobs";
import type { JobCategory, JobFilters } from "@/types/job";

export default function HomePage() {
  const { jobs, loading, searchJobs } = useJobs();
  const [filters, setFilters] = useState<JobFilters>({
    title: "",
    location: "",
    jobType: "",
    category: "",
  });

  const featuredJobs = useMemo(() => getFeaturedJobs(jobs), [jobs]);
  const filteredJobs = useMemo(() => searchJobs(filters), [searchJobs, filters]);

  const hasActiveFilters =
    filters.title || filters.location || filters.jobType || filters.category;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Find Your Next{" "}
            <span className="text-primary">Dream Job</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Browse thousands of opportunities from top companies. Search by title,
            location, job type, or category.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container mx-auto px-4 py-8 space-y-6">
        <JobSearchBar filters={filters} onFiltersChange={setFilters} />
        <CategoryFilter
          selected={(filters.category as JobCategory) ?? ""}
          onSelect={(category) =>
            setFilters({ ...filters, category: category })
          }
        />
      </section>

      {/* Featured Jobs */}
      {!hasActiveFilters && featuredJobs.length > 0 && (
        <section className="container mx-auto px-4 pb-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Featured Jobs</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured />
            ))}
          </div>
        </section>
      )}

      {/* All / Filtered Jobs */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">
          {hasActiveFilters
            ? `Search Results (${filteredJobs.length})`
            : "All Jobs"}
        </h2>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl border bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No jobs found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search filters or browse all categories.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured={job.featured} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
