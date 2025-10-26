import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-10 right-10 opacity-10">
        <div className="w-32 h-32 bg-accent/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 left-10 opacity-10">
        <div className="w-24 h-24 bg-primary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-balance">
            Visit Our Bakery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Come experience the warmth of our bakery and taste the difference that artisan craftsmanship makes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="relative group">
            <img
              src="/bakery-storefront-exterior.jpg"
              alt="Bakery exterior"
              className="w-full h-32 object-cover rounded-lg shadow-md hover-lift group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative group">
            <img
              src="/morning-coffee-pastry-setup.jpg"
              alt="Morning coffee setup"
              className="w-full h-32 object-cover rounded-lg shadow-md hover-lift group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative group">
            <div className="w-full h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-md hover-lift group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-1">🪑</div>
                <div className="text-xs font-semibold text-gray-700">Cozy Seating</div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="w-full h-32 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg shadow-md hover-lift group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-1">🥐</div>
                <div className="text-xs font-semibold text-gray-700">Fresh Display</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 hover-lift">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif font-bold text-foreground mb-2">Location</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Mayur Vihar, Phase-3
                      <br />
                      New Delhi
                      <br />
                      Noida City, 201309
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif font-bold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm">
                      +91 98765-43210
                      <br />
                      +91 98765-43211
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif font-bold text-foreground mb-2">Hours</h3>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <p>Mon-Fri: 6:00 AM - 7:00 PM</p>
                      <p>Saturday: 7:00 AM - 8:00 PM</p>
                      <p>Sunday: 8:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif font-bold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      sweetspot05@gmail.com
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 bg-muted/50 hover-lift">
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">Ready to place an order?</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Whether you're looking for daily fresh items or planning something special, we're here to help make your
                occasion memorable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90">Call to Order</Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Email Us
                </Button>
              </div>
            </Card>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/cozy-bakery-storefront-with-warm-lighting-and-disp.jpg"
                alt="The Sweet Spot bakery storefront"
                className="w-full h-full object-cover hover-lift"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <Card className="bg-background/95 backdrop-blur-sm p-4">
                <p className="text-sm text-muted-foreground text-center">
                  <strong className="text-foreground">Free parking available</strong> behind the building. Look for our
                  signature brown awning!
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
