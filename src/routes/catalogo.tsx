import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Filter, X, SlidersHorizontal, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products, STORE_PHONE, STORE_PHONE_DISPLAY } from "@/lib/products";

const searchSchema = z.object({
  categoria: z.string().optional(),
  ofertas: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/catalogo")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Catálogo — The Lion & Co" },
      {
        name: "description",
        content: "Catálogo de ropa de segunda mano seleccionada y piezas urbanas en Teziutlán, Puebla.",
      },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const { categoria, ofertas, q } = Route.useSearch();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filtros interactivos locales si se desean ajustar en la vista
  const [selectedCondition, setSelectedCondition] = useState<string>("todas");
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const filtered = useMemo(() => {
    let res = products;

    // Filtro por categoría o segunda mano
    if (categoria) {
      if (categoria === "segunda-mano") {
        res = res.filter((p) => p.isSecondHand);
      } else {
        res = res.filter((p) => p.category === categoria);
      }
    }

    // Filtro por ofertas
    if (ofertas === "true") {
      res = res.filter((p) => p.isOffer || (p.oldPrice && p.oldPrice > p.price));
    }

    // Filtro por búsqueda
    if (q) {
      const qLower = q.toLowerCase();
      res = res.filter(
        (p) =>
          p.name.toLowerCase().includes(qLower) ||
          p.brand.toLowerCase().includes(qLower) ||
          p.description.toLowerCase().includes(qLower)
      );
    }

    // Filtro adicional por condición
    if (selectedCondition === "segunda-mano") {
      res = res.filter((p) => p.isSecondHand);
    } else if (selectedCondition === "nuevo") {
      res = res.filter((p) => !p.isSecondHand);
    }

    // Filtro por precio
    res = res.filter((p) => p.price <= maxPrice);

    return res;
  }, [categoria, ofertas, q, selectedCondition, maxPrice]);

  const getPageTitle = () => {
    if (q) return `BUSCANDO: "${q.toUpperCase()}"`;
    if (ofertas === "true") return "OFERTAS ESPECIALES";
    if (categoria === "segunda-mano") return "ROPA DE SEGUNDA MANO";
    if (categoria === "hombre") return "HOMBRE";
    if (categoria === "mujer") return "MUJER";
    if (categoria === "ninos") return "NIÑOS";
    if (categoria === "accesorios") return "ACCESORIOS";
    return "CATÁLOGO COMPLETO";
  };

  const clearAllFilters = () => {
    setSelectedCondition("todas");
    setMaxPrice(1000);
    navigate({ to: "/catalogo" });
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <SiteHeader />
      <div className="max-w-7xl mx-auto px-5 md:px-6 pt-8 pb-20 flex-1 w-full">
        {/* Cabecera del catálogo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-200 pb-6 gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">
              The Lion & Co · Teziutlán
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">{getPageTitle()}</h1>
            <div className="text-sm text-neutral-500 mt-2">
              Mostrando {filtered.length} prenda{filtered.length === 1 ? "" : "s"} disponible{filtered.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-xs font-bold tracking-widest border border-black px-4 py-2.5 hover:bg-black hover:text-white transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {isFilterOpen ? "OCULTAR FILTROS" : "FILTROS"}
            </button>
            {(categoria || ofertas || q || selectedCondition !== "todas" || maxPrice < 1000) && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-neutral-500 hover:text-black underline px-2 py-1"
              >
                Limpiar todo
              </button>
            )}
          </div>
        </div>

        {/* Panel de Filtros Desplegable */}
        {isFilterOpen && (
          <div className="mb-8 p-5 bg-neutral-50 border border-neutral-200 rounded-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in duration-200">
            {/* Categoría */}
            <div>
              <span className="text-xs font-bold tracking-wider uppercase block mb-2 text-neutral-800">
                Categoría
              </span>
              <div className="flex flex-col gap-1.5 text-xs">
                {[
                  { label: "Todo", slug: undefined },
                  { label: "Segunda Mano", slug: "segunda-mano" },
                  { label: "Hombre", slug: "hombre" },
                  { label: "Mujer", slug: "mujer" },
                  { label: "Niños", slug: "ninos" },
                  { label: "Accesorios", slug: "accesorios" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() =>
                      navigate({
                        to: "/catalogo",
                        search: {
                          categoria: item.slug,
                          ofertas,
                          q,
                        },
                      })
                    }
                    className={`text-left py-1 px-2 rounded transition-colors ${
                      (item.slug === undefined && !categoria) || categoria === item.slug
                        ? "bg-black text-white font-bold"
                        : "text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Condición */}
            <div>
              <span className="text-xs font-bold tracking-wider uppercase block mb-2 text-neutral-800">
                Condición
              </span>
              <div className="flex flex-col gap-1.5 text-xs">
                {[
                  { label: "Todas", value: "todas" },
                  { label: "Segunda Mano", value: "segunda-mano" },
                  { label: "Nuevo / Temu", value: "nuevo" },
                ].map((cond) => (
                  <button
                    key={cond.value}
                    onClick={() => setSelectedCondition(cond.value)}
                    className={`text-left py-1 px-2 rounded transition-colors ${
                      selectedCondition === cond.value
                        ? "bg-black text-white font-bold"
                        : "text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Solo Ofertas */}
            <div>
              <span className="text-xs font-bold tracking-wider uppercase block mb-2 text-neutral-800">
                Especiales
              </span>
              <button
                onClick={() =>
                  navigate({
                    to: "/catalogo",
                    search: {
                      categoria,
                      ofertas: ofertas === "true" ? undefined : "true",
                      q,
                    },
                  })
                }
                className={`w-full text-left py-2 px-3 text-xs rounded border transition-colors flex items-center justify-between ${
                  ofertas === "true"
                    ? "border-red-600 bg-red-50 text-red-700 font-bold"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-black"
                }`}
              >
                <span>Solo Ofertas</span>
                <span>{ofertas === "true" ? "Activo" : "Ver"}</span>
              </button>
            </div>

            {/* Filtro Precio Máximo */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-800">
                  Precio Máx
                </span>
                <span className="text-xs font-bold text-black">${maxPrice} MXN</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                <span>$50 MXN</span>
                <span>$500 MXN</span>
              </div>
            </div>
          </div>
        )}

        {/* Listado de productos */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <p className="text-lg font-bold text-neutral-800">No encontramos prendas con esos filtros</p>
            <p className="text-sm text-neutral-500 mt-2 mb-6">
              Prueba limpiando los filtros o escríbenos directamente por WhatsApp si buscas una prenda o talla en específico.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={clearAllFilters}
                className="bg-black text-white px-5 py-2.5 text-xs font-bold tracking-widest hover:bg-neutral-800"
              >
                VER TODAS LAS PRENDAS
              </button>
              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                  "Hola The Lion & Co, estoy buscando una prenda en específico en Teziutlán."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="border border-[#25D366] text-[#128C7E] px-5 py-2.5 text-xs font-bold tracking-widest hover:bg-[#25D366] hover:text-white flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> PREGUNTAR POR WHATSAPP
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
