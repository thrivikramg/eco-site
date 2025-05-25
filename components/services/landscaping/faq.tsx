"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What makes your landscaping services sustainable?",
    answer:
      "Our landscaping is sustainable because we use native plants, water-efficient irrigation systems, permeable materials, locally-sourced resources, organic maintenance methods, and designs that support biodiversity. We aim to create landscapes that thrive with minimal resource inputs.",
  },
  {
    question: "How can sustainable landscaping save me money?",
    answer:
      "Sustainable landscaping reduces water bills through efficient irrigation and drought-tolerant plants, lowers maintenance costs with appropriately placed native species, eliminates expenses for chemical treatments, and increases property value. The initial investment typically pays for itself within a few years.",
  },
  {
    question: "Can you work with my existing landscape?",
    answer:
      "Absolutely! We specialize in transforming conventional landscapes into sustainable ones. We can work incrementally, preserving valuable existing elements while gradually introducing more sustainable features and practices.",
  },
  {
    question: "How does your landscaping help local wildlife?",
    answer:
      "Our designs incorporate native plants that provide food and habitat for local birds, pollinators, and beneficial insects. We create diverse plant communities, include water features when appropriate, and avoid harmful chemicals that could damage wildlife.",
  },
  {
    question: "What is xeriscaping and is it right for my property?",
    answer:
      "Xeriscaping is landscaping designed specifically for water conservation. It uses drought-tolerant plants, efficient irrigation, appropriate soil amendments, and strategic mulching. It works well in almost any climate and can be adapted to suit your aesthetic preferences while significantly reducing water usage.",
  },
  {
    question: "How long will it take to complete my landscaping project?",
    answer:
      "Project timelines vary depending on size, complexity, and seasonal factors. Small projects might take a few days, while larger transformations could span several weeks. During your consultation, we'll provide a specific timeline for your project along with a detailed implementation plan.",
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
            Find answers to common questions about our sustainable landscaping services.
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
