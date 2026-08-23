import { HeroSection } from "@/components/home/HeroSection";
import { StorySection } from "@/components/home/StorySection";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { AmbianceSection } from "@/components/home/AmbianceSection";
import Link from "next/link";
import { QrCode, LayoutGrid, Coffee, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "AURA Roastery & Kitchen | Jhamsikhel, Lalitpur",
  description:
    "Single-origin Himalayan roast coffee, artisanal sourdough breakfasts, gourmet Tomato Concasse, and live QR table ordering in Jhamsikhel, Lalitpur.",
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-stone-950">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Artisanal Coffee & Culinary Story */}
      <StorySection />

      {/* 3. Featured Signature Dishes & Brews */}
      <FeaturedMenu />

      {/* 4. Cafe Ambiance, Atmosphere & Testimonials */}
      <AmbianceSection />

      {/* 5. Bottom Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-t border-amber-900/30 text-stone-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs px-3.5 py-1 rounded-full border border-amber-500/40 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Dine In or Reserve Ahead</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100">
            Ready to Experience <span className="gold-gradient-text">AURA</span>?
          </h2>

          <p className="text-stone-300 text-sm max-w-xl mx-auto">
            Scan your table QR code for contactless dining, or reserve a secluded corner table in
            advance for your next meeting or date.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/menu"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black px-6 py-3.5 rounded-2xl text-sm flex items-center gap-2 shadow-xl shadow-amber-950/40 transition-transform hover:scale-105"
            >
              <Coffee className="w-4 h-4" />
              <span>Browse Full Digital Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tables"
              className="bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold px-6 py-3.5 rounded-2xl text-sm flex items-center gap-2 transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-amber-400" />
              <span>Reserve Table Seating</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
