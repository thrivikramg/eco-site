"use client"

import { useState } from "react"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { Info } from "lucide-react"

interface BillingInformationProps {
  formData: any;
  updateFormData: (data: any) => void;
  errors?: Record<string, string>;
}

export default function BillingInformation({ formData, updateFormData, errors = {} }: BillingInformationProps) {

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

  const handleBankSelect = (value: string) => {
    updateFormData({ bankName: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Banking Details</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountHolderName" className="font-medium text-gray-700">
              Account holder name
            </Label>
            <Input
              id="accountHolderName"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              placeholder="Name as it appears on your bank account"
              className={`w-full ${errors.accountHolderName ? 'border-red-500' : ''}`}
            />
            {errors.accountHolderName && (
              <p className="text-sm text-red-500">{errors.accountHolderName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber" className="font-medium text-gray-700">
              Account number
            </Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Bank account number"
              className={`w-full ${errors.accountNumber ? 'border-red-500' : ''}`}
              type="text"
            />
            {errors.accountNumber && (
              <p className="text-sm text-red-500">{errors.accountNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmAccountNumber" className="font-medium text-gray-700">
              Confirm account number
            </Label>
            <Input
              id="confirmAccountNumber"
              name="confirmAccountNumber"
              placeholder="Re-enter bank account number"
              className="w-full"
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ifscCode" className="font-medium text-gray-700">
                IFSC Code
              </Label>
              <Input
                id="ifscCode"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="IFSC Code"
                className={`w-full ${errors.ifscCode ? 'border-red-500' : ''}`}
              />
              {errors.ifscCode && (
                <p className="text-sm text-red-500">{errors.ifscCode}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankName" className="font-medium text-gray-700">
                Bank Name
              </Label>
              <Select
                value={formData.bankName}
                onValueChange={handleBankSelect}
              >
                {errors.bankName && (
                  <p className="text-sm text-red-500 mb-1">{errors.bankName}</p>
                )}
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SBI">State Bank of India</SelectItem>
                  <SelectItem value="HDFC">HDFC Bank</SelectItem>
                  <SelectItem value="ICICI">ICICI Bank</SelectItem>
                  <SelectItem value="Axis">Axis Bank</SelectItem>
                  <SelectItem value="Kotak">Kotak Mahindra Bank</SelectItem>
                  <SelectItem value="PNB">Punjab National Bank</SelectItem>
                  <SelectItem value="BOB">Bank of Baroda</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="gstNumber" className="font-medium text-gray-700">
                GST Number
              </Label>
              <div className="relative ml-1 group">
                <Info className="h-4 w-4 text-gray-400" />
                <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                  15-digit Goods and Services Tax Identification Number (GSTIN)
                </div>
              </div>
            </div>
            <Input
              id="gstNumber"
              name="taxInformation.gstNumber"
              value={formData.taxInformation.gstNumber}
              onChange={handleChange}
              placeholder="GST Number"
              className={`w-full ${errors.gstNumber ? 'border-red-500' : ''}`}
            />
            {errors.gstNumber && (
              <p className="text-sm text-red-500">{errors.gstNumber}</p>
            )}
            <p className="text-xs text-gray-500">
              If applicable for your business
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="panNumber" className="font-medium text-gray-700">
                PAN Number
              </Label>
              <div className="relative ml-1 group">
                <Info className="h-4 w-4 text-gray-400" />
                <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                  10-character Permanent Account Number issued by the Income Tax Department
                </div>
              </div>
            </div>
            <Input
              id="panNumber"
              name="taxInformation.panNumber"
              value={formData.taxInformation.panNumber}
              onChange={handleChange}
              placeholder="PAN Number"
              className={`w-full ${errors.panNumber ? 'border-red-500' : ''}`}
            />
            {errors.panNumber && (
              <p className="text-sm text-red-500">{errors.panNumber}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Important Information
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Your banking details are used solely for processing payments for your sales. 
                EcoGrow adheres to strict security standards to protect your financial information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
