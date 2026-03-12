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
  {
    name: "Jennifer M.",
    location: "Lake Oswego, OR",
    service: "Yard Waste",
    rating: 5,
    text: "We had two huge piles of branches and yard debris from a weekend of landscaping. The crew loaded everything in about 45 minutes and the yard looked amazing afterward. Price was exactly what they quoted — not a penny more. Will definitely use them again next spring.",
  },
  {
    name: "David R.",
    location: "Tigard, OR",
    service: "Full Property Cleanout",
    rating: 5,
    text: "My mother passed and we needed her entire house cleared out. The Junk Moose team was respectful, careful with the items we wanted to keep, and had the whole property empty in one day. They made an incredibly difficult time so much easier. Cannot recommend them enough.",
  },
  {
    name: "Chris P.",
    location: "Hillsboro, OR",
    service: "Furniture Removal",
    rating: 5,
    text: "Needed an old sectional sofa and a broken recliner hauled out of our basement. These things were heavy and awkward to move, but the crew got them out without scratching a single wall. Charged us $125 for both pieces — super fair. Fast and professional from start to finish.",
  },
  {
    name: "Amanda L.",
    location: "Vancouver, WA",
    service: "Same-Day Pickup",
    rating: 5,
    text: "I called at 10am on a Saturday expecting to wait until Monday. They showed up at 1pm the same day and hauled away an old hot tub, a busted dresser, and a pile of random garage junk. No rush fee either. Honestly the easiest home project I have ever done — because I did not have to do anything.",
  },
  {
    name: "Tom W.",
    location: "Tualatin, OR",
    service: "Appliance Removal",
    rating: 5,
    text: "Had a dead washer, dryer, and an old water heater sitting in the garage for months. The Junk Moose picked up all three in one trip. They disconnected the appliances, loaded them up, and were done in under 30 minutes. Great price and they recycled everything properly.",
  },
  {
    name: "Lisa H.",
    location: "Milwaukie, OR",
    service: "Commercial",
    rating: 5,
    text: "We run a small retail shop and needed old shelving, display cases, and a ton of cardboard cleared out after our renovation. The crew came after hours so it would not disrupt business and had everything gone by 9pm. Professional, on time, and priced very reasonably for the amount of stuff they took.",
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

          {/* ── Intro / Commitment Section ── */}
          <section className="mb-16 lg:mb-20 max-w-3xl">
            <h2 className="font-clash font-bold text-2xl sm:text-3xl text-stone tracking-tight mb-6">
              Our Commitment to Every Customer
            </h2>
            <div className="font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                At {BUSINESS.name}, customer satisfaction is not just a goal — it is the standard
                we hold ourselves to on every single job. With over {BUSINESS.jobsCompleted} jobs
                completed across the Portland metro area, we have built our reputation one pickup
                at a time through honest pricing, on-time arrivals, and crews that treat your
                property with respect. Every review below comes from a real customer and a real
                job. We are proud that Portland, Beaverton, Lake Oswego, Tigard, and communities
                across the metro continue to trust us with their junk removal needs.
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
