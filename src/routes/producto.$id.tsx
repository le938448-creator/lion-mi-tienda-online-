import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, MessageCircle, ShoppingBag, ShieldCheck, Tag } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatPrice, products, STORE_PHONE } from "@/lib/products";
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
          { title: `${loaderData.product.name} — The Lion & Co` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">Producto no encontrado</h2>
      <p className="text-neutral-500 mb-6 text-sm">Esta prenda ya no está disponible o el enlace cambió.</p>
      <Link to="/catalogo" className="bg-black text-white px-6 py-2.5 text-xs font-bold tracking-widest">
        VER CATÁLOGO
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-sm text-neutral-600">
      {error.message}
    </div>
  ),
  component: ProductoDetalle,
});

function ProductoDetalle() {
  const { product } = Route.useLoaderData();
  const hasSizes = product.sizes.length > 0;
  // If only 1 size (like "10-12" or "Ajustable"), auto-select it
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
    addItem(product, size ?? "Única", 1);
  };

  const handleDirectWhatsApp = () => {
    const selectedSizeText = size ? `(Talla: ${size})` : "";
    const message = `👋 *Hola The Lion & Co, me interesa esta prenda:*

👕 *Producto:* ${product.name} ${selectedSizeText}
💰 *Precio:* ${formatPrice(product.price)}
${product.condition ? `🏷️ *Condición:* ${product.condition}` : ""}
🔗 *Enlace:* ${window.location.href}

¿Sigue disponible para entrega en Teziutlán?`;
    window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-20">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest hover:opacity-60"
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER AL CATÁLOGO
        </Link>

        <div className="mt-6 grid md:grid-cols-2 gap-12">
          {/* Imagen principal */}
          <div className="bg-neutral-100 aspect-square overflow-hidden relative border border-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.condition && (
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold tracking-wider">
                {product.condition}
              </div>
            )}
            {product.isSecondHand && (
              <div className="absolute bottom-4 left-4 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 text-[11px] font-bold tracking-wide">
                ♻️ Moda Circular · Pieza Única
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
              <span className="font-bold text-black">{product.brand}</span>
              <span>•</span>
              <span>{product.category.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-black">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-lg text-neutral-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Condición y Garantía local */}
            <div className="mt-5 p-3.5 bg-neutral-50 border border-neutral-200 rounded text-xs space-y-1.5 text-neutral-700">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-neutral-800" />
                <span>
                  <strong>Condición:</strong> {product.condition || "En excelentes condiciones"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  <strong>Entrega inmediata en Teziutlán:</strong> moto servicio o punto céntrico.
                </span>
              </div>
            </div>

            {/* Selector de tallas */}
            {hasSizes && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs font-bold tracking-widest">
                    TALLA DISPONIBLE {product.sizes.length === 1 && "(PIEZA ÚNICA)"}
                  </div>
                  {product.measurements && (
                    <span className="text-[11px] text-neutral-500">{product.measurements}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-4 py-2.5 border text-xs font-bold tracking-wider transition ${
                        size === s
                          ? "border-black bg-black text-white"
                          : "border-neutral-300 hover:border-black bg-white"
                      }`}
                    >
                      Talla {s}
                    </button>
                  ))}
                </div>
                {!size && (
                  <p className="mt-2 text-xs text-amber-700 font-medium">
                    Por favor selecciona una talla para continuar.
                  </p>
                )}
              </div>
            )}

            {/* Botones de acción */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={hasSizes && !size}
                className="w-full bg-black text-white py-4 text-xs font-bold tracking-widest disabled:bg-neutral-300 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                AGREGAR AL CARRITO
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full border-2 border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white py-3.5 text-xs font-bold tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                PREGUNTAR POR WHATSAPP (231 117 48 25)
              </button>
            </div>

            {/* Descripción y medidas */}
            <div className="mt-10 border-t border-neutral-200 pt-6">
              <h3 className="text-xs font-bold tracking-widest mb-3">DETALLES DE LA PRENDA</h3>
              <p className="text-neutral-700 text-sm leading-relaxed">{product.description}</p>
              {product.measurements && (
                <div className="mt-4 p-3 bg-neutral-50 border border-neutral-100 text-xs">
                  <span className="font-bold">Medidas exactas:</span> {product.measurements}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
