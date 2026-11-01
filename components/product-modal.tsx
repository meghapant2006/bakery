"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DietaryMark } from "@/components/dietary-mark"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Check, Sparkles, ShieldCheck, Heart, ShoppingBag } from "lucide-react"
import { useCart, CartItem } from "@/components/cart-provider"
import { toast } from "@/hooks/use-toast"

export interface ProductData {
  id: number | string
  name: string
  category: string
  description: string
  price: number // base price (usually 500g or 1 pack)
  image: string
  isEggless?: boolean
  weights?: { label: string; priceMultiplier: number }[]
  allowCustomMessage?: boolean
  rating?: number
  reviewsCount?: number
  tags?: string[]
}

interface ProductModalProps {
  product: ProductData | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DEFAULT_WEIGHTS = [
  { label: "500g (Serves 4-6)", priceMultiplier: 1.0 },
  { label: "1.0 kg (Serves 8-12)", priceMultiplier: 1.85 },
  { label: "1.5 kg (Serves 14-18)", priceMultiplier: 2.7 },
  { label: "2.0 kg (Serves 20-25)", priceMultiplier: 3.5 },
]

const SAVORY_PACKS = [
  { label: "Single Piece", priceMultiplier: 1.0 },
  { label: "Pack of 2", priceMultiplier: 1.9 },
  { label: "Party Box of 4", priceMultiplier: 3.6 },
]

const COOKIE_SIZES = [
  { label: "Petite Jar (250g)", priceMultiplier: 1.0 },
  { label: "Classic Jar (500g)", priceMultiplier: 1.85 },
]

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { addItem } = useCart()

  const [selectedWeight, setSelectedWeight] = useState<string>("500g (Serves 4-6)")
  const [multiplier, setMultiplier] = useState<number>(1.0)
  const [isEggless, setIsEggless] = useState<boolean>(true)
  const [customMessage, setCustomMessage] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  useEffect(() => {
    if (product) {
      setIsEggless(product.isEggless ?? true)
      setCustomMessage("")
      setQuantity(1)
      setSelectedAddons([])

      const cat = product.category?.toLowerCase() || ""
      if (cat.includes("cake") || cat.includes("cheesecake")) {
        setSelectedWeight("500g (Serves 4-6)")
        setMultiplier(1.0)
      } else if (cat.includes("savory") || cat.includes("patties") || cat.includes("pastries")) {
        setSelectedWeight("Single Piece")
        setMultiplier(1.0)
      } else if (cat.includes("cookie") || cat.includes("rusk")) {
        setSelectedWeight("Petite Jar (250g)")
        setMultiplier(1.0)
      } else {
        setSelectedWeight("Standard")
        setMultiplier(1.0)
      }
    }
  }, [product])

  if (!product) return null

  const isCakeOrCheesecake =
    product.category?.toLowerCase().includes("cake") ||
    product.category?.toLowerCase().includes("cheesecake")
  const isSavory = product.category?.toLowerCase().includes("savory")
  const isCookie = product.category?.toLowerCase().includes("cookie")

  const weightOptions = product.weights
    ? product.weights
    : isCakeOrCheesecake
    ? DEFAULT_WEIGHTS
    : isSavory
    ? SAVORY_PACKS
    : isCookie
    ? COOKIE_SIZES
    : null

  // Addon pricing
  const addonPrices: Record<string, number> = {
    "Candles Set": 49,
    "Cake Knife & Plates": 39,
    "Greeting Card": 29,
  }

  const addonsTotal = selectedAddons.reduce((sum, add) => sum + (addonPrices[add] || 0), 0)
  const unitPrice = Math.round(product.price * multiplier)
  const finalTotalPrice = (unitPrice + addonsTotal) * quantity

  const toggleAddon = (name: string) => {
    setSelectedAddons((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    )
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: unitPrice + addonsTotal,
        image: product.image,
        weight: selectedWeight,
        isEggless,
        customMessage: customMessage.trim() || undefined,
        addons: selectedAddons.length > 0 ? selectedAddons : undefined,
      },
      quantity
    )

    toast({
      title: "Added to Cart! 🎂",
      description: `${quantity}x ${product.name} (${selectedWeight}) added.`,
      duration: 3500,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0 rounded-2xl gap-0">
        <div className="grid md:grid-cols-2">
          {/* Product Image Column */}
          <div className="relative bg-muted/40 flex items-center justify-center min-h-[260px] md:min-h-full overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover max-h-[360px] md:max-h-full"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <Badge variant={isEggless ? "veg" : "egg"} className="shadow-xs backdrop-blur-md bg-white/90">
                <DietaryMark isEggless={isEggless} showLabel size="sm" />
              </Badge>
              {product.tags?.[0] && (
                <Badge variant="accent" className="text-[11px] shadow-xs">
                  {product.tags[0]}
                </Badge>
              )}
            </div>
          </div>

          {/* Details & Customizations Column */}
          <div className="p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  ⭐ 4.9 (120+ reviews)
                </span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-foreground">
                {product.name}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary font-serif">
                  ₹{unitPrice}
                </span>
                {multiplier > 1 && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{Math.round(product.price * multiplier * 1.15)}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">({selectedWeight})</span>
              </div>
            </div>

            {/* Weight / Size selection */}
            {weightOptions && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex justify-between">
                  <span>Select Size / Portion</span>
                  <span className="text-accent font-medium">Portion Guide</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {weightOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.label}
                      onClick={() => {
                        setSelectedWeight(opt.label)
                        setMultiplier(opt.priceMultiplier)
                      }}
                      className={`text-xs p-2.5 rounded-xl border text-left transition-all ${
                        selectedWeight === opt.label
                          ? "border-primary bg-primary/10 font-bold text-primary shadow-xs ring-1 ring-primary"
                          : "border-border hover:bg-muted/60 text-muted-foreground"
                      }`}
                    >
                      <div className="font-semibold text-foreground">{opt.label}</div>
                      <div className="text-[11px] text-primary">₹{Math.round(product.price * opt.priceMultiplier)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dietary Preference Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Dietary Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsEggless(true)}
                  className={`text-xs p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    isEggless
                      ? "border-green-600 bg-green-500/10 text-green-800 dark:text-green-300 font-semibold ring-1 ring-green-600"
                      : "border-border hover:bg-muted/60 text-muted-foreground"
                  }`}
                >
                  <DietaryMark isEggless={true} showLabel size="sm" />
                  {isEggless && <Check className="h-4 w-4 text-green-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEggless(false)}
                  className={`text-xs p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    !isEggless
                      ? "border-amber-700 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-semibold ring-1 ring-amber-700"
                      : "border-border hover:bg-muted/60 text-muted-foreground"
                  }`}
                >
                  <DietaryMark isEggless={false} showLabel size="sm" />
                  {!isEggless && <Check className="h-4 w-4 text-amber-700" />}
                </button>
              </div>
            </div>

            {/* Custom Message on Cake (if cake or cheesecake) */}
            {isCakeOrCheesecake && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold uppercase tracking-wider text-muted-foreground">
                    Message on Cake (Optional)
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    {customMessage.length}/35
                  </span>
                </div>
                <Input
                  type="text"
                  maxLength={35}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Happy Birthday Sarah! 🎂"
                  className="text-xs h-9"
                />
              </div>
            )}

            {/* Celebration Add-ons */}
            {isCakeOrCheesecake && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Celebration Essentials
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(addonPrices).map(([name, price]) => {
                    const isSelected = selectedAddons.includes(name)
                    return (
                      <button
                        type="button"
                        key={name}
                        onClick={() => toggleAddon(name)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-accent/20 border-accent text-accent-foreground font-semibold"
                            : "border-border hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <span>{name} (+₹{price})</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-accent" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart Button */}
            <div className="pt-2 border-t border-border flex items-center gap-3">
              <div className="flex items-center border border-border rounded-xl px-2 py-1 bg-muted/30">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-5 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart • ₹{finalTotalPrice}</span>
              </Button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-around text-[10px] text-muted-foreground pt-1 border-t border-border/50">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-accent" />
                100% Real Dairy Butter
              </span>
              <span>•</span>
              <span>Fresh 5 AM Bakehouse</span>
              <span>•</span>
              <span>No Preservatives</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
