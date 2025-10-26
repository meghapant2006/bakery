"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

const categories = ["All", "Cakes", "Pastries", "Cookies", "Breads"]

const menuItems = [
  {
    id: 1,
    name: "Classic Baguette",
    category: "Breads",
    description: "Traditional French baguette with crispy crust",
    price: "₹360.00",
    image: "/french-baguette-bread-golden-crust.jpg",
  },
  {
    id: 5,
    name: "Multigrain Loaf",
    category: "Breads",
    description: "Hearty multigrain bread with seeds",
    price: "₹440.00",
    image: "/multigrain-bread-loaf-with-seeds.jpg",
  },
  {
    id: 22,
    name: "Sourdough Bread",
    category: "Breads",
    description: "Artisan sourdough with tangy flavor and chewy texture",
    price: "₹580.00",
    image: "/artisan-sourdough-bread-rustic.jpg",
  },
  {
    id: 23,
    name: "Whole Wheat Bread",
    category: "Breads",
    description: "Nutritious whole wheat bread with honey",
    price: "₹460.00",
    image: "/whole-wheat-bread-honey-glazed.jpg",
  },
  {
    id: 24,
    name: "Focaccia Bread",
    category: "Breads",
    description: "Italian focaccia with rosemary and olive oil",
    price: "₹420.00",
    image: "/focaccia-bread-rosemary-olive-oil.jpg",
  },
  {
    id: 25,
    name: "Ciabatta Bread",
    category: "Breads",
    description: "Traditional Italian ciabatta with airy texture",
    price: "₹420.00",
    image: "/ciabatta-bread-italian-style.jpg",
  },
  {
    id: 26,
    name: "Rye Bread",
    category: "Breads",
    description: "Dense rye bread with caraway seeds",
    price: "₹500.00",
    image: "/rye-bread-caraway-seeds.jpg",
  },
  {
    id: 2,
    name: "Almond Croissant",
    category: "Pastries",
    description: "Buttery croissant filled with almond cream",
    price: "₹340.00",
    image: "/almond-croissant-with-sliced-almonds.jpg",
  },
  {
    id: 6,
    name: "Fruit Tart",
    category: "Pastries",
    description: "Fresh seasonal fruit on pastry cream",
    price: "₹440.00",
    image: "/fresh-fruit-tart-with-berries.jpg",
  },
  {
    id: 27,
    name: "Pain au Chocolat",
    category: "Pastries",
    description: "Flaky pastry with dark chocolate filling",
    price: "₹300.00",
    image: "/pain-au-chocolat-flaky-pastry.jpg",
  },
  {
    id: 28,
    name: "Danish Pastry",
    category: "Pastries",
    description: "Buttery Danish with cream cheese and berries",
    price: "₹360.00",
    image: "/danish-pastry-cream-cheese-berries.jpg",
  },
  {
    id: 29,
    name: "Ã‰clair",
    category: "Pastries",
    description: "Choux pastry filled with vanilla cream and chocolate glaze",
    price: "₹380.00",
    image: "/chocolate-eclair-vanilla-cream.jpg",
  },
  {
    id: 30,
    name: "Profiterole",
    category: "Pastries",
    description: "Light choux pastry with whipped cream and chocolate sauce",
    price: "₹260.00",
    image: "/profiteroles-whipped-cream-chocolate.jpg",
  },
  {
    id: 31,
    name: "Apple Turnover",
    category: "Pastries",
    description: "Flaky pastry with spiced apple filling",
    price: "₹316.00",
    image: "/apple-turnover-flaky-pastry.jpg",
  },
  {
    id: 32,
    name: "Cinnamon Roll",
    category: "Pastries",
    description: "Soft roll with cinnamon sugar and cream cheese glaze",
    price: "₹340.00",
    image: "/cinnamon-roll-cream-cheese-glaze.jpg",
  },
  {
    id: 4,
    name: "Oatmeal Cookies",
    category: "Cookies",
    description: "Chewy oatmeal cookies with raisins",
    price: "₹220.00",
    image: "/oatmeal-raisin-cookies-on-plate.jpg",
  },
  {
    id: 33,
    name: "Chocolate Chip Cookies",
    category: "Cookies",
    description: "Classic cookies with premium chocolate chips",
    price: "₹200.00",
    image: "/chocolate-chip-cookies-fresh-baked.jpg",
  },
  {
    id: 34,
    name: "Sugar Cookies",
    category: "Cookies",
    description: "Soft sugar cookies with vanilla icing",
    price: "₹180.00",
    image: "/sugar-cookies-vanilla-icing.jpg",
  },
  {
    id: 35,
    name: "Snickerdoodles",
    category: "Cookies",
    description: "Cinnamon sugar cookies with soft centers",
    price: "₹220.00",
    image: "/snickerdoodle-cookies-cinnamon-sugar.jpg",
  },
  {
    id: 36,
    name: "Peanut Butter Cookies",
    category: "Cookies",
    description: "Rich peanut butter cookies with crosshatch pattern",
    price: "₹236.00",
    image: "/peanut-butter-cookies-crosshatch.jpg",
  },
  {
    id: 37,
    name: "Double Chocolate Cookies",
    category: "Cookies",
    description: "Fudgy chocolate cookies with chocolate chunks",
    price: "₹260.00",
    image: "/double-chocolate-cookies-fudgy.jpg",
  },
  {
    id: 38,
    name: "Gingerbread Cookies",
    category: "Cookies",
    description: "Spiced gingerbread cookies with royal icing",
    price: "₹280.00",
    image: "/gingerbread-cookies-royal-icing.jpg",
  },
  {
    id: 39,
    name: "Shortbread Cookies",
    category: "Cookies",
    description: "Buttery Scottish shortbread cookies",
    price: "₹236.00",
    image: "/shortbread-cookies-buttery-scottish.jpg",
  },
  {
    id: 3,
    name: "Chocolate Cake",
    category: "Cakes",
    description: "Rich chocolate cake with ganache frosting",
    price: "₹240.99",
    image: "/chocolate-layer-cake-with-ganache.jpg",
  },
  {
    id: 7,
    name: "Red Velvet Cake",
    category: "Cakes",
    description: "Classic red velvet with cream cheese frosting",
    price: "₹260.99",
    image: "/red-velvet-cake.png",
  },
  {
    id: 8,
    name: "Vanilla Bean Cake",
    category: "Cakes",
    description: "Moist vanilla cake with Madagascar vanilla bean buttercream",
    price: "₹230.99",
    image: "/vanilla-bean-cake-with-buttercream-frosting.jpg",
  },
  {
    id: 9,
    name: "Lemon Drizzle Cake",
    category: "Cakes",
    description: "Zesty lemon cake with tangy lemon glaze",
    price: "₹220.99",
    image: "/lemon-drizzle-cake-with-glaze.jpg",
  },
  {
    id: 10,
    name: "Carrot Cake",
    category: "Cakes",
    description: "Spiced carrot cake with walnuts and cream cheese frosting",
    price: "₹25.99",
    image: "/carrot-cake-with-cream-cheese-frosting-and-walnuts.jpg",
  },
  {
    id: 11,
    name: "Black Forest Cake",
    category: "Cakes",
    description: "Chocolate sponge with cherries and whipped cream",
    price: "₹28.99",
    image: "/black-forest-cake-with-cherries-and-cream.jpg",
  },
  {
    id: 12,
    name: "Strawberry Shortcake",
    category: "Cakes",
    description: "Light sponge with fresh strawberries and whipped cream",
    price: "₹24.99",
    image: "/strawberry-shortcake-with-fresh-berries.jpg",
  },
  {
    id: 13,
    name: "Tiramisu Cake",
    category: "Cakes",
    description: "Coffee-soaked layers with mascarpone and cocoa",
    price: "₹27.99",
    image: "/tiramisu-cake-with-mascarpone-and-cocoa.jpg",
  },
  {
    id: 14,
    name: "Coconut Cake",
    category: "Cakes",
    description: "Tropical coconut cake with coconut cream frosting",
    price: "₹25.99",
    image: "/coconut-cake-with-coconut-flakes-and-cream-frostin.jpg",
  },
  {
    id: 15,
    name: "Funfetti Birthday Cake",
    category: "Cakes",
    description: "Colorful sprinkle cake with vanilla buttercream",
    price: "₹23.99",
    image: "/funfetti-birthday-cake-with-colorful-sprinkles.jpg",
  },
  {
    id: 16,
    name: "German Chocolate Cake",
    category: "Cakes",
    description: "Rich chocolate cake with coconut pecan frosting",
    price: "₹26.99",
    image: "/german-chocolate-cake-with-coconut-pecan-frosting.jpg",
  },
  {
    id: 17,
    name: "Cheesecake",
    category: "Cakes",
    description: "New York style cheesecake with graham cracker crust",
    price: "₹21.99",
    image: "/new-york-cheesecake-with-graham-cracker-crust.jpg",
  },
  {
    id: 18,
    name: "Chocolate Raspberry Cake",
    category: "Cakes",
    description: "Decadent chocolate cake with fresh raspberry filling",
    price: "₹29.99",
    image: "/chocolate-raspberry-cake-with-fresh-berries.jpg",
  },
  {
    id: 19,
    name: "Banana Cake",
    category: "Cakes",
    description: "Moist banana cake with cinnamon cream cheese frosting",
    price: "₹240.99",
    image: "/banana-cake-with-cinnamon-cream-cheese-frosting.jpg",
  },
  {
    id: 20,
    name: "Opera Cake",
    category: "Cakes",
    description: "French almond sponge with chocolate ganache and gold leaf",
    price: "₹32.99",
    image: "/opera-cake-with-chocolate-ganache-and-gold-leaf.jpg",
  },
  {
    id: 21,
    name: "Pineapple Upside Down Cake",
    category: "Cakes",
    description: "Caramelized pineapple with tender vanilla cake",
    price: "₹23.99",
    image: "/pineapple-upside-down-cake-with-caramelized-fruit.jpg",
  },
]

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { addItem } = useCart()
  const router = useRouter()
  const [quantities, setQuantities] = useState<Record<number, number>>({})

  const getQty = (id: number) => (quantities[id] ?? 1)
  const setQty = (id: number, value: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, Math.min(99, Math.floor(value) || 1)) }))

  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            Our Artisan Menu
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Every item is crafted with care using traditional methods and the finest ingredients sourced locally.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-primary hover:bg-primary/90"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover-lift overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-foreground">{item.name}</h3>
                  <span className="text-lg font-bold text-accent">{item.price}</span>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                {/* Quantity selector */}
                <div className="mb-4 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setQty(item.id, getQty(item.id) - 1)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={99}
                    value={getQty(item.id)}
                    onChange={(e) => setQty(item.id, Number(e.target.value))}
                    className="w-16 text-center"
                    aria-label={`${item.name} quantity`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setQty(item.id, getQty(item.id) + 1)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </Button>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    const priceNumber = parseFloat(String(item.price).replace(/[^\d.]/g, "")) || 0
                    const qty = getQty(item.id)
                    addItem(
                      {
                        id: item.id,
                        name: item.name,
                        price: priceNumber,
                        image: item.image,
                      },
                      qty,
                    )
                    toast({
                      title: "Added to order",
                      description: `${qty} × ${item.name} added to your cart.`,
                      action: (
                        <ToastAction altText="View cart" onClick={() => router.push("/cart")}>
                          View cart
                        </ToastAction>
                      ),
                    })
                    // reset to 1 after adding
                    setQty(item.id, 1)
                  }}
                >
                  Add to Order
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}





