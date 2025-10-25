"use client"

import { useState, useEffect } from "react"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Button } from "../../../ui/button"
import { Checkbox } from "../../../ui/checkbox"
import { Info, RefreshCw, CheckCircle2 } from "lucide-react"

export interface VerificationFormData {
  phoneNumber: string
  otpVerified: boolean
  isVerified: boolean
}

interface VerificationProps {
  formData: VerificationFormData
  updateFormData: (data: Partial<VerificationFormData>) => void
  errors?: Record<string, string>
}

export default function Verification({ formData, updateFormData, errors = {} }: VerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [resendDisabled, setResendDisabled] = useState(true)
  const [timer, setTimer] = useState(30)
  const [isVerifying, setIsVerifying] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(formData.isVerified || false)
  const [isVerified, setIsVerified] = useState(formData.otpVerified || false)

  // OTP input handlers
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    if (val && !/^\d+$/.test(val)) return

    const newOtp = [...otp]
    newOtp[index] = val.slice(0, 1)
    setOtp(newOtp)

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").trim().slice(0, 6)
    if (/^\d+$/.test(pasted)) {
      const newOtp = Array(6).fill("")
      for (let i = 0; i < pasted.length; i++) newOtp[i] = pasted[i]
      setOtp(newOtp)
      const nextInput = document.getElementById(`otp-${Math.min(pasted.length, 5)}`)
      nextInput?.focus()
    }
  }

  // Verify OTP
  const verifyOtp = () => {
    if (otp.join("").length !== 6) return
    setIsVerifying(true)

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      updateFormData({ otpVerified: true })
    }, 1500)
  }

  // Resend OTP timer
  const resendOtp = () => {
    setResendDisabled(true)
    setTimer(30)
    // simulate resend
    setTimeout(() => {}, 1000)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000)
    } else if (timer === 0) {
      setResendDisabled(false)
    }
    return () => clearInterval(interval)
  }, [resendDisabled, timer])

  // Terms agreement
  const handleTermsAgreement = (checked: boolean) => {
    setTermsAgreed(checked)
    updateFormData({ isVerified: checked })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="font-medium text-gray-700">Verify your phone number</Label>
        <p className="text-sm text-gray-500">We've sent a 6-digit code to +91 {formData.phoneNumber}</p>

        <div className="flex justify-center gap-2 my-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleOtpChange(e, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-xl"
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button type="button" variant="outline" disabled={resendDisabled} onClick={resendOtp}>
            {resendDisabled ? `Resend in ${timer}s` : "Resend OTP"} {resendDisabled && <RefreshCw className="ml-2 h-4 w-4 animate-spin" />}
          </Button>

          <Button type="button" onClick={verifyOtp} disabled={otp.join("").length !== 6 || isVerifying || isVerified} className="bg-green-600 text-white">
            {isVerifying ? <>Verifying <RefreshCw className="ml-2 h-4 w-4 animate-spin"/></> : isVerified ? <>Verified <CheckCircle2 className="ml-2 h-4 w-4"/></> : "Verify OTP"}
          </Button>
        </div>

        {isVerified && <p className="text-center text-green-600 mt-2">Phone number verified!</p>}
        {errors.otpVerified && <p className="text-sm text-red-500 mt-1 text-center">{errors.otpVerified}</p>}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-start space-x-3">
          <Checkbox checked={termsAgreed} onCheckedChange={handleTermsAgreement} />
          <div>
            <Label className="font-medium text-gray-700">Terms and conditions</Label>
            <p className="text-sm text-gray-500 mt-1">
              I agree to the{" "}
              <a href="/terms" className="text-green-600 hover:underline">Seller Terms</a> and{" "}
              <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>.
            </p>
            {errors.isVerified && <p className="text-sm text-red-500 mt-1">{errors.isVerified}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
