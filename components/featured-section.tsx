"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { toast } from "@/hooks/use-toast"

const popularItems = [
  {
    id: 1,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate layer cake with creamy frosting",
    price: "₹850.00",
    priceNumber: 850,
    image: "/chocolate-layer-cake-with-ganache.jpg",
  },
  {
    id: 2,
    name: "Fresh Croissant",
    description: "Buttery, flaky croissants baked fresh every morning",
    price: "₹260.00",
    priceNumber: 260,
    image: "/golden-french-croissants-on-wooden-board.jpg",
  },
  {
    id: 3,
    name: "Red Velvet Cake",
    description: "Classic red velvet cake with cream cheese frosting",
    price: "₹180.00",
    priceNumber: 180,
    image: "/red-velvet-cake.png",
  },
  {
    id: 4,
    name: "Cinnamon Roll",
    description: "Soft and fluffy cinnamon rolls with cream cheese glaze",
    price: "₹160.00",
    priceNumber: 160,
    image: "/cinnamon-roll-cream-cheese-glaze.jpg",
  },
  {
    id: 5,
    name: "Artisan Sourdough",
    description: "Handcrafted sourdough with perfect crust and tangy flavor",
    price: "₹580.00",
    priceNumber: 580,
    image: "/artisan-sourdough-bread-with-golden-crust.jpg",
  },
  {
    id: 6,
    name: "Chocolate Éclair",
    description: "Classic éclair filled with vanilla cream and chocolate glaze",
    price: "₹380.00",
    priceNumber: 380,
    image: "/chocolate-eclairs-with-glossy-chocolate-glaze.jpg",
  },
]

export function FeaturedSection() {
  const { addItem } = useCart()

  const handleAddToCart = (item: typeof popularItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.priceNumber,
      image: item.image,
    })
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    })
  }
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Items
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our customers' favorites - handcrafted daily with the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {popularItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{item.price}</span>
                  <Button
                    size="icon"
                    className="rounded-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

