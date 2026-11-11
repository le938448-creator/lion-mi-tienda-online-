import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products, formatPrice, STORE_PHONE, STORE_PHONE_DISPLAY } from "@/lib/products";
import { ArrowRight, ChevronRight, Sparkles, Send, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE LION & CO — Teziutlan" },
      {
        name: "description",
        content: "THE LION & CO: Tienda oficial, prendas seleccionadas, moda urbana y donaciones comunitarias en Teziutlan, Puebla.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();

  // 4 a 6 prendas destacadas para el carrusel horizontal
  const featuredProducts = products.filter((p) => p.price > 0).slice(0, 6);

  // Lista de espera Originals
  const [waitlistName, setWaitlistName] = useState("");

  // Donaciones / Comunidad
  const [donationType, setDonationType] = useState<"donar" | "necesito">("donar");
  const [donationDetail, setDonationDetail] = useState("");

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
      <SiteHeader />

      {/* HERO — FOTO DE LA MUJER COMPLETA */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:h-[80vh] min-h-[460px] max-h-[700px] overflow-hidden bg-neutral-900">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85&fit=crop"
          alt="THE LION & CO"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

        <div className="relative z-10 h-full max-w-5xl mx-auto px-5 flex flex-col justify-between py-8 md:py-12">
          {/* Arriba: THE LION & CO */}
          <div>
            <h1 className="text-white font-black tracking-tight text-2xl md:text-4xl uppercase">
              THE LION &amp; CO
            </h1>
            <p className="text-white/70 text-xs md:text-sm tracking-widest uppercase mt-0.5">
              Teziutlan, Puebla
            </p>
          </div>

          {/* Abajo: Tienda Oficial + Boton delgado "Entrar a la tienda" */}
          <div className="space-y-3">
            <div>
              <span className="text-amber-400 text-[11px] font-bold tracking-widest uppercase block mb-1">
                Coleccion 2026
              </span>
              <h2 className="text-white text-2xl md:text-3xl font-black tracking-tight">
                Tienda Oficial
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-100 px-6 py-2.5 text-xs font-semibold rounded-sm tracking-wider transition-colors"
            >
              Entrar a la tienda <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 1. SECCION: TIENDA OFICIAL */}
      <section className="py-8 md:py-12 border-b border-neutral-100 max-w-5xl mx-auto px-4 w-full">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Lo nuevo &amp; Curado
            </span>
            <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900 tracking-tight">
              Tienda Oficial
            </h2>
          </div>
          <Link
            to="/catalogo"
            className="text-xs font-semibold text-neutral-600 hover:text-black inline-flex items-center gap-1"
          >
            Ver todo <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categorias de acceso directo estilo Instagram / Nike */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { label: "Mujer", sub: "Prendas y vestidos", cat: "mujer", img: "/products/p1.jpg" },
            { label: "Caballero", sub: "Streetwear y basicos", cat: "hombre", img: "/products/p8.jpg" },
            { label: "Ninos", sub: "Mezclilla y casual", cat: "ninos", img: "/products/p16.jpg" },
            { label: "Accesorios", sub: "Gorras y complementos", cat: "accesorios", img: "/products/p9.jpg" },
          ].map((cat) => (
            <Link
              key={cat.label}
              to="/catalogo"
              search={{ categoria: cat.cat }}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 block"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <div className="text-xs font-bold">{cat.label}</div>
                <div className="text-[10px] text-white/70">{cat.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. SECCION: OTRAS MARCAS */}
      <section className="py-8 md:py-12 border-b border-neutral-100 max-w-5xl mx-auto px-4 w-full">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Prendas nuevas con etiqueta
            </span>
            <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900 tracking-tight">
              Otras Marcas
            </h2>
            <p className="text-[13px] text-neutral-500 mt-0.5">
              Piezas nuevas de marcas reconocidas seleccionadas exclusivamente para Teziutlan.
            </p>
          </div>
          <Link
            to="/catalogo"
            search={{ condicion: "nuevo" }}
            className="text-xs font-semibold text-neutral-600 hover:text-black inline-flex items-center gap-1 flex-shrink-0 ml-2"
          >
            Ver nuevas <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid de 2 en movil */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
          {products
            .filter((p) => p.label === "NUEVO" || p.condition.startsWith("nuevo"))
            .concat(products.filter((p) => p.brand === "LEVI'S" || p.brand === "NIKE"))
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      {/* 3. SECCION: SELECCIONADA */}
      <section className="py-8 md:py-12 border-b border-neutral-100 max-w-5xl mx-auto px-4 w-full bg-neutral-50/50">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Curaduria individual
            </span>
            <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900 tracking-tight">
              Seleccionada
            </h2>
            <p className="text-[13px] text-neutral-500 mt-0.5">
              Prenda por prenda inspeccionada, limpia y en excelente estado. Piezas unicas con medidas reales.
            </p>
          </div>
          <Link
            to="/catalogo"
            search={{ condicion: "excelente" }}
            className="text-xs font-semibold text-neutral-600 hover:text-black inline-flex items-center gap-1 flex-shrink-0 ml-2"
          >
            Ver catalogo <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
          {products
            .filter((p) => p.label === "SELECCIONADA" && p.price > 0)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      {/* 4. SECCION: PRENDAS DESTACADAS — CARRUSEL HORIZONTAL (4-6 PRENDAS) */}
      <section className="py-8 md:py-12 border-b border-neutral-100 max-w-5xl mx-auto px-4 w-full">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Favoritas de la semana
            </span>
            <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900 tracking-tight">
              Prendas Destacadas
            </h2>
          </div>
          <div className="text-[11px] text-neutral-400">
            Desliza para ver mas
          </div>
        </div>

        {/* Carrusel horizontal deslizante estilo Nike */}
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar -mx-4 px-4">
          {featuredProducts.map((p) => (
            <div key={p.id} className="min-w-[170px] sm:min-w-[210px] max-w-[210px] flex-shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. SECCION: THE LION ORIGINALS — PROXIMAMENTE (DROP 01, 2027) */}
      <section id="originals" className="py-12 md:py-16 bg-neutral-950 text-white w-full border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-bold tracking-widest bg-amber-400 text-black px-2 py-0.5 rounded-xs uppercase">
                  DROP 01
                </span>
                <span className="text-[11px] font-mono text-neutral-400 tracking-wider">
                  2027
                </span>
              </div>

              <h2 className="text-[26px] md:text-[32px] font-black tracking-tight leading-tight">
                THE LION ORIGINALS
              </h2>

              <p className="text-[13px] text-neutral-400 mt-3 leading-relaxed">
                Nuestra propia linea de ropa de gym, tenis, mochilas y accesorios deportivos. Hecha para entrenar duro, silueta limpia y corte comodo.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-neutral-300 font-medium">
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xs">Ropa de gym</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xs">Tenis urbanos</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xs">Mochilas</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xs">Accesorios</span>
              </div>

              {/* Formulario lista de espera por WhatsApp */}
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
                Aviso prioritario por WhatsApp antes del lanzamiento oficial.
              </p>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80"
                alt="The Lion Originals Drop 01"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] font-bold text-amber-400 tracking-wider">PROXIMAMENTE</div>
                <div className="text-sm font-semibold">Drop 01 · Coleccion Gym &amp; Street</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECCION: DONACIONES / COMUNIDAD (SIN CUENTAS, DIRECTO POR WHATSAPP) */}
      <section id="donaciones" className="py-12 md:py-16 bg-white border-b border-neutral-100 max-w-5xl mx-auto px-4 w-full">
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
            Iniciativa Comunitaria
          </div>
          <h2 className="text-[20px] md:text-[22px] font-bold text-neutral-900 tracking-tight">
            Donaciones / Comunidad
          </h2>
          <p className="text-[13px] text-neutral-500 mt-1">
            Recibimos ropa en buen estado que ya no uses y la ponemos a disposicion gratis para familias en Teziutlan. Sin cuentas de usuario.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-neutral-50 p-5 rounded-sm border border-neutral-200">
          <form onSubmit={handleDonationSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Que deseas hacer?
              </label>
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
                {donationType === "donar" ? "Prendas que deseas donar" : "Tallas o prendas que necesitas"}
              </label>
              <textarea
                rows={2}
                placeholder={
                  donationType === "donar"
                    ? "Ej. 2 pantalones de nino talla 10, sueter de dama..."
                    : "Ej. Ropa para nino de 8 anos o playera talla M..."
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
