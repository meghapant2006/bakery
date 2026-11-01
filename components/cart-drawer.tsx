"use client"

import React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { DietaryMark } from "@/components/dietary-mark"
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Truck,
  CheckCircle2,
} from "lucide-react"
import { useRouter } from "next/navigation"

const UPSELL_ITEMS = [
  {
    id: 991,
    name: "Desi Ghee Nan Khatai Jar",
    price: 240,
    image: "/oatmeal-raisin-cookies-on-plate.jpg",
    weight: "250g Jar",
    isEggless: true,
  },
  {
    id: 992,
    name: "Artisan Sourdough Loaf",
    price: 180,
    image: "/artisan-sourdough-bread-with-golden-crust.jpg",
    weight: "Fresh Loaf",
    isEggless: true,
  },
]

export function CartDrawer() {
  const {
    items,
    updateQuantity,
    removeItem,
    isCartOpen,
    setIsCartOpen,
    orderNotes,
    setOrderNotes,
    selectedPincode,
    addItem,
  } = useCart()

  const router = useRouter()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const freeShippingThreshold = 799
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))

  const handleCheckout = () => {
    setIsCartOpen(false)
    router.push("/cart")
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 border-b border-border bg-background">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <SheetTitle className="text-lg font-serif font-bold">
                  Your Fresh Bakery Basket ({items.reduce((sum, i) => sum + i.quantity, 0)})
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          {/* Delivery threshold progress bar */}
          <div className="mt-4 p-3 bg-muted/60 rounded-xl space-y-1.5 border border-border">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-foreground">
                <Truck className="h-4 w-4 text-accent" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong>₹{remainingForFreeShipping}</strong> more for <strong>FREE Delivery</strong>
                  </span>
                ) : (
                  <span className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    You unlocked FREE Express Delivery!
                  </span>
                )}
              </span>
              <span className="text-muted-foreground text-[11px] font-bold">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  progressPercent >= 100 ? "bg-green-600" : "bg-gradient-to-r from-primary to-accent"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Delivery to {selectedPincode} (Noida)</span>
              <span>Threshold: ₹{freeShippingThreshold}</span>
            </div>
          </div>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <ShoppingBag className="h-10 w-10 stroke-1 text-primary/60" />
              </div>
              <h3 className="text-lg font-serif font-bold">Your bakery cart is empty</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Explore our fresh morning croissants, savory patties, or order a custom designer cake!
              </p>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="bg-primary hover:bg-primary/90 text-white rounded-full text-xs px-6"
              >
                Explore Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.cartItemId || item.id}
                  className="flex gap-3 p-3 bg-card border border-border rounded-xl shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <img
                    src={item.image || "/chocolate-layer-cake-with-ganache.jpg"}
                    alt={item.name}
                    className="w-18 h-18 object-cover rounded-lg shrink-0 border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <DietaryMark isEggless={item.isEggless ?? true} size="sm" />
                        <h4 className="text-sm font-semibold truncate leading-tight">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeItem(item.cartItemId || item.id)}
                        className="text-muted-foreground hover:text-destructive p-0.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-muted-foreground mt-0.5 flex flex-wrap gap-1">
                      {item.weight && <span className="font-medium text-foreground">{item.weight}</span>}
                      {item.isEggless ? <span>• Eggless</span> : <span>• With Egg</span>}
                    </div>

                    {item.customMessage && (
                      <div className="text-[11px] text-accent bg-accent/10 px-2 py-0.5 rounded-md mt-1 truncate">
                        "🎂 {item.customMessage}"
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/50">
                      <span className="text-sm font-bold text-primary font-serif">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </span>

                      {/* Quantity controls */}
                      <div className="flex items-center border border-border rounded-md bg-muted/40 px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                          className="p-1 hover:text-primary"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                          className="p-1 hover:text-primary"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Special Instructions */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Special Baking or Delivery Instructions:
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g., Ring bell, less sugar, pack separately..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-border bg-background focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Quick Upsells */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  <span>Frequently Paired By Noida Customers</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {UPSELL_ITEMS.map((up) => (
                    <div
                      key={up.id}
                      className="p-2 border border-border rounded-xl bg-muted/30 flex flex-col justify-between"
                    >
                      <div className="flex gap-2 items-center mb-1.5">
                        <img
                          src={up.image}
                          alt={up.name}
                          className="w-10 h-10 object-cover rounded-md shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold truncate leading-tight">
                            {up.name}
                          </p>
                          <p className="text-[10px] text-primary font-bold">₹{up.price}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[10px] h-6 w-full py-0 border-accent/40 text-accent-foreground hover:bg-accent/10"
                        onClick={() =>
                          addItem({
                            id: up.id,
                            name: up.name,
                            price: up.price,
                            image: up.image,
                            weight: up.weight,
                            isEggless: up.isEggless,
                          })
                        }
                      >
                        + Add (+₹{up.price})
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-border bg-background space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-bold text-foreground">₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery:</span>
                <span className="font-semibold text-foreground">
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    <span>₹60</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold pt-1.5 border-t border-border">
                <span>Total Amount:</span>
                <span className="text-primary">
                  ₹{(subtotal + (subtotal >= freeShippingThreshold ? 0 : 60)).toFixed(0)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-5 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-[10px] text-center text-muted-foreground">
              🔒 Safe & Contactless Delivery • Pure Veg Baking Certified
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
