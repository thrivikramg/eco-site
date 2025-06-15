"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, User, Bot, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
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

// Menu items for desktop (hamburger menu)
const desktopMenuItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Eco Library", href: "/eco-library" },
  { name: "Community", href: "/community" },
  { name: "Learn with AI", href: "/ai-assistant", icon: <Bot className="h-4 w-4" /> },
  { name: "Me", href: "/profile", icon: <User className="h-4 w-4" /> },
]

// Mobile menu items (full navigation)
const mobileMenuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Services", href: "/services" },
  { name: "Eco Library", href: "/eco-library" },
  { name: "Community", href: "/community" },
  { name: "Learn with AI", href: "/ai-assistant" },
  { name: "Sell on EcoGrow", href: "/sell" },
]

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()
  
  const isVendor = user?.role === 'vendor' || false
  const cart = useCart()
  const cartItems = cart?.cart || []
  const cartItemCount = cartItems.length || 0

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle mobile search
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch)
  }

  return (
    <header className={`sticky top-0 z-50 w-full bg-white border-b transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Mobile: Hamburger Menu */}
        <div className="flex items-center md:hidden">
          <button 
            className="p-2 -ml-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Desktop: Hamburger Menu */}
        <div 
          className="hidden md:flex relative group items-center"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <button 
            className="p-2 -ml-2 rounded-md hover:bg-gray-100 transition-colors flex items-center"
            aria-label="Toggle menu"
          >
            <Menu className={`h-6 w-6 text-gray-700 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} />
            <span className="ml-1 text-sm font-medium hidden md:inline-block">Menu</span>
          </button>
          
          {/* Desktop Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
              <nav className="flex flex-col">
                {desktopMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium hover:bg-gray-50 ${
                      pathname === item.href ? 'text-primary bg-gray-50' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Logo - Always centered on mobile */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-primary">
              Eco<span className="text-green-700">Grow</span>
            </span>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for products, services, more"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        {showMobileSearch && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white p-4 shadow-md z-40">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, services, more"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/shop">
            <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
              Shop
            </Button>
          </Link>
          
          <Link href="/sell">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 h-9">
              Sell on EcoGrow
            </Button>
          </Link>
          
          <Link href="/ai-assistant">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 h-9 flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Learn with AI
            </Button>
          </Link>
        </div>

        {/* Right: Cart and Auth */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Mobile Search Toggle */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            onClick={toggleMobileSearch}
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {mounted && cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                    <AvatarFallback>
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="p-2">
                  <p className="font-medium">{user?.name || 'User'}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/orders">
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                </Link>
                {isVendor && (
                  <Link href="/vendor/dashboard">
                    <DropdownMenuItem>Vendor Dashboard</DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => logout()} className="text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsAuthModalOpen(true)}
              className="rounded-full"
            >
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs bg-white pt-4 overflow-y-auto shadow-xl">
          <div className="px-4 py-2 relative">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute right-4 top-2 text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col space-y-1 mt-8">
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 text-base font-medium rounded-md ${
                    pathname === item.href 
                      ? 'bg-gray-100 text-primary' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsAuthModalOpen(true)
                  }}
                  className="w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Login / Sign Up
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </header>
  )
}
