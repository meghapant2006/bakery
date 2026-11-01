"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  Cake,
  MapPin,
  ChevronDown,
  Phone,
} from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AnnouncementBar } from "@/components/announcement-bar"
import { PincodeDialog } from "@/components/pincode-dialog"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPincodeOpen, setIsPincodeOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { items, setIsCartOpen, selectedPincode } = useCart()
  const totalCount = items.reduce((sum, it) => sum + (it.quantity || 0), 0)
  const subtotal = items.reduce((sum, it) => sum + it.price * (it.quantity || 0), 0)
  const router = useRouter()

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (window.location.pathname !== "/") {
      router.push(`/#${sectionId}`)
      setIsMenuOpen(false)
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    scrollToSection("menu")
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-xs">
        {/* Top Announcement Bar */}
        <AnnouncementBar onOpenPincode={() => setIsPincodeOpen(true)} />

        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-amber-700 rounded-full flex items-center justify-center shadow-md relative">
                <Cake className="h-5 w-5 text-white" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-serif font-bold text-foreground tracking-tight">
                    Sweet Spot
                  </span>
                  <span className="text-[10px] bg-accent/20 text-accent-foreground font-bold px-1.5 py-0.5 rounded-full hidden sm:inline">
                    EST. 1998
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium hidden sm:block">
                  Artisan Bakery • Noida
                </p>
              </div>
            </a>

            {/* Pincode / Location Selector */}
            <button
              type="button"
              onClick={() => setIsPincodeOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-xs transition-colors shrink-0 cursor-pointer"
            >
              <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
              <div className="text-left">
                <span className="text-[10px] text-muted-foreground block leading-tight">
                  Delivering to
                </span>
                <span className="font-bold text-foreground flex items-center gap-1">
                  Noida {selectedPincode}
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </span>
              </div>
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-sm mx-2">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search cakes, patties, sourdough..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-14 py-2 text-xs rounded-full bg-muted/50 focus:bg-background"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-2.5 h-7 text-xs bg-primary hover:bg-primary/90 text-white"
                >
                  Search
                </Button>
              </form>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-6 text-sm font-medium">
              <button
                onClick={() => scrollToSection("home")}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection("custom-cakes")}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Custom Cakes</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              </button>
              <button
                onClick={() => scrollToSection("outlets")}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Our Outlets
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Cart Button & Mobile Menu Trigger */}
            <div className="flex items-center space-x-3 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 border-primary/20 hover:border-primary px-3 py-2 rounded-xl"
              >
                <div className="relative">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  {totalCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-scale-in">
                      {totalCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[10px] text-muted-foreground leading-none">Cart</span>
                  <span className="text-xs font-bold text-primary font-serif leading-tight">
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>
              </Button>

              {/* Mobile Menu Hamburger */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="xl:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <div className="flex flex-col space-y-6 pt-6">
                    <div className="flex items-center space-x-2">
                      <Cake className="h-6 w-6 text-primary" />
                      <span className="text-lg font-serif font-bold">Sweet Spot Bakery</span>
                    </div>

                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsPincodeOpen(true)
                      }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-muted/60 text-xs text-left"
                    >
                      <MapPin className="h-4 w-4 text-accent shrink-0" />
                      <div>
                        <div className="text-muted-foreground">Delivering in Noida:</div>
                        <div className="font-bold text-foreground">Sector {selectedPincode} (Change)</div>
                      </div>
                    </button>

                    <div className="flex flex-col space-y-3 text-sm font-medium">
                      <button
                        onClick={() => scrollToSection("home")}
                        className="text-left py-2 hover:text-primary transition-colors"
                      >
                        Home
                      </button>
                      <button
                        onClick={() => scrollToSection("menu")}
                        className="text-left py-2 hover:text-primary transition-colors"
                      >
                        Bakery & Patisserie Menu
                      </button>
                      <button
                        onClick={() => scrollToSection("custom-cakes")}
                        className="text-left py-2 hover:text-primary transition-colors flex items-center justify-between"
                      >
                        <span>Custom Designer Cakes</span>
                        <span className="text-[10px] bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full font-bold">
                          NEW
                        </span>
                      </button>
                      <button
                        onClick={() => scrollToSection("outlets")}
                        className="text-left py-2 hover:text-primary transition-colors"
                      >
                        Our Noida Outlets
                      </button>
                      <button
                        onClick={() => scrollToSection("reviews")}
                        className="text-left py-2 hover:text-primary transition-colors"
                      >
                        Our Craft & Reviews
                      </button>
                      <button
                        onClick={() => scrollToSection("contact")}
                        className="text-left py-2 hover:text-primary transition-colors"
                      >
                        Contact & Support
                      </button>
                    </div>

                    <div className="pt-4 border-t border-border space-y-3">
                      <a
                        href="tel:+919811024820"
                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
                      >
                        <Phone className="h-4 w-4 text-accent" />
                        <span>Helpline: +91 98110 24820</span>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Pincode Dialog */}
      <PincodeDialog open={isPincodeOpen} onOpenChange={setIsPincodeOpen} />
    </>
  )
}
