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
      <section className="border-b border-white/10 bg-gradient-to-b from-orange-500/10 via-slate-950 to-slate-950">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-200">
              <Sparkles className="h-4 w-4" />
              Jobs across India, from startups to unicorns
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl text-balance">
              Find the right role in
              <span className="gradient-text"> India&apos;s best companies</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300 text-balance">
              Browse curated openings in Bengaluru, Hyderabad, Pune, Delhi NCR,
              Mumbai, and remote-first teams across the country.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">2.5L+</div>
                <div className="text-sm text-slate-300">job seekers hired</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-300">cities covered</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">₹4L+</div>
                <div className="text-sm text-slate-300">average monthly pay</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 space-y-6">
        <JobSearchBar
          value={filters.title ?? ""}
          onChange={(value) => setFilters({ ...filters, title: value })}
        />
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
