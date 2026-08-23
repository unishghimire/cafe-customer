"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCafe } from "@/context/CafeContext";
import { MOCK_MENU } from "@/data/mockMenu";
import { MenuCategory, MenuItem } from "@/types/cafe";
import { MenuCard } from "@/components/menu/MenuCard";
import { MenuFilter } from "@/components/menu/MenuFilter";
import { MenuModal } from "@/components/menu/MenuModal";
import { QRScannerGate } from "@/components/security/QRScannerGate";
import {
  Coffee,
  QrCode,
  ShoppingBag,
  Sparkles,
  Search,
  CheckCircle2,
  X,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function MenuContent() {
  const searchParams = useSearchParams();
  const tableParam = searchParams.get("table");

  const {
    userRole,
    selectedTableNumber,
    setSelectedTableNumber,
    menuItems,
    cartCount,
    cartGrandTotal,
    formatPrice,
    setIsCartOpen,
    addToast,
  } = useCafe();

  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [chefSpecialOnly, setChefSpecialOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);

  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync table param if present in URL
  useEffect(() => {
    if (tableParam) {
      const num = Number(tableParam);
      if (!isNaN(num) && num > 0) {
        setSelectedTableNumber(num);
      }
    }
  }, [tableParam, setSelectedTableNumber]);

  // Security Gate: Customer must scan table QR to view menu
  const hasActiveTable = Boolean(selectedTableNumber || tableParam);
  if (!hasActiveTable && userRole === "customer") {
    return <QRScannerGate />;
  }

  const handleCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setIsModalOpen(true);
  };

  // Filter Menu Items from dynamic state
  const filteredItems = menuItems.filter((item) => {
    // Hide 86'd items for customers unless they are in staff/owner view
    if (!item.available && userRole === "customer") return false;
    // Category match
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchNepali = item.nepaliName?.toLowerCase().includes(q) || false;
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchName && !matchNepali && !matchDesc) return false;
    }
    // Dietary flags
    if (vegOnly && !item.isVeg) return false;
    if (chefSpecialOnly && !item.isChefSpecial) return false;
    if (glutenFreeOnly && !item.isGlutenFree) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30">
                Contactless Digital Ordering
              </span>
              <span className="text-xs text-stone-400">Jhamsikhel Kitchen</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100">
              Interactive <span className="gold-gradient-text">Digital Menu</span>
            </h1>
          </div>

          {/* Table Indicator Banner */}
          {selectedTableNumber ? (
            <div className="bg-gradient-to-r from-emerald-950/80 to-stone-900 border border-emerald-500/40 p-3 rounded-2xl flex items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <span>Table {selectedTableNumber} Active</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-stone-400">Orders automatically route here</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTableNumber(null);
                  addToast({
                    title: "Table Session Ended",
                    message: "Scan a table QR to reopen menu.",
                    type: "info",
                  });
                }}
                className="text-stone-400 hover:text-stone-200 text-xs px-2 py-1 rounded bg-stone-900 border border-stone-800"
              >
                Scan Another
              </button>
            </div>
          ) : (
            <div className="bg-indigo-950/60 border border-indigo-500/40 p-3 rounded-2xl flex items-center gap-3 text-xs text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Staff Preview Mode Active</span>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        <MenuFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          vegOnly={vegOnly}
          onToggleVegOnly={() => setVegOnly(!vegOnly)}
          chefSpecialOnly={chefSpecialOnly}
          onToggleChefSpecial={() => setChefSpecialOnly(!chefSpecialOnly)}
          glutenFreeOnly={glutenFreeOnly}
          onToggleGlutenFree={() => setGlutenFreeOnly(!glutenFreeOnly)}
        />

        {/* Items Count & Status */}
        <div className="flex items-center justify-between text-xs text-stone-400 px-1">
          <span>
            Showing <strong className="text-stone-200">{filteredItems.length}</strong> culinary
            items
          </span>
          {(searchQuery || vegOnly || chefSpecialOnly || glutenFreeOnly) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setVegOnly(false);
                setChefSpecialOnly(false);
                setGlutenFreeOnly(false);
                setActiveCategory("all");
              }}
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-stone-900/30 rounded-3xl border border-stone-800/60 p-8">
            <Search className="w-10 h-10 text-stone-500 mx-auto" />
            <h3 className="text-lg font-bold text-stone-300">No matching dishes found</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Try adjusting your search query or removing dietary restrictions to see all available
              items.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setVegOnly(false);
                setChefSpecialOnly(false);
                setGlutenFreeOnly(false);
                setActiveCategory("all");
              }}
              className="bg-stone-900 hover:bg-stone-800 text-amber-400 border border-amber-500/30 font-semibold text-xs px-4 py-2 rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} onCustomize={handleCustomize} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Floating Quick Checkout Bar when cart has items */}
        {cartCount > 0 && (
          <div className="sticky bottom-6 z-30 max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-950/95 border-2 border-amber-500/50 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-extrabold text-sm shadow-md">
                  {cartCount}
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-100">
                    {cartCount} {cartCount === 1 ? "Item" : "Items"} in Table Cart
                  </p>
                  <p className="text-[11px] text-amber-400 font-semibold">
                    {formatPrice(cartGrandTotal)}
                    {selectedTableNumber ? ` • Table ${selectedTableNumber}` : ""}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart &amp; Order</span>
              </button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Item Customizer Modal */}
      <MenuModal
        item={customizingItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-400">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
            <span className="text-sm font-semibold">Loading AURA Digital Menu...</span>
          </div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
