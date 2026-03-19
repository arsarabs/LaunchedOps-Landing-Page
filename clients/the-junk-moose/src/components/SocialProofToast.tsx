"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { usePersonalization } from "@/lib/personalization";

const SERVICE_TYPES = [
  "a garage cleanout",
  "furniture removal",
  "a free quote",
  "construction debris removal",
  "a property cleanout",
  "same-day pickup",
];

const DEFAULT_CITIES = [
  "Portland", "Beaverton", "Gresham", "Lake Oswego", "Tigard",
  "Hillsboro", "Vancouver", "Tualatin", "Milwaukie", "Oregon City",
];

export function SocialProofToast() {
  const biz = usePersonalization();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState({ city: "", service: "" });

  const cities = useMemo(() =>
    biz.city === "Portland"
      ? DEFAULT_CITIES
      : [`${biz.city}`, `North ${biz.city}`, `South ${biz.city}`, `Downtown ${biz.city}`],
    [biz.city]
  );

  const showToast = useCallback(() => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const service = SERVICE_TYPES[Math.floor(Math.random() * SERVICE_TYPES.length)];
    setMessage({ city, service });
    setVisible(true);

    setTimeout(() => setVisible(false), 4000);
  }, [cities]);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      showToast();
      const interval = setInterval(() => {
        showToast();
      }, 25000 + Math.random() * 10000);
      return () => clearInterval(interval);
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, [showToast]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 lg:left-6 z-30 animate-fadeInUp max-w-xs">
      <div className="bg-dark/95 backdrop-blur-xl border border-white/[0.06] p-4 shadow-xl flex items-start gap-3">
        <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A44E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-satoshi text-stone text-sm leading-snug">
            Someone in <span className="text-gold font-medium">{message.city}</span> just requested {message.service}
          </p>
          <p className="font-satoshi text-stone-dim/40 text-xs mt-1">
            A few moments ago
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-stone-dim/30 hover:text-stone-dim/60 transition-colors shrink-0"
          aria-label="Dismiss notification"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
