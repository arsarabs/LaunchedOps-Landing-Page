import { BUSINESS, LOCATIONS } from "@/lib/data";
import { makeMetadata } from "@/lib/metadata";
import { Breadcrumb, breadcrumbSchema } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import Link from "next/link";

export const metadata = makeMetadata({
  title: "Contact The Junk Moose | Free Junk Removal Quote Portland OR",
  description:
    "Get a free junk removal quote from The Junk Moose. Call (503) 555-0100 or fill out our form. Same-day service in Portland, Beaverton, Gresham, and the metro area. Mon-Sat 7am-7pm.",
  path: "/contact",
});

const breadcrumbItems = [{ label: "Contact", href: "/contact" }];

const contactPointSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  telephone: BUSINESS.phone,
  url: BUSINESS.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.state,
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
    telephone: BUSINESS.phone,
    contactType: "customer service",
    availableLanguage: "English",
    areaServed: LOCATIONS.map((loc) => ({
      "@type": "City",
      name: `${loc.city}, ${loc.state}`,
    })),
  },
};

export default function ContactPage() {
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
        ctaText={`Call ${BUSINESS.phone}`}
        ctaHref={`tel:${BUSINESS.phoneRaw}`}
      />

      <div className="bg-dark px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

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
                    {BUSINESS.name}
                  </p>
                  <p>
                    {BUSINESS.city}, {BUSINESS.state}
                  </p>
                  <p>
                    <a
                      href={`tel:${BUSINESS.phoneRaw}`}
                      className="text-gold hover:text-gold-light transition-colors"
                    >
                      {BUSINESS.phone}
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

              {/* Google Maps Placeholder */}
              <div className="border border-white/[0.04] bg-warm-gray p-6 text-center">
                {/* // TODO: requires Maps API key in server-side route */}
                <div className="h-48 flex items-center justify-center">
                  <p className="font-satoshi text-stone-dim/30 text-sm">
                    Google Maps embed coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Quick Contact Options ── */}
          <section className="mt-20 lg:mt-28 border-t border-white/[0.04] pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  label: "Call or Text",
                  value: BUSINESS.phone,
                  description: "Fastest way to get a quote",
                  href: `tel:${BUSINESS.phoneRaw}`,
                },
                {
                  label: "Same-Day Service",
                  value: "Before Noon",
                  description: "Call before noon for same-day pickup",
                  href: `tel:${BUSINESS.phoneRaw}`,
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
