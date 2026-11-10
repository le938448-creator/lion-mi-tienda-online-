import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { products, STORE_PHONE, STORE_PHONE_DISPLAY } from "@/lib/products";
import { Recycle, Gift, MessageCircle, ShoppingBag, Dumbbell } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Lion & Co — Teziutlán" },
      {
        name: "description",
        content:
          "The Lion & Co — Moda circular, segunda mano seleccionada, ropa gratis comunitaria y piezas urbanas en Teziutlán, Puebla.",
      },
    ],
  }),
  component: Editorial,
});

// Colores y estilos por sección para diferenciar visualmente
const SECTION_STYLES: Record<
  string,
  {
    accent: string;        // color de acento del overlay al hover
    badge: string;         // estilo del badge de tipo
    badgeText: string;
    badgeIcon?: string;
    tagColor: string;
    titleColor: string;
    cta: string;
    overlayFrom: string;
  }
> = {
  "segunda-mano": {
    accent: "group-hover:from-amber-950/95",
    badge: "bg-amber-400 text-black",
    badgeText: "SEGUNDA MANO",
    badgeIcon: "♻️",
    tagColor: "text-amber-300/80",
    titleColor: "text-amber-50",
    cta: "text-amber-300",
    overlayFrom: "from-black/90 md:group-hover:from-amber-950/95 group-data-[active=true]:from-amber-950/95",
  },
  "hombre": {
    accent: "",
    badge: "bg-white text-black",
    badgeText: "CATÁLOGO",
    tagColor: "text-blue-200/70",
    titleColor: "text-white",
    cta: "text-white",
    overlayFrom: "from-black/90 md:group-hover:from-black/95 group-data-[active=true]:from-black/95",
  },
  "mujer": {
    accent: "",
    badge: "bg-white text-black",
    badgeText: "CATÁLOGO",
    tagColor: "text-pink-200/70",
    titleColor: "text-white",
    cta: "text-white",
    overlayFrom: "from-black/90 md:group-hover:from-black/95 group-data-[active=true]:from-black/95",
  },
  "ropa-gratis": {
    accent: "",
    badge: "bg-emerald-400 text-black",
    badgeText: "GRATIS",
    badgeIcon: "🎁",
    tagColor: "text-emerald-300/80",
    titleColor: "text-emerald-50",
    cta: "text-emerald-300",
    overlayFrom: "from-black/90 md:group-hover:from-emerald-950/95 group-data-[active=true]:from-emerald-950/95",
  },
  "originals": {
    accent: "",
    badge: "bg-amber-400 text-black",
    badgeText: "PRÓXIMAMENTE",
    tagColor: "text-amber-300/80",
    titleColor: "text-white",
    cta: "text-amber-300",
    overlayFrom: "from-black/90 md:group-hover:from-neutral-950/95 group-data-[active=true]:from-neutral-950/95",
  },
};

function CategoryCard({
  cat,
  index,
  total,
  onSelect,
}: {
  cat: any;
  index: number;
  total: number;
  onSelect: (slug: string | null, customSearch?: any) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = useState(false);
  const style = SECTION_STYLES[cat.styleKey] || SECTION_STYLES["hombre"];

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.55 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={() => onSelect(cat.slug, cat.customSearch)}
      data-active={isActive}
      className="group relative overflow-hidden border-b border-white/10 md:border-b-0 md:border-r last:border-r-0 min-h-[52vh] md:min-h-[calc(100vh-116px)] text-left focus:outline-none"
    >
      {/* Imagen de fondo */}
      <img
        src={cat.img}
        alt={cat.title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ease-out grayscale opacity-65 md:group-hover:scale-[1.06] md:group-hover:grayscale-0 md:group-hover:opacity-100 group-data-[active=true]:scale-[1.06] group-data-[active=true]:grayscale-0 group-data-[active=true]:opacity-100"
      />
      {/* Gradiente con color de acento */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${style.overlayFrom} via-black/20 to-black/30 transition-all duration-700`}
      />

      {/* Badge de tipo de sección (esquina superior izquierda) */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
        <span className={`${style.badge} text-[9px] md:text-[10px] font-black tracking-[0.2em] px-2.5 py-1 uppercase`}>
          {cat.badgeIcon && `${cat.badgeIcon} `}{style.badgeText}
        </span>
      </div>

      {/* Contador de prendas (esquina superior derecha, vertical) */}
      <div
        className="absolute top-4 md:top-8 right-3 md:right-5 text-white/50 font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        {cat.pieces}
      </div>

      {/* Código editorial (top left bajo el badge) */}
      <div className="absolute top-12 md:top-16 left-4 md:left-6 flex items-center gap-2 text-white/40 font-mono text-[8px] md:text-[10px] tracking-[0.25em] uppercase">
        <span className="h-px w-5 md:w-7 bg-white/30 transition-all duration-500 md:group-hover:w-12 group-data-[active=true]:w-12" />
        {cat.code}
      </div>

      {/* Subtítulo al centro (aparece al hover) */}
      <div className="absolute top-1/2 left-6 md:left-8 right-6 md:right-8 -translate-y-1/2 text-center opacity-0 translate-y-2 pointer-events-none transition-all duration-700 md:group-hover:opacity-100 md:group-hover:translate-y-0 group-data-[active=true]:opacity-100 group-data-[active=true]:translate-y-0">
        <span className="font-heading italic text-white/80 text-sm md:text-xl" style={{ fontWeight: 300, letterSpacing: "0.02em" }}>
          « {cat.subtitle} »
        </span>
      </div>

      {/* Info principal (parte inferior) */}
      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 right-4 md:right-8 z-10">
        <div className={`h-px w-10 md:w-14 ${cat.accentLine || "bg-white/40"} mb-3 transition-all duration-700 md:group-hover:w-24 group-data-[active=true]:w-24`} />
        <p className={`font-mono text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase mb-2 ${style.tagColor}`}>
          {cat.tags}
        </p>
        <h2 className={`font-heading overflow-hidden ${style.titleColor}`} style={{ fontSize: "clamp(26px, 4vw, 72px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1 }}>
          <span className="inline-block transition-transform duration-700 md:group-hover:-translate-y-1 group-data-[active=true]:-translate-y-1">
            {cat.title}
          </span>
        </h2>
        <div className="mt-3 md:mt-4 flex items-center justify-between">
          <span className={`font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-bold ${style.cta} transition-all duration-500`}>
            {cat.ctaLabel || "Ver Prendas"} →
          </span>
          <span className="text-white/25 font-mono text-[8px] tracking-[0.2em]">
            0{index + 1} / 0{total}
          </span>
        </div>
      </div>
    </button>
  );
}

function Editorial() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [showSplash, setShowSplash] = useState(true);

  // Cantidades calculadas automáticamente del inventario real
  const hombreCount = products.filter((p) => p.category === "hombre").length;
  const mujerCount = products.filter((p) => p.category === "mujer").length;
  const segundaManoCount = products.filter((p) => p.isSecondHand).length;
  const ninos = products.filter((p) => p.category === "ninos").length;

  const CATEGORIES = [
    {
      code: "01 / CIRCULAR",
      title: "SEGUNDA MANO",
      subtitle: "Prendas únicas a precios reales",
      tags: "MODA CIRCULAR · TEZIUTLÁN · SALDOS",
      pieces: `${segundaManoCount} prendas`,
      img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=90&fit=crop",
      slug: "segunda-mano",
      styleKey: "segunda-mano",
      accentLine: "bg-amber-400/60",
      ctaLabel: "Ver Segunda Mano",
      customSearch: { categoria: "segunda-mano" },
    },
    {
      code: "02 / CATÁLOGO",
      title: "HOMBRE",
      subtitle: "Streetwear & básicos urbanos",
      tags: "OVERSIZE · HOODIES · CARGOS",
      pieces: `${hombreCount} prendas`,
      img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1400&q=90&fit=crop",
      slug: "hombre",
      styleKey: "hombre",
      accentLine: "bg-white/40",
      ctaLabel: "Ver Hombre",
      customSearch: { categoria: "hombre" },
    },
    {
      code: "03 / CATÁLOGO",
      title: "MUJER",
      subtitle: "Básicos y prendas de temporada",
      tags: "CASUAL · BLUSAS · VESTIDOS",
      pieces: `${mujerCount} prendas`,
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1400&q=90&fit=crop",
      slug: "mujer",
      styleKey: "mujer",
      accentLine: "bg-white/40",
      ctaLabel: "Ver Mujer",
      customSearch: { categoria: "mujer" },
    },
    {
      code: "04 / COMUNIDAD",
      title: "ROPA GRATIS",
      subtitle: "Para quien lo necesite, sin juicios",
      tags: "DONAR · RECIBIR · TEZIUTLÁN",
      pieces: "Iniciativa comunitaria",
      img: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=1400&q=90&fit=crop",
      slug: "ropa-gratis",
      styleKey: "ropa-gratis",
      accentLine: "bg-emerald-400/60",
      ctaLabel: "Donar o Recibir",
      customSearch: null,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  const handleSelectCategory = (slug: string | null, customSearch?: any) => {
    if (slug === "ropa-gratis") {
      navigate({ to: "/tienda" });
      return;
    }
    if (customSearch) {
      navigate({ to: "/catalogo", search: customSearch });
    } else if (slug) {
      navigate({ to: "/catalogo", search: { categoria: slug } });
    } else {
      navigate({ to: "/catalogo" });
    }
  };

  return (
    <>
      {/* SPLASH SCREEN — solo nombre, sin imagen de cruz */}
      <div
        className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${
          showSplash ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="font-heading text-4xl md:text-7xl text-white tracking-tight" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
          THE LION &amp; CO
        </div>
        <div className="mt-3 text-white/40 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase">
          Teziutlán, Puebla · México
        </div>
      </div>

      {/* Cursores animados */}
      <div className="cursor-dot hidden md:block" style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-ring hidden md:block" style={{ left: ringPos.x, top: ringPos.y }} />

      <div className="min-h-screen bg-black text-white flex flex-col">

        {/* BARRA SUPERIOR: accesos directos */}
        <div className="bg-black border-b border-white/10 px-4 md:px-8 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] z-10">
          <div className="text-white/50 tracking-widest font-mono text-[10px] uppercase hidden md:block">
            📍 Teziutlán, Pue. · Moto $30 o entrega en centro
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/catalogo"
              search={{ categoria: "segunda-mano" }}
              className="bg-amber-400 text-black px-3 py-1 font-black text-[10px] tracking-wider uppercase flex items-center gap-1 hover:bg-amber-300 transition-colors"
            >
              <Recycle className="w-3 h-3" /> SEGUNDA MANO
            </Link>
            <Link
              to="/tienda"
              className="border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black px-3 py-1 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 transition-colors"
            >
              <Gift className="w-3 h-3" /> ROPA GRATIS
            </Link>
            <Link
              to="/tienda"
              className="border border-white/20 text-white/60 hover:text-white px-3 py-1 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 transition-colors"
            >
              <ShoppingBag className="w-3 h-3" /> TIENDA
            </Link>
            <a
              href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                "Hola The Lion & Co, me comunico desde la portada."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold text-[10px] flex items-center gap-1 transition-colors ml-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />{STORE_PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* HEADER — SIN imagen de cruz, solo texto */}
        <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 z-10 gap-3 relative border-b border-white/5">
          {/* Logo solo texto, SIN cruz */}
          <Link
            to="/"
            className="font-heading text-lg md:text-xl font-black tracking-tight hover:opacity-80 transition-opacity flex-shrink-0"
            style={{ letterSpacing: "-0.02em" }}
          >
            THE LION &amp; CO
          </Link>

          {/* Leyenda central del tipo de portada */}
          <div className="hidden md:flex items-center gap-6 text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase">
            <span className="flex items-center gap-1.5 text-amber-400/80">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Segunda Mano
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/60 inline-block" />
              Catálogo
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Ropa Gratis
            </span>
          </div>

          {/* Navegación derecha */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-6 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            <Link to="/catalogo" search={{ categoria: "segunda-mano" }} className="text-amber-400 font-bold hover:text-amber-300 transition-colors">
              SEGUNDA MANO
            </Link>
            <Link to="/catalogo" search={{ categoria: "hombre" }} className="text-white/60 hover:text-white transition-colors">
              HOMBRE
            </Link>
            <Link to="/catalogo" search={{ categoria: "mujer" }} className="text-white/60 hover:text-white transition-colors">
              MUJER
            </Link>
            <Link to="/catalogo" search={{ categoria: "ninos" }} className="text-white/60 hover:text-white transition-colors">
              NIÑOS
            </Link>
            <Link to="/catalogo" search={{ ofertas: "true" }} className="text-white/60 hover:text-white transition-colors">
              OFERTAS
            </Link>
            <Link to="/tienda" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
              ROPA GRATIS
            </Link>
          </nav>
        </header>

        {/* GRID DE 4 SECCIONES */}
        <section className="flex-1 grid grid-cols-1 md:grid-cols-4 relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white/50 font-mono text-[9px] tracking-[0.25em] uppercase mix-blend-difference pointer-events-none hidden md:block">
            Elige una sección
          </div>

          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              cat={cat}
              index={i}
              total={CATEGORIES.length}
              onSelect={handleSelectCategory}
            />
          ))}
        </section>

        {/* PIE EDITORIAL */}
        <footer className="flex flex-col sm:flex-row justify-between items-center px-6 md:px-8 py-4 text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase border-t border-white/5 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Moda Circular
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Ropa Gratis
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" /> Catálogo
            </span>
          </div>
          <span>Teziutlán, Puebla, México</span>
        </footer>
      </div>
    </>
  );
}
