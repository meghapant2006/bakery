"use client"

import React, { useState, useEffect } from "react"
import { Phone, Clock, Sparkles, ChevronRight, MapPin } from "lucide-react"

const messages = [
  "🎉 Free Express Delivery on orders above ₹799 across Noida & NCR",
  "⏱️ Fresh 5:00 AM Bakes: Hot Savory Patties, Sourdough & Croissants",
  "🎂 Designer Tier & Photo Cakes — Pre-order for Birthdays & Weddings",
  "🧈 100% Real Dairy Butter • Pure Ingredients • Zero Preservatives",
]

export function AnnouncementBar({ onOpenPincode }: { onOpenPincode?: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-primary text-primary-foreground text-xs py-2 px-4 border-b border-primary-foreground/10 transition-colors">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden text-center sm:text-left justify-center sm:justify-start w-full sm:w-auto">
          <Sparkles className="h-3.5 w-3.5 text-accent shrink-0 animate-pulse hidden xs:inline" />
          <span className="font-medium tracking-wide transition-opacity duration-300">
            {messages[currentIdx]}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-5 text-primary-foreground/90 shrink-0 text-[11px]">
          {onOpenPincode && (
            <button
              onClick={onOpenPincode}
              className="flex items-center gap-1 hover:text-accent transition-colors cursor-pointer"
            >
              <MapPin className="h-3 w-3 text-accent" />
              <span>Check Delivery Pincode</span>
            </button>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-accent" />
            <span>Outlets: 8:00 AM – 11:00 PM</span>
          </span>
          <a
            href="tel:+919811024820"
            className="flex items-center gap-1 hover:text-accent transition-colors"
          >
            <Phone className="h-3 w-3 text-accent" />
            <span>+91 98110 24820</span>
          </a>
        </div>
      </div>
    </div>
  )
}
