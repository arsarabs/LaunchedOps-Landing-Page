import Link from "next/link";

export function ServiceCard({
  num,
  name,
  description,
  slug,
}: {
  num: string;
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className="bg-dark p-8 lg:p-10 group hover:bg-warm-gray transition-all duration-500 relative overflow-hidden block border border-black/[0.06]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/0 group-hover:bg-gold/30 transition-colors duration-500" />
      <div className="flex items-start justify-between mb-8">
        <span className="font-clash font-bold text-gold/15 text-sm group-hover:text-gold/40 transition-colors duration-500">
          {num}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-stone-dim/0 group-hover:text-gold/50 transition-all duration-500 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="font-clash font-bold text-stone text-xl mb-3 group-hover:text-gold transition-colors duration-300">
        {name}
      </h3>
      <p className="font-satoshi text-stone-dim/60 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
