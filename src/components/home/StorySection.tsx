"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Flame, HeartHandshake, Leaf, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const StorySection: React.FC = () => {
  return (
    <section className="py-24 bg-stone-950 text-stone-100 relative overflow-hidden border-t border-amber-900/20">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section 1: The Coffee Craft */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-400">
              <Coffee className="w-3.5 h-3.5" />
              <span>Himalayan Single-Origin Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 leading-tight">
              Shade-Grown Arabica Roasted at{" "}
              <span className="gold-gradient-text">1,850m Altitude</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Nestled at the crossroads of cultural heritage and modern gastronomy in Jhamsikhel,
              AURA sources high-elevation Bourbon and Typica beans exclusively from micro-lots in
              Nuwakot and Ilam. Each batch is precision drum-roasted in-house to unlock notes of wild
              Himalayan honey, citrus blossom, and roasted hazelnuts.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-stone-100">Small-Batch Roasting</h4>
                <p className="text-xs text-stone-400 mt-1">
                  Custom roast curves tuned for optimal extraction and clarity.
                </p>
              </div>

              <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                  <Leaf className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-stone-100">100% Organic &amp; Fair</h4>
                <p className="text-xs text-stone-400 mt-1">
                  Direct trade empowering Nepali farming communities.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[420px] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop"
                alt="Barista brewing single origin coffee"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-950/85 border border-stone-800 backdrop-blur-md">
                <p className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
                  Signature Kyoto Drip &amp; Pour Over
                </p>
                <p className="text-xs text-stone-300 mt-1">
                  Extraction calibrated with filtered mountain spring water.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 2: Culinary Expertise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[420px] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop"
                alt="Artisan Tomato Concasse Soup and culinary spread"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-950/85 border border-stone-800 backdrop-blur-md">
                <p className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
                  Gourmet Kitchen Creations
                </p>
                <p className="text-xs text-stone-300 mt-1">
                  Tomato Concasse with Basil Brioche, Caramel Custard &amp; Wild Truffle Risotto.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contemporary Kitchen Craft</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 leading-tight">
              Culinary Artistry Meets{" "}
              <span className="gold-gradient-text">Wholesome Simplicity</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Our kitchen celebrates slow-cooked ingredients and seasonal produce. From our signature
              vine-ripened **Tomato Concasse** infused with garlic olive oil to decadent Parisian
              **Caramel Custard** crowned with 24k edible gold leaf, every plate is designed to
              delight all senses.
            </p>

            <div className="pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 bg-stone-900 border border-amber-500/40 px-5 py-3 rounded-xl transition-all shadow-md group"
              >
                <span>Explore Full Gourmet Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
