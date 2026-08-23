"use client";

import React from "react";
import { MenuCategory } from "@/types/cafe";
import {
  Coffee,
  CupSoda,
  Egg,
  UtensilsCrossed,
  Soup,
  CakeSlice,
  Search,
  X,
  Sparkles,
  Leaf,
  Check,
} from "lucide-react";

interface MenuFilterProps {
  activeCategory: MenuCategory;
  onSelectCategory: (cat: MenuCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  vegOnly: boolean;
  onToggleVegOnly: () => void;
  chefSpecialOnly: boolean;
  onToggleChefSpecial: () => void;
  glutenFreeOnly: boolean;
  onToggleGlutenFree: () => void;
}

export const MenuFilter: React.FC<MenuFilterProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  vegOnly,
  onToggleVegOnly,
  chefSpecialOnly,
  onToggleChefSpecial,
  glutenFreeOnly,
  onToggleGlutenFree,
}) => {
  const categories: { id: MenuCategory; label: string; icon: React.ElementType }[] = [
    { id: "all", label: "Full Menu", icon: Sparkles },
    { id: "hot_beverages", label: "Hot Brews & Espresso", icon: Coffee },
    { id: "cold_brews", label: "Cold Brews & Iced", icon: CupSoda },
    { id: "breakfast", label: "Breakfast & Sourdough", icon: Egg },
    { id: "soups_salads", label: "Soups & Salads", icon: Soup },
    { id: "main_course", label: "Main Courses", icon: UtensilsCrossed },
    { id: "desserts", label: "Decadent Desserts", icon: CakeSlice },
  ];

  return (
    <div className="space-y-4">
      {/* Search and Dietary Pills */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search Tomato Concasse, Caramel Custard, Cortado..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-stone-900/90 border border-stone-800 focus:border-amber-500 text-stone-100 text-sm rounded-xl pl-10 pr-10 py-2.5 outline-none transition-all placeholder:text-stone-500 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dietary toggles */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={onToggleVegOnly}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              vegOnly
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40"
                : "bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200"
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Veg Only</span>
            {vegOnly && <Check className="w-3 h-3 text-emerald-400 ml-0.5" />}
          </button>

          <button
            onClick={onToggleChefSpecial}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              chefSpecialOnly
                ? "bg-amber-950/80 border-amber-500 text-amber-300 shadow-md shadow-amber-950/40"
                : "bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef's Choice</span>
            {chefSpecialOnly && <Check className="w-3 h-3 text-amber-400 ml-0.5" />}
          </button>

          <button
            onClick={onToggleGlutenFree}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              glutenFreeOnly
                ? "bg-sky-950/80 border-sky-500 text-sky-300 shadow-md"
                : "bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200"
            }`}
          >
            <span>Gluten-Free</span>
            {glutenFreeOnly && <Check className="w-3 h-3 text-sky-400 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-400 shadow-lg shadow-amber-900/30 scale-[1.02]"
                  : "bg-stone-900/80 text-stone-300 border-stone-800 hover:border-stone-700 hover:bg-stone-800/80"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-stone-950" : "text-amber-400"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
