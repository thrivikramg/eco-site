"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, CheckCircle, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

import type { Product } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "/placeholder.svg")
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || "/placeholder.svg",
      category: product.category,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      action: <CheckCircle className="text-green-500" />,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div>
          <div className="relative h-96 w-full overflow-hidden rounded-lg border bg-gray-100">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-4 flex space-x-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`relative h-20 w-20 overflow-hidden rounded-md border-2 ${selectedImage === img ? "border-emerald-500" : "border-transparent"
                  }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-emerald-600">{product.category}</span>
          <h1 className="mt-2 text-3xl font-bold text-gray-800 sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-emerald-700">₹{product.price.toFixed(2)}</p>

          <div className="mt-6 space-y-4 text-gray-600">
            <p>{product.description}</p>
          </div>

          <div className="mt-8">
            <Button
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
              onClick={handleAddToCart}
              disabled={(product.stock || 0) === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {(product.stock || 0) > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto ml-0 sm:ml-4 mt-4 sm:mt-0 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => router.push("/coming-soon")}
              disabled={(product.stock || 0) === 0}
            >
              <Zap className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
            {(product.stock || 0) > 0 && (
              <p className="mt-2 text-sm text-green-600">In Stock ({product.stock || 0} available)</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}