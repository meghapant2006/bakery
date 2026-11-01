"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DietaryMark } from "@/components/dietary-mark"
import {
  Cake,
  Heart,
  Sparkles,
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle2,
  Send,
  HelpCircle,
} from "lucide-react"

const OCCASIONS = [
  { id: "birthday", label: "Birthday Party", icon: Cake },
  { id: "wedding", label: "Wedding & Reception", icon: Heart },
  { id: "anniversary", label: "Anniversary", icon: Sparkles },
  { id: "baby", label: "Baby Shower / Gender Reveal", icon: Heart },
  { id: "corporate", label: "Corporate Celebration", icon: Sparkles },
  { id: "kids", label: "Kids Themed 3D Cake", icon: Cake },
]

const TIERS_AND_SIZES = [
  { id: "0.5kg", label: "1 Tier • 0.5 kg", serves: "Serves 4–6", basePrice: 750 },
  { id: "1.0kg", label: "1 Tier • 1.0 kg", serves: "Serves 8–12", basePrice: 1400 },
  { id: "2.0kg", label: "2 Tiers • 2.0 kg", serves: "Serves 18–22", basePrice: 2800 },
  { id: "3.0kg", label: "2 Tiers • 3.0 kg", serves: "Serves 28–35", basePrice: 4200 },
  { id: "4.5kg", label: "3 Tiers • 4.5+ kg", serves: "Grand Event (45+)", basePrice: 6500 },
]

const FLAVORS = [
  { id: "truffle", name: "Belgian Dark Chocolate Truffle", extra: 0, tag: "Signature Best Seller" },
  { id: "biscoff", name: "Lotus Biscoff Crunch Cream", extra: 150, tag: "Trending Favorite" },
  { id: "fruit", name: "Fresh Seasonal Fruit & Vanilla Cream", extra: 100, tag: "Chef's Special" },
  { id: "redvelvet", name: "Red Velvet & Philadelphia Cream Cheese", extra: 150, tag: "Classic" },
  { id: "rasmalai", name: "Royal Kesari Rasmalai Fusion", extra: 200, tag: "Festive Indian" },
  { id: "mocha", name: "Roasted Coffee Mocha & Dark Ganache", extra: 100, tag: "Artisan" },
]

const TIME_SLOTS = [
  "Morning Slot (10:00 AM – 1:00 PM)",
  "Afternoon Slot (1:00 PM – 5:00 PM)",
  "Evening Celebration (5:00 PM – 9:00 PM)",
]

export function CustomCakeBuilder() {
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0].label)
  const [selectedTier, setSelectedTier] = useState(TIERS_AND_SIZES[1])
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0])
  const [isEggless, setIsEggless] = useState(true)
  const [customMessage, setCustomMessage] = useState("")
  const [designNotes, setDesignNotes] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("Tomorrow")
  const [deliverySlot, setDeliverySlot] = useState(TIME_SLOTS[2])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Calculate estimated price
  const estimatedPrice = selectedTier.basePrice + selectedFlavor.extra

  // Pre-generate WhatsApp message
  const generateWhatsAppUrl = () => {
    const text = `Hello Sweet Spot Bakery Noida! 🎂
I would like to order/inquire for a Custom Cake:
• Occasion: ${selectedOccasion}
• Size & Tiers: ${selectedTier.label} (${selectedTier.serves})
• Flavor: ${selectedFlavor.name}
• Dietary: ${isEggless ? "100% Eggless (Pure Veg)" : "With Egg"}
• Message on Cake: "${customMessage || "None"}"
• Design Theme/Notes: ${designNotes || "Artisan Bakery's Choice"}
• Delivery Date: ${deliveryDate}
• Preferred Slot: ${deliverySlot}
• Estimated Quote: ₹${estimatedPrice}
• Customer: ${customerName || "Customer"} (${customerPhone || "Pending"})

Could you please confirm availability and provide details? Thank you!`

    return `https://wa.me/919811024820?text=${encodeURIComponent(text)}`
  }

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section id="custom-cakes" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" className="mb-3 px-3 py-1">
            Inspired by Defence Bakery Design Studio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Custom Designer Cake Studio
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Whether it's an intimate birthday or a grand multi-tiered wedding celebration, design your dream cake with our master pâtissiers in Noida.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
          {/* Main interactive customization form */}
          <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            {/* Step 1: Occasion */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                Step 1: Select Occasion
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {OCCASIONS.map((occ) => {
                  const Icon = occ.icon
                  const active = selectedOccasion === occ.label
                  return (
                    <button
                      type="button"
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ.label)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary font-bold shadow-xs ring-1 ring-primary"
                          : "border-border hover:bg-muted/60 text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-accent" />
                      <span className="text-xs">{occ.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Weight & Tiers */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                Step 2: Cake Size & Tiers
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TIERS_AND_SIZES.map((tier) => {
                  const active = selectedTier.id === tier.id
                  return (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary font-bold shadow-xs ring-1 ring-primary"
                          : "border-border hover:bg-muted/60 text-muted-foreground"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-foreground">{tier.label}</div>
                        <div className="text-[11px] text-muted-foreground">{tier.serves}</div>
                      </div>
                      <span className="text-xs font-bold text-primary font-serif">
                        ₹{tier.basePrice}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Signature Flavor */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                Step 3: Signature Flavor & Fillings
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FLAVORS.map((flav) => {
                  const active = selectedFlavor.id === flav.id
                  return (
                    <button
                      type="button"
                      key={flav.id}
                      onClick={() => setSelectedFlavor(flav)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        active
                          ? "border-primary bg-primary/10 font-bold shadow-xs ring-1 ring-primary"
                          : "border-border hover:bg-muted/60 text-muted-foreground"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-xs text-foreground font-semibold">{flav.name}</span>
                        {flav.extra > 0 && (
                          <span className="text-[10px] text-primary font-bold shrink-0">
                            +₹{flav.extra}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-accent font-medium">{flav.tag}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 4: Dietary Preference */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                Step 4: Dietary Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsEggless(true)}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    isEggless
                      ? "border-green-600 bg-green-500/10 text-green-800 dark:text-green-300 font-bold ring-1 ring-green-600"
                      : "border-border hover:bg-muted/60 text-muted-foreground"
                  }`}
                >
                  <DietaryMark isEggless={true} showLabel size="md" />
                  <span className="text-xs font-semibold">100% Pure Veg</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEggless(false)}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    !isEggless
                      ? "border-amber-700 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-bold ring-1 ring-amber-700"
                      : "border-border hover:bg-muted/60 text-muted-foreground"
                  }`}
                >
                  <DietaryMark isEggless={false} showLabel size="md" />
                  <span className="text-xs font-semibold">Contains Egg</span>
                </button>
              </div>
            </div>

            {/* Step 5: Custom Message & Design theme */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Message Written on Cake
                </label>
                <Input
                  type="text"
                  maxLength={40}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Happy 30th Birthday Priya! 🎂"
                  className="text-xs h-10"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Design Theme / Color Palette / Reference Notes
                </label>
                <textarea
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  placeholder="Describe your desired theme (e.g., pastel pink florals, chocolate drip, superhero figurine, semi-naked rustic style)..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-border bg-background focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Step 6: Delivery Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Celebration Date
                </label>
                <select
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-border bg-background font-medium"
                >
                  <option value="Tomorrow">Tomorrow (Priority Baking)</option>
                  <option value="In 2 Days">In 2 Days</option>
                  <option value="This Weekend">This Coming Weekend</option>
                  <option value="Next Week">Next Week / Later Date</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Preferred Delivery Slot
                </label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-border bg-background font-medium"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Live Quote & Direct WhatsApp Order Summary Column */}
          <div className="lg:col-span-5 space-y-5 sticky top-24">
            <Card className="border-border shadow-md overflow-hidden bg-gradient-to-b from-card to-muted/20">
              <div className="p-6 border-b border-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    Instant Quote Estimator
                  </span>
                  <Badge variant={isEggless ? "veg" : "egg"}>
                    {isEggless ? "100% Pure Veg" : "With Egg"}
                  </Badge>
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground">
                  Your Custom Cake Summary
                </h3>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-muted-foreground">Occasion:</span>
                    <span className="font-semibold text-foreground">{selectedOccasion}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-muted-foreground">Tier & Portion:</span>
                    <span className="font-semibold text-foreground">
                      {selectedTier.label} ({selectedTier.serves})
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-muted-foreground">Signature Flavor:</span>
                    <span className="font-semibold text-foreground text-right">
                      {selectedFlavor.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-muted-foreground">Delivery Slot:</span>
                    <span className="font-semibold text-foreground text-right">
                      {deliveryDate} • {deliverySlot.split("(")[0]}
                    </span>
                  </div>
                  {customMessage && (
                    <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20 text-accent-foreground">
                      <span className="text-[11px] font-semibold block">Written on Cake:</span>
                      <span className="font-serif italic font-bold">"{customMessage}"</span>
                    </div>
                  )}
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t border-border flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block">Estimated Starting Price</span>
                    <span className="text-3xl font-serif font-bold text-primary">
                      ₹{estimatedPrice}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground text-right">
                    Includes GST &<br />Custom Cake Box
                  </span>
                </div>

                {/* WhatsApp Direct Inquiry Button */}
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-6 rounded-xl shadow-md flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5 fill-current" />
                    <span>Inquire & Order on WhatsApp</span>
                  </Button>
                </a>

                {/* Or Online Request Form */}
                {!isSubmitted ? (
                  <form onSubmit={handleSubmitRequest} className="space-y-2.5 pt-2 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Or request a direct phone callback:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="text-xs h-9"
                      />
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        className="text-xs h-9"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full text-xs h-9 border-primary/30 text-primary hover:bg-primary/5 font-semibold"
                    >
                      <Send className="h-3.5 w-3.5 mr-1.5" />
                      Submit Online Consultation Request
                    </Button>
                  </form>
                ) : (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-2 text-green-700 dark:text-green-300 text-xs">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-bold">Consultation Request Received!</p>
                      <p className="text-[11px] text-muted-foreground">
                        Our master cake decorator will contact you within 30 minutes.
                      </p>
                    </div>
                  </div>
                )}

                <div className="text-[11px] text-muted-foreground text-center space-y-1">
                  <p>📍 Consultations available at Sector 18 & Sector 104 Noida stores.</p>
                  <p>Cake tastings available on booking for weddings & bulk tiers.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
