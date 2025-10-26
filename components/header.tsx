"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, ShoppingBag, Search, Heart, Cake, Wheat } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
            <Button variant="ghost" size="icon" className="hidden md:flex hover-glow relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
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
                🎂 Custom Orders
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
