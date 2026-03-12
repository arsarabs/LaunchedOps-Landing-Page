import { LOCATIONS, BUSINESS } from "@/lib/data";
import { makeMetadata } from "@/lib/metadata";
import { Breadcrumb, breadcrumbSchema } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import { LocationCard } from "@/components/LocationCard";
import Link from "next/link";

export const metadata = makeMetadata({
  title: "Junk Removal Near Me | Portland Metro Area | The Junk Moose",
  description:
    "The Junk Moose serves 10 cities across the Portland metro area. Find fast, affordable junk removal near you — same-day service available in every location.",
  path: "/locations",
});

const breadcrumbItems = [{ label: "Locations", href: "/locations" }];

const localBusinessSchema = {
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.rating,
    reviewCount: BUSINESS.reviewCount,
    bestRating: "5",
    worstRating: "1",
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
  areaServed: LOCATIONS.map((loc) => ({
    "@type": "City",
    name: `${loc.city}, ${loc.state}`,
  })),
};

export default function LocationsPage() {
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
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <PageHero
        label="Service Areas"
        title="Junk Removal Near You"
        subtitle="We serve the entire Portland metro area — 10 cities, same-day service, upfront pricing. Find your city below."
      />

      <section className="bg-dark px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          <div className="font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed max-w-4xl mb-14 space-y-4">
            <p>
              {BUSINESS.name} provides professional junk removal across the greater Portland
              metropolitan area, covering 10 cities with the same fast, reliable service and
              honest upfront pricing. Our crew serves Portland, Beaverton, Gresham, Lake Oswego,
              Tigard, Hillsboro, Vancouver WA, Tualatin, Milwaukie, and Oregon City — handling
              everything from single-item furniture pickups to complete property cleanouts.
            </p>
            <p>
              No matter where you are in the Portland metro, same-day junk removal is available
              for calls placed before noon. We know these communities inside and out — the
              neighborhoods, the disposal regulations, and the local facilities for recycling and
              donation. Whether you are in a downtown Portland condo, a Lake Oswego lakefront home,
              a Hillsboro tech office, or a Gresham rental property, our crew typically arrives
              within two to four hours of your call. We charge the same transparent rates across
              every service area with no travel fees or distance surcharges.
            </p>
            <p>
              With over {BUSINESS.jobsCompleted} jobs completed and a {BUSINESS.rating}-star
              rating from {BUSINESS.reviewCount}+ verified reviews, Portland metro residents and
              businesses trust {BUSINESS.name} to get the job done right. We are licensed, insured,
              and committed to eco-friendly disposal — donating usable items to local charities and
              recycling materials whenever possible. Select your city below to learn more about our
              service in your area.
            </p>
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
              href={`tel:${BUSINESS.phoneRaw}`}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {BUSINESS.phone}
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
