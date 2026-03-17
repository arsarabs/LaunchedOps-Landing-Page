import { notFound } from "next/navigation";
import { Metadata } from "next";
import { LOCATIONS, BUSINESS } from "@/lib/data";
import { makeMetadata } from "@/lib/metadata";
import { LocationPageClient } from "./LocationPageClient";

/* ── Static params for all location slugs ── */
export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

/* ── Dynamic metadata per location ── */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const location = LOCATIONS.find((l) => l.slug === params.slug);
  if (!location) return {};

  return makeMetadata({
    title: `${location.city} Junk Removal | Same-Day Service | ${BUSINESS.name}`,
    description: `Professional junk removal in ${location.city}, ${location.state}. Same-day pickup, upfront pricing, and eco-friendly disposal. Serving ${location.neighborhoods}. Call ${BUSINESS.phone} for a free quote.`,
    path: `/locations/${location.slug}`,
  });
}

/* ── Page component ── */
export default function LocationPage({
  params,
}: {
  params: { slug: string };
}) {
  const location = LOCATIONS.find((l) => l.slug === params.slug);
  if (!location) notFound();

  return <LocationPageClient location={location} />;
}
