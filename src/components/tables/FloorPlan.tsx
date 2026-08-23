"use client";

import React, { useState } from "react";
import { TableItem, TableSection, TableStatus } from "@/types/cafe";
import { useCafe } from "@/context/CafeContext";
import { TableActionModal } from "./TableActionModal";
import {
  Users,
  Sparkles,
  LayoutGrid,
  Map,
  ShieldCheck,
  User,
  Coffee,
  Sun,
  Crown,
  CheckCircle2,
  Clock,
  Utensils,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

export const FloorPlan: React.FC = () => {
  const { tables, userRole, setUserRole, resetToDefaults } = useCafe();

  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterSection, setFilterSection] = useState<"all" | TableSection>("all");
  const [viewMode, setViewMode] = useState<"floorplan" | "grid">("floorplan");

  // Summary Metrics
  const totalTables = tables.length;
  const availableTables = tables.filter((t) => t.status === "available").length;
  const occupiedTables = tables.filter((t) => t.status === "occupied").length;
  const reservedTables = tables.filter((t) => t.status === "reserved").length;
  const cleaningTables = tables.filter((t) => t.status === "cleaning").length;
  const occupancyRate = Math.round((occupiedTables / totalTables) * 100);

  const filteredTables =
    filterSection === "all" ? tables : tables.filter((t) => t.section === filterSection);

  const handleTableClick = (table: TableItem) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case "available":
        return {
          bg: "bg-emerald-950/80 hover:bg-emerald-900/90",
          border: "border-emerald-500/60 shadow-emerald-950/50",
          text: "text-emerald-300",
          dot: "bg-emerald-400 animate-pulse",
          badge: "bg-emerald-900/80 text-emerald-300 border-emerald-700",
        };
      case "occupied":
        return {
          bg: "bg-rose-950/80 hover:bg-rose-900/90",
          border: "border-rose-500/60 shadow-rose-950/50",
          text: "text-rose-300",
          dot: "bg-rose-400",
          badge: "bg-rose-900/80 text-rose-300 border-rose-700",
        };
      case "reserved":
        return {
          bg: "bg-amber-950/80 hover:bg-amber-900/90",
          border: "border-amber-500/60 shadow-amber-950/50",
          text: "text-amber-300",
          dot: "bg-amber-400",
          badge: "bg-amber-900/80 text-amber-300 border-amber-700",
        };
      case "cleaning":
        return {
          bg: "bg-indigo-950/80 hover:bg-indigo-900/90",
          border: "border-indigo-500/60 shadow-indigo-950/50",
          text: "text-indigo-300",
          dot: "bg-indigo-400",
          badge: "bg-indigo-900/80 text-indigo-300 border-indigo-700",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Role Notice */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-stone-900/60 border border-stone-800 p-5 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-500/20 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30">
              Live Allocation Matrix
            </span>
            <span className="text-xs text-stone-400 font-medium">Jhamsikhel Dining Hall</span>
          </div>
          <h2 className="text-2xl font-extrabold text-stone-100">
            Interactive Cafe Floor Plan
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Click any table to check status, reserve a seat, or assign incoming guests in real-time.
          </p>
        </div>

        {/* Action Controls & View Switcher */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Floorplan vs Grid View */}
          <div className="bg-stone-950 border border-stone-800 p-1 rounded-2xl flex items-center gap-1">
            <button
              onClick={() => setViewMode("floorplan")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "floorplan"
                  ? "bg-stone-800 text-amber-400"
                  : "text-stone-400 hover:text-stone-200"
              }`}
              title="2D Floorplan Layout"
            >
              <Map className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "grid"
                  ? "bg-stone-800 text-amber-400"
                  : "text-stone-400 hover:text-stone-200"
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={resetToDefaults}
            className="p-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
            title="Reset Floorplan to Showcase State"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Cards Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-stone-900/60 border border-stone-800 p-3.5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] text-stone-400 font-medium block">Total Tables</span>
            <span className="text-xl font-black text-stone-100">{totalTables}</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-stone-800/80 text-stone-300 flex items-center justify-center font-mono text-xs">
            {occupancyRate}%
          </div>
        </div>

        <div className="bg-stone-900/60 border border-emerald-900/40 p-3.5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] text-emerald-400 font-semibold block">Available</span>
            <span className="text-xl font-black text-emerald-300">{availableTables}</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <div className="bg-stone-900/60 border border-rose-900/40 p-3.5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] text-rose-400 font-semibold block">Occupied</span>
            <span className="text-xl font-black text-rose-300">{occupiedTables}</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-rose-400" />
        </div>

        <div className="bg-stone-900/60 border border-amber-900/40 p-3.5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] text-amber-400 font-semibold block">Reserved</span>
            <span className="text-xl font-black text-amber-300">{reservedTables}</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-amber-400" />
        </div>

        <div className="bg-stone-900/60 border border-indigo-900/40 p-3.5 rounded-2xl flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <span className="text-[11px] text-indigo-400 font-semibold block">Cleaning</span>
            <span className="text-xl font-black text-indigo-300">{cleaningTables}</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-indigo-400" />
        </div>
      </div>

      {/* Section Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "Full Cafe Map", icon: Sparkles },
          { id: "indoor_main", label: "Main Indoor Hall", icon: Coffee },
          { id: "barista_counter", label: "Barista Counter", icon: Coffee },
          { id: "terrace_veranda", label: "Terrace Veranda", icon: Sun },
          { id: "private_lounge", label: "Himalayan VIP Lounge", icon: Crown },
        ].map((sec) => {
          const Icon = sec.icon;
          const isSelected = filterSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setFilterSection(sec.id as "all" | TableSection)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md"
                  : "bg-stone-900/80 text-stone-400 border-stone-800 hover:text-stone-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-amber-400" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2D ARCHITECTURAL FLOOR PLAN VIEW */}
      {viewMode === "floorplan" ? (
        <div className="relative w-full bg-stone-950 border border-amber-900/30 rounded-3xl p-6 shadow-2xl overflow-x-auto">
          {/* Architectural Background Grid & Labels */}
          <div className="min-w-[760px] h-[520px] relative rounded-2xl bg-stone-900/30 border border-stone-800/80 overflow-hidden">
            {/* Ambient Zones Demarcations */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 pointer-events-none opacity-40">
              <div className="border-r border-b border-stone-800/60 p-3">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">
                  Zone 1: Indoor Window Seating
                </span>
              </div>
              <div className="border-r border-b border-stone-800/60 p-3 bg-amber-950/10">
                <span className="text-[10px] uppercase tracking-widest text-amber-500/60 font-mono">
                  Zone 2: Barista Espresso Bar
                </span>
              </div>
              <div className="border-b border-stone-800/60 p-3 bg-emerald-950/10">
                <span className="text-[10px] uppercase tracking-widest text-emerald-500/60 font-mono">
                  Zone 3: Garden Veranda & Terrace
                </span>
              </div>
              <div className="border-r border-stone-800/60 p-3">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">
                  Zone 4: Main Dining & Library
                </span>
              </div>
              <div className="border-r border-stone-800/60 p-3 bg-indigo-950/10">
                <span className="text-[10px] uppercase tracking-widest text-indigo-400/60 font-mono">
                  Zone 5: Himalayan VIP Lounge
                </span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">
                  Entrance & Cashier
                </span>
              </div>
            </div>

            {/* Entrance Marker */}
            <div className="absolute bottom-2 right-6 px-3 py-1 bg-stone-800 border border-stone-700 text-[10px] uppercase font-bold text-stone-400 rounded-lg flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Main Entrance</span>
            </div>

            {/* Espresso Machine Station */}
            <div className="absolute top-4 left-[44%] -translate-x-1/2 px-3 py-1.5 bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-bold rounded-xl flex items-center gap-2 shadow-lg backdrop-blur-sm">
              <Coffee className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>La Marzocco PB Barista Station</span>
            </div>

            {/* Render Table Nodes on the Floor Plan */}
            {filteredTables.map((table) => {
              const colors = getStatusColor(table.status);
              const isRound = table.shape === "round";
              const isBooth = table.shape === "booth";

              return (
                <motion.div
                  key={table.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleTableClick(table)}
                  style={{
                    position: "absolute",
                    left: `${table.position.x}%`,
                    top: `${table.position.y}%`,
                    width: `${table.position.width || 75}px`,
                    height: `${table.position.height || 75}px`,
                  }}
                  className={`cursor-pointer transition-all duration-300 p-2 border-2 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-md z-10 ${
                    colors.bg
                  } ${colors.border} ${
                    isRound
                      ? "rounded-full"
                      : isBooth
                      ? "rounded-3xl border-dashed"
                      : "rounded-2xl"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <span className="font-extrabold text-xs text-stone-100">
                      T-{table.tableNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-stone-300 font-medium">
                    <Users className="w-3 h-3 text-stone-400" />
                    <span>{table.capacity}P</span>
                  </div>

                  {table.status === "occupied" && table.currentGuestName && (
                    <span className="text-[9px] text-rose-300/90 font-medium truncate max-w-[65px] block mt-0.5">
                      {table.currentGuestName.split(" ")[0]}
                    </span>
                  )}

                  {table.status === "reserved" && table.reservedTime && (
                    <span className="text-[9px] text-amber-300/90 font-medium truncate max-w-[65px] block mt-0.5">
                      {table.reservedTime.split(" ")[0]}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* GRID / LIST CARD VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTables.map((table) => {
            const colors = getStatusColor(table.status);
            return (
              <motion.div
                key={table.id}
                whileHover={{ y: -3 }}
                onClick={() => handleTableClick(table)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-stone-900/80 hover:border-amber-500/50 flex flex-col justify-between space-y-4 shadow-lg ${colors.border}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center font-extrabold text-amber-400">
                      T{table.tableNumber}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-stone-100">{table.label}</h4>
                      <p className="text-xs text-stone-400 capitalize">
                        {table.section.replace("_", " ")}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${colors.badge}`}
                  >
                    {table.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex items-center justify-between text-stone-400">
                    <span>Capacity</span>
                    <span className="font-semibold text-stone-200">{table.capacity} Persons</span>
                  </div>

                  {table.status === "occupied" && (
                    <div className="flex items-center justify-between text-rose-300">
                      <span>Guest</span>
                      <span className="font-semibold">{table.currentGuestName || "Dining"}</span>
                    </div>
                  )}

                  {table.status === "reserved" && (
                    <div className="flex items-center justify-between text-amber-300">
                      <span>Reserved for</span>
                      <span className="font-semibold">{table.reservedTime}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="w-full bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-800 py-2 rounded-xl text-xs font-semibold transition-colors text-center"
                >
                  {userRole === "customer"
                    ? table.status === "available"
                      ? "Reserve / Order Here"
                      : "View Details"
                    : "Manage Allocation"}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Legend Bar */}
      <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="text-stone-400 font-semibold uppercase tracking-wider text-[11px]">
          Floor Plan Status Legend:
        </span>
        <div className="flex flex-wrap items-center gap-5 text-stone-300">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available (Open to Dine/Order)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span>Occupied (Dining / Ticket Active)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span>Reserved (Scheduled Booking)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-400" />
            <span>Cleaning / Billed</span>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      <TableActionModal
        table={selectedTable}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
