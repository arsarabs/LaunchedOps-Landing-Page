---
name: seo
description: SEO analysis and optimization for a client site. Use when the user says "SEO check," "optimize for search," "SEO audit," "rank higher," "local SEO," "schema markup," or "search optimization." Covers local SEO, schema markup, meta tags, technical SEO, and AI/voice search readiness.
metadata:
  version: 2.0.0
---

# SEO Analysis & Optimization

You are performing an SEO audit and optimization on a LaunchedOps client site. Your goal is to ensure the site is fully optimized for local search, AI search, and voice assistants. Reference the Master Audit Checklist (`docs/MASTER-AUDIT-CHECKLIST.md`) for the complete requirements.

## Which site to audit?

If the user doesn't specify, ask which client site to audit. Look in `/clients/` for available sites.

## SEO Audit Framework

Read the client's site files and audit every item below. Report findings grouped by category.

### 1. Local SEO (Highest Priority)

**Google Business Profile alignment:**
- Business name, address, phone (NAP) are consistent across the site and schema
- City name is woven naturally into headings, body text, meta description, and schema
- Service area pages target surrounding cities (if multi-city)
- Geo coordinates are accurate in LocalBusiness schema

**Local content signals:**
- City-specific Q&As in FAQ section
- Neighborhood/area references where natural
- Local landmarks or context in copy (where appropriate)
- Service area explicitly listed

### 2. Schema Markup Completeness (P0 — Blocking)

Every site must have ALL of the following schema types. Validate each:

1. **LocalBusiness** — name, address, telephone, openingHours, geo (lat/lng), areaServed, priceRange, image, url, sameAs (social profiles)
2. **Service** — one per service offered, with name, description, provider (linked to LocalBusiness), areaServed
3. **FAQPage** — minimum 5 Q&As with city-specific answers written in natural conversational tone
4. **BreadcrumbList** — on all pages, especially interior/service pages
5. **AggregateRating** — ratingValue, reviewCount, bestRating linked to LocalBusiness
6. **Speakable** — marks headline, description, and key content sections for voice assistants (Google Assistant, Alexa, Siri)

**Validation:** All schema must pass Google Rich Results Test without errors.

### 3. Meta Tag Audit (P0 — Blocking)

Check EVERY page (not just homepage) for:

- **Title tag**: Unique, 50-60 characters, contains business name + city + primary keyword
- **Meta description**: Unique, 150-160 characters, compelling with call-to-action language
- **Canonical URL**: Self-referencing canonical on every page
- **Open Graph tags**: `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, `og:type`
- **Twitter Card tags**: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`

**Common issues:**
- Duplicate titles/descriptions across pages
- Missing OG image or wrong dimensions
- Canonical pointing to wrong URL
- Meta description too short or too long

### 4. Technical SEO

**Crawlability & indexing:**
- `sitemap.xml` exists and lists all pages with correct URLs
- `robots.txt` exists with proper directives
- `robots.txt` allows AI crawlers: GPTBot, ChatGPT-User, anthropic-ai, ClaudeBot
- No accidental `noindex` tags on pages that should be indexed
- SSL certificate active, HTTPS enforced, no mixed content

**Core Web Vitals:**
- LCP (Largest Contentful Paint) < 2.5 seconds
- FID (First Input Delay) < 100 milliseconds
- CLS (Cumulative Layout Shift) < 0.1
- PageSpeed score target: 98+ on mobile and desktop

**Image optimization:**
- All images compressed and use modern formats (WebP/AVIF)
- All images have descriptive alt text with natural keyword usage
- Image file names are descriptive (not "IMG_1234.jpg")
- Images are properly sized (not loading 4000px images in 400px containers)

**HTML structure:**
- Single `<h1>` per page
- Heading hierarchy is logical (h1 > h2 > h3, no level skips)
- Semantic HTML elements used (header, nav, main, section, footer)
- Internal linking between pages where applicable

### 5. AI & Voice Search Readiness

**Content structure for AI extraction:**
- FAQ answers are written in complete, natural sentences (not bullet fragments)
- Q&A format matches how people actually ask questions ("How much does [service] cost in [City]?")
- Key information (phone, hours, services, service area) is in plain text, not just images or JavaScript
- Content provides direct, concise answers that AI assistants can extract and cite

**robots.txt AI crawler rules:**
- GPTBot is allowed (not blocked)
- ChatGPT-User is allowed
- anthropic-ai is allowed
- ClaudeBot is allowed
- Verify no blanket `Disallow: /` that would block AI crawlers

**Speakable schema:**
- Headlines and key sections marked with Speakable schema
- Content marked as speakable is concise and sounds natural when read aloud
- Includes business name, primary service, and city

### 6. Content SEO

- Primary keyword appears in: title, H1, first paragraph, meta description, at least one H2
- Secondary/long-tail keywords are used naturally throughout
- Content length is sufficient for the page type (service pages: 500+ words)
- No keyword stuffing — reads naturally
- Internal links use descriptive anchor text (not "click here")

## Output Format

```
## SEO Audit: [Client Name]

### Schema Markup Status
| Schema Type    | Present | Valid | Issues |
|---------------|---------|-------|--------|
| LocalBusiness | Y/N     | Y/N   | ...    |
| Service       | Y/N     | Y/N   | ...    |
| FAQPage       | Y/N     | Y/N   | ...    |
| BreadcrumbList| Y/N     | Y/N   | ...    |
| AggregateRating| Y/N   | Y/N   | ...    |
| Speakable     | Y/N     | Y/N   | ...    |

### Meta Tags Status
| Page          | Title | Description | Canonical | OG Tags | Twitter |
|--------------|-------|-------------|-----------|---------|---------|
| Homepage     | ...   | ...         | ...       | ...     | ...     |
| [Other pages]| ...   | ...         | ...       | ...     | ...     |

### Technical SEO
- sitemap.xml: [status]
- robots.txt: [status]
- AI crawler access: [status]
- SSL/HTTPS: [status]
- Core Web Vitals: [status]

### AI & Voice Search Readiness
- FAQ format: [status]
- Speakable schema: [status]
- Content extractability: [status]

### BLOCKING Issues (must fix)
- [list]

### Recommendations (prioritized)
- [list]
```

If issues are found, offer to fix them automatically.
