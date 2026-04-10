import Link from "next/link";
import { Search, User, ShoppingCart } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-purple-100/20 px-6 py-4 flex items-center justify-between kinetic-transition">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">BOOSTEK</Link>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
          <Link href="/categories/perifericos" className="hover:text-primary kinetic-transition">Periféricos</Link>
          <Link href="/categories/hardware" className="hover:text-primary kinetic-transition">Hardware</Link>
          <Link href="/categories/accesorios" className="hover:text-primary kinetic-transition">Accesorios</Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center bg-slate-100/50 px-4 py-2 rounded-full border border-purple-100/50 group focus-within:border-primary/30 kinetic-transition">
          <Search className="w-4 h-4 text-slate-400 mr-2 group-focus-within:text-primary kinetic-transition" />
          <input 
            type="text" 
            placeholder="Buscar equipo..." 
            className="bg-transparent border-none text-sm focus:outline-none w-48 text-slate-700"
          />
        </div>
        <div className="flex gap-4">
          <Link href="/profile" className="text-slate-600 hover:text-primary kinetic-transition" aria-label="Perfil de usuario">
            <User className="w-6 h-6" />
          </Link>
          <div className="relative text-slate-600 hover:text-primary kinetic-transition cursor-pointer" aria-label="Carrito de compras">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
