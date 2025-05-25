"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How much can I save by implementing sustainable home solutions?",
    answer:
      "Savings vary depending on which solutions you implement and your current consumption patterns. Most clients see energy bill reductions of 20-50% after comprehensive upgrades. Water-saving measures typically reduce water bills by 30-40%. Our home assessment will provide personalized estimates based on your specific situation.",
  },
  {
    question: "How long does it take to recoup the investment in home sustainability improvements?",
    answer:
      "Return on investment varies by solution. Energy-efficient lighting and water-saving fixtures typically pay for themselves within 1-2 years. Larger investments like solar panels or comprehensive insulation usually reach payback within 3-7 years, while continuing to provide savings for decades afterward. Additionally, many sustainability improvements increase your property value immediately.",
  },
  {
    question: "Are there government incentives available for home sustainability upgrades?",
    answer:
      "Yes, many sustainability improvements qualify for government incentives, tax rebates, or subsidized financing. These vary by location and type of improvement. During our consultation, we'll identify all applicable incentives for your specific situation to help maximize your savings.",
  },
  {
    question: "Can you work with older homes, or are these solutions only for new construction?",
    answer:
      "We specialize in upgrading existing homes of all ages. While newer homes may be easier to modify in some ways, older homes often have the most to gain from efficiency improvements. Our team has extensive experience working with historical properties and can suggest solutions that maintain architectural integrity while improving sustainability.",
  },
  {
    question: "Will these changes affect my home's appearance or comfort?",
    answer:
      "Most sustainability improvements either enhance your home's appearance and comfort or have no visible impact. Energy-efficient windows and insulation, for example, make your home more comfortable by eliminating drafts and temperature fluctuations. Solar panels can be installed discreetly, and LED lighting now comes in all the same styles and color temperatures as traditional lighting.",
  },
  {
    question: "How do I maintain the sustainability systems after installation?",
    answer:
      "We design our solutions to be low-maintenance, but some periodic attention is needed. We provide detailed care instructions for all installed systems and offer optional maintenance plans for more complex installations like solar panels or rainwater harvesting systems. Many of our solutions include monitoring capabilities so you can easily track performance.",
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
            Find answers to common questions about our home sustainability services.
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
