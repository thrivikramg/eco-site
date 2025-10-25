"use client"
import { useState, useEffect } from "react"

interface FormData {
  businessName: string
  businessEmail: string
  phoneNumber: string
  otp: string
  otpVerified: boolean
}

export default function SimpleSellerRegistration() {
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
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Send OTP simulation
  const sendOtp = () => {
    if (!form.phoneNumber) {
      setErrors({ phoneNumber: "Phone number is required" })
      return
    }
    setErrors({})
    setIsOtpSent(true)
    setResendTimer(30)
    // Simulate sending OTP
    console.log("OTP sent to", form.phoneNumber)
  }

  // OTP timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isOtpSent && resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isOtpSent, resendTimer])

  // Verify OTP simulation
  const verifyOtp = () => {
    if (form.otp.length !== 6) {
      setErrors({ otp: "Enter 6-digit OTP" })
      return
    }
    setErrors({})
    setIsVerifying(true)
    setTimeout(() => {
      setForm(prev => ({ ...prev, otpVerified: true }))
      setIsVerifying(false)
      console.log("OTP verified")
    }, 1000)
  }

  // Submit registration
  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.businessName) newErrors.businessName = "Business name is required"
    if (!form.businessEmail) newErrors.businessEmail = "Business email is required"
    if (!form.phoneNumber) newErrors.phoneNumber = "Phone number is required"
    if (!form.otpVerified) newErrors.otp = "Please verify OTP"
    
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

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
        alert("Seller registered successfully!")
      } else {
        alert(data.message || "Failed to register")
      }
    } catch (err) {
      console.error(err)
      alert("Server error")
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Simple Seller Registration</h2>

      <label>
        Business Name
        <input
          type="text"
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        {errors.businessName && <div style={{ color: "red" }}>{errors.businessName}</div>}
      </label>

      <label>
        Business Email
        <input
          type="email"
          name="businessEmail"
          value={form.businessEmail}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        {errors.businessEmail && <div style={{ color: "red" }}>{errors.businessEmail}</div>}
      </label>

      <label>
        Phone Number
        <input
          type="tel"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        {errors.phoneNumber && <div style={{ color: "red" }}>{errors.phoneNumber}</div>}
      </label>

      {!form.otpVerified && (
        <div style={{ marginBottom: "1rem" }}>
          {!isOtpSent ? (
            <button onClick={sendOtp} style={{ padding: "0.5rem 1rem" }}>Send OTP</button>
          ) : (
            <>
              <input
                type="text"
                name="otp"
                maxLength={6}
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                style={{ padding: "0.5rem", width: "60%", marginRight: "0.5rem" }}
              />
              <button onClick={verifyOtp} disabled={isVerifying} style={{ padding: "0.5rem 1rem" }}>
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </button>
              {resendTimer > 0 && <span style={{ marginLeft: "0.5rem" }}>Resend in {resendTimer}s</span>}
              {errors.otp && <div style={{ color: "red" }}>{errors.otp}</div>}
            </>
          )}
        </div>
      )}

      {form.otpVerified && <div style={{ color: "green", marginBottom: "1rem" }}>OTP Verified!</div>}

      <button onClick={handleSubmit} style={{ padding: "0.5rem 1rem", backgroundColor: "green", color: "white" }}>
        Submit Registration
      </button>
    </div>
  )
}
