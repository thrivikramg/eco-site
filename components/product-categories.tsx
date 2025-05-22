import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductCategories() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Product Categories</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our diverse range of sustainable and eco-friendly products.
            </p>
          </div>

          <Tabs defaultValue="herbal" className="w-full max-w-4xl mt-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="herbal">Herbal</TabsTrigger>
              <TabsTrigger value="eco">Eco-Friendly</TabsTrigger>
              <TabsTrigger value="agro">Agro</TabsTrigger>
              <TabsTrigger value="cosmetics">Cosmetics</TabsTrigger>
            </TabsList>

            <TabsContent value="herbal" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Herbal Products"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Raw Herbs</h3>
                    <p className="text-sm text-gray-500">
                      Thuthuvalai, Adathodai, Thulasi, Karpooravalli, Vetiver Roots
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Herbal Powders"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Herbal Powders</h3>
                    <p className="text-sm text-gray-500">Triphala, Ashwagandha, Nannari, Avarampoo, Brahmi</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Herbal Juices"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Herbal Juices & Extracts</h3>
                    <p className="text-sm text-gray-500">Noni Juice, Amla Juice, Aloe Vera Juice, Thulasi Extract</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="eco" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Home Products"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Home Products</h3>
                    <p className="text-sm text-gray-500">Areca Leaf Plates, Bamboo Toothbrushes, Wooden Cutlery</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Kitchen Products"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Kitchen Products</h3>
                    <p className="text-sm text-gray-500">
                      Clay Pots & Pans, Cast Iron Cookware, Traditional Stone Grinders
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Eco-Friendly Stationery"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Eco-Friendly Stationery</h3>
                    <p className="text-sm text-gray-500">
                      Seed Paper Notebooks, Plantable Pencils, Recycled Paper Products
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="agro" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src="/placeholder.svg?height=200&width=300" alt="Seeds" fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Seeds</h3>
                    <p className="text-sm text-gray-500">Paddy Seeds, Vegetable Seeds, Fruit Seeds, Herbal Seeds</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Fertilizers & Manures"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Fertilizers & Manures</h3>
                    <p className="text-sm text-gray-500">Vermicompost, Cow Dung Manure, Panchagavya, Bio-Fertilizers</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Farming Tools"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Farming Tools</h3>
                    <p className="text-sm text-gray-500">
                      Hand Tools, Organic Pest Control Sprayers, Drip Irrigation Kits
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cosmetics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src="/placeholder.svg?height=200&width=300" alt="Hair Care" fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Hair Care</h3>
                    <p className="text-sm text-gray-500">Herbal Hair Oil, Shikakai Powder, Reetha, Amla Powder</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src="/placeholder.svg?height=200&width=300" alt="Skin Care" fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Skin Care</h3>
                    <p className="text-sm text-gray-500">
                      Turmeric Soap, Aloe Vera Gel, Multani Mitti Powder, Neem Soap
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Bath & Body"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Bath & Body</h3>
                    <p className="text-sm text-gray-500">Herbal Bath Powders, Rose Water, Essential Oils</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
