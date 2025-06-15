import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

const sanctuaries = [
  {
    id: "1",
    name: "Bandipur Tiger Reserve",
    location: "Karnataka, India",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750011125/6b_tbxzbz.jpg`,
    description: "Home to a significant tiger population and diverse wildlife.",
  },
  {
    id: "2",
    name: "Periyar Wildlife Sanctuary",
    location: "Kerala, India",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750010662/sanctuary__large_bzcorx.jpg`,
    description: "Famous for its elephant and tiger reserves in the Western Ghats.",
  },
  {
    id: "3",
    name: "Sundarbans National Park",
    location: "West Bengal, India",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750013753/1725031216118_xxs6ad.jpg`,
    description: "The largest mangrove forest and home to the Bengal tiger.",
  },
]

export default function SanctuariesPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Wildlife Sanctuaries</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover protected areas dedicated to wildlife conservation and plan your next eco-tourism adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {sanctuaries.map((sanctuary) => (
            <Card key={sanctuary.id} className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={sanctuary.image || "/placeholder.svg"} alt={sanctuary.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{sanctuary.name}</h3>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{sanctuary.location}</span>
                </div>
                <p className="text-gray-600">{sanctuary.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/eco-library/sanctuaries">
            <Button>View All Sanctuaries on Map</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
