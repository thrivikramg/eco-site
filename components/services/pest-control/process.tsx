import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Inspection",
    description:
      "Our technicians thoroughly inspect your property to identify pest species, infestation levels, and entry points.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1748886589/garden-pest-control-service_a23tpy.webp`,
  },
  {
    number: "02",
    title: "Customized Plan",
    description:
      "We develop a tailored treatment plan using organic solutions specific to your pest issues and property needs.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750004270/pestcont_kglz1q.webp`,
  },
  {
    number: "03",
    title: "Treatment",
    description: "Our team applies organic treatments targeting active pests while setting up preventive barriers.",
    image:`https://res.cloudinary.com/dc2mzcoqr/image/upload/v1748886589/garden-pest-control-service_a23tpy.webp`,
  },
  {
    number: "04",
    title: "Follow-up",
    description:
      "We conduct follow-up visits to ensure complete pest elimination and provide additional treatments if needed.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750004270/pestcont_kglz1q.webp`,
  },
]

export default function Process() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Process</h2>
          <p className="text-gray-600">Our systematic approach ensures effective and long-lasting pest control.</p>
        </div>

        <div className="space-y-12 md:space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              } ${index < steps.length - 1 ? "pb-12 border-b" : ""}`}
            >
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="flex items-start mb-4">
                  <div className="text-4xl font-bold text-primary/20 mr-4">{step.number}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
