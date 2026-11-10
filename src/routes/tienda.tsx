import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { brands, products, STORE_PHONE, STORE_PHONE_DISPLAY } from "@/lib/products";
import { ArrowRight, Recycle, Gift, MessageCircle, Send, Sparkles, Dumbbell } from "lucide-react";

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "The Lion & Co — Tienda en Teziutlán" },
      {
        name: "description",
        content:
          "The Lion & Co: Moda circular, ropa de segunda mano seleccionada y piezas streetwear en Teziutlán, Puebla.",
      },
    ],
  }),
  component: Tienda,
});

function Tienda() {
  const featured = products.slice(0, 4);

  // Formulario interactivo de donación / solicitud de ropa
  const [donorName, setDonorName] = useState("");
  const [donationType, setDonationType] = useState<"donar" | "recibir">("donar");
  const [clothingDetails, setClothingDetails] = useState("");

  // Lista de espera para The Lion Originals
  const [waitlistName, setWaitlistName] = useState("");

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const actionText = donationType === "donar" ? "Donar Ropa" : "Solicitar Ropa Gratis";
    const message = `👋 *Hola The Lion & Co! Iniciativa Comunitaria:*

📌 *Acción:* ${actionText}
👤 *Nombre:* ${donorName.trim() || "Anónimo"}
📝 *Detalles de las prendas:* ${clothingDetails.trim() || "Quiero más información"}

📍 *Ubicación:* Teziutlán, Puebla.
¿Cómo podemos coordinar?`;

    window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `🦁 *¡Hola The Lion & Co! Quiero unirme a la lista de espera:*

Nombre: ${waitlistName.trim() || "Un seguidor de La Manada"}
Interés: Próximo drop de ropa deportiva / gym The Lion Originals.

¡Avísenme en cuanto lancen la primera colección!`;

    window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-black text-white">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
          alt="The Lion & Co"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight max-w-3xl">
            THE LION
            <br />
            &amp; CO.
          </h1>
          <p className="mt-5 max-w-lg text-neutral-300 text-sm md:text-base leading-relaxed">
            Ropa de segunda mano en excelente estado, saldos y básicos urbanos. Entrega en moto en Teziutlán ($30 MXN) o entrega directa en el Centro.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/catalogo"
              search={{ categoria: "segunda-mano" }}
              className="bg-amber-400 text-black px-6 py-3.5 text-xs font-bold tracking-widest inline-flex items-center gap-2 hover:bg-amber-300 transition-colors"
            >
              VER SEGUNDA MANO <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/catalogo"
              className="border border-white text-white px-6 py-3.5 text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              EXPLORAR TODO EL CATÁLOGO
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE CON MARCAS REALES */}
      <section className="bg-black text-white py-5 overflow-hidden border-y border-neutral-800">
        <div className="flex gap-12 whitespace-nowrap animate-[scroll_25s_linear_infinite]">
          {[...brands, ...brands, ...brands].map((b, i) => (
            <span key={i} className="text-lg md:text-xl font-black tracking-widest text-neutral-300">
              {b}
            </span>
          ))}
        </div>
        <style>{`@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </section>

      {/* SECCIÓN: THE LION ORIGINALS — DROP 01 */}
      <section id="proximamente" className="relative overflow-hidden bg-black text-white border-b border-neutral-900">

        {/* Fondo con imagen de ambiente gym/street */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=85"
            alt="The Lion Originals"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Texto principal */}
          <div>
            {/* Etiqueta editorial cruda */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-amber-400 text-black text-[9px] font-black tracking-[0.3em] uppercase px-2.5 py-1">
                DROP 01
              </span>
              <span className="text-neutral-500 text-[10px] font-mono tracking-widest uppercase">
                / 2027
              </span>
            </div>

            {/* Título grande con jerarquía visual */}
            <div className="space-y-0 leading-none">
              <div className="font-black text-neutral-500 tracking-[0.3em] text-[11px] md:text-xs uppercase mb-2">
                The Lion
              </div>
              <h2
                className="font-black uppercase leading-none tracking-tight"
                style={{ fontSize: "clamp(52px, 9vw, 120px)", lineHeight: 0.88 }}
              >
                ORIGI
                <span className="text-amber-400">NALS</span>
              </h2>
            </div>

            {/* Copy urbano, directo, sin sonar a marketing corporativo */}
            <div className="mt-8 space-y-3 max-w-sm">
              <p className="text-neutral-200 text-sm md:text-base leading-relaxed font-medium">
                Poco a poco. Sin apuros. Lo que viene es para quedarse.
              </p>
              <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
                Ropa de gym hecha para el que ya está en el proceso — no para el que posa. Piezas contadas. Sin restock. Cuando se acaba, se acabó.
              </p>
            </div>

            {/* Etiquetas de prendas — estilo ticket/tag */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["Playera Oversize", "Hoodie Pesada", "Shorts Gym", "Leggings", "Top Mujer"].map((item) => (
                <span
                  key={item}
                  className="border border-neutral-700 text-neutral-400 text-[10px] font-mono tracking-wider px-3 py-1.5 hover:border-amber-400 hover:text-amber-400 transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Separador sutil */}
            <div className="mt-10 h-px w-24 bg-neutral-800" />

            {/* Formulario lista de espera — sin título genérico */}
            <div className="mt-6">
              <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider mb-3">
                — Entra antes que todos
              </p>
              <form onSubmit={handleWaitlistSubmit} className="flex gap-0">
                <input
                  type="text"
                  placeholder="Tu nombre o alias"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 border-r-0 px-4 py-3 text-xs text-white outline-none focus:border-amber-400 flex-1 placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-black px-5 py-3 text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 transition-colors whitespace-nowrap border border-amber-400"
                >
                  <Sparkles className="w-3 h-3" /> ENTRAR
                </button>
              </form>
              <p className="text-[10px] text-neutral-700 mt-2">
                WhatsApp directo antes del primer drop. Sin spam.
              </p>
            </div>
          </div>

          {/* Columna derecha — foto + datos estadísticos de ambiente */}
          <div className="relative hidden md:block">
            <div className="relative">
              {/* Foto principal */}
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=85"
                alt="Drop 01 — The Lion Originals"
                className="w-full aspect-[3/4] object-cover object-top"
              />

              {/* Overlay con texto editorial sobre la foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Info abajo de la foto */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/50 mb-1">
                      Colección
                    </p>
                    <p className="text-white font-black text-xl tracking-tight">Drop 01</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/50 mb-1">
                      Lanzamiento
                    </p>
                    <p className="text-amber-400 font-black text-xl tracking-tight">2027</p>
                  </div>
                </div>
              </div>

              {/* Badge PRÓXIMAMENTE */}
              <div className="absolute top-4 right-4 border border-amber-400/60 text-amber-400 text-[9px] font-black tracking-[0.25em] px-2.5 py-1 uppercase backdrop-blur-sm">
                Próximamente
              </div>
            </div>

            {/* Línea decorativa lateral */}
            <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />
          </div>

        </div>

        {/* Franja inferior de datos — estilo técnico */}
        <div className="relative z-10 border-t border-neutral-900 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
            <span>The Lion Originals © 2027</span>
            <span>Teziutlán, Pue.</span>
            <span className="text-amber-400/60">Gym · Street · Limited</span>
            <span>No Restock. No Excuses.</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN PRENDAS DESTACADAS */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">
              Selección disponible hoy
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">PRENDAS DESTACADAS</h2>
          </div>
          <Link
            to="/catalogo"
            className="text-xs font-bold tracking-widest border-b border-black pb-1 hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5"
          >
            VER TODO EL CATÁLOGO <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* SECCIÓN SEGUNDA MANO */}
      <section className="bg-[#f7f3ee] py-16 md:py-24 border-y border-[#e8dfd5]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
              alt="Ropa de segunda mano en Teziutlán"
              className="w-full aspect-[4/5] object-cover shadow-md"
            />
            <div className="absolute bottom-6 right-0 bg-black text-white px-5 py-3 text-xs font-bold tracking-widest">
              TEZIUTLÁN · MODA CIRCULAR
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-neutral-700 font-bold mb-4">
              <Recycle className="w-4 h-4 text-emerald-700" />
              Prendas Únicas &amp; Sostenibles
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              ROPA DE
              <br />
              SEGUNDA MANO
            </h2>
            <p className="mt-5 text-neutral-700 text-sm md:text-base leading-relaxed">
              En Teziutlán seleccionamos y revisamos prenda por prenda: desde pantalones y chamarras hasta blusas y vestidos. Prendas limpias, en excelente estado y a una fracción de su costo original.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-neutral-800 font-medium">
              <li className="flex items-center gap-2">✓ Precios desde $100 MXN en ropa infantil y básica</li>
              <li className="flex items-center gap-2">✓ Cada pieza es única: si te gusta, apártala de inmediato</li>
              <li className="flex items-center gap-2">✓ Entrega el mismo día en Teziutlán o punto céntrico</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/catalogo"
                search={{ categoria: "segunda-mano" }}
                className="bg-black text-white px-6 py-3.5 text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
              >
                EXPLORAR PRENDAS USADAS <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                  "Hola The Lion & Co, quiero ver qué ropa de segunda mano tienen disponible hoy."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="border border-black text-black px-6 py-3.5 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" /> PREGUNTAR POR WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ROPA GRATIS & DONACIONES (CON FORMULARIO REAL) */}
      <section id="ropa-gratis" className="bg-black text-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-neutral-700 px-4 py-1.5 text-[11px] tracking-[0.25em] uppercase text-neutral-300 mb-6">
              <Gift className="w-4 h-4 text-amber-400" />
              Iniciativa Comunitaria Teziutlán
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              ROPA GRATIS &amp; DONACIONES
            </h2>
            <p className="mt-5 text-neutral-300 text-sm md:text-base leading-relaxed">
              En The Lion &amp; Co creemos que vestirse bien y con dignidad es para todos. Recibimos ropa en buen estado que ya no uses, la preparamos y la ponemos a disposición sin ningún costo para quienes lo necesiten en Teziutlán.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            {/* Información de cómo funciona */}
            <div className="space-y-6">
              <div className="border border-neutral-800 bg-neutral-950 p-6">
                <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-amber-400" /> ¿Quieres donar?
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Si tienes ropa limpia y en buen estado que ya no uses, contáctanos. Te decimos dónde entregarla en Teziutlán o podemos coordinar para pasar por ella.
                </p>
              </div>

              <div className="border border-neutral-800 bg-neutral-950 p-6">
                <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-emerald-400" /> ¿Necesitas ropa?
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Para ti, tus hijos o tu familia. Sin pena, sin juicios y completamente gratis. Escríbenos por WhatsApp y con gusto te mostramos las piezas disponibles.
                </p>
              </div>

              {/* Botones directos con mensaje predefinido */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                    "Hola The Lion & Co, tengo ropa en buen estado y quiero donarla para la comunidad en Teziutlán."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-black py-3 px-5 text-xs font-bold tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" /> QUIERO DONAR
                </a>
                <a
                  href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                    "Hola The Lion & Co, me gustaría saber qué prendas tienen disponibles en el programa de ropa gratis."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-white py-3 px-5 text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" /> NECESITO ROPA
                </a>
              </div>
            </div>

            {/* Formulario simple para enviar directamente a WhatsApp */}
            <form
              onSubmit={handleCommunitySubmit}
              className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 space-y-4"
            >
              <h3 className="text-lg font-bold tracking-tight">Formulario de Contacto Rápido</h3>
              <p className="text-xs text-neutral-400">
                Llena tus datos y se abrirá WhatsApp con el mensaje listo para enviar:
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  ¿Qué deseas hacer?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDonationType("donar")}
                    className={`py-2 text-xs font-bold border transition-colors ${
                      donationType === "donar"
                        ? "bg-white text-black border-white"
                        : "border-neutral-700 text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    Quiero Donar
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType("recibir")}
                    className={`py-2 text-xs font-bold border transition-colors ${
                      donationType === "recibir"
                        ? "bg-white text-black border-white"
                        : "border-neutral-700 text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    Necesito Ropa
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Tu Nombre
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 text-xs text-white outline-none focus:border-white rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  {donationType === "donar" ? "¿Qué prendas donarías?" : "¿Qué tallas o prendas necesitas?"}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={
                    donationType === "donar"
                      ? "Ej. 2 pantalones de niño talla 10, chamarra de hombre talla M..."
                      : "Ej. Ropa para niño de 8 años o playera de mujer talla M..."
                  }
                  value={clothingDetails}
                  onChange={(e) => setClothingDetails(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 text-xs text-white outline-none focus:border-white rounded-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> ENVIAR POR WHATSAPP ({STORE_PHONE_DISPLAY})
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
