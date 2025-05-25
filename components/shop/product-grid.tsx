"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Skeleton } from "../../components/ui/skeleton"
import { useCart } from "../../components/cart-provider"
import { useToast } from "../../hooks/use-toast"
import type { Product } from "../../lib/products"

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  const [mounted, setMounted] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (product: Product) => {
    try {
      if (!addToCart) {
        console.error("addToCart function is not available")
        toast({
          title: "Error",
          description: "Could not add item to cart. Please try again.",
          variant: "destructive",
        })
        return
      }

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Error adding item to cart:", error)
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!mounted) {
    // Return skeleton during client-side rendering
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
      ))}
    </div>
  )
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <Link href={`/shop/product/${product.id}`} className="relative block">
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.isNew && <Badge className="absolute top-2 right-2 bg-primary">New</Badge>}
          {product.discount > 0 && <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>}
        </div>
      </Link>

      <CardContent className="pt-6 flex-grow">
        <div className="text-sm text-primary mb-1">{product.category}</div>
        <Link href={`/shop/product/${product.id}`}>
          <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.585l-7.07 3.707 1.35-7.857L.587 7.11l7.89-1.146L10 0l2.523 5.964 7.89 1.146-5.693 5.325 1.35 7.857z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex items-center">
            {product.discount > 0 ? (
              <>
                <p className="font-semibold text-lg">
                  ₹{((product.price * (100 - product.discount)) / 100).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 line-through ml-2">₹{product.price.toFixed(2)}</p>
              </>
            ) : (
              <p className="font-semibold text-lg">₹{product.price.toFixed(2)}</p>
            )}
          </div>
          <p className="text-xs text-green-600">{product.inStock ? "In Stock" : "Out of Stock"}</p>
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        <Button className="w-full" disabled={!product.inStock} onClick={() => onAddToCart(product)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-64 w-full bg-gray-200 animate-pulse" />
      <CardContent className="pt-6 flex-grow space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-full" />
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded-full" />
          ))}
          <Skeleton className="h-4 w-10 ml-2" />
        </div>
        <Skeleton className="h-6 w-24" />
      </CardContent>
      <CardFooter className="border-t p-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}
