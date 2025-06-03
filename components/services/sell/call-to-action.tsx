"use client"

import Link from "next/link"
import { Button } from "../../ui/button"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
  return (
    <section className="bg-green-600">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to grow your eco-business?</span>
            <span className="block text-green-200">Join EcoGrow today.</span>
          </h2>
          <p className="mt-4 text-lg text-green-100">
            Start selling to eco-conscious customers and become part of our thriving sustainable marketplace.
          </p>
        </div>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href="/sell/register">
              <Button className="inline-flex items-center justify-center bg-white text-green-600 hover:bg-green-50 px-5 py-3 text-base font-medium">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a href="/contact" className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-700 px-5 py-3 text-base font-medium text-white hover:bg-green-800">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
