"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useJobs } from "@/context/JobsContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApplyModal } from "@/components/jobs/ApplyModal";
import { getCategoryLabel, getJobTypeLabel } from "@/lib/jobs";
import { formatDate, formatSalary } from "@/lib/utils";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const { getJobById, loading } = useJobs();
  const [applyOpen, setApplyOpen] = useState(false);

  const job = getJobById(params.id);

  if (!loading && !job) {
    notFound();
  }

  if (loading || !job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-12 w-full bg-muted rounded" />
          <div className="h-64 w-full bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{getJobTypeLabel(job.jobType)}</Badge>
                <Badge variant="secondary">
                  {getCategoryLabel(job.category)}
                </Badge>
                {job.featured && <Badge variant="success">Featured</Badge>}
              </div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {job.company}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Posted {formatDate(job.postedAt)}
                </span>
              </div>
            </div>
            <Button size="lg" onClick={() => setApplyOpen(true)} className="shrink-0">
              Apply Now
            </Button>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">About the Role</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Key Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border bg-muted/30 p-6">
              <h2 className="text-xl font-semibold mb-2">Salary Range</h2>
              <p className="text-2xl font-bold text-primary">
                {formatSalary(job.salaryMin, job.salaryMax)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Estimated annual compensation (USD)
              </p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t">
            <Button size="lg" onClick={() => setApplyOpen(true)} className="w-full sm:w-auto">
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      <ApplyModal job={job} open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  );
}
