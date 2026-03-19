---
name: competitor-audit
description: When the user wants to analyze a competitor's website to identify advantages for a client site. Use when the user says "check the competition," "competitor audit," "compare to," "what are they doing," or "look at this competitor site." Analyzes a competitor URL and highlights what the LaunchedOps client site does better.
metadata:
  version: 1.0.0
---

# Competitor Site Audit

You are analyzing a competitor's website to help a LaunchedOps client understand their competitive advantage. This is useful for sales calls and for ensuring client sites outperform local competition.

## Step 1: Get Context

Ask for (if not provided):
- **Competitor URL**: The website to analyze
- **Client name**: Which LaunchedOps client this is for (so you can compare)
- **Purpose**: Sales call ammo? Site improvement? Both?

## Step 2: Fetch and Analyze the Competitor Site

Use WebFetch to pull the competitor's site, then evaluate across these dimensions:

### Design & First Impression
- Does it look professional or dated?
- Is the value proposition clear within 5 seconds?
- Mobile-friendly or desktop-only?
- Load speed (heavy scripts, large images?)

### SEO Quality
- Does it have proper meta tags (title, description)?
- Schema.org markup present?
- Heading hierarchy correct?
- Image alt text?
- Semantic HTML or div soup?
- Is it indexable?

### Content Quality
- Clear service descriptions?
- Real reviews/testimonials?
- Service area pages?
- FAQ section?
- Blog content?
- About page with real team info?

### Conversion Elements
- Clear CTAs above the fold?
- Phone number prominent and clickable?
- Contact form present and working?
- Trust signals (reviews, certifications, insurance)?
- Urgency/scarcity elements?

### Technical Quality
- HTTPS?
- Fast loading?
- No broken links/images?
- Accessibility basics?
- Analytics/tracking in place?

## Step 3: Build the Comparison

Create a clear comparison showing where the LaunchedOps site wins:

```
## Competitor Audit: [Competitor Name] vs [Client Name]

### Where We Win 💪
- [specific advantages with evidence]

### Where They Win (and how we can close the gap)
- [honest assessment of any competitor strengths]

### Quick Stats Comparison
| Feature | [Competitor] | [Client Site] |
|---------|-------------|---------------|
| Mobile-Friendly | ❌/✅ | ✅ |
| Schema Markup | ❌/✅ | ✅ |
| Page Speed | Slow/Fast | Fast |
| SSL/HTTPS | ❌/✅ | ✅ |
| Click-to-Call | ❌/✅ | ✅ |
| Reviews Displayed | ❌/✅ | ✅ |
| FAQ Section | ❌/✅ | ✅ |

### Sales Talking Points
- [2-3 bullet points the user can use on a sales call]
```

## Tips

- Be honest — if the competitor does something well, say so and suggest how to match or beat it
- Focus on things the client/prospect will care about: "shows up on Google," "looks good on phones," "makes it easy to call"
- Avoid technical jargon in the sales talking points — keep it in language a contractor would use
- If the competitor site is actually good, focus on what SPECIFIC things the LaunchedOps site adds (QR reviews, schema markup, speed)
