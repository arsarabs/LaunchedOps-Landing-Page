import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: `Page Not Found | ${BUSINESS.name}`,
  description: `The page you're looking for doesn't exist. Contact ${BUSINESS.name} for junk removal in ${BUSINESS.city} ${BUSINESS.state}.`,
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-dark">
      <div className="max-w-lg text-center">
        <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold/60 mb-4">
          404
        </p>
        <h1 className="font-clash text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="font-satoshi text-stone-dim leading-relaxed mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <p className="font-satoshi text-stone-dim/60 text-sm mb-10">
          Need junk removed? Call us at{" "}
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="text-gold hover:text-gold-light transition-colors font-medium"
          >
            {BUSINESS.phone}
          </a>
        </p>
        <nav aria-label="Helpful links" className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="font-satoshi text-sm px-6 py-3 bg-gold text-white font-semibold hover:bg-gold-light transition-colors min-h-[44px] flex items-center"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="font-satoshi text-sm px-6 py-3 border border-gold/20 text-gold hover:border-gold/50 transition-colors min-h-[44px] flex items-center"
          >
            Services
          </Link>
          <Link
            href="/locations"
            className="font-satoshi text-sm px-6 py-3 border border-gold/20 text-gold hover:border-gold/50 transition-colors min-h-[44px] flex items-center"
          >
            Locations
          </Link>
          <Link
            href="/contact"
            className="font-satoshi text-sm px-6 py-3 border border-gold/20 text-gold hover:border-gold/50 transition-colors min-h-[44px] flex items-center"
          >
            Get a Free Quote
          </Link>
        </nav>
      </div>
    </main>
  );
}
