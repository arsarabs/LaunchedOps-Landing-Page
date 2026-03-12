import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS, SERVICES, BUSINESS } from "@/lib/data";
import { makeMetadata } from "@/lib/metadata";
import { Breadcrumb, breadcrumbSchema } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { QuoteForm } from "@/components/QuoteForm";

/* ── Static params for all location slugs ── */
export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

/* ── Dynamic metadata per location ── */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const location = LOCATIONS.find((l) => l.slug === params.slug);
  if (!location) return {};

  return makeMetadata({
    title: `${location.city} Junk Removal | Same-Day Service | ${BUSINESS.name}`,
    description: `Professional junk removal in ${location.city}, ${location.state}. Same-day pickup, upfront pricing, and eco-friendly disposal. Serving ${location.neighborhoods}. Call ${BUSINESS.phone} for a free quote.`,
    path: `/locations/${location.slug}`,
  });
}

/* ── JSON-LD schemas ── */
function localBusinessSchema(location: (typeof LOCATIONS)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    description: `Professional junk removal services in ${location.city}, ${location.state}. Fast, affordable, and eco-friendly hauling for residential and commercial customers.`,
    url: `${BUSINESS.url}/locations/${location.slug}`,
    telephone: BUSINESS.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
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
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "Place",
      name: `${location.city}, ${location.state}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating,
      reviewCount: BUSINESS.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
  };
}

function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/* ── Page component ── */
export default function LocationPage({
  params,
}: {
  params: { slug: string };
}) {
  const location = LOCATIONS.find((l) => l.slug === params.slug);
  if (!location) notFound();

  const crumbs = [
    { label: "Locations", href: "/locations" },
    { label: location.city, href: `/locations/${location.slug}` },
  ];

  const schemas = [
    localBusinessSchema(location),
    faqPageSchema(location.faqs),
    breadcrumbSchema(crumbs),
  ];

  return (
    <>
      {/* JSON-LD structured data */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageHero
        label={`${location.city}, ${location.state}`}
        title={`Junk Removal in ${location.city}`}
        subtitle={`Same-day junk removal for homes and businesses across ${location.city}. Upfront pricing, no hidden fees.`}
      />

      <section id="main-content" className="bg-dark px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={crumbs} />

          {/* ── Description ── */}
          <div className="max-w-3xl mb-20">
            <h2 className="font-clash font-bold text-stone text-2xl sm:text-3xl mb-6">
              {BUSINESS.name} Serves {location.city}
            </h2>
            <p className="font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed">
              {location.description}
            </p>
          </div>

          {/* ── Neighborhoods ── */}
          <div className="mb-20">
            <h2 className="font-clash font-bold text-stone text-xl sm:text-2xl mb-6">
              Neighborhoods We Serve in {location.city}
            </h2>
            <div className="flex flex-wrap gap-3">
              {location.neighborhoods.split(", ").map((hood) => (
                <span
                  key={hood}
                  className="font-satoshi text-stone-dim text-sm bg-white/[0.03] border border-white/[0.06] px-4 py-2"
                >
                  {hood}
                </span>
              ))}
            </div>
          </div>

          {/* ── FAQs ── */}
          <div className="mb-20">
            <h2 className="font-clash font-bold text-stone text-xl sm:text-2xl mb-8">
              {location.city} Junk Removal FAQ
            </h2>
            <FAQAccordion faqs={location.faqs} />
          </div>

          {/* ── Services available ── */}
          <div className="mb-20">
            <h2 className="font-clash font-bold text-stone text-xl sm:text-2xl mb-8">
              Services Available in {location.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="bg-dark border border-white/[0.04] p-6 group hover:border-gold/10 transition-colors duration-500 block"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-clash font-bold text-stone text-base group-hover:text-gold transition-colors duration-300">
                      {service.shortName}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-stone-dim/20 group-hover:text-gold/50 transition-all duration-500"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Quote form ── */}
          <div className="max-w-2xl mb-20">
            <h2 className="font-clash font-bold text-stone text-xl sm:text-2xl mb-6">
              Get a Free Quote in {location.city}
            </h2>
            <p className="font-satoshi text-stone-dim text-base mb-8">
              Ready to get rid of your junk? Fill out the form below and
              we&apos;ll get back to you within 15 minutes during business hours.
            </p>
            <QuoteForm compact />
          </div>

          {/* ── Navigation links ── */}
          <div className="flex flex-wrap items-center gap-6 pt-10 border-t border-white/[0.04]">
            <Link
              href="/"
              className="font-satoshi text-gold/60 text-sm hover:text-gold transition-colors duration-300"
            >
              &larr; Back to Home
            </Link>
            <Link
              href="/locations"
              className="font-satoshi text-gold/60 text-sm hover:text-gold transition-colors duration-300"
            >
              All Locations
            </Link>
            <Link
              href="/about"
              className="font-satoshi text-gold/60 text-sm hover:text-gold transition-colors duration-300"
            >
              Learn about our team
            </Link>
            <Link
              href="/reviews"
              className="font-satoshi text-gold/60 text-sm hover:text-gold transition-colors duration-300"
            >
              See customer reviews
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
