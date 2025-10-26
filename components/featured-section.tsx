"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const featuredItems = [
  {
    id: 1,
    name: "Artisan Sourdough",
    description: "Our signature sourdough with a perfect crust and tangy flavor",
    image: "/artisan-sourdough-bread-with-golden-crust.jpg",
    price: "₹680.00",
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
    name: "Chocolate Ã‰clairs",
    description: "Classic Ã©clairs filled with vanilla cream and chocolate glaze",
    image: "/chocolate-eclairs-with-glossy-chocolate-glaze.jpg",
    price: "₹380.00",
  },
]

export function FeaturedSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredItems.length) % featuredItems.length)
  }

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

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-card shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-?{currentIndex * 100}%)` }}
            >
              {featuredItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    <div className="order-2 md:order-1 flex flex-col justify-center">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">{item.name}</h3>
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-accent">{item.price}</span>
                        <Button className="bg-primary hover:bg-primary/90">Add to Order</Button>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-64 md:h-80 object-cover rounded-xl hover-lift"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ?{
                  index === currentIndex ? "bg-primary" : "bg-border"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

