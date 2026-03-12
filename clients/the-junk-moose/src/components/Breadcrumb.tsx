import Link from "next/link";
import { BUSINESS } from "@/lib/data";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="font-satoshi text-xs text-stone-dim/40 mb-8">
      <ol className="flex items-center gap-2 flex-wrap">
        {allItems.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 && <span className="text-gold/20">/</span>}
            {i < allItems.length - 1 ? (
              <Link href={item.href} className="hover:text-gold/60 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-stone-dim/60">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  const allItems = [{ label: "Home", href: BUSINESS.url }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href.startsWith("http") ? item.href : `${BUSINESS.url}${item.href}`,
    })),
  };
}
