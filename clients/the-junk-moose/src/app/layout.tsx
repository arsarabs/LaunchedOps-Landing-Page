import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://demo.launchedops.com";
const siteName = "The Junk Moose";
const siteDescription =
  "Portland's top-rated junk removal crew. Same-day service, upfront pricing, and 500+ jobs completed. Serving Portland, Beaverton, Gresham & surrounding areas. Get a free quote in minutes.";

export const metadata: Metadata = {
  title: "The Junk Moose | Same-Day Junk Removal Portland OR",
  description: siteDescription,
  keywords:
    "junk removal Portland, junk hauling Portland OR, same day junk removal, furniture removal Portland, construction debris removal Portland, yard waste removal, Portland junk removal company, affordable junk removal Portland, junk pickup Portland, estate cleanout Portland",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "The Junk Moose | Same-Day Junk Removal Portland OR",
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    images: [
      {
        url: `${siteUrl}/our-junk-removal-team.jpg`,
        width: 1600,
        height: 1067,
        alt: "The Junk Moose crew in front of the truck — Portland OR junk removal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Junk Moose | Same-Day Junk Removal Portland OR",
    description: siteDescription,
    images: [`${siteUrl}/our-junk-removal-team.jpg`],
  },
  other: {
    "theme-color": "#C8A44E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to font CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#C8A44E" />

        {/* JSON-LD: LocalBusiness with AggregateRating & Reviews */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "The Junk Moose",
              description: siteDescription,
              url: siteUrl,
              telephone: "(503) 555-0100",
              image: `${siteUrl}/our-junk-removal-team.jpg`,
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "",
                addressLocality: "Portland",
                addressRegion: "OR",
                postalCode: "97201",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 45.5152,
                longitude: -122.6784,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "07:00",
                  closes: "19:00",
                },
              ],
              areaServed: [
                "Portland",
                "Beaverton",
                "Gresham",
                "Lake Oswego",
                "Tigard",
                "Hillsboro",
                "Vancouver WA",
                "Tualatin",
                "Milwaukie",
                "Oregon City",
              ],
              sameAs: [
                "https://facebook.com/thejunkmoose",
                "https://instagram.com/thejunkmoose",
                "https://yelp.com/biz/the-junk-moose-portland",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "500",
                bestRating: "5",
              },
              review: [
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Mike T." },
                  datePublished: "2025-08-15",
                  reviewBody:
                    "They showed up same day, cleared out my entire garage in under two hours. Price was exactly what they quoted.",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Sarah K." },
                  datePublished: "2025-10-02",
                  reviewBody:
                    "No other company would touch the pile of debris we had. The Junk Moose handled it without blinking.",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                },
              ],
            }),
          }}
        />

        {/* JSON-LD: Service schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              [
                { name: "Furniture & Appliance Removal", type: "Furniture Removal", desc: "Couches, fridges, washers, mattresses — full furniture and appliance hauling in Portland OR." },
                { name: "Construction Debris Removal", type: "Construction Waste Removal", desc: "Drywall, lumber, concrete, tile — heavy construction debris hauling in Portland OR." },
                { name: "Yard Waste Removal", type: "Yard Waste Removal", desc: "Branches, soil, stumps, clippings — yard waste cleared in a single trip in Portland OR." },
                { name: "Full Property Cleanouts", type: "Property Cleanout", desc: "Hoarding, estate, foreclosure — entire property cleanouts in Portland OR, no judgment." },
                { name: "Commercial Junk Removal", type: "Commercial Waste Removal", desc: "Offices, retail spaces, warehouses — commercial junk removal around your schedule in Portland OR." },
                { name: "Same-Day Junk Pickup", type: "Same Day Service", desc: "Call before noon, gone by end of day — same-day junk removal in Portland OR." },
              ].map((s) => ({
                "@context": "https://schema.org",
                "@type": "Service",
                name: s.name,
                description: s.desc,
                serviceType: s.type,
                provider: {
                  "@type": "LocalBusiness",
                  name: "The Junk Moose",
                  url: siteUrl,
                },
                areaServed: {
                  "@type": "City",
                  name: "Portland",
                  containedInPlace: { "@type": "State", name: "Oregon" },
                },
              }))
            ),
          }}
        />

        {/* JSON-LD: FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How much does junk removal cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pricing depends on the volume and type of items. We give free, no-obligation quotes upfront — what we quote is what you pay. Most single-truck loads run between $250–$500.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you serve my area?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We cover all of Portland and the surrounding Metro Area including Beaverton, Gresham, Lake Oswego, Tigard, Hillsboro, Tualatin, Milwaukie, Oregon City, and Vancouver WA.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How fast can you show up?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We offer same-day service for calls placed before noon. Most pickups are completed within 2–4 hours of booking.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What items do you NOT take?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We can't haul hazardous materials like paint, chemicals, asbestos, or medical waste. Pretty much everything else is fair game.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to be home during pickup?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nope. As long as we can access the items and you've approved the quote, we'll get it done. We'll send a photo confirmation when the job's complete.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I get a quote?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Call or text us at (503) 555-0100, or fill out the form on our website. We typically respond within 15 minutes during business hours.",
                  },
                },
              ],
            }),
          }}
        />

        {/* JSON-LD: BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteUrl,
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-satoshi antialiased grain">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
