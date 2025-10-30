"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const scrollToMenu = () => {
    const element = document.getElementById("menu")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-width hero image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bakery-showcase-display-case.jpg"
          alt="Fresh cakes and breads"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Best Bakery Shop in Noida
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 drop-shadow-md">
            Freshly Baked with Love Every Morning
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
            onClick={scrollToMenu}
          >
            Shop Now
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
