# LaunchedOps — Company Website

Production website for LaunchedOps, a premium website design service for home service contractors.

## Structure

```
launchedops-site/
├── index.html              Homepage
├── how-it-works.html       Process page
├── portfolio.html          Work showcase
├── contact.html            Contact form + booking
├── about.html              About the founder
├── css/
│   ├── global.css          Reset, variables, typography, layout
│   ├── components.css      Buttons, cards, nav, footer
│   ├── animations.css      Scroll reveals, keyframes
│   └── pages/
│       ├── home.css        Homepage styles
│       ├── how-it-works.css
│       ├── portfolio.css
│       ├── contact.css
│       └── about.css
├── js/
│   ├── main.js             Nav, scroll, mobile menu, FAQ
│   ├── animations.js       Intersection Observer reveals
│   └── interactions.js     Mouse tracking, form handling
├── sitemap.xml
├── robots.txt
└── assets/                 Images, icons, fonts
```

## Local Preview

```bash
cd launchedops-site
python3 -m http.server 8080
# Open http://localhost:8080
```

## Tech

- Vanilla HTML/CSS/JS — zero dependencies
- Google Fonts: Plus Jakarta Sans, JetBrains Mono
- CSS custom properties for theming
- Mobile-first responsive
- WCAG 2.1 AA accessible
- Schema.org markup on every page

## Deployment

Static files — deploy to Cloudflare Pages, Netlify, or any static host.
