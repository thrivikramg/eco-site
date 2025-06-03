"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  ArrowDownRight, 
  ArrowUpRight, 
  ShoppingBag,
  AlertTriangle,
  Bell
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d") // 7d, 30d, 90d

  // Mock data for demo purposes
  const salesSummary = {
    "7d": {
      totalOrders: 67,
      revenue: 3890,
      refunds: 280,
      growth: 12.5
    },
    "30d": {
      totalOrders: 284,
      revenue: 16240,
      refunds: 980,
      growth: 8.2
    },
    "90d": {
      totalOrders: 897,
      revenue: 42680,
      refunds: 2340,
      growth: 14.3
    }
  }

  const currentSummary = salesSummary[timeRange as keyof typeof salesSummary]
  
  const orderStatusData = {
    delivered: 42,
    pending: 15,
    cancelled: 3
  }
  
  const topProducts = [
    { name: 'Organic Cotton T-Shirt', sold: 24, revenue: 1200 },
    { name: 'Bamboo Water Bottle', sold: 18, revenue: 540 },
    { name: 'Recycled Paper Notebook', sold: 15, revenue: 225 },
    { name: 'Hemp Tote Bag', sold: 12, revenue: 300 },
  ]
  
  const lowStockItems = [
    { name: 'Bamboo Toothbrush', remaining: 5, threshold: 10 },
    { name: 'Eco-Friendly Soap', remaining: 3, threshold: 15 },
    { name: 'Beeswax Food Wrap', remaining: 2, threshold: 8 },
  ]
  
  const notifications = [
    { id: 1, type: 'admin', message: 'New sustainability guidelines published. Please review.', time: '2 hours ago' },
    { id: 2, type: 'order', message: 'New order #38294 received', time: '3 hours ago' },
    { id: 3, type: 'inventory', message: 'Bamboo Toothbrush is running low on stock', time: '1 day ago' },
    { id: 4, type: 'payment', message: 'Payout of $1,240 has been processed', time: '2 days ago' },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back to your vendor dashboard</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSummary.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +{currentSummary.growth}%
              </span>{" "}
              from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentSummary.revenue}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +{currentSummary.growth}%
              </span>{" "}
              from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentSummary.refunds}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                -2.5%
              </span>{" "}
              from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(currentSummary.totalOrders * 0.4)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +5.1%
              </span>{" "}
              from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Order Status & Top Products */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>
              Overview of your orders for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Delivered</span>
                    <span className="text-sm font-medium">{orderStatusData.delivered}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${(orderStatusData.delivered / (orderStatusData.delivered + orderStatusData.pending + orderStatusData.cancelled)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Pending</span>
                    <span className="text-sm font-medium">{orderStatusData.pending}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: `${(orderStatusData.pending / (orderStatusData.delivered + orderStatusData.pending + orderStatusData.cancelled)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Cancelled</span>
                    <span className="text-sm font-medium">{orderStatusData.cancelled}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-500 h-2.5 rounded-full"
                      style={{ width: `${(orderStatusData.cancelled / (orderStatusData.delivered + orderStatusData.pending + orderStatusData.cancelled)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best-selling products in the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sold} sold</p>
                  </div>
                  <p className="text-sm font-medium">${product.revenue}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" size="sm" className="w-full text-green-600">
                View All Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Health & Notifications */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Inventory Health</CardTitle>
              <CardDescription>Products that need your attention</CardDescription>
            </div>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            {lowStockItems.map((item, i) => (
              <div key={i} className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-md">
                <div className="flex justify-between">
                  <p className="font-medium">{item.name}</p>
                  <p className={`font-medium ${item.remaining <= 5 ? 'text-red-500' : 'text-amber-500'}`}>
                    {item.remaining} remaining
                  </p>
                </div>
                <div className="w-full mt-2 bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`${item.remaining <= 5 ? 'bg-red-500' : 'bg-amber-500'} h-1.5 rounded-full`}
                    style={{ width: `${(item.remaining / item.threshold) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Manage Inventory
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent updates and alerts</CardDescription>
            </div>
            <Bell className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start pb-3 border-b last:border-b-0 last:pb-0">
                  <div 
                    className={`w-2 h-2 mt-1.5 mr-2 rounded-full ${
                      notification.type === 'admin' ? 'bg-blue-500' : 
                      notification.type === 'order' ? 'bg-green-500' : 
                      notification.type === 'inventory' ? 'bg-amber-500' : 
                      'bg-gray-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-green-600 mt-2">
                View All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
