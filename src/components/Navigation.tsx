import Link from "next/link";

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
        <div className="hidden sm:flex items-center bg-slate-100/50 px-4 py-2 rounded-full border border-purple-100/50">
          <input 
            type="text" 
            placeholder="Buscar equipo..." 
            className="bg-transparent border-none text-sm focus:outline-none w-48"
          />
        </div>
        <div className="flex gap-4">
          <Link href="/profile" className="text-slate-600 hover:text-primary kinetic-transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
          <div className="relative text-slate-600 hover:text-primary kinetic-transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
