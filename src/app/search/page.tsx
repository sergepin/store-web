'use client';

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ProductCard } from "@/components/ui/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const response = await api.products.search(query);
          // La API devuelve un array directamente o un objeto con data?
          // Según el index.ts, devuelve response.data
          setProducts(Array.isArray(response) ? response : response?.data || []);
        } catch (error) {
          console.error("Error searching products:", error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setProducts([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-slate-900 py-16 px-6" suppressHydrationWarning>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter text-slate-900 mb-8">
          {query ? `Resultados para "${query}"` : "Búsqueda"}
        </h1>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              // Obtenemos el precio de la primera variante si existe
              const firstVariant = product.variants?.[0];
              const price = firstVariant?.price?.amount ? firstVariant.price.amount / 100 : 0;
              
              return (
                <ProductCard 
                  key={product.id} 
                  id={product.id} 
                  slug={product.slug}
                  name={product.name} 
                  price={price}
                  tag={product.tag}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[2.5rem] border border-purple-100/50 shadow-sm text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {query ? `No se encontraron resultados para "${query}"` : "Comienza tu búsqueda"}
            </h2>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
              {query 
                ? "Prueba con otros términos o explora nuestras categorías populares." 
                : "Busca los mejores periféricos gaming para llevar tu setup al siguiente nivel."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchContent />
    </Suspense>
  );
}
