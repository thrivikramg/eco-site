"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

export interface Address {
  _id?: string
  label: string
  name: string
  phone: string
  street: string
  city: string
  state: string
  pincode: string
  country: string
  isDefault?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  image?: string // Google Auth profile picture
  phone?: string
  role?: "buyer" | "vendor"
  addresses?: Address[]
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>
  updateUser: (newUser: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
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
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password) {
      const isVendor = email.toLowerCase() === "test@vendor.com"
      const mockUser: User = {
        id: "user-123",
        name: "Rahul Sharma",
        email: email,
        avatar: "/placeholder.svg?height=100&width=100&text=RS",
        role: isVendor ? "vendor" : "buyer",
        addresses: [
          {
            label: "Home",
            name: "Rahul Sharma",
            phone: "9876543210",
            street: "123 MG Road",
            city: "Bengaluru",
            state: "Karnataka",
            pincode: "560001",
            country: "India",
            isDefault: true,
          },
        ],
      }

      setUser(mockUser)
      setIsAuthenticated(true)
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

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (name && email && password) {
      const isVendor = email.toLowerCase().includes("vendor")
      const mockUser: User = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        avatar:
          "/placeholder.svg?height=100&width=100&text=" +
          name
            .split(" ")
            .map((n) => n[0])
            .join(""),
        role: isVendor ? "vendor" : "buyer",
        addresses: [
          {
            label: "Home",
            name: name,
            phone: "9876543210",
            street: "123 MG Road",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            country: "India",
            isDefault: true,
          },
        ],
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(mockUser))

      return true
    }

    return false
  }

  const updateUser = (newUser: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null
      const updatedUser = { ...prevUser, ...newUser }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
