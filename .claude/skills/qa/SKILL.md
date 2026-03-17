---
name: qa
description: Pre-delivery quality audit for a client site. Use when the user says "QA," "check the site," "audit," "review before sending," "is it ready," or "final check." Validates against the Master Audit Checklist — SEO, accessibility, performance, content accuracy, conversion elements, and legal compliance before the client sees it.
metadata:
  version: 2.0.0
---

# Client Site QA Audit

You are performing a pre-delivery quality audit on a LaunchedOps client site. Your goal is to catch every issue before the client sees their site. Audit against the full Master Audit Checklist (`docs/MASTER-AUDIT-CHECKLIST.md`).

## Which site to audit?

If the user doesn't specify, ask which client site to audit. Look in `/clients/` for available sites.

## Audit Checklist

Read the client's site files and run through every check below. Report issues grouped by severity.

### 1. Mobile Responsiveness & UX (Critical)
1. Site renders correctly on mobile (320px–428px viewport)
2. Tap-to-call works on all phone number links (`tel:+1XXXXXXXXXX` format)
3. Sticky mobile CTA is present — fixed bottom bar with phone/estimate button, visible on scroll
4. Body font size is minimum 16px (no tiny text on mobile)
5. All buttons and tap targets are minimum 48x48px
6. No horizontal overflow or content clipping on small screens
7. Viewport meta tag is set (`width=device-width, initial-scale=1`)
8. Layout uses responsive units and Tailwind breakpoints (mobile-first)
9. Text is readable without zooming

### 2. Performance & Technical (Critical)
10. PageSpeed target: 98+ on mobile and desktop (Lighthouse)
11. All images are compressed and use modern formats (WebP/AVIF where possible)
12. SSL certificate is active (HTTPS enforced) — verify no mixed content
13. No broken internal or external links
14. `sitemap.xml` exists and lists all pages
15. `robots.txt` exists with proper directives
16. Core Web Vitals pass: LCP < 2.5s, FID < 100ms, CLS < 0.1
17. No unnecessary external JS libraries
18. Fonts are loaded efficiently (self-hosted or proper Google Fonts setup)
19. CSS is not bloated with unused rules

### 3. Schema Markup (Critical — P0)
20. LocalBusiness schema present with real data: name, address, phone, hours, geo coordinates, service area
21. FAQPage schema present with minimum 5 Q&As using city-specific answers
22. Service schema present — one per service offered, linked to the LocalBusiness
23. BreadcrumbList schema present on all pages (especially interior pages)
24. AggregateRating schema present with real rating and review count
25. Speakable schema present — marks key content sections for voice assistants
26. All schema validates without errors (test with Google Rich Results Test)

### 4. Meta Tags & On-Page SEO (Critical — P0)
27. `<title>` tag is unique, contains business name + city + niche (50-60 chars)
28. `<meta name="description">` is unique and compelling (150-160 chars)
29. Canonical URL is set (self-referencing canonical on every page)
30. Open Graph tags set: `og:title`, `og:description`, `og:image`, `og:url`
31. Twitter Card tags set: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
32. Meta tags are present on ALL pages, not just the homepage
33. Only one `<h1>` tag per page
34. Heading hierarchy is logical (h1 > h2 > h3, no skips)
35. City-specific copy woven naturally into headings, body text, and meta description

### 5. Accessibility (Critical — P0)
36. Skip navigation link present (skip-nav to main content)
37. ARIA labels on all interactive elements (buttons, links, form fields, navigation)
38. All images have descriptive `alt` text (not "image" or empty on meaningful images)
39. Focus indicators visible on all interactive elements (focus-visible styles)
40. Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text)
41. Full keyboard navigation works — all interactive elements reachable via Tab
42. Form inputs have associated labels
43. Form error messages are clear and accessible (aria-live, aria-describedby)
44. Reduced-motion media query present for animations

### 6. CTAs & Conversion Elements (Critical)
45. Above-fold CTA is visible without scrolling on all devices
46. CTA wording is specific and benefit-focused (not generic "Submit" or "Contact Us")
47. CTAs are repeated at multiple points on the page (hero, mid-page, footer minimum)
48. Urgency or scarcity element present (e.g., "Same-Day Service," "Limited Availability")
49. Phone number is visible in the hero section
50. All CTAs emphasize free, no-obligation estimates
51. Social proof toast notifications present ("Someone in [City] just requested a quote")

### 7. Trust Signals (High)
52. Real customer reviews displayed with names and star ratings
53. Star ratings are visible (aggregate rating near hero)
54. Before/after photos included (where applicable to niche)
55. Certifications and badges displayed (ISA certified, licensed, bonded, etc.)
56. "Licensed & Insured" messaging is prominent
57. Years in business or experience stat displayed
58. Jobs completed / tons hauled / feet installed stat displayed
59. QR review routing section present (value-add for Google review collection)

### 8. Lead Capture (High)
60. Lead capture form present on the homepage
61. Form is short — maximum 4-5 fields (name, phone, email, service, message)
62. Form submission shows a clear confirmation message
63. Phone number is clickable in the hero section (tap-to-call)
64. Thank-you page exists for post-form conversion tracking

### 9. Legal & Compliance (Critical — P0)
65. Privacy policy page exists and is linked from the footer
66. Custom 404 page exists with navigation and a CTA (not default browser 404)
67. `robots.txt` allows AI crawlers: GPTBot, ChatGPT-User, anthropic-ai, ClaudeBot

### 10. Content Quality (Critical)
68. Dynamic copyright year in footer (not hardcoded)
69. Favicon is set (custom, not default Next.js or browser icon)
70. Breadcrumbs present on interior pages
71. No placeholder text anywhere: "Your City," "Lorem ipsum," "TODO," "FIXME," "XXX," "Coming Soon"
72. No broken images or missing image references
73. No "Coming Soon" pages — all linked pages have real content
74. Business name is identical everywhere it appears
75. Phone number is identical everywhere (header, CTAs, footer, schema, tel: links)
76. City/location is consistent across headings, meta tags, and schema
77. Address is consistent (if used)
78. No default placeholder data: "5551234567," "Mike R.," "Sarah L.," "David J." (unless verified real)

## Output Format

```
## QA Audit: [Client Name]
Audited against Master Audit Checklist (docs/MASTER-AUDIT-CHECKLIST.md)

### BLOCKING — Must fix before delivery (P0)
- [ ] [Issue description with file path and line number]
- [ ] [Fix suggestion]

### HIGH PRIORITY — Should fix before delivery
- [ ] [Issue description]

### LOW PRIORITY — Nice to have
- [ ] [Issue description]

### PASSED
- [Brief summary of categories that passed clean]

### Verdict: READY / NOT READY for delivery
[If NOT READY, list the blocking items that must be resolved]
```

If issues are found, offer to fix them automatically.
