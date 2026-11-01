import { Facebook, Instagram, Twitter, Phone, MapPin, Mail, Cake } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-14 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary font-bold shadow-md">
                <Cake className="h-5 w-5" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">
                Sweet Spot Artisan Bakery
              </span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md text-xs sm:text-sm">
              Handcrafting Noida's favorite artisan cakes, slow-fermented sourdough, fresh flaky patties, and bespoke designer cakes since 1998. Dedicated to 100% pure dairy butter and timeless European-Indian baking excellence.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-base mb-4 text-accent">
              Explore Collections
            </h3>
            <ul className="space-y-2.5 text-primary-foreground/80 text-xs sm:text-sm">
              <li>
                <a href="/#menu" className="hover:text-accent transition-colors">
                  Cakes & Cheesecakes
                </a>
              </li>
              <li>
                <a href="/#menu" className="hover:text-accent transition-colors">
                  Hot Savory Puff Patties
                </a>
              </li>
              <li>
                <a href="/#menu" className="hover:text-accent transition-colors">
                  Artisanal Sourdough & Breads
                </a>
              </li>
              <li>
                <a href="/#custom-cakes" className="hover:text-accent transition-colors">
                  Custom Designer Cakes
                </a>
              </li>
              <li>
                <a href="/#outlets" className="hover:text-accent transition-colors">
                  Our Noida Outlets
                </a>
              </li>
              <li>
                <a href="/#reviews" className="hover:text-accent transition-colors">
                  Our Craft & Reviews
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-base mb-4 text-accent">
              Store & Support
            </h3>
            <ul className="space-y-2.5 text-primary-foreground/80 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Sector 18 Market & Sector 104, Noida, UP 201301</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href="tel:+919811024820" className="hover:text-accent">
                  +91 98110 24820
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <span>sweetspot.noida@gmail.com</span>
              </li>
              <li className="text-[11px] text-primary-foreground/60 pt-2 border-t border-primary-foreground/15">
                Delivering to all Noida, Greater Noida, and East Delhi sectors daily.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-primary-foreground/70 gap-3">
          <p>© {new Date().getFullYear()} Sweet Spot Artisan Bakery. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-accent font-medium">100% Pure Butter Guaranteed</span>
            <span>•</span>
            <span>FSSAI Certified Bakery</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
