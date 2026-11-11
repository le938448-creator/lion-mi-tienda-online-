import { Link } from "@tanstack/react-router";
import { MessageCircle, MapPin, Truck, ShieldCheck } from "lucide-react";
import { STORE_PHONE, STORE_PHONE_DISPLAY } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="bg-black text-white border-t border-neutral-800 text-[13px]">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Columna 1: Marca */}
        <div className="space-y-3">
          <div className="font-black text-lg tracking-tight">THE LION &amp; CO</div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Ropa seleccionada, piezas nuevas de marca y moda urbana en Teziutlan, Puebla.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Teziutlan, Puebla, Mexico</span>
          </div>
        </div>

        {/* Columna 2: Catalogo */}
        <div>
          <div className="text-[11px] font-bold tracking-widest uppercase mb-3 text-neutral-300">CATALOGO</div>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li>
              <Link to="/catalogo" search={{ condicion: "nuevo" }} className="hover:text-white transition-colors">
                Otras Marcas (Nuevas)
              </Link>
            </li>
            <li>
              <Link to="/catalogo" search={{ condicion: "excelente" }} className="hover:text-white transition-colors">
                Prendas Seleccionadas
              </Link>
            </li>
            <li>
              <Link to="/catalogo" search={{ categoria: "hombre" }} className="hover:text-white transition-colors">
                Caballero
              </Link>
            </li>
            <li>
              <Link to="/catalogo" search={{ categoria: "mujer" }} className="hover:text-white transition-colors">
                Mujer
              </Link>
            </li>
            <li>
              <Link to="/catalogo" search={{ categoria: "ninos" }} className="hover:text-white transition-colors">
                Ninos
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Comunidad */}
        <div>
          <div className="text-[11px] font-bold tracking-widest uppercase mb-3 text-neutral-300">COMUNIDAD</div>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li>
              <Link to="/" hash="donaciones" className="hover:text-white transition-colors">
                Donaciones en Teziutlan
              </Link>
            </li>
            <li>
              <Link to="/" hash="originals" className="hover:text-amber-400 transition-colors">
                The Lion Originals (Drop 01 - 2027)
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 4: Envios & WhatsApp */}
        <div>
          <div className="text-[11px] font-bold tracking-widest uppercase mb-3 text-neutral-300">ENTREGAS &amp; CONTACTO</div>
          <div className="space-y-2.5 text-xs text-neutral-400">
            <div className="flex items-start gap-2">
              <Truck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Envio a domicilio en Teziutlan ($30 MXN) · Entrega en punto centrico (Gratis)</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Revisada prenda por prenda antes de entrega</span>
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                  "Hola The Lion & Co, me comunico desde la pagina web."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white px-3 py-2 text-xs font-semibold rounded inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp: {STORE_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-4 text-center text-[11px] text-neutral-600">
        THE LION &amp; CO · Teziutlan, Puebla
      </div>
    </footer>
  );
}
