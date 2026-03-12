import Link from "next/link";
import { SERVICES, LOCATIONS, BUSINESS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-dark border-t border-white/[0.03] py-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Top section: Brand + Service Links + Location Links + Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 border border-gold/20 flex items-center justify-center">
                <span className="font-clash font-bold text-gold text-[8px]">JM</span>
              </div>
              <span className="font-clash font-bold text-stone/30 text-sm tracking-tight">
                THE JUNK MOOSE
              </span>
            </div>
            <p className="font-satoshi text-stone-dim/25 text-xs mb-4">
              Portland&apos;s trusted junk removal crew.
            </p>
            <address className="not-italic">
              <p className="font-satoshi text-stone-dim/30 text-xs">
                {BUSINESS.name}
              </p>
              <p className="font-satoshi text-stone-dim/25 text-xs leading-relaxed">
                {BUSINESS.city}, {BUSINESS.state} &middot; Serving the Metro Area
              </p>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="font-satoshi text-gold/40 text-xs hover:text-gold/70 transition-colors"
              >
                {BUSINESS.phone}
              </a>
            </address>
          </div>

          {/* Services Links */}
          <div>
            <p className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] mb-4">
              Services
            </p>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="font-satoshi text-stone-dim/40 text-xs hover:text-gold/70 transition-colors duration-200"
                  >
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Links */}
          <div>
            <p className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] mb-4">
              Locations
            </p>
            <ul className="space-y-2">
              {LOCATIONS.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/locations/${l.slug}`}
                    className="font-satoshi text-stone-dim/40 text-xs hover:text-gold/70 transition-colors duration-200"
                  >
                    {l.city}, {l.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links + Hours */}
          <div>
            <p className="font-satoshi text-stone-dim/50 text-[11px] uppercase tracking-[0.15em] mb-4">
              Company
            </p>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/about" className="font-satoshi text-stone-dim/40 text-xs hover:text-gold/70 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="font-satoshi text-stone-dim/40 text-xs hover:text-gold/70 transition-colors duration-200">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-satoshi text-stone-dim/40 text-xs hover:text-gold/70 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
            <p className="font-satoshi text-stone-dim/25 text-xs">
              {BUSINESS.hours}
            </p>
          </div>
        </div>

        {/* SEO keyword paragraph */}
        <p className="font-satoshi text-stone-dim/40 text-xs leading-relaxed mb-6 max-w-3xl">
          The Junk Moose is a Portland OR junk removal company offering same-day junk hauling,
          affordable furniture removal, construction debris removal, and yard waste cleanup.
          Proudly serving Portland, Beaverton, Gresham, Lake Oswego, Tigard, Hillsboro,
          Vancouver WA, Tualatin, Milwaukie, and Oregon City.
        </p>

        <div className="h-px bg-white/[0.03] mb-6" />

        {/* Legal row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-satoshi text-stone-dim/20 text-xs tracking-wide">
            &copy; 2025 The Junk Moose &middot; Portland, OR
          </span>
          <span className="font-satoshi text-stone-dim/20 text-xs tracking-wide">
            Built by{" "}
            <span className="text-gold/25 hover:text-gold/50 transition-colors cursor-pointer">
              LaunchedOps
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
