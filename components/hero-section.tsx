import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-100 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">SOIL to SOUL</h1>
              <p className="text-xl text-green-600 font-medium">Connecting Nature, Knowledge & You</p>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                இயற்கையை மடி போட்டு வளர்த்திடு — உங்கள் கைப்பேசியில்
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-green-600 hover:bg-green-700">Learn More</Button>
              <Button variant="outline" className="border-green-600 text-green-600">
                Join Our Community
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px]">
              <Image
                src="/placeholder.svg?height=450&width=450"
                alt="Eco System App"
                fill
                className="object-contain rounded-full border-8 border-green-100 shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
