import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShoppingCart, Heart } from "lucide-react";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock de datos para el producto (esto vendría de tu API)
  const product = {
    name: "Apex Mechanical Keyboard X-Series",
    price: 189.00,
    category: "Teclados",
    categorySlug: "keyboards",
    description: "Experimenta la máxima precisión con nuestro teclado mecánico insignia. Diseñado para profesionales, con switches de respuesta instantánea y retroiluminación RGB sincronizable.",
    features: [
      { title: "Switches Mecánicos", desc: "Respuesta de 1ms" },
      { title: "Construcción", desc: "Aluminio Aeronáutico" },
      { title: "Conectividad", desc: "USB-C Desmontable" },
      { title: "Iluminación", desc: "RGB Per-Key" }
    ],
    specs: [
      { label: "Peso", value: "1.2kg" },
      { label: "Dimensiones", value: "440 x 140 x 35 mm" },
      { label: "Vida útil", value: "80 millones de pulsaciones" },
      { label: "Layout", value: "ISO Español" }
    ]
  };

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: product.category, href: `/categories/${product.categorySlug}` },
    { label: product.name }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background" suppressHydrationWarning>
      <Navigation />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-6 py-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <section className="container mx-auto px-6 pb-24">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Image Gallery */}
            <div className="flex-1 space-y-6">
              <div className="aspect-square bg-white rounded-[2.5rem] border border-purple-100/50 flex items-center justify-center relative overflow-hidden group shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-slate-200 font-bold text-4xl uppercase tracking-[0.2em] animate-float">Imagen Principal</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-white rounded-2xl border border-purple-100/30 flex items-center justify-center cursor-pointer hover:border-primary transition-colors shadow-sm">
                    <span className="text-slate-200 font-bold text-[10px] uppercase">Vista {i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 space-y-10">
              <div>
                <Badge variant="primary" className="mb-6">
                  En Stock - Envío Gratis
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary">{product.price.toFixed(2)}€</span>
                  <span className="text-slate-400 line-through text-lg">229.00€</span>
                </div>
              </div>

              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Technical Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {product.features.map((feature, i) => (
                  <div key={i} className="p-4 bg-[#f0f3ff] rounded-2xl border border-white">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{feature.title}</div>
                    <div className="text-sm font-bold text-slate-700">{feature.desc}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button variant="primary" size="lg" className="flex-1 gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  Añadir al Carrito
                </Button>
                <Button variant="outline" size="lg" className="px-5 text-slate-400 hover:text-red-500" aria-label="Añadir a deseos">
                  <Heart className="w-6 h-6" />
                </Button>
              </div>

              {/* Specifications Table */}
              <div className="pt-10 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 mb-6">Especificaciones Detalladas</h3>
                <div className="space-y-3">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between py-3 border-b border-slate-50 gap-1 sm:gap-0">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{spec.label}</span>
                      <span className="text-sm font-bold text-slate-700">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
