import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What makes your services eco-friendly?",
    answer:
      "Our services use natural, biodegradable products and sustainable practices that minimize environmental impact. We avoid harmful chemicals, prioritize water conservation, and use energy-efficient equipment wherever possible.",
  },
  {
    question: "How do I book a service?",
    answer:
      "You can book our services through our website by selecting the service you need, choosing a convenient date and time, and completing the booking process. You can also call our customer service team for assistance.",
  },
  {
    question: "Are your service professionals trained in eco-friendly practices?",
    answer:
      "Yes, all our service professionals undergo rigorous training in sustainable practices specific to their service area. They are knowledgeable about eco-friendly products and methods to ensure minimal environmental impact.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We currently provide services in major cities across India including Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, and their surrounding areas. We're continuously expanding to new locations.",
  },
  {
    question: "Do you offer service packages or subscriptions?",
    answer:
      "Yes, we offer both one-time services and subscription packages for regular maintenance. Our subscription packages come with discounted rates and priority scheduling.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can reschedule or cancel your service up to 24 hours before the scheduled time without any charge. Cancellations within 24 hours may incur a fee depending on the service.",
  },
]

export default function ServiceFAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find answers to common questions about our eco-friendly services.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
