"use client";

import React, { useState } from "react";
import { MenuItem, SelectedCustomOption } from "@/types/cafe";
import { useCafe } from "@/context/CafeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Check,
  Star,
  Clock,
  Flame,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

interface MenuModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ item, isOpen, onClose }) => {
  const { addToCart, formatPrice } = useCafe();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedCustomOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Initialize default options when modal opens with an item
  React.useEffect(() => {
    if (item && item.customOptions) {
      const initial: SelectedCustomOption[] = [];
      item.customOptions.forEach((group) => {
        const defaultOpt = group.options.find((o) => o.default) || group.options[0];
        if (defaultOpt) {
          initial.push({
            groupId: group.id,
            groupName: group.name,
            optionId: defaultOpt.id,
            optionName: defaultOpt.name,
            price: defaultOpt.price,
          });
        }
      });
      setSelectedOptions(initial);
    } else {
      setSelectedOptions([]);
    }
    setQuantity(1);
    setSpecialInstructions("");
  }, [item, isOpen]);

  if (!item) return null;

  const handleOptionSelect = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    price: number
  ) => {
    setSelectedOptions((prev) => {
      const filtered = prev.filter((o) => o.groupId !== groupId);
      return [...filtered, { groupId, groupName, optionId, optionName, price }];
    });
  };

  const extraTotal = selectedOptions.reduce((acc, curr) => acc + curr.price, 0);
  const unitPrice = item.price + extraTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(item, quantity, selectedOptions, specialInstructions);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="relative w-full max-w-lg bg-stone-950 border border-amber-900/40 rounded-3xl overflow-hidden shadow-2xl z-10 text-stone-100 flex flex-col max-h-[90vh]"
          >
            {/* Header Image */}
            <div className="relative h-60 w-full bg-stone-900 shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/70 text-stone-300 hover:text-stone-100 border border-stone-800 backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {item.isVeg ? (
                      <span className="flex items-center gap-1 text-[11px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/60 backdrop-blur-sm">
                        <Leaf className="w-3 h-3" /> Veg
                      </span>
                    ) : (
                      <span className="text-[11px] bg-rose-950/80 text-rose-300 px-2 py-0.5 rounded-full border border-rose-700/60 backdrop-blur-sm">
                        Non-Veg
                      </span>
                    )}
                    {item.isChefSpecial && (
                      <span className="flex items-center gap-1 text-[11px] bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/50 backdrop-blur-sm font-semibold">
                        <Sparkles className="w-3 h-3" /> Chef's Signature
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-stone-100">{item.name}</h3>
                  {item.nepaliName && (
                    <p className="text-xs text-amber-400 font-medium">{item.nepaliName}</p>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-400">Base Price</span>
                  <p className="text-xl font-extrabold text-amber-400">{formatPrice(item.price)}</p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Meta Tags (Rating, Prep Time, Calories) */}
              <div className="flex items-center gap-4 text-xs text-stone-300 pb-3 border-b border-stone-900">
                <div className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating.toFixed(2)}</span>
                  <span className="text-stone-500">({item.reviewsCount})</span>
                </div>
                <div className="flex items-center gap-1 text-stone-400">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{item.preparationTimeMinutes} mins</span>
                </div>
                {item.calories && (
                  <div className="flex items-center gap-1 text-stone-400">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{item.calories} kcal</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-stone-300 leading-relaxed">{item.description}</p>

              {/* Custom Options (e.g. Milk, Sweetness, Roast) */}
              {item.customOptions && item.customOptions.length > 0 && (
                <div className="space-y-4 pt-2">
                  {item.customOptions.map((group) => {
                    const currentSelected = selectedOptions.find((o) => o.groupId === group.id);
                    return (
                      <div key={group.id} className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center justify-between">
                          <span>{group.name}</span>
                          <span className="text-[10px] text-amber-400 lowercase font-normal">
                            (select one)
                          </span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {group.options.map((opt) => {
                            const isChosen = currentSelected?.optionId === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() =>
                                  handleOptionSelect(
                                    group.id,
                                    group.name,
                                    opt.id,
                                    opt.name,
                                    opt.price
                                  )
                                }
                                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                                  isChosen
                                    ? "bg-amber-500/15 border-amber-500/60 text-amber-200"
                                    : "bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700"
                                }`}
                              >
                                <span>{opt.name}</span>
                                <div className="flex items-center gap-1.5 font-semibold text-stone-200">
                                  {opt.price > 0 && (
                                    <span className="text-amber-400">+{formatPrice(opt.price)}</span>
                                  )}
                                  {isChosen && <Check className="w-3.5 h-3.5 text-amber-400" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Special Instructions Note */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Special Notes for Chef / Barista
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Extra hot, allergies, no dressing on the side..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-xl p-3 text-xs text-stone-100 outline-none resize-none"
                />
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-5 border-t border-stone-800 bg-stone-950 flex items-center justify-between gap-4">
              {/* Quantity selector */}
              <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-stone-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                className="flex-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-extrabold py-3 px-5 rounded-xl text-sm flex items-center justify-between shadow-xl shadow-amber-900/30 transition-all"
              >
                <span>Add to Order</span>
                <span>{formatPrice(totalPrice)}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
