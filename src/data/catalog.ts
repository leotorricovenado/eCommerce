// Datos de ejemplo alineados a Grupo Venado (línea KRIS y marcas del grupo).
// Reemplaza el contenido de ferretería/industrial de los mockups base.

export type CategoryKey =
  | "salsas"
  | "panaderia"
  | "bebidas"
  | "hogar";

export interface Category {
  key: CategoryKey;
  label: string;
  color: string; // token de color de categoría
  count: number;
}

export const categories: Category[] = [
  { key: "salsas", label: "Salsas y Condimentos", color: "cat-red", count: 24 },
  { key: "panaderia", label: "Panadería y Pastelería", color: "cat-blue", count: 18 },
  { key: "bebidas", label: "Bebidas", color: "cat-yellow", count: 15 },
  { key: "hogar", label: "Cuidado del Hogar", color: "cat-green", count: 12 },
];

export type StockLevel = "in" | "low" | "out";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryKey;
  unit: string; // presentación
  sku: string;
  pricePerUnit: number;
  pricePerBox?: number;
  boxSize?: number; // unidades por caja/bulto
  stock: StockLevel;
  tint: string; // color de fondo del placeholder (token de categoría)
  description?: string;
}

export const products: Product[] = [
  {
    id: "ketchup-985",
    name: "Ketchup KRIS 985 gr",
    brand: "KRIS",
    category: "salsas",
    unit: "Doypack 985 gr",
    sku: "DCD778102-83",
    pricePerUnit: 31,
    pricePerBox: 360,
    boxSize: 12,
    stock: "in",
    tint: "cat-red",
    description:
      "El Ketchup KRIS 985 gr ofrece el clásico sabor a tomate con una textura suave y deliciosa que complementa una gran variedad de comidas: papas fritas, hamburguesas, hot dogs, snacks y recetas familiares. Elaborado con el sabor tradicional preferido por los bolivianos.",
  },
  {
    id: "mayonesa-1k",
    name: "Mayonesa KRIS Doypack 1 kg",
    brand: "KRIS",
    category: "salsas",
    unit: "Doypack 1 kg",
    sku: "DCD778110-01",
    pricePerUnit: 20.5,
    pricePerBox: 240,
    boxSize: 12,
    stock: "in",
    tint: "cat-red",
    description:
      "Mayonesa cremosa KRIS, ideal para sándwiches, ensaladas y preparaciones. Presentación familiar de 1 kg.",
  },
  {
    id: "mostaza-500",
    name: "Mostaza KRIS 500 gr",
    brand: "KRIS",
    category: "salsas",
    unit: "Frasco 500 gr",
    sku: "DCD778120-05",
    pricePerUnit: 12,
    pricePerBox: 144,
    boxSize: 12,
    stock: "in",
    tint: "cat-red",
    description: "Mostaza suave KRIS, el toque perfecto para tus comidas.",
  },
  {
    id: "mayonesa-ahumada",
    name: "Mayonesa Ahumada KRIS 380 gr",
    brand: "KRIS",
    category: "salsas",
    unit: "Doypack 380 gr",
    sku: "DCD778115-11",
    pricePerUnit: 23,
    boxSize: 12,
    stock: "out",
    tint: "cat-red",
    description: "Mayonesa con delicioso sabor ahumado, edición especial KRIS.",
  },
  {
    id: "salsa-golf",
    name: "Salsa Golf KRIS 380 gr",
    brand: "KRIS",
    category: "salsas",
    unit: "Doypack 380 gr",
    sku: "DCD778130-07",
    pricePerUnit: 14.5,
    pricePerBox: 174,
    boxSize: 12,
    stock: "low",
    tint: "cat-red",
    description: "La combinación ideal para tus ensaladas y frituras.",
  },
  {
    id: "gelatina-frambuesa",
    name: "Gelatina KRIS Frambuesa 230 gr",
    brand: "KRIS",
    category: "panaderia",
    unit: "Caja 230 gr",
    sku: "DCD779220-14",
    pricePerUnit: 7.2,
    pricePerBox: 172.8,
    boxSize: 24,
    stock: "in",
    tint: "cat-blue",
    description: "Gelatina sabor frambuesa, fácil de preparar.",
  },
  {
    id: "polvo-hornear",
    name: "Polvo de Hornear Real 100 gr",
    brand: "Real",
    category: "panaderia",
    unit: "Frasco 100 gr",
    sku: "RL200110-02",
    pricePerUnit: 9.5,
    pricePerBox: 228,
    boxSize: 24,
    stock: "in",
    tint: "cat-blue",
    description: "Polvo de hornear Real para tus recetas de pastelería.",
  },
  {
    id: "refresco-frussion",
    name: "Refresco en Polvo Frussion Naranja",
    brand: "Frussion",
    category: "bebidas",
    unit: "Sobre 35 gr",
    sku: "FR300110-09",
    pricePerUnit: 2.5,
    pricePerBox: 60,
    boxSize: 24,
    stock: "in",
    tint: "cat-yellow",
    description: "Refresco en polvo sabor naranja, rinde 2 litros.",
  },
  {
    id: "lavavajilla-kriskao",
    name: "Lavavajilla KRIS KAO Limón 500 ml",
    brand: "KRIS KAO",
    category: "hogar",
    unit: "Botella 500 ml",
    sku: "KK400110-03",
    pricePerUnit: 11,
    pricePerBox: 132,
    boxSize: 12,
    stock: "low",
    tint: "cat-green",
    description: "Lavavajilla concentrado con aroma a limón.",
  },
];

export const brands = [
  "KRIS",
  "Kriolla",
  "KRIS KAO",
  "Real",
  "El Pescador",
  "Frussion",
];

// Clases estáticas por categoría (Tailwind no admite interpolación dinámica).
export const catSolidBg: Record<CategoryKey, string> = {
  salsas: "bg-cat-red",
  panaderia: "bg-cat-blue",
  bebidas: "bg-cat-yellow",
  hogar: "bg-cat-green",
};
export const catText: Record<CategoryKey, string> = {
  salsas: "text-white",
  panaderia: "text-white",
  bebidas: "text-ink",
  hogar: "text-white",
};

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

// Las imágenes en public/productos se llaman igual que el nombre del producto.
export function productImage(p: Product): string {
  return encodeURI(`/productos/${p.name}.webp`);
}

// Logos de marca en public/marcas.
export const brandLogo: Record<string, string> = {
  KRIS: "/marcas/kris.svg",
  Kriolla: "/marcas/kriolla.svg",
  "KRIS KAO": "/marcas/kriskao.svg",
  Real: "/marcas/Real.svg",
  "El Pescador": "/marcas/EL-PESCADOR-1.svg",
  Frussion: "/marcas/Frussion-1.svg",
};

// Cliente autenticado (llega identificado desde WhatsApp por teléfono/OTP).
export const customer = {
  businessName: "Comercial Los Andes",
  nit: "890.987.654-3",
  code: "CLI-99214",
  priceList: "Mayorista A",
  balance: 12450,
  phone: "+591 75 34 60 50",
  deliveryAddress:
    "Av. Cañoto #245, Zona Central, Santa Cruz de la Sierra",
  warehouse: "Centro de Distribución Santa Cruz (CD-SCZ)",
  advisor: { name: "Carlos Mendoza", role: "Asesor Comercial" },
  status: "Cuenta Activa",
};

// Pedido de ejemplo para las pantallas de estado / historial.
export const sampleOrderNumber = "VN-2024-001";
