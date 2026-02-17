# LaunchedOps

Production-quality websites for contractors. Built fast. Delivered in 36 hours.

## What This Is
A website delivery system for blue-collar service businesses. Each client gets a fully custom, SEO-optimized, mobile-first website built from battle-tested templates.

## Stack
- Pure HTML/CSS/JS (zero dependencies)
- SEO schema markup (LocalBusiness, FAQ, Breadcrumb)
- URL parameter personalization for demos
- QR code review automation system included
- Static hosting deployment

## Structure
- `/templates/` — Master templates by niche
- `/clients/` — One folder per client with their personalized site
- `/docs/` — Build process, deployment, and architecture docs
- `/assets/` — Shared stock images

## Quick Start
```bash
# Preview any client site
cd clients/[client-name]
python3 -m http.server 8080

# Preview with URL params (demo mode)
# Open: http://localhost:8080?name=Big+Tex+Junk+Hauling&city=Arlington&phone=4695550187
```
