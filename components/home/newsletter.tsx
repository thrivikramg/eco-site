import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  return (
    <section className="py-16 bg-primary">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay up to date</h2>
          <p className="mt-4 text-lg">
            Subscribe to our newsletter for eco-tips, exclusive offers, and updates on new products.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-white bg-white/10 text-white placeholder:text-white/70"
              required
            />
            <Button variant="secondary" type="submit">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-sm text-white/80">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
