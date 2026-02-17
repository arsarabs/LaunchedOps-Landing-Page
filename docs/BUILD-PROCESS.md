# Client Site Build Process

## Pre-Build (Before You Touch Code)
- [ ] 5-min callback completed — collected: business name, city, phone, services, years in biz, crew size, brand colors
- [ ] Google Business Profile checked — pull real review count, rating, top 3 reviews
- [ ] Competitor sites scanned — note what they're doing (or not doing)
- [ ] Stock photos selected from Unsplash for their niche/services
- [ ] Client folder created: `clients/[client-name]/`

## Build Steps (Target: 3-4 Hours)
1. **Copy template**: `cp templates/junk-removal/index.html clients/[client-name]/index.html`
2. **Swap colors**: Update `:root` CSS variables to client's brand colors
3. **Replace business info**: Name, phone, city — find/replace all instances
4. **Update services**: Match their actual service offerings
5. **Add real reviews**: Replace placeholder reviews with their Google reviews (name, text, rating)
6. **Update service areas**: Replace city pills with their actual coverage area
7. **Update pricing**: Match their actual pricing structure (or remove if they prefer)
8. **Swap photos**: Replace Unsplash URLs with client-provided photos (or better-matching stock)
9. **Update FAQ**: Customize answers to match their actual policies
10. **Update schema**: Verify all Schema.org data matches the real business
11. **Update Google Maps embed**: Set correct coordinates for their service area
12. **Test mobile**: Check every section on mobile viewport
13. **Test all links**: Phone, SMS, form, anchor links
14. **Test URL params are REMOVED**: Production sites should not rely on URL params

## Post-Build
- [ ] Preview sent to client for review
- [ ] Revisions completed (if any)
- [ ] Domain purchased/configured
- [ ] Site deployed to hosting
- [ ] Google Search Console submitted
- [ ] QR code generated with their Google review link
- [ ] Client trained on how the QR system works

## Delivery Window
- **Start build**: After callback + info collected
- **Deliver preview**: Within 36 hours of callback
- **Why 36 hours (not instant)**: Perceived value. A site delivered in 20 minutes feels automated/cheap. 36 hours feels crafted. Actual build time: 3-4 hours.
