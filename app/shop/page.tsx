'use client'

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

const CATEGORIES = [
  "All",
  "Agro Products",
  "Eco Friendly",
  "Herbal Products",
  "Natural Cosmetics"
]

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-white">
      {product.images && product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold truncate flex-1 mr-2">{product.name}</h3>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full whitespace-nowrap">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 mt-1 text-sm h-10 overflow-hidden line-clamp-2">
          {product.description || "No description available."}
        </p>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-green-700">₹{product.price.toFixed(2)}</p>
          <Button size="sm" variant="outline" className="text-xs">View Details</Button>
        </div>
      </div>
    </div>
  )
}

function ShopContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [category, setCategory] = useState(searchParams.get("category") || "All")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sort, setSort] = useState(searchParams.get("sort") || "newest")
  const [search, setSearch] = useState(searchParams.get("search") || "")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append("search", search)
        if (category && category !== "All") params.append("category", category)
        if (priceRange[0] > 0) params.append("minPrice", priceRange[0].toString())
        if (priceRange[1] < 10000) params.append("maxPrice", priceRange[1].toString())
        if (sort) params.append("sort", sort)

        const res = await fetch(`/api/shop?${params.toString()}`)
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce fetch for slider/search changes
    const timeoutId = setTimeout(() => {
      fetchProducts()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [search, category, priceRange, sort])

  // Update URL params when filters change (optional, for shareable links)
  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (category && category !== "All") params.set("category", category)
    if (sort && sort !== "newest") params.set("sort", sort)

    router.replace(`/shop?${params.toString()}`, { scroll: false })
  }, [search, category, sort, router])

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <input
                type="radio"
                id={cat}
                name="category"
                checked={category === cat}
                onChange={() => setCategory(cat)}
                className="text-green-600 focus:ring-green-500"
              />
              <Label htmlFor={cat} className="cursor-pointer">{cat}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 10000]}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Shop Eco-Friendly</h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your product search</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
            <FilterContent />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
              <Button
                variant="link"
                onClick={() => {
                  setCategory("All")
                  setPriceRange([0, 10000])
                  setSearch("")
                  setSort("newest")
                }}
                className="mt-4 text-green-600"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link href={`/shop/product/${product._id}`} key={product._id} className="block h-full">
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>}>
      <ShopContent />
    </Suspense>
  )
}