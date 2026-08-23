import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CafeProvider } from "@/context/CafeContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/menu/CartDrawer";
import { ToastContainer } from "@/components/ui/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0e0d0b",
};

export const metadata: Metadata = {
  title: "AURA Artisanal Coffee & Kitchen | Jhamsikhel, Lalitpur",
  description:
    "Production demo of modern cafe web application with live table management, QR ordering, and Himalayan single-origin roasts.",
  keywords: [
    "Cafe",
    "Specialty Coffee",
    "Kathmandu",
    "Lalitpur",
    "Jhamsikhel",
    "Table QR Ordering",
    "Tomato Concasse",
    "Caramel Custard",
    "Pour Over",
  ],
  authors: [{ name: "AURA Cafe Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-stone-950 text-stone-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        <CafeProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </CafeProvider>
      </body>
    </html>
  );
}
