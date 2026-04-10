import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { cn, formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  id: string | number;
  slug: string;
  name: string;
  price: string | number;
  image?: string;
  tag?: string;
  categoryTag?: string;
  description?: string;
  className?: string;
}

export function ProductCard({ id, slug, name, price, image, tag, categoryTag, description, className }: ProductCardProps) {
  return (
    <Link 
      href={`/products/${slug}`}
      className={cn(
        "group bg-white p-6 rounded-[2rem] kinetic-transition hover:shadow-2xl hover:shadow-purple-500/5 cursor-pointer border border-transparent hover:border-purple-100 flex flex-col h-full",
        className
      )}
    >
      <div className="aspect-square bg-[#f0f3ff] rounded-2xl mb-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest opacity-50">
          {image ? (
            <Image 
              src={image} 
              alt={name} 
              fill 
              className="object-cover group-hover:scale-110 kinetic-transition"
            />
          ) : (
            "Imagen"
          )}
        </div>
        {tag && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="shadow-lg shadow-primary/5">{tag}</Badge>
          </div>
        )}
      </div>
      
      <div className="flex-1">
        {categoryTag && (
          <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{categoryTag}</div>
        )}
        <h4 className="font-bold text-slate-900 mb-2 group-hover:text-primary kinetic-transition text-lg leading-tight">
          {name}
        </h4>
        {description && (
          <p className="text-sm text-slate-400 mb-4 line-clamp-2">{description}</p>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-slate-50 mt-auto">
        <span className="text-xl font-bold text-primary">
          {typeof price === "number" ? formatCurrency(price) : price}
        </span>
        <Button 
          variant="secondary" 
          size="icon" 
          className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 kinetic-transition hover:bg-primary"
          aria-label={`Añadir ${name} al carrito`}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </Link>
  );
}
