"use client";

import { cn } from "@/lib/utils";
import type { FilterOption } from "@/types/job";

interface FilterChipsProps<T extends string> {
  label: string;
  options: FilterOption<T>[];
  value: T | "";
  onChange: (value: T | "") => void;
}

export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
}: FilterChipsProps<T>) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange("")}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200",
            value === ""
              ? "border-primary/50 bg-primary/15 text-primary"
              : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground"
          )}
        >
          All
        </button>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              onChange(value === option.value ? ("" as T | "") : option.value)
            }
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200",
              value === option.value
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
