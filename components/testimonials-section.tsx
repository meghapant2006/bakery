"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShieldCheck, Heart, Sparkles, CheckCircle, Quote } from "lucide-react"

const COMMITMENTS = [
  {
    icon: Sparkles,
    title: "100% Real Dairy Butter",
    description: "We use only pure cream dairy butter. Zero vanaspati, zero margarine, and zero cheap palm oils in any recipe.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Eggless Kitchen",
    description: "Strict kitchen segregation for pure vegetarian baking. Over 80% of our iconic menu is proudly eggless.",
  },
  {
    icon: Heart,
    title: "24-Hour Sourdough Ferment",
    description: "Our artisan loaves use wild sourdough cultures fermented for 24 hours for exceptional flavor and gut-friendly digestion.",
  },
  {
    icon: CheckCircle,
    title: "5:00 AM Fresh Daily Bakes",
    description: "Every single morning our bakers start before dawn. What you enjoy was pulled from our stone ovens today.",
  },
]

const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    location: "Sector 18, Noida",
    rating: 5,
    date: "2 days ago",
    cake: "Lotus Biscoff Cheesecake & Patties",
    review:
      "Reminds me so much of Defence Bakery! The mushroom patties are hot, flaky, and packed with flavor, and the Biscoff cheesecake was the star of my anniversary dinner. Hands down the finest bakery in Noida.",
  },
  {
    id: 2,
    name: "Rohit Malhotra",
    location: "Sector 104, Noida",
    rating: 5,
    date: "1 week ago",
    cake: "Custom 2-Tier Birthday Cake",
    review:
      "Ordered a custom 2-tier Belgian Truffle cake for my daughter's 5th birthday. The design was identical to the reference image I sent on WhatsApp, and the sponge was wonderfully moist and 100% eggless. Outstanding work!",
  },
  {
    id: 3,
    name: "Simran Kaur",
    location: "Sector 62, Noida",
    rating: 5,
    date: "3 weeks ago",
    cake: "Sourdough Boule & Nan Khatai",
    review:
      "The crust on the sourdough loaf is world-class. Also bought their desi ghee Nan Khatai jar for tea time — melts right in your mouth. Best bakery experience in Delhi NCR.",
  },
]

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 bg-muted/40 relative">
      <div className="container mx-auto px-4">
        {/* Quality Commitments */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="accent" className="mb-3 px-3 py-1">
              Our Baking Manifesto
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              Crafted Without Compromise
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              The four pillars of artisan baking that have made us Noida's most trusted bakery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {COMMITMENTS.map((com, idx) => {
              const Icon = com.icon
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-2xl p-6 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-foreground mb-2">
                    {com.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {com.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">
                Verified Customer Reviews
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Loved by Over 50,000 Noida Food Lovers
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-card p-3 rounded-2xl border border-border shadow-2xs shrink-0">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="text-xs">
                <span className="font-bold text-foreground">4.9 / 5.0</span>
                <span className="text-muted-foreground"> (2,850+ Google Reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.id}
                className="border border-border bg-card shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{t.date}</span>
                  </div>

                  <p className="text-xs text-foreground/90 italic leading-relaxed">
                    "{t.review}"
                  </p>

                  <div className="pt-3 border-t border-border/60">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-foreground">{t.name}</h4>
                        <p className="text-[10px] text-muted-foreground">{t.location}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] bg-muted/40">
                        {t.cake}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
