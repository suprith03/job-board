"use client";

import { cn } from "@/lib/utils";
import { JOB_CATEGORIES } from "@/types/job";
import type { JobCategory } from "@/types/job";

interface CategoryFilterProps {
  selected: JobCategory | "";
  onSelect: (category: JobCategory | "") => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect("")}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
          selected === ""
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-muted-foreground border-input hover:bg-accent"
        )}
      >
        All Categories
      </button>
      {JOB_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => onSelect(cat.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
            selected === cat.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-input hover:bg-accent"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
