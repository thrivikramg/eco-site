"use client"

import { useState } from "react"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Button } from "../../../ui/button"
import { Info, Eye, EyeOff, Upload } from "lucide-react"

interface SellerInformationProps {
  formData: any;
  updateFormData: (data: any) => void;
  errors?: Record<string, string>;
}

export default function SellerInformation({ formData, updateFormData, errors = {} }: SellerInformationProps) {
  const [localErrors, setLocalErrors] = useState<Record<string, string | null>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [identityFile, setIdentityFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIdentityFile(file)
      updateFormData({ identityProof: file })
    }
  }

  const validatePassword = (password: string) => {
    const isValid = password.length >= 8
    return isValid
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="font-medium text-gray-700">
              First name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className={`w-full ${errors.firstName ? 'border-red-500' : ''}`}
              required
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="font-medium text-gray-700">
              Last name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className={`w-full ${errors.lastName ? 'border-red-500' : ''}`}
              required
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium text-gray-700">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e)
              if (!validateEmail(e.target.value) && e.target.value) {
                setLocalErrors(prev => ({ ...prev, email: "Please enter a valid email address" }))
              } else {
                setLocalErrors(prev => ({ ...prev, email: null }))
              }
            }}
            placeholder="Email address"
            className="w-full"
            required
          />
          {(errors.email || localErrors.email) && <p className="text-sm text-red-500">{errors.email || localErrors.email}</p>}
          <p className="text-xs text-gray-500">
            We'll send a verification link to this email
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="font-medium text-gray-700">
            Create password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => {
                handleChange(e)
                if (!validatePassword(e.target.value) && e.target.value) {
                  setLocalErrors(prev => ({ ...prev, password: "Password must be at least 8 characters long" }))
                } else {
                  setLocalErrors(prev => ({ ...prev, password: null }))
                }
              }}
              placeholder="Password"
              className="w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {(errors.password || localErrors.password) && <p className="text-sm text-red-500">{errors.password || localErrors.password}</p>}
          <p className="text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="font-medium text-gray-700">
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (e.target.value !== formData.password) {
                  setLocalErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }))
                } else {
                  setLocalErrors(prev => ({ ...prev, confirmPassword: null }))
                }
              }}
              placeholder="Confirm password"
              className="w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {(errors.confirmPassword || localErrors.confirmPassword) && <p className="text-sm text-red-500">{errors.confirmPassword || localErrors.confirmPassword}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="identityProof" className="font-medium text-gray-700">
              Identity Proof
            </Label>
            <div className="relative ml-1 group">
              <Info className="h-4 w-4 text-gray-400" />
              <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                Upload a scanned copy of your government-issued ID (Aadhar, PAN, Passport, Driving License)
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="identityProof"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, PNG, JPG (MAX. 5MB)
                </p>
              </div>
              <Input
                id="identityProof"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg"
              />
            </label>
          </div>
          {identityFile && (
            <p className="text-sm text-green-600">
              File selected: {identityFile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
