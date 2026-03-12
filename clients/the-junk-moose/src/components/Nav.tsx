"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SERVICES, LOCATIONS, BUSINESS } from "@/lib/data";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-gold focus:text-dark focus:px-4 focus:py-2 focus:font-satoshi focus:font-bold focus:text-sm"
      >
        Skip to main content
      </a>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-gold/30 flex items-center justify-center group-hover:border-gold/60 transition-colors duration-500">
              <span className="font-clash font-bold text-gold text-xs">JM</span>
            </div>
            <span className="font-clash font-bold text-sm text-stone tracking-tight hidden sm:block">
              THE JUNK MOOSE
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className="font-satoshi text-stone-dim text-[13px] uppercase tracking-[0.15em] hover:text-gold transition-colors duration-300 flex items-center gap-1"
              >
                Services
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-dark/95 backdrop-blur-xl border border-white/[0.06] shadow-xl"
                  >
                    <div className="py-2">
                      <Link
                        href="/services"
                        className="block px-5 py-2.5 font-satoshi text-gold/70 text-xs uppercase tracking-[0.15em] hover:text-gold transition-colors"
                      >
                        All Services
                      </Link>
                      <div className="h-px bg-white/[0.04] mx-4" />
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="block px-5 py-2.5 font-satoshi text-stone-dim text-sm hover:text-gold hover:bg-white/[0.02] transition-colors duration-200"
                        >
                          {s.shortName}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Locations dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("locations")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/locations"
                className="font-satoshi text-stone-dim text-[13px] uppercase tracking-[0.15em] hover:text-gold transition-colors duration-300 flex items-center gap-1"
              >
                Locations
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <AnimatePresence>
                {activeDropdown === "locations" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-dark/95 backdrop-blur-xl border border-white/[0.06] shadow-xl"
                  >
                    <div className="py-2">
                      <Link
                        href="/locations"
                        className="block px-5 py-2.5 font-satoshi text-gold/70 text-xs uppercase tracking-[0.15em] hover:text-gold transition-colors"
                      >
                        All Locations
                      </Link>
                      <div className="h-px bg-white/[0.04] mx-4" />
                      {LOCATIONS.map((l) => (
                        <Link
                          key={l.slug}
                          href={`/locations/${l.slug}`}
                          className="block px-5 py-2.5 font-satoshi text-stone-dim text-sm hover:text-gold hover:bg-white/[0.02] transition-colors duration-200"
                        >
                          {l.city}, {l.state}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className="font-satoshi text-stone-dim text-[13px] uppercase tracking-[0.15em] hover:text-gold transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/reviews"
              className="font-satoshi text-stone-dim text-[13px] uppercase tracking-[0.15em] hover:text-gold transition-colors duration-300"
            >
              Reviews
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="hidden md:flex items-center gap-2 text-stone-dim font-satoshi font-medium text-[13px] tracking-wide hover:text-gold transition-colors duration-300"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              className="btn-magnetic bg-gold text-dark font-satoshi font-bold text-[11px] uppercase tracking-[0.18em] px-6 py-2.5 hover:bg-gold-light transition-colors duration-300"
            >
              Free Quote
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1"
              aria-label="Menu"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                className="block w-5 h-px bg-stone"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block w-5 h-px bg-stone"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                className="block w-5 h-px bg-stone"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark/98 backdrop-blur-2xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {[
                { label: "Services", href: "/services" },
                { label: "Locations", href: "/locations" },
                { label: "About", href: "/about" },
                { label: "Reviews", href: "/reviews" },
                { label: "Contact", href: "/contact" },
              ].map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-clash font-bold text-3xl text-stone hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={`tel:${BUSINESS.phoneRaw}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="font-satoshi text-gold text-lg mt-4"
              >
                {BUSINESS.phone}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
