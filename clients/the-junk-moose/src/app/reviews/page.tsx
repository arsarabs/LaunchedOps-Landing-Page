import { BUSINESS } from "@/lib/data";
import { makeMetadata } from "@/lib/metadata";
import { Breadcrumb, breadcrumbSchema } from "@/components/Breadcrumb";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";

export const metadata = makeMetadata({
  title: "Customer Reviews | The Junk Moose Portland Junk Removal",
  description:
    "See what Portland homeowners say about The Junk Moose. 4.9-star rating from 500+ verified reviews. Read real testimonials from our junk removal customers.",
  path: "/reviews",
});

const breadcrumbItems = [{ label: "Reviews", href: "/reviews" }];

const testimonials = [
  {
    name: "Mike T.",
    location: "Portland, OR",
    service: "Garage Cleanout",
    rating: 5,
    text: "Called at 9am, they were here by noon. Cleared out my entire garage — old furniture, boxes, a broken treadmill — in under two hours. Fair price, no surprises. These guys are the real deal.",
  },
  {
    name: "Sarah K.",
    location: "Beaverton, OR",
    service: "Construction Debris",
    rating: 5,
    text: "Had a mountain of drywall and lumber from our kitchen remodel. The Junk Moose crew showed up on time, loaded everything up, and even swept the driveway. Way better than renting a dumpster.",
  },
];

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  telephone: BUSINESS.phone,
  url: BUSINESS.url,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.rating,
    reviewCount: BUSINESS.reviewCount,
    bestRating: "5",
    worstRating: "1",
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: "5",
    },
    reviewBody: t.text,
  })),
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-gold" : "text-white/10"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
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
          __html: JSON.stringify(aggregateRatingSchema),
        }}
      />

      <PageHero
        label="Customer Reviews"
        title="What Portland Says About Us"
        subtitle={`${BUSINESS.rating}-star rating from ${BUSINESS.reviewCount}+ verified reviews. We let our work speak for itself.`}
      />

      <div className="bg-dark px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          {/* ── Aggregate Rating Summary ── */}
          <section className="mb-16 lg:mb-20 text-center">
            <div className="border border-white/[0.04] bg-warm-gray p-8 lg:p-12 inline-block w-full max-w-md mx-auto">
              <p className="font-clash font-bold text-gold text-5xl sm:text-6xl mb-2">
                {BUSINESS.rating}
              </p>
              <div className="flex justify-center mb-3">
                <Stars count={5} />
              </div>
              <p className="font-satoshi text-stone-dim text-sm">
                Based on{" "}
                <span className="text-stone font-medium">
                  {BUSINESS.reviewCount}+
                </span>{" "}
                verified Google reviews
              </p>
            </div>
          </section>

          {/* ── Testimonials ── */}
          <section className="mb-20 lg:mb-28">
            <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
              What Our Customers Say
            </p>
            <h2 className="font-clash font-bold text-2xl sm:text-3xl text-stone tracking-tight mb-10">
              Real Reviews From Real Jobs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {testimonials.map((review) => (
                <div
                  key={review.name}
                  className="border border-white/[0.04] bg-warm-gray p-6 lg:p-8"
                >
                  <Stars count={review.rating} />
                  <p className="font-satoshi text-stone text-base leading-relaxed mt-4 mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="border-t border-white/[0.04] pt-4">
                    <p className="font-clash font-bold text-stone text-sm">
                      {review.name}
                    </p>
                    <p className="font-satoshi text-stone-dim/50 text-xs mt-0.5">
                      {review.location} &middot; {review.service}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Leave a Review ── */}
          <section className="mb-20 lg:mb-28">
            <div className="border border-gold/10 bg-warm-gray p-8 lg:p-12 text-center">
              <h2 className="font-clash font-bold text-2xl sm:text-3xl text-stone tracking-tight mb-4">
                Leave Us a Review
              </h2>
              <p className="font-satoshi text-stone-dim text-base leading-relaxed max-w-lg mx-auto mb-6">
                Had a great experience with {BUSINESS.name}? We&apos;d love to
                hear about it. Your review helps other Portland homeowners find
                reliable junk removal.
              </p>
              {/* // TODO: embed Google Reviews widget — requires Google Places API key in server-side API route only */}
              <p className="font-satoshi text-stone-dim/40 text-sm">
                Google Reviews widget coming soon
              </p>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="text-center">
            <h2 className="font-clash font-bold text-2xl sm:text-3xl text-stone tracking-tight mb-4">
              See Why Portland Trusts The Moose
            </h2>
            <p className="font-satoshi text-stone-dim text-base mb-8 max-w-xl mx-auto">
              {BUSINESS.jobsCompleted} jobs done. {BUSINESS.rating}-star rating.
              Get your free quote and see the difference.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold text-dark font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Get a Free Quote
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
