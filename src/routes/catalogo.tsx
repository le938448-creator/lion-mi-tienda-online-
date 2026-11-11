import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products, STORE_PHONE } from "@/lib/products";

const searchSchema = z.object({
  categoria: z.string().optional(),
  condicion: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/catalogo")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Catalogo — The Lion & Co" },
      {
        name: "description",
        content: "Catalogo de ropa seleccionada y prendas nuevas en Teziutlan, Puebla.",
      },
    ],
  }),
  component: Catalogo,
});

const CATEGORY_FILTERS = [
  { label: "Todo", slug: undefined },
  { label: "Mujer", slug: "mujer" },
  { label: "Caballero", slug: "hombre" },
  { label: "Ninos", slug: "ninos" },
  { label: "Accesorios", slug: "accesorios" },
];

const CONDITION_FILTERS = [
  { label: "Todos", value: undefined },
  { label: "Nuevo con etiqueta", value: "nuevo-con-etiqueta" },
  { label: "Nuevo sin etiqueta", value: "nuevo-sin-etiqueta" },
  { label: "Como nuevo", value: "como-nuevo" },
  { label: "Excelente estado", value: "excelente" },
  { label: "Buen estado", value: "buen-estado" },
];

function Catalogo() {
  const { categoria, condicion, q } = Route.useSearch();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let res = products;

    if (categoria) {
      res = res.filter((p) => p.category === categoria);
    }

    if (condicion) {
      if (condicion === "nuevo") {
        res = res.filter(
          (p) =>
            p.condition === "nuevo-con-etiqueta" ||
            p.condition === "nuevo-sin-etiqueta"
        );
      } else {
        res = res.filter((p) => p.condition === condicion);
      }
    }

    if (q) {
      const ql = q.toLowerCase();
      res = res.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.brand.toLowerCase().includes(ql) ||
          p.description.toLowerCase().includes(ql)
      );
    }

    return res;
  }, [categoria, condicion, q]);

  const getTitle = () => {
    if (q) return `"${q}"`;
    if (categoria === "mujer") return "MUJER";
    if (categoria === "hombre") return "CABALLERO";
    if (categoria === "ninos") return "NINOS";
    if (categoria === "accesorios") return "ACCESORIOS";
    return "CATALOGO";
  };

  const setCategory = (slug: string | undefined) => {
    navigate({ to: "/catalogo", search: { categoria: slug, condicion, q } });
  };

  const setCondicion = (val: string | undefined) => {
    navigate({ to: "/catalogo", search: { categoria, condicion: val, q } });
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <SiteHeader />

      <div className="max-w-screen-xl mx-auto w-full px-4 pt-6 pb-20 flex-1">

        {/* Titulo */}
        <div className="mb-5">
          <h1 className="text-2xl font-black tracking-tight">{getTitle()}</h1>
          <p className="text-xs text-neutral-500 mt-1">
            {filtered.length} prenda{filtered.length !== 1 ? "s" : ""} disponible{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filtro de categoria — chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setCategory(f.slug)}
              className={`flex-shrink-0 px-4 py-1.5 text-xs font-bold rounded-full border transition-colors ${
                (f.slug === undefined && !categoria) || categoria === f.slug
                  ? "bg-black text-white border-black"
                  : "border-neutral-300 text-neutral-600 hover:border-black"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Filtro de condicion — chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar">
          {CONDITION_FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setCondicion(f.value)}
              className={`flex-shrink-0 px-3 py-1 text-[11px] font-semibold rounded-full border transition-colors ${
                (f.value === undefined && !condicion) || condicion === f.value
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "border-neutral-200 text-neutral-500 hover:border-neutral-500"
              }`}
            >
              {f.label}
            </button>
          ))}

          {/* Boton filtros extra */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold border border-neutral-200 rounded-full text-neutral-500 hover:border-neutral-500"
          >
            <SlidersHorizontal className="w-3 h-3" />
            Filtros
          </button>
        </div>

        {/* Grid de productos — 2 columnas en movil */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-base font-bold text-neutral-700">Sin resultados</p>
            <p className="text-sm text-neutral-400 mt-2 mb-6">
              Escríbenos si buscas una prenda o talla en específico.
            </p>
            <a
              href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                "Hola The Lion & Co, estoy buscando una prenda en Teziutlan."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 text-xs font-bold tracking-widest"
            >
              <MessageCircle className="w-4 h-4" /> PREGUNTAR POR WHATSAPP
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
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
