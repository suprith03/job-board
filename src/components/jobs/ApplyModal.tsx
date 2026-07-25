"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Job } from "@/types/job";

interface ApplyModalProps {
  job: Job;
  open: boolean;
  onClose: () => void;
}

export function ApplyModal({ job, open, onClose }: ApplyModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    resumeUrl: "",
    coverLetter: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ fullName: "", email: "", resumeUrl: "", coverLetter: "" });
    }, 300);
  };

  if (submitted) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        title="Application Submitted!"
      >
        <div className="flex flex-col items-center text-center py-6 space-y-4">
          <CheckCircle2 className="h-16 w-16 text-emerald-500" />
          <p className="text-muted-foreground">
            Your application for <strong>{job.title}</strong> at{" "}
            <strong>{job.company}</strong> has been received. The employer will
            contact you at <strong>{form.email}</strong>.
          </p>
          <Button onClick={handleClose} className="mt-4">
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Apply for ${job.title}`}
      description={`Submit your application to ${job.company}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apply-name">Full Name *</Label>
          <Input
            id="apply-name"
            required
            placeholder="Jane Doe"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apply-email">Email *</Label>
          <Input
            id="apply-email"
            type="email"
            required
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apply-resume">Resume / Portfolio URL *</Label>
          <Input
            id="apply-resume"
            type="url"
            required
            placeholder="https://linkedin.com/in/janedoe"
            value={form.resumeUrl}
            onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apply-cover">Cover Letter</Label>
          <Textarea
            id="apply-cover"
            rows={4}
            placeholder="Tell us why you're a great fit..."
            value={form.coverLetter}
            onChange={(e) =>
              setForm({ ...form, coverLetter: e.target.value })
            }
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Submit Application
          </Button>
        </div>
      </form>
    </Modal>
  );
}
