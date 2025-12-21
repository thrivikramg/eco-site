import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ShinyText from "@/components/ShinyText"

export default function Newsletter() {
  return (
    <section className="py-16 bg-primary">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center text-white">
          <ShinyText text="Stay up to date" className="text-3xl font-bold tracking-tight sm:text-4xl" speed={3} shineColor="rgba(255, 255, 255, 0.8)" />
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
