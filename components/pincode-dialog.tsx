"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle2, AlertCircle, Clock, Truck } from "lucide-react"
import { useCart } from "@/components/cart-provider"

interface PincodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NOIDA_AREAS: Record<string, { area: string; time: string; express: boolean }> = {
  "201301": { area: "Noida Sector 18 / Atta Market / Sec 15, 16, 27", time: "45–60 mins", express: true },
  "201303": { area: "Noida Sector 29, 37, Golf Course & Botanical", time: "45–60 mins", express: true },
  "201304": { area: "Noida Sector 104, 105, 108 & 93 (Expressway)", time: "45–60 mins", express: true },
  "201305": { area: "Noida Sector 137, 142 & Advant Navis", time: "60–90 mins", express: true },
  "201307": { area: "Noida Sector 12, 22, 55 & 56", time: "60–75 mins", express: true },
  "201309": { area: "Noida Sector 62, 63 & Electronic City", time: "45–60 mins", express: true },
  "201310": { area: "Greater Noida & Knowledge Park", time: "Same day (by 6 PM)", express: false },
  "201009": { area: "Indirapuram & Vaishali (Ghaziabad)", time: "60–90 mins", express: true },
  "110001": { area: "Central Delhi / Connaught Place", time: "Same day slot", express: false },
  "110024": { area: "Defence Colony & South Extension, Delhi", time: "Same day slot", express: false },
}

export function PincodeDialog({ open, onOpenChange }: PincodeDialogProps) {
  const { selectedPincode, setSelectedPincode } = useCart()
  const [inputPin, setInputPin] = useState(selectedPincode || "201301")
  const [status, setStatus] = useState<{
    checked: boolean
    eligible: boolean
    area?: string
    time?: string
    express?: boolean
  }>({
    checked: true,
    eligible: true,
    area: NOIDA_AREAS[selectedPincode]?.area || "Noida Central Sector 18",
    time: NOIDA_AREAS[selectedPincode]?.time || "45–60 mins",
    express: true,
  })

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = inputPin.trim()
    if (cleaned.length !== 6 || !/^\d+$/.test(cleaned)) {
      setStatus({ checked: true, eligible: false })
      return
    }

    const found = NOIDA_AREAS[cleaned]
    if (found) {
      setSelectedPincode(cleaned)
      setStatus({
        checked: true,
        eligible: true,
        area: found.area,
        time: found.time,
        express: found.express,
      })
    } else if (cleaned.startsWith("201") || cleaned.startsWith("110") || cleaned.startsWith("122")) {
      // NCR general pincode
      setSelectedPincode(cleaned)
      setStatus({
        checked: true,
        eligible: true,
        area: "Delhi NCR Delivery Zone",
        time: "Same-Day Delivery (Slot: 4 PM - 7 PM)",
        express: false,
      })
    } else {
      setStatus({ checked: true, eligible: false })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary">
            <Truck className="h-5 w-5 text-accent" />
            <DialogTitle className="text-xl font-bold font-serif">
              Check Bakery Delivery in Noida
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground text-sm">
            Enter your 6-digit delivery pincode to check fresh bakes & cake delivery availability.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCheck} className="space-y-4 pt-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                maxLength={6}
                value={inputPin}
                onChange={(e) => setInputPin(e.target.value)}
                placeholder="e.g. 201301 or 201304"
                className="pl-9 font-medium"
              />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white shrink-0">
              Check Pincode
            </Button>
          </div>

          {/* Quick select pills */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">Popular Noida Pincodes:</p>
            <div className="flex flex-wrap gap-1.5">
              {["201301", "201304", "201303", "201309", "201009"].map((pin) => (
                <button
                  type="button"
                  key={pin}
                  onClick={() => {
                    setInputPin(pin)
                    const found = NOIDA_AREAS[pin]
                    setSelectedPincode(pin)
                    setStatus({
                      checked: true,
                      eligible: true,
                      area: found.area,
                      time: found.time,
                      express: found.express,
                    })
                  }}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    inputPin === pin
                      ? "bg-accent/20 border-accent font-semibold text-accent-foreground"
                      : "bg-muted/50 border-border hover:bg-muted"
                  }`}
                >
                  {pin} ({pin === "201301" ? "Sec 18" : pin === "201304" ? "Sec 104" : pin === "201309" ? "Sec 62" : "NCR"})
                </button>
              ))}
            </div>
          </div>

          {status.checked && (
            <div
              className={`p-4 rounded-xl border transition-all ${
                status.eligible
                  ? "bg-green-500/10 border-green-500/30 text-foreground"
                  : "bg-destructive/10 border-destructive/30 text-foreground"
              }`}
            >
              {status.eligible ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>Delivering to {inputPin}</span>
                  </div>
                  {status.area && (
                    <p className="text-xs text-muted-foreground">
                      <strong>Location:</strong> {status.area}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs font-medium text-foreground pt-1 border-t border-green-500/20">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    <span>Estimated delivery time: <strong>{status.time}</strong></span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    ✓ Free delivery on orders over ₹799 • Fresh from morning bakehouse
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-semibold">Delivery unavailable for this pincode</p>
                    <p className="text-muted-foreground">
                      We currently deliver across Noida, Greater Noida, and East/South Delhi. Please call us at +91 98110 24820 for custom bulk inquiries.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Done & Continue Shopping
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
