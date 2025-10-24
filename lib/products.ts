import { IProduct } from "@/models/product";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
}

export interface Category {
  label: string;
  value: string;
  count: number;
  subcategories: Subcategory[];
}

export interface Subcategory {
  label: string;
  value: string;
  count: number;
}

// Function to get all products
export async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

// Function to get a single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return undefined;
  }
  return response.json();
}

// Function to get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await fetch(
    "http://localhost:3000/api/products?featured=true",
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch featured products");
  }
  return response.json();
}

// Function to get products by category
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `http://localhost:3000/api/products?category=${category}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }
  return response.json();
}

// Function to get product categories
export async function getProductCategories(): Promise<Category[]> {
  const products = await getProducts();
  const categories: Record<string, Category> = {};

  products.forEach((product: IProduct) => {
    if (product.category) {
      if (!categories[product.category]) {
        categories[product.category] = {
          label: product.category,
          value: product.category.toLowerCase().replace(/\s+/g, "-"),
          count: 0,
          subcategories: [],
        };
      }
      categories[product.category].count++;
    }
  });

  return Object.values(categories);
}
