import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Flower2, BookOpen, Users } from "lucide-react"

export default function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our comprehensive eco-system application combines multiple features to create a complete green experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="border-green-100 hover:border-green-300 transition-colors">
            <CardHeader className="pb-2">
              <ShoppingBag className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>Eco-Commerce</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Shop sustainable products including herbal, eco-friendly, agro, and natural cosmetics.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-green-100 hover:border-green-300 transition-colors">
            <CardHeader className="pb-2">
              <Flower2 className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>Green Services</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access eco-friendly services like pest control, gardening, and landscaping.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-green-100 hover:border-green-300 transition-colors">
            <CardHeader className="pb-2">
              <BookOpen className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>Knowledge Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Explore plant information, disease detection, and sustainable living tips.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-green-100 hover:border-green-300 transition-colors">
            <CardHeader className="pb-2">
              <Users className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Connect with nature lovers and build a thriving green network.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
