"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Minus, Plus, ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.discount > 0 ? (product.price * (100 - product.discount)) / 100 : product.price,
      quantity,
      image: product.images[0],
    })

    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    })
  }

  const incrementQuantity = () => {
    setQuantity((prev) => (prev < 10 ? prev + 1 : prev))
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  // Calculate discounted price
  const discountedPrice = product.discount > 0 ? (product.price * (100 - product.discount)) / 100 : product.price

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/shop" className="text-muted-foreground hover:text-foreground">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href={`/shop/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-muted-foreground hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {product.isNew && <Badge className="absolute top-2 right-2 bg-primary">New</Badge>}
            {product.discount > 0 && <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative h-24 rounded-md overflow-hidden border cursor-pointer hover:border-primary"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} - View ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-primary border-primary">
                {product.category}
              </Badge>
              <Badge variant="outline">{product.subcategory}</Badge>
              {product.inStock ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Out of Stock
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
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
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              {product.discount > 0 ? (
                <>
                  <span className="text-3xl font-bold">₹{discountedPrice.toFixed(2)}</span>
                  <span className="text-xl text-muted-foreground line-through">₹{product.price.toFixed(2)}</span>
                  <Badge className="ml-2 bg-red-500">Save {product.discount}%</Badge>
                </>
              ) : (
                <span className="text-3xl font-bold">₹{product.price.toFixed(2)}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <p className="text-gray-700">{product.description}</p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                  className="h-10 w-10 rounded-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>

              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>

              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Free shipping over ₹1000</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">30-day returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
              </p>
              <h3>Benefits</h3>
              <ul>
                <li>100% natural and organic</li>
                <li>Sustainably sourced</li>
                <li>Chemical-free</li>
                <li>Eco-friendly packaging</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="details" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Product Specifications</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Category</span>
                    <span>{product.category}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Subcategory</span>
                    <span>{product.subcategory}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Weight</span>
                    <span>250g</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span>10 × 5 × 5 cm</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Shelf Life</span>
                    <span>12 months</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Usage Instructions</h3>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                </p>
                <h3 className="text-lg font-medium mb-2">Storage Information</h3>
                <p className="text-gray-700">
                  Store in a cool, dry place away from direct sunlight. Keep out of reach of children.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
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
                    <span className="ml-2 text-sm text-muted-foreground">Based on {product.reviewCount} reviews</span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>

              <Separator />

              {/* Sample reviews */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">Rahul Sharma</div>
                      <span className="text-sm text-muted-foreground">2 months ago</span>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
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
                  </div>
                  <h4 className="font-medium">Excellent quality!</h4>
                  <p className="text-gray-700">
                    I've been using this product for a month now and I'm very impressed with the quality. Highly
                    recommended!
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">Priya Patel</div>
                      <span className="text-sm text-muted-foreground">1 month ago</span>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
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
                  </div>
                  <h4 className="font-medium">Good product, fast delivery</h4>
                  <p className="text-gray-700">
                    The product arrived quickly and was well packaged. The quality is good for the price. Would buy
                    again.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
