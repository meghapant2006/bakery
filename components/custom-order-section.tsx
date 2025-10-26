"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, Cake } from "lucide-react"

export function CustomOrderSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderType: "",
    servings: "",
    date: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Custom order submitted:", formData)
    // Handle form submission
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="custom-orders" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img src="/bakery-team-working.jpg" alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            Custom Creations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Let us create something special for your celebration. From wedding cakes to corporate events, we bring your
            vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="relative group">
            <img
              src="/custom-wedding-cake-elegant.jpg"
              alt="Elegant wedding cake"
              className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">Wedding Cakes</h3>
              <p className="text-sm opacity-90">Elegant & Memorable</p>
            </div>
          </div>
          <div className="relative group">
            <img
              src="/birthday-celebration-cake-colorful.jpg"
              alt="Colorful birthday cake"
              className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">Birthday Cakes</h3>
              <p className="text-sm opacity-90">Fun & Festive</p>
            </div>
          </div>
          <div className="relative group">
            <img
              src="/corporate-dessert-platter.jpg"
              alt="Corporate dessert platter"
              className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">Corporate Orders</h3>
              <p className="text-sm opacity-90">Professional & Delicious</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6 hover-lift">
                <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-serif font-bold text-foreground mb-2">Special Events</h3>
                <p className="text-sm text-muted-foreground">Weddings, birthdays, anniversaries</p>
              </Card>
              <Card className="text-center p-6 hover-lift">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-serif font-bold text-foreground mb-2">Corporate Orders</h3>
                <p className="text-sm text-muted-foreground">Office parties, meetings, events</p>
              </Card>
              <Card className="text-center p-6 hover-lift">
                <Cake className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-serif font-bold text-foreground mb-2">Custom Designs</h3>
                <p className="text-sm text-muted-foreground">Unique themes and decorations</p>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-foreground">Why Choose Custom?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Personalized designs tailored to your event
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Premium ingredients and artisan craftsmanship
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Consultation to perfect every detail
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Flexible sizing and dietary accommodations
                </li>
              </ul>
            </div>
          </div>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Request a Custom Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="orderType">Order Type</Label>
                    <Select onValueChange={(value) => handleInputChange("orderType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select order type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding-cake">Wedding Cake</SelectItem>
                        <SelectItem value="birthday-cake">Birthday Cake</SelectItem>
                        <SelectItem value="corporate-order">Corporate Order</SelectItem>
                        <SelectItem value="special-event">Special Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="servings">Number of Servings</Label>
                    <Input
                      id="servings"
                      value={formData.servings}
                      onChange={(e) => handleInputChange("servings", e.target.value)}
                      placeholder="e.g., 50 people"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Event Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Order Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Please describe your vision, including flavors, design preferences, dietary restrictions, and any special requirements..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-3">
                  Submit Custom Order Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
