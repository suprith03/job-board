import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Job Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        The job listing you&apos;re looking for doesn&apos;t exist or may have
        been removed.
      </p>
      <Link href="/" className="mt-6">
        <Button>Browse All Jobs</Button>
      </Link>
    </div>
  );
}
