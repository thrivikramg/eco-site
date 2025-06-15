import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const commonDiseases = {
  vegetables: [
    {
      name: "Tomato Late Blight",
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750011054/8_Common_Tomato_Diseases_xuhdnb.jpg`,
      symptoms:
        "Dark, water-soaked spots on leaves that quickly enlarge and turn brown. White fungal growth may appear on the undersides of leaves in humid conditions.",
      treatment:
        "Remove and destroy infected plants. Apply copper-based fungicide to healthy plants as a preventative measure. Ensure good air circulation and avoid overhead watering.",
    },
    {
      name: "Powdery Mildew",
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012174/powdery-mildew-powdery-mildew-on-squash-leaf-shutterstock-com_13365_tykont.jpg`,
      symptoms:
        "White powdery spots on leaves, stems, and sometimes fruit. Leaves may yellow, curl, or drop prematurely.",
      treatment:
        "Apply neem oil or potassium bicarbonate spray. Improve air circulation around plants and avoid overhead watering. Remove and destroy severely infected plants.",
    },
    {
      name: "Cucumber Mosaic Virus",
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012344/W-01612-01-Cucumber-Mosaic-Virus-CMV-Symptoms-Fuit_oewawd.jpg`,
      symptoms: "Mottled yellow and green pattern on leaves. Stunted growth and deformed fruits.",
      treatment:
        "No cure available. Remove and destroy infected plants. Control aphids which spread the virus. Plant resistant varieties.",
    },
  ],
  fruits: [
    {
      name: "Apple Scab",
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012434/500_vlb6xa.png`,
      symptoms: "Olive-green to brown spots on leaves and fruit. Severely infected leaves may drop prematurely.",
      treatment:
        "Apply fungicide early in the growing season. Rake and destroy fallen leaves. Prune trees to improve air circulation.",
    },
    {
      name: "Citrus Greening",
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012578/Huanglongbing_ow6wwz.jpg`,
      symptoms: "Yellow mottling on leaves, misshapen and bitter fruit, and premature fruit drop.",
      treatment:
        "No cure available. Remove and destroy infected trees. Control Asian citrus psyllid which spreads the disease.",
    },
    {
      name: "Grape Black Rot",
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012552/PGFS4mSeAcKRKrkRZ4Wsr9_fmcokp.jpg`,
      symptoms:
        "Small, dark lesions on leaves that expand into brown spots with dark borders. Fruit shrivels and turns into black, mummified berries.",
      treatment:
        "Apply fungicide early in the growing season. Remove mummified fruit and infected canes. Improve air circulation through proper pruning.",
    },
  ],
  ornamentals: [
    {
      name: "Rose Black Spot",
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012671/191_0_ipgxs3.jpg`,
      symptoms: "Black or dark brown spots on leaves, often with yellow halos. Infected leaves may drop prematurely.",
      treatment:
        "Apply fungicide at first sign of disease. Remove and destroy infected leaves. Avoid wetting foliage when watering.",
    },
    {
      name: "Botrytis Blight",
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012757/Botrytis_Blight_of_Peony1801_qf06wy.jpg`,
      symptoms:
        "Gray, fuzzy mold on flowers, leaves, and stems. Flowers may rot and leaves may develop water-soaked spots.",
      treatment:
        "Remove and destroy infected plant parts. Improve air circulation. Apply fungicide during cool, wet weather.",
    },
    {
      name: "Leaf Spot",
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012801/leaf-spots_jsttua.jpg`,
      symptoms: "Brown or black spots on leaves, often with yellow halos. Severe infections may cause leaf drop.",
      treatment:
        "Apply fungicide at first sign of disease. Remove and destroy infected leaves. Avoid overhead watering.",
    },
  ],
}

export default function CommonDiseases() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Common Plant Diseases</h2>
          <p className="text-gray-600">
            Learn to identify and treat common plant diseases that may affect your garden.
          </p>
        </div>

        <Tabs defaultValue="vegetables" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
            <TabsTrigger value="fruits">Fruits</TabsTrigger>
            <TabsTrigger value="ornamentals">Ornamentals</TabsTrigger>
          </TabsList>

          {Object.entries(commonDiseases).map(([category, diseases]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {diseases.map((disease) => (
                  <Card key={disease.name} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={disease.image || "/placeholder.svg"}
                        alt={disease.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{disease.name}</h3>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700">Symptoms:</h4>
                          <p className="text-sm text-gray-600">{disease.symptoms}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700">Treatment:</h4>
                          <p className="text-sm text-gray-600">{disease.treatment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
