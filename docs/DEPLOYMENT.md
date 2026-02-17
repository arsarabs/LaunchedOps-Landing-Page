# Deployment Guide

## Option 1: Cloudflare Pages (Recommended)
1. Push client folder to a GitHub repo (or use direct upload)
2. Connect to Cloudflare Pages
3. Set build output to the client folder
4. Add custom domain
5. SSL is automatic

## Option 2: Netlify
1. Drag and drop the client folder into Netlify
2. Add custom domain in site settings
3. SSL is automatic

## Option 3: Manual Upload
1. Upload `index.html` + any assets to hosting provider
2. Point domain DNS to hosting
3. Verify SSL

## Domain Setup
- Purchase domain through Cloudflare, Namecheap, or Google Domains
- Point nameservers or A/CNAME records to hosting
- Typical propagation: 15 minutes to 48 hours

## Post-Deployment Checklist
- [ ] Site loads on custom domain
- [ ] SSL certificate active (https://)
- [ ] All phone/SMS links work on mobile
- [ ] Google Maps embed loads
- [ ] Schema markup validates (use Google Rich Results Test)
- [ ] Mobile responsive on real device
- [ ] Page speed score checked (Google PageSpeed Insights)
- [ ] Google Search Console property added
- [ ] Sitemap submitted (if applicable)
