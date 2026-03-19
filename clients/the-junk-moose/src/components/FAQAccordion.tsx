"use client";

import { useState } from "react";

export function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-black/[0.06]">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-7 text-left group"
          >
            <div className="flex items-center gap-5 pr-4">
              <span className="font-clash font-bold text-gold/15 text-xs shrink-0 group-hover:text-gold/40 transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-satoshi font-medium text-stone text-base sm:text-lg group-hover:text-gold transition-colors duration-300">
                {faq.q}
              </span>
            </div>
            <span
              className={`font-clash font-bold text-gold/30 text-xl shrink-0 group-hover:text-gold/60 transition-all duration-300 inline-block ${openIndex === i ? "rotate-45" : "rotate-0"}`}
            >
              +
            </span>
          </button>
          <div
            className={`grid transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <p className="font-satoshi text-stone-dim text-base pb-7 pl-10 leading-relaxed max-w-xl">
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
