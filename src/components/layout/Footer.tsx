import { Briefcase } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="h-5 w-5" />
            <span className="font-semibold text-foreground">JobBoard</span>
            <span className="text-sm">© {new Date().getFullYear()}</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Find your next opportunity. Built with Next.js 14 & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
