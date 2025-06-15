"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

interface ProductsHeaderProps {
  totalProducts: number
  searchQuery: string
  onSearch: (query: string) => void
  sortOption: string
  onSortChange: (option: string) => void
}

export default function ProductsHeader({
  totalProducts,
  searchQuery,
  onSearch,
  sortOption,
  onSortChange,
}: ProductsHeaderProps) {
  const [searchValue, setSearchValue] = useState(searchQuery)

  // Update local state when searchQuery prop changes
  useEffect(() => {
    setSearchValue(searchQuery)
  }, [searchQuery])

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchValue)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">Products</h2>
        <p className="text-sm text-muted-foreground">
          {totalProducts} {totalProducts === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="h-10 pl-9 pr-4 text-sm sm:text-base"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search products"
          />
        </form>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            Sort by:
          </label>
          <Select value={sortOption} onValueChange={onSortChange}>
            <SelectTrigger id="sort" className="h-10 w-[140px] sm:w-[160px] text-xs sm:text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured" className="text-xs sm:text-sm">
                Featured
              </SelectItem>
              <SelectItem value="price-asc" className="text-xs sm:text-sm">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price-desc" className="text-xs sm:text-sm">
                Price: High to Low
              </SelectItem>
              <SelectItem value="name-asc" className="text-xs sm:text-sm">
                Name: A to Z
              </SelectItem>
              <SelectItem value="name-desc" className="text-xs sm:text-sm">
                Name: Z to A
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
