"use client";

import { usePersonalization } from "@/lib/personalization";
import { useEffect } from "react";
import Link from "next/link";

export default function PrivacyPage() {
  const biz = usePersonalization();

  useEffect(() => {
    document.title = `Privacy Policy | ${biz.name}`;
  }, [biz.name]);

  return (
    <div id="main-content" className="bg-dark px-6 lg:px-10 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
          Legal
        </p>
        <h1 className="font-clash font-bold text-3xl sm:text-4xl lg:text-5xl text-stone tracking-tight mb-8">
          Privacy Policy
        </h1>
        <p className="font-satoshi text-stone-dim/50 text-sm mb-12">
          Last updated: March 16, 2026
        </p>

        <div className="space-y-10 font-satoshi text-stone-dim text-base leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              {biz.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates this website.
              This Privacy Policy explains how we collect, use, and protect your personal information
              when you visit our site or submit a form.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Information We Collect
            </h2>
            <p className="mb-4">
              We only collect information that you voluntarily provide through our contact and quote
              request forms. This may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-stone-dim/80">
              <li>Your name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Address or service location</li>
              <li>Description of the junk removal service you need</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-4">We use the information you provide solely to:</p>
            <ul className="list-disc list-inside space-y-2 text-stone-dim/80">
              <li>Respond to your inquiry or quote request</li>
              <li>Schedule and provide junk removal services</li>
              <li>Follow up on completed jobs for quality assurance</li>
              <li>Send service-related communications (e.g., appointment confirmations)</li>
            </ul>
          </section>

          {/* No Data Sales */}
          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              We Never Sell Your Data
            </h2>
            <p>
              Your personal information is never sold, rented, or shared with third parties for
              marketing purposes. Period. We may share your information only with service providers
              who help us operate our business (e.g., our email provider), and they are bound by
              confidentiality obligations.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Cookies &amp; Analytics
            </h2>
            <p>
              This website uses minimal cookies for basic analytics (e.g., page views, traffic
              sources). We do not use cookies for advertising or tracking across other websites. No
              personal information is collected through cookies.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Data Security
            </h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized
              access, alteration, or destruction. Our website is served over HTTPS, and form
              submissions are transmitted securely.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your personal information at
              any time by contacting us using the information below. We will respond to your request
              within a reasonable timeframe.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-clash font-bold text-xl sm:text-2xl text-stone tracking-tight mb-4">
              Questions?
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, contact us:
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

          {/* Back link */}
          <div className="pt-6 border-t border-white/[0.04]">
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
