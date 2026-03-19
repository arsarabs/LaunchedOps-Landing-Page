"use client";

import { usePersonalization } from "@/lib/personalization";
import { useEffect } from "react";
import Link from "next/link";

export default function TermsPage() {
  const biz = usePersonalization();

  useEffect(() => {
    document.title = `Terms of Service | ${biz.name}`;
  }, [biz.name]);

  return (
    <div id="main-content" className="bg-dark px-6 lg:px-10 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
          Legal
        </p>
        <h1 className="font-clash font-bold text-3xl sm:text-4xl lg:text-5xl text-stone tracking-tight mb-8">
          Terms of Service
        </h1>
        <p className="font-satoshi text-stone-dim/50 text-sm mb-12">
          Last updated: March 16, 2026
        </p>

        <div className="space-y-10 font-satoshi text-stone-dim text-base leading-relaxed">
          <section>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of the {biz.name} website
              and services. By using our website or requesting services, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Services
            </h2>
            <p>
              {biz.name} provides junk removal and hauling services in the {biz.city} metropolitan
              area. All services are subject to availability and our assessment of the job scope.
              We reserve the right to decline any job that involves hazardous materials, illegal
              items, or unsafe working conditions.
            </p>
          </section>

          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Pricing &amp; Payment
            </h2>
            <p className="mb-4">
              All quotes provided by {biz.name} are estimates based on the information you provide.
              Final pricing is confirmed on-site before any work begins. By approving an on-site
              quote, you agree to pay the quoted amount upon completion of the job.
            </p>
            <p>
              We accept cash, check, and major credit cards. Payment is due upon completion of
              service unless otherwise agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Scheduling &amp; Cancellation
            </h2>
            <p>
              We make every effort to arrive within the scheduled window. If you need to cancel or
              reschedule, please notify us at least 2 hours before your appointment. Repeated
              no-shows may result in a cancellation fee for future bookings.
            </p>
          </section>

          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Liability
            </h2>
            <p>
              {biz.name} carries general liability insurance. We take every precaution to protect
              your property during service. If damage occurs as a direct result of our work, we
              will work with you to resolve the issue promptly. Our liability is limited to the
              cost of repair or replacement of the damaged item, not to exceed the total service
              fee for the job.
            </p>
          </section>

          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Prohibited Items
            </h2>
            <p className="mb-4">
              We cannot remove hazardous materials including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-stone-dim/80">
              <li>Chemicals, solvents, and paints</li>
              <li>Asbestos-containing materials</li>
              <li>Medical or biohazardous waste</li>
              <li>Explosives or ammunition</li>
              <li>Radioactive materials</li>
            </ul>
          </section>

          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Website Use
            </h2>
            <p>
              This website is provided for informational purposes and to facilitate service
              requests. You agree not to misuse the website, submit false information through our
              forms, or attempt to interfere with the site&apos;s operation.
            </p>
          </section>

          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Changes to Terms
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of our website or
              services after changes are posted constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Contact
            </h2>
            <p className="mb-4">
              Questions about these Terms? Contact us:
            </p>
            <p className="text-stone-dim/80">
              <strong className="text-stone">{biz.name}</strong>
              <br />
              {biz.city}, {biz.state}
              <br />
              Phone:{" "}
              <a
                href={`tel:${biz.phoneRaw}`}
                className="text-gold hover:text-gold-light transition-colors"
              >
                {biz.phone}
              </a>
            </p>
          </section>

          <div className="pt-6 border-t border-black/[0.06]">
            <Link
              href="/"
              className="text-gold hover:text-gold-light transition-colors text-sm"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
