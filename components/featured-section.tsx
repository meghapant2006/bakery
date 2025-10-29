"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const featuredItems = [
  {
    id: 1,
    name: "Artisan Sourdough",
    description: "Our signature sourdough with a perfect crust and tangy flavor",
    image: "/artisan-sourdough-bread-with-golden-crust.jpg",
    price: "₹280.00",
  },
  {
    id: 2,
    name: "French Croissants",
    description: "Buttery, flaky croissants baked fresh every morning",
    image: "/golden-french-croissants-on-wooden-board.jpg",
    price: "₹260.00",
  },
  {
    id: 3,
    name: "Chocolate Éclairs",
    description: "Classic éclairs filled with vanilla cream and chocolate glaze",
    image: "/chocolate-eclairs-with-glossy-chocolate-glaze.jpg",
    price: "₹380.00",
  },
]

export function FeaturedSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-play when hovering
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isHovering) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1))
      }, 2000) // Change every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHovering])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1))
  }

  const currentItem = featuredItems[currentIndex]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            Today's Featured Delights
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Discover our daily selection of handcrafted favorites, made with the finest ingredients and traditional
            techniques.
          </p>
        </div>

        {/* Carousel - One image at a time with auto-play on hover */}
        <div 
          className="max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Card className="hover-lift overflow-hidden relative">
            <div className="aspect-[16/5] overflow-hidden relative">
              <img
                src={currentItem.image || "/placeholder.svg"}
                alt={currentItem.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">{currentItem.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{currentItem.description}</p>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full w-10 h-10 hover:bg-primary hover:text-primary-foreground"
              aria-label="Previous item"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {/* Dot indicators */}
            <div className="flex gap-2">
              {featuredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-primary w-8" 
                      : "bg-muted-foreground/30 w-2.5 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to item ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full w-10 h-10 hover:bg-primary hover:text-primary-foreground"
              aria-label="Next item"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

