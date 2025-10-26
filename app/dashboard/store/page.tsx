"use client"

import { useState, useEffect } from "react"
import { Combobox } from "@/components/ui/combobox"
import { indianBanks } from "@/lib/indian-banks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { 
  Store, 
  Save, 
  Clock, 
  ImageIcon, 
  Truck,
  CircleHelp,
  CreditCard,
  Building,
  AlertTriangle
} from "lucide-react"
import { toast } from "sonner"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Switch } from "../../../components/ui/switch"

export default function StoreSettingsPage() {
  // Mock store data
  const [storeData, setStoreData] = useState({
    name: "EcoFriendly Goods",
    logo: "/store-logo.png",
    description: "We specialize in eco-friendly, sustainable products that help reduce environmental impact while maintaining high quality and functionality.",
    contactEmail: "contact@ecofriendlygoods.com",
    contactPhone: "+1 555-123-4567",
    openingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "00:00", close: "00:00", closed: true },
    },
    returnPolicy: "We accept returns within 30 days of delivery for unopened items in their original packaging. Customers are responsible for return shipping costs unless the item is defective.",
    shippingOptions: [
      { name: "Standard Shipping", price: 5.99, days: "3-5" },
      { name: "Express Shipping", price: 12.99, days: "1-2" },
    ],
    bankInfo: {
      accountName: "EcoFriendly Goods LLC",
      accountNumber: "XXXX-XXXX-4578",
      bankName: "Green Bank",
      ifscCode: "GRBN000123",
    },
    gstDetails: {
      gstNumber: "29ABCDE1234F1Z5",
      businessPan: "ABCDE1234F",
      businessAddress: "123 Green Street, Eco City, EC 12345",
    }
  })


  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const res = await fetch("/api/vendor/store");
        if (res.ok) {
          const data = await res.json();
          setStoreData(prev => ({
            ...prev,
            name: data.businessName || prev.name,
            description: data.storeDescription || prev.description,
            contactEmail: data.businessEmail || prev.contactEmail,
            contactPhone: data.contact?.phone || prev.contactPhone,
            bankInfo: {
              accountName: data.bankDetails?.accountHolder || prev.bankInfo.accountName,
              accountNumber: data.bankDetails?.accountNumber || prev.bankInfo.accountNumber,
              bankName: data.bankDetails?.bankName || prev.bankInfo.bankName,
              ifscCode: data.bankDetails?.ifsc || prev.bankInfo.ifscCode,
            },
            gstDetails: {
              gstNumber: data.taxInfo?.gstin || prev.gstDetails.gstNumber,
              businessPan: data.taxInfo?.pan || prev.gstDetails.businessPan,
              businessAddress: data.businessAddress?.street || prev.gstDetails.businessAddress,
            }
          }));
        } else {
          toast.error("Failed to fetch store settings.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching store settings.");
        console.error(error);
      }
    };
    fetchStoreData();
  }, []);

  const handleBankChange = (bankCode: string) => {
    setStoreData(prev => ({ ...prev, bankInfo: { ...prev.bankInfo, bankName: bankCode, ifscCode: '' } }));
  };

  const handleGeneralInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSave = () => {
    // In a real implementation, this would save to the backend
    console.log("Saving store settings:", storeData);
    // Show success message to user
    alert("Store settings saved successfully!");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Store Settings</h1>
          <p className="text-gray-500">Manage your store details and policies</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
          <TabsTrigger value="hours" className="flex-1">Operating Hours</TabsTrigger>
          <TabsTrigger value="policies" className="flex-1">Policies</TabsTrigger>
          <TabsTrigger value="banking" className="flex-1">Banking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Store Information
              </CardTitle>
              <CardDescription>
                Your store profile information visible to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input 
                    id="store-name" 
                    name="name"
                    value={storeData.name} 
                    onChange={handleGeneralInfoChange} 
                    placeholder="Your store name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="store-logo">Store Logo</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="h-20 w-20 rounded-md bg-gray-100 border flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button variant="outline" size="sm">
                      Upload New Logo
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Recommended size: 500x500px, max 1MB</p>
                </div>
                
                <div>
                  <Label htmlFor="store-description">Store Description</Label>
                  <Textarea 
                    id="store-description" 
                    name="description"
                    value={storeData.description} 
                    onChange={handleGeneralInfoChange}
                    placeholder="Describe your store and what you sell..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input 
                      id="contact-email" 
                      type="email" 
                      name="contactEmail"
                      value={storeData.contactEmail} 
                      onChange={handleGeneralInfoChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input 
                      id="contact-phone" 
                      name="contactPhone"
                      value={storeData.contactPhone} 
                      onChange={handleGeneralInfoChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Operating Hours
              </CardTitle>
              <CardDescription>
                Set when your store is available to handle orders and inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(storeData.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center border-b pb-3 last:border-b-0 last:pb-0">
                    <div className="w-1/4 font-medium capitalize">
                      {day}
                    </div>
                    <div className="flex items-center gap-6 ml-auto">
                      <Switch 
                        id={`${day}-open`} 
                        checked={!hours.closed}
                        // In a real app, you'd handle state updates for these switches
                      />
                      <div className="flex items-center gap-2">
                        <Select 
                          disabled={hours.closed} 
                          value={hours.open}
                          // In a real app, you'd handle state updates for these selects
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            {/* Additional time options would go here */}
                          </SelectContent>
                        </Select>
                        <span>to</span>
                        <Select 
                          disabled={hours.closed}
                          value={hours.close}
                          // In a real app, you'd handle state updates for these selects
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                            <SelectItem value="17:00">5:00 PM</SelectItem>
                            <SelectItem value="18:00">6:00 PM</SelectItem>
                            {/* Additional time options would go here */}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircleHelp className="h-5 w-5" />
                Store Policies
              </CardTitle>
              <CardDescription>
                Set your return, refund and shipping policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="return-policy">Return & Refund Policy</Label>
                <Textarea 
                  id="return-policy" 
                  name="returnPolicy"
                  value={storeData.returnPolicy} 
                  onChange={handleGeneralInfoChange}
                  placeholder="Describe your return and refund policy..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Shipping Options</Label>
                
                {storeData.shippingOptions.map((option, index) => (
                  <div key={index} className="flex flex-wrap items-center gap-3 p-3 border rounded-md mb-3">
                    <div className="w-full sm:w-auto flex-1">
                      <Label htmlFor={`shipping-name-${index}`} className="text-xs">Option Name</Label>
                      <Input 
                        id={`shipping-name-${index}`} 
                        value={option.name} 
                        className="mt-1"
                        // In a real app, you'd handle state updates for these inputs
                      />
                    </div>
                    <div className="w-full sm:w-auto sm:flex-initial">
                      <Label htmlFor={`shipping-price-${index}`} className="text-xs">Price</Label>
                      <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                        <Input 
                          id={`shipping-price-${index}`} 
                          value={option.price} 
                          className="pl-7"
                          type="number" 
                          min="0" 
                          step="0.01"
                          // In a real app, you'd handle state updates for these inputs
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-auto sm:flex-initial">
                      <Label htmlFor={`shipping-days-${index}`} className="text-xs">Delivery Time (days)</Label>
                      <Input 
                        id={`shipping-days-${index}`} 
                        value={option.days} 
                        className="mt-1"
                        // In a real app, you'd handle state updates for these inputs
                      />
                    </div>
                    <div className="flex items-end justify-end w-full sm:w-auto mt-2 sm:mt-0">
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" size="sm" className="mt-2">
                  + Add Shipping Option
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="banking">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Banking & Payment Information
              </CardTitle>
              <CardDescription>
                Your banking details for receiving payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Secure Information</h3>
                      <p className="text-sm text-yellow-700">
                        Your banking information is encrypted and secure. This information is only used for processing your payments.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4 pt-2">
                <h3 className="font-medium">Bank Account Details</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Combobox
                      options={indianBanks}
                      value={storeData.bankInfo.bankName}
                      onChange={handleBankChange}
                      placeholder="Select bank..."
                      searchPlaceholder="Search banks..."
                      emptyPlaceholder="No bank found."
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-name">Account Holder Name</Label>
                    <Input 
                      id="account-name" 
                      value={storeData.bankInfo.accountName} 
                      // In a real app, you'd handle state updates for these inputs
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input 
                      id="account-number" 
                      value={storeData.bankInfo.accountNumber} 
                      type="password" 
                      // In a real app, you'd handle state updates for these inputs
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifsc-code">IFSC Code</Label>
                    <Input
                      id="ifsc-code"
                      value={storeData.bankInfo.ifscCode}
                      onChange={(e) => setStoreData(prev => ({
                        ...prev,
                        bankInfo: { ...prev.bankInfo, ifscCode: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Tax Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="gst-number">GST Number</Label>
                    <Input 
                      id="gst-number" 
                      value={storeData.gstDetails.gstNumber} 
                      // In a real app, you'd handle state updates for these inputs
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-pan">Business PAN</Label>
                    <Input 
                      id="business-pan" 
                      value={storeData.gstDetails.businessPan} 
                      // In a real app, you'd handle state updates for these inputs
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="business-address">Registered Business Address</Label>
                    <Textarea 
                      id="business-address" 
                      value={storeData.gstDetails.businessAddress} 
                      className="min-h-[80px]"
                      // In a real app, you'd handle state updates for these inputs
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Your business verification status: <span className="text-green-600 font-medium">Verified</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Last updated on {new Date().toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
