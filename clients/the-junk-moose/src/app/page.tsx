"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { usePersonalization } from "@/lib/personalization";


/* ═══════════════════════════════════════════════════════════════
   HERO — editorial layout with background photo
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const biz = usePersonalization();
  return (
    <section className="relative flex flex-col justify-end bg-dark overflow-hidden pt-32 lg:pt-40 pb-16 lg:pb-24">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="/our-junk-removal-team.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          className="opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/95 to-dark/70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
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
              <span className="font-satoshi text-stone-dim text-xs font-medium tracking-wide">
                {biz.rating} rating · {biz.jobsCompleted} jobs completed
              </span>
            </div>

            <h1 className="font-clash font-bold text-[clamp(3.5rem,9vw,8rem)] leading-[0.88] tracking-[-0.03em] mb-10">
              <span className="block overflow-hidden">
                <span
                  className="block text-gold animate-heroText"
                  style={{ animationDelay: "0.15s" }}
                >
                  Your junk.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block text-stone/80 animate-heroText"
                  style={{ animationDelay: "0.25s" }}
                >
                  Gone today.
                </span>
              </span>
            </h1>
          </div>

          <div
            className="lg:col-span-4 flex flex-col justify-end mt-10 lg:mt-0 lg:pb-4 animate-fadeInUp"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed mb-8 max-w-sm">
              Same-day junk removal in {biz.city}. Upfront pricing, no
              surprises. Just space where your junk used to be.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#quote"
                className="btn-magnetic border-draw bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 hover:bg-gold-light transition-colors duration-300 text-center"
              >
                Get My Free Quote
              </a>
              <a
                href={`tel:${biz.phoneRaw}`}
                className="group border border-white/[0.08] text-stone font-satoshi font-medium text-sm uppercase tracking-[0.12em] px-8 py-4 hover:border-gold/30 hover:text-gold transition-all duration-500 text-center flex items-center justify-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                {biz.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICE AREAS — marquee with edge fade
   ═══════════════════════════════════════════════════════════════ */
const defaultAreas = [
  "Portland", "Beaverton", "Gresham", "Lake Oswego", "Tigard",
  "Hillsboro", "Vancouver WA", "Tualatin", "Milwaukie", "Oregon City",
];

function ServiceAreas() {
  const biz = usePersonalization();
  const areas = biz.city === "Portland"
    ? defaultAreas
    : [`${biz.city}`, `North ${biz.city}`, `South ${biz.city}`, `East ${biz.city}`, `West ${biz.city}`, `Downtown ${biz.city}`, `Greater ${biz.city}`, `${biz.city} Metro`];
  return (
    <section className="bg-dark border-b border-white/[0.03]">
      <div className="marquee-fade">
        <Marquee className="py-5">
          {areas.map((area) => (
            <span
              key={area}
              className="font-satoshi font-medium text-stone-dim/35 uppercase tracking-[0.3em] text-[10px] flex items-center gap-10 whitespace-nowrap"
            >
              {area}
              <span className="text-gold/15 text-[5px]">●</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROCESS — staircase / stepped layout (tight padding)
   ═══════════════════════════════════════════════════════════════ */
const processSteps = [
  {
    num: "01",
    title: "Call or Text",
    desc: "Reach out with what you need hauled. Photos help us quote faster.",
  },
  {
    num: "02",
    title: "Get Your Quote",
    desc: "Upfront price. What we quote is what you pay.",
  },
  {
    num: "03",
    title: "We Show Up",
    desc: "Crew arrives on time. You don't lift a finger.",
  },
  {
    num: "04",
    title: "It's Gone",
    desc: "Hauled, swept, photo confirmation sent.",
  },
];

function Process() {
  return (
    <SectionWrapper reveal="up" stagger className="bg-dark py-16 sm:py-20 lg:py-28 border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* No label — let the content speak */}
        <div className="space-y-0">
          {processSteps.map((step, i) => (
            <div
              key={step.num}
              className="group grid grid-cols-12 items-baseline border-b border-white/[0.03] last:border-b-0 py-8 lg:py-10"
              style={{ paddingLeft: `${i * 2}%` }}
            >
              <div className="col-span-2 sm:col-span-1">
                <span className="font-clash font-bold text-gold/[0.07] text-[4rem] sm:text-[5rem] leading-none group-hover:text-gold/[0.15] transition-colors duration-700">
                  {step.num}
                </span>
              </div>
              <div className="col-span-10 sm:col-span-4 lg:col-span-3">
                <h3 className="font-clash font-bold text-stone text-xl sm:text-2xl group-hover:text-gold transition-colors duration-300 group-hover:translate-x-2 transform">
                  {step.title}
                </h3>
              </div>
              <div className="hidden sm:block sm:col-span-7 lg:col-span-8">
                <p className="font-satoshi text-stone-dim/50 text-sm sm:text-base leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES — asymmetric bento with featured card
   ═══════════════════════════════════════════════════════════════ */
const services = [
  { num: "01", name: "Furniture & Appliances", desc: "Couches, fridges, washers, mattresses — all of it." },
  { num: "02", name: "Construction Debris", desc: "Drywall, lumber, concrete, tile. We handle the heavy stuff." },
  { num: "03", name: "Yard Waste", desc: "Branches, soil, stumps, clippings. Cleared in a single trip." },
  { num: "04", name: "Full Cleanouts", desc: "Hoarding, estate, foreclosure. Entire properties, no judgment." },
  { num: "05", name: "Commercial", desc: "Offices, retail spaces, warehouses. We work around your schedule." },
  { num: "06", name: "Same-Day Pickup", desc: "Call before noon. We'll be there by end of day." },
];

function Services() {
  return (
    <SectionWrapper id="services" reveal="up" className="bg-dark py-24 sm:py-32 lg:py-40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header — no label, just the headline and a note */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
          <h2 className="font-clash font-bold text-4xl sm:text-5xl lg:text-7xl leading-[0.88] tracking-[-0.03em] text-stone">
            If it fits in a truck,<br />
            <span className="text-gold">it&apos;s gone.</span>
          </h2>
          <p className="font-satoshi text-stone-dim/50 text-sm max-w-xs leading-relaxed lg:text-right">
            From a single couch to a full property cleanout. You point, we haul.
          </p>
        </div>

        {/* Asymmetric grid: first item spans 2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
          {services.map((service, i) => {
            const serviceData = SERVICES[i];
            const isFeatured = i === 0;
            return (
              <Link
                href={`/services/${serviceData?.slug ?? ""}`}
                key={service.num}
                className={`card-sweep bg-dark group transition-all duration-500 block relative ${
                  isFeatured ? "sm:col-span-2 lg:col-span-2 p-10 lg:p-14" : "p-8 lg:p-10"
                }`}
              >
                <div className="absolute top-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-700 ease-out-expo" />

                <div className="flex items-start justify-between mb-6 lg:mb-8">
                  <span className={`font-clash font-bold text-gold/[0.06] leading-none group-hover:text-gold/[0.15] transition-colors duration-500 ${
                    isFeatured ? "text-[100px] lg:text-[140px]" : "text-[60px] lg:text-[80px]"
                  }`}>
                    {service.num}
                  </span>
                </div>
                <h3 className={`font-clash font-bold text-stone mb-3 group-hover:text-gold group-hover:translate-x-2 transform transition-all duration-300 ${
                  isFeatured ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
                }`}>
                  {service.name}
                </h3>
                <p className={`font-satoshi text-stone-dim/50 leading-relaxed ${
                  isFeatured ? "text-base max-w-lg" : "text-sm"
                }`}>
                  {service.desc}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="link-underline inline-block font-satoshi font-bold text-gold text-sm uppercase tracking-[0.15em] hover:text-gold-light transition-colors duration-300"
          >
            View All Services
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BEFORE & AFTER — asymmetric photo layout (compact)
   ═══════════════════════════════════════════════════════════════ */
const beforeAfterPhotos = [
  {
    src: "/before-after-1.jpg",
    alt: "Before and after junk removal — garage cleanout",
    detail: "Single-family home · 1 truck load",
  },
  {
    src: "/before-after-2.jpg",
    alt: "Before and after property debris removal — estate cleanout",
    detail: "Estate cleanout · 2 truck loads",
  },
];

function BeforeAfter() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <SectionWrapper id="work" reveal="scale" className="bg-warm-gray py-16 sm:py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Minimal header — just two words, no label */}
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-clash font-bold text-3xl sm:text-4xl leading-[0.9] tracking-tight text-stone">
              Before. <span className="text-gold">After.</span>
            </h2>
            <span className="font-satoshi text-stone-dim/30 text-xs uppercase tracking-[0.15em] hidden sm:inline">
              Tap to enlarge
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            {beforeAfterPhotos.map((photo, i) => (
              <div
                key={photo.src}
                className={`overflow-hidden border border-white/[0.04] group hover:border-gold/10 transition-colors duration-500 cursor-pointer ${
                  i === 0 ? "lg:col-span-7" : "lg:col-span-5"
                }`}
                onClick={() => setLightboxSrc(photo.src)}
              >
                <div className={`relative w-full overflow-hidden ${
                  i === 0 ? "h-[300px] sm:h-[400px] lg:h-[460px]" : "h-[300px] sm:h-[400px] lg:h-[420px]"
                }`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="group-hover:scale-[1.02] transition-transform duration-700 ease-out-expo"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-dark/80 backdrop-blur-sm px-3 py-1">
                      <span className="font-satoshi text-[10px] font-medium tracking-widest uppercase text-stone-dim">Before</span>
                    </div>
                    <div className="bg-dark/80 backdrop-blur-sm px-3 py-1">
                      <span className="font-satoshi text-[10px] font-medium tracking-widest uppercase text-gold">After</span>
                    </div>
                  </div>
                </div>
                <div className="bg-dark/50 px-5 py-3">
                  <p className="font-satoshi text-stone-dim/25 text-[11px] uppercase tracking-[0.15em]">
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
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-satoshi text-stone-dim/30 text-xs uppercase tracking-[0.15em]">
            Tap anywhere to close
          </p>
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
   STATS — massive numbers, left-aligned labels (generous padding)
   ═══════════════════════════════════════════════════════════════ */
function Stats() {
  const biz = usePersonalization();
  return (
    <SectionWrapper reveal="blur" className="bg-dark py-32 sm:py-40 lg:py-56 px-6 lg:px-10 border-y border-white/[0.03] overflow-hidden">
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 sm:gap-10 lg:gap-0">
          <div className="lg:pr-20">
            <p className="font-satoshi text-stone-dim/40 text-[11px] uppercase tracking-[0.25em] mb-4">
              Jobs Completed
            </p>
            <div className="font-clash font-bold text-gold text-[4.5rem] sm:text-[8rem] lg:text-[12rem] leading-[0.8] tracking-tight">
              <NumberTicker value={500} />
              <span className="text-gold/15">+</span>
            </div>
          </div>

          <div className="lg:pl-20 lg:border-l lg:border-white/[0.04] flex flex-col justify-end">
            <p className="font-satoshi text-stone-dim/40 text-[11px] uppercase tracking-[0.25em] mb-4">
              Google Rating
            </p>
            <div className="font-clash font-bold text-gold text-[3.5rem] sm:text-[6rem] lg:text-[8rem] leading-[0.8] tracking-tight">
              <NumberTicker value={4.9} decimalPlaces={1} delay={0.2} />
            </div>
            <div className="flex gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#C8A44E" aria-hidden="true">
                  <path d="M10 1l2.39 4.84L17.3 6.7l-3.65 3.56.86 5.02L10 13.01l-4.51 2.37.86-5.02L2.7 6.8l4.91-.86L10 1z"/>
                </svg>
              ))}
              <span className="font-satoshi text-stone-dim/40 text-xs ml-2 self-center">
                {biz.reviewCount} reviews
              </span>
            </div>
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
        alt="Junk removal crew in front of truck"
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
   MEET THE OWNER — magazine spread, all-white headline
   ═══════════════════════════════════════════════════════════════ */
function MeetTheOwner() {
  const biz = usePersonalization();
  return (
    <SectionWrapper id="about" reveal="up" className="bg-warm-gray py-24 sm:py-32 lg:py-44 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — photo + name overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder.jpg"
                alt="Founder of the junk removal company"
                className="absolute inset-0 w-full h-full object-cover object-[center_top]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-gray via-transparent to-transparent" />
            </div>
            <div className="relative -mt-16 pl-6">
              <p className="font-clash font-bold text-gold text-2xl">Marcus</p>
              <p className="font-satoshi text-stone-dim/50 text-sm">Founder, {biz.name}</p>
            </div>
          </div>

          {/* Right — story (all-stone headline, breaking gold/stone pattern) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="font-clash font-bold text-4xl sm:text-5xl lg:text-6xl leading-[0.88] tracking-[-0.03em] mb-10 text-stone">
              One truck. One idea.<br />
              Still going.
            </h2>

            <div className="space-y-5 mb-10">
              <p className="font-satoshi text-stone-dim text-lg leading-[1.8]">
                {biz.name} started with one truck and a simple idea: show up on
                time, charge a fair price, and leave the place cleaner than you
                found it.
              </p>
              <p className="font-satoshi text-stone-dim/70 text-base leading-[1.8]">
                Every job is handled by our in-house team. Never subcontracted.
                Three years and {biz.jobsCompleted} jobs later, we&apos;re still doing
                exactly that.
              </p>
            </div>

            {/* Trust indicators — horizontal inline */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                "Licensed & Insured",
                "Locally Owned",
                "Eco-Friendly Disposal",
              ].map((item) => (
                <span
                  key={item}
                  className="font-satoshi text-stone-dim/40 text-xs uppercase tracking-[0.12em] flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/40" />
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#quote"
                className="btn-magnetic bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 hover:bg-gold-light transition-colors duration-300"
              >
                Get a Free Quote
              </a>
              <Link
                href="/about"
                className="link-underline font-satoshi font-bold text-gold text-sm uppercase tracking-[0.15em] py-4 hover:text-gold-light transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS — massive quotes, no label
   ═══════════════════════════════════════════════════════════════ */
function Testimonials() {
  const biz = usePersonalization();
  const testimonials = [
    {
      quote: "They showed up same day, cleared out my entire garage in under two hours. Price was exactly what they quoted.",
      name: "Mike T.",
      location: `${biz.city}, ${biz.state}`,
      detail: "Garage Cleanout",
    },
    {
      quote: "No other company would touch the pile of debris we had. These guys handled it without blinking.",
      name: "Sarah K.",
      location: `${biz.city}, ${biz.state}`,
      detail: "Construction Debris",
    },
  ];
  return (
    <SectionWrapper reveal="up" className="bg-dark py-28 sm:py-36 lg:py-52 px-6 lg:px-10 border-y border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        {/* No section label — the quotation mark IS the label */}
        <div className="space-y-20 lg:space-y-28">
          {testimonials.map((t) => (
            <div key={t.name}>
              <span
                className="font-clash font-bold text-gold/[0.04] text-[6rem] sm:text-[10rem] lg:text-[16rem] leading-none block -mb-12 sm:-mb-20 lg:-mb-32 select-none"
                style={{ mixBlendMode: "screen" }}
              >
                &ldquo;
              </span>
              <blockquote className="font-clash font-bold text-stone text-2xl sm:text-3xl lg:text-5xl leading-[1.15] tracking-tight max-w-5xl">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-10 h-px bg-gold/30" />
                <span className="font-satoshi text-gold/60 text-sm font-medium">{t.name}</span>
                <span className="text-stone-dim/15">—</span>
                <span className="font-satoshi text-stone-dim/30 text-sm">{t.location}</span>
                <span className="text-stone-dim/15 hidden sm:inline">·</span>
                <span className="font-satoshi text-stone-dim/20 text-sm hidden sm:inline">{t.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-20">
          <Link
            href="/reviews"
            className="link-underline inline-block font-satoshi font-bold text-gold text-sm uppercase tracking-[0.15em] hover:text-gold-light transition-colors duration-300"
          >
            Read All Reviews
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   QR REVIEW ROUTING — different structure: full-width card
   ═══════════════════════════════════════════════════════════════ */
function ReviewRouting() {
  const biz = usePersonalization();
  return (
    <SectionWrapper reveal="scale" className="bg-warm-gray py-16 sm:py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Full-width card layout — structurally different from other sections */}
        <div className="bg-dark border border-white/[0.04] p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <h2 className="font-clash font-bold text-3xl sm:text-4xl lg:text-5xl leading-[0.92] tracking-tight mb-6 text-stone">
                Get more 5-star reviews.
              </h2>
              <p className="font-satoshi text-stone-dim text-base leading-relaxed mb-6 max-w-lg">
                Every {biz.name} client gets a custom QR review card. One scan takes
                customers straight to your Google review page. More reviews, higher
                rankings, more calls.
              </p>
              <div className="flex gap-8">
                {["Scan", "Review", "Rank"].map((step, i) => (
                  <div key={step} className="flex items-baseline gap-2">
                    <span className="font-clash font-bold text-gold/20 text-xl">{i + 1}</span>
                    <span className="font-clash font-bold text-stone text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-warm-gray border border-white/[0.04] p-8 text-center">
                <div className="w-36 h-36 bg-white mx-auto mb-4 flex items-center justify-center">
                  <div className="w-28 h-28 bg-dark/10 flex items-center justify-center">
                    <span className="font-satoshi text-dark/30 text-xs uppercase tracking-widest">QR Code</span>
                  </div>
                </div>
                <p className="font-satoshi text-stone-dim/30 text-xs">
                  Included free with every site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAQ — sticky left, accordion right
   ═══════════════════════════════════════════════════════════════ */
function FAQ() {
  const biz = usePersonalization();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How much does junk removal cost?",
      a: "Pricing depends on the volume and type of items. We give free, no-obligation quotes upfront — what we quote is what you pay. Most single-truck loads run between $250–$500.",
    },
    {
      q: "Do you serve my area?",
      a: `We cover all of ${biz.city} and the surrounding metro area. If you're nearby, we can get to you.`,
    },
    {
      q: "How fast can you show up?",
      a: "We offer same-day service for calls placed before noon. Most pickups are completed within 2–4 hours of booking.",
    },
    {
      q: "What items do you NOT take?",
      a: "We can't haul hazardous materials like paint, chemicals, asbestos, or medical waste. Pretty much everything else is fair game.",
    },
    {
      q: "Do I need to be home during pickup?",
      a: "Nope. As long as we can access the items and you've approved the quote, we'll get it done. We send a photo confirmation when complete.",
    },
    {
      q: "How do I get a quote?",
      a: `Call or text us at ${biz.phone}, or fill out the form on this page. We typically respond within 15 minutes.`,
    },
  ];

  return (
    <SectionWrapper id="faq" reveal="up" className="bg-dark py-24 sm:py-32 lg:py-40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          {/* Left — sticky, no label, just a question */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-clash font-bold text-4xl sm:text-5xl leading-[0.92] tracking-tight mb-6 text-stone">
              Questions?
            </h2>
            <p className="font-satoshi text-stone-dim/40 text-sm leading-relaxed max-w-xs">
              Or just call{" "}
              <a href={`tel:${biz.phoneRaw}`} className="text-gold/60 hover:text-gold transition-colors">
                {biz.phone}
              </a>
            </p>
          </div>

          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <div key={i} className={`border-b border-white/[0.04] ${openIndex === i ? "border-l-2 border-l-gold/30 pl-4" : "border-l-2 border-l-transparent pl-4"} transition-all duration-300`}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-satoshi font-medium text-stone text-base sm:text-lg group-hover:text-gold transition-colors duration-300 pr-4">
                    {faq.q}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 text-gold/30 group-hover:text-gold/60 transition-all duration-300 ${openIndex === i ? "rotate-180" : "rotate-0"}`}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-350 ease-out-expo ${openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="font-satoshi text-stone-dim text-base pb-6 leading-relaxed max-w-xl">
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
   QUOTE — merged closer (tight padding top, generous bottom)
   ═══════════════════════════════════════════════════════════════ */
function QuoteSection() {
  const biz = usePersonalization();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (honeypotRef.current?.value) return;
    setSubmitted(true);
    router.push("/thank-you");
  };

  return (
    <SectionWrapper id="quote" reveal="up" className="bg-warm-gray py-20 sm:py-28 lg:py-36 px-6 lg:px-10 border-t border-white/[0.03] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-clash font-bold text-4xl sm:text-5xl lg:text-6xl leading-[0.88] tracking-[-0.03em] mb-8 text-stone">
                Ready?
              </h2>
              <p className="font-satoshi text-stone-dim text-base leading-relaxed mb-10 max-w-sm">
                Fill out the form or call us directly. Same-day slots go fast.
              </p>
            </div>

            <div>
              <a
                href={`tel:${biz.phoneRaw}`}
                className="block font-clash font-bold text-gold text-[clamp(2rem,7vw,4.5rem)] leading-none tracking-tight hover:text-gold-light transition-colors duration-500 mb-6"
              >
                {biz.phone}
              </a>
              <div className="flex items-center gap-3 text-stone-dim/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                <p className="font-satoshi text-xs uppercase tracking-[0.1em]">
                  Mon–Sat · 7am–7pm
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {!submitted ? (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-dark border border-white/[0.04] p-8 lg:p-12"
              >
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="hp-website">Website</label>
                  <input
                    id="hp-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    ref={honeypotRef}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="quote-name" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                      Your Name
                    </label>
                    <input id="quote-name" name="name" type="text" autoComplete="name" placeholder="John Smith" required className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="quote-phone" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                      Phone Number
                    </label>
                    <input id="quote-phone" name="phone" type="tel" autoComplete="tel" placeholder="(503) 555-1234" required className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="quote-email" className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] block mb-2">
                      Email (Optional)
                    </label>
                    <input id="quote-email" name="email" type="email" autoComplete="email" placeholder="john@email.com" className="form-input" />
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
                  <textarea id="quote-message" name="message" placeholder="What do you need hauled? Any details help us quote faster." rows={4} className="form-input resize-none" />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mb-6 py-4 border-y border-white/[0.04]">
                  {["Licensed & Insured", "No Obligation", "Response in 15 min"].map((badge) => (
                    <div key={badge} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold/40" />
                      <span className="font-satoshi text-stone-dim/40 text-[11px] uppercase tracking-[0.1em]">{badge}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="btn-magnetic w-full bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.18em] py-4 hover:bg-gold-light transition-colors duration-300"
                >
                  Get My Free Quote
                </button>

                <p className="font-satoshi text-stone-dim/25 text-xs text-center mt-5">
                  No spam. We typically respond within 15 minutes.
                </p>
              </form>
            ) : (
              <div className="bg-dark border border-gold/20 p-12 lg:p-16 text-center animate-fadeInUp">
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-8">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A44E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-clash font-bold text-gold text-3xl mb-4">Quote Requested</h3>
                <p className="font-satoshi text-stone-dim text-lg mb-8 max-w-sm mx-auto">
                  We&apos;ll be in touch within 15 minutes during business hours.
                </p>
                <a href={`tel:${biz.phoneRaw}`} className="font-satoshi text-gold/60 text-sm hover:text-gold transition-colors">
                  Can&apos;t wait? Call {biz.phone}
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
   PAGE COMPOSITION — 11 sections, varied rhythm
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <ServiceAreas />
      <Process />
      <Services />
      <BeforeAfter />
      <Stats />
      <CrewPhoto />
      <MeetTheOwner />
      <Testimonials />
      <ReviewRouting />
      <FAQ />
      <QuoteSection />
    </main>
  );
}
