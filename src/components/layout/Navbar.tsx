"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCafe } from "@/context/CafeContext";
import {
  Coffee,
  ShoppingBag,
  Sparkles,
  MapPin,
  X,
  Menu as MenuIcon,
  QrCode,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    currencyMode,
    setCurrencyMode,
    cartCount,
    cartGrandTotal,
    formatPrice,
    setIsCartOpen,
    selectedTableNumber,
    setSelectedTableNumber,
  } = useCafe();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const customerNavLinks = [
    { href: "/", label: "Home", icon: Sparkles },
    { href: "/menu", label: "Digital Menu", icon: Coffee },
    { href: "/tables", label: "Table Reservations", icon: Coffee },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-stone-950/85 border-b border-amber-900/20">
      {/* Top micro announcement banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-200/90 text-xs py-1 px-4 text-center flex items-center justify-between border-b border-amber-900/30">
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Jhamsikhel, Lalitpur • Open Daily 7:00 AM – 10:00 PM</span>
        </div>
        <div className="mx-auto sm:mx-0 flex items-center gap-3 text-[11px]">
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-medium border border-amber-500/30">
            Himalayan Altitude Roast
          </span>
          <span className="hidden md:inline text-stone-400">|</span>
          <span className="hidden md:inline text-stone-300">Scan Table QR to Order Fresh</span>
        </div>
        <div className="hidden lg:flex items-center gap-3 text-[11px]">
          <button
            onClick={() => setCurrencyMode(currencyMode === "NPR" ? "USD" : "NPR")}
            className="hover:text-amber-100 transition-colors font-semibold"
          >
            Currency: <span className="text-amber-400">{currencyMode}</span> (Toggle)
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <Coffee className="w-6 h-6 text-amber-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-xl text-stone-100 group-hover:text-amber-400 transition-colors">
                  AURA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Roastery
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium">Jhamsikhel • Lalitpur</p>
            </div>
          </Link>

          {/* Desktop Customer Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            {customerNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm"
                      : "text-stone-300 hover:text-stone-100 hover:bg-stone-900/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-stone-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Hub */}
          <div className="flex items-center gap-3">
            {/* Table Badge if assigned */}
            {selectedTableNumber && (
              <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold">Table {selectedTableNumber}</span>
                <button
                  onClick={() => setSelectedTableNumber(null)}
                  title="Clear Table session"
                  className="hover:text-rose-400 ml-1 text-stone-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Cart Trigger Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-amber-900/30 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-stone-950 text-amber-400 text-xs px-2 py-0.5 rounded-full font-extrabold border border-amber-500/40">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white rounded-xl hover:bg-stone-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-950 border-b border-stone-800 px-4 py-4 space-y-2"
          >
            {customerNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-stone-300 hover:bg-stone-900"
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
