---
name: new-client
description: When the user wants to start building a new client site. Use when the user says "new client," "new site," "build a site for," "onboard," or provides a client spec/brief. Automates the intake-to-build pipeline — copies the right niche template, swaps in all business details, and produces a working first draft.
metadata:
  version: 1.0.0
---

# New Client Site Builder

You are building a new client site for LaunchedOps. Your goal is to go from a client spec to a working, personalized single-page HTML site as fast as possible.

## Step 1: Gather Required Info

Before building, you need these details. Check if the user has provided them (via a spec file, brief, or conversation). Only ask for what's missing:

| Field | Required? | Example |
|-------|-----------|---------|
| Business name | Yes | Big Tex Junk Hauling |
| Niche/industry | Yes | Junk removal |
| Primary city | Yes | Arlington, TX |
| Phone number | Yes | (817) 555-1234 |
| Service areas | Yes | Arlington, Fort Worth, Grand Prairie, Mansfield |
| Brand colors (primary + accent) | Yes (or pick for them) | Navy #1B2A4A, Gold #C8A04A |
| Google rating | If available | 4.9 |
| Review count | If available | 127 |
| Real reviews (names + text) | If available | 3-5 reviews |
| Services offered | Yes | Full-service junk removal, appliance removal, etc. |
| Business hours | If available | Mon-Sat 7am-7pm |
| Website domain | If available | bigtexjunk.com |
| Owner name | If available | Marcus Thompson |
| Tagline/slogan | If available | "Haul It All, Y'all" |
| Real photos | If available | logo, truck, team, before/after |

## Step 2: Select and Copy Template

1. Identify the correct niche template from `/templates/` (e.g., `templates/junk-removal/index.html`)
2. Create the client directory: `/clients/[client-name]/`
3. Copy the template to `/clients/[client-name]/index.html`
4. Create `/clients/[client-name]/assets/` for any client-specific images

**Naming convention**: Use lowercase, hyphenated names (e.g., `big-tex-junk-hauling`, `thompsons-tree-service`)

## Step 3: Personalize the Site

Replace ALL placeholder/default content with real client info. This is NOT a URL-param demo — hardcode everything:

### Must replace:
- Business name (everywhere — title, headings, footer, schema, meta tags)
- Phone number (all CTAs, click-to-call links, schema)
- City/location (headings, meta description, schema, service area section)
- Service areas (list all cities/neighborhoods they serve)
- Services offered (update service cards with their actual services)
- Reviews (use real reviews with real names, or realistic ones matching their niche)
- Color scheme (update CSS `:root` variables)
- Meta tags (title, description, Open Graph)
- Schema.org markup (LocalBusiness — name, address, phone, hours, geo, rating)
- Footer (business name, address, phone, hours)

### Should replace (if info provided):
- Hero tagline/subheading
- About section (owner story, years in business)
- Stats (jobs completed, rating, review count)
- Business hours
- Photos (hero, about, gallery)
- FAQ questions (tailor to their services and area)
- Google Maps embed (their actual location)

### Don't forget:
- Remove the URL parameter JavaScript if hardcoding everything
- Update the `<title>` tag and `<meta name="description">`
- Update canonical URL if domain is known
- Check that ALL instances of default text are replaced (search for "Your City", "Your Junk Removal", default phone numbers)

## Step 4: Quality Check

Before presenting the site, verify:
- [ ] No placeholder text remaining (search for defaults)
- [ ] Phone number is consistent everywhere
- [ ] Business name is consistent everywhere
- [ ] City/service areas are correct
- [ ] Schema.org markup has real data
- [ ] Meta tags are populated
- [ ] Color scheme is applied and looks cohesive
- [ ] All links work (especially tel: links)
- [ ] Mobile layout looks good
- [ ] Page loads fast (no heavy external resources)

## Output

When done, tell the user:
1. Where the file is: `/clients/[name]/index.html`
2. How to preview: `python3 -m http.server 8080` then open the file
3. What still needs attention (missing photos, reviews to verify, etc.)
4. Suggest next steps (add real photos, get client approval, deploy)
