"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DietaryMark } from "@/components/dietary-mark"
import { ProductModal, ProductData } from "@/components/product-modal"
import { ShoppingBag, Plus, Sparkles, Star } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { toast } from "@/hooks/use-toast"

const POPULAR_ITEMS: ProductData[] = [
  {
    id: 1,
    name: "Classic Chocolate Truffle Cake",
    category: "Cakes & Pastries",
    description: "Rich and moist chocolate layer sponge wrapped in glossy Belgian dark ganache.",
    price: 650,
    image: "/chocolate-layer-cake-with-ganache.jpg",
    isEggless: true,
    tags: ["Signature Bestseller"],
  },
  {
    id: 202,
    name: "Lotus Biscoff Baked Cheesecake",
    category: "Cheesecakes & Slices",
    description: "Creamy baked cheesecake infused with Belgian speculoos spread and biscuit crumble.",
    price: 850,
    image: "/new-york-cheesecake-with-graham-cracker-crust.jpg",
    isEggless: true,
    tags: ["Trending in Noida"],
  },
  {
    id: 302,
    name: "Tandoori Paneer Tikka Puff Patty",
    category: "Savory & Patties",
    description: "Flaky golden puff pastry bursting with smoky cottage cheese in tandoori spices.",
    price: 85,
    image: "/apple-turnover-flaky-pastry.jpg",
    isEggless: true,
    tags: ["Hot Bakehouse Snack"],
  },
  {
    id: 401,
    name: "French Butter Croissant",
    category: "Viennoiserie & Bakes",
    description: "27 layers of laminated pure butter dough baked to golden, shatteringly crisp perfection.",
    price: 160,
    image: "/golden-french-croissants-on-wooden-board.jpg",
    isEggless: true,
    tags: ["Fresh 5 AM"],
  },
  {
    id: 601,
    name: "Desi Ghee Nan Khatai Jar (300g)",
    category: "Cookies & Biscuits",
    description: "Melt-in-mouth traditional cardamom and pistachio shortbread crafted with pure cow ghee.",
    price: 260,
    image: "/shortbread-cookies-buttery-scottish.jpg",
    isEggless: true,
    tags: ["Tea-Time Classic"],
  },
  {
    id: 501,
    name: "24-Hour Fermented Sourdough Boule",
    category: "Artisanal Breads",
    description: "Wild yeast sourdough loaf with a blistered rustic crust and soft open crumb.",
    price: 240,
    image: "/artisan-sourdough-bread-with-golden-crust.jpg",
    isEggless: true,
    tags: ["Gut Friendly"],
  },
]

export function FeaturedSection() {
  const { addItem } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenCustomize = (item: ProductData) => {
    setSelectedProduct(item)
    setIsModalOpen(true)
  }

  const handleQuickAdd = (item: ProductData) => {
    if (item.category.includes("Cake")) {
      handleOpenCustomize(item)
      return
    }

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      weight: item.category.includes("Savory") ? "Single Piece" : "Standard",
      isEggless: item.isEggless,
    })

    toast({
      title: "Added to Cart! 🥐",
      description: `${item.name} added to your basket.`,
      duration: 3000,
    })
  }

  return (
    <section className="py-20 bg-muted/20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" className="mb-3 px-3 py-1">
            Top Rated by Noida Customers
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Most Loved Bakery Signatures
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            From our hot savory patties to slow-fermented sourdough and rich celebration gateaux, these are our daily sell-outs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {POPULAR_ITEMS.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border border-border bg-card shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group rounded-2xl"
            >
              <div>
                <div
                  onClick={() => handleOpenCustomize(item)}
                  className="relative aspect-[4/3] overflow-hidden bg-muted/30 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs p-1 rounded-md shadow-xs">
                      <DietaryMark isEggless={item.isEggless ?? true} size="sm" />
                    </div>
                    {item.tags?.[0] && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] bg-white/95 dark:bg-zinc-900/95 text-foreground backdrop-blur-xs shadow-xs font-semibold"
                      >
                        {item.tags[0]}
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-6 space-y-2">
                  <span className="text-[11px] font-semibold text-accent uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h3
                    onClick={() => handleOpenCustomize(item)}
                    className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer leading-snug"
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </div>

              <div className="p-6 pt-0 border-t border-border/50 mt-2 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-muted-foreground block">Price</span>
                  <span className="text-xl font-bold text-primary font-serif">
                    ₹{item.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenCustomize(item)}
                    className="text-xs h-9 px-3 border-primary/30 text-primary hover:bg-primary/5 rounded-xl font-medium"
                  >
                    Customise
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleQuickAdd(item)}
                    className="bg-primary hover:bg-primary/90 text-white h-9 px-3 rounded-xl font-medium shadow-xs"
                  >
                    <Plus className="h-4 w-4 mr-0.5" />
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Global Product Customization Modal */}
        <ProductModal
          product={selectedProduct}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </section>
  )
}
