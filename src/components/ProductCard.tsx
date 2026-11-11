import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

const LABEL_STYLES: Record<string, string> = {
  NUEVO: "bg-black text-white",
  SELECCIONADA: "bg-neutral-900 text-neutral-100",
  DONACION: "bg-emerald-600 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0] || "Unica", 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const primarySize = product.sizes[0] || "Talla unica";

  return (
    <Link to="/producto/$id" params={{ id: product.id }} className="group block">
      <div className="relative aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Etiqueta chica superior izquierda */}
        <span
          className={`absolute top-2 left-2 text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-xs ${
            LABEL_STYLES[product.label] || "bg-black text-white"
          }`}
        >
          {product.label}
        </span>

        {/* Boton agregar al carrito rapido */}
        <button
          onClick={handleAdd}
          className={`absolute bottom-2 right-2 p-1.5 rounded-full transition-all ${
            added
              ? "bg-emerald-600 text-white opacity-100"
              : "bg-white/90 text-black hover:bg-black hover:text-white opacity-90 md:opacity-0 md:group-hover:opacity-100 shadow-xs"
          }`}
          aria-label="Agregar"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="pt-2">
        <div className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider truncate">
          {product.brand}
        </div>
        <div className="text-[13px] font-semibold text-neutral-900 leading-tight mt-0.5 line-clamp-1">
          {product.name}
        </div>
        <div className="text-[12px] text-neutral-500 mt-0.5">
          {primarySize}
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-[15px] font-bold text-black">
            {formatPrice(product.price)}
          </span>
          {product.isOffer && product.oldPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
