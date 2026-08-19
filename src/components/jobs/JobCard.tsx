import Link from "next/link";
import { MapPin, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CompanyAvatar } from "@/components/jobs/CompanyAvatar";
import {
  getExperienceLabel,
  getJobTypeLabel,
  getLocationTypeLabel,
} from "@/lib/jobs";
import { formatDaysAgo, formatSalary } from "@/lib/utils";
import type { Job } from "@/types/job";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  featured?: boolean;
  preview?: boolean;
  className?: string;
}

export function JobCard({
  job,
  featured = false,
  preview = false,
  className,
}: JobCardProps) {
  const content = (
    <Card
      className={cn(
        "group h-full border-white/10 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5",
        featured && "border-primary/20 bg-primary/[0.03]",
        preview && "pointer-events-none",
        className
      )}
    >
      <CardContent className="p-5">
        <div className="flex gap-4">
          <CompanyAvatar
            company={job.company}
            logoUrl={job.logoUrl}
            size="md"
          />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 space-y-1">
                <h3 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
              {featured && (
                <Badge variant="success" className="shrink-0">
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{getJobTypeLabel(job.jobType)}</Badge>
              <Badge variant="accent">
                {getLocationTypeLabel(job.locationType)}
              </Badge>
              <Badge variant="secondary">
                {getExperienceLabel(job.experienceLevel)}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 shrink-0" />
                {formatSalary(job.salaryMin, job.salaryMax)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                Posted {formatDaysAgo(job.postedAt)}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {job.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="rounded-md px-2 py-0.5 text-xs text-muted-foreground">
                  +{job.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (preview) return content;

  return (
    <Link href={`/jobs/${job.id}`} className="block h-full">
      {content}
    </Link>
  );
}
