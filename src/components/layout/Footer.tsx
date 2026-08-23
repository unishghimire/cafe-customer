"use client";

import React from "react";
import Link from "next/link";
import { CAFE_CONFIG } from "@/data/cafeConfig";
import {
  Coffee,
  MapPin,
  Phone,
  Mail,
  Clock,
  Wifi,
  Award,
  Sparkles,
  Globe,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 border-t border-amber-900/30 text-stone-300 relative overflow-hidden">
      {/* Ambient subtle glow backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-wider text-stone-100">AURA</span>
                <p className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase">
                  Artisanal Roastery
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed">
              Crafting transcendent coffee experiences with single-origin beans sustainably
              harvested from Nuwakot & Ilam, paired with contemporary gourmet breakfast and dining.
            </p>

            <div className="flex items-center gap-3 text-stone-400">
              <a
                href={CAFE_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={CAFE_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <div className="flex items-center gap-1.5 text-xs text-amber-300/80 bg-amber-950/40 border border-amber-900/40 px-2.5 py-1 rounded-lg">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Specialty Coffee Assoc.</span>
              </div>
            </div>
          </div>

          {/* Col 2: Operating Hours */}
          <div className="space-y-4">
            <h4 className="text-stone-100 font-semibold text-sm flex items-center gap-2 tracking-wide uppercase">
              <Clock className="w-4 h-4 text-amber-400" />
              Operating Hours
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              {CAFE_CONFIG.operatingHours.map((sched, idx) => (
                <li key={idx} className="flex justify-between pb-1.5 border-b border-stone-900">
                  <span className="text-stone-300 font-medium">{sched.days}</span>
                  <span className="text-amber-400/90 font-mono text-xs">{sched.hours}</span>
                </li>
              ))}
            </ul>
            <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Wifi className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-stone-400">Guest High-Speed Wi-Fi:</span>
                <p className="text-stone-200 font-mono font-bold">{CAFE_CONFIG.wifi.ssid}</p>
              </div>
            </div>
          </div>

          {/* Col 3: Location & Coordinates */}
          <div className="space-y-4">
            <h4 className="text-stone-100 font-semibold text-sm flex items-center gap-2 tracking-wide uppercase">
              <MapPin className="w-4 h-4 text-amber-400" />
              Find Our Roastery
            </h4>
            <div className="space-y-2 text-sm text-stone-400">
              <p className="font-semibold text-stone-200">{CAFE_CONFIG.location.street}</p>
              <p>{CAFE_CONFIG.location.landmark}</p>
              <p>{CAFE_CONFIG.location.city}, {CAFE_CONFIG.location.valley}</p>
              <p className="text-xs text-amber-400/90 font-mono">
                Altitude: 1,400m AMSL • 27.6782° N, 85.3134° E
              </p>
            </div>

            <div className="pt-1 flex flex-col gap-1 text-xs text-stone-400">
              <a
                href={`tel:${CAFE_CONFIG.contact.phone}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{CAFE_CONFIG.contact.phone}</span>
              </a>
              <a
                href={`mailto:${CAFE_CONFIG.contact.email}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{CAFE_CONFIG.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Col 4: Quick Links & Reserve Direct */}
          <div className="space-y-4">
            <h4 className="text-stone-100 font-semibold text-sm flex items-center gap-2 tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Direct Experience
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/menu"
                className="text-stone-400 hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>Interactive Digital Menu</span>
                <span className="text-xs text-amber-500">→</span>
              </Link>
              <Link
                href="/tables"
                className="text-stone-400 hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>Table Floor Plan &amp; Booking</span>
                <span className="text-xs text-amber-500">→</span>
              </Link>
              <Link
                href="/#story"
                className="text-stone-400 hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>Single-Origin Roasting Story</span>
                <span className="text-xs text-amber-500">→</span>
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="/tables"
                className="block w-full text-center bg-stone-900 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md"
              >
                Reserve a Table Online
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} AURA Artisanal Roastery & Kitchen. Crafted for client demonstration.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Jhamsikhel, Lalitpur</span>
            <span>•</span>
            <span>Specialty Grade Coffee</span>
            <span>•</span>
            <span>Real-time Table Allocation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
