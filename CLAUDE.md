# LaunchedOps

## Project Overview
LaunchedOps is a website delivery system for blue-collar contractors (junk removal, tree service, fencing, concrete, etc). We sell production-quality, SEO-optimized single-page websites for $999 one-time + $75/mo hosting. Each client site is built from a master HTML template, personalized with their business info, photos, reviews, colors, and service areas, then deployed as a static site. Build time target: 3-4 hours per site.

## Tech Stack
- **Sites**: Pure HTML/CSS/JS — single-file, zero dependencies, static hosting
- **Styling**: Custom CSS variables per client (colors, fonts) — no frameworks
- **Deployment**: Static hosting (Cloudflare Pages, Netlify, or similar)
- **Build Tool**: Claude Code — each site is hand-built from the master template
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
│   ├── junk-removal/
│   │   └── index.html                 # Master template — junk removal niche
│   └── [future-niches]/               # Tree service, fencing, etc.
├── clients/
│   ├── _example/
│   │   ├── README.md                  # Example client brief
│   │   ├── index.html                 # Their personalized site
│   │   └── assets/                    # Client photos, logo, etc.
│   └── [client-name]/                 # One folder per paying client
├── assets/
│   └── stock/                         # Reusable stock images across clients
└── scripts/                           # Utility scripts (future: build automation)
```

## Commands
- `python3 -m http.server 8080` — Preview any HTML file locally
- `git add . && git commit -m "message"` — Commit changes
- `git log --oneline -10` — Recent history

## Code Conventions
- **Single-file HTML**: Each client site is ONE self-contained .html file (CSS + JS inline)
- **CSS Variables**: All customizable values (colors, fonts) use CSS custom properties in `:root`
- **URL Params**: Templates support `?name=X&city=Y&phone=Z` for instant demo personalization
- **Semantic HTML**: Proper heading hierarchy, ARIA labels, landmark roles
- **Mobile-first**: All layouts start mobile, scale up via media queries
- **Performance**: No external JS frameworks. Minimal dependencies. Google Fonts only.
- **SEO**: Schema.org markup (LocalBusiness, FAQPage, BreadcrumbList), proper meta tags, canonical URLs
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

## Important Context
- This is a BUSINESS — every decision should optimize for: speed of delivery, client wow-factor, and SEO performance
- Templates are the starting point. For each real client, we hardcode their info directly (not URL params) and add their real photos, real reviews, real service areas
- The gold/dark color scheme is the DEFAULT. Each client gets their own brand colors via CSS variable swaps
- Never modify the master template in `/templates/` for a specific client — always copy to `/clients/[name]/` first
- The QR review section is a VALUE-ADD that differentiates us from competitors like "Eric the Website Guy"

## Current Status
- [x] Master junk removal template built (single-file HTML, fully featured)
- [x] Project structure set up
- [ ] First test client build (Big Tex Junk Hauling - Arlington, TX)
- [ ] Deployment pipeline documented
- [ ] Additional niche templates (tree service, fencing, concrete)
