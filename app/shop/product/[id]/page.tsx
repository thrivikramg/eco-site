import { notFound } from "next/navigation"
import type { Product } from "@/lib/products"

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/shop/${id}`, { cache: 'no-store' })

  if (!res.ok) return null
  return res.json()
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) return notFound()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>

          <div>
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
