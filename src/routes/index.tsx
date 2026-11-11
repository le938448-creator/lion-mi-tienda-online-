import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products, LOTE_COMPLETO, DONATION_ITEMS, formatPrice, STORE_PHONE } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ArrowRight, ChevronRight, Sparkles, Send, HeartHandshake, ShoppingBag, Gift, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE LION & CO — Teziutlán" },
      {
        name: "description",
        content: "THE LION & CO: Prendas seleccionadas, piezas nuevas y donaciones comunitarias en Teziutlán, Puebla.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const { addItem, open } = useCart();
  const [showSplash, setShowSplash] = useState(true);
  const [loteAdded, setLoteAdded] = useState(false);

  // Splash screen fadeout
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  // Prendas destacadas para carrusel horizontal (4-6 prendas)
  const featuredProducts = products.slice(0, 6);

  // Formularios
  const [waitlistName, setWaitlistName] = useState("");
  const [donationType, setDonationType] = useState<"donar" | "necesito">("donar");
  const [donationDetail, setDonationDetail] = useState("");

  const handleBuyLoteWhatsApp = () => {
    const text = `*PEDIDO — LOTE COMPLETO THE LION & CO*

Hola, quiero comprar el *Lote Completo (18 piezas en total)* por *$1,830 MXN* con *Envio a Domicilio Gratis* en Teziutlan.

Me indican disponibilidad y coordinamos la entrega?`;
    window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleAddLoteCart = () => {
    addItem(LOTE_COMPLETO, "18 piezas", 1);
    setLoteAdded(true);
    setTimeout(() => setLoteAdded(false), 1500);
    open();
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = waitlistName.trim() || "Interesado";
    const text = `Hola THE LION & CO, me gustaria unirme a la lista de espera de The Lion Originals (Drop 01 - 2027). Mi nombre es: ${name}.`;
    window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = donationType === "donar" ? "Quiero donar ropa" : "Necesito ropa";
    const detail = donationDetail.trim() ? ` Detalle: ${donationDetail.trim()}` : "";
    const text = `Hola THE LION & CO, me comunico sobre la iniciativa de Donaciones en Teziutlan: ${action}.${detail}`;
    window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">

      {/* SPLASH SCREEN INICIAL NEGRO — THE LION & CO (NO SE QUITA) */}
      <div
        onClick={() => setShowSplash(false)}
        className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-700 select-none cursor-pointer ${
          showSplash ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="font-heading text-4xl md:text-6xl text-white tracking-normal font-normal text-center px-4"
          style={{ letterSpacing: "0.02em" }}
        >
          THE LION &amp; CO
        </div>
        <div className="mt-3 text-white/40 font-mono text-[9px] md:text-[11px] tracking-[0.35em] uppercase text-center">
          TEZIUTLÁN, PUEBLA · MÉXICO
        </div>
      </div>

      <SiteHeader />

      {/* HERO — FOTO DE LA MUJER COMPLETA */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:h-[75vh] min-h-[440px] max-h-[680px] overflow-hidden bg-neutral-900">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85&fit=crop"
          alt="THE LION & CO"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

        <div className="relative z-10 h-full max-w-5xl mx-auto px-5 flex flex-col justify-between py-8 md:py-12">
          {/* Arriba: THE LION & CO */}
          <div>
            <h1 className="text-white font-black tracking-tight text-2xl md:text-4xl uppercase">
              THE LION &amp; CO
            </h1>
            <p className="text-white/70 text-xs md:text-sm tracking-widest uppercase mt-0.5">
              Teziutlán, Puebla
            </p>
          </div>

          {/* Abajo: Colección & Botón delgado "Entrar al catálogo" */}
          <div className="space-y-3">
            <div>
              <span className="text-amber-400 text-[11px] font-bold tracking-widest uppercase block mb-1">
                Catálogo Disponible
              </span>
              <h2 className="text-white text-2xl md:text-3xl font-black tracking-tight">
                Prendas Seleccionadas &amp; Nuevas
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-100 px-6 py-2.5 text-xs font-semibold rounded-sm tracking-wider transition-colors"
            >
              Entrar al catálogo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 1. SECCIÓN: LOTE COMPLETO (ARRIBA, SOLITO, CON SU TOTAL EXACTO) */}
      <section className="py-10 md:py-14 bg-neutral-950 text-white w-full border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-sm p-5 sm:p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-amber-400 text-black text-[9px] font-black tracking-widest px-2 py-0.5 rounded-xs uppercase">
                  OFERTA ESPECIAL
                </span>
                <span className="bg-emerald-600 text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-xs uppercase">
                  ENVÍO A DOMICILIO GRATIS
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Lote Completo — Toda la Ropa Junta
              </h2>

              <p className="text-[13px] text-neutral-300 mt-2.5 leading-relaxed">
                Llévate la colección completa en una sola compra. <strong>18 piezas en total</strong>: 16 prendas seleccionadas y 2 de regalo incluidas sin costo.
              </p>

              {/* Precios exactos: separado $2,230 | lote $1,830 | ahorro $400 */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-amber-400">$1,830 MXN</span>
                <span className="text-base text-neutral-500 line-through font-semibold">$2,230 MXN</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-xs">
                  Ahorras $400 MXN
                </span>
              </div>

              {/* Desglose exacto de piezas */}
              <ul className="mt-4 space-y-2 text-xs text-neutral-300 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span><strong>16 prendas pagadas:</strong> Levi's, Nike, American Eagle, ANDREA, 2 gorras NY y pantalones de marca.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span><strong>2 prendas de regalo:</strong> Blusita artesanal con bordado rojo + mayón negro gratis.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                  <span><strong>Envío local a domicilio GRATIS</strong> en todo Teziutlán.</span>
                </li>
              </ul>

              {/* Botones */}
              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleBuyLoteWhatsApp}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs py-3 px-5 rounded-xs tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Comprar Lote por WhatsApp ($1,830 MXN)
                </button>
                <button
                  onClick={handleAddLoteCart}
                  className="bg-white/10 hover:bg-white hover:text-black text-white text-xs font-semibold py-3 px-4 rounded-xs border border-white/20 tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {loteAdded ? "Agregado al carrito" : "Agregar al carrito"}
                </button>
              </div>
            </div>

            {/* Resumen de marcas del lote */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: "Levi's", type: "Chamarra" },
                { name: "Nike", type: "Sudadera" },
                { name: "2 Gorras NY", type: "Accesorios" },
                { name: "American Eagle", type: "Pantalón" },
                { name: "APT.9", type: "Pantalón" },
                { name: "ANDREA", type: "Short" },
              ].map((item, i) => (
                <div key={i} className="aspect-[3/4] bg-neutral-950 rounded-xs overflow-hidden border border-neutral-800 p-2 flex flex-col items-center justify-center text-center relative select-none">
                  <span className="text-xs font-bold text-white mb-0.5">{item.name}</span>
                  <span className="text-[10px] text-neutral-400 font-mono uppercase">{item.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN: NUEVO (OTRAS MARCAS) */}
      <section className="py-8 md:py-12 border-b border-neutral-100 max-w-5xl mx-auto px-4 w-full">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Prendas nuevas con o sin etiqueta
            </span>
            <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900 tracking-tight">
              Nuevo
            </h2>
            <p className="text-[13px] text-neutral-500 mt-0.5">
              Piezas nuevas seleccionadas de marcas reconocidas para entrega inmediata.
            </p>
          </div>
          <Link
            to="/catalogo"
            search={{ condicion: "nuevo" }}
            className="text-xs font-semibold text-neutral-600 hover:text-black inline-flex items-center gap-1 flex-shrink-0 ml-2"
          >
            Ver catálogo nuevo <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
          {products
            .filter((p) => p.label === "NUEVO" || p.condition.startsWith("nuevo"))
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      {/* 3. SECCIÓN: SELECCIONADA (ROPA DE USO REVISADA) */}
      <section className="py-8 md:py-12 border-b border-neutral-100 max-w-5xl mx-auto px-4 w-full bg-neutral-50/50">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Prendas de uso en excelente estado
            </span>
            <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900 tracking-tight">
              Seleccionada
            </h2>
            <p className="text-[13px] text-neutral-500 mt-0.5">
              Inspeccionada prenda por prenda, limpia y sin desgaste notable.
            </p>
          </div>
          <Link
            to="/catalogo"
            search={{ condicion: "como-nuevo" }}
            className="text-xs font-semibold text-neutral-600 hover:text-black inline-flex items-center gap-1 flex-shrink-0 ml-2"
          >
            Ver seleccionadas <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
          {products
            .filter((p) => p.label === "SELECCIONADA")
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      {/* 4. SECCIÓN: PRENDAS DESTACADAS — CARRUSEL HORIZONTAL */}
      <section className="py-8 md:py-12 border-b border-neutral-100 max-w-5xl mx-auto px-4 w-full">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Selección de la semana
            </span>
            <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900 tracking-tight">
              Prendas Destacadas
            </h2>
          </div>
          <div className="text-[11px] text-neutral-400">
            Desliza a los lados
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar -mx-4 px-4">
          {featuredProducts.map((p) => (
            <div key={p.id} className="min-w-[170px] sm:min-w-[210px] max-w-[210px] flex-shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. SECCIÓN: THE LION ORIGINALS — TIENDA OFICIAL (PRÓXIMAMENTE 2027) */}
      <section id="originals" className="py-12 md:py-16 bg-neutral-950 text-white w-full border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-bold tracking-widest bg-amber-400 text-black px-2 py-0.5 rounded-xs uppercase">
                  TIENDA OFICIAL
                </span>
                <span className="text-[9px] font-bold tracking-widest border border-neutral-700 text-neutral-300 px-2 py-0.5 rounded-xs uppercase">
                  PRÓXIMAMENTE 2027
                </span>
              </div>

              <h2 className="text-[26px] md:text-[32px] font-black tracking-tight leading-tight">
                THE LION ORIGINALS
              </h2>

              <p className="text-[13px] text-neutral-400 mt-3 leading-relaxed">
                Nuestra propia marca oficial de ropa deportiva, tenis, mochilas y accesorios. Colección Drop 01 en proceso de confección exclusiva.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-neutral-300 font-medium">
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xs">Ropa de gym</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xs">Tenis urbanos</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xs">Mochilas</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xs">Accesorios</span>
              </div>

              {/* Sin precios ni botones de compra — solo lista de espera */}
              <form onSubmit={handleWaitlistSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="Tu nombre o alias"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 text-white px-3 py-2 text-xs rounded-xs outline-none focus:border-amber-400 flex-1 placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 text-xs font-bold rounded-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Lista de espera
                </button>
              </form>
              <p className="text-[10px] text-neutral-500 mt-2">
                Sin venta activa todavía. Notificación directa por WhatsApp al salir el Drop 01.
              </p>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80"
                alt="The Lion Originals Tienda Oficial"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">Marca Oficial en Preparación</div>
                <div className="text-sm font-semibold">Drop 01 · 2027</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECCIÓN: DONACIONES / COMUNIDAD (LISTA DE PRENDAS DISPONIBLES + FORMULARIO) */}
      <section id="donaciones" className="py-12 md:py-16 bg-white border-b border-neutral-100 max-w-5xl mx-auto px-4 w-full scroll-mt-14">
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
            Iniciativa Comunitaria Teziutlán
          </div>
          <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900 tracking-tight">
            Donaciones &amp; Ropa Gratis
          </h2>
          <p className="text-[13px] text-neutral-500 mt-1">
            Prendas en buen estado que se entregan completamente gratis para personas y familias de Teziutlán que lo necesiten.
          </p>
        </div>

        {/* LISTA REAL DE PRENDAS DISPONIBLES PARA DONAR */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3 text-center sm:text-left">
            Prendas disponibles para donación hoy:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DONATION_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-neutral-50 rounded-sm border border-neutral-200 flex sm:flex-col gap-3 items-center sm:items-start"
              >
                <div className="w-20 h-24 sm:w-full sm:h-36 bg-white rounded-xs border border-neutral-200 overflow-hidden flex items-center justify-center p-1 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-black tracking-widest text-white bg-emerald-600 px-1.5 py-0.5 rounded-xs uppercase">
                    GRATIS
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900 mt-1 truncate">{item.name}</h4>
                  <p className="text-[11px] text-neutral-500">{item.size} · {item.category}</p>
                  <p className="text-[10px] text-neutral-600 mt-1 line-clamp-2">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORMULARIO DIRECTO POR WHATSAPP */}
        <div className="max-w-md mx-auto bg-neutral-50 p-5 rounded-sm border border-neutral-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1 text-center">
            Solicitar prenda o donar ropa
          </h3>
          <p className="text-[11px] text-neutral-500 text-center mb-3">
            Coordinamos la entrega sin costo ni trámites complicados:
          </p>
          <form onSubmit={handleDonationSubmit} className="space-y-3">
            <div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDonationType("donar")}
                  className={`py-2 text-xs font-semibold rounded-xs border transition-colors ${
                    donationType === "donar"
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                  }`}
                >
                  Quiero Donar
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType("necesito")}
                  className={`py-2 text-xs font-semibold rounded-xs border transition-colors ${
                    donationType === "necesito"
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                  }`}
                >
                  Necesito Ropa
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                {donationType === "donar" ? "Prendas que deseas donar:" : "¿Qué prenda o talla necesitas?"}
              </label>
              <textarea
                rows={2}
                placeholder={
                  donationType === "donar"
                    ? "Ej. Pantalón de niño talla 10, suéter de mujer..."
                    : "Ej. Solicito la blusita artesanal talla 6 o ropa para niño..."
                }
                value={donationDetail}
                onChange={(e) => setDonationDetail(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-neutral-300 rounded-xs outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 text-xs font-bold tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Enviar por WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}
