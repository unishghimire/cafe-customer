"use client";

import React, { useState } from "react";
import { MenuItem } from "@/types/cafe";
import { useCafe } from "@/context/CafeContext";
import { MenuCard } from "@/components/menu/MenuCard";
import { MenuModal } from "@/components/menu/MenuModal";
import Link from "next/link";
import { Sparkles, ArrowRight, Coffee } from "lucide-react";

export const FeaturedMenu: React.FC = () => {
  const { menuItems } = useCafe();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Curate 6 signature highlights
  const featured = menuItems
    .filter((m) => m.available && (m.isChefSpecial || m.isPopular))
    .slice(0, 6);

  const handleCustomize = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <section className="py-24 bg-stone-900/50 border-t border-amber-900/20 text-stone-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Barista &amp; Chef Recommendations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-100">
              Signature <span className="gold-gradient-text">Highlights</span>
            </h2>
            <p className="text-sm text-stone-400 max-w-xl">
              Hand-picked favorites crafted with precision — from single-origin filter roasts to
              artisan Tomato Concasse and gold-leaf Caramel Custard.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-900/30 shrink-0"
          >
            <span>View All 20+ Creations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} onCustomize={handleCustomize} />
          ))}
        </div>
      </div>

      {/* Item Customizer Modal */}
      <MenuModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
