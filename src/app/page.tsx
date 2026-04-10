import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" suppressHydrationWarning>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#f0f3ff] py-12 md:py-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent" />
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-6">Novedad</Badge>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-slate-900">
                MEJORA <br /> TU <span className="text-primary">SETUP</span>
              </h1>
              <p className="max-w-md mx-auto md:mx-0 text-lg text-slate-500 mb-10 leading-relaxed">
                Ingeniería de precisión con diseño neo-minimalista. Descubre la próxima generación de periféricos gaming profesionales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button variant="primary">
                  Ver Colección
                </Button>
                <Button variant="outline">
                  Ver Trailer
                </Button>
              </div>
            </div>
            <div className="flex-1 relative aspect-square w-full max-w-xl">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10 animate-float">
                <div className="w-full h-full bg-white/40 rounded-3xl backdrop-blur-sm border border-white/50 shadow-2xl flex items-center justify-center min-h-[300px]">
                  <span className="text-primary/40 font-bold text-xl tracking-widest uppercase italic">Elite Gear 3D</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías Destacadas */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <SectionHeader 
              title="Explorar por Categoría" 
              subtitle="El Arsenal" 
              viewAllLink="/categories" 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { name: "Teclados", items: "12", color: "bg-[#F5F3FF]", slug: "keyboards" },
                { name: "Ratones", items: "8", color: "bg-[#f0f3ff]", slug: "mice" },
                { name: "Audio", items: "15", color: "bg-[#F9F9FF]", slug: "audio" }
              ].map((cat, i) => (
                <CategoryCard 
                  key={i} 
                  name={cat.name} 
                  itemsCount={cat.items} 
                  color={cat.color} 
                  slug={cat.slug} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Productos Tendencia */}
        <section className="py-24 bg-[#f9f9ff]">
          <div className="container mx-auto px-6">
            <SectionHeader 
              title="Tendencias Actuales" 
              subtitle="Máximo Rendimiento" 
              centered
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((id) => (
                <ProductCard 
                  key={id} 
                  id={id} 
                  name="Apex Mechanical Pro" 
                  price={189.00} 
                  tag="Limitado" 
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
