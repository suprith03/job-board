"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  JOB_TYPES,
  JOB_CATEGORIES,
  type CreateJobInput,
  type Job,
  type JobCategory,
  type JobType,
} from "@/types/job";

interface JobFormProps {
  initialData?: Job;
  onSubmit: (data: CreateJobInput) => Promise<void>;
  submitLabel?: string;
}

const emptyForm: CreateJobInput = {
  title: "",
  company: "",
  location: "",
  locationType: "remote",
  jobType: "full-time",
  experienceLevel: "mid",
  category: "engineering",
  salaryMin: 0,
  salaryMax: 0,
  description: "",
  companyOverview: "",
  responsibilities: [""],
  requirements: [""],
  skills: [""],
  featured: false,
  applicationEmail: "",
};

export function JobForm({
  initialData,
  onSubmit,
  submitLabel = "Post Job",
}: JobFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateJobInput>(() =>
    initialData
      ? {
          title: initialData.title,
          company: initialData.company,
          location: initialData.location,
          locationType: initialData.locationType,
          jobType: initialData.jobType,
          experienceLevel: initialData.experienceLevel,
          category: initialData.category,
          salaryMin: initialData.salaryMin,
          salaryMax: initialData.salaryMax,
          description: initialData.description,
          companyOverview: initialData.companyOverview ?? "",
          responsibilities: initialData.responsibilities ?? [""],
          requirements: initialData.requirements ?? [""],
          skills: initialData.skills ?? [""],
          applicationEmail: initialData.applicationEmail ?? initialData.employerEmail ?? "",
          featured: initialData.featured,
        }
      : emptyForm
  );

  const requirements = form.requirements ?? [""];

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setForm({ ...form, requirements: updated });
  };

  const addRequirement = () => {
    setForm({ ...form, requirements: [...requirements, ""] });
  };

  const removeRequirement = (index: number) => {
    if (requirements.length <= 1) return;
    setForm({
      ...form,
      requirements: requirements.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cleaned = {
        ...form,
        requirements: requirements.filter((r) => r.trim() !== ""),
      };
      await onSubmit(cleaned);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            required
            placeholder="Senior Software Engineer"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            required
            placeholder="Acme Corp"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            required
            placeholder="San Francisco, CA or Remote"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobType">Job Type *</Label>
          <Select
            id="jobType"
            required
            value={form.jobType}
            onChange={(e) =>
              setForm({ ...form, jobType: e.target.value as JobType })
            }
          >
            {JOB_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            id="category"
            required
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as JobCategory })
            }
          >
            {JOB_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryMin">Minimum Salary (USD) *</Label>
          <Input
            id="salaryMin"
            type="number"
            required
            min={0}
            value={form.salaryMin || ""}
            onChange={(e) =>
              setForm({ ...form, salaryMin: Number(e.target.value) })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryMax">Maximum Salary (USD) *</Label>
          <Input
            id="salaryMax"
            type="number"
            required
            min={0}
            value={form.salaryMax || ""}
            onChange={(e) =>
              setForm({ ...form, salaryMax: Number(e.target.value) })
            }
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="applicationEmail">Employer Email *</Label>
          <Input
            id="applicationEmail"
            type="email"
            required
            placeholder="hr@company.com"
            value={form.applicationEmail ?? ""}
            onChange={(e) =>
              setForm({ ...form, applicationEmail: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description *</Label>
        <Textarea
          id="description"
          required
          rows={6}
          placeholder="Describe the role, responsibilities, and team..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        <Label>Key Requirements *</Label>
        {requirements.map((req, index) => (
          <div key={index} className="flex gap-2">
            <Input
              required
              placeholder={`Requirement ${index + 1}`}
              value={req}
              onChange={(e) => updateRequirement(index, e.target.value)}
            />
            {requirements.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeRequirement(index)}
                aria-label="Remove requirement"
              >
                ×
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
          + Add Requirement
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          className="h-4 w-4 rounded border-input"
        />
        <Label htmlFor="featured" className="font-normal cursor-pointer">
          Feature this listing on the homepage
        </Label>
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
