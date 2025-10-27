"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

        {/* Show all featured items in a responsive grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {featuredItems.map((item) => (
            <Card key={item.id} className="hover-lift overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">{item.name}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-accent">{item.price}</span>
                  <Button className="bg-primary hover:bg-primary/90">Add to Order</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

