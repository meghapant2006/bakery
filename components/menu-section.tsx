"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DietaryMark } from "@/components/dietary-mark"
import { ProductModal, ProductData } from "@/components/product-modal"
import { useCart } from "@/components/cart-provider"
import { toast } from "@/hooks/use-toast"
import {
  Search,
  SlidersHorizontal,
  Plus,
  Sparkles,
  ShoppingBag,
  Check,
} from "lucide-react"

const CATEGORIES = [
  "All",
  "Cakes & Pastries",
  "Cheesecakes & Slices",
  "Savory & Patties",
  "Viennoiserie & Bakes",
  "Artisanal Breads",
  "Cookies & Biscuits",
  "Festive Hampers",
]

export const ALL_MENU_ITEMS: ProductData[] = [
  // --- Cakes & Pastries ---
  {
    id: 101,
    name: "Classic Chocolate Truffle Cake",
    category: "Cakes & Pastries",
    description: "Layers of decadent Dutch chocolate sponge coated in silky Belgian dark ganache.",
    price: 650,
    image: "/chocolate-layer-cake-with-ganache.jpg",
    isEggless: true,
    tags: ["Bestseller", "Eggless"],
  },
  {
    id: 102,
    name: "Tropical Pineapple Fresh Cream Cake",
    category: "Cakes & Pastries",
    description: "Soft vanilla sponge infused with fresh pineapple compote and airy whipped cream.",
    price: 550,
    image: "/pineapple-upside-down-cake-with-caramelized-fruit.jpg",
    isEggless: true,
    tags: ["100% Eggless", "Classic"],
  },
  {
    id: 103,
    name: "Royal Red Velvet Cake",
    category: "Cakes & Pastries",
    description: "Velvety crimson sponge layered with luscious Philadelphia cream cheese frosting.",
    price: 750,
    image: "/red-velvet-cake.png",
    isEggless: true,
    tags: ["Signature"],
  },
  {
    id: 104,
    name: "Black Forest Gateau",
    category: "Cakes & Pastries",
    description: "Traditional German chocolate sponge layered with tart cherry compote and Swiss cream.",
    price: 600,
    image: "/black-forest-cake-with-cherries-and-cream.jpg",
    isEggless: true,
    tags: ["Customer Favorite"],
  },
  {
    id: 105,
    name: "Fresh Seasonal Fruit Gateau",
    category: "Cakes & Pastries",
    description: "Vanilla sponge decorated lavishly with kiwi, dragon fruit, blueberries, and kiwi.",
    price: 700,
    image: "/fresh-fruit-tart-with-berries.jpg",
    isEggless: true,
    tags: ["Fresh Daily"],
  },
  {
    id: 106,
    name: "Opera Dark Coffee Cake",
    category: "Cakes & Pastries",
    description: "French almond joconde sponge soaked in espresso syrup, layered with dark ganache.",
    price: 850,
    image: "/opera-cake-with-chocolate-ganache-and-gold-leaf.jpg",
    isEggless: false,
    tags: ["Contains Egg", "French Pâtisserie"],
  },

  // --- Cheesecakes & Slices ---
  {
    id: 201,
    name: "Nocturne Dark Chocolate Cheesecake",
    category: "Cheesecakes & Slices",
    description: "Inspired by Defence Bakery's iconic Nocturne — intensely rich Belgian cocoa cheesecake with chocolate crumb crust.",
    price: 850,
    image: "/new-york-cheesecake-with-graham-cracker-crust.jpg",
    isEggless: false,
    tags: ["Defence Bakery Signature"],
  },
  {
    id: 202,
    name: "Lotus Biscoff Baked Cheesecake",
    category: "Cheesecakes & Slices",
    description: "Creamy baked New York style cheesecake crowned with spiced speculoos spread and biscuit crumble.",
    price: 850,
    image: "/new-york-cheesecake-with-graham-cracker-crust.jpg",
    isEggless: true,
    tags: ["Bestseller", "Eggless"],
  },
  {
    id: 203,
    name: "Blueberry Cold-Set Cheesecake Slice",
    category: "Cheesecakes & Slices",
    description: "Silky unbaked cheesecake infused with Greek yogurt and topped with wild Canadian blueberry glaze.",
    price: 240,
    image: "/new-york-cheesecake-with-graham-cracker-crust.jpg",
    isEggless: true,
    tags: ["Slice", "Eggless"],
  },

  // --- Savory & Patties (Defence Bakery Hallmark) ---
  {
    id: 301,
    name: "Crispy Aloo Masala Puff Patty",
    category: "Savory & Patties",
    description: "Flaky golden puff pastry stuffed with spiced potato, peas, cumin, and coriander. Served piping hot.",
    price: 65,
    image: "/apple-turnover-flaky-pastry.jpg",
    isEggless: true,
    tags: ["Hot Bake", "Pure Veg"],
  },
  {
    id: 302,
    name: "Tandoori Paneer Tikka Puff Patty",
    category: "Savory & Patties",
    description: "Buttery puff pastry enveloping smoky cottage cheese cubes tossed in tandoori spices and mint.",
    price: 85,
    image: "/apple-turnover-flaky-pastry.jpg",
    isEggless: true,
    tags: ["Must Try", "Pure Veg"],
  },
  {
    id: 303,
    name: "Creamy Mushroom & Corn Puff",
    category: "Savory & Patties",
    description: "Sauteed button mushrooms and sweet corn in a velvety béchamel and herb reduction inside flaky pastry.",
    price: 90,
    image: "/apple-turnover-flaky-pastry.jpg",
    isEggless: true,
    tags: ["Chef Special", "Pure Veg"],
  },
  {
    id: 304,
    name: "Baked Chicken Keema Roll",
    category: "Savory & Patties",
    description: "Minced spiced chicken cooked with aromatic garam masala wrapped in soft golden brioche roll.",
    price: 110,
    image: "/pain-au-chocolat-flaky-pastry.jpg",
    isEggless: false,
    tags: ["Non-Veg", "Hot Snack"],
  },
  {
    id: 305,
    name: "Chicken Sausage Puff Roll",
    category: "Savory & Patties",
    description: "Classic English-style seasoned chicken sausage wrapped in crisp French puff pastry with mustard glaze.",
    price: 110,
    image: "/apple-turnover-flaky-pastry.jpg",
    isEggless: false,
    tags: ["Non-Veg", "Classic"],
  },

  // --- Viennoiserie & Bakes ---
  {
    id: 401,
    name: "French Butter Croissant",
    category: "Viennoiserie & Bakes",
    description: "Laminated with 100% pure butter with over 27 delicate layers for that authentic Parisian crunch.",
    price: 160,
    image: "/golden-french-croissants-on-wooden-board.jpg",
    isEggless: true,
    tags: ["100% Real Butter", "Fresh 5 AM"],
  },
  {
    id: 402,
    name: "Almond Frangipane Croissant",
    category: "Viennoiserie & Bakes",
    description: "Twice-baked butter croissant loaded with rich almond cream and topped with toasted sliced almonds.",
    price: 220,
    image: "/almond-croissant-with-sliced-almonds.jpg",
    isEggless: true,
    tags: ["Artisan"],
  },
  {
    id: 403,
    name: "Dark Chocolate Pain au Chocolat",
    category: "Viennoiserie & Bakes",
    description: "Flaky viennoiserie pastry folded around two batons of 55% Belgian dark chocolate.",
    price: 180,
    image: "/pain-au-chocolat-flaky-pastry.jpg",
    isEggless: true,
    tags: ["Eggless"],
  },
  {
    id: 404,
    name: "Glazed Cinnamon Swirl Roll",
    category: "Viennoiserie & Bakes",
    description: "Tender brioche dough swirled with aromatic Ceylon cinnamon and topped with cream cheese drizzle.",
    price: 170,
    image: "/cinnamon-roll-cream-cheese-glaze.jpg",
    isEggless: true,
    tags: ["Eggless"],
  },
  {
    id: 405,
    name: "Mixed Berry Danish Pastry",
    category: "Viennoiserie & Bakes",
    description: "Crisp puff dough filled with smooth vanilla custard cream and raspberries.",
    price: 190,
    image: "/danish-pastry-cream-cheese-berries.jpg",
    isEggless: true,
    tags: ["Eggless"],
  },

  // --- Artisanal Breads ---
  {
    id: 501,
    name: "24-Hour Fermented Sourdough Boule",
    category: "Artisanal Breads",
    description: "Naturally leavened sourdough with an open airy crumb, blistered crust, and pleasant mild tang.",
    price: 240,
    image: "/artisan-sourdough-bread-with-golden-crust.jpg",
    isEggless: true,
    tags: ["Wild Yeast", "No Commercial Yeast"],
  },
  {
    id: 502,
    name: "Rosemary & Extra Virgin Olive Focaccia",
    category: "Artisanal Breads",
    description: "Pillowy Italian flatbread dimpled with kalamata olives, fresh garden rosemary, and sea salt flakes.",
    price: 220,
    image: "/focaccia-bread-rosemary-olive-oil.jpg",
    isEggless: true,
    tags: ["Italian Classic"],
  },
  {
    id: 503,
    name: "Traditional French Baguette",
    category: "Artisanal Breads",
    description: "Authentic long French loaf with a crisp golden exterior and chewy interior.",
    price: 140,
    image: "/french-baguette-bread-golden-crust.jpg",
    isEggless: true,
    tags: ["Parisian Classic"],
  },
  {
    id: 504,
    name: "Hearty 7-Grain & Seed Loaf",
    category: "Artisanal Breads",
    description: "Loaded with flax seeds, sunflower kernels, sesame, rolled oats, and whole wheat stoneground flour.",
    price: 180,
    image: "/multigrain-bread-loaf-with-seeds.jpg",
    isEggless: true,
    tags: ["High Fiber"],
  },
  {
    id: 505,
    name: "Artisan Ciabatta Bread",
    category: "Artisanal Breads",
    description: "Light Italian slipper bread with large irregular air pockets, ideal for panini and bruschetta.",
    price: 160,
    image: "/ciabatta-bread-italian-style.jpg",
    isEggless: true,
    tags: ["Eggless"],
  },

  // --- Cookies & Biscuits ---
  {
    id: 601,
    name: "Desi Ghee Nan Khatai Jar (300g)",
    category: "Cookies & Biscuits",
    description: "Traditional Indian shortbread biscuit made with pure desi cow ghee, cardamom, and pistachio shavings.",
    price: 260,
    image: "/shortbread-cookies-buttery-scottish.jpg",
    isEggless: true,
    tags: ["Desi Ghee", "Festive Favorite"],
  },
  {
    id: 602,
    name: "Sweet & Salty Jeera Biscuits (300g)",
    category: "Cookies & Biscuits",
    description: "The quintessential Indian tea-time cookie flavored with roasted cumin seeds and fine rock salt.",
    price: 220,
    image: "/oatmeal-raisin-cookies-on-plate.jpg",
    isEggless: true,
    tags: ["Tea Time Essential"],
  },
  {
    id: 603,
    name: "Belgian Choco Chunk Cookies Jar (300g)",
    category: "Cookies & Biscuits",
    description: "Thick, chewy cookies studded generously with 54% dark chocolate chunks and sea salt.",
    price: 280,
    image: "/chocolate-chip-cookies-fresh-baked.jpg",
    isEggless: true,
    tags: ["Bestseller"],
  },
  {
    id: 604,
    name: "Toasted Coconut Macaroon Cookies (250g)",
    category: "Cookies & Biscuits",
    description: "Chewy shredded coconut cookies dipped lightly in dark cocoa chocolate.",
    price: 260,
    image: "/sugar-cookies-vanilla-icing.jpg",
    isEggless: true,
    tags: ["Eggless"],
  },

  // --- Festive Hampers ---
  {
    id: 701,
    name: "Celebration Artisanal Gift Hamper",
    category: "Festive Hampers",
    description: "A luxury keepsake box containing Desi Ghee Nan Khatai Jar, Belgian Dark Truffles, Almond Biscotti, and Sourdough Crisps.",
    price: 1450,
    image: "/bakery-team-working.jpg",
    isEggless: true,
    tags: ["Luxury Packaging", "Perfect Gift"],
  },
  {
    id: 702,
    name: "Grand Patisserie Treat Box",
    category: "Festive Hampers",
    description: "Curated gift set with 2 Croissants, 2 Eclairs, Assorted Cookie Jar, and Handcrafted Belgian Chocolate Bark.",
    price: 1200,
    image: "/morning-coffee-pastry-setup.jpg",
    isEggless: true,
    tags: ["Gift Box"],
  },
]

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [egglessOnly, setEgglessOnly] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { addItem } = useCart()

  // Filter items
  const filteredItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false
      }
      // Eggless filter
      if (egglessOnly && !item.isEggless) {
        return false
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const nameMatch = item.name.toLowerCase().includes(q)
        const descMatch = item.description.toLowerCase().includes(q)
        const catMatch = item.category.toLowerCase().includes(q)
        if (!nameMatch && !descMatch && !catMatch) return false
      }
      return true
    })
  }, [selectedCategory, egglessOnly, searchQuery])

  const openCustomizeModal = (item: ProductData) => {
    setSelectedProduct(item)
    setIsModalOpen(true)
  }

  const handleQuickAdd = (item: ProductData) => {
    // If it's a cake with weight options, open modal for better experience
    if (item.category.includes("Cake")) {
      openCustomizeModal(item)
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
    <section id="menu" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" className="mb-3 px-3 py-1">
            Fresh From Our Ovens
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Artisanal Bakery & Pâtisserie Menu
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Inspired by the timeless heritage of iconic Delhi-NCR bakeries like Defence Bakery. Baked with 100% pure dairy butter, zero preservatives, and passion.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-xs mb-10 max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, patties, sourdough, cookies..."
                className="pl-10 text-xs rounded-xl h-11"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Eggless Toggle Pill Button */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                type="button"
                onClick={() => setEgglessOnly((prev) => !prev)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  egglessOnly
                    ? "bg-green-600 text-white border-green-700 shadow-md ring-2 ring-green-600/30"
                    : "bg-muted/40 border-border text-foreground hover:bg-muted"
                }`}
              >
                <div className="w-3.5 h-3.5 rounded-xs border border-white/60 bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                </div>
                <span>100% Eggless / Pure Veg Only</span>
                {egglessOnly && <Check className="h-3.5 w-3.5 ml-1" />}
              </button>

              <span className="text-xs text-muted-foreground hidden sm:inline">
                Showing <strong>{filteredItems.length}</strong> items
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-primary text-white shadow-sm font-semibold"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border max-w-3xl mx-auto">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-foreground">No bakery items found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              We couldn't find items matching "{searchQuery}" under {selectedCategory}. Try resetting your filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 text-xs"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setEgglessOnly(false)
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden border border-border bg-card shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group rounded-2xl"
              >
                <div>
                  {/* Image container */}
                  <div
                    onClick={() => openCustomizeModal(item)}
                    className="relative aspect-[4/3] overflow-hidden bg-muted/30 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Dietary badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs p-1 rounded-md shadow-xs">
                        <DietaryMark isEggless={item.isEggless ?? true} size="sm" />
                      </div>
                      {item.tags?.[0] && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] bg-white/95 dark:bg-zinc-900/95 text-foreground backdrop-blur-xs shadow-xs"
                        >
                          {item.tags[0]}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-2">
                    <span className="text-[11px] font-semibold text-accent uppercase tracking-wider block">
                      {item.category}
                    </span>

                    <h3
                      onClick={() => openCustomizeModal(item)}
                      className="text-base font-serif font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer leading-snug line-clamp-1"
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </div>

                {/* Bottom Price & Actions */}
                <div className="p-5 pt-0 border-t border-border/50 mt-2 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Starting at</span>
                    <span className="text-lg font-bold text-primary font-serif">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openCustomizeModal(item)}
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
        )}

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
