import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // En una app real, aquí haríamos fetch de los productos por categoría
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />

      <main className="flex-1">
        {/* Category Header */}
        <header className="bg-white border-b border-purple-100/50 py-16">
          <div className="container mx-auto px-6">
            <nav className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">
              <a href="/" className="hover:text-primary transition-colors">Inicio</a>
              <span className="mx-2">/</span>
              <span className="text-primary">{categoryName}</span>
            </nav>
            <h1 className="text-5xl font-bold tracking-tighter text-slate-900 mb-4">{categoryName}</h1>
            <p className="text-slate-500 max-w-2xl font-medium leading-relaxed">
              Equípate con lo mejor en {slug}. Ingeniería de vanguardia diseñada para ofrecerte la ventaja competitiva definitiva.
            </p>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 space-y-10">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 mb-6">Filtros Técnicos</h3>
                
                {/* Brand Filter */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Marca</h4>
                  <div className="space-y-2">
                    {["Apex", "Zenith", "Titan", "Nova"].map((brand) => (
                      <label key={brand} className="flex items-center gap-3 group cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-purple-200 text-primary focus:ring-primary/20 cursor-pointer" />
                        <span className="text-sm font-medium text-slate-500 group-hover:text-primary transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Precio</h4>
                  <div className="space-y-2">
                    {["0€ - 50€", "50€ - 150€", "150€ - 300€", "300€+"].map((range) => (
                      <label key={range} className="flex items-center gap-3 group cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-purple-200 text-primary focus:ring-primary/20 cursor-pointer" />
                        <span className="text-sm font-medium text-slate-500 group-hover:text-primary transition-colors">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="text-sm font-bold text-primary mb-2 italic">¿Necesitas ayuda?</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Nuestros expertos están disponibles para ayudarte a elegir el equipo perfecto para tu estilo de juego.
                </p>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">12 Productos Encontrados</span>
                <select className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer">
                  <option>Más Recientes</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((id) => (
                  <div key={id} className="group bg-white p-6 rounded-[2rem] kinetic-transition hover:shadow-2xl hover:shadow-purple-500/5 cursor-pointer border border-transparent hover:border-purple-100 flex flex-col h-full">
                    <div className="aspect-square bg-[#f0f3ff] rounded-2xl mb-6 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold">PROD_{id}</div>
                      {id === 1 && (
                        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-primary/20">
                          Top Ventas
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Wireless Tech</div>
                      <h4 className="font-bold text-slate-900 mb-2 group-hover:text-primary kinetic-transition text-lg leading-tight">Elite {categoryName} X-Series Pro</h4>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2">Sensor de alta precisión y switches mecánicos premium para un rendimiento sin igual.</p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-2xl font-bold text-primary">{(129 + id * 10).toFixed(2)}€</span>
                      <button className="bg-slate-900 text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 kinetic-transition hover:bg-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-16 flex justify-center gap-2">
                <button className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-primary text-white shadow-lg shadow-primary/20">1</button>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-slate-400 hover:bg-slate-100 transition-colors">2</button>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-slate-400 hover:bg-slate-100 transition-colors">3</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
