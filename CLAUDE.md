# LaunchedOps

## Project Overview
LaunchedOps is a website delivery system for blue-collar contractors (junk removal, tree service, fencing, concrete, etc). We sell production-quality, SEO-optimized single-page websites for $999 one-time + $75/mo hosting. Each client site is built from a niche template, personalized with their business info, photos, reviews, colors, and service areas, then deployed via Vercel. Build time target: 3-4 hours per site.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Lead Capture**: React Hook Form + Resend
- **Deployment**: Vercel
- **Build Tool**: Claude Code — each site is built from the niche template
- **Images**: Unsplash stock + client-provided photos
- **Domain**: Client gets their own domain; demo previews at `clientname.demo.launchedops.com`

## Project Structure
```
launchedops/
├── CLAUDE.md                          # You are here. Read every session.
├── README.md                          # Project overview for GitHub
├── .gitignore                         # Standard ignores
├── .claude/
│   └── settings.local.json            # Claude Code permissions
├── docs/
│   ├── ARCHITECTURE.md                # How the system works
│   ├── BUILD-PROCESS.md               # Step-by-step client site build checklist
│   ├── DEPLOYMENT.md                  # How to deploy a client site
│   ├── PERSONALIZATION-GUIDE.md       # Every URL param & customization point
│   └── specs/                         # Feature specs (future)
├── templates/
│   ├── junk-removal/                  # Master template — junk removal niche
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── api/
│   │   │       └── lead/route.ts      # Lead capture endpoint (Resend)
│   │   ├── components/                # Reusable UI components (shadcn/ui)
│   │   ├── public/                    # Static assets (images, favicon)
│   │   ├── tailwind.config.ts
│   │   ├── next.config.ts
│   │   └── package.json
│   └── [future-niches]/               # Tree service, fencing, concrete, etc.
├── clients/
│   ├── _example/
│   │   └── README.md                  # Example client brief
│   └── [client-name]/                 # One folder per paying client (full Next.js app)
├── assets/
│   └── stock/                         # Reusable stock images across clients
└── scripts/                           # Utility scripts (future: build automation)
```

## Commands
- `npm run dev` — Local dev server
- `npm run build` — Production build
- `npx vercel` — Deploy to Vercel
- `git add . && git commit -m "message"` — Commit changes
- `git log --oneline -10` — Recent history

## Code Conventions
- **Tailwind CSS**: All styling via utility classes. Custom colors/fonts in `tailwind.config.ts`
- **shadcn/ui**: Use shadcn components as the base — customize per client via Tailwind theme
- **URL Params**: Templates support `?name=X&city=Y&phone=Z` for instant demo personalization
- **Semantic HTML**: Proper heading hierarchy, ARIA labels, landmark roles
- **Mobile-first**: All layouts start mobile, scale up via Tailwind breakpoints
- **Performance**: Target 98+ PageSpeed. Optimize images, minimize client-side JS
- **SEO**: Schema.org markup (LocalBusiness, Service, FAQPage, Review, BreadcrumbList), proper meta tags, canonical URLs
- **Accessibility**: Focus-visible states, skip-nav ready, reduced-motion support, sr-only labels

## Personalization Points (URL Params)
Every template supports these URL parameters for demo personalization:
| Param    | What it controls                        | Default              |
|----------|----------------------------------------|----------------------|
| name     | Business name (everywhere)              | Your Junk Removal Co |
| city     | Primary city (headings, SEO, schema)    | Your City            |
| phone    | Phone number (all CTAs, schema)         | 5551234567           |
| r1       | Reviewer 1 name                         | Mike R.              |
| r2       | Reviewer 2 name                         | Sarah L.             |
| r3       | Reviewer 3 name                         | David J.             |
| rating   | Aggregate Google rating                 | 5.0                  |
| reviews  | Total review count                      | 200                  |
| jobs     | Jobs completed stat                     | 500+                 |

## Niche Intelligence

### Junk Removal
- **Colors**: Dark/charcoal base with gold or orange accent — conveys rugged reliability
- **Hero image**: Crew loading a truck, clean driveway before/after, or a full truck ready to haul
- **Top services**: Residential cleanouts, commercial junk removal, appliance removal, hot tub removal, construction debris, estate cleanouts, garage cleanouts
- **SEO angles**: "[City] junk removal," "same-day junk pickup [City]," "cheap junk removal near me," "estate cleanout services"
- **Trust signals**: Insured/licensed badges, tons hauled stat, same-day availability, eco-friendly donation/recycling messaging

### Tree Service
- **Colors**: Deep green base with earth-tone or wood-grain accent — natural and professional
- **Hero image**: Crew mid-cut on a large tree, fresh stump grinding, or a clean yard after removal
- **Top services**: Tree removal, tree trimming/pruning, stump grinding, emergency storm damage, lot clearing, hedge trimming, cabling & bracing
- **SEO angles**: "[City] tree removal," "emergency tree service [City]," "stump grinding near me," "tree trimming cost [City]"
- **Emergency section**: Dedicated above-fold or sticky banner for 24/7 storm response — highest urgency, zero price sensitivity
- **Trust signals**: ISA certified arborist, crane/heavy equipment capability, emergency 24/7 response, insured for property damage

### Fencing
- **Colors**: Warm brown or slate base with a clean white or steel accent — sturdy and polished
- **Hero image**: Completed fence line (wood privacy or ornamental iron), crew installing posts, or a backyard transformation
- **Top services**: Wood privacy fencing, chain link, ornamental iron/aluminum, vinyl fencing, gate installation, fence repair, commercial fencing
- **SEO angles**: "[City] fence installation," "privacy fence cost [City]," "fence company near me," "wood fence builders [City]"
- **Trust signals**: Years in business, linear feet installed stat, material warranty, free on-site estimates, before/after gallery

### Concrete / Paving
- **Colors**: Cool gray base with a bold blue or orange accent — industrial strength meets precision
- **Hero image**: Fresh-poured driveway or patio with clean edges, stamped concrete detail, or a crew finishing a pour
- **Top services**: Driveways, patios, sidewalks, stamped/decorative concrete, foundation work, concrete repair, retaining walls, commercial flatwork
- **SEO angles**: "[City] concrete contractor," "stamped concrete patio [City]," "driveway replacement near me," "concrete company [City]"
- **Trust signals**: Cubic yards poured stat, years of experience, structural warranty, licensed/bonded, portfolio gallery of finished work

## SEO Standards
Every site must include:
- **LocalBusiness schema** — name, address, phone, hours, geo coords, service area
- **Service schema** — one per service offered, linked to the LocalBusiness
- **Review schema** — aggregate rating + individual review snippets
- **FAQPage schema** — minimum 5 Q&As with city-specific answers
- **Canonical URLs** — self-referencing canonical on every page
- **OG tags** — title, description, image, URL for social sharing
- **City-specific copy** — city name woven naturally into headings, body text, meta description, and schema
- **PageSpeed target**: 98+ on mobile and desktop (Lighthouse)

## Conversion Standards
Every site must include:
- **Sticky mobile CTA** — fixed bottom bar with phone/estimate button, visible on scroll
- **Above-fold CTA** — primary call-to-action visible without scrolling on all devices
- **Social proof toast notifications** — animated "Someone in [City] just requested a quote" popups
- **QR review routing section** — value-add section that helps the client collect Google reviews
- **Trust signals in hero** — rating stars, review count, years in business, or "insured & licensed" badges above the fold
- **Free estimate framing** — all CTAs emphasize free, no-obligation estimates; never "contact us"

## Quality Standards
Every site must pass the Master Audit Checklist before delivery. See `docs/MASTER-AUDIT-CHECKLIST.md` for the complete checklist. Run `/qa` against the checklist before sending any site to a client.

Key P0 requirements (blocking delivery):
- Schema markup: LocalBusiness, Service, FAQ, BreadcrumbList, AggregateRating, Speakable
- Meta tags: unique title + description + canonical + OG + Twitter Card on every page
- Accessibility: skip nav, ARIA labels, alt text, focus indicators, keyboard navigation
- Privacy policy page linked from footer
- Custom 404 page with CTA and navigation
- robots.txt allows AI crawlers (GPTBot, ChatGPT-User, anthropic-ai, ClaudeBot)
- Thank-you page for post-form conversion tracking
- Dynamic copyright year in footer

## Skills (Slash Commands)
These are named workflows — invoke them by name or just describe what you need.

### Client Delivery Workflow
| Skill | When to use | What it does |
|-------|-------------|--------------|
| `/new-client` | "New client," "build a site for..." | Copies the right niche template, swaps in all business details, produces a working first draft |
| `/niche-template` | "New template," "add a vertical" | Scaffolds a complete template for a new industry from the junk removal master |
| `/qa` | "QA," "is it ready," "final check" | Pre-delivery audit — SEO, accessibility, placeholder text, broken elements |
| `/deploy` | "Deploy," "go live," "push to production" | Walks through deployment to Vercel |

### Optimization & Analysis
| Skill | When to use | What it does |
|-------|-------------|--------------|
| `/cro` | "Improve conversions," "page isn't converting" | Conversion rate optimization — analyzes and fixes any marketing page |
| `/competitor-audit` | "Check the competition," "compare to..." | Analyzes a competitor URL, highlights what our client site does better |
| `/seo` | "SEO check," "optimize for search" | SEO analysis and optimization recommendations |
| `/frontend-design` | "Build a component," "design this section" | Creates polished, production-grade web components and pages |
| `/simplify` | After code changes | Reviews changed code for reuse, quality, and efficiency |

### Typical New Client Flow
1. `/new-client` — Build the site from spec/brief
2. `/qa` — Catch issues before the client sees it
3. `/cro` — Optimize for conversions
4. `/competitor-audit` — Prove we beat their competitors
5. `/deploy` — Push to production

### Adding a New Niche
1. `/niche-template` — Scaffold the new industry template
2. `/qa` — Validate the template
3. Commit to `templates/[niche-name]/`

## Important Context
- This is a BUSINESS — every decision should optimize for: speed of delivery, client wow-factor, and SEO performance
- Templates are the starting point. For each real client, we hardcode their info directly (not URL params) and add their real photos, real reviews, real service areas
- The gold/dark color scheme is the DEFAULT for junk removal. Each client gets their own brand colors via Tailwind theme config
- Never modify the master template in `/templates/` for a specific client — always copy to `/clients/[name]/` first
- The QR review section is a VALUE-ADD that differentiates us from competitors like "Eric the Website Guy"

## Current Status
- [x] Master junk removal template built (Next.js/Tailwind/shadcn — Junk Moose demo)
- [x] Project structure set up
- [ ] First test client build (Big Tex Junk Hauling - Arlington, TX)
- [ ] Deployment pipeline documented
- [ ] Additional niche templates (tree service, fencing, concrete)
