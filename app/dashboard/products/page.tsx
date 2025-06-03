"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { 
  Search, 
  Plus, 
  Filter, 
  Upload, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
  Check
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Badge } from "../../../components/ui/badge"
import { Checkbox } from "../../../components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../../../components/ui/pagination"

// Mock data for products
const mockProducts = [
  {
    id: "PRD-8937",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 124,
    variants: 4,
    status: "active",
    image: "/products/tshirt.jpg"
  },
  {
    id: "PRD-8936",
    name: "Bamboo Water Bottle",
    category: "Accessories",
    price: 24.95,
    stock: 87,
    variants: 3,
    status: "active",
    image: "/products/bottle.jpg"
  },
  {
    id: "PRD-8935",
    name: "Recycled Paper Notebook",
    category: "Stationery",
    price: 12.50,
    stock: 215,
    variants: 2,
    status: "active",
    image: "/products/notebook.jpg"
  },
  {
    id: "PRD-8934",
    name: "Hemp Tote Bag",
    category: "Accessories",
    price: 18.99,
    stock: 162,
    variants: 3,
    status: "active",
    image: "/products/tote.jpg"
  },
  {
    id: "PRD-8933",
    name: "Bamboo Toothbrush Set",
    category: "Personal Care",
    price: 15.99,
    stock: 5,
    variants: 2,
    status: "low_stock",
    image: "/products/toothbrush.jpg"
  },
  {
    id: "PRD-8932",
    name: "Eco-Friendly Soap Bars",
    category: "Personal Care",
    price: 8.99,
    stock: 3,
    variants: 5,
    status: "low_stock",
    image: "/products/soap.jpg"
  },
  {
    id: "PRD-8931",
    name: "Beeswax Food Wraps",
    category: "Kitchen",
    price: 22.50,
    stock: 0,
    variants: 3,
    status: "out_of_stock",
    image: "/products/wrap.jpg"
  },
  {
    id: "PRD-8930",
    name: "Stainless Steel Straw Set",
    category: "Kitchen",
    price: 14.95,
    stock: 178,
    variants: 2,
    status: "active",
    image: "/products/straws.jpg"
  },
  {
    id: "PRD-8929",
    name: "Recycled Plastic Plant Pots",
    category: "Garden",
    price: 19.99,
    stock: 0,
    variants: 4,
    status: "hidden",
    image: "/products/pots.jpg"
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  // Filter products based on search, category, status, and active tab
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "in_stock" && product.status === "active") ||
      (activeTab === "low_stock" && product.status === "low_stock") ||
      (activeTab === "out_of_stock" && product.status === "out_of_stock") ||
      (activeTab === "hidden" && product.status === "hidden")
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTab
  })

  // Extract unique categories for filter dropdown
  const uniqueCategories = Array.from(new Set(mockProducts.map(product => product.category)))

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">In Stock</Badge>
      case "low_stock":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Low Stock</Badge>
      case "out_of_stock":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Out of Stock</Badge>
      case "hidden":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">Hidden</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="in_stock">In Stock</TabsTrigger>
                <TabsTrigger value="low_stock">Low Stock</TabsTrigger>
                <TabsTrigger value="out_of_stock">Out of Stock</TabsTrigger>
                <TabsTrigger value="hidden">Hidden</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8 w-full sm:w-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Tabs>
        </CardHeader>

        <CardContent>
          {selectedProducts.length > 0 && (
            <div className="mb-4 p-2 flex items-center justify-between bg-slate-50 rounded-md border">
              <span className="text-sm font-medium ml-2">{selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Update Status</Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete Selected</Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all products"
                  />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleProductSelection(product.id)}
                        aria-label={`Select ${product.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                          IMG
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {product.stock === 0 ? (
                          <span className="text-red-600 font-medium">0</span>
                        ) : product.stock < 10 ? (
                          <span className="text-yellow-600 font-medium">{product.stock}</span>
                        ) : (
                          <span>{product.stock}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.variants}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="flex items-center cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" /> Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {product.status !== "active" && (
                            <DropdownMenuItem className="flex items-center text-green-600 cursor-pointer">
                              <Check className="h-4 w-4 mr-2" /> Mark as Active
                            </DropdownMenuItem>
                          )}
                          {product.status !== "hidden" && (
                            <DropdownMenuItem className="flex items-center text-gray-600 cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" /> Hide Product
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center text-red-600 cursor-pointer">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium">No products found</h3>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  )
}
