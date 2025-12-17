"use client"

import { Button } from "../../ui/button"
import Link from "next/link"
import { ClipboardList, ShoppingBag, BarChart, CheckCircle, ArrowRight } from "lucide-react"

export default function HowToBecomeSeller() {

  const steps = [
    {
      id: 1,
      name: 'Register',
      description: 'Create your seller account',
      icon: ClipboardList
    },
    {
      id: 2,
      name: 'List Products',
      description: 'Add your eco-friendly products',
      icon: ShoppingBag
    },
    {
      id: 3,
      name: 'Grow Business',
      description: 'Reach more customers and scale',
      icon: BarChart
    },
  ]

  return (
    <section id="how-it-works" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wide text-green-600">Getting Started</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            How to Become a Seller
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Follow these simple steps to start selling your eco-friendly products on EcoSaro.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Step Process */}
          <div>
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {steps.map((step, stepIdx) => (
                  <li key={step.id}>
                    <div className="relative pb-8">
                      {stepIdx !== steps.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-green-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-5">
                        <div>
                          <span className={`flex h-9 w-9 items-center justify-center rounded-full ${step.id === 1 ? 'bg-green-600' : 'bg-green-200'
                            }`}>
                            <step.icon className="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-lg font-medium text-gray-900">{step.name}</p>
                            <p className="text-md text-gray-500">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900">Seller Requirements</h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Valid business identification or personal ID',
                  'Bank account for receiving payments',
                  'Eco-friendly products that meet our sustainability standards',
                  'Phone number for verification',
                  'Tax information for your region'
                ].map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Register Button Section */}
          <div id="become-seller-form" className="flex flex-col items-center justify-center bg-green-50 p-10 rounded-xl border border-green-100 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Selling?</h3>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Join our community of eco-conscious sellers and reach customers who value sustainability. Complete our simple registration process to get started.
            </p>

            <Link href="/sell/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                Register as a Seller
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
