import { cn } from "@/lib/utils";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  viewAllLink, 
  centered = false,
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col mb-16",
      centered ? "text-center items-center" : "flex-row justify-between items-end",
      className
    )}>
      <div>
        {subtitle && (
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">
            {subtitle}
          </h2>
        )}
        <h3 className="text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h3>
      </div>
      
      {viewAllLink && !centered && (
        <Link 
          href={viewAllLink} 
          className="text-slate-400 hover:text-primary font-medium kinetic-transition"
        >
          Ver todo →
        </Link>
      )}
    </div>
  );
}
