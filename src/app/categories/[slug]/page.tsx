'use client';

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { api } from "@/lib/api";
import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

const GENERIC_BRAND_LABEL = "Genérico";

const normalizeBrandLabel = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed) return null;

  const lowered = trimmed.toLowerCase();
  return lowered
    .split(" ")
    .filter(Boolean)
    .map((token) => {
      const alnumLen = token.replace(/[^a-z0-9]/g, "").length;
      if (alnumLen > 0 && alnumLen <= 3) return token.toUpperCase();
      return token.replace(
        /(^|[.\-_/])([a-z])/g,
        (_, sep: string, c: string) => `${sep}${c.toUpperCase()}`,
      );
    })
    .join(" ");
};

const normalizeBrandSelection = (value: string): string | null => {
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed) return null;
  const key = trimmed.toLowerCase();
  if (key === "generico" || key === "genérico" || key === "generic") {
    return GENERIC_BRAND_LABEL;
  }
  return normalizeBrandLabel(trimmed);
};

export default function CategoryPage() {
  const { slug } = useParams() as { slug: string };
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [allCategoryProducts, setAllCategoryProducts] = useState<any[]>([]); // Para construir filtros estables
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Estados para filtros
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortBy, setSortBy] = useState("recent");

  // 0. Obtener parámetros de la URL al cargar
  useEffect(() => {
    const brands =
      searchParams.get("brands")?.split(",").filter(Boolean) || [];
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    const sort = searchParams.get("sort") || "recent";

    setSelectedBrands(
      brands
        .map((b) => normalizeBrandSelection(b))
        .filter(Boolean) as string[],
    );
    if (min && max) setPriceRange([Number(min), Number(max)]);
    setSortBy(sort);
  }, [searchParams]);

  // 1. Cargar todos los productos de la categoría UNA VEZ para construir los filtros
  useEffect(() => {
    const fetchBaseData = async () => {
      try {
        const response = await api.categories.getBySlug(slug).catch(() => null);
        const items = response?.data || [];
        setAllCategoryProducts(items);
        
        if (items.length > 0) {
          const name = items[0].primaryCategory?.name || 
                       items[0].categories?.find((c: any) => c.slug === slug)?.name || 
                       (slug.charAt(0).toUpperCase() + slug.slice(1));
          setCategoryName(name);
        }
      } catch (error) {
        console.error("Error fetching base category data:", error);
      }
    };
    fetchBaseData();
  }, [slug]);

  // 2. Cargar productos filtrados cuando cambian los filtros
  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const params: any = {
          minPrice: priceRange?.[0],
          maxPrice: priceRange?.[1],
          // Ahora usamos la columna 'brand' oficial del producto
          brand: selectedBrands.length > 0 ? selectedBrands[0] : undefined,
          sortBy: sortBy === "recent" ? "createdAt" : sortBy === "price-asc" || sortBy === "price-desc" ? "price" : undefined,
          sortOrder: sortBy === "price-desc" ? "desc" : "asc",
        };

        const response = await api.categories.getBySlug(slug, params).catch(() => null);
        const items = response?.data || [];
        setProducts(items);
        setTotalCount(response?.meta?.total || 0);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [slug, selectedBrands, priceRange, sortBy]);

  // Extraer marcas y rangos de precio de TODOS los productos de la categoría
  const availableBrands = useMemo(() => {
    const byKey = new Map<string, string>();
    let hasGeneric = false;

    allCategoryProducts.forEach((p) => {
      const normalized = normalizeBrandLabel(p.brand);
      if (!normalized) {
        hasGeneric = true;
        return;
      }
      const key = normalized.toLowerCase();
      if (!byKey.has(key)) byKey.set(key, normalized);
    });

    const list = Array.from(byKey.values()).sort((a, b) =>
      a.localeCompare(b, "es"),
    );

    if (hasGeneric) list.unshift(GENERIC_BRAND_LABEL);
    return list;
  }, [allCategoryProducts]);

  // Generar rangos de precio dinámicos basados en los productos reales
  const priceOptions = useMemo(() => {
    if (allCategoryProducts.length === 0) return [];
    
    const prices = allCategoryProducts.map(p => (p.variants?.[0]?.price?.amount || 0) / 100).filter(p => p > 0);
    if (prices.length === 0) return [];
    
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const mid = (min + max) / 2;
    
    return [
      { label: "Todos", value: null },
      { label: `Bajo ${formatCurrency(Math.ceil(mid))}`, value: [0, Math.ceil(mid)] },
      { label: `${formatCurrency(Math.ceil(mid))} - ${formatCurrency(Math.ceil(max))}`, value: [Math.ceil(mid), Math.ceil(max) * 2] },
    ];
  }, [allCategoryProducts]);

  const updateFilters = (newBrands: string[], newPrice: [number, number] | null, newSort: string) => {
    const params = new URLSearchParams();
    if (newBrands.length > 0) params.set("brands", newBrands.join(","));
    if (newPrice) {
      params.set("minPrice", newPrice[0].toString());
      params.set("maxPrice", newPrice[1].toString());
    }
    if (newSort !== "recent") params.set("sort", newSort);
    
    router.push(`/categories/${slug}?${params.toString()}`);
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    updateFilters(newBrands, priceRange, sortBy);
  };

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: categoryName }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background" suppressHydrationWarning>
      <main className="flex-1">
        {/* Category Header */}
        <header className="bg-white border-b border-purple-100/50 py-16">
          <div className="container mx-auto px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-4" />
            <h1 className="text-5xl font-bold tracking-tighter text-slate-900 mb-4">{categoryName}</h1>
            <p className="text-slate-500 max-w-2xl font-medium leading-relaxed">
              Equípate con lo mejor en {categoryName.toLowerCase()}. Ingeniería de vanguardia diseñada para ofrecerte la ventaja competitiva definitiva.
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
                    {availableBrands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 group cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="w-4 h-4 rounded border-purple-200 text-primary focus:ring-primary/20 cursor-pointer" 
                        />
                        <span className="text-sm font-medium text-slate-500 group-hover:text-primary transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Precio</h4>
                  <div className="space-y-2">
                    {priceOptions.map((range) => (
                      <label key={range.label} className="flex items-center gap-3 group cursor-pointer">
                        <input 
                          type="radio" 
                          name="priceRange"
                          checked={range.value === null ? !priceRange : (priceRange?.[0] === range.value[0] && priceRange?.[1] === range.value[1])}
                          onChange={() => {
                            setPriceRange(range.value as [number, number] | null);
                            updateFilters(selectedBrands, range.value as [number, number] | null, sortBy);
                          }}
                          className="w-4 h-4 rounded-full border-purple-200 text-primary focus:ring-primary/20 cursor-pointer" 
                        />
                        <span className="text-sm font-medium text-slate-500 group-hover:text-primary transition-colors">{range.label}</span>
                      </label>
                    ))}
                    {priceOptions.length === 0 && <p className="text-xs text-slate-400">No hay rangos disponibles</p>}
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
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {loading ? "Buscando..." : `${totalCount} Productos Encontrados`}
                </span>
                <select 
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    updateFilters(selectedBrands, priceRange, e.target.value);
                  }}
                  className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer"
                >
                  <option value="recent">Más Recientes</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                </select>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-96 bg-slate-50 animate-pulse rounded-[2rem]" />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {products.map((product: any) => {
                    const firstVariant = product.variants?.[0];
                    const price = firstVariant?.price?.amount ? firstVariant.price.amount / 100 : 0;
                    return (
                      <ProductCard 
                        key={product.id}
                        id={product.id}
                        slug={product.slug}
                        name={product.name}
                        price={price}
                        categoryTag={categoryName}
                        description={product.description}
                        tag={product.isFeatured ? "Destacado" : undefined}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-[2rem] border border-purple-100/50">
                  <p className="text-slate-500 font-medium">No se encontraron productos con estos filtros.</p>
                  <button 
                    onClick={() => {
                      setSelectedBrands([]);
                      setPriceRange(null);
                      setSortBy("recent");
                      updateFilters([], null, "recent");
                    }}
                    className="mt-4 text-primary font-bold hover:underline"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}

              {/* Pagination */}
              {!loading && totalCount > 0 && (
                <div className="mt-16 flex justify-center gap-2">
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-primary text-white shadow-lg shadow-primary/20">1</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
