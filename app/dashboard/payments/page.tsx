"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { 
  Search, 
  DollarSign, 
  Filter, 
  Download, 
  Calendar,
  ArrowDown,
  ArrowUp,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  X
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

// Mock data for payments
const mockPayments = [
  {
    id: "PAY-39281",
    date: "2025-06-01",
    amount: 1250.75,
    type: "payout",
    status: "completed",
    reference: "Monthly payout"
  },
  {
    id: "PAY-39280",
    date: "2025-05-15",
    amount: 954.80,
    type: "payout",
    status: "completed",
    reference: "Bi-weekly payout"
  },
  {
    id: "PAY-39275",
    date: "2025-05-01",
    amount: 1498.32,
    type: "payout",
    status: "completed",
    reference: "Monthly payout"
  },
  {
    id: "ORD-38295",
    date: "2025-06-01",
    amount: 125.99,
    type: "sale",
    status: "completed",
    reference: "Order #38295"
  },
  {
    id: "ORD-38294",
    date: "2025-06-01",
    amount: 89.95,
    type: "sale",
    status: "completed",
    reference: "Order #38294"
  },
  {
    id: "REF-1039",
    date: "2025-05-30",
    amount: -45.50,
    type: "refund",
    status: "completed",
    reference: "Refund for Order #38290"
  },
  {
    id: "ORD-38293",
    date: "2025-05-31",
    amount: 235.49,
    type: "sale",
    status: "pending",
    reference: "Order #38293"
  },
  {
    id: "REF-1038",
    date: "2025-05-28",
    amount: -35.75,
    type: "refund",
    status: "completed",
    reference: "Refund for Order #38285"
  },
  {
    id: "FEE-5932",
    date: "2025-05-31",
    amount: -79.99,
    type: "fee",
    status: "completed",
    reference: "Platform commission"
  },
]

// Mock earnings data
const earningsData = {
  totalEarnings: 4875.32,
  pendingPayouts: 784.50,
  processingFees: 189.75,
  refundsTotal: 81.25,
  availableBalance: 513.82
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [currentTab, setCurrentTab] = useState("all")

  // Filter payments based on search, type, date range, and current tab
  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === "all" || payment.type === typeFilter
    
    // Date filtering would be implemented here with actual date parsing
    const matchesDateRange = true
    
    const matchesTab = currentTab === "all" || 
      (currentTab === "incoming" && (payment.type === "sale" || payment.type === "payout")) ||
      (currentTab === "outgoing" && (payment.type === "refund" || payment.type === "fee"))
    
    return matchesSearch && matchesType && matchesDateRange && matchesTab
  })

  const getAmountColor = (payment: typeof mockPayments[0]) => {
    if (payment.type === "sale" || payment.type === "payout") {
      return "text-green-600";
    } else if (payment.type === "refund" || payment.type === "fee") {
      return "text-red-600";
    }
    return "";
  }

  const getAmountPrefix = (payment: typeof mockPayments[0]) => {
    if (payment.type === "sale" || payment.type === "payout") {
      return "+";
    } else if (payment.type === "refund" || payment.type === "fee") {
      return "";  // Negative sign already included in the amount
    }
    return "";
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ArrowDown className="h-4 w-4 text-green-600" />
      case "payout":
        return <CreditCard className="h-4 w-4 text-blue-600" />
      case "refund":
        return <ArrowUp className="h-4 w-4 text-red-600" />
      case "fee":
        return <DollarSign className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Payments & Transactions</h1>
          <p className="text-gray-500">Track your sales, payouts and refunds</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export Statement
          </Button>
        </div>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${earningsData.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">All time earnings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${earningsData.availableBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready for withdrawal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${earningsData.pendingPayouts.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Processing / on hold</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">${earningsData.processingFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Platform & payment fees</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${earningsData.refundsTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Refunds processed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="incoming">Incoming</TabsTrigger>
                <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-8 w-full sm:w-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sale">Sales</SelectItem>
                    <SelectItem value="payout">Payouts</SelectItem>
                    <SelectItem value="refund">Refunds</SelectItem>
                    <SelectItem value="fee">Fees</SelectItem>
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
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(payment.type)}
                        <span className="capitalize">{payment.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className={`font-medium ${getAmountColor(payment)}`}>
                      {getAmountPrefix(payment)}${Math.abs(payment.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>{payment.reference}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No transactions found matching your criteria
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
