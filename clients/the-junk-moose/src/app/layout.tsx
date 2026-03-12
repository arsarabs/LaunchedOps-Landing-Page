import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Junk Moose | Portland's #1 Junk Removal",
  description:
    "Same-day junk removal across Portland and the Metro Area. No hidden fees. No hassle. Just gone. Call (503) 555-0100.",
  keywords:
    "junk removal Portland, junk hauling Portland OR, same day junk removal, furniture removal, construction debris removal, yard waste removal, Portland junk removal",
  openGraph: {
    title: "The Junk Moose | Portland's #1 Junk Removal",
    description:
      "Same-day junk removal across Portland and the Metro Area. No hidden fees. No hassle. Just gone.",
    type: "website",
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
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "The Junk Moose",
              description:
                "Same-day junk removal across Portland and the Metro Area. No hidden fees. No hassle. Just gone.",
              telephone: "(503) 555-0100",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Portland",
                addressRegion: "OR",
                addressCountry: "US",
              },
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
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="font-satoshi antialiased grain">{children}</body>
    </html>
  );
}
