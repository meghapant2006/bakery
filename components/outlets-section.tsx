"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Coffee,
  ShoppingBag,
  Sparkles,
} from "lucide-react"

const OUTLETS = [
  {
    id: "sec18",
    name: "Flagship Bakehouse & Cafe",
    sector: "Sector 18, Noida",
    address: "Pocket A, Block P, Sector 18 Market (Near Metro Gate 2), Noida, UP 201301",
    hours: "8:00 AM – 11:00 PM (Open 7 Days)",
    phone: "+91 120 422 1818",
    mapQuery: "Sector+18+Noida+Market",
    image: "/cozy-bakery-storefront-with-warm-lighting-and-disp.jpg",
    tags: ["Dine-in Cafe", "Live Baking", "Cake Lounge", "Valet Parking"],
    highlights: "Our flagship destination featuring our complete bakery collection, live custom cake consultations, and warm European cafe dining.",
  },
  {
    id: "sec104",
    name: "Artisan Patisserie & Coffee Bar",
    sector: "Sector 104, Noida",
    address: "Ground Floor, Sector 104 High Street (Near Starling Mall), Noida, UP 201304",
    hours: "9:00 AM – 10:30 PM (Daily)",
    phone: "+91 120 455 1920",
    mapQuery: "Sector+104+Noida",
    image: "/bakery-storefront-exterior.jpg",
    tags: ["Boutique Patisserie", "Specialty Coffee", "Curated Hampers"],
    highlights: "Chic expressway patisserie serving artisanal viennoiserie, New York cheesecake slices, and fresh morning sourdough loaves.",
  },
  {
    id: "sec62",
    name: "Express Bakehouse & Hub",
    sector: "Sector 62, Noida",
    address: "Tower B Ground Plaza, Candor TechSpace, Sector 62, Noida, UP 201309",
    hours: "8:30 AM – 9:30 PM (Mon–Sat)",
    phone: "+91 120 411 6200",
    mapQuery: "Sector+62+Noida+Candor+TechSpace",
    image: "/bakery-showcase-display-case.jpg",
    tags: ["Express Pickup", "Corporate Orders", "Hot Savories"],
    highlights: "Perfect for quick breakfast croissants, lunchtime mushroom & paneer patties, and corporate celebration cakes.",
  },
]

export function OutletsSection() {
  return (
    <section id="outlets" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="accent" className="mb-3 px-3 py-1">
            Store Locator & Pickups
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Visit Our Noida Outlets & Cafes
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Experience the aroma of freshly baked sourdough, warm flaky croissants, and decadent pastries. Dine in or order ahead for zero-wait store pickup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {OUTLETS.map((outlet) => (
            <Card
              key={outlet.id}
              className="overflow-hidden border border-border hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={outlet.image}
                    alt={outlet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="backdrop-blur-md bg-white/90 text-primary font-bold shadow-xs">
                      {outlet.sector}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                      {outlet.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {outlet.highlights}
                    </p>
                  </div>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {outlet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs pt-2 border-t border-border/60">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{outlet.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-accent shrink-0" />
                      <span>{outlet.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4 text-accent shrink-0" />
                      <a href={`tel:${outlet.phone}`} className="hover:text-primary font-medium">
                        {outlet.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </div>

              {/* Bottom buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                <a
                  href={`https://maps.google.com/?q=${outlet.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-semibold border-border hover:bg-muted"
                  >
                    <Navigation className="h-3.5 w-3.5 mr-1 text-accent" />
                    Get Directions
                  </Button>
                </a>
                <a href={`tel:${outlet.phone}`} className="w-full">
                  <Button
                    size="sm"
                    className="w-full text-xs font-semibold bg-primary hover:bg-primary/90 text-white"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                    Store Pickup
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
