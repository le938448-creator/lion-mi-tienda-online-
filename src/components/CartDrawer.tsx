import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X, MessageCircle, Truck } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { formatPrice, STORE_PHONE } from "@/lib/products";

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, totalPrice, totalItems, clear } =
    useCart();

  const [shippingMethod, setShippingMethod] = useState<"recoger" | "moto" | "nacional">("moto");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const shippingCost = shippingMethod === "moto" ? 30 : 0;
  const grandTotal = totalPrice + shippingCost;

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    const shippingText =
      shippingMethod === "moto"
        ? "Entrega en moto en Teziutlán (+$30 MXN)"
        : shippingMethod === "recoger"
        ? "Recoger en persona (Centro de Teziutlán - Gratis)"
        : "Envío fuera de Teziutlán (A acordar por WhatsApp)";

    const itemsSummary = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.product.name} (Talla: ${i.size}) - ${formatPrice(i.product.price * i.quantity)}`
      )
      .join("\n");

    const message = `*PEDIDO - THE LION & CO*

*PRODUCTOS:*
${itemsSummary}

*METODO DE ENTREGA:*
${shippingText}
${address.trim() ? `*Direccion / Referencias:* ${address.trim()}` : ""}
${customerName.trim() ? `*Cliente:* ${customerName.trim()}` : ""}

*Subtotal:* ${formatPrice(totalPrice)}
*Envio:* ${shippingCost > 0 ? formatPrice(shippingCost) : "Gratis / Por acordar"}
*TOTAL A PAGAR:* ${formatPrice(grandTotal)}

Hola, deseo confirmar este pedido. ¿Me indican disponibilidad y datos para la entrega?`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_PHONE}?text=${encoded}`, "_blank");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 gap-0">
        <SheetHeader className="px-6 py-5 border-b border-neutral-200">
          <SheetTitle className="text-xs font-bold tracking-widest flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              TU CARRITO ({totalItems})
            </span>
            <span className="text-neutral-500 font-normal">Teziutlán, Pue.</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="w-12 h-12 text-neutral-300 mb-4" />
            <p className="font-semibold">Tu carrito está vacío</p>
            <p className="text-sm text-neutral-500 mt-1">
              Agrega prendas para coordinar tu compra por WhatsApp.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 text-xs font-bold tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
            >
              EXPLORAR PRENDAS
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-200">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <div className="w-20 h-20 bg-neutral-100 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-neutral-500">
                          {item.product.brand}
                        </div>
                        <div className="font-semibold text-sm truncate">{item.product.name}</div>
                        <div className="text-xs text-neutral-600 mt-0.5">
                          Talla: <span className="font-semibold text-black">{item.size}</span>
                        </div>
                        {item.product.condition && (
                          <div className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1">
                            {item.product.condition}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Eliminar"
                        className="text-neutral-400 hover:text-black self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Restar"
                          className="px-2 py-1 hover:bg-neutral-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Sumar"
                          className="px-2 py-1 hover:bg-neutral-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-3 flex justify-between items-center">
                <button
                  onClick={clear}
                  className="text-[10px] tracking-widest text-neutral-500 hover:text-black flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> VACIAR CARRITO
                </button>
              </div>
            </div>

            <div className="border-t border-neutral-200 px-6 py-4 bg-neutral-50 space-y-3">
              {/* Selección de Entrega */}
              <div>
                <label className="text-[11px] font-bold tracking-wider text-neutral-700 flex items-center gap-1 mb-2">
                  <Truck className="w-3.5 h-3.5" /> MÉTODO DE ENTREGA EN TEZIUTLÁN:
                </label>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center justify-between p-2 rounded border bg-white cursor-pointer hover:border-black transition-colors">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "moto"}
                        onChange={() => setShippingMethod("moto")}
                      />
                      <span>Moto servicio en Teziutlán</span>
                    </div>
                    <span className="font-bold">+ $30 MXN</span>
                  </label>
                  <label className="flex items-center justify-between p-2 rounded border bg-white cursor-pointer hover:border-black transition-colors">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "recoger"}
                        onChange={() => setShippingMethod("recoger")}
                      />
                      <span>Recoger en persona (Centro)</span>
                    </div>
                    <span className="font-bold text-emerald-600">GRATIS</span>
                  </label>
                  <label className="flex items-center justify-between p-2 rounded border bg-white cursor-pointer hover:border-black transition-colors">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "nacional"}
                        onChange={() => setShippingMethod("nacional")}
                      />
                      <span>Fuera de Teziutlán</span>
                    </div>
                    <span className="text-neutral-500">Por coordinar</span>
                  </label>
                </div>
              </div>

              {/* Opcional: Dirección / Referencia */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Tu nombre (opcional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-xs p-2 border border-neutral-300 rounded bg-white outline-none focus:border-black"
                />
                <input
                  type="text"
                  placeholder="Colonia / Referencia"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-xs p-2 border border-neutral-300 rounded bg-white outline-none focus:border-black"
                />
              </div>

              {/* Resumen de totales */}
              <div className="space-y-1 pt-2 text-xs border-t border-neutral-200">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal prendas:</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Envío:</span>
                  <span className="font-semibold text-neutral-900">
                    {shippingMethod === "moto"
                      ? "$30 MXN"
                      : shippingMethod === "recoger"
                      ? "Gratis ($0 MXN)"
                      : "A coordinar"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black pt-1 border-t border-neutral-200 text-black">
                  <span>TOTAL A PAGAR:</span>
                  <span className="text-base">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Botón WhatsApp */}
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 text-xs font-bold tracking-widest flex items-center justify-center gap-2 shadow-sm rounded-none transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                FINALIZAR PEDIDO POR WHATSAPP
              </button>

              <button
                onClick={() => setOpen(false)}
                className="w-full text-[11px] font-bold tracking-wider text-neutral-500 hover:text-black text-center pt-1"
              >
                SEGUIR COMPRANDO
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
