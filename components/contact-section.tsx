import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-10 right-10 opacity-10">
        <div className="w-32 h-32 bg-accent/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 left-10 opacity-10">
        <div className="w-24 h-24 bg-primary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Visit Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Come experience the warmth of our bakery and taste the difference that artisan craftsmanship makes
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mayur Vihar, Phase-3<br />
                    New Delhi<br />
                    Noida City, 201309
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +91 98765-43210<br />
                    +91 98765-43211
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Hours</h3>
                  <p className="text-sm text-muted-foreground space-y-1">
                    Mon-Fri: 6 AM - 7 PM<br />
                    Sat: 7 AM - 8 PM<br />
                    Sun: 8 AM - 6 PM
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground break-words">
                    sweetspot05@gmail.com
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src="/cozy-bakery-storefront-with-warm-lighting-and-disp.jpg"
                  alt="Bakery storefront"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">Our Store</h3>
                <p className="text-sm text-muted-foreground">
                  Look for our signature brown awning. Free parking available!
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-primary/5 border-primary/20 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-6 text-center leading-relaxed">
                Have questions or want to place an order? We would love to hear from you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}