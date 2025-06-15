import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function PlantDiseaseBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-xl bg-green-100 p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Plant Disease Detector</h2>
              <p className="text-gray-700 mb-6">
                Worried about your plants? Our AI-powered tool can identify common plant diseases from a photo and
                provide treatment recommendations.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Instant disease identification</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Treatment recommendations</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Prevention tips</span>
                </li>
              </ul>
              <Link href="/eco-library/plant-disease">
                <Button size="lg">Try Plant Disease Detector</Button>
              </Link>
            </div>

            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src={`https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750010589/Plant-disease-classifier-with-ai-blog-banner_ffbbx0.jpg`}
                alt="Plant Disease Detector"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
