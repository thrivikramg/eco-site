"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
  role?: 'buyer' | 'vendor'
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // Check if user is already logged in (from localStorage in this demo)
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          setIsAuthenticated(true)
        } catch (error) {
          console.error("Failed to parse stored user:", error)
          localStorage.removeItem("user")
        }
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock implementation
    // In a real app, you would call your authentication API

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful login for demo purposes
    if (email && password) {
      // Simulate a vendor user for test@vendor.com, buyer for all others
      const isVendor = email.toLowerCase() === 'test@vendor.com'
      const mockUser = {
        id: "user-123",
        name: "Rahul Sharma",
        email: email,
        avatar: "/placeholder.svg?height=100&width=100&text=RS",
        role: isVendor ? 'vendor' as const : 'buyer' as const
      }

      setUser(mockUser)
      setIsAuthenticated(true)

      // Store in localStorage for demo persistence
      localStorage.setItem("user", JSON.stringify(mockUser))

      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // This is a mock implementation
    // In a real app, you would call your registration API

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful registration for demo purposes
    if (name && email && password) {
      // For demo, we'll set any email with 'vendor' in it as a vendor role
      const isVendor = email.toLowerCase().includes('vendor')
      const mockUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        avatar:
          "/placeholder.svg?height=100&width=100&text=" +
          name
            .split(" ")
            .map((n) => n[0])
            .join(""),
        role: isVendor ? 'vendor' as const : 'buyer' as const
      }

      setUser(mockUser)
      setIsAuthenticated(true)

      // Store in localStorage for demo persistence
      localStorage.setItem("user", JSON.stringify(mockUser))

      return true
    }

    return false
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
