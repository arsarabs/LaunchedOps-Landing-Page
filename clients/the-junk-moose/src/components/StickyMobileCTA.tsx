"use client";

import Link from "next/link";
import { usePersonalization } from "@/lib/personalization";

export function StickyMobileCTA() {
  const biz = usePersonalization();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-dark/95 backdrop-blur-xl border-t border-white/[0.03] px-4 py-3 safe-bottom">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <a
          href={`tel:${biz.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-white/[0.08] text-stone font-satoshi font-bold text-xs uppercase tracking-[0.12em] py-3.5 hover:border-gold/30 hover:text-gold transition-colors duration-300 min-h-[44px]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center bg-gold text-dark font-satoshi font-bold text-xs uppercase tracking-[0.12em] py-3.5 hover:bg-gold-light transition-colors duration-300 min-h-[44px]"
        >
          Free Quote
        </Link>
      </div>
    </div>
  );
}
