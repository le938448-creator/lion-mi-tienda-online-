import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState, useEffect } from "react";
import { STORE_PHONE, STORE_PHONE_DISPLAY } from "@/lib/products";

export function SiteHeader() {
  const { open, totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    { label: "Tienda Oficial", to: "/catalogo" as const, search: undefined },
    { label: "Otras Marcas", to: "/catalogo" as const, search: { condicion: "nuevo" } },
    { label: "Seleccionada", to: "/catalogo" as const, search: { condicion: "excelente" } },
    { label: "Originals", to: "/" as const, hash: "originals" },
    { label: "Donaciones", to: "/" as const, hash: "donaciones" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

          {/* Boton menu hamburguesa en movil */}
          <button
            className="md:hidden p-1.5 -ml-1 text-black hover:opacity-70 transition-opacity"
            aria-label="Abrir menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo principal */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-1.5 font-black tracking-tight text-base md:text-lg text-black uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>THE LION</span>
              <span className="text-[10px] md:text-xs font-semibold text-neutral-600 tracking-normal">&amp; CO</span>
            </Link>
          </div>

          {/* Enlaces Desktop limpios estilo Nike */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-neutral-800">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                search={link.search as any}
                className="hover:text-black py-1 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones derechas: Buscar + Carrito */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Buscador Desktop compacto */}
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <div className="bg-neutral-100 rounded-full flex items-center px-2.5 py-1">
                <button type="submit" aria-label="Buscar" className="text-neutral-500 hover:text-black">
                  <Search className="w-3.5 h-3.5" />
                </button>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none outline-none ml-1.5 text-xs w-20 focus:w-32 transition-all placeholder:text-neutral-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Buscar movil icono */}
            <button
              className="md:hidden p-1.5 text-neutral-800 hover:opacity-70 transition-opacity"
              aria-label="Buscar"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Carrito chico y sutil */}
            <button
              aria-label="Carrito"
              onClick={open}
              className="relative p-1.5 text-black hover:opacity-70 transition-opacity flex items-center"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Buscador movil overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col p-4 animate-in fade-in duration-100">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
            <Search className="w-5 h-5 text-neutral-400" />
            <form onSubmit={handleSearch} className="flex-1">
              <input
                type="text"
                autoFocus
                placeholder="Buscar prenda, talla, marca..."
                className="w-full text-sm outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button onClick={() => setIsMobileSearchOpen(false)} className="p-1 text-neutral-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Menu hamburguesa movil compacto */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full z-10 flex flex-col p-5 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <span className="font-black text-sm tracking-tight text-black">THE LION &amp; CO</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  search={link.search as any}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-2 text-sm font-medium text-neutral-800 hover:text-black hover:bg-neutral-50 rounded transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/catalogo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-2 text-sm font-semibold text-black bg-neutral-100 rounded mt-2"
              >
                Ver todo el catalogo
              </Link>
            </nav>

            <div className="mt-auto pt-4 border-t border-neutral-100 text-[11px] text-neutral-400">
              <p>Teziutlan, Puebla</p>
              <p className="mt-0.5">Envio a domicilio $30 MXN o entrega en centro gratis</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
