'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function Navigation() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.categories.list();
        // Solo mostramos las primeras 3 o 4 para no saturar el menú
        setCategories(data?.slice(0, 4) || []);
      } catch (error) {
        console.error("Error fetching categories for navigation:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-purple-100/20 px-6 py-4 flex items-center justify-between kinetic-transition">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">BOOSTEK</Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`} 
                className="hover:text-primary kinetic-transition"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <form 
            onSubmit={handleSearch}
            className="hidden sm:flex items-center bg-slate-100/50 px-4 py-2 rounded-full border border-purple-100/50 group focus-within:border-primary/30 kinetic-transition"
          >
            <Search className="w-4 h-4 text-slate-400 mr-2 group-focus-within:text-primary kinetic-transition" />
            <input 
              type="text" 
              placeholder="Buscar equipo..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-sm focus:outline-none w-48 text-slate-700"
            />
          </form>
          <div className="flex gap-4">
            <Link href="/profile" className="text-slate-600 hover:text-primary kinetic-transition" aria-label="Perfil de usuario">
              <User className="w-6 h-6" />
            </Link>
            <div 
              className="relative text-slate-600 hover:text-primary kinetic-transition cursor-pointer" 
              aria-label="Carrito de compras"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]">2</span>
            </div>
          </div>
        </div>
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
