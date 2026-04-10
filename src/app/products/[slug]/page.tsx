import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShoppingCart, Heart } from "lucide-react";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let productData;
  try {
    productData = await api.products.getBySlug(slug);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return notFound();
  }

  if (!productData) {
    return notFound();
  }

  const firstVariant = productData.variants?.[0];
  const price = firstVariant?.price?.amount ? firstVariant.price.amount / 100 : 0;
  const primaryCategory = productData.primaryCategory || productData.categories?.[0];

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: primaryCategory?.name || "Categoría", href: `/categories/${primaryCategory?.slug || ""}` },
    { label: productData.name }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background" suppressHydrationWarning>
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
                  {firstVariant?.stock?.available > 0 ? "En Stock - Envío Gratis" : "Sin Stock"}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-4 leading-tight">
                  {productData.name}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary">{formatCurrency(price)}</span>
                  {firstVariant?.price?.compareAt && (
                    <span className="text-slate-400 line-through text-lg">
                      {formatCurrency(firstVariant.price.compareAt / 100)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                {productData.description}
              </p>

              {/* Technical Features (Attributes) */}
              <div className="grid grid-cols-2 gap-4">
                {firstVariant?.attributes && Object.entries(firstVariant.attributes).map(([key, value], i) => (
                  <div key={i} className="p-4 bg-[#f0f3ff] rounded-2xl border border-white">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{key}</div>
                    <div className="text-sm font-bold text-slate-700">{String(value)}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button variant="primary" size="lg" className="flex-1 gap-3" disabled={firstVariant?.stock?.available <= 0}>
                  <ShoppingCart className="w-5 h-5" />
                  Añadir al Carrito
                </Button>
                <Button variant="outline" size="lg" className="px-5 text-slate-400 hover:text-red-500" aria-label="Añadir a deseos">
                  <Heart className="w-6 h-6" />
                </Button>
              </div>

              {/* Specifications Table */}
              <div className="pt-10 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 mb-6">Detalles Técnicos</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-slate-50 gap-1 sm:gap-0">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">SKU</span>
                    <span className="text-sm font-bold text-slate-700">{firstVariant?.sku}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-slate-50 gap-1 sm:gap-0">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Categoría</span>
                    <span className="text-sm font-bold text-slate-700">{primaryCategory?.name}</span>
                  </div>
                  {firstVariant?.stock && (
                    <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-slate-50 gap-1 sm:gap-0">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Disponibilidad</span>
                      <span className="text-sm font-bold text-slate-700">{firstVariant.stock.available} unidades</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
