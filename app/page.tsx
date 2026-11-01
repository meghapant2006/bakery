import { Header } from "@/components/header"
import { CartDrawer } from "@/components/cart-drawer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedSection } from "@/components/featured-section"
import { AboutSection } from "@/components/about-section"
import { MenuSection } from "@/components/menu-section"
import { CustomCakeBuilder } from "@/components/custom-cake-builder"
import { OutletsSection } from "@/components/outlets-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/30 selection:text-primary">
      <Header />
      <CartDrawer />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedSection />
        <MenuSection />
        <CustomCakeBuilder />
        <OutletsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
