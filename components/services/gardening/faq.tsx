"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What makes your gardening services eco-friendly?",
    answer:
      "We use organic methods, avoid synthetic chemicals, prioritize native plants, implement water-efficient systems, use sustainable materials, and follow practices that support local ecosystems and biodiversity.",
  },
  {
    question: "How often will my garden need maintenance?",
    answer:
      "Maintenance frequency depends on your garden type, size, and local climate. Most gardens benefit from bi-weekly or monthly maintenance during growing seasons and less frequent care during dormant periods. We'll create a custom schedule for your specific garden.",
  },
  {
    question: "Can you convert my existing garden to be more sustainable?",
    answer:
      "Absolutely! We specialize in transforming conventional gardens into sustainable ones. This might involve introducing native plants, improving soil health organically, installing water-efficient irrigation, and implementing other eco-friendly practices while preserving the elements you love.",
  },
  {
    question: "Do you offer organic vegetable garden services?",
    answer:
      "Yes, we offer complete organic vegetable garden services including planning, installation, and maintenance. We can create raised beds, in-ground gardens, or container gardens depending on your space and preferences, all using organic methods.",
  },
  {
    question: "How do you manage pests without chemicals?",
    answer:
      "We use integrated pest management (IPM) techniques that include beneficial insects, companion planting, physical barriers, organic deterrents, and promoting biodiversity to create a balanced ecosystem where pests are naturally controlled.",
  },
  {
    question: "What's included in your garden design service?",
    answer:
      "Our garden design service includes an initial consultation, site analysis, conceptual design, detailed planting plans, material recommendations, and implementation guidance. We focus on creating sustainable, beautiful gardens that work with your local environment.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find answers to common questions about our sustainable gardening services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y">
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="font-medium text-lg pr-8">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="mt-3 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
