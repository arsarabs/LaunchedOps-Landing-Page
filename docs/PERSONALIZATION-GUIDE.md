# Personalization Guide

## CSS Color Variables (The Fast Way to Rebrand)
Every client site's look is controlled by these CSS variables in `:root`:

```css
/* === PRIMARY BRAND COLOR === */
--gold: #E8AA2A;                        /* Main accent (CTAs, headings, highlights) */
--gold-hover: #F0BC4A;                  /* Hover state for accent */
--gold-dim: rgba(232, 170, 42, 0.15);  /* 15% opacity version for backgrounds */

/* === SECONDARY COLOR === */
--green: #34C759;                       /* Trust indicators, success states, badges */
--green-dim: rgba(52, 199, 89, 0.15);  /* 15% opacity version */

/* === BACKGROUNDS === */
--dark: #0F1419;                        /* Main background */
--dark-secondary: #1A1F26;              /* Section alternating bg */
--dark-tertiary: #242B33;               /* Cards, inputs, elevated surfaces */
```

### Example: Black & Orange (Big Tex Junk Hauling)
```css
--gold: #FF6B00;
--gold-hover: #FF8533;
--gold-dim: rgba(255, 107, 0, 0.15);
```

### Example: Navy & Yellow (Hypothetical)
```css
--dark: #0A1628;
--dark-secondary: #111D33;
--dark-tertiary: #1A2940;
--gold: #FFD700;
--gold-hover: #FFE033;
--gold-dim: rgba(255, 215, 0, 0.15);
```

## Content Personalization Checklist
When hardcoding a client site, update ALL of these:

### Text Content
- [ ] Business name (header, hero, why-choose-us, footer, schema) — class: `.business-name`
- [ ] City name (hero, services, reviews, service area, footer, schema) — class: `.city-name`
- [ ] Phone number (header, hero, CTA, footer, mobile bar, schema, SMS links)
- [ ] Services list (cards, footer, schema `serviceType`)
- [ ] Service areas (pills, map, footer, schema `areaServed`)
- [ ] Reviews (3 review cards, reviewer names, review text, avatars)
- [ ] Aggregate rating + review count
- [ ] FAQ answers (customize to their policies)
- [ ] Pricing ranges (match their actual pricing)
- [ ] Stats (jobs completed, years in business)
- [ ] Hours of operation (footer, schema `openingHours`)
- [ ] Address (footer, schema)

### Images
- [ ] Hero image (their truck, crew, or job site)
- [ ] Service card images (6 images matching their services)
- [ ] Before/after photos (real job photos if available)
- [ ] OG image for social sharing

### Schema.org (Critical for SEO)
- [ ] `LocalBusiness.name`
- [ ] `LocalBusiness.telephone`
- [ ] `LocalBusiness.address`
- [ ] `LocalBusiness.areaServed` (array of cities)
- [ ] `LocalBusiness.serviceType` (array of services)
- [ ] `AggregateRating` (ratingValue, reviewCount)
- [ ] `Review` entries (3 real reviews)
- [ ] `FAQPage` answers
- [ ] `BreadcrumbList` city name

### Links & CTAs
- [ ] All `tel:` links → client's real phone
- [ ] All `sms:` links → client's real phone
- [ ] Google Maps embed → client's actual service area
- [ ] Social media links (Facebook, Instagram, Google Business)
- [ ] Form action (connect to actual form handler or webhook)
