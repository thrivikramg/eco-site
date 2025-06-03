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
      question: "How much does it cost to sell on EcoGrow?",
      answer: "We have a simple fee structure: a 5% transaction fee on each sale plus a small listing fee. New sellers receive a 3-month reduced fee period at just 3% to help you get started. There are no monthly subscription fees or hidden charges."
    },
    {
      question: "What kind of products can I sell on EcoGrow?",
      answer: "EcoGrow specializes in eco-friendly, sustainable, and environmentally conscious products. This includes organic products, recycled items, plastic alternatives, energy-efficient products, sustainable fashion, and more. All products must meet our sustainability standards."
    },
    {
      question: "How do I get my products certified as eco-friendly?",
      answer: "We offer an EcoGrow certification process for sellers. You can submit your products for review by our sustainability team who will verify your eco-friendly claims. Certified products receive a special badge on the marketplace, increasing visibility and trust."
    },
    {
      question: "How long does the seller approval process take?",
      answer: "Most seller applications are reviewed within 3-5 business days. Once approved, you can immediately start listing your products. The verification process may take longer for certain business types or product categories that require additional review."
    },
    {
      question: "How and when will I get paid for my sales?",
      answer: "Payments are processed every 14 days for all sales where the delivery has been confirmed and the return period has passed. Funds are directly deposited to your registered bank account. You can track all your sales and payments through the seller dashboard."
    },
    {
      question: "Do I need to handle shipping and returns?",
      answer: "Sellers are responsible for shipping products to customers. You can set your own shipping rates or use our discounted shipping partners. For returns, we have a streamlined process where we handle the customer service aspect, but returned items will be sent back to you unless you opt into our managed returns program."
    },
    {
      question: "Can international sellers join EcoGrow?",
      answer: "Yes, we welcome international sellers as long as you can ship to our customer base and meet our product sustainability standards. International sellers need to provide additional documentation and ensure compliance with relevant import/export regulations."
    },
    {
      question: "What marketing support does EcoGrow provide for sellers?",
      answer: "We offer various marketing opportunities including featured product placements, participation in seasonal campaigns, inclusion in our email newsletters, and social media promotions. Top-performing sellers also get priority in our marketing efforts."
    }
  ]

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-green-600">Questions & Answers</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Everything you need to know about selling on EcoGrow
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
