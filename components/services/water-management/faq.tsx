"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How much water can I save with your water management systems?",
    answer:
      "Most of our clients see water savings of 30-60% after implementing our solutions. The exact amount depends on your current usage patterns, property size, climate, and which systems you choose to implement. Our water audit can provide a more precise estimate for your specific situation.",
  },
  {
    question: "Are rainwater harvesting systems legal in my area?",
    answer:
      "Rainwater harvesting is legal in most areas of India, and many states actively encourage it. During our initial consultation, we'll review the specific regulations for your location and ensure all systems are compliant with local codes and requirements.",
  },
  {
    question: "How much maintenance do water management systems require?",
    answer:
      "Our systems are designed to be low-maintenance, but some periodic attention is required. Rainwater harvesting systems typically need filter cleaning every 3-6 months. Smart irrigation systems should be inspected seasonally. We provide detailed maintenance instructions and can offer service contracts for regular professional maintenance.",
  },
  {
    question: "What's the return on investment for water management systems?",
    answer:
      "Most water management systems pay for themselves within 2-5 years through reduced water bills. Some systems, like smart irrigation, can show returns even faster. The exact ROI depends on your water costs, system size, and local climate conditions. Our water audit includes ROI calculations for recommended improvements.",
  },
  {
    question: "Can water management systems be installed in existing properties?",
    answer:
      "Absolutely! All of our systems can be retrofitted into existing properties. While it's easiest to incorporate water management during new construction, we have extensive experience adapting our solutions for established properties with minimal disruption.",
  },
  {
    question: "Do you offer water quality testing and improvement?",
    answer:
      "Yes, we provide water quality testing services and can recommend appropriate filtration and treatment options for both harvested rainwater and existing water supplies. Our goal is to ensure all water used on your property is safe and appropriate for its intended purpose.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find answers to common questions about our water management services.
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
