"use client"

import { Button } from "@/components/ui/button"
// Example fallback image component (uncomment to use):
// import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { ArrowRight, Star, Award, Clock } from "lucide-react"

export function HeroSection() {
  const scrollToMenu = () => {
    const element = document.getElementById("menu")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToCustomOrders = () => {
    const element = document.getElementById("custom-orders")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="hero-gradient min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      <div className="absolute top-20 left-10 floating opacity-20">
        <div className="w-16 h-16 bg-accent/30 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-20 floating opacity-10" style={{ animationDelay: "1s" }}>
        <div className="w-24 h-24 bg-primary/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-40 left-20 floating opacity-15" style={{ animationDelay: "2s" }}>
        <div className="w-20 h-20 bg-accent/25 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="flex justify-center items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-accent fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-accent" />
              <span>Award Winning</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-accent" />
              <span>Fresh Daily</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-8 text-balance leading-tight">
            <span className="gradient-text">Artisan</span> baked goods meets{" "}
            <span className="gradient-text">exquisite</span> taste
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance leading-relaxed">
            Transform your daily moments into delicious memories with The Sweet Spot's handcrafted breads, pastries, and
            custom creations made with love and the finest ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-xl rounded-full shadow-xl hover-lift"
              onClick={scrollToMenu}
            >
              Explore Our Menu
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-4 text-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent rounded-full shadow-lg hover-lift"
              onClick={scrollToCustomOrders}
            >
              Custom Orders
            </Button>
          </div>
        </div>

        <div className="mt-20 relative animate-slide-up">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="relative group">
              <img
                src="/bakery-showcase-display-case.jpg"
                alt="Beautiful bakery display case"
                className="w-full h-64 object-cover rounded-2xl shadow-lg hover-lift group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Fresh Daily Selection</h3>
                <p className="text-sm opacity-90">Handpicked ingredients</p>
              </div>
            </div>
            <div className="relative group">
              <img
                src="/artisan-baker-kneading-dough.jpg"
                alt="Artisan baker at work"
                className="w-full h-64 object-cover rounded-2xl shadow-lg hover-lift group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Master Craftsmanship</h3>
                <p className="text-sm opacity-90">Traditional techniques</p>
              </div>
            </div>
            <div className="relative group">
              <img
                src="/fresh-baked-bread-cooling-racks.jpg"
                alt="Fresh baked breads cooling"
                className="w-full h-64 object-cover rounded-2xl shadow-lg hover-lift group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Artisan Quality</h3>
                <p className="text-sm opacity-90">Baked with passion</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-3xl z-10"></div>
            <img
              src="/artisan-bakery-interior-with-fresh-bread-and-pastr.jpg"
              alt="The Sweet Spot bakery interior showcasing fresh artisan breads and pastries"
              className="w-full max-w-5xl mx-auto rounded-3xl shadow-2xl hover-lift border-4 border-white/50"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 z-20 animate-bounce-gentle">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Daily Varieties</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">15</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
