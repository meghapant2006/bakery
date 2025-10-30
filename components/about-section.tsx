import { Card } from "@/components/ui/card"
import { Heart, Award, Clock } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/artisan-baker-kneading-dough.jpg"
                  alt="Our bakery team at work"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full -z-10"></div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  About Us
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Welcome to the best bakery shop in Noida! Since our opening, we've been dedicated to bringing you the 
                  finest freshly baked goods made with love and care every single morning.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our commitment to quality starts with sourcing the freshest ingredients from trusted local suppliers. 
                  Every cake, bread, and pastry is crafted by our skilled bakers using traditional techniques combined 
                  with innovative flavors that keep our customers coming back for more.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">Made with Love</h3>
                  <p className="text-sm text-muted-foreground">Every item crafted with care</p>
                </Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">Fresh Ingredients</h3>
                  <p className="text-sm text-muted-foreground">Quality you can taste</p>
                </Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">Daily Baked</h3>
                  <p className="text-sm text-muted-foreground">Fresh every morning</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
