"use client"

import { useState } from "react"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { Info } from "lucide-react"

interface BusinessAddress {
  country: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
}

export interface BusinessFormData {
  businessName: string
  registrationNumber: string
  phoneNumber: string
  businessAddress: BusinessAddress
}

interface BusinessInformationProps {
  formData: BusinessFormData
  updateFormData: (data: Partial<BusinessFormData>) => void
  errors?: Record<string, string>
}

export default function BusinessInformation({ formData, updateFormData, errors = {} }: BusinessInformationProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Handle nested businessAddress fields
    if (name.startsWith("businessAddress.")) {
      const field = name.split(".")[1] as keyof BusinessAddress
      updateFormData({
        businessAddress: {
          ...formData.businessAddress,
          [field]: value || ""
        }
      })
    } else {
      updateFormData({ [name]: value || "" } as Partial<BusinessFormData>)
    }
  }

  const handleCountryChange = (value: string) => {
    updateFormData({
      businessAddress: {
        ...formData.businessAddress,
        country: value
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Business Name */}
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="businessName" className="font-medium text-gray-700">
              Business name
            </Label>
            <div className="relative ml-1 group">
              <Info className="h-4 w-4 text-gray-400" />
              <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                Enter the exact business name as on your registration documents.
              </div>
            </div>
          </div>
          <Input
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Business name"
            className={`w-full ${errors.businessName ? 'border-red-500' : ''}`}
          />
          {errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
        </div>

        {/* Registration Number */}
        <div className="space-y-2">
          <Label htmlFor="registrationNumber" className="font-medium text-gray-700">
            Registration Number
          </Label>
          <Input
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="Registration number"
            className={`w-full ${errors.registrationNumber ? 'border-red-500' : ''}`}
          />
          {errors.registrationNumber && <p className="text-sm text-red-500">{errors.registrationNumber}</p>}
        </div>

        {/* Business Address */}
        <div className="space-y-2">
          <Label className="font-medium text-gray-700">Registered Business Address</Label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Country */}
            <Select 
              value={formData.businessAddress.country || ""}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="Singapore">Singapore</SelectItem>
              </SelectContent>
            </Select>

            {/* ZIP Code */}
            <Input
              name="businessAddress.zipCode"
              value={formData.businessAddress.zipCode || ""}
              onChange={handleChange}
              placeholder="ZIP / Postal code"
              className={`w-full ${errors.zipCode ? 'border-red-500' : ''}`}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="businessAddress.addressLine1"
              value={formData.businessAddress.addressLine1 || ""}
              onChange={handleChange}
              placeholder="Address Line 1"
              className={`w-full ${errors.addressLine1 ? 'border-red-500' : ''}`}
            />
            <Input
              name="businessAddress.addressLine2"
              value={formData.businessAddress.addressLine2 || ""}
              onChange={handleChange}
              placeholder="Address Line 2"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="businessAddress.city"
              value={formData.businessAddress.city || ""}
              onChange={handleChange}
              placeholder="City / Town"
              className={`w-full ${errors.city ? 'border-red-500' : ''}`}
            />
            <Input
              name="businessAddress.state"
              value={formData.businessAddress.state || ""}
              onChange={handleChange}
              placeholder="State / Region"
              className={`w-full ${errors.state ? 'border-red-500' : ''}`}
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="font-medium text-gray-700">
            Phone Number
          </Label>
          <div className="flex">
            <div className="flex items-center bg-gray-100 rounded-l-md px-3 border border-r-0 border-gray-300">
              <span className="text-gray-500">+91</span>
            </div>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              placeholder="Phone number"
              className={`rounded-l-none w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}
        </div>
      </div>
    </div>
  )
}
