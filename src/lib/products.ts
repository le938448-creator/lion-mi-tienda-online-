export type ProductCondition = "Nuevo" | "Como nuevo (Segunda mano)" | "Buen estado (Segunda mano)";

export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: "hombre" | "mujer" | "ninos" | "accesorios" | "segunda-mano";
  isSecondHand?: boolean;
  condition?: ProductCondition;
  description: string;
  sizes: (string | number)[];
  measurements?: string;
  isNew?: boolean;
  isOffer?: boolean;
};

export const STORE_PHONE = "522311174825";
export const STORE_PHONE_DISPLAY = "+52 231 117 48 25";
export const STORE_LOCATION = "Teziutlán, Puebla, México";

export const products: Product[] = [
  {
    id: "prod-001",
    brand: "SEGUNDA MANO",
    name: "Pantalón de Mezclilla Niño",
    price: 100,
    oldPrice: 250,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
    category: "ninos",
    isSecondHand: true,
    condition: "Como nuevo (Segunda mano)",
    description: "Pantalón de mezclilla resistente y cómodo para niño. En excelente estado, sin detalles ni roturas.",
    sizes: ["10-12"],
    measurements: "Talla infantil 10-12 años · Cintura con elástico ajustable",
    isOffer: true,
  },
  {
    id: "prod-002",
    brand: "TEMU SELECT",
    name: "Playera Oversize Streetwear",
    price: 180,
    oldPrice: 280,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
    category: "hombre",
    isSecondHand: false,
    condition: "Nuevo",
    isNew: true,
    isOffer: true,
    description: "Playera corte oversize urbano, algodón pesado y caída recta. Ideal para un look streetwear moderno.",
    sizes: ["M", "G", "XL"],
    measurements: "Corte holgado / relajado",
  },
  {
    id: "prod-003",
    brand: "SEGUNDA MANO",
    name: "Hoodie Gris Básico Minimal",
    price: 220,
    oldPrice: 450,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
    category: "hombre",
    isSecondHand: true,
    condition: "Como nuevo (Segunda mano)",
    isOffer: true,
    description: "Sudadera con capucha y bolsillo canguro. Tela abrigadora y suave, costuras reforzadas en perfecto estado.",
    sizes: ["M"],
    measurements: "Pecho: 54 cm · Largo: 68 cm",
  },
  {
    id: "prod-004",
    brand: "SEGUNDA MANO",
    name: "Pantalón Cargo Táctico Negro",
    price: 250,
    oldPrice: 480,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    category: "hombre",
    isSecondHand: true,
    condition: "Como nuevo (Segunda mano)",
    description: "Pantalón cargo multibolsillos en color negro mate. Estilo utilitario y cómodo para el día a día.",
    sizes: ["32"],
    measurements: "Cintura: 82 cm · Largo: 102 cm",
  },
  {
    id: "prod-005",
    brand: "SEGUNDA MANO",
    name: "Chamarra Rompevientos Ligera",
    price: 190,
    oldPrice: 380,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    category: "hombre",
    isSecondHand: true,
    condition: "Como nuevo (Segunda mano)",
    isOffer: true,
    description: "Chamarra impermeable y cortavientos, ideal para el clima de Teziutlán. Cierres funcionando al 100%.",
    sizes: ["G"],
    measurements: "Pecho: 58 cm · Largo: 70 cm",
  },
  {
    id: "prod-006",
    brand: "SEGUNDA MANO",
    name: "Blusa Contemporánea Manga Corta",
    price: 120,
    oldPrice: 260,
    image: "https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&q=80",
    category: "mujer",
    isSecondHand: true,
    condition: "Como nuevo (Segunda mano)",
    description: "Blusa fresca con textura suave y caída holgada. Diseño versátil tanto para trabajo como salidas.",
    sizes: ["M"],
    measurements: "Busto: 48 cm · Largo: 60 cm",
  },
  {
    id: "prod-007",
    brand: "SEGUNDA MANO",
    name: "Vestido Casual Estampado",
    price: 150,
    oldPrice: 350,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    category: "mujer",
    isSecondHand: true,
    condition: "Como nuevo (Segunda mano)",
    isOffer: true,
    description: "Vestido midi fresco de temporada, elástico en cintura y corte favorecedor. Revisado y en excelente estado.",
    sizes: ["CH"],
    measurements: "Cintura adaptable · Largo: 105 cm",
  },
  {
    id: "prod-008",
    brand: "TEMU SELECT",
    name: "Gorra Snapback Urbana",
    price: 90,
    oldPrice: 150,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    category: "accesorios",
    isSecondHand: false,
    condition: "Nuevo",
    isNew: true,
    description: "Gorra de visera curva con broche ajustable en la parte trasera. Tela transpirable y estructura firme.",
    sizes: ["Ajustable"],
    measurements: "Unitalla ajustable",
  },
];

export const categories = [
  {
    slug: "segunda-mano",
    name: "SEGUNDA MANO",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
  },
  {
    slug: "hombre",
    name: "HOMBRE",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80",
  },
  {
    slug: "mujer",
    name: "MUJER",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
  },
  {
    slug: "ninos",
    name: "NIÑOS",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
  },
  {
    slug: "accesorios",
    name: "ACCESORIOS",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
  },
];

export const brands = [
  "THE LION",
  "SEGUNDA MANO",
  "TEMU SELECT",
  "ORIGINALS (PRÓXIMAMENTE)",
];

export function formatPrice(n: number): string {
  return `$${n.toLocaleString("es-MX")} MXN`;
}
