import Link from "next/link";

export function LocationCard({
  city,
  state,
  slug,
}: {
  city: string;
  state: string;
  slug: string;
}) {
  return (
    <Link
      href={`/locations/${slug}`}
      className="bg-dark border border-white/[0.04] p-6 lg:p-8 group hover:border-gold/10 transition-colors duration-500 block"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-clash font-bold text-stone text-lg group-hover:text-gold transition-colors duration-300">
            {city}
          </h3>
          <p className="font-satoshi text-stone-dim/40 text-xs uppercase tracking-[0.15em] mt-1">
            {state}
          </p>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-stone-dim/20 group-hover:text-gold/50 transition-all duration-500"
        >
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}
