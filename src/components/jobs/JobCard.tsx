import Link from "next/link";
import { MapPin, Building2, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoryLabel, getJobTypeLabel } from "@/lib/jobs";
import { formatDate, formatSalary } from "@/lib/utils";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export function JobCard({ job, featured = false }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card
        className={`group h-full transition-all hover:shadow-md hover:border-primary/30 ${
          featured ? "border-primary/20 bg-primary/[0.02]" : ""
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-1">
                {job.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {job.company}
              </CardDescription>
            </div>
            {featured && (
              <Badge variant="success" className="shrink-0">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{getJobTypeLabel(job.jobType)}</Badge>
            <Badge variant="secondary">{getCategoryLabel(job.category)}</Badge>
          </div>
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 shrink-0" />
              <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>Posted {formatDate(job.postedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
