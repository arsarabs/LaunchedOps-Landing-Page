"use client";

import { BUSINESS, LOCATIONS } from "@/lib/data";
import { usePersonalization } from "@/lib/personalization";
import { Breadcrumb, breadcrumbSchema } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";
import { useEffect } from "react";

const breadcrumbItems = [{ label: "About", href: "/about" }];

export default function AboutPage() {
  const biz = usePersonalization();

  useEffect(() => {
    document.title = `About ${biz.name} | ${biz.city}'s Local Junk Removal Crew`;
  }, [biz.name, biz.city]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcus",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: biz.name,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: biz.name,
    url: BUSINESS.url,
    telephone: biz.phone,
    areaServed: LOCATIONS.map((loc) => ({
      "@type": "City",
      name: `${loc.city}, ${loc.state}`,
    })),
    founder: {
      "@type": "Person",
      name: "Marcus",
    },
    foundingDate: "2023",
    description:
      `${biz.city}'s trusted local junk removal crew. Licensed, insured, and eco-friendly.`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: biz.rating,
      reviewCount: biz.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <PageHero
        label="About Us"
        title={`${biz.city}'s Local Junk Removal Crew`}
        subtitle="One truck, one crew, one mission — make junk disappear without the hassle or the hidden fees."
      />

      <div id="main-content" className="bg-dark px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          {/* ── Our Story ── */}
          <section className="mb-20 lg:mb-28">
            <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
              Our Story
            </p>
            <h2 className="font-clash font-bold text-3xl sm:text-4xl lg:text-5xl text-stone tracking-tight mb-8">
              Started With One Truck
            </h2>
            <div className="space-y-6 font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed max-w-3xl">
              <p>
                {biz.name} started the way most good things do — out of
                necessity. Marcus saw a gap in {biz.city}&apos;s junk removal
                market: most companies were either overpriced, unreliable, or
                both. So he bought a truck, printed some cards, and started
                hauling.
              </p>
              <p>
                That was {BUSINESS.yearsServing} years ago. Since then,
                we&apos;ve completed {biz.jobsCompleted} jobs across the
                {biz.city} metro area — from single-item pickups to
                full estate cleanouts. What started as one guy
                with a truck is now a tight-knit local crew that {biz.city} trusts.
              </p>
              <p>
                Marcus still answers the phone. He still shows up on jobs. And he
                still believes that junk removal should be simple: you call, we
                quote, we show up on time, and your stuff is gone. No games, no
                upsells, no surprises on the invoice.
              </p>
            </div>
            <div className="mt-10">
              <img
                src="/founder.jpg"
                alt={`Founder of ${biz.name} — local junk removal crew`}
                className="w-full h-auto"
                width={1200}
                height={800}
                loading="lazy"
              />
            </div>
          </section>

          {/* ── Our Crew ── */}
          <section className="mb-20 lg:mb-28">
            <div className="border border-black/[0.06] bg-warm-gray p-8 lg:p-12">
              <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
                Our Crew
              </p>
              <h2 className="font-clash font-bold text-2xl sm:text-3xl text-stone tracking-tight mb-6">
                In-House Team. Never Subcontracted.
              </h2>
              <div className="space-y-5 font-satoshi text-stone-dim text-base leading-relaxed max-w-3xl">
                <p>
                  Every person who shows up at your door works for {biz.name}{" "}
                  directly. We don&apos;t subcontract, we don&apos;t use day
                  labor, and we don&apos;t send strangers to your home. Our crew
                  is trained, background-checked, and knows how to handle
                  everything from a 400-pound piano to a garage packed floor to
                  ceiling.
                </p>
                <p>
                  We treat your property with respect — we lay down floor
                  protection, we don&apos;t ding your walls, and we sweep up when
                  the job is done. That&apos;s not a sales pitch. That&apos;s
                  just how we operate.
                </p>
              </div>
              <div className="mt-8">
                <img
                  src="/our-junk-removal-team.jpg"
                  alt="Professional junk removal crew ready for service"
                  className="w-full h-auto"
                  width={1200}
                  height={800}
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* ── Licensed & Insured ── */}
          <section className="mb-20 lg:mb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-sm font-bold">
                      &#10003;
                    </span>
                  </div>
                  <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight">
                    Licensed &amp; Insured
                  </h2>
                </div>
                <div className="space-y-4 font-satoshi text-stone-dim text-base leading-relaxed">
                  <p>
                    We carry full general liability insurance and hold all
                    required business licenses for the {biz.city} metro area. That
                    means you&apos;re protected from the moment we walk in the
                    door to the moment we drive away.
                  </p>
                  <p>
                    Every job is covered. Every crew member is insured. No
                    exceptions.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-sm font-bold">
                      &#9830;
                    </span>
                  </div>
                  <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight">
                    Eco-Friendly Disposal
                  </h2>
                </div>
                <div className="space-y-4 font-satoshi text-stone-dim text-base leading-relaxed">
                  <p>
                    Not everything we haul belongs in a landfill. We sort every
                    load and divert as much as possible to recycling centers,
                    composting facilities, and local charities.
                  </p>
                  <p>
                    Usable furniture gets donated. Metals get recycled. Yard
                    waste goes to composting. We do the extra work so your junk
                    has the smallest footprint possible.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Stats Bar ── */}
          <section className="mb-20 lg:mb-28">
            <div className="border-y border-black/[0.06] py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: biz.jobsCompleted, label: "Jobs Completed" },
                { value: `${BUSINESS.yearsServing}+`, label: `Years in ${biz.city}` },
                { value: biz.rating, label: "Google Rating" },
                { value: `${biz.reviewCount}+`, label: "Customer Reviews" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-clash font-bold text-gold text-3xl sm:text-4xl mb-1">
                    {stat.value}
                  </p>
                  <p className="font-satoshi text-stone-dim/50 text-xs uppercase tracking-[0.15em]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Cross-links ── */}
          <div className="mb-20 lg:mb-28 flex flex-wrap gap-x-6 gap-y-2 font-satoshi text-sm">
            <Link href="/locations" className="text-gold hover:text-gold-light transition-colors">
              See all the cities we serve &rarr;
            </Link>
            <Link href="/reviews" className="text-gold hover:text-gold-light transition-colors">
              Read what our customers say &rarr;
            </Link>
          </div>

          {/* ── CTA ── */}
          <section className="text-center">
            <h2 className="font-clash font-bold text-2xl sm:text-3xl text-stone tracking-tight mb-4">
              Ready to Get Rid of the Junk?
            </h2>
            <p className="font-satoshi text-stone-dim text-base mb-8 max-w-xl mx-auto">
              We serve {LOCATIONS.length} cities across the {biz.city} metro.
              Same-day service available for calls before noon.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-gold text-white font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-light transition-colors duration-300"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="inline-block border border-black/[0.1] text-stone font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:border-gold/30 hover:text-gold transition-colors duration-300"
              >
                View Services
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
