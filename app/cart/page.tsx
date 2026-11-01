"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { DietaryMark } from "@/components/dietary-mark"
import { CartDrawer } from "@/components/cart-drawer"
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  CreditCard,
  Banknote,
  QrCode,
} from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation"

const TIME_SLOTS = [
  "Standard (10:00 AM – 1:00 PM)",
  "Afternoon (1:00 PM – 5:00 PM)",
  "Evening Celebration (5:00 PM – 9:00 PM)",
]

export default function CartPage() {
  const {
    items: cartItems,
    updateQuantity,
    removeItem,
    clear,
    selectedPincode,
    orderNotes,
    setOrderNotes,
    deliveryDate,
    setDeliveryDate,
    deliverySlot,
    setDeliverySlot,
  } = useCart()

  const [paymentMethod, setPaymentMethod] = useState<string>("upi")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [addressLine, setAddressLine] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const freeThreshold = 799
  const deliveryFee = subtotal >= freeThreshold || subtotal === 0 ? 0 : 60
  const gst = Math.round(subtotal * 0.05) // 5% GST on bakery goods
  const finalTotal = subtotal + deliveryFee + gst

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (cartItems.length === 0) return

    setIsSubmitting(true)
    setTimeout(() => {
      clear()
      router.push("/order-success")
    }, 600)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="container mx-auto px-4 py-8 pt-36 max-w-7xl">
        {/* Navigation back and header */}
        <div className="flex items-center gap-4 mb-8">
          <a href="/">
            <Button variant="outline" size="sm" className="rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </a>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Your Bakery Checkout
            </h1>
            <p className="text-xs text-muted-foreground">
              Delivering freshly baked treats across Noida & Delhi NCR
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 border border-dashed border-border rounded-2xl max-w-2xl mx-auto">
            <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-4 stroke-1" />
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              Your cart is currently empty
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Add some of our freshly baked pastries, sourdough breads, hot patties or custom cakes to proceed!
            </p>
            <a href="/#menu">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8">
                Explore Bakery Menu
              </Button>
            </a>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart items & Delivery Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Cart Items List */}
              <Card className="border-border shadow-xs rounded-2xl overflow-hidden">
                <CardHeader className="bg-muted/30 border-b border-border py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-serif font-bold">
                      Order Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">
                      Pincode: <strong>{selectedPincode} (Noida)</strong>
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartItemId || item.id}
                      className="flex gap-4 p-3 bg-muted/20 border border-border/80 rounded-xl"
                    >
                      <img
                        src={item.image || "/chocolate-layer-cake-with-ganache.jpg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl border border-border shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <DietaryMark isEggless={item.isEggless ?? true} size="sm" />
                              <h3 className="font-semibold text-sm leading-tight text-foreground">
                                {item.name}
                              </h3>
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">
                              {item.weight && <span className="font-medium text-foreground">{item.weight}</span>}
                              {item.isEggless ? " • Eggless" : " • With Egg"}
                            </div>
                          </div>
                          <span className="text-base font-bold text-primary font-serif">
                            ₹{(item.price * item.quantity).toFixed(0)}
                          </span>
                        </div>

                        {item.customMessage && (
                          <div className="text-xs text-accent bg-accent/10 px-2.5 py-1 rounded-md mt-1.5 inline-block">
                            "🎂 {item.customMessage}"
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border rounded-lg bg-background px-1 py-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                              className="p-1 hover:text-primary"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                              className="p-1 hover:text-primary"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.cartItemId || item.id)}
                            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Delivery Address & Scheduling Card */}
              <Card className="border-border shadow-xs rounded-2xl">
                <CardHeader className="bg-muted/30 border-b border-border py-4">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-accent" />
                    <CardTitle className="text-base font-serif font-bold">
                      Delivery Address & Slot
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="c-name" className="text-xs font-semibold">
                        Full Name *
                      </Label>
                      <Input
                        id="c-name"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="text-xs h-10 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="c-phone" className="text-xs font-semibold">
                        Phone Number (for delivery updates) *
                      </Label>
                      <Input
                        id="c-phone"
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 98110XXXXX"
                        className="text-xs h-10 mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="c-address" className="text-xs font-semibold">
                      Complete Delivery Address (House/Flat, Tower, Sector/Locality) *
                    </Label>
                    <Input
                      id="c-address"
                      required
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      placeholder="e.g. Flat 402, Tower B, Sector 18, Noida"
                      className="text-xs h-10 mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <Label className="text-xs font-semibold">Delivery Date</Label>
                      <select
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-border bg-background mt-1 font-medium"
                      >
                        <option value="Today">Today (Fast Delivery)</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="Day After Tomorrow">Day After Tomorrow</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold">Preferred Time Slot</Label>
                      <select
                        value={deliverySlot}
                        onChange={(e) => setDeliverySlot(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-border bg-background mt-1 font-medium"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="c-notes" className="text-xs font-semibold">
                      Special Baking / Delivery Instructions
                    </Label>
                    <textarea
                      id="c-notes"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="e.g. Please ring bell twice, keep packaging upright for the cake..."
                      rows={2}
                      className="w-full text-xs p-2.5 rounded-xl border border-border bg-background mt-1 focus:outline-hidden focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary & Payment */}
            <div className="lg:col-span-5 space-y-5 sticky top-28">
              <Card className="border-border shadow-md rounded-2xl overflow-hidden">
                <CardHeader className="bg-muted/30 border-b border-border py-4">
                  <CardTitle className="text-base font-serif font-bold">
                    Order Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Item Subtotal:</span>
                      <span className="font-semibold text-foreground">₹{subtotal.toFixed(0)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-1">
                        Delivery Charges:
                        {subtotal < freeThreshold && (
                          <span className="text-[10px] text-accent">
                            (Free above ₹{freeThreshold})
                          </span>
                        )}
                      </span>
                      <span className="font-semibold">
                        {deliveryFee === 0 ? (
                          <span className="text-green-600 font-bold">FREE</span>
                        ) : (
                          `₹${deliveryFee}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bakery GST (5%):</span>
                      <span className="font-semibold text-foreground">₹{gst.toFixed(0)}</span>
                    </div>

                    <div className="border-t border-border pt-3 flex justify-between items-baseline">
                      <span className="text-base font-bold font-serif text-foreground">
                        Grand Total:
                      </span>
                      <span className="text-2xl font-serif font-bold text-primary">
                        ₹{finalTotal.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-3 border-t border-border space-y-2.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Select Payment Mode
                    </Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid gap-2"
                    >
                      <label
                        htmlFor="pm-upi"
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          paymentMethod === "upi"
                            ? "border-primary bg-primary/10 font-bold text-primary ring-1 ring-primary"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <RadioGroupItem value="upi" id="pm-upi" />
                          <QrCode className="h-4 w-4 text-accent" />
                          <span className="font-semibold text-foreground">
                            UPI (Google Pay / PhonePe / Paytm)
                          </span>
                        </div>
                        <Badge variant="accent" className="text-[10px]">Instant</Badge>
                      </label>

                      <label
                        htmlFor="pm-card"
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/10 font-bold text-primary ring-1 ring-primary"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <RadioGroupItem value="card" id="pm-card" />
                          <CreditCard className="h-4 w-4 text-accent" />
                          <span className="font-semibold text-foreground">
                            Credit / Debit Card / Net Banking
                          </span>
                        </div>
                      </label>

                      <label
                        htmlFor="pm-cod"
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          paymentMethod === "cod"
                            ? "border-primary bg-primary/10 font-bold text-primary ring-1 ring-primary"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <RadioGroupItem value="cod" id="pm-cod" />
                          <Banknote className="h-4 w-4 text-accent" />
                          <span className="font-semibold text-foreground">
                            Pay on Delivery (Cash or UPI at Doorstep)
                          </span>
                        </div>
                      </label>
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl shadow-lg text-sm mt-4 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {isSubmitting
                        ? "Placing Your Order..."
                        : `Confirm & Place Order • ₹${finalTotal.toFixed(0)}`}
                    </span>
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                    <span>100% Satisfaction & Freshness Guarantee</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
