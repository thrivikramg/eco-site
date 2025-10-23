"use client"

import type React from "react"
import { signIn } from "next-auth/react";

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab?: "login" | "register"
  onSuccess?: () => void
}

export default function AuthModal({ open, onOpenChange, defaultTab = "login", onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    login: {
      email: "",
      password: "",
      rememberMe: false,
    },
    register: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  })
  const [errors, setErrors] = useState({
    login: {
      email: "",
      password: "",
    },
    register: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: "",
    },
  })

  const { toast } = useToast()
  const { login, register } = useAuth()

  const handleInputChange = (tab: "login" | "register", field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [tab]: {
        ...formData[tab],
        [field]: value,
      },
    })

    // Clear error when user types
    if (errors[tab][field as keyof (typeof errors)[typeof tab]]) {
      setErrors({
        ...errors,
        [tab]: {
          ...errors[tab],
          [field]: "",
        },
      })
    }
  }

  const validateLoginForm = () => {
    const newErrors = { ...errors.login }
    let isValid = true

    if (!formData.login.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.login.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.login.password) {
      newErrors.password = "Password is required"
      isValid = false
    }

    setErrors({ ...errors, login: newErrors })
    return isValid
  }

  const validateRegisterForm = () => {
    const newErrors = { ...errors.register }
    let isValid = true

    if (!formData.register.name) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.register.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.register.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.register.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.register.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    if (!formData.register.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (formData.register.password !== formData.register.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    if (!formData.register.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
      isValid = false
    }

    setErrors({ ...errors, register: newErrors })
    return isValid
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateLoginForm()) return

    setIsLoading(true)

    try {
      const success = await login(formData.login.email, formData.login.password)

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to EcoGrow!",
        })
        onOpenChange(false)
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateRegisterForm()) return

    setIsLoading(true)

    try {
      const success = await register(formData.register.name, formData.register.email, formData.register.password)

      if (success) {
        toast({
          title: "Registration successful",
          description: "Welcome to EcoGrow!",
        })
        onOpenChange(false)
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast({
          title: "Registration failed",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <DialogHeader className="bg-green-50 p-6">
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === "login" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none">
            <TabsTrigger value="login" className="rounded-none data-[state=active]:bg-white">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="rounded-none data-[state=active]:bg-white">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="p-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.login.email}
                  onChange={(e) => handleInputChange("login", "email", e.target.value)}
                  className={errors.login.email ? "border-red-500" : ""}
                />
                {errors.login.email && <p className="text-sm text-red-500">{errors.login.email}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs" onClick={() => setActiveTab("forgot-password")}>
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.login.password}
                  onChange={(e) => handleInputChange("login", "password", e.target.value)}
                  className={errors.login.password ? "border-red-500" : ""}
                />
                {errors.login.password && <p className="text-sm text-red-500">{errors.login.password}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={formData.login.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("login", "rememberMe", !!checked)}
                />
                <Label htmlFor="remember-me" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="bg-white flex items-center"
                  onClick={() => signIn("google")}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="bg-white">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="p-6">
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.register.name}
                  onChange={(e) => handleInputChange("register", "name", e.target.value)}
                  className={errors.register.name ? "border-red-500" : ""}
                />
                {errors.register.name && <p className="text-sm text-red-500">{errors.register.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.register.email}
                  onChange={(e) => handleInputChange("register", "email", e.target.value)}
                  className={errors.register.email ? "border-red-500" : ""}
                />
                {errors.register.email && <p className="text-sm text-red-500">{errors.register.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.register.password}
                  onChange={(e) => handleInputChange("register", "password", e.target.value)}
                  className={errors.register.password ? "border-red-500" : ""}
                />
                {errors.register.password && <p className="text-sm text-red-500">{errors.register.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.register.confirmPassword}
                  onChange={(e) => handleInputChange("register", "confirmPassword", e.target.value)}
                  className={errors.register.confirmPassword ? "border-red-500" : ""}
                />
                {errors.register.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.register.confirmPassword}</p>
                )}
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agree-terms"
                  checked={formData.register.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange("register", "agreeTerms", !!checked)}
                  className={errors.register.agreeTerms ? "border-red-500" : ""}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="agree-terms" className="text-sm font-normal">
                    I agree to the{" "}
                    <Button variant="link" className="p-0 h-auto text-xs">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="p-0 h-auto text-xs">
                      Privacy Policy
                    </Button>
                  </Label>
                  {errors.register.agreeTerms && <p className="text-sm text-red-500">{errors.register.agreeTerms}</p>}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account....
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="bg-white">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="bg-white">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
