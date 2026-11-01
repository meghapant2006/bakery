"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Cake, Sparkles, Star, Truck, ShieldCheck } from "lucide-react"

export function HeroSection() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bakery-showcase-display-case.jpg"
          alt="Fresh cakes, breads and pastries"
          className="w-full h-full object-cover scale-105 animate-subtle-zoom"
        />
        {/* Dark warm gradient overlay for high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/50" />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Trust badges row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 (2,850+ Noida Reviews)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 backdrop-blur-md border border-accent/40 text-amber-200 text-xs font-semibold">
              <Truck className="h-3.5 w-3.5 text-accent" />
              <span>Express 45-60 Min Delivery in Noida</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-md border border-green-400/40 text-green-300 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-green-400" />
              <span>100% Pure Veg & Eggless Specialists</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight drop-shadow-xl leading-tight">
            Noida's Premier <br className="hidden sm:inline" />
            <span className="text-accent underline decoration-accent/40 decoration-wavy decoration-2">
              Artisan Bakery
            </span> & Pâtisserie
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Handcrafted daily with 100% pure dairy butter, 24-hour slow fermented sourdough, savory puff patties, and bespoke designer celebration cakes.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => scrollTo("menu")}
            >
              <span>Explore Bakery Menu</span>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md px-8 py-6 text-base rounded-full shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => scrollTo("custom-cakes")}
            >
              <Cake className="h-5 w-5 text-accent" />
              <span>Design Custom Cake</span>
            </Button>
          </div>

          {/* Bottom assurance pills */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-white/80 text-xs">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-accent shrink-0" />
              <span>100% Real Dairy Butter</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-accent shrink-0" />
              <span>Fresh 5:00 AM Bakehouse</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-accent shrink-0" />
              <span>Hot Savory Puff Counter</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-accent shrink-0" />
              <span>Zero Artificial Additives</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
