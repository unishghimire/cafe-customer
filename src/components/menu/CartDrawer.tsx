"use client";

import React, { useState } from "react";
import { useCafe } from "@/context/CafeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  QrCode,
  Sparkles,
  Receipt,
  Utensils,
  CreditCard,
  Banknote,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";
import Link from "next/link";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    cartServiceCharge,
    cartVat,
    cartGrandTotal,
    formatPrice,
    selectedTableNumber,
    setSelectedTableNumber,
    placeOrder,
    tables,
  } = useCafe();

  const [tableInput, setTableInput] = useState<number>(selectedTableNumber || 1);
  const [customerName, setCustomerName] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "Fonepay QR" | "Cash" | "Credit Card" | "Pay at Counter"
  >("Fonepay QR");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  // Sync state if selected table changes
  React.useEffect(() => {
    if (selectedTableNumber) {
      setTableInput(selectedTableNumber);
    }
  }, [selectedTableNumber]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#d97706", "#10b981", "#ffffff"],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      const order = placeOrder(
        tableInput,
        paymentMethod,
        orderNotes,
        customerName.trim() || `Guest (Table ${tableInput})`
      );
      setIsSubmitting(false);
      setCompletedOrderNumber(order.orderNumber);
    }, 600);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setCompletedOrderNumber(null);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-stone-950 border-l border-amber-900/40 shadow-2xl flex flex-col text-stone-100"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-stone-800 bg-stone-900/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-stone-100">Table Order Cart</h2>
                    <p className="text-xs text-stone-400">
                      {cartCount} {cartCount === 1 ? "item" : "items"} selected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && !completedOrderNumber && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-stone-400 hover:text-rose-400 transition-colors px-2 py-1 rounded-lg hover:bg-stone-800"
                      title="Clear Cart"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {completedOrderNumber ? (
                  // Success State
                  <div className="py-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-extrabold text-stone-100">Order Placed!</h3>
                    <p className="text-sm text-stone-300 font-mono text-amber-400 font-bold">
                      Order Reference: {completedOrderNumber}
                    </p>
                    <p className="text-xs text-stone-400 max-w-xs mx-auto">
                      Your order has been routed to the kitchen for Table {tableInput}. You can track
                      its preparation status live.
                    </p>

                    <div className="pt-4 flex flex-col gap-2.5 max-w-xs mx-auto">
                      <Link
                        href="/orders"
                        onClick={handleClose}
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Utensils className="w-4 h-4" />
                        <span>View Live Kitchen Queue</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={handleClose}
                        className="w-full bg-stone-900 hover:bg-stone-800 text-stone-300 py-2.5 px-4 rounded-xl text-sm font-medium border border-stone-800"
                      >
                        Return to Menu
                      </button>
                    </div>
                  </div>
                ) : cart.length === 0 ? (
                  // Empty State
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 text-stone-500 mx-auto flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-300">Your Cart is Empty</h3>
                    <p className="text-xs text-stone-400 max-w-xs mx-auto">
                      Explore our artisanal coffee roasts, sourdough spreads, and signature dishes.
                    </p>
                    <Link
                      href="/menu"
                      onClick={handleClose}
                      className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md"
                    >
                      Browse Digital Menu
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* Table Assignment Banner */}
                    <div className="bg-stone-900/90 border border-amber-900/40 p-3.5 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                          <QrCode className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ordering for Table:</span>
                        </label>
                        {selectedTableNumber && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                            QR Locked
                          </span>
                        )}
                      </div>

                      <select
                        value={tableInput}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setTableInput(val);
                          setSelectedTableNumber(val);
                        }}
                        className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-lg px-3 py-2 outline-none font-medium"
                      >
                        {tables.map((t) => (
                          <option key={t.id} value={t.tableNumber}>
                            Table {t.tableNumber} – {t.label} ({t.capacity} Seats)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Guest Name & Notes */}
                    <div className="grid grid-cols-1 gap-2.5">
                      <div>
                        <label className="block text-[11px] text-stone-400 font-medium mb-1">
                          Guest / Party Name (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Elena or Table Guest"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-stone-900/90 border border-stone-800 focus:border-amber-500 text-stone-100 text-xs rounded-lg px-3 py-2 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-400 font-medium mb-1">
                          Special Barista / Kitchen Instructions
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Less ice, extra hot, bring drinks first"
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          className="w-full bg-stone-900/90 border border-stone-800 focus:border-amber-500 text-stone-100 text-xs rounded-lg px-3 py-2 outline-none"
                        />
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                        Order Items
                      </h4>
                      {cart.map((cartItem) => (
                        <div
                          key={cartItem.cartItemId}
                          className="bg-stone-900/60 border border-stone-800/80 p-3 rounded-xl flex gap-3 items-start"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-800">
                            <Image
                              src={cartItem.item.image}
                              alt={cartItem.item.name}
                              fill
                              className="object-cover"
                              sizes="60px"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h5 className="font-semibold text-sm text-stone-100 truncate">
                                {cartItem.item.name}
                              </h5>
                              <button
                                onClick={() => removeFromCart(cartItem.cartItemId)}
                                className="text-stone-500 hover:text-rose-400 p-0.5 rounded transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Options summary */}
                            {cartItem.selectedOptions.length > 0 && (
                              <p className="text-[11px] text-amber-400/90 mt-0.5 truncate">
                                {cartItem.selectedOptions.map((o) => o.optionName).join(", ")}
                              </p>
                            )}

                            {cartItem.notes && (
                              <p className="text-[10px] text-stone-400 italic mt-0.5">
                                Note: {cartItem.notes}
                              </p>
                            )}

                            <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-800/50">
                              <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 rounded-lg p-0.5">
                                <button
                                  onClick={() =>
                                    updateCartQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                                  }
                                  className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold w-4 text-center">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateCartQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                                  }
                                  className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-bold text-xs text-stone-200">
                                {formatPrice(cartItem.totalPrice)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment Method Option */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                        Payment Preference
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "Fonepay QR", label: "Fonepay QR", icon: QrCode },
                          { id: "Credit Card", label: "Card POS", icon: CreditCard },
                          { id: "Cash", label: "Cash on Table", icon: Banknote },
                          { id: "Pay at Counter", label: "Pay at Counter", icon: Sparkles },
                        ].map((m) => {
                          const Icon = m.icon;
                          const isSelected = paymentMethod === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() =>
                                setPaymentMethod(
                                  m.id as "Fonepay QR" | "Cash" | "Credit Card" | "Pay at Counter"
                                )
                              }
                              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all ${
                                isSelected
                                  ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                                  : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{m.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bill Breakdown */}
                    <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between text-stone-400">
                        <span className="flex items-center gap-1.5">
                          <Receipt className="w-3.5 h-3.5 text-stone-500" />
                          <span>Subtotal</span>
                        </span>
                        <span className="font-medium text-stone-300">
                          {formatPrice(cartSubtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-stone-400">
                        <span>Service Charge (10%)</span>
                        <span>{formatPrice(cartServiceCharge)}</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-400">
                        <span>Government VAT (13%)</span>
                        <span>{formatPrice(cartVat)}</span>
                      </div>
                      <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-sm font-bold text-stone-100">
                        <span className="text-amber-400">Grand Total</span>
                        <span className="text-base font-extrabold text-amber-400">
                          {formatPrice(cartGrandTotal)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer Actions */}
              {cart.length > 0 && !completedOrderNumber && (
                <div className="p-5 border-t border-stone-800 bg-stone-950/90 space-y-3">
                  <button
                    disabled={isSubmitting}
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-extrabold py-3 px-4 rounded-xl text-sm transition-all shadow-xl shadow-amber-900/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin text-stone-950 font-bold">↻ Routing to Kitchen...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Send Order to Table {tableInput} • {formatPrice(cartGrandTotal)}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-stone-500 text-center">
                    Instant kitchen ticket transmission with live preparation tracker
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
