"use client"

import { Button } from "../../ui/button"
import Link from "next/link"
import Image from "next/image"
import CloudinaryImage from "../../ui/cloudinary-image"

export default function SellHero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-green-50"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Grow Your Business With</span>{" "}
              <span className="block text-green-600 xl:inline">EcoGrow</span>
            </h1>
            <p className="mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Join our thriving marketplace of eco-conscious sellers and reach millions of customers who value sustainability. Start selling your eco-friendly products today.
            </p>
            <div className="mt-8 sm:flex sm:justify-start">
              <div className="rounded-md shadow">
                <Link href="/sell/register">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 md:py-4 md:text-lg md:px-10">
                    Start Selling
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link href="#how-it-works">
                  <Button variant="outline" className="w-full font-semibold px-8 py-3 md:py-4 md:text-lg md:px-10">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 flex items-center space-x-6">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-gray-200">
                      <Image
                        src={`/images/seller-${i}.jpg`}
                        alt={`Seller ${i}`}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="ml-3 text-sm font-medium text-gray-500">
                  Join 2,000+ sellers
                </span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500">
                  4.9/5 average rating
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-600/0 z-10" />
              <img
                src={`https://res.cloudinary.com/dc2mzcoqr/image/upload/c_fill,q_90/Grow-Your-Business_lxpd01`}
                alt="Sustainable products"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 h-24 w-24 bg-green-100 rounded-full opacity-70" />
            <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-green-100 rounded-full opacity-70" />
          </div>
        </div>
      </div>
    </section>
  )
}
