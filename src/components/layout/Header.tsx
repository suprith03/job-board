import Link from "next/link";
import { Briefcase, LayoutDashboard, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Briefcase className="h-6 w-6 text-primary" />
          <span>JobBoard</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm">
              Browse Jobs
            </Button>
          </Link>
          <Link href="/post-job">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <PlusCircle className="h-4 w-4" />
              Post a Job
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
