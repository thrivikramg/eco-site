"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../components/auth-provider"
import Link from "next/link"
import { AlertTriangle, LogIn } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert"
import { Button } from "../../../components/ui/button"
import AuthModal from "../../../components/auth-modal"

export default function SellerRegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const [authorized, setAuthorized] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (user?.role === 'vendor') {
        setAuthorized(false) // Already a vendor, not authorized to register again
      } else {
        setAuthorized(true) // Not a vendor, authorized to register
      }
    }
  }, [isAuthenticated, user, authLoading])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthModal open={showLoginModal} onOpenChange={setShowLoginModal} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full text-center">
            <Alert>
              <LogIn className="h-4 w-4" />
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                You need to be logged in to register as a seller.
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => setShowLoginModal(true)}
              className="mt-6 bg-green-600 hover:bg-green-700"
            >
              Login or Create Account
            </Button>
          </div>
        </div>
      </>
    )
  }

  if (!authorized && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Already a Vendor</AlertTitle>
            <AlertDescription>
              Your account is already registered as a vendor. You cannot register again.
            </AlertDescription>
          </Alert>
          <div className="text-center mt-6">
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700">
                Go to Your Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}