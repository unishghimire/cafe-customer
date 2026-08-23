"use client";

import React from "react";
import { MenuItem } from "@/types/cafe";
import { useCafe } from "@/context/CafeContext";
import { Plus, Star, Clock, Sparkles, SlidersHorizontal, Leaf } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface MenuCardProps {
  item: MenuItem;
  onCustomize: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onCustomize }) => {
  const { addToCart, formatPrice } = useCafe();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.customOptions && item.customOptions.length > 0) {
      onCustomize(item);
    } else {
      addToCart(item, 1, []);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onCustomize(item)}
      className="group relative bg-stone-900/70 border border-stone-800/90 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-950/20 transition-all cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image Section */}
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-stone-950">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {item.isChefSpecial && (
              <span className="flex items-center gap-1 bg-amber-500/90 text-stone-950 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md backdrop-blur-sm">
                <Sparkles className="w-3 h-3" /> Signature
              </span>
            )}
            {item.isPopular && !item.isChefSpecial && (
              <span className="bg-rose-600/90 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                Popular
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 z-10">
            {item.isVeg ? (
              <span
                title="Vegetarian"
                className="w-6 h-6 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 flex items-center justify-center backdrop-blur-sm"
              >
                <Leaf className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span
                title="Non-Vegetarian"
                className="w-6 h-6 rounded-full bg-rose-950/80 border border-rose-500/60 text-rose-400 flex items-center justify-center backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-rose-400" />
              </span>
            )}
          </div>

          {/* Bottom rating & time pill */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-stone-300 font-medium">
            <div className="flex items-center gap-1 bg-stone-950/80 px-2 py-0.5 rounded-md backdrop-blur-sm border border-stone-800">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-stone-100 font-semibold">{item.rating}</span>
            </div>
            <div className="flex items-center gap-1 bg-stone-950/80 px-2 py-0.5 rounded-md backdrop-blur-sm border border-stone-800 text-[11px] text-stone-300">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{item.preparationTimeMinutes}m</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2">
          <div>
            <h3 className="font-bold text-base text-stone-100 group-hover:text-amber-400 transition-colors leading-snug line-clamp-1">
              {item.name}
            </h3>
            {item.nepaliName && (
              <p className="text-[11px] text-amber-400/80 font-medium line-clamp-1">
                {item.nepaliName}
              </p>
            )}
          </div>

          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-stone-800/60 mt-2">
        <div>
          <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-semibold">
            Price
          </span>
          <span className="text-base font-extrabold text-amber-400">
            {formatPrice(item.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {item.customOptions && item.customOptions.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCustomize(item);
              }}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors"
              title="Customize Options"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 px-3 py-2 rounded-xl font-bold text-xs shadow-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
