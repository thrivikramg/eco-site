import type { Metadata } from "next"
import ProductsLayout from "@/components/shop/products-layout"
import { productCategories, type Product } from "@/lib/products"

interface SubcategoryPageProps {
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

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  let subcategoryName = ""

  // Find the subcategory across all categories
  for (const category of productCategories) {
    const subcategory = category.subcategories.find((sub) => sub.value === params.slug)
    if (subcategory) {
      subcategoryName = subcategory.label
      break
    }
  }

  if (!subcategoryName) {
    subcategoryName = params.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return {
    title: `${subcategoryName} | EcoSaro Shop`,
    description: `Browse our collection of sustainable ${subcategoryName.toLowerCase()} for a greener lifestyle.`,
  }
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const products = await getProducts();
  return <ProductsLayout initialProducts={products} />
}
