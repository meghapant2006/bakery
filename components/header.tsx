"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, ShoppingBag, Search, Heart, Cake, Wheat } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { items } = useCart()
  const totalCount = items.reduce((sum, it) => sum + (it.quantity || 0), 0)
  const subtotal = items.reduce((sum, it) => sum + (it.price * (it.quantity || 0)), 0)
  const router = useRouter()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Scroll to menu section and highlight search results
      scrollToSection("menu")
      // You can add more sophisticated search logic here
      console.log("Searching for:", searchQuery)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Compact Logo Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-orange-400 rounded-full flex items-center justify-center shadow-lg hover-glow relative">
              <Cake className="h-5 w-5 text-white" fill="currentColor" />
              <div className="absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full"></div>
            </div>
            
            {/* Compact Text Logo */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-xl font-serif font-bold gradient-text-enhanced tracking-tight">
                  Sweet Spot
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                Artisan Bakery
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Search our delicious treats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pl-10 pr-4 py-2 rounded-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full px-3"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
            >
              Menu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("custom-orders")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
            >
              Custom Orders
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover-glow"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            {/* Cart (sheet) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-glow relative">
                  <ShoppingBag className="h-5 w-5" />
                  {totalCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                      {totalCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                {items.length === 0 ? (
                  <div className="py-10 text-sm text-muted-foreground">Your cart is empty.</div>
                ) : (
                  <>
                    <ScrollArea className="h-[55vh] pr-3 mt-4">
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
                            ) : (
                              <div className="w-14 h-14 rounded bg-muted" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{item.name}</div>
                              <div className="text-xs text-muted-foreground">Qty {item.quantity}</div>
                            </div>
                            <div className="text-sm font-semibold whitespace-nowrap">₹{(item.price * (item.quantity || 0)).toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="mt-4 border-t pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={() => router.push('/cart')}>View Cart</Button>
                        <Button onClick={() => router.push('/cart')}>Checkout</Button>
                      </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search our delicious treats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pl-10 pr-20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Button type="submit" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 bakery-pattern">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              >
                🏠 Home
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              >
                🍞 Menu
              </button>
              <button
                onClick={() => scrollToSection("custom-orders")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              >
                🎂 Orders
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              >
                📞 Contact
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
