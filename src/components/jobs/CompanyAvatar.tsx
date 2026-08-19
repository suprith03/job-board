import { cn } from "@/lib/utils";
import { getCompanyInitials } from "@/lib/utils";
import Image from "next/image";

interface CompanyAvatarProps {
  company: string;
  logoUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-xl",
};

export function CompanyAvatar({
  company,
  logoUrl,
  size = "md",
  className,
}: CompanyAvatarProps) {
  const initials = getCompanyInitials(company);

  if (logoUrl) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-xl border border-white/10 bg-secondary",
          sizeClasses[size],
          className
        )}
      >
        <Image
          src={logoUrl}
          alt={`${company} logo`}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 font-semibold text-violet-300",
        sizeClasses[size],
        className
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
