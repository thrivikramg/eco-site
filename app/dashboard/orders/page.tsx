"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import {
  Search,
  FileText,
  Filter,
  Download,
  Eye,
  Printer,
  PackageCheck,
  X,
  RefreshCw
} from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../../../components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-38295",
    date: "2025-06-01",
    customer: "Alex Johnson",
    amount: 125.99,
    status: "delivered",
    address: "123 Green St, Chicago, IL 60007",
    items: 3
  },
  {
    id: "ORD-38294",
    date: "2025-06-01",
    customer: "Taylor Smith",
    amount: 89.95,
    status: "pending",
    address: "456 Eco Ave, Boston, MA 02108",
    items: 2
  },
  {
    id: "ORD-38293",
    date: "2025-05-31",
    customer: "Jordan Morgan",
    amount: 235.49,
    status: "processing",
    address: "789 Sustainable Dr, Austin, TX 78701",
    items: 4
  },
  {
    id: "ORD-38292",
    date: "2025-05-31",
    customer: "Casey Rivera",
    amount: 54.99,
    status: "delivered",
    address: "101 Earth Blvd, Seattle, WA 98101",
    items: 1
  },
  {
    id: "ORD-38291",
    date: "2025-05-30",
    customer: "Jamie Lee",
    amount: 149.50,
    status: "delivered",
    address: "202 Recycled Rd, Portland, OR 97201",
    items: 3
  },
  {
    id: "ORD-38290",
    date: "2025-05-30",
    customer: "Riley Cooper",
    amount: 78.25,
    status: "cancelled",
    address: "303 Compost Circle, Denver, CO 80202",
    items: 2
  },
  {
    id: "ORD-38289",
    date: "2025-05-29",
    customer: "Sam Green",
    amount: 187.75,
    status: "pending",
    address: "404 Solar Panel Lane, San Francisco, CA 94105",
    items: 4
  },
  {
    id: "ORD-38288",
    date: "2025-05-29",
    customer: "Drew Wilson",
    amount: 65.90,
    status: "delivered",
    address: "505 Reusable St, New York, NY 10001",
    items: 2
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentTab, setCurrentTab] = useState("all")

  // Filter orders based on search, date range, status, and current tab
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    const matchesTab = currentTab === "all" || 
      (currentTab === "delivered" && order.status === "delivered") ||
      (currentTab === "pending" && (order.status === "pending" || order.status === "processing")) ||
      (currentTab === "cancelled" && order.status === "cancelled")
    
    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-gray-500">View and manage your customer orders</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export Orders
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8 w-full sm:w-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>${order.amount.toFixed(2)}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Printer className="h-4 w-4" />
                        </Button>
                        {order.status === "pending" && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <PackageCheck className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No orders found matching your criteria
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
