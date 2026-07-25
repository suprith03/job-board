"use client";

import { Search, MapPin, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { JOB_TYPES } from "@/types/job";
import type { JobFilters } from "@/types/job";

interface JobSearchBarProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
}

export function JobSearchBar({ filters, onFiltersChange }: JobSearchBarProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="search-title" className="flex items-center gap-1.5">
          <Search className="h-3.5 w-3.5" />
          Job Title or Company
        </Label>
        <Input
          id="search-title"
          placeholder="e.g. Engineer, Designer..."
          value={filters.title ?? ""}
          onChange={(e) =>
            onFiltersChange({ ...filters, title: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search-location" className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Location
        </Label>
        <Input
          id="search-location"
          placeholder="e.g. San Francisco, Remote..."
          value={filters.location ?? ""}
          onChange={(e) =>
            onFiltersChange({ ...filters, location: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search-type" className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5" />
          Job Type
        </Label>
        <Select
          id="search-type"
          value={filters.jobType ?? ""}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              jobType: e.target.value as JobFilters["jobType"],
            })
          }
        >
          <option value="">All Types</option>
          {JOB_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
