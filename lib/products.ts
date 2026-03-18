import { Product } from "./store";

export const products: Product[] = [
  {
    id: "kenya-aa",
    name: "Kenya AA",
    description:
      "Notas de grosella negra, tomate y un final vibrante. Cafe de especialidad cultivado en las tierras altas de Kenya.",
    price: 8500,
    image: "/images/coffee-1.webp",
    category: "coffee",
    origin: "Kenya",
    roastLevel: "medium",
    weight: "250g",
    inStock: true,
  },
  {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    description:
      "Aromas florales con notas de jazmin, bergamota y un dulzor a miel. Perfecto para metodos de filtrado.",
    price: 9200,
    image: "/images/coffee-2.webp",
    category: "coffee",
    origin: "Ethiopia",
    roastLevel: "light",
    weight: "250g",
    inStock: true,
  },
  {
    id: "ethiopia-bundle",
    name: "Ethiopia + Taza Artesanal",
    description:
      "Nuestro cafe Ethiopia Yirgacheffe acompanado de una taza de ceramica hecha a mano por artesanos locales.",
    price: 14500,
    image: "/images/coffee-3.webp",
    category: "bundles",
    origin: "Ethiopia",
    roastLevel: "light",
    weight: "250g",
    inStock: true,
  },
  {
    id: "colombia-huila",
    name: "Colombia Huila",
    description:
      "Sabor a caramelo, nuez y chocolate con leche. Un cafe equilibrado ideal para espresso.",
    price: 7800,
    image: "/images/menu-cafe.webp",
    category: "coffee",
    origin: "Colombia",
    roastLevel: "medium",
    weight: "250g",
    inStock: true,
  },
  {
    id: "brazil-santos",
    name: "Brazil Santos",
    description:
      "Notas de nuez, chocolate y baja acidez. Perfecto para quienes prefieren un cafe suave y consistente.",
    price: 6500,
    image: "/images/menu-lunch.webp",
    category: "coffee",
    origin: "Brazil",
    roastLevel: "dark",
    weight: "250g",
    inStock: true,
  },
  {
    id: "guatemala-antigua",
    name: "Guatemala Antigua",
    description:
      "Cuerpo completo con notas de chocolate oscuro, especias y un finish ahumado caracteristico.",
    price: 8200,
    image: "/images/menu-dessert.webp",
    category: "coffee",
    origin: "Guatemala",
    roastLevel: "dark",
    weight: "250g",
    inStock: true,
  },
];

export const categories = [
  { id: "all", name: "Todos" },
  { id: "coffee", name: "Cafes" },
  { id: "accessories", name: "Accesorios" },
  { id: "bundles", name: "Bundles" },
];
