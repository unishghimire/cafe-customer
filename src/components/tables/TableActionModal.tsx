"use client";

import React, { useState } from "react";
import { TableItem, TableStatus } from "@/types/cafe";
import { useCafe } from "@/context/CafeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  Clock,
  Coffee,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  QrCode,
  Utensils,
  Phone,
  User,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TableActionModalProps {
  table: TableItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TableActionModal: React.FC<TableActionModalProps> = ({ table, isOpen, onClose }) => {
  const router = useRouter();
  const {
    userRole,
    updateTableStatus,
    assignGuestToTable,
    freeTable,
    reserveTable,
    setSelectedTableNumber,
    getActiveOrderByTable,
    formatPrice,
  } = useCafe();

  // Reservation form state
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resGuests, setResGuests] = useState(table ? table.capacity : 2);
  const [resDate, setResDate] = useState("Today");
  const [resTime, setResTime] = useState("2:00 PM");

  // Staff walk-in seating form state
  const [staffGuestName, setStaffGuestName] = useState("");
  const [staffGuestCount, setStaffGuestCount] = useState(table ? table.capacity : 2);

  React.useEffect(() => {
    if (table) {
      setResGuests(table.capacity);
      setStaffGuestCount(table.capacity);
      setStaffGuestName("");
      setResName("");
      setResPhone("");
    }
  }, [table, isOpen]);

  if (!table) return null;

  const activeOrder = getActiveOrderByTable(table.tableNumber);

  const handleStartOrdering = () => {
    setSelectedTableNumber(table.tableNumber);
    onClose();
    router.push(`/menu?table=${table.tableNumber}`);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || !resPhone.trim()) return;

    const success = reserveTable(table.tableNumber, {
      tableNumber: table.tableNumber,
      guestName: resName.trim(),
      guestPhone: resPhone.trim(),
      guestCount: Number(resGuests),
      date: resDate,
      time: resTime,
    });

    if (success) {
      onClose();
    }
  };

  const handleStaffSeat = (e: React.FormEvent) => {
    e.preventDefault();
    assignGuestToTable(
      table.id,
      staffGuestName.trim() || `Walk-in Guest`,
      Number(staffGuestCount)
    );
    onClose();
  };

  const isAvailable = table.status === "available";
  const isOccupied = table.status === "occupied";
  const isReserved = table.status === "reserved";
  const isCleaning = table.status === "cleaning";

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
            className="relative w-full max-w-md bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl z-10 text-stone-100 p-6 space-y-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border ${
                    isAvailable
                      ? "bg-emerald-950 text-emerald-400 border-emerald-500/50"
                      : isOccupied
                      ? "bg-rose-950 text-rose-400 border-rose-500/50"
                      : isReserved
                      ? "bg-amber-950 text-amber-400 border-amber-500/50"
                      : "bg-indigo-950 text-indigo-400 border-indigo-500/50"
                  }`}
                >
                  T-{table.tableNumber}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-stone-100">{table.label}</h3>
                  <div className="flex items-center gap-3 text-xs text-stone-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {table.capacity} Person Max
                    </span>
                    <span>•</span>
                    <span className="capitalize">{table.section.replace("_", " ")}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Pill Details */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                isAvailable
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                  : isOccupied
                  ? "bg-rose-950/40 border-rose-500/30 text-rose-300"
                  : isReserved
                  ? "bg-amber-950/40 border-amber-500/30 text-amber-300"
                  : "bg-indigo-950/40 border-indigo-500/30 text-indigo-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isAvailable
                      ? "bg-emerald-400 animate-pulse"
                      : isOccupied
                      ? "bg-rose-400"
                      : isReserved
                      ? "bg-amber-400"
                      : "bg-indigo-400"
                  }`}
                />
                <span className="font-bold uppercase tracking-wider">
                  Status: {table.status}
                </span>
              </div>

              {isOccupied && table.occupiedSince && (
                <span className="text-[11px] text-stone-400">Since {table.occupiedSince}</span>
              )}
              {isReserved && table.reservedTime && (
                <span className="text-[11px] text-stone-400">{table.reservedTime}</span>
              )}
            </div>

            {/* Active Order Details if Table is Occupied */}
            {activeOrder && (
              <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold text-stone-200">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Utensils className="w-3.5 h-3.5" />
                    Active Order {activeOrder.orderNumber}
                  </span>
                  <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                    {activeOrder.status}
                  </span>
                </div>
                <div className="text-stone-400 text-[11px]">
                  {activeOrder.items.map((i) => `${i.quantity}x ${i.item.name}`).join(", ")}
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-stone-100">
                  <span>Total Amount</span>
                  <span className="text-amber-400">{formatPrice(activeOrder.grandTotal)}</span>
                </div>
              </div>
            )}

            {/* CUSTOMER MODE VIEW */}
            <div className="space-y-4">
              {isAvailable && (
                <div className="space-y-4">
                  {/* Instant Order Button */}
                  <button
                    onClick={handleStartOrdering}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30 transition-all"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>Sit Here &amp; Order Food to Table {table.tableNumber}</span>
                  </button>

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-stone-800 w-full" />
                    <span className="bg-stone-950 px-3 text-[11px] text-stone-500 uppercase tracking-widest">
                      Or Reserve for Later
                    </span>
                  </div>

                  {/* Reservation Form */}
                  <form onSubmit={handleReserveSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-400 font-medium mb-1">Your Full Name</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Samrat Joshi"
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-stone-100 outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-stone-400 font-medium mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="+977 984-..."
                          value={resPhone}
                          onChange={(e) => setResPhone(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 font-medium mb-1">Time Slot</label>
                        <select
                          value={resTime}
                          onChange={(e) => setResTime(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-2.5 py-2 text-stone-100 outline-none focus:border-amber-500"
                        >
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="4:30 PM">4:30 PM</option>
                          <option value="6:00 PM">6:00 PM (Dinner)</option>
                          <option value="7:30 PM">7:30 PM (Dinner)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 font-bold py-2.5 rounded-xl transition-colors text-xs"
                    >
                      Confirm Booking for Table {table.tableNumber}
                    </button>
                  </form>
                </div>
              )}

              {isOccupied && (
                <div className="text-center py-4 space-y-3">
                  <p className="text-xs text-stone-300">
                    This table is currently occupied by dining guests.
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Estimated turn time: ~25 minutes. Please choose an alternative green table.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-stone-200 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Browse Other Tables
                  </button>
                </div>
              )}

              {isReserved && (
                <div className="text-center py-4 space-y-3">
                  <p className="text-xs text-amber-300 font-medium">
                    Table reserved under:{" "}
                    <span className="font-bold text-stone-100">{table.reservedBy}</span>
                  </p>
                  <p className="text-[11px] text-stone-400">Reserved for: {table.reservedTime}</p>
                  <button
                    onClick={onClose}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-stone-200 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Pick Another Table
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
