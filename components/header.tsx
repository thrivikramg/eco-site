"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, LogIn, Store, Sparkles, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import AuthModal from "@/components/auth-modal"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Services", href: "/services" },
  { name: "Eco Library", href: "/eco-library" },
  { name: "Community", href: "/community" },
]

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()
  
  // Check if user is a vendor (in a real app, this would come from user data)
  const isVendor = user?.role === 'vendor' || false

  // Initialize cart with a safe default
  const cart = useCart()
  const cartItems = cart?.cart || []
  const cartItemCount = cartItems.length || 0

  // Set mounted state after component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-sm" : "bg-white/80"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary animate-fade-in">
            Eco<span className="text-green-700">Grow</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 animate-fade-in">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm hover:text-primary transition-colors ${
                pathname === item.href ? "font-medium text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
              )}
            </Link>
          ))}
          
          {/* AI Learning Assistant Button */}
          <Link href="/ai-learning" className="relative group">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-200 transition-all duration-300 transform hover:scale-105">
              <Bot className="h-4 w-4" />
              <span>Learn with AI</span>
              <div className="absolute -top-1 -right-1">
                <div className="relative">
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Ask me anything about sustainability! ✨
            </div>
          </Link>
          
          {/* Show appropriate button based on user role */}
          {isVendor ? (
            <Link href="/dashboard">
              <Button
                variant="default"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-md border-2 border-green-500 flex items-center gap-1.5 px-4 py-2 transform hover:scale-105 transition-all shadow-sm hover:shadow-md"
              >
                <Store className="h-4 w-4" />
                Vendor Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/sell">
              <Button
                variant="default"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-md border-2 border-green-500 flex items-center gap-1.5 px-4 py-2 transform hover:scale-105 transition-all shadow-sm hover:shadow-md"
              >
                <Store className="h-4 w-4" />
                Sell on EcoGrow
              </Button>
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 animate-fade-in">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5 transition-transform hover:scale-110" />
              {mounted && cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 transition-transform hover:scale-110">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                    <AvatarFallback>
                      {user?.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=orders" className="cursor-pointer w-full">
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=bookings" className="cursor-pointer w-full">
                    Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=referrals" className="cursor-pointer w-full">
                    Referrals
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=settings" className="cursor-pointer w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                {isVendor && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer w-full text-green-600 font-medium">
                      Vendor Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer" onClick={() => logout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsAuthModalOpen(true)}>
              <LogIn className="h-5 w-5 transition-transform hover:scale-110" />
              <span className="sr-only">Login</span>
            </Button>
          )}
        </div>
      </div>

      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </header>
  )
}
