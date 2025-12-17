"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"

export default function SellerFAQ() {
  const faqs = [
    {
      question: "How much does it cost to sell on EcoSaro?",
      answer: "We offer a simple, transparent fee structure. There is no monthly subscription fee. We charge a flat 5% commission on each sale, plus a small payment processing fee. Listing products is completely free.",
    },
    {
      question: "What kind of products can I sell on EcoSaro?",
      answer: "EcoSaro specializes in eco-friendly, sustainable, and environmentally conscious products. This includes organic products, recycled items, plastic alternatives, energy-efficient products, sustainable fashion, and more. All products must meet our sustainability standards.",
    },
    {
      question: "How do I get paid?",
      answer: "Payments are processed securely and deposited directly into your bank account on a weekly basis. You can track all your earnings and payouts through the seller dashboard.",
    },
    {
      question: "Do I need to be a registered business?",
      answer: "Yes, you need to have a registered business entity (Sole Proprietorship, LLC, Pvt Ltd, etc.) and a valid GST number to sell on our platform, as per government regulations.",
    },
    {
      question: "How does the certification process work?",
      answer: "We offer an EcoSaro certification process for sellers. You can submit your products for review by our sustainability team who will verify your eco-friendly claims. Certified products receive a special badge on the marketplace, increasing visibility and trust.",
    },
    {
      question: "Who handles shipping and delivery?",
      answer: "You have two options: Self-Ship (you handle packaging and shipping) or EcoShip (we pick up products from your location and deliver them to customers). EcoShip offers competitive rates and eco-friendly packaging options.",
    },
    {
      question: "Can international sellers join EcoSaro?",
      answer: "Currently, we are only accepting sellers based in India. We plan to expand internationally in the near future.",
    },
    {
      question: "What marketing support does EcoSaro provide for sellers?",
      answer: "We actively promote our sellers through email newsletters, social media campaigns, and homepage features. High-performing sellers also get access to exclusive promotional events and banner placements.",
    },
  ]

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about selling on EcoSaro
          </p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left font-medium text-gray-900 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600">
            Still have questions?{" "}
            <a href="/contact" className="font-medium text-green-600 hover:text-green-500">
              Contact our seller support team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
