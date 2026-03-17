import { BUSINESS, LOCATIONS } from "./data";

const SERVICE_AREAS = LOCATIONS.map((loc) =>
  loc.state === "WA" ? `${loc.city} ${loc.state}` : loc.city
);

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BUSINESS.url}/#localbusiness`,
    name: BUSINESS.name,
    description:
      `Professional junk removal services in ${BUSINESS.city}, ${BUSINESS.state} and surrounding areas. Fast, affordable, and eco-friendly hauling for residential and commercial customers.`,
    url: BUSINESS.url,
    telephone: BUSINESS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      postalCode: BUSINESS.zip,
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
    priceRange: "$$",
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    image: "/our-junk-removal-team.jpg",
    sameAs: [],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating,
      reviewCount: BUSINESS.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Mike T.",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          `The ${BUSINESS.name} team cleared out our entire garage in under two hours. Fair price, friendly crew, and they even swept up after. Best junk removal experience in ${BUSINESS.city}!`,
        datePublished: "2025-11-15",
        locationCreated: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: BUSINESS.city,
            addressRegion: BUSINESS.state,
          },
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah K.",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          `Had a ton of construction debris from a kitchen remodel. ${BUSINESS.name} gave us a quote on the spot and had everything hauled away the same day. Highly recommend!`,
        datePublished: "2025-12-03",
        locationCreated: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Beaverton",
            addressRegion: "OR",
          },
        },
      },
    ],
  };
}

export function getServiceSchemas() {
  const services = [
    {
      name: "Furniture & Appliance Removal",
      serviceType: "Furniture & Appliances",
      description:
        "Professional removal of old furniture, appliances, and bulky household items. We handle the heavy lifting so you don't have to.",
    },
    {
      name: "Construction Debris Removal",
      serviceType: "Construction Debris",
      description:
        "Fast cleanup of construction and renovation debris including drywall, lumber, concrete, and mixed materials from job sites.",
    },
    {
      name: "Yard Waste Removal",
      serviceType: "Yard Waste",
      description:
        "Hauling of branches, stumps, leaves, dirt, and other yard waste. Perfect for landscaping projects and seasonal cleanups.",
    },
    {
      name: "Full Property Cleanouts",
      serviceType: "Full Cleanouts",
      description:
        "Complete cleanout services for estates, foreclosures, rental turnovers, and hoarding situations. We handle everything from start to finish.",
    },
    {
      name: "Commercial Junk Removal",
      serviceType: "Commercial",
      description:
        "Reliable junk removal for offices, warehouses, retail spaces, and commercial properties. Flexible scheduling to minimize business disruption.",
    },
    {
      name: "Same-Day Junk Pickup",
      serviceType: "Same-Day Pickup",
      description:
        "Need it gone today? Call before noon and we'll have a crew at your door the same day for fast, no-hassle junk pickup.",
    },
  ];

  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS.url}/#localbusiness`,
      name: BUSINESS.name,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "Place",
      name: area,
    })),
  }));
}

export function getFAQSchema() {
  const faqs = [
    {
      question: "How much does junk removal cost?",
      answer:
        "Most jobs run $250-$500 per truck load depending on volume and item type. We provide free upfront quotes with no hidden fees — what we quote is what you pay.",
    },
    {
      question: "Do you serve my area?",
      answer: `Yes! We proudly serve ${SERVICE_AREAS.join(", ")} and surrounding communities throughout the greater ${BUSINESS.city} metro area.`,
    },
    {
      question: "How fast can you show up?",
      answer:
        "We offer same-day service for calls received before noon. Most appointments are scheduled within 24-48 hours depending on availability.",
    },
    {
      question: "What items do you NOT take?",
      answer:
        "For safety reasons, we cannot haul hazardous materials including chemicals, paint, asbestos, medical waste, or other regulated substances. Contact your local waste authority for proper disposal of these items.",
    },
    {
      question: "Do I need to be home during pickup?",
      answer:
        "No, you do not need to be home. Just show us what needs to go beforehand and we'll take care of the rest. We send photo confirmation once the job is complete so you can verify everything was removed.",
    },
    {
      question: "How do I get a quote?",
      answer: `Getting a quote is easy! Call or text us at ${BUSINESS.phone}, or fill out the contact form on our website. We'll get back to you within minutes during business hours with a free, no-obligation estimate.`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BUSINESS.url,
      },
    ],
  };
}

export function getAllSchemas() {
  return [
    getLocalBusinessSchema(),
    ...getServiceSchemas(),
    getFAQSchema(),
    getBreadcrumbSchema(),
  ];
}
