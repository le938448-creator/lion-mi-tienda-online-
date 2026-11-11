import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { ShoppingBag, Image as ImageIcon } from "lucide-react";

const LABEL_STYLES: Record<string, string> = {
  NUEVO: "bg-black text-white",
  SELECCIONADA: "bg-neutral-900 text-neutral-100",
  DONACION: "bg-emerald-600 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

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
      <div className="relative aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden flex items-center justify-center p-1">
        {imgError || !product.image ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-400 select-none p-3">
            <ImageIcon className="w-6 h-6 stroke-[1.25] text-neutral-300 mb-1" />
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">THE LION</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}

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
              : "bg-white/95 text-black hover:bg-black hover:text-white opacity-90 md:opacity-0 md:group-hover:opacity-100 shadow-sm"
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
