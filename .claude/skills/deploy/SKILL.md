---
name: deploy
description: When the user wants to deploy a client site. Use when the user says "deploy," "go live," "push to production," "set up hosting," "launch the site," or "put it online." Walks through deployment steps for the chosen hosting platform.
metadata:
  version: 1.0.0
---

# Client Site Deployment

You are helping deploy a LaunchedOps client site to production. Walk the user through the process step by step.

## Pre-Deployment Checks

Before deploying, verify:
1. **QA passed** — suggest running `/qa` if not done recently
2. **Client approval** — confirm the client has seen and approved the site
3. **Domain ready** — confirm the domain is purchased and accessible
4. **All placeholder content removed** — quick scan for defaults

## Deployment Options

Ask the user which platform (if not specified):

### Option A: Cloudflare Pages (Recommended)

1. **Setup**:
   - Ensure the client folder has the final `index.html` and any assets
   - Create a Cloudflare Pages project (via dashboard or Wrangler CLI)

2. **Deploy via CLI**:
   ```bash
   npx wrangler pages deploy clients/[client-name]/ --project-name=[client-name]
   ```

3. **Custom Domain**:
   - Add the client's domain in Cloudflare Pages settings
   - Update DNS: CNAME record pointing to `[project].pages.dev`
   - SSL is automatic via Cloudflare

4. **Verify**:
   - Check the live URL loads correctly
   - Test on mobile
   - Verify SSL certificate is active
   - Test phone number click-to-call

### Option B: Netlify

1. **Setup**:
   - Drag and drop the client folder to Netlify dashboard, OR
   - Use Netlify CLI: `netlify deploy --dir=clients/[client-name]/ --prod`

2. **Custom Domain**:
   - Add domain in Netlify site settings
   - Update DNS: CNAME or Netlify DNS
   - SSL is automatic via Let's Encrypt

3. **Verify**: Same checks as above

### Option C: GitHub Pages

1. **Setup**:
   - Create a repo for the client (or use a subdirectory deploy)
   - Push the client folder contents
   - Enable GitHub Pages in repo settings

2. **Custom Domain**:
   - Add CNAME file with the domain
   - Update DNS: CNAME to `[username].github.io`
   - Enable "Enforce HTTPS"

3. **Verify**: Same checks as above

## Post-Deployment Checklist

After the site is live:
- [ ] Live URL loads correctly
- [ ] SSL/HTTPS is working
- [ ] Mobile layout is correct
- [ ] Phone number click-to-call works
- [ ] Google can crawl the site (no robots.txt blocking)
- [ ] Submit sitemap to Google Search Console (if applicable)
- [ ] Set up Google Business Profile link (if applicable)
- [ ] Take a screenshot for the client portfolio
- [ ] Notify the client their site is live

## DNS Propagation

If the domain isn't resolving:
- DNS changes can take up to 48 hours (usually 15-30 minutes)
- Check propagation at `dig [domain]` or online DNS checkers
- Cloudflare proxied domains are usually instant

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 on custom domain | Check DNS records and Pages/Netlify domain settings |
| Mixed content warnings | Ensure all resources use HTTPS or relative paths |
| SSL not working | Wait for certificate provisioning (up to 24h) |
| Old content showing | Clear CDN cache, hard refresh browser |
