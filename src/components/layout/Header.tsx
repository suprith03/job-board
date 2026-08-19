"use client";

import Link from "next/link";
import { Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/", label: "Jobs" },
  { href: "/post-job", label: "Post a Job" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-blue-600 shadow-lg shadow-orange-500/20">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">BharatJobs</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/5">
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              readOnly
              placeholder="Search jobs in India..."
              className="h-9 cursor-pointer border-white/10 bg-white/[0.04] pl-9 text-sm text-white placeholder:text-slate-400"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/#search";
                }
              }}
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/post-job" className="hidden sm:block">
            <Button
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-400 hover:to-blue-500 shadow-lg shadow-orange-500/20"
            >
              Post a Job
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
