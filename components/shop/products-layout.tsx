"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import ProductGrid from "@/components/shop/product-grid"
import ProductFilters from "@/components/shop/product-filters"
import ProductsHeader from "@/components/shop/products-header"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { type Product, getProducts } from "@/lib/products"

export default function ProductsLayout() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const isMobile = useMobile()

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Get query parameters
  const categoryParam = searchParams.get("category")
  const subcategoryParam = searchParams.get("subcategory")
  const searchQuery = searchParams.get("q") || ""
  const sortOption = searchParams.get("sort") || "featured"

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  // Filter and sort products
  useEffect(() => {
    if (products.length === 0) return

    let result = [...products]

    // Filter by category
    if (categoryParam) {
      result = result.filter((product) => product.category.toLowerCase() === categoryParam.toLowerCase())
    }

    // Filter by subcategory
    if (subcategoryParam) {
      result = result.filter((product) => product.subcategory.toLowerCase() === subcategoryParam.toLowerCase())
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query),
      )
    }

    // Sort products
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // 'featured' is default, products are already sorted by featured
        break
    }

    setFilteredProducts(result)
  }, [products, categoryParam, subcategoryParam, searchQuery, sortOption])

  // Update URL with filters
  const updateFilters = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    // Update search params
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, value)
      }
    })

    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  // Clear all filters
  const clearFilters = () => {
    router.push(pathname)
  }

  // Check if any filters are applied
  const hasFilters = categoryParam || subcategoryParam || searchQuery || sortOption !== "featured"

  return (
    <div className="container py-8 md:py-12">
      <ProductsHeader
        totalProducts={filteredProducts.length}
        searchQuery={searchQuery}
        onSearch={(query) => updateFilters({ q: query || null })}
        sortOption={sortOption}
        onSortChange={(option) => updateFilters({ sort: option })}
      />

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Mobile filters */}
        {isMobile && (
          <div className="flex items-center justify-between mb-4">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters} disabled={!hasFilters}>
                    Clear All
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-10rem)]">
                  <ProductFilters
                    selectedCategory={categoryParam || ""}
                    selectedSubcategory={subcategoryParam || ""}
                    onCategoryChange={(category) => {
                      updateFilters({ category, subcategory: null })
                      setMobileFiltersOpen(false)
                    }}
                    onSubcategoryChange={(subcategory) => {
                      updateFilters({ subcategory })
                      setMobileFiltersOpen(false)
                    }}
                  />
                </ScrollArea>
              </SheetContent>
            </Sheet>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-1">
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Desktop filters */}
        {!isMobile && (
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters} disabled={!hasFilters}>
                  Clear All
                </Button>
              </div>
              <ProductFilters
                selectedCategory={categoryParam || ""}
                selectedSubcategory={subcategoryParam || ""}
                onCategoryChange={(category) => updateFilters({ category, subcategory: null })}
                onSubcategoryChange={(subcategory) => updateFilters({ subcategory })}
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
