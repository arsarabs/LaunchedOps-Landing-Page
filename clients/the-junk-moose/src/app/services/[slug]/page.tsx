import { notFound } from "next/navigation";
import { SERVICES, BUSINESS } from "@/lib/data";
import { makeMetadata } from "@/lib/metadata";
import { ServicePageClient } from "./ServicePageClient";

/* ---------- Static params ---------- */

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

/* ---------- Dynamic metadata ---------- */

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return {};

  return makeMetadata({
    title: `${service.name} in ${BUSINESS.city} ${BUSINESS.state} | ${BUSINESS.name}`,
    description: `${service.description} Professional ${service.name.toLowerCase()} across ${BUSINESS.city} ${BUSINESS.state} and the metro area. Call ${BUSINESS.phone} for a free quote.`,
    path: `/services/${service.slug}`,
  });
}

/* ---------- Page component ---------- */

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return <ServicePageClient service={service} />;
}
