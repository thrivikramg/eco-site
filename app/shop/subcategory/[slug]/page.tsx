import type { Metadata } from "next"
import ProductsLayout from "@/components/shop/products-layout"
import { productCategories } from "@/lib/products"

interface SubcategoryPageProps {
  params: {
    slug: string
  }
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
    title: `${subcategoryName} | EcoGrow Shop`,
    description: `Browse our collection of sustainable ${subcategoryName.toLowerCase()} for a greener lifestyle.`,
  }
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  return <ProductsLayout />
}
