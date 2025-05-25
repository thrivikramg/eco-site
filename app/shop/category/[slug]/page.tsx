import type { Metadata } from "next"
import ProductsLayout from "@/components/shop/products-layout"
import { productCategories } from "@/lib/products"

interface CategoryPageProps {
  params: {
    slug: string
  }
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
    title: `${categoryName} | EcoGrow Shop`,
    description: `Browse our collection of sustainable ${categoryName.toLowerCase()} for a greener lifestyle.`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <ProductsLayout />
}
