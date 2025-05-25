"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What waste management services do you offer for residential properties?",
    answer:
      "For residential properties, we offer waste audits, composting system setup, recycling program implementation, e-waste collection, zero waste consultations, and educational workshops. We tailor our solutions to fit your specific household needs, space constraints, and waste generation patterns.",
  },
  {
    question: "How can effective waste management benefit my business?",
    answer:
      "Effective waste management can benefit your business in multiple ways: reduced waste disposal costs, potential revenue from recyclable materials, compliance with regulations, enhanced brand reputation, improved sustainability metrics for ESG reporting, and engagement of environmentally-conscious customers and employees.",
  },
  {
    question: "What happens to the waste after you collect it?",
    answer:
      "Different waste streams have different destinations. Recyclables are sent to certified recycling facilities. Organic waste is composted either on-site or at commercial composting facilities. E-waste and hazardous materials are sent to specialized processors that safely extract valuable materials and properly dispose of hazardous components. Our goal is maximum resource recovery with minimal landfill impact.",
  },
  {
    question: "How much can I reduce my waste going to landfill?",
    answer:
      "Most clients achieve 50-80% waste diversion rates after implementing our comprehensive waste management systems. Some clients have achieved over 90% diversion, approaching zero waste status. The exact reduction depends on your current waste profile and which solutions you implement.",
  },
  {
    question: "Do you provide ongoing support after initial implementation?",
    answer:
      "Yes, we offer ongoing support services including system monitoring, troubleshooting, staff training refreshers, waste audits to track progress, and system optimization. We can also provide regular reporting on waste diversion metrics and environmental impact calculations.",
  },
  {
    question: "How do you handle hazardous waste?",
    answer:
      "We have specialized protocols for hazardous waste collection, handling, and disposal in compliance with all regulatory requirements. Our team is trained in proper handling procedures, and we partner with certified hazardous waste processors to ensure safe and legal disposal or recycling of these materials.",
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
            Find answers to common questions about our waste management services.
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
