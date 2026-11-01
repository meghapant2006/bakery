"use client"

import { CheckCircle2, Clock, Sparkles, MapPin, Cake, ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderSuccess() {
  const orderId = "SSB-" + Math.floor(100000 + Math.random() * 900000)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-card border border-border rounded-3xl p-8 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-500/5">
          <CheckCircle2 className="h-10 w-10 stroke-2" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">
            Order Confirmed
          </span>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Thank You for Your Order!
          </h1>
          <p className="text-xs text-muted-foreground">
            Order Reference: <strong className="text-foreground">{orderId}</strong>
          </p>
        </div>

        {/* Status card */}
        <div className="bg-muted/40 border border-border rounded-2xl p-4 text-left space-y-3 text-xs">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Clock className="h-4 w-4 text-accent shrink-0" />
            <span>Estimated Delivery: <strong>45–60 minutes</strong></span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cake className="h-4 w-4 text-accent shrink-0" />
            <span>Our bakehouse is hand-packing your treats fresh from the oven.</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 text-accent shrink-0" />
            <span>You will receive an SMS and WhatsApp tracking update shortly.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a href="/" className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-5 text-xs font-semibold">
              Back to Home
            </Button>
          </a>
          <a href="/#menu" className="flex-1">
            <Button variant="outline" className="w-full rounded-xl py-5 text-xs font-semibold border-border">
              <span>Order More Treats</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
