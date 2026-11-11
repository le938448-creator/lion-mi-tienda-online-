import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, MessageCircle, ShoppingBag, ShieldCheck, Tag } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatPrice, products, STORE_PHONE, conditionLabels } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/producto/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — THE LION & CO` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-bold mb-2">Prenda no encontrada</h2>
      <p className="text-neutral-500 mb-6 text-xs">Esta prenda ya no esta disponible o cambio de enlace.</p>
      <Link to="/catalogo" className="bg-black text-white px-5 py-2 text-xs font-semibold rounded-xs">
        Ver catalogo
      </Link>
    </div>
  ),
  component: ProductoDetalle,
});

function ProductoDetalle() {
  const { product } = Route.useLoaderData();
  const hasSizes = product.sizes.length > 0;
  const [size, setSize] = useState<string | number | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const { addItem } = useCart();

  useEffect(() => {
    if (product.sizes.length === 1) {
      setSize(product.sizes[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (hasSizes && !size) return;
    addItem(product, size ?? "Unica", 1);
  };

  const handleDirectWhatsApp = () => {
    const selectedSizeText = size ? `(Talla: ${size})` : "";
    const message = `*Hola THE LION & CO, me interesa esta prenda:*

*Producto:* ${product.name} ${selectedSizeText}
*Precio:* ${formatPrice(product.price)}
*Condicion:* ${conditionLabels[product.condition] || product.condition}
*Enlace:* ${window.location.href}

Sigue disponible para entrega en Teziutlan?`;
    window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <SiteHeader />
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-16 flex-1 w-full">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-black mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al catalogo
        </Link>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Imagen principal completa sin recortes */}
          <div className="bg-neutral-50 aspect-square sm:aspect-[4/5] rounded-sm overflow-hidden relative border border-neutral-100 flex items-center justify-center p-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            <div className="absolute top-3 left-3 bg-black/85 text-white px-2 py-0.5 text-[10px] font-bold rounded-xs tracking-wider">
              {product.label}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
              {product.brand} · {product.category.toUpperCase()}
            </div>

            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 mt-1">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black">{formatPrice(product.price)}</span>
              {product.isOffer && product.oldPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Condicion y entrega */}
            <div className="mt-4 p-3 bg-neutral-50 rounded-xs border border-neutral-200 text-xs space-y-1.5 text-neutral-700">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-neutral-700" />
                <span>
                  <strong>Estado:</strong> {conditionLabels[product.condition] || "Nuevo con etiqueta"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  <strong>Entrega en Teziutlan:</strong> Envio a domicilio $30 MXN o entrega personal en punto centrico gratis.
                </span>
              </div>
            </div>

            {/* Selector de tallas */}
            {hasSizes && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Talla disponible
                  </div>
                  {product.measurements && (
                    <span className="text-[11px] text-neutral-500">{product.measurements}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-3 py-1.5 border text-xs font-semibold rounded-xs transition ${
                        size === s
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 hover:border-black bg-white text-neutral-800"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={handleAddToCart}
                disabled={hasSizes && !size}
                className="w-full bg-black text-white py-3 text-xs font-semibold rounded-xs tracking-wider disabled:bg-neutral-300 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Agregar al carrito
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full border border-neutral-300 hover:border-black text-neutral-900 py-2.5 text-xs font-semibold rounded-xs tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                Pedir por WhatsApp (231 117 48 25)
              </button>
            </div>

            {/* Descripcion */}
            <div className="mt-6 border-t border-neutral-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                Detalles
              </h3>
              <p className="text-neutral-600 text-xs leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
