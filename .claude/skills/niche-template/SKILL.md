---
name: niche-template
description: When the user wants to create a new niche template (e.g., tree service, fencing, concrete, pressure washing). Use when the user says "new template," "new niche," "add a vertical," or "build a template for [industry]." Scaffolds a complete template from the junk removal master, adapting all industry-specific content.
metadata:
  version: 1.0.0
---

# New Niche Template Builder

You are creating a new industry-specific template for LaunchedOps. The junk removal template is the proven master — adapt it for a new niche while keeping the same structure, SEO quality, and conversion patterns.

## Step 1: Identify the Niche

Confirm with the user:
- **Industry**: e.g., tree service, fencing, concrete, pressure washing, landscaping, roofing, painting, demolition, moving, carpet cleaning
- **Typical services**: What do these businesses actually offer? (list 6-8 core services)
- **Typical customer pain points**: What makes someone search for this service?
- **Typical differentiators**: What separates a good provider from a bad one?

## Step 2: Read the Master Template

Read `/templates/junk-removal/index.html` to understand the full structure. Key sections to adapt:
- Hero section (headline, subheading, CTA)
- Services grid (service cards)
- How It Works steps
- About section
- Reviews/testimonials
- Service areas
- FAQ section
- Schema.org markup
- Meta tags and SEO copy

## Step 3: Create the New Template

1. Create directory: `/templates/[niche-name]/`
2. Copy master: `/templates/junk-removal/index.html` → `/templates/[niche-name]/index.html`
3. Adapt ALL content for the new niche:

### Content to Change:

**Hero Section**:
- Headline that speaks to the niche (e.g., "Professional Tree Service in {City}")
- Subheading with niche-specific value prop
- CTA text appropriate to the service

**Services Grid**:
- Replace all 6-8 service cards with niche-appropriate services
- Update icons/emojis to match
- Write compelling descriptions for each service

**How It Works**:
- Adapt the 3-step process to match how this niche typically works
- Keep it simple and reassuring

**About Section**:
- Adjust the story template for the niche (years of experience, equipment, certifications)
- Update stats that make sense (jobs completed, trees removed, feet of fence installed, etc.)

**Reviews**:
- Write realistic review templates that mention niche-specific services
- Keep the same review card structure

**FAQ Section**:
- Write 5-8 FAQs that real customers in this niche would ask
- Include pricing questions, timeline questions, and process questions
- Use FAQ schema markup

**Schema.org**:
- Update `LocalBusiness` type if a more specific type exists (e.g., `HomeAndConstructionBusiness`)
- Update service descriptions
- Keep FAQ schema

**Meta Tags**:
- Update title template: "[Business Name] | [Niche] in [City] | Free Estimates"
- Update meta description template
- Update Open Graph tags

**URL Parameters**:
- Keep the same parameter system (name, city, phone, etc.)
- Update default values to match the niche

### Content to Keep:
- Overall page structure and layout
- CSS architecture and variable system
- Mobile responsiveness
- Accessibility features
- Performance optimizations
- QR review section (this is our differentiator)
- Navigation structure
- Footer layout

## Step 4: Verify

- [ ] All junk-removal-specific language is gone
- [ ] Services make sense for the new niche
- [ ] FAQs are relevant and helpful
- [ ] Schema markup is valid for the niche
- [ ] URL params still work with niche-appropriate defaults
- [ ] Color scheme is neutral (will be customized per client)
- [ ] Page reads naturally — nothing feels copy-pasted from wrong industry

## Output

Tell the user:
1. Template location: `/templates/[niche-name]/index.html`
2. How to preview with URL params
3. What makes this niche's template different from junk removal
4. Suggest the first client to test it with
