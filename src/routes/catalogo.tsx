import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, ArrowUpDown, MessageCircle, ShoppingBag, Send } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products, LOTE_COMPLETO, STORE_PHONE, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

const searchSchema = z.object({
  categoria: z.string().optional(),
  condicion: z.string().optional(),
  orden: z.enum(["nuevo-primero", "menor-precio", "mayor-precio"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/catalogo")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Catálogo — THE LION & CO" },
      {
        name: "description",
        content: "Catálogo de ropa seleccionada y prendas nuevas en Teziutlán, Puebla.",
      },
    ],
  }),
  component: Catalogo,
});

const CATEGORY_FILTERS = [
  { label: "Todo", slug: undefined },
  { label: "Mujer", slug: "mujer" },
  { label: "Caballero", slug: "hombre" },
  { label: "Niños", slug: "ninos" },
  { label: "Accesorios", slug: "accesorios" },
];

const CONDITION_FILTERS = [
  { label: "Todas las condiciones", value: undefined },
  { label: "Nuevo con etiqueta", value: "nuevo-con-etiqueta" },
  { label: "Nuevo sin etiqueta", value: "nuevo-sin-etiqueta" },
  { label: "Como nuevo", value: "como-nuevo" },
  { label: "Excelente estado", value: "excelente" },
  { label: "Buen estado", value: "buen-estado" },
];

function Catalogo() {
  const { categoria, condicion, orden = "nuevo-primero", q } = Route.useSearch();
  const navigate = useNavigate();
  const { addItem, open } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  const [loteAdded, setLoteAdded] = useState(false);

  // Filtrado y Ordenamiento
  const filtered = useMemo(() => {
    let res = [...products];

    // Filtro por categoría (género)
    if (categoria) {
      res = res.filter((p) => p.category === categoria);
    }

    // Filtro por condición
    if (condicion) {
      if (condicion === "nuevo") {
        res = res.filter(
          (p) => p.condition === "nuevo-con-etiqueta" || p.condition === "nuevo-sin-etiqueta"
        );
      } else {
        res = res.filter((p) => p.condition === condicion);
      }
    }

    // Búsqueda por texto
    if (q) {
      const ql = q.toLowerCase();
      res = res.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.brand.toLowerCase().includes(ql) ||
          p.description.toLowerCase().includes(ql)
      );
    }

    // Ordenamiento:
    // 1. "nuevo-primero": Primero lo Nuevo, luego Seleccionada
    // 2. "menor-precio": De menor a mayor precio
    // 3. "mayor-precio": De mayor a menor precio
    if (orden === "menor-precio") {
      res.sort((a, b) => a.price - b.price);
    } else if (orden === "mayor-precio") {
      res.sort((a, b) => b.price - a.price);
    } else {
      // Por defecto: primero lo NUEVO, luego Seleccionada
      res.sort((a, b) => {
        if (a.label === "NUEVO" && b.label !== "NUEVO") return -1;
        if (a.label !== "NUEVO" && b.label === "NUEVO") return 1;
        return 0;
      });
    }

    return res;
  }, [categoria, condicion, orden, q]);

  const setCategory = (slug: string | undefined) => {
    navigate({ to: "/catalogo", search: { categoria: slug, condicion, orden, q } });
  };

  const setCondicion = (val: string | undefined) => {
    navigate({ to: "/catalogo", search: { categoria, condicion: val, orden, q } });
  };

  const setOrden = (ord: "nuevo-primero" | "menor-precio" | "mayor-precio") => {
    navigate({ to: "/catalogo", search: { categoria, condicion, orden: ord, q } });
  };

  const handleAddLote = () => {
    addItem(LOTE_COMPLETO, "18 piezas", 1);
    setLoteAdded(true);
    setTimeout(() => setLoteAdded(false), 1500);
    open();
  };

  const handleBuyLoteWhatsApp = () => {
    const text = `*PEDIDO — LOTE COMPLETO THE LION & CO*

Hola, quiero comprar el *Lote Completo (18 piezas en total)* por *$1,830 MXN* con *Envio a Domicilio Gratis* en Teziutlan.

Me indican disponibilidad y coordinamos la entrega?`;
    window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      <SiteHeader />

      <div className="max-w-screen-xl mx-auto w-full px-4 pt-6 pb-20 flex-1">

        {/* 1. SECCIÓN LOTE COMPLETO — SOLITO ARRIBA (NO SE CUENTA COMO UNA PRENDA SUELTA) */}
        {!categoria && !condicion && !q && (
          <div className="mb-8 bg-neutral-950 text-white rounded-sm p-4 sm:p-6 border border-neutral-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-400 text-black text-[9px] font-black tracking-widest px-2 py-0.5 rounded-xs uppercase">
                    OFERTA LOTE COMPLETO
                  </span>
                  <span className="bg-emerald-600 text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-xs uppercase">
                    ENVÍO A DOMICILIO GRATIS
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Lote Completo — 18 piezas en total
                </h2>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <strong>16 prendas seleccionadas</strong> (Levi's, Nike, American Eagle, ANDREA, 2 gorras NY y pantalones) + <strong>2 prendas de regalo incluidas</strong> (blusita artesanal y mayón).
                </p>
                <div className="pt-1 flex items-baseline gap-2.5">
                  <span className="text-2xl font-black text-amber-400">$1,830 MXN</span>
                  <span className="text-sm text-neutral-500 line-through">Por separado: $2,230 MXN</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded-xs">
                    Ahorras $400 MXN
                  </span>
                </div>
              </div>

              {/* Botones de acción del Lote */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 flex-shrink-0">
                <button
                  onClick={handleBuyLoteWhatsApp}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs py-2.5 px-4 rounded-xs tracking-wider flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  Comprar Lote ($1,830 MXN)
                </button>
                <button
                  onClick={handleAddLote}
                  className="bg-white/10 hover:bg-white hover:text-black text-white text-xs font-semibold py-2.5 px-4 rounded-xs border border-white/20 tracking-wider flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {loteAdded ? "Agregado al carrito" : "Agregar lote al carrito"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ENCABEZADO DEL CATÁLOGO */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 border-b border-neutral-100 pb-3 gap-2">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              THE LION &amp; CO · TEZIUTLÁN
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              Catálogo de Prendas
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              {filtered.length} prenda{filtered.length !== 1 ? "s" : ""} disponible{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Selector de ordenamiento: menor precio, mayor precio, más nuevo */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-neutral-400 flex items-center gap-1 mr-1">
              <ArrowUpDown className="w-3 h-3" /> Ordenar:
            </span>
            <button
              onClick={() => setOrden("nuevo-primero")}
              className={`text-xs px-2.5 py-1 rounded-xs border transition-colors ${
                orden === "nuevo-primero"
                  ? "bg-black text-white border-black font-semibold"
                  : "border-neutral-200 text-neutral-600 hover:border-black"
              }`}
            >
              Lo Nuevo primero
            </button>
            <button
              onClick={() => setOrden("menor-precio")}
              className={`text-xs px-2.5 py-1 rounded-xs border transition-colors ${
                orden === "menor-precio"
                  ? "bg-black text-white border-black font-semibold"
                  : "border-neutral-200 text-neutral-600 hover:border-black"
              }`}
            >
              Menor precio
            </button>
            <button
              onClick={() => setOrden("mayor-precio")}
              className={`text-xs px-2.5 py-1 rounded-xs border transition-colors ${
                orden === "mayor-precio"
                  ? "bg-black text-white border-black font-semibold"
                  : "border-neutral-200 text-neutral-600 hover:border-black"
              }`}
            >
              Mayor precio
            </button>
          </div>
        </div>

        {/* FILTROS POR GÉNERO (MUJER, CABALLERO, NIÑOS, ACCESORIOS) */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setCategory(f.slug)}
              className={`flex-shrink-0 px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                (f.slug === undefined && !categoria) || categoria === f.slug
                  ? "bg-black text-white border-black"
                  : "border-neutral-200 text-neutral-700 hover:border-black bg-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* FILTROS POR CONDICIÓN EXACTA (NUEVO CON ETIQUETA, NUEVO SIN ETIQUETA, COMO NUEVO, EXCELENTE, BUEN ESTADO) */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-5 no-scrollbar">
          {CONDITION_FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setCondicion(f.value)}
              className={`flex-shrink-0 px-3 py-1 text-[11px] font-medium rounded-full border transition-colors ${
                (f.value === undefined && !condicion) || condicion === f.value
                  ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                  : "border-neutral-200 text-neutral-500 hover:border-neutral-400 bg-neutral-50/50"
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1 text-[11px] font-medium border border-neutral-200 rounded-full text-neutral-500 hover:border-black"
          >
            <SlidersHorizontal className="w-3 h-3" />
            {showFilters ? "Ocultar panel" : "Más filtros"}
          </button>
        </div>

        {/* PANEL EXPANDIBLE DE FILTROS */}
        {showFilters && (
          <div className="mb-6 p-4 bg-neutral-50 border border-neutral-200 rounded-sm text-xs flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-150">
            <div>
              <span className="font-semibold text-neutral-800 block mb-1">Filtros activos:</span>
              <div className="flex items-center gap-2 flex-wrap text-neutral-600">
                {categoria && <span className="bg-white px-2 py-0.5 border rounded-xs">Categoría: {categoria}</span>}
                {condicion && <span className="bg-white px-2 py-0.5 border rounded-xs">Condición: {condicion}</span>}
                {orden && <span className="bg-white px-2 py-0.5 border rounded-xs">Orden: {orden}</span>}
                {!categoria && !condicion && <span>Mostrando todo el catálogo</span>}
              </div>
            </div>
            {(categoria || condicion || q || orden !== "nuevo-primero") && (
              <button
                onClick={() => navigate({ to: "/catalogo" })}
                className="text-xs font-semibold text-neutral-700 hover:text-black underline"
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>
        )}

        {/* GRID DE PRENDAS (2 COLUMNAS EN TELÉFONO — ESTILO NIKE / INSTAGRAM) */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center max-w-sm mx-auto">
            <p className="text-sm font-semibold text-neutral-800">No hay prendas con esa combinación de filtros</p>
            <p className="text-xs text-neutral-500 mt-1 mb-5">
              Prueba cambiando la condición o escríbenos directamente a WhatsApp.
            </p>
            <button
              onClick={() => navigate({ to: "/catalogo" })}
              className="bg-black text-white px-4 py-2 text-xs font-semibold rounded-xs"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
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
