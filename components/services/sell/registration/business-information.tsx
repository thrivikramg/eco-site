"use client"

import { useState } from "react"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { Info } from "lucide-react"

interface BusinessInformationProps {
  formData: any;
  updateFormData: (data: any) => void;
  errors?: Record<string, string>;
}

export default function BusinessInformation({ formData, updateFormData, errors = {} }: BusinessInformationProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      updateFormData({
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      })
    } else {
      updateFormData({ [name]: value })
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
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="businessName" className="font-medium text-gray-700">
              Business name, used to register with your state or federal government
            </Label>
            <div className="relative ml-1 group">
              <Info className="h-4 w-4 text-gray-400" />
              <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                Enter the exact business name as it appears on your business registration documents.
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business name as it appears on business registration document"
              className={`w-full ${errors.businessName ? 'border-red-500' : ''}`}
            />
            {errors.businessName && (
              <p className="text-sm text-red-500">{errors.businessName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="registrationNumber" className="font-medium text-gray-700">
              Company Registration Number
            </Label>
            <div className="relative ml-1 group">
              <Info className="h-4 w-4 text-gray-400" />
              <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                Your business registration number, CIN, LLPIN, or other official identification number.
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Input
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Registration number"
              className={`w-full ${errors.registrationNumber ? 'border-red-500' : ''}`}
            />
            {errors.registrationNumber && (
              <p className="text-sm text-red-500">{errors.registrationNumber}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label className="font-medium text-gray-700">
              Registered business address
            </Label>
            <div className="relative ml-1 group">
              <Info className="h-4 w-4 text-gray-400" />
              <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                Enter the official address registered with government authorities.
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Select 
                value={formData.businessAddress.country} 
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
            </div>
            <div>
              <div className="space-y-1">
                <Input
                  name="businessAddress.zipCode"
                  value={formData.businessAddress.zipCode}
                  onChange={handleChange}
                  placeholder="ZIP / Postal code"
                  className={`w-full ${errors.zipCode ? 'border-red-500' : ''}`}
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-500">{errors.zipCode}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="space-y-1">
                <Input
                  name="businessAddress.addressLine1"
                  value={formData.businessAddress.addressLine1}
                  onChange={handleChange}
                  placeholder="Address Line 1"
                  className={`w-full ${errors.addressLine1 ? 'border-red-500' : ''}`}
                />
                {errors.addressLine1 && (
                  <p className="text-sm text-red-500">{errors.addressLine1}</p>
                )}
              </div>
            </div>
            <div>
              <Input
                name="businessAddress.addressLine2"
                value={formData.businessAddress.addressLine2}
                onChange={handleChange}
                placeholder="Address Line 2"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="space-y-1">
                <Input
                  name="businessAddress.city"
                  value={formData.businessAddress.city}
                  onChange={handleChange}
                  placeholder="City / Town"
                  className={`w-full ${errors.city ? 'border-red-500' : ''}`}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
              </div>
            </div>
            <div>
              <div className="space-y-1">
                <Input
                  name="businessAddress.state"
                  value={formData.businessAddress.state}
                  onChange={handleChange}
                  placeholder="State / Region"
                  className={`w-full ${errors.state ? 'border-red-500' : ''}`}
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="font-medium text-gray-700">
            Phone number for verification
          </Label>
          <div className="flex">
            <div className="flex items-center bg-gray-100 rounded-l-md px-3 border border-r-0 border-gray-300">
              <span className="text-gray-500">+91</span>
            </div>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
              className={`rounded-l-none w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
            />
          </div>
          <div className="text-xs text-gray-500">
            We'll send a one-time password to verify this number
          </div>
          {errors.phoneNumber && (
            <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>
    </div>
  )
}
