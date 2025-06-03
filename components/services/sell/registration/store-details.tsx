"use client"

import { useState } from "react"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Textarea } from "../../../ui/textarea"
import { Checkbox } from "../../../ui/checkbox"
import { Upload, Info } from "lucide-react"

interface StoreDetailsProps {
  formData: any;
  updateFormData: (data: any) => void;
  errors?: Record<string, string>;
}

interface ProductCategory {
  id: string;
  label: string;
}

export default function StoreDetails({ formData, updateFormData, errors = {} }: StoreDetailsProps) {
  const [localErrors, setLocalErrors] = useState<Record<string, string | null>>({})
  const [storeLogo, setStoreLogo] = useState<File | null>(null)

  // Product categories available on EcoGrow
  const productCategories: ProductCategory[] = [
    { id: "organic-food", label: "Organic Food & Beverages" },
    { id: "eco-fashion", label: "Eco-Friendly Fashion" },
    { id: "sustainable-home", label: "Sustainable Home Goods" },
    { id: "natural-beauty", label: "Natural Beauty & Personal Care" },
    { id: "zero-waste", label: "Zero Waste Products" },
    { id: "renewable-energy", label: "Renewable Energy Products" },
    { id: "eco-friendly-toys", label: "Eco-Friendly Toys & Games" },
    { id: "upcycled-products", label: "Upcycled & Recycled Products" },
    { id: "plant-based", label: "Plant-Based Products" },
    { id: "gardening", label: "Gardening & Outdoor Eco Products" }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleCategoryChange = (id: string) => {
    const updatedCategories = formData.productCategories.includes(id)
      ? formData.productCategories.filter((category: string) => category !== id)
      : [...formData.productCategories, id]
    
    updateFormData({ productCategories: updatedCategories })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setStoreLogo(file)
      updateFormData({ storeLogo: file })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeName" className="font-medium text-gray-700">
            Store name
          </Label>
          <Input
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            placeholder="Store name (as it will appear to customers)"
            className={`w-full ${errors.storeName ? 'border-red-500' : ''}`}
          />
          {errors.storeName && (
            <p className="text-sm text-red-500">{errors.storeName}</p>
          )}
          <p className="text-xs text-gray-500">
            This will be displayed to customers when they browse your products
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeDescription" className="font-medium text-gray-700">
            Store description
          </Label>
          <Textarea
            id="storeDescription"
            name="storeDescription"
            value={formData.storeDescription}
            onChange={handleChange}
            placeholder="Tell customers about your store, products, and commitment to sustainability..."
            className={`w-full min-h-[120px] ${errors.storeDescription ? 'border-red-500' : ''}`}
          />
          {errors.storeDescription && (
            <p className="text-sm text-red-500">{errors.storeDescription}</p>
          )}
          <p className="text-xs text-gray-500">
            Maximum 500 characters
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label className="font-medium text-gray-700">
              Product categories
            </Label>
            <div className="relative ml-1 group">
              <Info className="h-4 w-4 text-gray-400" />
              <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                Select all categories that apply to your products. You can select multiple.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {productCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={formData.productCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
          {(formData.productCategories.length === 0 || errors.productCategories) && (
            <p className="text-xs text-red-500">
              {errors.productCategories || "Please select at least one product category"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="storeLogo" className="font-medium text-gray-700">
              Store logo (optional)
            </Label>
            <div className="relative ml-1 group">
              <Info className="h-4 w-4 text-gray-400" />
              <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                Upload a square logo (1:1 aspect ratio) for better display. Recommended size: 500x500 pixels.
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="storeLogo"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG (MAX. 2MB)
                </p>
              </div>
              <Input
                id="storeLogo"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg"
              />
            </label>
          </div>
          {storeLogo && (
            <p className="text-sm text-green-600">
              File selected: {storeLogo.name}
            </p>
          )}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-green-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              EcoGrow Store Guidelines
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Your store should focus on eco-friendly, sustainable products that align with EcoGrow's mission. 
                All products will be reviewed to ensure they meet our sustainability standards before being listed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
