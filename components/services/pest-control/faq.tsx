import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Are organic pest control methods as effective as chemical treatments?",
    answer:
      "Yes, our organic pest control methods are highly effective. While they may sometimes work more gradually than harsh chemicals, they provide longer-lasting results without the health risks. Our integrated approach targets pests at multiple life stages for comprehensive control.",
  },
  {
    question: "What organic ingredients do you use in your treatments?",
    answer:
      "We use a variety of natural ingredients including neem oil, diatomaceous earth, essential oils (such as peppermint, cedarwood, and clove), vinegar-based solutions, and beneficial insects. The specific combination depends on the pest type and infestation level.",
  },
  {
    question: "How soon can I return home after treatment?",
    answer:
      "Since we use organic products, there's minimal to no wait time. Most areas are safe to access immediately after treatment. For certain treatments, we might recommend staying away from treated surfaces until they dry, typically 1-2 hours.",
  },
  {
    question: "How often should I schedule pest control services?",
    answer:
      "For preventive maintenance, we recommend quarterly treatments (every 3 months). However, this can vary based on your location, property type, and pest pressure. After the initial assessment, our technicians will recommend an optimal schedule for your specific situation.",
  },
  {
    question: "Do you offer warranties on your pest control services?",
    answer:
      "Yes, all our pest control services come with service warranties ranging from 1 month to 1 year depending on the treatment type. If pests return during the warranty period, we'll provide additional treatments at no extra cost.",
  },
  {
    question: "What should I do to prepare for a pest control treatment?",
    answer:
      "We'll provide specific preparation instructions before your appointment, but general steps include: clearing clutter, moving furniture away from walls, cleaning surfaces, securing food items, and ensuring pets are kept away from treatment areas during application.",
  },
]

export default function FAQ() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find answers to common questions about our organic pest control services.</p>
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
