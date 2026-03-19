"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePersonalization } from "@/lib/personalization";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const biz = usePersonalization();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Honeypot check — if filled, it's a bot
    if (honeypotRef.current?.value) return;
    setSubmitted(true);
    router.push("/thank-you");
  };

  return (
    <>
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className={`bg-dark border border-black/[0.06] ${compact ? "p-6" : "p-8 lg:p-12"}`}
        >
          {/* Honeypot — hidden from real users, catches bots */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="form-website">Website</label>
            <input
              id="form-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              ref={honeypotRef}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="form-name" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                Your Name
              </label>
              <input
                id="form-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="John Smith"
                required
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="form-phone" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                Phone Number
              </label>
              <input
                id="form-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(503) 555-1234"
                required
                className="form-input"
              />
            </div>
          </div>

          {!compact && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="form-email" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                  Email (Optional)
                </label>
                <input
                  id="form-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john@email.com"
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="form-service" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                  Service Type
                </label>
                <select id="form-service" name="service" className="form-input" defaultValue="">
                  <option value="" disabled>Select a service</option>
                  <option>Furniture & Appliances</option>
                  <option>Construction Debris</option>
                  <option>Yard Waste</option>
                  <option>Full Cleanout</option>
                  <option>Commercial</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          )}

          <div className={compact ? "mb-5" : "mb-6"}>
            <label htmlFor="form-message" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
              Tell Us About Your Job
            </label>
            <textarea
              id="form-message"
              name="message"
              placeholder="What do you need hauled? Any details help us quote faster."
              rows={compact ? 3 : 4}
              className="form-input resize-none"
            />
          </div>

          {!compact && (
            <div className="flex flex-wrap items-center justify-center gap-6 mb-6 py-4 border-y border-black/[0.06]">
              {[
                { icon: "\u2713", text: "Licensed & Insured" },
                { icon: "\u2713", text: "No Obligation" },
                { icon: "\u2713", text: "Response in 15 min" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2">
                  <span className="text-gold text-xs">{badge.icon}</span>
                  <span className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.1em]">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gold text-white font-satoshi font-bold text-sm uppercase tracking-[0.18em] py-4 hover:bg-gold-light transition-colors duration-300"
          >
            Get My Free Quote
          </button>
        </form>
      ) : (
        <div className="bg-dark border border-gold/20 p-12 text-center animate-fadeInUp">
          <h3 className="font-clash font-bold text-gold text-2xl mb-4">Quote Requested</h3>
          <p className="font-satoshi text-stone-dim text-base mb-6">
            We&apos;ll be in touch within 15 minutes during business hours.
          </p>
          <a
            href={`tel:${biz.phoneRaw}`}
            className="font-satoshi text-gold/60 text-sm hover:text-gold transition-colors"
          >
            Can&apos;t wait? Call {biz.phone}
          </a>
        </div>
      )}
    </>
  );
}
