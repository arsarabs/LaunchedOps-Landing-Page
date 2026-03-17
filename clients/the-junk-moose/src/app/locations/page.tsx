"use client";

import { LOCATIONS } from "@/lib/data";
import { usePersonalization } from "@/lib/personalization";
import { Breadcrumb, breadcrumbSchema } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { LocationCard } from "@/components/LocationCard";
import Link from "next/link";
import { useEffect } from "react";

const breadcrumbItems = [{ label: "Locations", href: "/locations" }];

export default function LocationsPage() {
  const biz = usePersonalization();

  useEffect(() => {
    document.title = `Junk Removal Near Me | ${biz.city} Metro Area | ${biz.name}`;
  }, [biz.name, biz.city]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(breadcrumbItems)),
        }}
      />
      <PageHero
        label="Service Areas"
        title="Junk Removal Near You"
        subtitle={`We serve the entire ${biz.city} metro area — 10 cities, same-day service, upfront pricing. Find your city below.`}
      />

      <section id="main-content" className="bg-dark px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          <div className="font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed max-w-4xl mb-14 space-y-4">
            <p>
              {biz.name} provides professional junk removal across the greater {biz.city}
              {" "}metropolitan area with the same fast, reliable service and
              honest upfront pricing. We handle everything from single-item furniture
              pickups to complete property cleanouts across {biz.city} and the surrounding area.
            </p>
            <p>
              No matter where you are in the {biz.city} metro, same-day junk removal is available
              for calls placed before noon. We know these communities inside and out — the
              neighborhoods, the disposal regulations, and the local facilities for recycling and
              donation. Whether you are in a downtown condo, a lakefront home,
              a tech office, or a rental property, our crew typically arrives
              within two to four hours of your call. We charge the same transparent rates across
              every service area with no travel fees or distance surcharges.
            </p>
            <p>
              With over {biz.jobsCompleted} jobs completed and a {biz.rating}-star
              rating from {biz.reviewCount}+ verified reviews, {biz.city} metro residents and
              businesses trust {biz.name} to get the job done right. We are licensed, insured,
              and committed to eco-friendly disposal — donating usable items to local charities and
              recycling materials whenever possible. Select your city below to learn more about our
              service in your area.{" "}
              <Link href="/reviews" className="text-gold hover:text-gold-light transition-colors">
                Read customer reviews
              </Link>.
            </p>
          </div>

          <div className="mb-14 flex flex-wrap gap-x-6 gap-y-2 font-satoshi text-sm">
            <Link href="/services" className="text-gold hover:text-gold-light transition-colors">
              View our full list of services &rarr;
            </Link>
            <Link href="/about" className="text-gold hover:text-gold-light transition-colors">
              Meet the crew &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => (
              <LocationCard
                key={loc.slug}
                city={loc.city}
                state={loc.state}
                slug={loc.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-warm-gray px-6 lg:px-10 py-20 lg:py-28 border-t border-white/[0.03]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
            Serving the entire metro area
          </p>
          <h2 className="font-clash font-bold text-stone text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            Don&rsquo;t See Your City?
          </h2>
          <p className="font-satoshi text-stone-dim text-lg leading-relaxed mb-10">
            We likely serve your area too. Give us a call at{" "}
            <a
              href={`tel:${biz.phoneRaw}`}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {biz.phone}
            </a>{" "}
            or fill out our contact form and we will let you know if we can get a crew to you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            Contact Us for a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
