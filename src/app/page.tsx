import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden bg-[#f0f3ff]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent" />
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full mb-6 tracking-widest uppercase">Novedad</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-slate-900">
                MEJORA <br /> TU <span className="text-primary">SETUP</span>
              </h1>
              <p className="max-w-md text-lg text-slate-500 mb-10 leading-relaxed">
                Ingeniería de precisión con diseño neo-minimalista. Descubre la próxima generación de periféricos gaming profesionales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:scale-105 neon-shadow kinetic-transition">
                  Ver Colección
                </button>
                <button className="px-10 py-4 rounded-full font-bold border border-purple-200 hover:bg-white kinetic-transition text-slate-700">
                  Ver Trailer
                </button>
              </div>
            </div>
            <div className="flex-1 relative aspect-square w-full max-w-xl">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10 animate-float">
                <div className="w-full h-full bg-white/40 rounded-3xl backdrop-blur-sm border border-white/50 shadow-2xl flex items-center justify-center">
                  <span className="text-primary/40 font-bold text-xl tracking-widest uppercase italic">Elite Gear 3D</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías Destacadas */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">El Arsenal</h2>
                <h3 className="text-4xl font-bold tracking-tight text-slate-900">Explorar por Categoría</h3>
              </div>
              <a href="/categories" className="text-slate-400 hover:text-primary font-medium kinetic-transition">Ver todo →</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Teclados", items: "12 Productos", color: "bg-[#F5F3FF]" },
                { name: "Ratones", items: "8 Productos", color: "bg-[#f0f3ff]" },
                { name: "Audio", items: "15 Productos", color: "bg-[#F9F9FF]" }
              ].map((cat, i) => (
                <div key={i} className={`group ${cat.color} p-10 rounded-3xl kinetic-transition hover:-translate-y-2 cursor-pointer`}>
                  <div className="h-48 mb-8 bg-white/50 rounded-2xl flex items-center justify-center border border-white">
                    <span className="text-slate-300 font-bold uppercase tracking-widest">{cat.name}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{cat.name}</h4>
                  <p className="text-slate-500 text-sm font-medium">{cat.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Productos Tendencia */}
        <section className="py-24 bg-[#f9f9ff]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Máximo Rendimiento</h2>
              <h3 className="text-4xl font-bold tracking-tight text-slate-900">Tendencias Actuales</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="group bg-white p-6 rounded-[2rem] kinetic-transition hover:shadow-2xl hover:shadow-purple-500/5 cursor-pointer border border-transparent hover:border-purple-100">
                  <div className="aspect-square bg-[#f0f3ff] rounded-2xl mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold">IMAGEN</div>
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">Limitado</div>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 group-hover:text-primary kinetic-transition">Apex Mechanical Pro</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">189,00 €</span>
                    <button className="bg-slate-900 text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 kinetic-transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
