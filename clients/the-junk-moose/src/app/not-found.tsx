import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | The Junk Moose",
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
        <p className="font-satoshi text-stone-dim leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <nav aria-label="Helpful links" className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="font-satoshi text-sm px-6 py-3 bg-gold text-dark font-semibold hover:bg-gold-light transition-colors"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="font-satoshi text-sm px-6 py-3 border border-gold/20 text-gold hover:border-gold/50 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/locations"
            className="font-satoshi text-sm px-6 py-3 border border-gold/20 text-gold hover:border-gold/50 transition-colors"
          >
            Locations
          </Link>
          <Link
            href="/contact"
            className="font-satoshi text-sm px-6 py-3 border border-gold/20 text-gold hover:border-gold/50 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </main>
  );
}
