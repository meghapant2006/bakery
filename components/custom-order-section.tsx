"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cake, Heart, Phone } from "lucide-react"

export function CustomOrderSection() {
  return (
    <section id="custom-orders" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-10 right-10 opacity-10">
        <div className="w-32 h-32 bg-accent/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 left-10 opacity-10">
        <div className="w-24 h-24 bg-primary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Custom Orders
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Make your special moments even more memorable with our custom cakes and baked goods
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/funfetti-birthday-cake-with-colorful-sprinkles.jpg"
                  alt="Custom birthday cake"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Cake className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Birthday Cakes</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Celebrate with a personalized birthday cake designed just for you. Choose your favorite flavors, 
                  themes, and decorations to make the day extra special.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>&#8226; Custom designs and themes</li>
                  <li>&#8226; Choice of flavors and fillings</li>
                  <li>&#8226; Photo cakes available</li>
                  <li>&#8226; Starting from ₹1,500</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/custom-wedding-cake-elegant.jpg"
                  alt="Elegant wedding cake"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Wedding Cakes</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your dream wedding cake, crafted to perfection. We work with you to create a stunning centerpiece 
                  that matches your wedding theme and tastes amazing.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>&#8226; Multi-tier designs</li>
                  <li>&#8226; Elegant decorations</li>
                  <li>&#8226; Flavor tasting sessions</li>
                  <li>&#8226; Consultation available</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Order Something Special?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We recommend placing custom orders at least 48 hours in advance. Our team will work with you to 
                bring your vision to life with the finest ingredients and expert craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us: +91 98765-43210
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  View Menu
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
