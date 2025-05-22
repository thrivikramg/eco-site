import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Leaf, Baby, Droplets, Clock, Award } from "lucide-react"

const benefits = [
  {
    title: "100% Organic Solutions",
    description: "We use plant-based extracts, essential oils, and biological controls instead of harmful chemicals.",
    icon: Leaf,
  },
  {
    title: "Child & Pet Safe",
    description: "Our treatments are safe for children, pets, and everyone in your household.",
    icon: Baby,
  },
  {
    title: "No Residual Toxicity",
    description: "Our solutions break down naturally without leaving harmful residues in your home.",
    icon: Droplets,
  },
  {
    title: "Long-Lasting Protection",
    description: "Our organic treatments provide effective, long-term pest control with regular maintenance.",
    icon: ShieldCheck,
  },
  {
    title: "Quick Service",
    description: "Our efficient team completes most treatments within a few hours with minimal disruption.",
    icon: Clock,
  },
  {
    title: "Certified Technicians",
    description: "Our pest control experts are trained and certified in organic pest management methods.",
    icon: Award,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Organic Pest Control?</h2>
          <p className="text-gray-600">
            We prioritize your health and the environment without compromising on effectiveness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
