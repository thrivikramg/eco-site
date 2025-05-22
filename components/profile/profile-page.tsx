"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Package,
  Calendar,
  Users,
  Settings,
  LogOut,
  Copy,
  Facebook,
  Twitter,
  Instagram,
  PhoneIcon as WhatsApp,
  Mail,
  Eye,
  Clock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import AuthModal from "@/components/auth-modal"

// Mock user data
const userData = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  avatar: "/placeholder.svg?height=100&width=100&text=RS",
  initials: "RS",
  joinDate: "May 2023",
  referralCode: "RAHUL25",
  referralLink: "https://ecogrow.com/ref/RAHUL25",
  referralCount: 5,
  referralPoints: 250,
}

// Mock orders data
const orders = [
  {
    id: "ORD-2023-1234",
    date: "May 15, 2025",
    status: "Delivered",
    total: "₹2,499",
    items: [
      {
        name: "Organic Plant Food",
        quantity: 2,
        price: "₹599",
        image: "/placeholder.svg?height=80&width=80&text=Plant+Food",
      },
      {
        name: "Bamboo Toothbrush Set",
        quantity: 1,
        price: "₹349",
        image: "/placeholder.svg?height=80&width=80&text=Toothbrush",
      },
      {
        name: "Herbal Hair Oil",
        quantity: 1,
        price: "₹499",
        image: "/placeholder.svg?height=80&width=80&text=Hair+Oil",
      },
    ],
  },
  {
    id: "ORD-2023-1189",
    date: "April 28, 2025",
    status: "Delivered",
    total: "₹1,899",
    items: [
      {
        name: "Neem Soap - Pack of 3",
        quantity: 1,
        price: "₹299",
        image: "/placeholder.svg?height=80&width=80&text=Neem+Soap",
      },
      {
        name: "Vermicompost - 5kg",
        quantity: 1,
        price: "₹450",
        image: "/placeholder.svg?height=80&width=80&text=Vermicompost",
      },
      {
        name: "Clay Pots Set",
        quantity: 1,
        price: "₹1,150",
        image: "/placeholder.svg?height=80&width=80&text=Clay+Pots",
      },
    ],
  },
]

// Mock bookings data
const bookings = [
  {
    id: "BKG-2023-5678",
    service: "Organic Pest Control",
    date: "May 20, 2025",
    time: "10:00 AM - 12:00 PM",
    status: "Confirmed",
    amount: "₹1,499",
    address: "123 Green Street, Chennai, Tamil Nadu",
    professional: {
      name: "Vijay Kumar",
      rating: 4.8,
      image: "/placeholder.svg?height=50&width=50&text=VK",
    },
  },
  {
    id: "BKG-2023-5432",
    service: "Garden Setup & Maintenance",
    date: "June 5, 2025",
    time: "9:00 AM - 11:00 AM",
    status: "Scheduled",
    amount: "₹2,999",
    address: "123 Green Street, Chennai, Tamil Nadu",
    professional: {
      name: "Priya Patel",
      rating: 4.9,
      image: "/placeholder.svg?height=50&width=50&text=PP",
    },
  },
  {
    id: "BKG-2023-4987",
    service: "Home Energy Audit",
    date: "April 10, 2025",
    time: "2:00 PM - 4:00 PM",
    status: "Completed",
    amount: "₹1,999",
    address: "123 Green Street, Chennai, Tamil Nadu",
    professional: {
      name: "Arjun Singh",
      rating: 4.7,
      image: "/placeholder.svg?height=50&width=50&text=AS",
    },
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders")
  const [savedOrders, setSavedOrders] = useState([]) // Moved before conditional return
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()

  // In a real app, we would check authentication status and redirect if not authenticated
  // For demo purposes, we'll show the auth modal
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      router.push("/") // Redirect immediately
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    // In a real app, we would fetch this from an API
    // For demo purposes, we're using localStorage
    const storedOrders = JSON.parse(localStorage.getItem("ecoOrders") || "[]")
    setSavedOrders(storedOrders)
  }, [])

  const copyReferralLink = () => {
    navigator.clipboard.writeText(userData.referralLink)
    toast({
      title: "Copied to clipboard",
      description: "Referral link has been copied to your clipboard.",
    })
  }

  const handleLogout = () => {
    logout()
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  if (showAuthModal) {
    return <AuthModal open={true} onOpenChange={() => setShowAuthModal(false)} />
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback>{userData.initials}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{userData.email}</p>
                  <p className="text-xs text-gray-500">Member since {userData.joinDate}</p>
                </div>
              </CardContent>
            </Card>

            <div className="hidden lg:block">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="h-5 w-5 mr-2" />
                  Orders
                </Button>
                <Button
                  variant={activeTab === "bookings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("bookings")}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Bookings
                </Button>
                <Button
                  variant={activeTab === "referrals" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("referrals")}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Referrals
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </Button>
              </nav>

              <div className="mt-6 pt-6 border-t">
                <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            <div className="lg:hidden">
              <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="orders">
                    <Package className="h-5 w-5" />
                    <span className="sr-only">Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="bookings">
                    <Calendar className="h-5 w-5" />
                    <span className="sr-only">Bookings</span>
                  </TabsTrigger>
                  <TabsTrigger value="referrals">
                    <Users className="h-5 w-5" />
                    <span className="sr-only">Referrals</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Main Content */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>View and manage your product orders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {savedOrders.length > 0 ? (
                      <div className="space-y-6">
                        {savedOrders.map((order) => (
                          <div key={order.id} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{order.id}</h3>
                                  <Badge variant="success">Processing</Badge>
                                </div>
                                <p className="text-sm text-gray-500">
                                  Ordered on{" "}
                                  {new Date(order.date).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">₹{order.total.toFixed(2)}</span>
                                <Link href={`/order-confirmation?orderId=${order.id}`}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="space-y-4">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                                      <Image
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-grow">
                                      <h4 className="font-medium">{item.name}</h4>
                                      <div className="flex items-center text-sm text-gray-500">
                                        <span>Qty: {item.quantity}</span>
                                        <span className="mx-2">•</span>
                                        <span>₹{item.price.toFixed(2)}</span>
                                      </div>
                                    </div>
                                    <Link href={`/shop/product/${item.id}`}>
                                      <Button variant="ghost" size="sm">
                                        Buy Again
                                      </Button>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                        <Link href="/shop">
                          <Button>Start Shopping</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                  {orders.length > 0 && (
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">View All Orders</Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>View and manage your service bookings.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookings.length > 0 ? (
                      <div className="space-y-6">
                        {bookings.map((booking) => (
                          <div key={booking.id} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{booking.service}</h3>
                                  <Badge
                                    variant={
                                      booking.status === "Completed"
                                        ? "success"
                                        : booking.status === "Confirmed"
                                          ? "outline"
                                          : "secondary"
                                    }
                                  >
                                    {booking.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {booking.id} • {booking.date}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{booking.amount}</span>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Details
                                </Button>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span>{booking.time}</span>
                                  </div>
                                  <div className="text-sm text-gray-500">{booking.address}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage
                                      src={booking.professional.image || "/placeholder.svg"}
                                      alt={booking.professional.name}
                                    />
                                    <AvatarFallback>
                                      {booking.professional.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{booking.professional.name}</div>
                                    <div className="flex items-center text-sm">
                                      <svg
                                        className="h-4 w-4 text-yellow-400 fill-current"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                      </svg>
                                      <span className="ml-1">{booking.professional.rating}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-4">
                                {booking.status === "Scheduled" || booking.status === "Confirmed" ? (
                                  <>
                                    <Button variant="outline" size="sm">
                                      Reschedule
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-500">
                                      Cancel
                                    </Button>
                                  </>
                                ) : booking.status === "Completed" ? (
                                  <>
                                    <Button variant="outline" size="sm">
                                      Leave Review
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      Book Again
                                    </Button>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                        <p className="text-gray-500 mb-4">You haven't booked any services yet.</p>
                        <Link href="/services">
                          <Button>Explore Services</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                  {bookings.length > 0 && (
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">View All Bookings</Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              {/* Referrals Tab */}
              <TabsContent value="referrals" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>My Referrals</CardTitle>
                    <CardDescription>Share and earn rewards when friends join EcoGrow.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
                        <h3 className="text-xl font-bold mb-2">Earn ₹100 for every friend who joins</h3>
                        <p className="text-gray-600 mb-6">
                          Share your unique referral link with friends and family. When they sign up and make their
                          first purchase, you both get ₹100 in EcoGrow credits!
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                          <div className="relative w-full">
                            <Input
                              value={userData.referralLink}
                              readOnly
                              className="pr-10 bg-white"
                              onClick={(e) => e.currentTarget.select()}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={copyReferralLink}
                            >
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Copy</span>
                            </Button>
                          </div>
                          <div className="flex-shrink-0">
                            <Button className="w-full sm:w-auto" onClick={copyReferralLink}>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Link
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                          <Button variant="outline" size="sm" className="rounded-full">
                            <Facebook className="h-4 w-4 mr-2" />
                            Facebook
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <Instagram className="h-4 w-4 mr-2" />
                            Instagram
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <WhatsApp className="h-4 w-4 mr-2" />
                            WhatsApp
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Your Referral Code</h3>
                              <Button variant="ghost" size="sm" onClick={copyReferralLink}>
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                              </Button>
                            </div>
                            <div className="mt-2 text-2xl font-bold tracking-wider text-center py-2 bg-gray-50 rounded-md">
                              {userData.referralCode}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-medium mb-4">Referral Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-4 rounded-md text-center">
                                <div className="text-2xl font-bold">{userData.referralCount}</div>
                                <div className="text-sm text-gray-500">Friends Referred</div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-md text-center">
                                <div className="text-2xl font-bold">₹{userData.referralPoints}</div>
                                <div className="text-sm text-gray-500">Credits Earned</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Referral History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8">
                            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">No referrals yet</h3>
                            <p className="text-gray-500 mb-4">
                              Share your referral link with friends to start earning rewards.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences and information.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={userData.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" defaultValue={userData.email} type="email" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue="+91 98765 43210" type="tel" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" defaultValue="1990-05-15" type="date" />
                          </div>
                        </div>
                        <Button className="mt-4">Save Changes</Button>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Address Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input id="address" defaultValue="123 Green Street" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" defaultValue="Chennai" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" defaultValue="Tamil Nadu" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input id="pincode" defaultValue="600001" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" defaultValue="India" />
                          </div>
                        </div>
                        <Button className="mt-4">Save Address</Button>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Password & Security</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                        <Button className="mt-4">Update Password</Button>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-notifications" className="font-medium">
                                Email Notifications
                              </Label>
                              <p className="text-sm text-gray-500">Receive order updates and promotions via email</p>
                            </div>
                            <Switch id="email-notifications" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="sms-notifications" className="font-medium">
                                SMS Notifications
                              </Label>
                              <p className="text-sm text-gray-500">Receive order updates and promotions via SMS</p>
                            </div>
                            <Switch id="sms-notifications" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="marketing-emails" className="font-medium">
                                Marketing Emails
                              </Label>
                              <p className="text-sm text-gray-500">Receive newsletters and special offers</p>
                            </div>
                            <Switch id="marketing-emails" defaultChecked />
                          </div>
                        </div>
                        <Button className="mt-4">Save Preferences</Button>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4 text-red-500">Danger Zone</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Delete Account</p>
                              <p className="text-sm text-gray-500">
                                Permanently delete your account and all associated data
                              </p>
                            </div>
                            <Button variant="destructive">Delete Account</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
