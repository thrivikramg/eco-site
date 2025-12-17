import type { Metadata } from "next"
import ProductsLayout from "@/components/shop/products-layout"
import { productCategories, type Product } from "@/lib/products"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    ? process.env.NEXT_PUBLIC_APP_URL
    : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const apiUrl = `${baseUrl}/api/shop`;
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) {
    console.error('Failed to fetch products');
    return [];
  }
  return res.json();
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // Ensure params is properly awaited before accessing properties
  const slug = params?.slug || ''

  const category = productCategories.find((cat) => cat.value === slug)
  const categoryName =
    category?.label ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

  return {
    title: `${categoryName} | EcoSaro Shop`,
    description: `Browse our collection of sustainable ${categoryName.toLowerCase()} for a greener lifestyle.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getProducts();
  return <ProductsLayout initialProducts={products} />
}
