# Architecture

## Overview
LaunchedOps uses a template-based architecture. One master HTML template per niche (junk removal, tree service, etc.) serves as the foundation for every client site in that niche.

## How It Works
1. **Master Template** (`/templates/[niche]/index.html`) — The gold standard. Contains every section, feature, and optimization. Uses placeholder content and CSS variables for easy customization.
2. **Client Build** — Copy template to `/clients/[name]/index.html`. Replace placeholders with real client data. Swap CSS color variables. Add real photos. Hardcode content (no URL params in production).
3. **Deployment** — Upload static files to hosting. Point client's domain. Done.

## Template Features (Per Site)
- Sticky header with phone CTA
- Hero section with badge, stats, and dual CTAs (call + text)
- Trust bar (licensed, insured, rated, same-day, pricing, eco)
- Services grid with images (6 cards)
- How-it-works 3-step flow
- Truck-based pricing visualization (1/4, 1/2, full)
- Google reviews section with aggregate rating
- QR code review automation showcase
- Before/after comparison
- Why-choose-us feature grid
- Service area map with city pills
- Stats section (animated counters)
- FAQ accordion (schema-enabled)
- Contact form with honeypot spam protection
- Mobile sticky CTA bar (call, text, quote)
- Social proof notifications (timed popups)
- Scroll reveal animations
- Full Schema.org markup (LocalBusiness, FAQPage, BreadcrumbList)

## URL Param System (Demo Mode)
Templates accept URL params (`?name=X&city=Y&phone=Z`) for instant personalization during sales demos. This lets us show a prospect "their" site in real-time on a callback without building anything yet.

For production client sites, all content is hardcoded directly into the HTML.

## Color System
All colors are CSS custom properties in `:root`. To rebrand a site:
```css
:root {
    --dark: #0F1419;           /* Background */
    --gold: #E8AA2A;           /* Primary accent — CHANGE THIS */
    --gold-hover: #F0BC4A;     /* Accent hover state */
    --gold-dim: rgba(232, 170, 42, 0.15); /* Accent at 15% opacity */
    --green: #34C759;          /* Secondary accent (trust, success) */
}
```

## Key Decisions
- **Single-file HTML** over multi-file: Simpler deployment, easier to manage per-client, no build step needed
- **No JS frameworks**: Zero bundle size, instant load, no hydration issues, works everywhere
- **CSS variables over Tailwind**: Full control over the design system, no class soup, easy color swaps
- **Static hosting over CMS**: Faster, cheaper, more secure, no maintenance burden on clients
- **Stock photos as default**: Swap for client photos when provided, but stock keeps build fast
