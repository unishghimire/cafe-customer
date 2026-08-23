"use client";

import React from "react";
import Link from "next/link";
import { CAFE_CONFIG } from "@/data/cafeConfig";
import {
  Coffee,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  QrCode,
  LayoutGrid,
  Star,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950 py-20 px-4 sm:px-6 lg:px-8">
      {/* Cinematic Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />
        {/* Multi-layered dark and amber vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/85 to-stone-950/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/40 to-stone-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-stone-900/90 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 shadow-xl backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Specialty Roasters & Contemporary Dining • Jhamsikhel, Lalitpur</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-stone-100 leading-[1.1]">
            Artisanal Himalayan Roasts &amp;{" "}
            <span className="gold-gradient-text">Refined Gastronomy</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            Experience shade-grown Nuwakot Arabica, slow 18-hour cascara cold brews, rustic
            fermented sourdoughs, and decadent Caramel Custard in a serene Kathmandu valley sanctuary.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/menu"
            className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-extrabold px-7 py-3.5 rounded-2xl text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-amber-900/40 hover:scale-105 transition-all"
          >
            <Coffee className="w-5 h-5 text-stone-950" />
            <span>Order from Digital Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/tables"
            className="bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-amber-500/50 font-bold px-6 py-3.5 rounded-2xl text-sm sm:text-base flex items-center gap-2 backdrop-blur-md transition-all shadow-lg"
          >
            <LayoutGrid className="w-4 h-4 text-amber-400" />
            <span>Reserve Table &amp; Seats</span>
          </Link>
        </motion.div>

        {/* Operating Hours & Trust Pill Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
        >
          <div className="bg-stone-900/70 border border-stone-800/80 p-3 rounded-2xl backdrop-blur-md text-left">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Hours Today</span>
            </div>
            <p className="text-xs text-stone-200 font-bold">7:00 AM – 10:00 PM</p>
          </div>

          <div className="bg-stone-900/70 border border-stone-800/80 p-3 rounded-2xl backdrop-blur-md text-left">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location</span>
            </div>
            <p className="text-xs text-stone-200 font-bold">Jhamsikhel, Lalitpur</p>
          </div>

          <div className="bg-stone-900/70 border border-stone-800/80 p-3 rounded-2xl backdrop-blur-md text-left">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Customer Rating</span>
            </div>
            <p className="text-xs text-stone-200 font-bold">4.95 ★ (480+ Reviews)</p>
          </div>

          <div className="bg-stone-900/70 border border-stone-800/80 p-3 rounded-2xl backdrop-blur-md text-left">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-0.5">
              <Award className="w-3.5 h-3.5" />
              <span>Roast Altitude</span>
            </div>
            <p className="text-xs text-stone-200 font-bold">1,850m Shade Grown</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
