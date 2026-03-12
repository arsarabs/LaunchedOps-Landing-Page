import { SERVICES, BUSINESS } from "@/lib/data";
import { makeMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata = makeMetadata({
  title: `Junk Removal Services Portland OR | ${BUSINESS.name}`,
  description: `Professional junk removal services in Portland OR. Furniture removal, construction debris, yard waste, full cleanouts, commercial hauling & same-day pickup. Call ${BUSINESS.phone} for a free quote.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="bg-dark min-h-screen">
      <PageHero
        label="Our Services"
        title="What We Haul"
        subtitle={`From a single couch to an entire property — ${BUSINESS.name} handles it all across Portland OR and the surrounding metro area.`}
      />

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
              href={`tel:${BUSINESS.phoneRaw}`}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {BUSINESS.phone}
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
  );
}
