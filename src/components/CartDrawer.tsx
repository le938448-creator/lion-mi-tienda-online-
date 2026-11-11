import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X, MessageCircle, Truck } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useCart } from "../lib/cart";
import { formatPrice, STORE_PHONE, STORE_PHONE_DISPLAY } from "../lib/products";

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, totalPrice, totalItems, clear } =
    useCart();

  const [shippingMethod, setShippingMethod] = useState<"centro" | "moto">("centro");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const shippingCost = shippingMethod === "moto" ? 30 : 0;
  const grandTotal = totalPrice + shippingCost;

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    const shippingText =
      shippingMethod === "moto"
        ? "Envio en moto en Teziutlan (+$30 MXN)"
        : "Entrega personal en el Centro de Teziutlan (Gratis)";

    const itemsSummary = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.product.name} (Talla: ${i.size}) - ${formatPrice(i.product.price * i.quantity)}`
      )
      .join("\n");

    const message = `*PEDIDO — THE LION & CO*

*Prendas:*
${itemsSummary}

*Metodo de entrega:*
${shippingText}
${address.trim() ? `*Referencia / Direccion:* ${address.trim()}` : ""}
${customerName.trim() ? `*Nombre:* ${customerName.trim()}` : ""}

*Total de prendas:* ${formatPrice(totalPrice)}
*Envio:* ${shippingCost > 0 ? formatPrice(shippingCost) : "Gratis"}
*TOTAL:* ${formatPrice(grandTotal)}

Hola, quiero confirmar la disponibilidad de este pedido para entrega en Teziutlan.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_PHONE}?text=${encoded}`, "_blank");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 gap-0 bg-white">
        <SheetHeader className="px-5 py-4 border-b border-neutral-100">
          <SheetTitle className="text-xs font-bold tracking-widest flex items-center justify-between text-black">
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              CARRITO ({totalItems})
            </span>
            <span className="text-neutral-500 font-normal text-[11px]">Teziutlan, Pue.</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="w-10 h-10 text-neutral-300 mb-3" />
            <p className="text-sm font-semibold text-neutral-800">Tu carrito esta vacio</p>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs">
              Agrega prendas para pedirlas directamente por WhatsApp.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-5 text-xs font-semibold px-4 py-2 border border-black rounded-sm hover:bg-black hover:text-white transition-colors"
            >
              Ver catalogo
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-3 divide-y divide-neutral-100">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 py-3">
                  <div className="w-16 h-20 bg-neutral-100 rounded-xs flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                          {item.product.brand}
                        </div>
                        <div className="font-semibold text-xs text-neutral-900 truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          Talla: <span className="text-black font-medium">{item.size}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Eliminar"
                        className="text-neutral-400 hover:text-black p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-2.5">
                      <div className="flex items-center border border-neutral-200 rounded-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Restar"
                          className="px-2 py-0.5 text-neutral-600 hover:bg-neutral-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Sumar"
                          className="px-2 py-0.5 text-neutral-600 hover:bg-neutral-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-xs text-black">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={clear}
                  className="text-[11px] text-neutral-400 hover:text-neutral-700 flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Vaciar carrito
                </button>
              </div>
            </div>

            {/* Opciones de entrega claras */}
            <div className="border-t border-neutral-200 px-5 py-3.5 bg-neutral-50/70 space-y-2.5 text-xs">
              <div>
                <label className="text-[11px] font-bold text-neutral-700 flex items-center gap-1.5 mb-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-600" /> Metodo de entrega:
                </label>
                <div className="space-y-1">
                  <label className="flex items-center justify-between p-2 rounded-xs border bg-white cursor-pointer hover:border-black transition-colors">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "centro"}
                        onChange={() => setShippingMethod("centro")}
                      />
                      <span>Entrega en el Centro (Teziutlan)</span>
                    </div>
                    <span className="font-bold text-emerald-700">Gratis</span>
                  </label>
                  <label className="flex items-center justify-between p-2 rounded-xs border bg-white cursor-pointer hover:border-black transition-colors">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "moto"}
                        onChange={() => setShippingMethod("moto")}
                      />
                      <span>Moto servicio en Teziutlan</span>
                    </div>
                    <span className="font-bold text-black">+$30 MXN</span>
                  </label>
                </div>
              </div>

              {/* Referencia opcional */}
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="text"
                  placeholder="Tu nombre (opcional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-xs p-1.5 border border-neutral-200 rounded-xs bg-white outline-none focus:border-black"
                />
                <input
                  type="text"
                  placeholder="Colonia o punto de entrega"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-xs p-1.5 border border-neutral-200 rounded-xs bg-white outline-none focus:border-black"
                />
              </div>

              {/* Total */}
              <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline">
                <div>
                  <span className="text-[11px] text-neutral-500">Total a pagar:</span>
                  <div className="text-[16px] font-bold text-black">{formatPrice(grandTotal)}</div>
                </div>
                <div className="text-right text-[11px] text-neutral-400">
                  {shippingCost > 0 ? "Incluye envio en moto" : "Entrega en centro gratis"}
                </div>
              </div>

              {/* Boton finalizar pedido WhatsApp */}
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full bg-black hover:bg-neutral-800 text-white py-3 px-4 text-xs font-semibold rounded-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Finalizar compra por WhatsApp
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
