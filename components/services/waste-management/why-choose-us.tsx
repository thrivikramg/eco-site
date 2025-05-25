import Image from "next/image"
import { Recycle, Leaf, Scale, Trash2, BookOpen, Award } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Waste Management Services</h2>
          <p className="text-gray-600">
            Our holistic approach to waste management helps you reduce environmental impact while recovering valuable resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Environmental Responsibility</h3>
            <p className="text-gray-600">
              Our methods minimize landfill waste, reduce greenhouse gas emissions, and conserve natural resources.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Recycle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Circular Economy Focus</h3>
            <p className="text-gray-600">
              We prioritize systems that transform waste into resources, closing the loop and reducing the need for virgin materials.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Customized Solutions</h3>
            <p className="text-gray-600">
              Our waste management systems are tailored to your specific needs, space constraints, and waste streams.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Comprehensive Approach</h3>
            <p className="text-gray-600">
              We address all waste streams, including difficult-to-manage materials like e-waste, hazardous waste, and organic waste.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Education & Training</h3>
            <p className="text-gray-600">
              We provide comprehensive training and educational resources to ensure your waste management systems work effectively long-term.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Regulatory Compliance</h3>
            <p className="text-gray-600">
              Our solutions ensure you meet or exceed all local waste management regulations and environmental standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
