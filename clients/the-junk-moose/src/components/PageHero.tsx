import Link from "next/link";

export function PageHero({
  label,
  title,
  subtitle,
  ctaText = "Get a Free Quote",
  ctaHref = "/contact",
}: {
  label: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-dark pt-28 pb-16 sm:pb-20 lg:pb-24 px-6 lg:px-10 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto">
        <p className="font-satoshi text-gold/60 uppercase tracking-[0.25em] text-[11px] mb-4">
          {label}
        </p>
        <h1 className="font-clash font-bold text-4xl sm:text-5xl lg:text-[64px] leading-[0.92] tracking-tight mb-6">
          <span className="text-stone">{title}</span>
        </h1>
        {subtitle && (
          <p className="font-satoshi text-stone-dim text-lg leading-relaxed max-w-2xl mb-8">
            {subtitle}
          </p>
        )}
        <Link
          href={ctaHref}
          className="inline-block bg-gold text-white font-satoshi font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-gold-light transition-colors duration-300"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
