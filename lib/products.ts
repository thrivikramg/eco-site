export interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  stock?: number // Optional stock property
}

export interface Category {
  value: string
  label: string
  count: number
  subcategories: Subcategory[]
}

export interface Subcategory {
  value: string
  label: string
  count: number
}

export const productCategories: Category[] = [
  {
    value: "agro-products",
    label: "Agro Products",
    count: 25,
    subcategories: [
      { value: "organic-fertilizers", label: "Organic Fertilizers", count: 10 },
      { value: "natural-pesticides", label: "Natural Pesticides", count: 8 },
      { value: "seeds", label: "Seeds", count: 7 },
    ],
  },
  {
    value: "eco-friendly",
    label: "Eco-Friendly",
    count: 30,
    subcategories: [
      { value: "reusable-bags", label: "Reusable Bags", count: 12 },
      { value: "bamboo-products", label: "Bamboo Products", count: 10 },
      { value: "solar-chargers", label: "Solar Chargers", count: 8 },
    ],
  },
  {
    value: "herbal-products",
    label: "Herbal Products",
    count: 20,
    subcategories: [],
  },
  {
    value: "natural-cosmetics",
    label: "Natural Cosmetics",
    count: 15,
    subcategories: [],
  },
]