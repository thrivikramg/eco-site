import { Card, CardContent } from "@/components/ui/card"
import { Droplets, Wind, Scissors, Shovel, Sprout, Sun } from "lucide-react"

const preventionTips = [
  {
    title: "Proper Watering",
    description: "Water at the base of plants, not on foliage. Water in the morning so plants can dry during the day.",
    icon: Droplets,
  },
  {
    title: "Good Air Circulation",
    description: "Space plants properly to allow air flow. This reduces humidity and helps prevent fungal diseases.",
    icon: Wind,
  },
  {
    title: "Regular Pruning",
    description:
      "Remove dead or diseased plant parts promptly. Sterilize tools between cuts to prevent spreading disease.",
    icon: Scissors,
  },
  {
    title: "Healthy Soil",
    description: "Build healthy soil with compost and organic matter. Healthy plants are more resistant to disease.",
    icon: Shovel,
  },
  {
    title: "Resistant Varieties",
    description:
      "Choose disease-resistant plant varieties when available, especially for common problems in your area.",
    icon: Sprout,
  },
  {
    title: "Proper Sunlight",
    description: "Ensure plants get appropriate sunlight for their species. Too much or too little can stress plants.",
    icon: Sun,
  },
]

export default function PreventionTips() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Prevention Tips</h2>
          <p className="text-gray-600">The best way to manage plant diseases is to prevent them before they start.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {preventionTips.map((tip) => (
            <Card key={tip.title} className="border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <tip.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
