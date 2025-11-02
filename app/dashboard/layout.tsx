"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "../../components/auth-provider"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Boxes, 
  CreditCard, 
  Store, 
  BarChart, 
  UserCircle,
  Menu,
  X
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const { status } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  
  useEffect(() => {
    // TEMPORARY FOR DEVELOPMENT: Allow all users to access the dashboard
    // Once development is complete, uncomment the role check below
    const checkAuthorization = () => {
      if (status === 'loading') {
        // Still checking auth status, do nothing yet.
        return;
      }

      // PRODUCTION MODE: Uncomment this code when ready
      if (!isAuthenticated) {
        // User is not logged in, redirect to login
        router.push('/')
        return
      }

      // Check if user has vendor role
      if (!user || user.role !== 'vendor') {
        // User is not a vendor, redirect to home with message
        setAuthorized(false)
      } else {
        setAuthorized(true)
      }

      setLoading(false)
    }
    
    checkAuthorization()
  }, [isAuthenticated, user, router, status])
  
  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: LayoutDashboard,
      current: pathname === '/dashboard'
    },
    { 
      name: 'Orders', 
      href: '/dashboard/orders', 
      icon: ShoppingBag,
      current: pathname === '/dashboard/orders'
    },
    { 
      name: 'Products', 
      href: '/dashboard/products', 
      icon: Package,
      current: pathname === '/dashboard/products'
    },
    { 
      name: 'Inventory', 
      href: '/dashboard/inventory', 
      icon: Boxes,
      current: pathname === '/dashboard/inventory'
    },
    { 
      name: 'Payments', 
      href: '/dashboard/payments', 
      icon: CreditCard,
      current: pathname === '/dashboard/payments'
    },
    { 
      name: 'Store Settings', 
      href: '/dashboard/store', 
      icon: Store,
      current: pathname === '/dashboard/store'
    },
    { 
      name: 'Analytics', 
      href: '/dashboard/analytics', 
      icon: BarChart,
      current: pathname === '/dashboard/analytics'
    },
    { 
      name: 'Profile', 
      href: '/dashboard/profile', 
      icon: UserCircle,
      current: pathname === '/dashboard/profile'
    },
  ]

  // If not authorized, show unauthorized message
  if (!loading && !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to access the vendor dashboard. Only vendor accounts can access this area.
            </AlertDescription>
          </Alert>
          <div className="text-center mt-6">
            <Link 
              href="/sell"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Become a Vendor
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-3"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // If authorized, show dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="bg-white lg:hidden fixed top-0 left-0 right-0 px-4 py-3 z-30 border-b flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-md text-gray-500 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <span className="ml-3 text-lg font-medium text-gray-900">Vendor Dashboard</span>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-green-600">EcoGrow</span>
            <span className="ml-2 text-sm text-gray-600">Vendor Portal</span>
          </Link>
        </div>
        
        <div className="px-3 py-6">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  item.current
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
