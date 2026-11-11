export type ProductLabel = "NUEVO" | "SELECCIONADA" | "DONACION";
export type ProductCondition =
  | "nuevo-con-etiqueta"
  | "nuevo-sin-etiqueta"
  | "como-nuevo"
  | "excelente"
  | "buen-estado";

export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  category: "hombre" | "mujer" | "ninos" | "accesorios";
  label: ProductLabel;
  condition: ProductCondition;
  conditionLabel: string;
  description: string;
  sizes: string[];
  measurements?: string;
  isOffer?: boolean;
  isSecondHand?: boolean;
  isNew?: boolean;
};

export const STORE_PHONE = "522311174825";
export const STORE_PHONE_DISPLAY = "+52 231 117 48 25";
export const STORE_LOCATION = "Teziutlan, Puebla";

export const conditionLabels: Record<ProductCondition, string> = {
  "nuevo-con-etiqueta": "Nuevo con etiqueta",
  "nuevo-sin-etiqueta": "Nuevo sin etiqueta",
  "como-nuevo": "Como nuevo",
  "excelente": "Excelente estado",
  "buen-estado": "Buen estado",
};

// LOTE COMPLETO: 18 piezas en total (16 prendas pagadas + 2 regalos incluidos)
// Total por separado: $2,230 | Precio lote: $1,830 | Ahorro: $400 | Envio gratis
export const LOTE_COMPLETO: Product = {
  id: "lote-completo",
  name: "Lote Completo (18 piezas en total)",
  brand: "THE LION & CO",
  price: 1830,
  oldPrice: 2230,
  image: "/products/p8.jpg",
  images: [
    "/products/p8.jpg",
    "/products/p10.jpg",
    "/products/p9.jpg",
    "/products/p17.jpg",
    "/products/p1.jpg",
    "/products/p12.jpg",
  ],
  category: "mujer",
  label: "SELECCIONADA",
  condition: "excelente",
  conditionLabel: "Lote completo",
  sizes: ["18 piezas surtidas"],
  measurements: "16 prendas de marca + 2 prendas de regalo",
  description:
    "18 piezas en total: 16 prendas seleccionadas de marcas como Levi's, Nike, American Eagle, ANDREA, 2 gorras NY y pantalones, mas 2 prendas de regalo incluidas sin costo. Envio a domicilio gratis en Teziutlan.",
  isOffer: true,
};

// PRENDAS DEL CATALOGO DE VENTA (15 items = 16 piezas ya que las gorras son 2)
// NOTA: La blusa #11 y el mayon #13 NO estan aqui porque son regalos exclusivos del Lote Completo y Donaciones
export const products: Product[] = [
  // 1. NUEVOS
  {
    id: "p9",
    name: "Gorras NY urbanas (Par de 2 gorras)",
    brand: "NEW YORK",
    price: 150,
    image: "/products/p9.jpg",
    images: ["/products/p9.jpg"],
    category: "accesorios",
    label: "NUEVO",
    condition: "nuevo-con-etiqueta",
    conditionLabel: "Nuevo con etiqueta",
    sizes: ["Ajustable"],
    measurements: "Broche trasero regulable · 1 roja y 1 negra con blanco",
    description: "Nuevas con etiqueta. Par de 2 gorras urbanas con visera curva estructurada y bordado NY.",
    isNew: true,
  },
  {
    id: "p17",
    name: "Pantalon American Eagle azul oscuro stretch",
    brand: "AMERICAN EAGLE",
    price: 250,
    image: "/products/p17.jpg",
    images: ["/products/p17.jpg"],
    category: "mujer",
    label: "NUEVO",
    condition: "nuevo-sin-etiqueta",
    conditionLabel: "Nuevo sin etiqueta",
    sizes: ["Talla 6-8 US (7-9 MX)"],
    measurements: "Cintura: 36-37 cm (vuelta 72-74 cm) · Largo total: 102 cm",
    description: "Perfecto estado, como nuevo, sin etiqueta. Mezclilla stretch comoda, corte skinny / recto.",
    isNew: true,
  },

  // 2. SELECCIONADA — COMO NUEVO
  {
    id: "p8",
    name: "Chamarra Levi's verde oscuro",
    brand: "LEVI'S",
    price: 400,
    image: "/products/p8.jpg",
    images: ["/products/p8.jpg"],
    category: "hombre",
    label: "SELECCIONADA",
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    sizes: ["Talla Chica (S)"],
    measurements: "Pecho frente: 52 cm · Largo: 66 cm",
    description: "Como nuevo, casi no se uso. Chamarra autentica Levi's en tono verde militar con broches reforzados.",
    isSecondHand: true,
  },
  {
    id: "p10",
    name: "Sudadera Nike Therma-Fit Wildcats",
    brand: "NIKE",
    price: 150,
    image: "/products/p10.jpg",
    images: ["/products/p10.jpg"],
    category: "hombre",
    label: "SELECCIONADA",
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    sizes: ["Talla S"],
    measurements: "Pecho frente: 50 cm · Largo: 65 cm · Manga: 63 cm",
    description: "Como nuevo. Tecnologia termica Nike Therma-Fit, interior afelpado azul rey con estampado Wildcats.",
    isSecondHand: true,
  },
  {
    id: "p2",
    name: "Pantalon gris de mezclilla",
    brand: "THE LION",
    price: 100,
    image: "/products/p2.jpg",
    images: ["/products/p2.jpg"],
    category: "hombre",
    label: "SELECCIONADA",
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    sizes: ["Talla 30"],
    measurements: "Cintura: 39 cm (vuelta ~79 cm) · Largo: 103 cm",
    description: "Como nuevo. Corte recto / straight, mezclilla gris resistente de excelente calidad.",
    isSecondHand: true,
  },
  {
    id: "p7",
    name: "Pantalon NAHOMI azul claro",
    brand: "NAHOMI",
    price: 150,
    image: "/products/p7.jpg",
    images: ["/products/p7.jpg"],
    category: "mujer",
    label: "SELECCIONADA",
    condition: "como-nuevo",
    conditionLabel: "Como nuevo",
    sizes: ["Talla 7"],
    measurements: "Cintura: 38 cm · Largo: 101 cm",
    description: "Como nuevo. Mezclilla stretch suave azul claro, silueta favorecedora.",
    isSecondHand: true,
  },

  // 3. SELECCIONADA — EXCELENTE ESTADO
  {
    id: "p1",
    name: "Pantalon APT.9 azul oscuro",
    brand: "APT.9",
    price: 120,
    image: "/products/p1.jpg",
    images: ["/products/p1.jpg"],
    category: "mujer",
    label: "SELECCIONADA",
    condition: "excelente",
    conditionLabel: "Excelente estado",
    sizes: ["Talla 4 Modern"],
    measurements: "Cintura: 36 cm (vuelta ~73 cm) · Largo: 100 cm",
    description: "Excelente estado. Corte bootcut, 81% algodon, 18% poliester, 1% spandex. Bolsillos traseros bordados.",
    isSecondHand: true,
  },
  {
    id: "p3",
    name: "Pantalon azul con detalles en cintura",
    brand: "THE LION",
    price: 130,
    image: "/products/p3.jpg",
    images: ["/products/p3.jpg"],
    category: "mujer",
    label: "SELECCIONADA",
    condition: "excelente",
    conditionLabel: "Excelente estado",
    sizes: ["Talla 5-7"],
    measurements: "Cintura: 37 cm (vuelta ~75 cm) · Largo: 98 cm",
    description: "Excelente estado. Corte recto ajustado, mezclilla azul clasica con costuras decorativas.",
    isSecondHand: true,
  },
  {
    id: "p5",
    name: "Blusa blanca de botones",
    brand: "THE LION",
    price: 50,
    image: "/products/p5.jpg",
    images: ["/products/p5.jpg"],
    category: "mujer",
    label: "SELECCIONADA",
    condition: "excelente",
    conditionLabel: "Excelente estado",
    sizes: ["Talla G"],
    measurements: "Pecho frente: 52 cm · Largo: 62 cm",
    description: "Excelente estado. Blusa de manga corta fresca y suave, botones frontales y cuello camisa.",
    isSecondHand: true,
  },
  {
    id: "p6",
    name: "Pantalon negro entubado",
    brand: "THE LION",
    price: 120,
    image: "/products/p6.jpg",
    images: ["/products/p6.jpg"],
    category: "mujer",
    label: "SELECCIONADA",
    condition: "excelente",
    conditionLabel: "Excelente estado",
    sizes: ["Talla 4"],
    measurements: "Cintura: 36 cm (vuelta ~74 cm) · Largo: 99 cm",
    description: "Excelente estado. Corte entubado skinny, color negro solido sin desgaste ni deslavado.",
    isSecondHand: true,
  },
  {
    id: "p12",
    name: "Short de mezclilla gris ANDREA Jeans",
    brand: "ANDREA",
    price: 150,
    image: "/products/p12.jpg",
    images: ["/products/p12.jpg"],
    category: "mujer",
    label: "SELECCIONADA",
    condition: "excelente",
    conditionLabel: "Excelente estado",
    sizes: ["Talla 5"],
    measurements: "Cintura: 37 cm · Largo: 32 cm",
    description: "Excelente estado. Short casual de mezclilla gris con dobladillo y bolsas clasicas.",
    isSecondHand: true,
  },
  {
    id: "p15",
    name: "Pantalon negro casual / formal",
    brand: "THE LION",
    price: 150,
    image: "/products/p15.jpg",
    images: ["/products/p15.jpg"],
    category: "mujer",
    label: "SELECCIONADA",
    condition: "excelente",
    conditionLabel: "Excelente estado",
    sizes: ["Talla 5"],
    measurements: "Cintura: 36 cm · Largo: 100 cm",
    description: "Excelente estado. Corte recto formal/casual, tela lisa con bonita caida para trabajo o diario.",
    isSecondHand: true,
  },

  // 4. SELECCIONADA — BUEN ESTADO
  {
    id: "p4",
    name: "Pantalon negro de vestir",
    brand: "THE LION",
    price: 50,
    image: "/products/p4.jpg",
    images: ["/products/p4.jpg"],
    category: "hombre",
    label: "SELECCIONADA",
    condition: "buen-estado",
    conditionLabel: "Buen estado",
    sizes: ["Talla 14"],
    measurements: "Cintura: 35 cm · Largo: 95 cm",
    description: "Buen estado. Nino / Caballero joven. Tela lisa de vestir, ideal para eventos escolares o formales.",
    isSecondHand: true,
  },
  {
    id: "p14",
    name: "Pantalon de mezclilla negro Elegance",
    brand: "ELEGANCE",
    price: 60,
    image: "/products/p14.jpg",
    images: ["/products/p14.jpg"],
    category: "mujer",
    label: "SELECCIONADA",
    condition: "buen-estado",
    conditionLabel: "Buen estado",
    sizes: ["Talla 7"],
    measurements: "Cintura: 38 cm · Largo: 98 cm",
    description: "Buen estado. Pantalon basico de mezclilla negra con corte comodo a precio muy accesible.",
    isSecondHand: true,
  },
  {
    id: "p16",
    name: "Pantalon de mezclilla azul nino / joven",
    brand: "THE LION",
    price: 100,
    image: "/products/p16.jpg",
    images: ["/products/p16.jpg"],
    category: "ninos",
    label: "SELECCIONADA",
    condition: "buen-estado",
    conditionLabel: "Buen estado",
    sizes: ["Talla 10-12"],
    measurements: "Cintura: 33 cm con elastico · Largo: 88 cm",
    description: "Buen estado. Mezclilla azul resistente para nino o joven, cintura comoda con elastico.",
    isSecondHand: true,
  },
];

// PRENDAS DISPONIBLES EN EL PROGRAMA DE DONACIONES (GRATIS)
export const DONATION_ITEMS: {
  id: string;
  name: string;
  image: string;
  category: string;
  size: string;
  detail: string;
}[] = [
  {
    id: "d1",
    name: "Blusita blanca con bordado artesanal rojo",
    image: "/products/p11.jpg",
    category: "Niña",
    size: "Talla infantil 6-8",
    detail: "Manga corta, tela ligera con bordado tradicional rojo en pecho y mangas. Limpia y lista para usar.",
  },
  {
    id: "d2",
    name: "Mayon / leggings negro basico",
    image: "/products/p13.jpg",
    category: "Mujer",
    size: "Talla CH-M",
    detail: "Leggings negros comodos tipo pants ajustado, cintura elastica adaptable. En buen estado.",
  },
  {
    id: "d3",
    name: "Prendas infantiles comunitarias",
    image: "/products/p16.jpg",
    category: "Niños",
    size: "Varias tallas",
    detail: "Ropa limpia donada por familias de Teziutlan para ninos y ninas que lo necesiten.",
  },
];

export function formatPrice(n: number): string {
  if (n === 0) return "GRATIS";
  return `$${n.toLocaleString("es-MX")} MXN`;
}
