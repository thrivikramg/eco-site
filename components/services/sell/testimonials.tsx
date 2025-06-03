"use client"

import Image from "next/image"
import { Quote } from "lucide-react"

export default function SellerTestimonials() {
  const testimonials = [
    {
      content: "Joining EcoGrow completely transformed my small sustainable business. Their eco-conscious audience helped me grow sales by 300% in just 6 months. The seller support team is always responsive and helpful.",
      author: {
        name: "Sarah Johnson",
        role: "Founder, GreenLeaf Essentials",
        avatar: "/images/testimonial-1.jpg"
      }
    },
    {
      content: "As a craftsman making products from reclaimed materials, I struggled to find the right audience. EcoGrow connected me with customers who truly value sustainability and are willing to pay for quality eco-friendly products.",
      author: {
        name: "Michael Torres",
        role: "Owner, Reclaimed Creations",
        avatar: "/images/testimonial-2.jpg"
      }
    },
    {
      content: "The EcoGrow certification process gave my organic skincare line instant credibility. The transparent fee structure and timely payments make it easy to manage cash flow as we scale our business.",
      author: {
        name: "Emma Chen",
        role: "CEO, Pure Earth Beauty",
        avatar: "/images/testimonial-3.jpg"
      }
    }
  ]

  return (
    <section className="bg-green-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-green-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Success Stories from Our Sellers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Hear from eco-entrepreneurs who have grown with EcoGrow
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="relative rounded-lg bg-white p-8 shadow-md transition-transform hover:-translate-y-1"
            >
              <Quote className="absolute -top-6 -left-6 h-12 w-12 text-green-100" />
              <div className="relative">
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                    <Image
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.author.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.author.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
