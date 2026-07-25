"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useJobs } from "@/context/JobsContext";
import { JobForm } from "@/components/jobs/JobForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CreateJobInput } from "@/types/job";
import { useState } from "react";

export default function PostJobPage() {
  const { createJob } = useJobs();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: CreateJobInput) => {
    const job = await createJob(data);
    setSuccess(true);
    setTimeout(() => router.push(`/jobs/${job.id}`), 2000);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
        <h1 className="text-2xl font-bold">Job Posted Successfully!</h1>
        <p className="text-muted-foreground mt-2">
          Redirecting to your job listing...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Post a Job</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to publish a new job listing on JobBoard.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            All fields marked with * are required. Your listing will appear
            immediately after submission.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobForm onSubmit={handleSubmit} submitLabel="Publish Job Listing" />
        </CardContent>
      </Card>
    </div>
  );
}
