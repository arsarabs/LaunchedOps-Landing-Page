import type { Metadata } from "next";
import { BUSINESS } from "./data";

const BASE_URL = BUSINESS.url;

export function makeMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const image = ogImage || `${BASE_URL}/our-junk-removal-team.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS.name,
      type: "website",
      images: [{ url: image, width: 1600, height: 1067, alt: `${title} | ${BUSINESS.name} ${BUSINESS.city} ${BUSINESS.state}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
