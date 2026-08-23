"use client";

import React, { useState } from "react";
import { useCafe } from "@/context/CafeContext";
import { generateTableQRToken } from "@/lib/security";
import {
  QrCode,
  Camera,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Coffee,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const QRScannerGate: React.FC = () => {
  const router = useRouter();
  const { tables, setSelectedTableNumber, addToast, playAudioCue } = useCafe();

  const [isScanning, setIsScanning] = useState(false);
  const [selectedDemoTable, setSelectedDemoTable] = useState<number>(3);

  const handleSimulateScan = (tableNumber: number) => {
    setIsScanning(true);
    playAudioCue("pop");

    setTimeout(() => {
      const token = generateTableQRToken(tableNumber);
      setSelectedTableNumber(tableNumber);
      playAudioCue("success");
      addToast({
        title: `QR Verified • Table ${tableNumber}`,
        message: `Welcome to Table ${tableNumber}! Menu unlocked for table dining.`,
        type: "success",
      });
      setIsScanning(false);
      router.push(`/menu?table=${tableNumber}&token=${token}`);
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full bg-stone-950 border border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center text-stone-100 relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Security Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-400">
          <QrCode className="w-3.5 h-3.5" />
          <span>Customer Access Verification</span>
        </div>

        {/* Header Icon */}
        <div className="relative w-20 h-20 rounded-3xl bg-stone-900 border-2 border-amber-500/40 mx-auto flex items-center justify-center shadow-xl shadow-amber-950/40">
          <Camera className="w-9 h-9 text-amber-400" />
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-stone-950">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
          </span>
        </div>

        {/* Text Instructions */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
            Scan Table QR Code to <span className="gold-gradient-text">Unlock Menu</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
            To ensure your freshly brewed coffees and meals are routed precisely to your seating,
            please scan the QR code located on your table stand.
          </p>
        </div>

        {/* Virtual Table Scanner for Instant Client Demo */}
        <div className="bg-stone-900/70 border border-stone-800 p-4 rounded-2xl space-y-3 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Table Camera Scan (Demo Mode):</span>
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-semibold">
              Instant
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {tables.slice(0, 8).map((table) => {
              const isSelected = selectedDemoTable === table.tableNumber;
              return (
                <button
                  key={table.id}
                  type="button"
                  onClick={() => setSelectedDemoTable(table.tableNumber)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? "bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold"
                      : "bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700"
                  }`}
                >
                  <span>Table {table.tableNumber}</span>
                  <span
                    className={`text-[9px] ${
                      isSelected ? "text-stone-900" : "text-stone-500"
                    }`}
                  >
                    {table.capacity} Seats
                  </span>
                </button>
              );
            })}
          </div>

          <button
            disabled={isScanning}
            onClick={() => handleSimulateScan(selectedDemoTable)}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-extrabold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all disabled:opacity-50"
          >
            {isScanning ? (
              <span className="animate-spin text-stone-950 font-bold">↻ Verifying Table QR...</span>
            ) : (
              <>
                <Camera className="w-4 h-4 text-stone-950" />
                <span>Simulate Scan: Unlock as Table {selectedDemoTable}</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </>
            )}
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-stone-500">
          Encrypted table tokens prevent ghost orders and ensure table occupancy sync in real-time.
        </p>
      </motion.div>
    </div>
  );
};
