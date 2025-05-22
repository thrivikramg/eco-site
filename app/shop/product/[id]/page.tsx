import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetail from "@/components/shop/product-detail"
import { getProductById } from "@/lib/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Product Not Found | EcoGrow",
      description: "The product you are looking for could not be found.",
    }
  }

  return {
    title: `${product.name} | EcoGrow Shop`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
