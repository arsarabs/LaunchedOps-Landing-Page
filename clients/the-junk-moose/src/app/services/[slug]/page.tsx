import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, BUSINESS } from "@/lib/data";
import { makeMetadata } from "@/lib/metadata";
import { Breadcrumb, breadcrumbSchema } from "@/components/Breadcrumb";
import { FAQAccordion } from "@/components/FAQAccordion";
import { QuoteForm } from "@/components/QuoteForm";

/* ---------- Static params ---------- */

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

/* ---------- Dynamic metadata ---------- */

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return {};

  return makeMetadata({
    title: `${service.name} in Portland OR | ${BUSINESS.name}`,
    description: `${service.description} Professional ${service.name.toLowerCase()} across Portland OR and the metro area. Call ${BUSINESS.phone} for a free quote.`,
    path: `/services/${service.slug}`,
  });
}

/* ---------- Page component ---------- */

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  const crumbs = [
    { label: "Services", href: "/services" },
    { label: service.name, href: `/services/${service.slug}` },
  ];

  /* --- JSON-LD schemas --- */

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.longDescription,
    serviceType: service.shortName,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS.url}/#localbusiness`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: BUSINESS.url,
    },
    areaServed: {
      "@type": "City",
      name: "Portland",
      containedInPlace: { "@type": "State", name: "Oregon" },
    },
    url: `${BUSINESS.url}/services/${service.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = breadcrumbSchema(crumbs);

  return (
    <main className="bg-dark min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-dark pt-28 pb-16 sm:pb-20 lg:pb-24 px-6 lg:px-10 border-b border-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={crumbs} />

          <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
            {service.shortName}
          </p>
          <h1 className="font-clash font-bold text-4xl sm:text-5xl lg:text-[64px] leading-[0.92] tracking-tight mb-6">
            <span className="text-stone">{service.name}</span>{" "}
            <span className="text-gold">in Portland&nbsp;OR</span>
          </h1>
          <p className="font-satoshi text-stone-dim text-lg leading-relaxed max-w-2xl mb-8">
            {service.description}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      {/* Long description + Quote form */}
      <section className="bg-warm-gray px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="font-clash font-bold text-stone text-2xl sm:text-3xl mb-8">
              About This Service
            </h2>
            <p className="font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed">
              {service.longDescription}
            </p>

            {/* Link to locations */}
            <div className="mt-10 pt-8 border-t border-white/[0.04]">
              <p className="font-satoshi text-stone-dim/60 text-sm mb-3">
                We offer {service.name.toLowerCase()} across the Portland metro area.
              </p>
              <Link
                href="/locations"
                className="font-satoshi text-gold text-sm hover:text-gold-light transition-colors inline-flex items-center gap-2"
              >
                View all service areas
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
                Free estimate
              </p>
              <h3 className="font-clash font-bold text-stone text-xl mb-6">
                Get Your Quote
              </h3>
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="bg-dark px-6 lg:px-10 py-20 lg:py-28 border-t border-white/[0.03]">
        <div className="max-w-3xl mx-auto">
          <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
            Common questions
          </p>
          <h2 className="font-clash font-bold text-stone text-2xl sm:text-3xl mb-12">
            {service.shortName} FAQ
          </h2>
          <FAQAccordion faqs={service.faqs} />
        </div>
      </section>

      {/* Other Services */}
      <section className="bg-warm-gray px-6 lg:px-10 py-20 lg:py-28 border-t border-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
            More from {BUSINESS.name}
          </p>
          <h2 className="font-clash font-bold text-stone text-2xl sm:text-3xl mb-12">
            Other Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
            {otherServices.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="bg-dark p-8 lg:p-10 group hover:bg-warm-gray transition-all duration-500 relative overflow-hidden block border border-white/[0.03]"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gold/0 group-hover:bg-gold/30 transition-colors duration-500" />
                <div className="flex items-start justify-between mb-6">
                  <span className="font-clash font-bold text-gold/15 text-xs group-hover:text-gold/40 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-stone-dim/0 group-hover:text-gold/50 transition-all duration-500 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-clash font-bold text-stone text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                  {s.name}
                </h3>
                <p className="font-satoshi text-stone-dim/60 text-sm leading-relaxed">
                  {s.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/contact"
          className="bg-gold text-dark font-satoshi font-bold text-xs uppercase tracking-[0.15em] px-6 py-3 shadow-lg shadow-gold/20 hover:bg-gold-light transition-colors duration-300 flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Get Quote
        </Link>
      </div>
    </main>
  );
}
