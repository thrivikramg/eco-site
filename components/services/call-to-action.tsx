import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Phone } from "lucide-react"

export default function CallToAction() {
  return (
    <section className="py-16 bg-primary">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book an Eco-Friendly Service?</h2>
          <p className="text-white/90 mb-8">
            Take the first step towards a more sustainable lifestyle with our professional services.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/services/book">
              <Button size="lg" variant="secondary" className="font-medium">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Service
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-medium">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Link>
          </div>

          <p className="text-white/80 mt-8 text-sm">
            Have questions? Call us at +91 98765 43210 or email at services@ecogrow.com
          </p>
        </div>
      </div>
    </section>
  )
}
