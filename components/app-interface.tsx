import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ShoppingBag, BookOpen, Flower2, User } from "lucide-react"

export default function AppInterface() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">App Interface</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A seamless and intuitive user experience designed for nature enthusiasts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 mt-12">
          <div className="relative h-[600px] rounded-xl overflow-hidden border-8 border-green-100 shadow-xl">
            <Image
              src="/placeholder.svg?height=600&width=300"
              alt="App Interface Preview"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Home className="h-6 w-6 text-green-600" />
                <CardTitle>Home</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Trending Products + Daily Tips</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ShoppingBag className="h-6 w-6 text-green-600" />
                <CardTitle>Shop</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Categories + Product Listings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <BookOpen className="h-6 w-6 text-green-600" />
                <CardTitle>Knowledge Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Tips + Tutorials</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Flower2 className="h-6 w-6 text-green-600" />
                <CardTitle>My Garden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">User's uploaded projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <User className="h-6 w-6 text-green-600" />
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Orders + Rewards + Referral Link</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>UPI Auto-Pay for recurring payments</li>
                <li>Cash on Delivery with tracking mechanism</li>
                <li>Instant Refunds through Razorpay/Stripe API</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Third-Party Logistic API Integration</li>
                <li>SMS/Email Alerts for order status updates</li>
                <li>Optional WhatsApp Integration for tracking updates</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
