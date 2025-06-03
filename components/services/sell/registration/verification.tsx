"use client"

import { useState, useEffect } from "react"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Button } from "../../../ui/button"
import { Checkbox } from "../../../ui/checkbox"
import { Info, RefreshCw, CheckCircle2 } from "lucide-react"

interface VerificationProps {
  formData: any;
  updateFormData: (data: any) => void;
  errors?: Record<string, string>;
}

export default function Verification({ formData, updateFormData, errors = {} }: VerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [resendDisabled, setResendDisabled] = useState(true)
  const [timer, setTimer] = useState(30)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return
    }
    
    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  // Handle key down for backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim().slice(0, 6)
    
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp]
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) {
          newOtp[i] = pastedData[i]
        }
      }
      setOtp(newOtp)
      
      // Focus last filled input or the next empty one
      const lastIndex = Math.min(pastedData.length, 5)
      const nextInput = document.getElementById(`otp-${lastIndex}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  // Handle OTP verification
  const verifyOtp = () => {
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      return
    }
    
    setIsVerifying(true)
    
    // Simulate OTP verification (replace with actual API call)
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      updateFormData({ otpVerified: true })
    }, 1500)
  }

  // Handle resend OTP
  const resendOtp = () => {
    setResendDisabled(true)
    setTimer(30)
    
    // Simulate OTP resend (replace with actual API call)
    setTimeout(() => {
      // Show success toast or notification
    }, 1000)
  }

  // Handle terms agreement
  const handleTermsAgreement = (checked: boolean) => {
    setTermsAgreed(checked)
    updateFormData({ isVerified: checked })
  }

  // Timer countdown for resend OTP
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setResendDisabled(false)
    }
    
    return () => clearInterval(interval)
  }, [resendDisabled, timer])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="font-medium text-gray-700">
            Verify your phone number
          </Label>
          <p className="text-sm text-gray-500">
            We've sent a 6-digit verification code to +91 {formData.phoneNumber}
          </p>
          
          <div className="flex justify-center gap-2 my-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-xl"
              />
            ))}
          </div>
          
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={resendDisabled}
              onClick={resendOtp}
              className="text-sm"
            >
              {resendDisabled ? `Resend in ${timer}s` : "Resend OTP"}
              {resendDisabled && <RefreshCw className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
            
            <Button
              type="button"
              onClick={verifyOtp}
              disabled={otp.join("").length !== 6 || isVerifying || isVerified}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isVerifying ? (
                <>
                  Verifying
                  <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : isVerified ? (
                <>
                  Verified
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
          
          {isVerified && (
            <div className="flex items-center justify-center text-green-600">
              <CheckCircle2 className="mr-1 h-5 w-5" />
              <span>Phone number verified successfully!</span>
            </div>
          )}
          {errors.otpVerified && (
            <div className="mt-2 text-red-500 text-sm text-center">
              {errors.otpVerified}
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="termsAgreement" 
              checked={termsAgreed}
              onCheckedChange={handleTermsAgreement}
              className="mt-1"
            />
            <div>
              <Label 
                htmlFor="termsAgreement" 
                className="font-medium text-gray-700"
              >
                Terms and conditions
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                I confirm that the information provided is accurate and complete. I agree to the{" "}
                <a href="/terms" className="text-green-600 hover:underline">
                  EcoGrow Seller Terms and Conditions
                </a>
                ,{" "}
                <a href="/privacy" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>
                , and consent to the storage and processing of my data in accordance with these policies.
              </p>
              {errors.isVerified && (
                <p className="text-sm text-red-500 mt-1">{errors.isVerified}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              What happens next?
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                After submission, our team will review your application within 1-2 business days. 
                You'll receive an email notification once your seller account is approved, 
                along with instructions to set up your store and list your first products.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
