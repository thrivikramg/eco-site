"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { 
  Search, 
  AlertTriangle, 
  Calendar,
  RefreshCw,
  Download
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../../../components/ui/pagination"

// Mock data for inventory tracking
const mockInventory = [
  {
    id: "PRD-8937",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    stock: 124,
    threshold: 20,
    lastUpdated: "2025-06-01",
    status: "healthy",
    movement: "stable",
  },
  {
    id: "PRD-8936",
    name: "Bamboo Water Bottle",
    category: "Accessories",
    stock: 87,
    threshold: 25,
    lastUpdated: "2025-05-30",
    status: "healthy",
    movement: "decreasing",
  },
  {
    id: "PRD-8935",
    name: "Recycled Paper Notebook",
    category: "Stationery",
    stock: 215,
    threshold: 50,
    lastUpdated: "2025-05-29",
    status: "healthy",
    movement: "increasing",
  },
  {
    id: "PRD-8934",
    name: "Hemp Tote Bag",
    category: "Accessories",
    stock: 32,
    threshold: 30,
    lastUpdated: "2025-05-29",
    status: "warning",
    movement: "decreasing",
  },
  {
    id: "PRD-8933",
    name: "Bamboo Toothbrush Set",
    category: "Personal Care",
    stock: 5,
    threshold: 20,
    lastUpdated: "2025-05-28",
    status: "critical",
    movement: "stable",
  },
  {
    id: "PRD-8932",
    name: "Eco-Friendly Soap Bars",
    category: "Personal Care",
    stock: 3,
    threshold: 15,
    lastUpdated: "2025-05-28",
    status: "critical",
    movement: "decreasing",
  },
  {
    id: "PRD-8931",
    name: "Beeswax Food Wraps",
    category: "Kitchen",
    stock: 0,
    threshold: 10,
    lastUpdated: "2025-05-27",
    status: "out_of_stock",
    movement: "stable",
  }
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter inventory based on search and status
  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "healthy" && item.status === "healthy") ||
      (statusFilter === "warning" && item.status === "warning") ||
      (statusFilter === "critical" && (item.status === "critical" || item.status === "out_of_stock"))
    
    return matchesSearch && matchesStatus
  })

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Healthy</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Low Stock</Badge>
      case "critical":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>
      case "out_of_stock":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Out of Stock</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getMovementIndicator = (movement: string) => {
    switch (movement) {
      case "increasing":
        return <span className="text-green-600">↑</span>
      case "decreasing":
        return <span className="text-red-600">↓</span>
      case "stable":
        return <span className="text-gray-600">→</span>
      default:
        return null
    }
  }

  const getLowStockCount = () => {
    return mockInventory.filter(item => 
      item.status === "warning" || 
      item.status === "critical" || 
      item.status === "out_of_stock"
    ).length
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory Tracking</h1>
          <p className="text-gray-500">Monitor and manage your product stock levels</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Schedule Restock
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export Inventory
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Inventory Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInventory.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              Low Stock Alerts
              <AlertTriangle className="h-4 w-4 text-yellow-500 ml-2" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{getLowStockCount()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Items below threshold level
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,850</div>
            <p className="text-xs text-muted-foreground mt-1">
              Estimated inventory value
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Inventory Status</CardTitle>
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-8 w-full sm:w-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="warning">Low Stock</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className={`font-medium ${
                      item.stock === 0 ? 'text-red-600' :
                      item.stock < item.threshold ? 'text-yellow-600' : ''
                    }`}>
                      {item.stock}
                    </TableCell>
                    <TableCell>{item.threshold}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>{getStockStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-xl">{getMovementIndicator(item.movement)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    No inventory items found matching your criteria
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
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  )
}
