import { z } from "zod";

export const jobFormSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    company: z.string().min(2, "Company name is required"),
    logoUrl: z
      .string()
      .url("Must be a valid URL")
      .optional()
      .or(z.literal("")),
    category: z.enum([
      "engineering",
      "design",
      "marketing",
      "sales",
      "product",
      "operations",
      "finance",
      "data",
    ]),
    jobType: z.enum(["full-time", "part-time", "contract"]),
    locationType: z.enum(["remote", "hybrid", "onsite"]),
    experienceLevel: z.enum(["senior", "mid", "entry"]),
    location: z.string().min(2, "Location is required"),
    salaryMin: z.coerce.number().min(1, "Minimum salary is required"),
    salaryMax: z.coerce.number().min(1, "Maximum salary is required"),
    description: z
      .string()
      .min(50, "Description must be at least 50 characters"),
    companyOverview: z
      .string()
      .min(20, "Company overview must be at least 20 characters"),
    responsibilities: z
      .string()
      .min(10, "Add at least one responsibility"),
    skills: z.string().min(2, "Add at least one skill (comma-separated)"),
    applicationUrl: z
      .string()
      .url("Must be a valid URL")
      .optional()
      .or(z.literal("")),
    applicationEmail: z
      .string()
      .email("Must be a valid email")
      .optional()
      .or(z.literal("")),
    featured: z.boolean().default(false),
  })
  .refine((data) => data.salaryMax >= data.salaryMin, {
    message: "Maximum salary must be greater than or equal to minimum",
    path: ["salaryMax"],
  })
  .refine(
    (data) =>
      (data.applicationUrl && data.applicationUrl.length > 0) ||
      (data.applicationEmail && data.applicationEmail.length > 0),
    {
      message: "Provide an application URL or email",
      path: ["applicationUrl"],
    }
  );

export type JobFormValues = z.infer<typeof jobFormSchema>;

export function parseListField(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function jobFormToCreateInput(values: JobFormValues) {
  return {
    ...values,
    logoUrl: values.logoUrl || undefined,
    applicationUrl: values.applicationUrl || undefined,
    applicationEmail: values.applicationEmail || undefined,
    responsibilities: parseListField(values.responsibilities),
    skills: parseListField(values.skills),
  };
}
