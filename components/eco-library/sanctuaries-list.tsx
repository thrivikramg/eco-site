import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Maximize2 } from "lucide-react"

const sanctuaries = [
  {
    id: "1",
    name: "Bandipur Tiger Reserve",
    location: "Karnataka, India",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750011125/6b_tbxzbz.jpg`,
    description:
      "Home to a significant tiger population and diverse wildlife in the Western Ghats. The sanctuary is known for its dry deciduous forests and varied wildlife.",
    established: "1974",
    area: "874 sq km",
    bestTimeToVisit: "October to May",
    animals: ["Bengal Tiger", "Indian Elephant", "Gaur", "Sloth Bear", "Leopard"],
  },
  {
    id: "2",
    name: "Periyar Wildlife Sanctuary",
    location: "Kerala, India",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750010842/nationalgeographic_2764597-4f1f37faa9a5ecf0cc8e5b662e07c324f5e8fa3a_c2turg.jpg`,
    description:
      "Famous for its elephant and tiger reserves in the Western Ghats. The sanctuary is centered around an artificial lake formed by the Mullaperiyar Dam.",
    established: "1950",
    area: "925 sq km",
    bestTimeToVisit: "September to May",
    animals: ["Bengal Tiger", "Indian Elephant", "Gaur", "Sambar Deer", "Lion-tailed Macaque"],
  },
  {
    id: "3",
    name: "Sundarbans National Park",
    location: "West Bengal, India",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750013753/1725031216118_xxs6ad.jpg`,
    description:
      "The largest mangrove forest in the world and home to the Bengal tiger. This UNESCO World Heritage Site is known for its unique ecosystem.",
    established: "1984",
    area: "1,330 sq km",
    bestTimeToVisit: "December to February",
    animals: ["Bengal Tiger", "Saltwater Crocodile", "Gangetic Dolphin", "Olive Ridley Turtle"],
  },
  {
    id: "4",
    name: "Jim Corbett National Park",
    location: "Uttarakhand, India",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750013952/Master_q6wqeb.jpg`,
    description:
      "India's oldest national park known for its Bengal tiger population. The park is named after the famous hunter-turned-conservationist Jim Corbett.",
    established: "1936",
    area: "520 sq km",
    bestTimeToVisit: "November to June",
    animals: ["Bengal Tiger", "Asian Elephant", "Leopard", "Himalayan Black Bear", "Gharial"],
  },
  {
    id: "5",
    name: "Ranthambore National Park",
    location: "Rajasthan, India",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750013977/jungle-safari-in-jim-corbett-national-park-1200x900_hdgqr9.webp`,
    description:
      "Famous for diurnal tigers and ancient ruins within the park. The park features steep rocky hills, grassy valleys, and lakes.",
    established: "1980",
    area: "392 sq km",
    bestTimeToVisit: "October to June",
    animals: ["Bengal Tiger", "Leopard", "Nilgai", "Sambar Deer", "Sloth Bear"],
  },
  {
    id: "6",
    name: "Kaziranga National Park",
    location: "Assam, India",
    image:`https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750013980/jim-corbett-national_wwtfqp.jpg`,
    description:
      "Home to two-thirds of the world's one-horned rhinoceros. The park is a UNESCO World Heritage Site and hosts diverse wildlife.",
    established: "1974",
    area: "430 sq km",
    bestTimeToVisit: "November to April",
    animals: ["One-horned Rhinoceros", "Bengal Tiger", "Asian Elephant", "Wild Water Buffalo", "Swamp Deer"],
  },
]

export default function SanctuariesList() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Wildlife Sanctuaries</h2>
          <p className="text-gray-600">Discover India's rich biodiversity through its protected wildlife areas.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sanctuaries.map((sanctuary) => (
            <Card key={sanctuary.id} className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image src={sanctuary.image || "/placeholder.svg"} alt={sanctuary.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{sanctuary.name}</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{sanctuary.location}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {sanctuary.animals.slice(0, 3).map((animal) => (
                    <Badge key={animal} variant="outline">
                      {animal}
                    </Badge>
                  ))}
                  {sanctuary.animals.length > 3 && (
                    <Badge variant="outline">+{sanctuary.animals.length - 3} more</Badge>
                  )}
                </div>

                <p className="text-gray-700 mb-4">{sanctuary.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Established</span>
                    </div>
                    <p className="font-medium">{sanctuary.established}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <Maximize2 className="h-4 w-4 mr-1" />
                      <span>Area</span>
                    </div>
                    <p className="font-medium">{sanctuary.area}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Best time to visit</div>
                    <p className="font-medium">{sanctuary.bestTimeToVisit}</p>
                  </div>
                  <Link href={`/eco-library/sanctuaries/${sanctuary.id}`}>
                    <Button>Learn More</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
