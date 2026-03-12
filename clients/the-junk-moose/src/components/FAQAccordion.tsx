"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-white/[0.04]">
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
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="font-clash font-bold text-gold/30 text-xl shrink-0 group-hover:text-gold/60 transition-colors duration-300"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="font-satoshi text-stone-dim text-base pb-7 pl-10 leading-relaxed max-w-xl">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
