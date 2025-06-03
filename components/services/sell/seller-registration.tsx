"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import BusinessInformation from "./registration/business-information"
import SellerInformation from "./registration/seller-information"
import BillingInformation from "./registration/billing-information"
import StoreDetails from "./registration/store-details"
import Verification from "./registration/verification"
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "../../ui/card"
import { Button } from "../../ui/button"
import { CheckCircle2 } from "lucide-react"

// Define the registration steps
const steps = [
  {
    id: 1,
    name: "Business Information",
    shortName: "Business information"
  },
  {
    id: 2,
    name: "Seller Information",
    shortName: "Seller information"
  },
  {
    id: 3,
    name: "Billing",
    shortName: "Billing"
  },
  {
    id: 4,
    name: "Store",
    shortName: "Store"
  },
  {
    id: 5,
    name: "Verification",
    shortName: "Verification"
  }
]

export default function SellerRegistration() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [formStatus, setFormStatus] = useState<"idle" | "transitioning">("idle")
  const [showValidationMessage, setShowValidationMessage] = useState(false)
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    registrationNumber: "",
    businessAddress: {
      country: "India",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: ""
    },
    phoneNumber: "",
    
    // Seller Information
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    identityProof: null,
    
    // Billing Information
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    taxInformation: {
      gstNumber: "",
      panNumber: ""
    },
    
    // Store Details
    storeName: "",
    storeDescription: "",
    productCategories: [],
    storeLogo: null,
    
    // Verification
    isVerified: false,
    otpVerified: false
  })

  // Function to update form data
  const updateFormData = (stepData: any) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }))
  }

  // Custom validation for current step
  const validateCurrentStep = () => {
    let isValid = true;
    let errorMessages: Record<string, string> = {};
    
    switch (currentStep) {
      case 1: // Business Information
        if (!formData.businessName.trim()) {
          isValid = false;
          errorMessages.businessName = "Business name is required";
        }
        if (!formData.registrationNumber.trim()) {
          isValid = false;
          errorMessages.registrationNumber = "Registration number is required";
        }
        if (!formData.businessAddress.addressLine1.trim()) {
          isValid = false;
          errorMessages.addressLine1 = "Address line 1 is required";
        }
        if (!formData.businessAddress.city.trim()) {
          isValid = false;
          errorMessages.city = "City is required";
        }
        if (!formData.businessAddress.state.trim()) {
          isValid = false;
          errorMessages.state = "State is required";
        }
        if (!formData.businessAddress.zipCode.trim()) {
          isValid = false;
          errorMessages.zipCode = "ZIP/Postal code is required";
        }
        if (!formData.phoneNumber.trim()) {
          isValid = false;
          errorMessages.phoneNumber = "Phone number is required";
        }
        break;
        
      case 2: // Seller Information
        if (!formData.firstName.trim()) {
          isValid = false;
          errorMessages.firstName = "First name is required";
        }
        if (!formData.lastName.trim()) {
          isValid = false;
          errorMessages.lastName = "Last name is required";
        }
        if (!formData.email.trim()) {
          isValid = false;
          errorMessages.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          isValid = false;
          errorMessages.email = "Invalid email format";
        }
        if (!formData.password.trim()) {
          isValid = false;
          errorMessages.password = "Password is required";
        } else if (formData.password.length < 8) {
          isValid = false;
          errorMessages.password = "Password must be at least 8 characters";
        }
        break;
        
      case 3: // Billing Information
        if (!formData.accountHolderName.trim()) {
          isValid = false;
          errorMessages.accountHolderName = "Account holder name is required";
        }
        if (!formData.accountNumber.trim()) {
          isValid = false;
          errorMessages.accountNumber = "Account number is required";
        }
        if (!formData.ifscCode.trim()) {
          isValid = false;
          errorMessages.ifscCode = "IFSC code is required";
        }
        if (!formData.bankName.trim()) {
          isValid = false;
          errorMessages.bankName = "Bank name is required";
        }
        if (!formData.taxInformation.gstNumber.trim()) {
          isValid = false;
          errorMessages.gstNumber = "GST number is required";
        }
        if (!formData.taxInformation.panNumber.trim()) {
          isValid = false;
          errorMessages.panNumber = "PAN number is required";
        }
        break;
        
      case 4: // Store Details
        if (!formData.storeName.trim()) {
          isValid = false;
          errorMessages.storeName = "Store name is required";
        }
        if (!formData.storeDescription.trim()) {
          isValid = false;
          errorMessages.storeDescription = "Store description is required";
        }
        if (formData.productCategories.length === 0) {
          isValid = false;
          errorMessages.productCategories = "Please select at least one product category";
        }
        break;
        
      case 5: // Verification
        if (!formData.otpVerified) {
          isValid = false;
          errorMessages.otp = "Please verify your contact information";
        }
        break;
    }
    
    setValidationErrors(errorMessages);
    return isValid;
  }

  // Function to move to the next step
  const nextStep = () => {
    if (validateCurrentStep()) {
      setFormStatus("transitioning");
      setTimeout(() => {
        if (currentStep < steps.length) {
          setCurrentStep(currentStep + 1);
          window.scrollTo(0, 0);
        }
        setFormStatus("idle");
      }, 300);
    } else {
      // Show validation error toast or feedback
      setShowValidationMessage(true);
      setTimeout(() => setShowValidationMessage(false), 5000);
    }
  }

  // Function to move to the previous step
  const prevStep = () => {
    setFormStatus("transitioning");
    setTimeout(() => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        window.scrollTo(0, 0);
      }
      setFormStatus("idle");
    }, 300);
  }

  // Function to handle form submission
  const handleSubmit = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to success page
    router.push("/sell/register/success")
  }

  // Render the current step
  const renderStep = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            switch (currentStep) {
              case 1:
                return (
                  <BusinessInformation 
                    formData={formData} 
                    updateFormData={updateFormData} 
                    errors={validationErrors}
                  />
                )
              case 2:
                return (
                  <SellerInformation 
                    formData={formData} 
                    updateFormData={updateFormData} 
                    errors={validationErrors}
                  />
                )
              case 3:
                return (
                  <BillingInformation 
                    formData={formData} 
                    updateFormData={updateFormData} 
                    errors={validationErrors}
                  />
                )
              case 4:
                return (
                  <StoreDetails 
                    formData={formData} 
                    updateFormData={updateFormData} 
                    errors={validationErrors}
                  />
                )
              case 5:
                return (
                  <Verification 
                    formData={formData} 
                    updateFormData={updateFormData} 
                    errors={validationErrors}
                  />
                )
              default:
                return null
            }
          })()} 
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Seller Registration
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete the following steps to register as a seller on EcoGrow and start selling your eco-friendly products to millions of customers.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className="flex flex-col items-center"
                >
                  <motion.div 
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-500 ${
                      currentStep === step.id
                        ? "border-green-600 bg-green-600 text-white"
                        : currentStep > step.id
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 bg-white text-gray-500"
                    }`}
                    animate={{
                      scale: currentStep === step.id ? 1.1 : 1,
                      transition: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                  >
                    {currentStep > step.id ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </motion.div>
                  <span 
                    className={`mt-2 text-xs sm:text-sm transition-colors duration-300 ${
                      currentStep === step.id
                        ? "text-green-600 font-medium"
                        : currentStep > step.id
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.shortName}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="relative flex items-center justify-between mt-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1">
                  {index < steps.length - 1 && (
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: currentStep > index + 1 ? 1 : 0,
                        backgroundColor: currentStep > index + 1 ? "#16a34a" : "#e5e7eb" 
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{ transformOrigin: "left", height: "4px" }}
                      className={`h-1 ${currentStep > index + 1 ? "bg-green-600" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Form */}
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl">
                Step {currentStep}: {steps[currentStep - 1].name}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Provide your business details for registration"}
                {currentStep === 2 && "Enter your personal information and create an account"}
                {currentStep === 3 && "Add your banking and tax information for payments"}
                {currentStep === 4 && "Set up your store details and product categories"}
                {currentStep === 5 && "Verify your identity and contact information"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 min-h-[400px]">
              {renderStep()}
              {showValidationMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md"
                >
                  Please fill in all required fields before proceeding to the next step.
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < steps.length ? (
                <Button 
                  onClick={nextStep}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={formStatus === "transitioning"}
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={isLoading || formStatus === "transitioning"}
                >
                  {isLoading ? "Submitting..." : "Submit Registration"}
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Help Text */}
          <div className="text-center text-gray-500 text-sm">
            <p>
              Need help? <a href="/contact" className="text-green-600 hover:underline">Contact our seller support team</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
