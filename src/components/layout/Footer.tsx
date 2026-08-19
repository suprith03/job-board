import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-white/[0.02]">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 via-amber-500 to-blue-600">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-semibold">BharatJobs</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              The modern Indian job board for growth-focused roles. Discover
              career opportunities across top cities, startups, and remote teams.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Product</p>
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Browse Jobs
                </Link>
                <Link href="/post-a-job" className="hover:text-foreground transition-colors">
                  Post a Job
                </Link>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Company</p>
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <span>About</span>
                <span>Blog</span>
                <span>Careers</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Legal</p>
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <span>Privacy</span>
                <span>Terms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BharatJobs. Built for careers across India.
        </div>
      </div>
    </footer>
  );
}
