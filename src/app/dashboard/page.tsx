"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, PlusCircle, Briefcase } from "lucide-react";
import { useJobs } from "@/context/JobsContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { JobForm } from "@/components/jobs/JobForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoryLabel, getJobTypeLabel } from "@/lib/jobs";
import { formatDate, formatSalary } from "@/lib/utils";
import type { CreateJobInput, Job } from "@/types/job";

export default function DashboardPage() {
  const { jobs, loading, updateJob, deleteJob } = useJobs();
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleUpdate = async (data: CreateJobInput) => {
    if (!editJob) return;
    await updateJob(editJob.id, data);
    setEditJob(null);
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      await deleteJob(deleteConfirm.id);
      setDeleteConfirm(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your job listings — view, edit, or remove postings.
          </p>
        </div>
        <Link href="/post-job">
          <Button>
            <PlusCircle className="h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl border bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent className="flex flex-col items-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold">No job listings yet</h2>
            <p className="text-muted-foreground mt-1 mb-4">
              Post your first job to start receiving applications.
            </p>
            <Link href="/post-job">
              <Button>
                <PlusCircle className="h-4 w-4" />
                Post a Job
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      {job.featured && (
                        <Badge variant="success">Featured</Badge>
                      )}
                    </div>
                    <CardDescription>
                      {job.company} · {job.location}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditJob(job)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteConfirm(job)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <Badge variant="outline">{getJobTypeLabel(job.jobType)}</Badge>
                  <Badge variant="secondary">
                    {getCategoryLabel(job.category)}
                  </Badge>
                  <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
                  <span>Posted {formatDate(job.postedAt)}</span>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-primary hover:underline"
                  >
                    View listing →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        open={!!editJob}
        onClose={() => setEditJob(null)}
        title="Edit Job Listing"
        description="Update the details for this job posting."
        className="max-w-2xl"
      >
        {editJob && (
          <JobForm
            initialData={editJob}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Job Listing"
        description={
          deleteConfirm
            ? `Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`
            : undefined
        }
      >
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setDeleteConfirm(null)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1"
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
