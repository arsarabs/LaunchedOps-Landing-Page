"use client";

import { BUSINESS, LOCATIONS } from "@/lib/data";
import { usePersonalization } from "@/lib/personalization";
import { Breadcrumb, breadcrumbSchema } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import Link from "next/link";
import { useEffect } from "react";

const breadcrumbItems = [{ label: "Contact", href: "/contact" }];

export default function ContactPage() {
  const biz = usePersonalization();

  useEffect(() => {
    document.title = `Contact ${biz.name} | Free Junk Removal Quote ${biz.city} ${biz.state}`;
  }, [biz.name, biz.city, biz.state]);

  const contactPointSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: biz.name,
    telephone: biz.phone,
    url: BUSINESS.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: biz.city,
      addressRegion: biz.state,
      postalCode: BUSINESS.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "19:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: biz.phone,
      contactType: "customer service",
      availableLanguage: "English",
      areaServed: LOCATIONS.map((loc) => ({
        "@type": "City",
        name: `${loc.city}, ${loc.state}`,
      })),
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPointSchema),
        }}
      />

      <PageHero
        label="Contact Us"
        title="Get Your Free Quote"
        subtitle="Call, text, or fill out the form. We respond within 15 minutes during business hours."
        ctaText={`Call ${biz.phone}`}
        ctaHref={`tel:${biz.phoneRaw}`}
      />

      <div id="main-content" className="bg-dark px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          {/* ── What to Expect ── */}
          <section className="mb-16 lg:mb-20">
            <h2 className="font-clash font-bold text-2xl sm:text-3xl text-stone tracking-tight mb-6">
              What Happens When You Reach Out
            </h2>
            <div className="font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed space-y-4 max-w-3xl">
              <p>
                When you contact {biz.name}, getting your junk removed is straightforward and
                stress-free. Here is exactly how it works from start to finish. First, give us a
                call or text at{" "}
                <a
                  href={`tel:${biz.phoneRaw}`}
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  {biz.phone}
                </a>
                , or fill out the quote form below with a brief description of what you need hauled.
                Our team typically responds within 15 minutes during business hours — no waiting
                around for a callback that never comes.
              </p>
              <p>
                Next, we provide a free, no-obligation quote based on the volume and type of items.
                The price we quote is the price you pay — no hidden fees, no surprise charges on
                the day of pickup. Once you approve the quote, we schedule your pickup at a time
                that works for you. Need it gone today? Call before noon for same-day service at no
                extra charge.
              </p>
              <p>
                On pickup day, our crew arrives on time and handles all the heavy lifting, loading,
                and cleanup. You do not need to move a single item — just point to what goes and
                we take care of the rest. We sweep up when we are done and send you a photo
                confirmation once the job is complete. The entire process, from your first call to
                a clean space, is designed to be as fast and painless as possible. That is the{" "}
                {biz.name} difference.{" "}
                <Link href="/about" className="text-gold hover:text-gold-light transition-colors">
                  Learn about our team
                </Link>.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-satoshi text-sm">
              <Link href="/reviews" className="text-gold hover:text-gold-light transition-colors">
                Read customer reviews &rarr;
              </Link>
              <Link href="/locations" className="text-gold hover:text-gold-light transition-colors">
                View service areas &rarr;
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ── Quote Form (left / top) ── */}
            <div className="lg:col-span-3">
              <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
                Request a Quote
              </p>
              <h2 className="font-clash font-bold text-2xl sm:text-3xl text-stone tracking-tight mb-6">
                Tell Us About Your Job
              </h2>
              <QuoteForm />
            </div>

            {/* ── Contact Info (right / bottom) ── */}
            <div className="lg:col-span-2 space-y-10">
              {/* NAP Block */}
              <div>
                <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
                  Contact Info
                </p>
                <address className="not-italic space-y-3 font-satoshi text-stone-dim text-base">
                  <p className="font-clash font-bold text-stone text-lg">
                    {biz.name}
                  </p>
                  <p>{BUSINESS.street}</p>
                  <p>
                    {biz.city}, {biz.state} {BUSINESS.zip}
                  </p>
                  <p>
                    <a
                      href={`tel:${biz.phoneRaw}`}
                      className="text-gold hover:text-gold-light transition-colors"
                    >
                      {biz.phone}
                    </a>
                  </p>
                </address>
              </div>

              {/* Business Hours */}
              <div>
                <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
                  Business Hours
                </p>
                <div className="space-y-2 font-satoshi text-stone-dim text-base">
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span>Monday &ndash; Saturday</span>
                    <span className="text-stone">7am &ndash; 7pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-stone-dim/50">Closed</span>
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div>
                <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
                  Service Area
                </p>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS.map((loc) => (
                    <span
                      key={loc.slug}
                      className="font-satoshi text-stone-dim/60 text-xs border border-white/[0.04] px-3 py-1.5"
                    >
                      {loc.city}, {loc.state}
                    </span>
                  ))}
                </div>
              </div>

              {/* Crew Photo */}
              <div>
                <img
                  src="/our-junk-removal-team.jpg"
                  alt="Professional junk removal crew — call for a free quote"
                  className="w-full h-auto"
                  width={1200}
                  height={800}
                  loading="lazy"
                />
              </div>

              {/* Google Maps Embed */}
              <div className="border border-white/[0.04] bg-warm-gray overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178840.29886498798!2d-122.7964858!3d45.5428372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sPortland%2C%20OR!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${biz.name} service area — ${biz.city} ${biz.state} metro`}
                />
              </div>
            </div>
          </div>

          {/* ── Quick Contact Options ── */}
          <section className="mt-20 lg:mt-28 border-t border-white/[0.04] pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  label: "Call or Text",
                  value: biz.phone,
                  description: "Fastest way to get a quote",
                  href: `tel:${biz.phoneRaw}`,
                },
                {
                  label: "Same-Day Service",
                  value: "Before Noon",
                  description: "Call before noon for same-day pickup",
                  href: `tel:${biz.phoneRaw}`,
                },
                {
                  label: "Response Time",
                  value: "15 Minutes",
                  description: "During business hours, Mon-Sat",
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-white/[0.04] bg-warm-gray p-6 text-center"
                >
                  <p className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] mb-2">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-clash font-bold text-gold text-xl hover:text-gold-light transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-clash font-bold text-gold text-xl">
                      {item.value}
                    </p>
                  )}
                  <p className="font-satoshi text-stone-dim/40 text-xs mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Back Links ── */}
          <section className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-block border border-white/[0.08] text-stone font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:border-gold/30 hover:text-gold transition-colors duration-300"
              >
                Back to Home
              </Link>
              <Link
                href="/services"
                className="inline-block border border-white/[0.08] text-stone font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:border-gold/30 hover:text-gold transition-colors duration-300"
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
