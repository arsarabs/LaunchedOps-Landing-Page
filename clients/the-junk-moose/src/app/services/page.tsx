"use client";

import { SERVICES } from "@/lib/data";
import { usePersonalization } from "@/lib/personalization";
import { Breadcrumb, breadcrumbSchema } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import Link from "next/link";
import { useEffect } from "react";

const breadcrumbItems = [{ label: "Services", href: "/services" }];

export default function ServicesPage() {
  const biz = usePersonalization();

  useEffect(() => {
    document.title = `Junk Removal Services ${biz.city} ${biz.state} | ${biz.name}`;
  }, [biz.name, biz.city, biz.state]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What junk removal services does ${biz.name} offer?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${biz.name} offers six core services: Furniture & Appliance Removal, Construction Debris Removal, Yard Waste Removal, Full Property Cleanouts, Commercial Junk Removal, and Same-Day Junk Removal across ${biz.city} ${biz.state} and the surrounding metro area.`,
        },
      },
      {
        "@type": "Question",
        name: `Does ${biz.name} offer same-day junk removal?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Call or text before noon and we will have a crew at your location by end of day. No rush fees or premium charges for same-day service.",
        },
      },
      {
        "@type": "Question",
        name: `How much does junk removal cost in ${biz.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pricing depends on the volume and type of items. Single-item pickups typically run $75-$150, and a full truckload is usually $250-$500. We provide an exact upfront quote before any work begins.",
        },
      },
    ],
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main id="main-content" className="bg-dark min-h-screen">
        <PageHero
          label="Our Services"
          title="What We Haul"
          subtitle={`From a single couch to an entire property — ${biz.name} handles it all across ${biz.city} ${biz.state} and the surrounding metro area.`}
        />

        {/* Intro Content */}
        <section className="bg-dark px-6 lg:px-10 py-16 lg:py-20 border-b border-white/[0.03]">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="font-clash font-bold text-2xl sm:text-3xl text-stone tracking-tight mb-6">
              {biz.city}&rsquo;s Full-Service Junk Removal Team
            </h2>
            <div className="font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                {biz.name} provides comprehensive junk removal services across {biz.city}, {biz.state}
                {" "}and the entire metro area. Whether you need a single piece of furniture hauled away
                or an entire property cleared from top to bottom, our experienced crew handles every
                job with speed, professionalism, and transparent pricing. We have completed over{" "}
                {biz.jobsCompleted} jobs and maintain a {biz.rating}-star rating from{" "}
                {biz.reviewCount}+ verified customer reviews.
              </p>
              <p>
                {biz.city} homeowners and businesses trust {biz.name} because we do things
                differently. We offer same-day junk removal for calls placed before noon — no
                waiting days for a scheduled appointment. Every job starts with a free, upfront
                quote so you know exactly what you will pay before we lift a single item. There are
                no hidden fees, no surprise charges, and no bait-and-switch pricing. Our crew
                handles all the heavy lifting, loading, and cleanup so you do not have to touch a
                thing.
              </p>
              <p>
                We are also committed to eco-friendly disposal practices. Usable items are donated
                to local charities, recyclable materials are sorted and sent to proper
                facilities, and we dispose of everything else responsibly. From furniture and
                appliances to construction debris, yard waste, and commercial junk, {biz.name}{" "}
                is the only call you need to make. Available Monday through Saturday, 7am to 7pm.{" "}
                <Link href="/about" className="text-gold hover:text-gold-light transition-colors">
                  Meet the team behind every job
                </Link>.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-satoshi text-sm">
              <Link href="/reviews" className="text-gold hover:text-gold-light transition-colors">
                See what our customers say &rarr;
              </Link>
              <Link href="/locations" className="text-gold hover:text-gold-light transition-colors">
                View all service areas &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Crew Photo */}
        <div className="bg-dark px-6 lg:px-10 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <img
                src="/our-junk-removal-team.jpg"
                alt={`Professional junk removal crew ready for service in ${biz.city} ${biz.state}`}
                className="w-full h-auto"
                width={1200}
                height={800}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <section className="bg-warm-gray px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
              {SERVICES.map((service, i) => (
                <ServiceCard
                  key={service.slug}
                  num={String(i + 1).padStart(2, "0")}
                  name={service.name}
                  description={service.description}
                  slug={service.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-dark px-6 lg:px-10 py-20 lg:py-28 border-t border-white/[0.03]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
              Ready to get started?
            </p>
            <h2 className="font-clash font-bold text-stone text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Get Your Free Quote Today
            </h2>
            <p className="font-satoshi text-stone-dim text-lg leading-relaxed mb-10">
              Call us at{" "}
              <a
                href={`tel:${biz.phoneRaw}`}
                className="text-gold hover:text-gold-light transition-colors"
              >
                {biz.phone}
              </a>{" "}
              or fill out our contact form for a fast, no-obligation estimate.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Get a Free Quote
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
