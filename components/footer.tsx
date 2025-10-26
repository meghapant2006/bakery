import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-serif font-bold">The Sweet Spot</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Crafting artisan baked goods with passion and tradition since 2010. Every bite tells a story of quality
              ingredients and time-honored techniques.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#home" className="hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-accent transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#custom-orders" className="hover:text-accent transition-colors">
                  Custom Orders
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>123 Artisan Street</li>
              <li>Sweet City, SC 12345</li>
              <li>(555) 123-BAKE</li>
              <li>hello@thesweetspot.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 The Sweet Spot. All rights reserved. Made with ❤️ and flour.
          </p>
        </div>
      </div>
    </footer>
  )
}
