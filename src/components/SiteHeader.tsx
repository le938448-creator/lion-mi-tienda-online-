import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState, useEffect } from "react";
import { STORE_PHONE, STORE_PHONE_DISPLAY } from "@/lib/products";

export function SiteHeader() {
  const { open, totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent scroll when modals are open
  useEffect(() => {
    if (isMobileSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSearchOpen, isMobileMenuOpen]);

  const handleSearch = (e: React.FormEvent, term?: string) => {
    e.preventDefault();
    const query = term || searchQuery.trim();
    if (query) {
      navigate({ to: "/catalogo", search: { q: query } });
      setSearchQuery("");
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Inicio", to: "/tienda" as const, search: undefined, highlight: false },
    { label: "Segunda Mano", to: "/catalogo" as const, search: { categoria: "segunda-mano" }, highlight: true },
    { label: "Hombre", to: "/catalogo" as const, search: { categoria: "hombre" }, highlight: false },
    { label: "Mujer", to: "/catalogo" as const, search: { categoria: "mujer" }, highlight: false },
    { label: "Niños", to: "/catalogo" as const, search: { categoria: "ninos" }, highlight: false },
    { label: "Accesorios", to: "/catalogo" as const, search: { categoria: "accesorios" }, highlight: false },
    { label: "Ofertas", to: "/catalogo" as const, search: { ofertas: "true" }, highlight: false },
    { label: "Ropa Gratis", to: "/tienda" as const, search: undefined, hash: "ropa-gratis", highlight: false },
    { label: "Próximamente", to: "/tienda" as const, search: undefined, hash: "proximamente", highlight: false },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 h-16 md:h-[70px] flex items-center justify-between">
          
          {/* Logo The Lion & Co */}
          <div className="flex items-center">
            <Link
              to="/tienda"
              className="font-black tracking-tight text-xl md:text-2xl hover:opacity-85 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              THE LION &amp; CO
            </Link>
          </div>

          {/* Menú Centrado Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-5 xl:gap-7 text-[14px] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                search={link.search as any}
                className={`transition-all py-1 border-b-2 ${
                  link.highlight
                    ? "text-black font-bold bg-amber-100/70 border-amber-400 px-2.5 rounded-full hover:bg-amber-200"
                    : "border-transparent hover:border-black text-neutral-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Buscador y Carrito */}
          <div className="flex justify-end items-center gap-3 md:gap-4">
            
            {/* Buscador Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex relative group">
              <div className="bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-colors rounded-full flex items-center px-3 py-1.5 border border-neutral-200">
                <button type="submit" aria-label="Buscar" className="hover:opacity-70">
                  <Search className="w-4 h-4 text-neutral-700" />
                </button>
                <input
                  type="text"
                  placeholder="Buscar prendas..."
                  className="bg-transparent border-none outline-none ml-2 text-xs w-28 focus:w-44 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Botón Buscar Móvil */}
            <button
              className="md:hidden p-1.5 hover:opacity-60 transition-opacity"
              aria-label="Buscar"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Carrito */}
            <button
              aria-label="Carrito"
              onClick={open}
              className="p-1.5 hover:opacity-70 relative transition-opacity flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full px-3 py-1.5"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2} />
              <span className="text-xs font-bold">{totalItems}</span>
            </button>

            {/* Menú Hamburguesa Móvil */}
            <button
              className="lg:hidden p-1 hover:opacity-60 transition-opacity"
              aria-label="Menú"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Buscador Móvil Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col p-4 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
            <Search className="w-5 h-5 text-neutral-500" />
            <form onSubmit={handleSearch} className="flex-1">
              <input
                type="text"
                autoFocus
                placeholder="Buscar por prenda, talla..."
                className="w-full text-base outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button onClick={() => setIsMobileSearchOpen(false)} className="p-1">
              <X className="w-6 h-6 text-neutral-700" />
            </button>
          </div>
        </div>
      )}

      {/* Menú Lateral Móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full z-10 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <span className="font-black text-lg tracking-tight">THE LION &amp; CO</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  search={link.search as any}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded text-sm font-semibold transition-colors ${
                    link.highlight
                      ? "bg-amber-100 text-amber-900 font-bold"
                      : "text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-neutral-200 space-y-3">
              <div className="text-xs text-neutral-500 font-mono tracking-wider uppercase">
                Teziutlán, Puebla
              </div>
              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
                  "Hola The Lion & Co, quiero información."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] text-white py-2.5 text-xs font-bold tracking-wider rounded flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                WHATSAPP: {STORE_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
