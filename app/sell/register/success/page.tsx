import Link from "next/link"
import { Metadata } from "next"
import { Button } from "../../../../components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Registration Successful | EcoGrow Seller",
  description: "Your seller registration has been submitted successfully.",
}

export default function RegistrationSuccessPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-600 px-6 py-8 text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-white">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="mt-6 text-3xl font-bold text-white">
                Registration Successful!
              </h1>
              <p className="mt-2 text-white opacity-90">
                Your seller application has been submitted
              </p>
            </div>
            
            <div className="px-6 py-8">
              <div className="text-center mb-8">
                <p className="text-lg text-gray-700">
                  Thank you for registering as a seller on EcoGrow!
                </p>
                <p className="mt-2 text-gray-500">
                  Your application is now being reviewed by our team. This process typically takes 1-2 business days.
                </p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-6 my-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  What happens next?
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                        1
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      <span className="font-medium text-gray-900">Review Process</span> - We'll verify your business information and review your application.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                        2
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      <span className="font-medium text-gray-900">Approval Email</span> - Once approved, you'll receive an email with login details for your seller dashboard.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                        3
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      <span className="font-medium text-gray-900">Set Up Your Store</span> - Complete your store profile and upload your eco-friendly products.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                        4
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      <span className="font-medium text-gray-900">Start Selling</span> - Once your products are approved, they'll be live for customers to purchase.
                    </p>
                  </li>
                </ul>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-500">
                  We've sent a confirmation email to the address you provided with all these details.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/sell">
                    <Button variant="outline">
                      Return to Seller Home
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Explore EcoGrow
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
              <p>
                Have questions? Contact our seller support team at{" "}
                <a href="mailto:sellers@ecogrow.com" className="text-green-600 hover:underline">
                  sellers@ecogrow.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
