"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/data";


/* ═══════════════════════════════════════════════════════════════
   HERO — cinematic, editorial, asymmetric
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end bg-dark overflow-hidden pt-20">
      {/* Atmospheric gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 20% 80%, rgba(200,164,78,0.04) 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 40% 40% at 80% 20%, rgba(200,164,78,0.02) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Decorative vertical line */}
      <div
        className="absolute right-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent origin-top hidden lg:block animate-scaleY"
        style={{ animationDelay: "0.8s" }}
      />

      {/* Decorative corner mark */}
      <div
        className="absolute top-28 right-[15%] hidden lg:block animate-fadeIn"
        style={{ animationDelay: "1.2s", animationDuration: "0.8s" }}
      >
        <div className="w-16 h-16 border-t border-r border-gold/10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Main content — left 8 columns */}
          <div className="lg:col-span-8">
            {/* Social proof badge */}
            <div className="inline-flex items-center gap-4 mb-10 animate-fadeInLeft">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 20 20" fill="#C8A44E" aria-hidden="true">
                    <path d="M10 1l2.39 4.84L17.3 6.7l-3.65 3.56.86 5.02L10 13.01l-4.51 2.37.86-5.02L2.7 6.8l4.91-.86L10 1z"/>
                  </svg>
                ))}
              </div>
              <div className="w-px h-4 bg-gold/20" />
              <span className="text-stone-dim font-satoshi text-xs font-medium tracking-wide">
                4.9 rating · 500+ jobs completed
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-clash font-bold text-[clamp(3.5rem,11vw,10rem)] leading-[0.88] tracking-[-0.03em]">
              <div className="overflow-hidden mb-4">
                <span
                  className="block text-gold animate-heroText"
                  style={{ animationDelay: "0.15s" }}
                >
                  Your junk.
                </span>
              </div>
              <div className="overflow-hidden mb-10">
                <span
                  className="block text-stone/80 animate-heroText"
                  style={{ animationDelay: "0.25s" }}
                >
                  Gone today.
                </span>
              </div>
            </h1>

            {/* Horizontal gold line */}
            <div
              className="w-20 h-px bg-gold/40 origin-left mb-8 animate-scaleX"
              style={{ animationDelay: "0.5s" }}
            />

            {/* Sub copy */}
            <p
              className="font-satoshi text-stone-dim text-lg sm:text-xl max-w-lg leading-relaxed mb-10 animate-fadeInUp"
              style={{ animationDelay: "0.55s" }}
            >
              Same-day junk removal across Portland &amp; the Metro Area.
              Upfront pricing. No surprises. Just an empty space where your
              junk used to be.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <a
                href="#quote"
                className="btn-magnetic bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-light transition-colors duration-300 text-center pulse-glow"
              >
                Get My Free Quote
              </a>
              <a
                href="tel:+15035550100"
                className="group border border-white/[0.08] text-stone font-satoshi font-medium text-sm uppercase tracking-[0.15em] px-10 py-4 hover:border-gold/30 hover:text-gold transition-all duration-500 text-center flex items-center justify-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500/80 group-hover:bg-emerald-400 transition-colors" />
                Call Now — (503) 555-0100
              </a>
            </div>
          </div>

          {/* Right column — stats sidebar */}
          <div
            className="lg:col-span-4 hidden lg:flex flex-col gap-8 border-l border-white/[0.04] pl-10 animate-fadeInUp"
            style={{ animationDelay: "0.9s" }}
          >
            {[
              { num: "500+", label: "Jobs Completed" },
              { num: "4.9", label: "Google Rating" },
              { num: "Same Day", label: "Service Available" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-clash font-bold text-gold text-2xl tracking-tight">
                  {stat.num}
                </p>
                <p className="font-satoshi text-stone-dim/50 text-xs uppercase tracking-[0.15em] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICE AREAS — refined marquee
   ═══════════════════════════════════════════════════════════════ */
const serviceAreas = [
  "Portland", "Beaverton", "Gresham", "Lake Oswego", "Tigard",
  "Hillsboro", "Vancouver WA", "Tualatin", "Milwaukie", "Oregon City",
];

function ServiceAreas() {
  return (
    <section className="bg-dark border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6">
        <h2 className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-0 text-center">
          Serving the Portland Metro Area
        </h2>
      </div>
      <Link href="/locations" className="block hover:bg-white/[0.01] transition-colors duration-300">
        <Marquee className="py-5">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="font-satoshi font-medium text-stone-dim/40 uppercase tracking-[0.25em] text-[11px] flex items-center gap-10 whitespace-nowrap"
            >
              {area}
              <span className="text-gold/20 text-[6px]">◆</span>
            </span>
          ))}
        </Marquee>
      </Link>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS — horizontal scroll process
   ═══════════════════════════════════════════════════════════════ */
const processSteps = [
  {
    num: "01",
    title: "Call or Text",
    desc: "Reach out with what you need hauled. Photos help us quote faster.",
    detail: "Response within 15 min",
  },
  {
    num: "02",
    title: "Get Your Quote",
    desc: "We give you an upfront price. What we quote is what you pay — no surprises.",
    detail: "Free, no obligation",
  },
  {
    num: "03",
    title: "We Show Up",
    desc: "Our crew arrives on time, handles everything. You don't lift a finger.",
    detail: "Same-day available",
  },
  {
    num: "04",
    title: "It's Gone",
    desc: "Junk hauled, space cleared, site swept clean. Photo confirmation sent.",
    detail: "100% satisfaction",
  },
];

function Process() {
  return (
    <SectionWrapper className="bg-dark py-24 sm:py-32 lg:py-40 border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 lg:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
              How It Works
            </p>
            <h2 className="font-clash font-bold text-4xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-tight">
              <span className="text-stone">Four steps.</span>
              <br />
              <span className="text-gold">Zero hassle.</span>
            </h2>
          </div>
          <p className="font-satoshi text-stone-dim/60 text-sm max-w-xs leading-relaxed">
            From first call to clean sweep — the whole thing usually takes less than a day.
          </p>
        </div>
      </div>

      {/* Cards — stacked on mobile, horizontal scroll on desktop */}
      <div className="px-6 lg:px-0">
        {/* Mobile: vertical stack */}
        <div className="grid grid-cols-1 gap-px bg-white/[0.03] sm:hidden">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className="bg-dark p-8 group relative overflow-hidden"
            >
              <span className="font-clash font-bold text-gold/10 text-[60px] leading-none absolute top-2 right-4">
                {step.num}
              </span>
              <div className="relative z-10">
                <div className="w-8 h-px bg-gold/30 mb-6" />
                <h3 className="font-clash font-bold text-stone text-xl mb-2">
                  {step.title}
                </h3>
                <p className="font-satoshi text-stone-dim/70 text-sm leading-relaxed mb-4">
                  {step.desc}
                </p>
                <span className="font-satoshi text-gold/40 text-[11px] uppercase tracking-[0.15em] font-medium">
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal scroll */}
        <div className="hidden sm:block overflow-x-auto hide-scrollbar">
          <div className="flex gap-px min-w-max lg:px-10">
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className="w-[320px] lg:w-[340px] bg-warm-gray border border-white/[0.03] p-8 lg:p-10 group hover:bg-elevated transition-colors duration-500 relative"
              >
                <span className="font-clash font-bold text-gold/10 text-[80px] leading-none absolute top-4 right-6 group-hover:text-gold/20 transition-colors duration-500">
                  {step.num}
                </span>
                <div className="relative z-10">
                  <div className="w-8 h-px bg-gold/30 mb-8 group-hover:w-12 transition-all duration-500" />
                  <h3 className="font-clash font-bold text-stone text-xl mb-3 group-hover:text-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-satoshi text-stone-dim/70 text-sm leading-relaxed mb-6">
                    {step.desc}
                  </p>
                  <span className="font-satoshi text-gold/40 text-[11px] uppercase tracking-[0.15em] font-medium">
                    {step.detail}
                  </span>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="absolute top-1/2 -right-px w-px h-8 bg-gold/10 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CREW STATEMENT — editorial typography
   ═══════════════════════════════════════════════════════════════ */
function CrewStatement() {
  return (
    <SectionWrapper className="bg-warm-gray py-28 sm:py-36 lg:py-44 px-6 lg:px-10 border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-6">
              The Crew
            </p>
            <h2 className="font-clash font-bold text-5xl sm:text-6xl lg:text-8xl tracking-[-0.03em] leading-[0.88]">
              <span className="text-gold">Real people.</span>
              <br />
              <span className="text-stone/60">Real work.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="w-12 h-px bg-gold/20 mb-6" />
            <p className="font-satoshi text-stone-dim/60 text-[15px] leading-relaxed max-w-sm">
              Every job is handled by our in-house team — never subcontracted,
              never outsourced. When we show up, you get the crew that built
              this company from the ground up.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES — bento-inspired grid
   ═══════════════════════════════════════════════════════════════ */
const services = [
  {
    num: "01",
    name: "Furniture & Appliances",
    desc: "Couches, fridges, washers, mattresses — all of it.",
    size: "normal",
  },
  {
    num: "02",
    name: "Construction Debris",
    desc: "Drywall, lumber, concrete, tile. We handle the heavy stuff.",
    size: "normal",
  },
  {
    num: "03",
    name: "Yard Waste",
    desc: "Branches, soil, stumps, clippings. Cleared in a single trip.",
    size: "normal",
  },
  {
    num: "04",
    name: "Full Cleanouts",
    desc: "Hoarding, estate, foreclosure. Entire properties, no judgment.",
    size: "normal",
  },
  {
    num: "05",
    name: "Commercial",
    desc: "Offices, retail spaces, warehouses. We work around your schedule.",
    size: "normal",
  },
  {
    num: "06",
    name: "Same-Day Pickup",
    desc: "Call before noon. We'll be there by end of day.",
    size: "normal",
  },
];

function Services() {
  return (
    <SectionWrapper id="services" className="bg-dark py-24 sm:py-32 lg:py-40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-16 lg:mb-24">
          <div className="lg:col-span-6">
            <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
              What We Haul
            </p>
            <h2 className="font-clash font-bold text-4xl sm:text-5xl lg:text-[64px] leading-[0.92] tracking-tight">
              <span className="text-stone">If it fits in</span>
              <br />
              <span className="text-stone">a truck,</span>{" "}
              <span className="text-gold">it&apos;s gone.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <p className="font-satoshi text-stone-dim text-lg leading-relaxed max-w-md">
              From a single couch to a full property cleanout — we handle
              everything. Upfront pricing, no hidden fees. You point, we haul.
            </p>
          </div>
        </div>

        {/* Service grid — bento style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
          {services.map((service, i) => {
            const serviceData = SERVICES[i];
            return (
              <Link
                href={`/services/${serviceData?.slug ?? ""}`}
                key={service.num}
                className="bg-dark p-8 lg:p-10 group hover:bg-warm-gray transition-all duration-500 relative overflow-hidden block"
              >
                {/* Hover gold line at top */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gold/0 group-hover:bg-gold/30 transition-colors duration-500" />

                <div className="flex items-start justify-between mb-8">
                  <span className="font-clash font-bold text-gold/15 text-sm group-hover:text-gold/40 transition-colors duration-500">
                    {service.num}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="text-stone-dim/0 group-hover:text-gold/50 transition-all duration-500 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-clash font-bold text-stone text-xl mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="font-satoshi text-stone-dim/60 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </Link>
            );
          })}
        </div>

        {/* View All Services link */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block font-satoshi font-bold text-gold text-sm uppercase tracking-[0.15em] hover:text-gold-light transition-colors duration-300"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BEFORE & AFTER — photo cards with fullscreen lightbox
   ═══════════════════════════════════════════════════════════════ */
const beforeAfterPhotos = [
  {
    src: "/before-after-1.jpg",
    alt: "Before and after junk removal — garage cleanout Portland OR by The Junk Moose",
    detail: "Single-family home · Portland, OR · 1 truck load",
  },
  {
    src: "/before-after-2.jpg",
    alt: "Before and after property debris removal — estate cleanout Beaverton OR by The Junk Moose",
    detail: "Estate cleanout · Beaverton, OR · 2 truck loads",
  },
];

function BeforeAfter() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <SectionWrapper id="work" className="bg-warm-gray py-24 sm:py-32 lg:py-40 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-16 lg:mb-24">
            <div className="lg:col-span-7">
              <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
                The Work
              </p>
              <h2 className="font-clash font-bold text-4xl sm:text-5xl lg:text-[64px] leading-[0.92] tracking-tight">
                <span className="text-stone">Before we showed up.</span>
                <br />
                <span className="text-gold">After we left.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:flex lg:items-end">
              <p className="font-satoshi text-stone-dim/60 text-[15px] leading-relaxed max-w-sm">
                Every job tells a story. Here are two of our favorites — from chaos to clean in hours.
                <span className="block mt-2 text-gold/40 text-xs uppercase tracking-[0.15em]">
                  Tap a photo to view full size
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {beforeAfterPhotos.map((photo) => (
              <div
                key={photo.src}
                className="overflow-hidden border border-white/[0.06] group hover:border-gold/10 transition-colors duration-500 cursor-pointer"
                onClick={() => setLightboxSrc(photo.src)}
              >
                <div className="relative w-full h-[320px] sm:h-[380px]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <div className="bg-dark/80 backdrop-blur-sm px-3 py-1">
                      <span className="font-satoshi text-xs font-medium tracking-widest uppercase text-stone-dim">
                        Before
                      </span>
                    </div>
                    <div className="bg-dark/80 backdrop-blur-sm px-3 py-1">
                      <span className="font-satoshi text-xs font-medium tracking-widest uppercase text-gold">
                        After
                      </span>
                    </div>
                  </div>
                  {/* Expand icon */}
                  <div className="absolute bottom-3 right-3 bg-dark/80 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A44E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>
                </div>
                <div className="w-full h-0.5 bg-gold/40" />
                <div className="bg-dark p-5 flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/30" />
                  <p className="font-satoshi text-stone-dim/30 text-xs uppercase tracking-[0.15em]">
                    {photo.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Fullscreen lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
          onClick={() => setLightboxSrc(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-6 right-6 z-10 text-stone-dim hover:text-gold transition-colors"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Hint text */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-satoshi text-stone-dim/30 text-xs uppercase tracking-[0.15em]">
            Tap anywhere to close
          </p>

          {/* Full-size image — scrollable on overflow */}
          <div
            className="max-w-[95vw] max-h-[90vh] overflow-auto hide-scrollbar cursor-default animate-zoomFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxSrc}
              alt="Before and after — full size"
              className="w-auto h-auto max-w-none max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STATS — full-width dramatic numbers
   ═══════════════════════════════════════════════════════════════ */
function Stats() {
  return (
    <SectionWrapper className="bg-dark py-24 sm:py-32 lg:py-40 px-6 lg:px-10 border-y border-white/[0.03] relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,164,78,0.02) 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-16 lg:mb-24 text-center">
          By The Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-0">
          {/* Stat 1 */}
          <div className="text-center relative">
            <div className="font-clash font-bold text-gold text-7xl sm:text-8xl lg:text-[120px] leading-none tracking-tight">
              <NumberTicker value={500} />
              <span className="text-gold/25">+</span>
            </div>
            <div className="w-8 h-px bg-gold/20 mx-auto my-5" />
            <p className="font-satoshi text-stone-dim/50 text-xs uppercase tracking-[0.2em]">
              Jobs Completed
            </p>
            {/* Divider on desktop */}
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-white/[0.04]" />
          </div>

          {/* Stat 2 */}
          <div className="text-center relative">
            <div className="font-clash font-bold text-gold text-7xl sm:text-8xl lg:text-[120px] leading-none tracking-tight">
              <NumberTicker value={4.9} decimalPlaces={1} delay={0.2} />
            </div>
            <div className="w-8 h-px bg-gold/20 mx-auto my-5" />
            <p className="font-satoshi text-stone-dim/50 text-xs uppercase tracking-[0.2em]">
              Google Rating
            </p>
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-white/[0.04]" />
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <div className="font-clash font-bold text-gold text-7xl sm:text-8xl lg:text-[120px] leading-none tracking-tight">
              <NumberTicker value={3} delay={0.4} />
              <span className="text-gold/25 text-5xl sm:text-6xl lg:text-7xl">yr</span>
            </div>
            <div className="w-8 h-px bg-gold/20 mx-auto my-5" />
            <p className="font-satoshi text-stone-dim/50 text-xs uppercase tracking-[0.2em]">
              Serving Portland
            </p>
            <Link
              href="/locations"
              className="inline-block mt-3 font-satoshi text-gold/50 text-[11px] uppercase tracking-[0.15em] hover:text-gold transition-colors duration-300"
            >
              View All Locations →
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CREW PHOTO — full-bleed team shot
   ═══════════════════════════════════════════════════════════════ */
function CrewPhoto() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/our-junk-removal-team.jpg"
        alt="The Junk Moose junk removal crew in front of truck — Portland OR"
        className="w-full h-auto block"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <span className="font-satoshi text-xs font-medium tracking-widest uppercase mb-4 text-gold">
          The Team
        </span>
        <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-bold leading-none text-stone">
          Real people. Real work.
        </h2>
        <p className="font-satoshi mt-4 text-lg max-w-lg text-stone-dim">
          Every job is handled by our own crew — not subcontractors, not day labor.
          We show up on time and we don&apos;t leave until it&apos;s clean.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MEET THE OWNER — editorial magazine layout
   ═══════════════════════════════════════════════════════════════ */
function MeetTheOwner() {
  return (
    <SectionWrapper id="about" className="bg-warm-gray py-24 sm:py-32 lg:py-44 px-6 lg:px-10 border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — large editorial headline */}
          <div className="lg:col-span-5">
            <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-6">
              The Moose Behind It All
            </p>
            <h2 className="font-clash font-bold text-4xl sm:text-5xl lg:text-[60px] leading-[0.9] tracking-tight mb-8">
              <span className="text-stone">Built by hand.</span>
              <br />
              <span className="text-gold">Run with pride.</span>
            </h2>
            <div className="w-12 h-px bg-gold/20" />
          </div>

          {/* Right — story + CTA */}
          <div className="lg:col-span-7 lg:pt-4">
            <div className="space-y-6 mb-12">
              <p className="font-satoshi text-stone-dim text-lg leading-[1.8]">
                The Junk Moose started with one truck and a simple idea: show up on
                time, charge a fair price, and leave the place cleaner than you
                found it.
              </p>
              <p className="font-satoshi text-stone-dim text-lg leading-[1.8]">
                Three years and 500+ jobs later, we&apos;re still doing exactly
                that. No call centers, no runaround — just a local crew that gives
                a damn.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12 py-8 border-y border-white/[0.04]">
              {[
                { label: "Licensed", sub: "& Insured" },
                { label: "Locally", sub: "Owned" },
                { label: "Eco-Friendly", sub: "Disposal" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-clash font-bold text-gold text-lg">{item.label}</p>
                  <p className="font-satoshi text-stone-dim/50 text-xs uppercase tracking-[0.1em]">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              <a
                href="#quote"
                className="btn-magnetic inline-block bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-light transition-colors duration-300"
              >
                Get a Free Quote
              </a>
              <Link
                href="/about"
                className="inline-block font-satoshi font-bold text-gold text-sm uppercase tracking-[0.15em] py-4 hover:text-gold-light transition-colors duration-300"
              >
                Learn More About Our Crew →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROMISE — cinematic statement break
   ═══════════════════════════════════════════════════════════════ */
function Promise() {
  return (
    <SectionWrapper className="bg-dark py-24 sm:py-32 lg:py-40 px-6 lg:px-10 relative overflow-hidden">
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(200,164,78,0.03) 0%, transparent 60%)`,
        }}
      />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
          Our Promise
        </p>
        <div className="w-8 h-px bg-gold/30 mx-auto mb-12" />
        <h2 className="font-clash font-bold text-4xl sm:text-6xl lg:text-[80px] tracking-[-0.03em] leading-[0.9]">
          <span className="text-stone">On-site estimates.</span>
          <br />
          <span className="text-gold">Upfront pricing.</span>
          <br />
          <span className="text-stone-dim/30">No surprises.</span>
        </h2>
        <div className="w-8 h-px bg-gold/30 mx-auto mt-12" />
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS — large editorial pull-quotes
   ═══════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote: "They showed up same day, cleared out my entire garage in under two hours. Price was exactly what they quoted.",
    name: "Mike T.",
    location: "Portland, OR",
    detail: "Garage Cleanout",
  },
  {
    quote: "No other company would touch the pile of debris we had. The Junk Moose handled it without blinking.",
    name: "Sarah K.",
    location: "Beaverton, OR",
    detail: "Construction Debris",
  },
];

function Testimonials() {
  return (
    <SectionWrapper className="bg-warm-gray py-24 sm:py-32 lg:py-44 px-6 lg:px-10 border-y border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-16 lg:mb-20">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Founder photo — desktop only */}
          <div className="relative w-full h-[520px] overflow-hidden hidden md:block border border-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder.jpg"
              alt="Marcus, founder of The Junk Moose junk removal crew Portland OR"
              className="absolute inset-0 w-full h-full object-cover object-[center_top]"
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="font-clash font-bold text-base text-stone">
                Marcus
              </p>
              <p className="font-satoshi text-sm text-gold">
                Founder, The Junk Moose
              </p>
            </div>
          </div>

          {/* Testimonial cards — remaining 2 columns */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-dark border border-white/[0.04] p-8 lg:p-10"
              >
                <span className="font-clash font-bold text-gold/[0.08] text-[80px] leading-none block -mb-8 select-none">
                  &ldquo;
                </span>
                <blockquote className="font-clash font-bold text-stone text-xl sm:text-2xl lg:text-3xl leading-[1.2] tracking-tight mb-8">
                  {t.quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-gold/30" />
                  <div className="flex items-center gap-3">
                    <p className="font-satoshi text-gold/70 text-sm font-medium">
                      {t.name}
                    </p>
                    <span className="text-stone-dim/20">—</span>
                    <p className="font-satoshi text-stone-dim/40 text-sm">
                      {t.location}
                    </p>
                    <span className="text-stone-dim/20">·</span>
                    <p className="font-satoshi text-stone-dim/30 text-sm">
                      {t.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Read all reviews link */}
            <div className="text-right mt-2">
              <Link
                href="/reviews"
                className="inline-block font-satoshi font-bold text-gold text-sm uppercase tracking-[0.15em] hover:text-gold-light transition-colors duration-300"
              >
                Read All Reviews →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAQ — refined dark accordion
   ═══════════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "How much does junk removal cost?",
    a: "Pricing depends on the volume and type of items. We give free, no-obligation quotes upfront — what we quote is what you pay. Most single-truck loads run between $250–$500.",
  },
  {
    q: "Do you serve my area?",
    a: "We cover all of Portland and the surrounding Metro Area including Beaverton, Gresham, Lake Oswego, Tigard, Hillsboro, Tualatin, Milwaukie, Oregon City, and Vancouver WA.",
  },
  {
    q: "How fast can you show up?",
    a: "We offer same-day service for calls placed before noon. Most pickups are completed within 2–4 hours of booking. Need it faster? Just ask — we'll do our best.",
  },
  {
    q: "What items do you NOT take?",
    a: "We can't haul hazardous materials like paint, chemicals, asbestos, or medical waste. Pretty much everything else is fair game. When in doubt, give us a call.",
  },
  {
    q: "Do I need to be home during pickup?",
    a: "Nope. As long as we can access the items and you've approved the quote, we'll get it done. We'll send a photo confirmation when the job's complete.",
  },
  {
    q: "How do I get a quote?",
    a: "Call or text us at (503) 555-0100, or fill out the form on this page. We typically respond within 15 minutes during business hours.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq" className="bg-dark py-24 sm:py-32 lg:py-40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          {/* Left — sticky header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
              Questions
            </p>
            <h2 className="font-clash font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[0.92] tracking-tight mb-6">
              <span className="text-stone">Everything</span>
              <br />
              <span className="text-stone">you need</span>
              <br />
              <span className="text-gold">to know.</span>
            </h2>
            <div className="w-12 h-px bg-gold/20 mb-6" />
            <p className="font-satoshi text-stone-dim/50 text-sm leading-relaxed max-w-xs mb-6">
              Still have questions? Call us at{" "}
              <a href="tel:+15035550100" className="text-gold/70 hover:text-gold transition-colors">
                (503) 555-0100
              </a>
            </p>
            <Link
              href="/contact"
              className="inline-block font-satoshi font-bold text-gold text-sm uppercase tracking-[0.15em] hover:text-gold-light transition-colors duration-300"
            >
              Have More Questions? Contact Us →
            </Link>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-8">
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
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   QUOTE FORM — proper contact form
   ═══════════════════════════════════════════════════════════════ */
function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SectionWrapper id="quote" className="bg-warm-gray py-24 sm:py-32 lg:py-44 px-6 lg:px-10 border-y border-white/[0.03] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,164,78,0.03) 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — CTA copy */}
          <div className="lg:col-span-5">
            <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-6">
              Get Started
            </p>
            <h2 className="font-clash font-bold text-4xl sm:text-5xl lg:text-[60px] leading-[0.9] tracking-tight mb-8">
              <span className="text-stone">Ready to</span>
              <br />
              <span className="text-gold">clear it out?</span>
            </h2>
            <div className="w-12 h-px bg-gold/20 mb-8" />
            <p className="font-satoshi text-stone-dim text-lg leading-relaxed mb-10">
              Fill out the form and we&apos;ll get back to you within 15 minutes
              during business hours. Or just call us — same-day slots go fast.
            </p>

            {/* Phone CTA */}
            <a
              href="tel:+15035550100"
              className="group flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-12 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 transition-colors duration-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="text-gold">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-clash font-bold text-gold text-xl group-hover:text-gold-light transition-colors">
                  (503) 555-0100
                </p>
                <p className="font-satoshi text-stone-dim/40 text-xs uppercase tracking-[0.1em]">
                  Call or text anytime
                </p>
              </div>
            </a>

            {/* Hours */}
            <div className="flex items-center gap-3 text-stone-dim/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
              <p className="font-satoshi text-xs uppercase tracking-[0.1em]">
                Mon–Sat · 7am–7pm
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-7">
            {!submitted ? (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="bg-dark border border-white/[0.04] p-8 lg:p-12"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="quote-name" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                        Your Name
                      </label>
                      <input
                        id="quote-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="John Smith"
                        required
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-phone" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                        Phone Number
                      </label>
                      <input
                        id="quote-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(503) 555-1234"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="quote-email" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                        Email (Optional)
                      </label>
                      <input
                        id="quote-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="john@email.com"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-service" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                        Service Type
                      </label>
                      <select id="quote-service" name="service" className="form-input" defaultValue="">
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

                  <div className="mb-6">
                    <label htmlFor="quote-message" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                      Tell Us About Your Job
                    </label>
                    <textarea
                      id="quote-message"
                      name="message"
                      placeholder="What do you need hauled? Any details help us quote faster."
                      rows={4}
                      className="form-input resize-none"
                    />
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap items-center justify-center gap-6 mb-6 py-4 border-y border-white/[0.04]">
                    {[
                      { icon: "✓", text: "Licensed & Insured" },
                      { icon: "✓", text: "No Obligation" },
                      { icon: "✓", text: "Response in 15 min" },
                    ].map((badge) => (
                      <div key={badge.text} className="flex items-center gap-2">
                        <span className="text-gold text-xs">{badge.icon}</span>
                        <span className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.1em]">
                          {badge.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="btn-magnetic w-full bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.18em] py-4 hover:bg-gold-light transition-colors duration-300 pulse-glow"
                  >
                    Get My Free Quote
                  </button>

                  <p className="font-satoshi text-stone-dim/30 text-xs text-center mt-5">
                    No spam, no obligation. We typically respond within 15 minutes.
                  </p>
                </form>
              ) : (
                <div className="bg-dark border border-gold/20 p-12 lg:p-16 text-center animate-fadeInUp">
                  <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A44E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-clash font-bold text-gold text-3xl mb-4">
                    Quote Requested
                  </h3>
                  <p className="font-satoshi text-stone-dim text-lg mb-8 max-w-sm mx-auto">
                    We&apos;ll be in touch within 15 minutes during business hours. Talk soon.
                  </p>
                  <a
                    href="tel:+15035550100"
                    className="font-satoshi text-gold/60 text-sm hover:text-gold transition-colors"
                  >
                    Can&apos;t wait? Call (503) 555-0100
                  </a>
                </div>
              )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FINAL CTA — dramatic last push
   ═══════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <SectionWrapper className="relative py-32 sm:py-40 lg:py-52 bg-dark overflow-hidden px-6">
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(200,164,78,0.04) 0%, transparent 60%)`,
        }}
      />
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="font-satoshi text-gold/50 uppercase tracking-[0.3em] text-[11px] mb-8">
          Let&apos;s Do This
        </p>
        <h2 className="font-clash font-bold text-stone text-4xl sm:text-6xl lg:text-[80px] leading-[0.92] tracking-[-0.02em] mb-6">
          Your space is waiting.
        </h2>
        <p className="font-satoshi text-stone-dim/50 text-lg sm:text-xl mb-14 max-w-lg mx-auto">
          One call. Same-day service. Gone before dinner.
        </p>
        <a
          href="tel:+15035550100"
          className="block font-clash font-bold text-gold text-4xl sm:text-6xl lg:text-[88px] tracking-tight mb-12 hover:text-gold-light transition-colors duration-500"
        >
          (503) 555-0100
        </a>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="btn-magnetic bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            Get a Free Quote
          </Link>
          <a
            href="tel:+15035550100"
            className="border border-white/[0.08] text-stone-dim font-satoshi font-medium text-sm uppercase tracking-[0.15em] px-10 py-4 hover:border-gold/30 hover:text-gold transition-all duration-500"
          >
            Call Now
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <ServiceAreas />
      <Process />
      <CrewStatement />
      <Services />
      <BeforeAfter />
      <Stats />
      <CrewPhoto />
      <MeetTheOwner />
      <Promise />
      <Testimonials />
      <FAQ />
      <QuoteForm />
      <FinalCTA />
    </main>
  );
}
