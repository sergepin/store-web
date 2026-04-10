import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { Badge } from "@/components/ui/Badge";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // En una app real, aquí haríamos fetch de los productos por categoría
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: categoryName }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background" suppressHydrationWarning>
      <Navigation />

      <main className="flex-1">
        {/* Category Header */}
        <header className="bg-white border-b border-purple-100/50 py-16">
          <div className="container mx-auto px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-4" />
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
                  <ProductCard 
                    key={id}
                    id={id}
                    name={`Elite ${categoryName} X-Series Pro`}
                    price={129 + id * 10}
                    categoryTag="Wireless Tech"
                    description="Sensor de alta precisión y switches mecánicos premium para un rendimiento sin igual."
                    tag={id === 1 ? "Top Ventas" : undefined}
                  />
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
