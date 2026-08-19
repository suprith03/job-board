"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface JobSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobSearchBar({ value, onChange }: JobSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by job title, skill, or keyword..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 pl-11 text-base border-white/10 bg-white/[0.03] backdrop-blur-md focus-visible:ring-primary/50"
      />
    </div>
  );
}
