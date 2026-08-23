"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Coffee, QrCode, LayoutGrid, Quote } from "lucide-react";
import { motion } from "framer-motion";

export const AmbianceSection: React.FC = () => {
  const testimonials = [
    {
      name: "Siddhartha R.",
      role: "Architect & Jhamsikhel Resident",
      quote:
        "The single-origin pour over is without doubt the cleanest extraction in the Kathmandu valley. The table QR ordering is seamless and futuristic.",
      rating: 5,
    },
    {
      name: "Clara Vance",
      role: "Travel Journalist",
      quote:
        "Their Tomato Concasse and classic Caramel Custard are world-class. Beautiful sunlit garden veranda with high-speed WiFi for remote work.",
      rating: 5,
    },
    {
      name: "Dr. Prabal Shrestha",
      role: "Specialty Coffee Enthusiast",
      quote:
        "The live floor plan reservation system made reserving the private Himalayan lounge for our dinner party effortless.",
      rating: 5,
    },
  ];

  const galleryImages = [
    {
      title: "Barista Counter & Slow Bar",
      subtitle: "Custom La Marzocco & Pour Over Station",
      src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Veranda Garden Seating",
      subtitle: "Al fresco dining under Himalayan canopies",
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Artisanal Kitchen Plating",
      subtitle: "Fresh organic herbs & slow cooked reductions",
      src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Himalayan VIP Lounge",
      subtitle: "Cozy leather booths for gatherings & meetings",
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 bg-stone-950 text-stone-100 border-t border-amber-900/20 px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            Atmosphere &amp; Space
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100">
            A Sanctuary in the <span className="gold-gradient-text">Heart of Lalitpur</span>
          </h2>
          <p className="text-sm text-stone-400">
            Designed for mindful coffee appreciation, creative focus, and intimate culinary gatherings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="group relative h-80 rounded-3xl overflow-hidden border border-stone-800 shadow-xl"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800">
                <h4 className="font-bold text-sm text-stone-100">{img.title}</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">{img.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
            Praise from Our Guests
          </h3>
          <p className="text-xs text-stone-400">Read what local connoisseurs and travelers say</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-stone-900/60 border border-stone-800 p-6 rounded-3xl space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-amber-500/40" />
                <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-sm text-stone-100">{t.name}</h5>
                  <p className="text-[11px] text-amber-400/90">{t.role}</p>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
