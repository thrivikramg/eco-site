"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Loader2, CheckCircle } from "lucide-react"

interface FormData {
  businessName: string
  businessEmail: string
  phoneNumber: string
  otp: string
  otpVerified: boolean
}

export default function SimpleSellerRegistration() {
  const router = useRouter()
  const { updateUser } = useAuth()
  const [form, setForm] = useState<FormData>({
    businessName: "",
    businessEmail: "",
    phoneNumber: "",
    otp: "",
    otpVerified: false
  })
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOtpChange = (otp: string) => {
    setForm({ ...form, otp })
  };

  // Send OTP
  const sendOtp = async () => {
    if (!form.phoneNumber) {
      setErrors({ phoneNumber: "Phone number is required" })
      return
    }
    setErrors({})

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: form.phoneNumber }),
      })

      if (!res.ok) {
        throw new Error("Failed to send OTP")
      }

      setIsOtpSent(true)
      setResendTimer(30)
      // For development/demo purposes, we can tell the user where to look
      console.log("OTP sent! Check server console for the code.")
    } catch (error) {
      console.error("Error sending OTP:", error)
      setErrors({ phoneNumber: "Failed to send OTP. Please try again." })
    }
  }

  // OTP timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isOtpSent && resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isOtpSent, resendTimer])

  // Verify OTP
  const verifyOtp = async () => {
    if (!form.otp || form.otp.length !== 6) {
      setErrors({ otp: "Enter 6-digit OTP" })
      return
    }
    setErrors({})
    setIsVerifying(true)

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: form.otp }),
      })

      const data = await res.json()

      if (res.ok) {
        setForm(prev => ({ ...prev, otpVerified: true }))
        setErrors({})
        console.log("OTP verified")
      } else {
        setErrors({ otp: data.message || "Invalid OTP" })
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setErrors({ otp: "Failed to verify OTP. Please try again." })
    } finally {
      setIsVerifying(false)
    }
  }

  // Submit registration
  const handleSubmit = async () => {
    if (isSubmitting) return
    const newErrors: { [key: string]: string } = {}
    if (!form.businessName) newErrors.businessName = "Business name is required"
    if (!form.businessEmail) newErrors.businessEmail = "Business email is required"
    if (!form.phoneNumber) newErrors.phoneNumber = "Phone number is required"
    if (!form.otpVerified) newErrors.otp = "Please verify your phone number"

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/vendor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName,
          businessEmail: form.businessEmail,
          phoneNumber: form.phoneNumber,
          otpVerified: form.otpVerified,
          businessAddress: {
            street: "N/A",
            city: "N/A",
            state: "N/A",
            pincode: "000000",
            country: "India"
          }
        })
      })
      const data = await res.json()
      if (res.ok) {
        updateUser({ role: 'vendor' })
        router.push('/sell/register/success')
      } else {
        setErrors({ submit: data.message || "Failed to register. Please try again." })
      }
    } catch (err) {
      console.error(err)
      setErrors({ submit: "An unexpected server error occurred." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">Become a Seller</CardTitle>
          <CardDescription>Fill out the form below to start selling on EcoSaro.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" name="businessName" value={form.businessName} onChange={handleChange} placeholder="e.g., GreenLeaf Essentials" disabled={isSubmitting} />
              {errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input id="businessEmail" name="businessEmail" type="email" value={form.businessEmail} onChange={handleChange} placeholder="you@example.com" disabled={isSubmitting} />
              {errors.businessEmail && <p className="text-sm text-red-500">{errors.businessEmail}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex items-center space-x-2">
                <Input id="phoneNumber" name="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleChange} placeholder="Your phone number" disabled={isOtpSent || isSubmitting} />
                {!isOtpSent && (
                  <Button onClick={sendOtp} variant="outline" className="flex-shrink-0" disabled={isSubmitting}>
                    Send OTP
                  </Button>
                )}
                {form.otpVerified && (
                  <div className="flex items-center text-green-600 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 mr-1" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
              {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
            </div>

            {isOtpSent && !form.otpVerified && (
              <div className="space-y-4 text-center p-4 bg-gray-50 rounded-md border">
                <Label htmlFor="otp" className="font-semibold">Enter Verification Code</Label>
                <p className="text-sm text-gray-500">
                  We've sent a 6-digit code to {form.phoneNumber}.
                </p>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={form.otp} onChange={handleOtpChange}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button onClick={verifyOtp} disabled={isVerifying || form.otp.length < 6} className="w-full">
                  {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isVerifying ? "Verifying..." : "Verify Phone Number"}
                </Button>

                <div className="text-sm text-gray-500">
                  {resendTimer > 0 ? (
                    <span>You can resend the code in {resendTimer}s</span>
                  ) : (
                    <button onClick={sendOtp} className="text-green-600 hover:underline font-medium">
                      Resend Code
                    </button>
                  )}
                </div>
                {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          {errors.submit && <p className="text-sm text-red-500 mb-4">{errors.submit}</p>}
          <Button onClick={handleSubmit} disabled={!form.otpVerified || isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Complete Registration"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
