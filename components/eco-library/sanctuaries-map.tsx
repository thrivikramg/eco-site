"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, X } from "lucide-react"

// Mock sanctuary data
const sanctuaries = [
  {
    id: "1",
    name: "Bandipur Tiger Reserve",
    location: "Karnataka, India",
    coordinates: { lat: 11.6717, lng: 76.6349 },
    description: "Home to a significant tiger population and diverse wildlife.",
    established: "1974",
    area: "874 sq km",
    animals: ["Bengal Tiger", "Indian Elephant", "Gaur", "Sloth Bear", "Leopard"],
  },
  {
    id: "2",
    name: "Periyar Wildlife Sanctuary",
    location: "Kerala, India",
    coordinates: { lat: 9.4706, lng: 77.2153 },
    description: "Famous for its elephant and tiger reserves in the Western Ghats.",
    established: "1950",
    area: "925 sq km",
    animals: ["Bengal Tiger", "Indian Elephant", "Gaur", "Sambar Deer", "Lion-tailed Macaque"],
  },
  {
    id: "3",
    name: "Sundarbans National Park",
    location: "West Bengal, India",
    coordinates: { lat: 21.9497, lng: 88.9133 },
    description: "The largest mangrove forest and home to the Bengal tiger.",
    established: "1984",
    area: "1,330 sq km",
    animals: ["Bengal Tiger", "Saltwater Crocodile", "Gangetic Dolphin", "Olive Ridley Turtle"],
  },
  {
    id: "4",
    name: "Jim Corbett National Park",
    location: "Uttarakhand, India",
    coordinates: { lat: 29.53, lng: 78.7747 },
    description: "India's oldest national park known for its Bengal tiger population.",
    established: "1936",
    area: "520 sq km",
    animals: ["Bengal Tiger", "Asian Elephant", "Leopard", "Himalayan Black Bear", "Gharial"],
  },
  {
    id: "5",
    name: "Ranthambore National Park",
    location: "Rajasthan, India",
    coordinates: { lat: 26.0173, lng: 76.5026 },
    description: "Famous for diurnal tigers and ancient ruins within the park.",
    established: "1980",
    area: "392 sq km",
    animals: ["Bengal Tiger", "Leopard", "Nilgai", "Sambar Deer", "Sloth Bear"],
  },
  {
    id: "6",
    name: "Kaziranga National Park",
    location: "Assam, India",
    coordinates: { lat: 26.5833, lng: 93.1667 },
    description: "Home to two-thirds of the world's one-horned rhinoceros.",
    established: "1974",
    area: "430 sq km",
    animals: ["One-horned Rhinoceros", "Bengal Tiger", "Asian Elephant", "Wild Water Buffalo", "Swamp Deer"],
  },
]

export default function SanctuariesMap() {
  const [selectedSanctuary, setSelectedSanctuary] = useState<(typeof sanctuaries)[0] | null>(null)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Wildlife Sanctuaries</h1>
          <p className="text-lg text-gray-600">
            Explore protected areas dedicated to wildlife conservation across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden h-[500px] relative">
              <CardContent className="p-0 h-full">
                {/* This would be a real map component in a production app */}
                <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-gray-500 mb-4">Interactive map would be displayed here</p>
                    <p className="text-sm text-gray-400">Using Google Maps or Mapbox API integration</p>

                    {/* Mock map markers */}
                    {sanctuaries.map((sanctuary) => (
                      <Button
                        key={sanctuary.id}
                        variant="outline"
                        size="sm"
                        className="absolute bg-white hover:bg-primary hover:text-white"
                        style={{
                          top: `${(1 - (sanctuary.coordinates.lat - 9) / 21) * 80 + 10}%`,
                          left: `${((sanctuary.coordinates.lng - 76) / 18) * 80 + 10}%`,
                        }}
                        onClick={() => setSelectedSanctuary(sanctuary)}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sanctuary info popup */}
                {selectedSanctuary && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{selectedSanctuary.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setSelectedSanctuary(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{selectedSanctuary.location}</p>
                    <p className="text-gray-700 text-sm mb-2">{selectedSanctuary.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Established:</span> {selectedSanctuary.established}
                      </div>
                      <div>
                        <span className="text-gray-500">Area:</span> {selectedSanctuary.area}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Sanctuary Finder</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Click on a sanctuary name to locate it on the map and learn more about it.
                </p>

                <div className="space-y-4">
                  {sanctuaries.map((sanctuary) => (
                    <Button
                      key={sanctuary.id}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => setSelectedSanctuary(sanctuary)}
                    >
                      <div>
                        <div className="font-medium">{sanctuary.name}</div>
                        <div className="text-sm text-gray-500">{sanctuary.location}</div>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-2">Filter by Region</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      North India
                    </Button>
                    <Button variant="outline" size="sm">
                      South India
                    </Button>
                    <Button variant="outline" size="sm">
                      East India
                    </Button>
                    <Button variant="outline" size="sm">
                      West India
                    </Button>
                    <Button variant="outline" size="sm">
                      Central India
                    </Button>
                    <Button variant="outline" size="sm">
                      Northeast India
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
