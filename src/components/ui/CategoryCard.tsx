import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  itemsCount: string | number;
  color?: string;
  slug: string;
  className?: string;
}

export function CategoryCard({ name, itemsCount, color = "bg-[#F5F3FF]", slug, className }: CategoryCardProps) {
  return (
    <Link 
      href={`/categories/${slug}`}
      className={cn(
        "group p-10 rounded-3xl kinetic-transition hover:-translate-y-2 cursor-pointer",
        color,
        className
      )}
    >
      <div className="h-48 mb-8 bg-white/50 rounded-2xl flex items-center justify-center border border-white">
        <span className="text-slate-300 font-bold uppercase tracking-widest">{name}</span>
      </div>
      <h4 className="text-2xl font-bold text-slate-900 mb-2">{name}</h4>
      <p className="text-slate-500 text-sm font-medium">{itemsCount} Productos</p>
    </Link>
  );
}
