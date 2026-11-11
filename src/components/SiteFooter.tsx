import { Link } from "@tanstack/react-router";
import { MessageCircle, MapPin, Truck, ShieldCheck } from "lucide-react";
import { STORE_PHONE, STORE_PHONE_DISPLAY } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="bg-black text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Columna 1: Marca */}
        <div className="space-y-4">
          <div className="font-black text-xl mb-4 tracking-tight">THE LION &amp; CO</div>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Moda circular, saldos y ropa urbana seleccionada en Teziutlán, Puebla. Entregas locales y atención personalizada por WhatsApp.
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Teziutlán, Puebla, México</span>
          </div>
        </div>

        {/* Columna 2: Catálogo */}
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-4 text-white">CATÁLOGO</div>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <Link to="/catalogo" search={{ categoria: "segunda-mano" }} className="hover:text-amber-400 transition-colors font-medium">
                Segunda Mano
              </Link>
            </li>
            <li>
              <Link to="/catalogo" search={{ categoria: "hombre" }} className="hover:text-white transition-colors">
                Hombre
              </Link>
            </li>
            <li>
              <Link to="/catalogo" search={{ categoria: "mujer" }} className="hover:text-white transition-colors">
                Mujer
              </Link>
            </li>
            <li>
              <Link to="/catalogo" search={{ categoria: "ninos" }} className="hover:text-white transition-colors">
                Niños
              </Link>
            </li>
            <li>
              <Link to="/catalogo" search={{ categoria: "accesorios" }} className="hover:text-white transition-colors">
                Accesorios
              </Link>
            </li>
            <li>
              <Link to="/catalogo" search={{ ofertas: "true" }} className="hover:text-neutral-200 transition-colors">
                Ofertas
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Comunidad */}
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-4 text-white">COMUNIDAD</div>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <Link to="/tienda" className="hover:text-white transition-colors">
                Ropa Gratis en Teziutlán
              </Link>
            </li>
            <li>
              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                  "Hola The Lion & Co, quiero donar ropa para la iniciativa comunitaria."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>Quiero Donar Ropa</span>
              </a>
            </li>
            <li>
              <Link to="/tienda" className="hover:text-amber-300 transition-colors">
                The Lion Originals (Gym 2027)
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 4: Envíos & Contacto */}
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-4 text-white">ENVÍOS &amp; AYUDA</div>
          <div className="space-y-3 text-xs text-neutral-400">
            <div className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Moto servicio en Teziutlán: $30 MXN o entrega directa en el Centro (Gratis).</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Revisión de prendas antes de entrega para total satisfacción.</span>
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                  "Hola The Lion & Co, tengo una duda sobre un pedido."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2 rounded text-xs font-bold tracking-wide inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                WhatsApp: {STORE_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} THE LION &amp; CO. Hecho en Teziutlán, Puebla.
      </div>
    </footer>
  );
}
