export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount: number
  category: string
  subcategory: string
  image: string
  rating: number
  reviewCount: number
  inStock: boolean
  isNew: boolean
  isFeatured: boolean
}

export interface Category {
  label: string
  value: string
  count: number
  subcategories: Subcategory[]
}

export interface Subcategory {
  label: string
  value: string
  count: number
}

// Product categories with subcategories based on the provided images
export const productCategories: Category[] = [
  {
    label: "Agro Products",
    value: "agro-products",
    count: 28,
    subcategories: [
      { label: "Seeds", value: "seeds", count: 4 },
      { label: "Fertilizers & Manures", value: "fertilizers-manures", count: 4 },
      { label: "Farming Tools", value: "farming-tools", count: 3 },
      { label: "Organic Pesticides", value: "organic-pesticides", count: 3 },
      { label: "Gardening Essentials", value: "gardening-essentials", count: 4 },
      { label: "Agro Processed Products", value: "agro-processed-products", count: 2 },
    ],
  },
  {
    label: "Eco Products",
    value: "eco-products",
    count: 19,
    subcategories: [
      { label: "Home Products", value: "home-products", count: 6 },
      { label: "Kitchen Products", value: "kitchen-products", count: 3 },
      { label: "Eco-Friendly Stationery", value: "eco-friendly-stationery", count: 3 },
      { label: "Cleaning Essentials", value: "cleaning-essentials", count: 3 },
    ],
  },
  {
    label: "Herbal Products",
    value: "herbal-products",
    count: 18,
    subcategories: [
      { label: "Raw Herbs", value: "raw-herbs", count: 6 },
      { label: "Herbal Powders", value: "herbal-powders", count: 5 },
      { label: "Herbal Juices & Extracts", value: "herbal-juices-extracts", count: 4 },
      { label: "Health Mixes", value: "health-mixes", count: 3 },
    ],
  },
  {
    label: "Natural Cosmetics",
    value: "natural-cosmetics",
    count: 18,
    subcategories: [
      { label: "Hair Care", value: "hair-care", count: 5 },
      { label: "Skin Care", value: "skin-care", count: 5 },
      { label: "Bath & Body", value: "bath-body", count: 3 },
      { label: "Oral Care", value: "oral-care", count: 3 },
    ],
  },
]

const mockProducts: Product[] = []

// Function to get all products
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts
}

// Function to get a single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProducts.find((product) => product.id === id)
}

// Function to get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProducts.filter((product) => product.isFeatured)
}

// Function to get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}
