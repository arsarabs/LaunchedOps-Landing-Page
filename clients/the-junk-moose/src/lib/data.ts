export const BUSINESS = {
  name: "The Junk Moose",
  phone: "(503) 555-0100",
  phoneRaw: "+15035550100",
  city: "Portland",
  state: "OR",
  url: "https://demo.launchedops.com",
  hours: "Mon–Sat · 7am–7pm",
  rating: "4.9",
  reviewCount: "500",
  jobsCompleted: "500+",
  yearsServing: "3",
};

export interface ServiceData {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  faqs: { q: string; a: string }[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: "furniture-appliance-removal",
    name: "Furniture & Appliance Removal",
    shortName: "Furniture & Appliances",
    description: "Couches, fridges, washers, mattresses — all of it.",
    longDescription:
      "Got a beat-up couch nobody wants? A fridge that's seen better days? The Junk Moose handles all furniture and appliance removal across Portland OR and the surrounding metro area. We'll haul away sofas, recliners, mattresses, bed frames, dressers, tables, refrigerators, washers, dryers, dishwashers, and anything else you need gone. Our crew handles all the heavy lifting — you don't touch a thing. We donate usable items to local Portland charities whenever possible, so your old furniture gets a second life. Most jobs are done in under an hour. Upfront pricing, no hidden fees, and we always sweep up after ourselves.",
    faqs: [
      { q: "Do you remove appliances that are still connected?", a: "Yes — we can disconnect and remove standard appliances like washers, dryers, and refrigerators. We don't handle gas line disconnections, but everything else is fair game." },
      { q: "Can you take my old mattress?", a: "Absolutely. Mattresses, box springs, bed frames — we take them all. We handle mattress disposal properly and recycle materials when possible." },
      { q: "Do you donate usable furniture?", a: "Yes! We partner with local Portland charities. If your items are in decent shape, we'll make sure they go to someone who needs them." },
      { q: "How much does furniture removal cost?", a: "Most single-item pickups run $75–$150. A full truckload of furniture is typically $250–$500. We give you an exact quote before we start — no surprises." },
    ],
  },
  {
    slug: "construction-debris-removal",
    name: "Construction Debris Removal",
    shortName: "Construction Debris",
    description: "Drywall, lumber, concrete, tile. We handle the heavy stuff.",
    longDescription:
      "Renovation projects create a mess. The Junk Moose specializes in construction debris removal throughout Portland OR and the metro area. We haul drywall, lumber, concrete, tile, roofing materials, insulation, plywood, and mixed demo waste. Whether you're a homeowner finishing a kitchen remodel or a contractor clearing a job site, we show up on time and get it done fast. Our trucks handle heavy loads and our crew is experienced with construction waste. We sort materials for proper disposal and recycle what we can. Same-day service available for calls before noon. Licensed, insured, and trusted by Portland contractors.",
    faqs: [
      { q: "Can you handle heavy materials like concrete?", a: "Yes — concrete, brick, tile, stone, we haul it all. Heavy loads may require additional pricing, but we'll quote you upfront." },
      { q: "Do you work with contractors?", a: "Absolutely. We work with contractors across Portland regularly. We can set up recurring pickups or one-time cleanouts around your project schedule." },
      { q: "Do you sort construction debris for recycling?", a: "Yes, we separate recyclable materials like metal, wood, and concrete wherever possible. We're committed to responsible disposal." },
    ],
  },
  {
    slug: "yard-waste-removal",
    name: "Yard Waste Removal",
    shortName: "Yard Waste",
    description: "Branches, soil, stumps, clippings. Cleared in a single trip.",
    longDescription:
      "Portland's lush greenery means yards can get overgrown fast. The Junk Moose provides yard waste removal across Portland OR, Beaverton, Lake Oswego, and the entire metro area. We haul branches, tree limbs, stumps, root balls, soil, gravel, leaves, grass clippings, and landscaping debris. Whether you've just finished a major landscaping project or need seasonal cleanup, we'll have your yard cleared in a single trip. Our crew handles the loading — no need to bag anything. We dispose of all yard waste at proper composting and green waste facilities. Same-day service available.",
    faqs: [
      { q: "Do I need to bag the yard waste first?", a: "Nope. Pile it up and point — we'll handle all the loading. Bags, loose piles, it doesn't matter." },
      { q: "Can you remove tree stumps?", a: "We can haul away stumps that have already been cut and dug out. We don't do stump grinding, but we'll take the stump away once it's out of the ground." },
      { q: "Do you take soil and gravel?", a: "Yes — dirt, soil, gravel, rock, sand. We haul it all. Heavy loads may be priced differently, but we'll give you an exact quote." },
    ],
  },
  {
    slug: "full-property-cleanouts",
    name: "Full Property Cleanouts",
    shortName: "Full Cleanouts",
    description: "Hoarding, estate, foreclosure. Entire properties, no judgment.",
    longDescription:
      "Full property cleanouts require a special kind of crew — one that works hard, moves fast, and treats every situation with respect. The Junk Moose provides complete property cleanout services across Portland OR for estates, foreclosures, rental turnovers, hoarding situations, and move-outs. We clear everything: furniture, appliances, clothing, personal items, garage contents, basement junk, and yard debris. Our team works room by room, floor to ceiling, until the property is completely empty and broom-swept. We handle sorting, hauling, and disposal so you don't have to. Sensitive situations are handled with care and discretion. Licensed and insured.",
    faqs: [
      { q: "How long does a full cleanout take?", a: "Most single-family homes take 4–8 hours depending on the amount of stuff. Multi-story or heavily packed properties may take a full day. We'll give you a time estimate with your quote." },
      { q: "Do you handle hoarding situations?", a: "Yes, with care and zero judgment. We've done dozens of hoarding cleanouts across Portland. We work at whatever pace is comfortable and handle everything discreetly." },
      { q: "Can you handle estate cleanouts?", a: "Absolutely. We work with families, attorneys, and property managers on estate cleanouts. We can set aside valuables or specific items you want to keep." },
      { q: "Do you clean after the cleanout?", a: "We broom-sweep every room and leave the property clean and empty. For deep cleaning, we can recommend trusted local partners." },
    ],
  },
  {
    slug: "commercial-junk-removal",
    name: "Commercial Junk Removal",
    shortName: "Commercial",
    description: "Offices, retail spaces, warehouses. We work around your schedule.",
    longDescription:
      "Portland businesses trust The Junk Moose for fast, reliable commercial junk removal. We service offices, retail stores, restaurants, warehouses, and industrial spaces across Portland OR and the metro area. We remove old office furniture, electronics, fixtures, inventory, pallets, shelving, and general business waste. Our team works around your schedule — evenings, weekends, whatever keeps your business running. We handle everything from single-item pickups to complete commercial space cleanouts. Recurring service available for businesses with ongoing disposal needs. Licensed, insured, and OSHA-compliant.",
    faqs: [
      { q: "Can you work after business hours?", a: "Yes — we offer evening and weekend scheduling for commercial clients. We'll work around your operations so there's zero disruption." },
      { q: "Do you handle e-waste and electronics?", a: "Yes, we remove computers, monitors, printers, servers, and other electronics. We ensure proper e-waste disposal and recycling." },
      { q: "Do you offer recurring commercial service?", a: "Absolutely. We can set up weekly, bi-weekly, or monthly pickups for businesses with ongoing junk removal needs." },
    ],
  },
  {
    slug: "same-day-junk-removal",
    name: "Same-Day Junk Removal",
    shortName: "Same-Day Pickup",
    description: "Call before noon. We'll be there by end of day.",
    longDescription:
      "Need it gone today? The Junk Moose offers same-day junk removal across Portland OR and the surrounding metro area. Call or text us before noon and we'll have a crew at your door by end of day. No waiting around for a scheduled appointment days out — when you want it gone, we make it happen. Same-day service covers everything: furniture, appliances, yard waste, construction debris, and full cleanouts. Pricing is the same as our standard rates — no rush fees, no premiums. Upfront quote before we start, and we handle all the loading. Portland's fastest, most reliable junk removal crew.",
    faqs: [
      { q: "Is there an extra charge for same-day service?", a: "Nope — same prices as scheduled pickups. No rush fees, no premiums." },
      { q: "How late in the day can you come?", a: "Our last same-day pickups typically happen between 5–7pm. Call before noon to guarantee same-day availability." },
      { q: "What if I call after noon?", a: "We'll do our best to fit you in same-day. If not, we'll get you scheduled for first thing the next morning." },
    ],
  },
];

export interface LocationData {
  slug: string;
  city: string;
  state: string;
  description: string;
  neighborhoods: string;
  faqs: { q: string; a: string }[];
}

export const LOCATIONS: LocationData[] = [
  {
    slug: "portland",
    city: "Portland",
    state: "OR",
    description:
      "The Junk Moose is Portland's go-to junk removal crew. We serve all Portland neighborhoods — from inner SE and NE to the West Hills, from St. Johns to Sellwood. Whether you're in a downtown Portland condo or a house in Portland's Alberta Arts District, we'll show up same-day and haul it all away. Portland homeowners and businesses have trusted us for 500+ jobs and counting. We know Portland's streets, Portland's neighborhoods, and Portland's disposal regulations inside and out.",
    neighborhoods: "Downtown, Pearl District, Alberta Arts, Hawthorne, Division, Sellwood, St. Johns, West Hills, Woodstock, Foster-Powell",
    faqs: [
      { q: "How fast can you get to Portland?", a: "We're based in Portland — most pickups happen within 2-4 hours of booking. Same-day service available for calls before noon." },
      { q: "Do you serve all Portland neighborhoods?", a: "Yes — every Portland neighborhood from inner SE and NE to the West Hills, St. Johns to Sellwood. If it's in Portland city limits, we're there." },
      { q: "Where do you take junk from Portland jobs?", a: "We use licensed Portland-area disposal and recycling facilities. We recycle and donate whenever possible." },
    ],
  },
  {
    slug: "beaverton",
    city: "Beaverton",
    state: "OR",
    description:
      "The Junk Moose provides fast, affordable junk removal in Beaverton OR. We serve all Beaverton neighborhoods including Cedar Hills, Progress Ridge, and the areas near Beaverton Town Center. Beaverton residents love our upfront pricing and same-day service. From Beaverton apartment cleanouts to Beaverton construction debris removal, we handle it all. Our crew knows Beaverton well and we're typically on-site within hours of your call.",
    neighborhoods: "Cedar Hills, Progress Ridge, Murrayhill, Sexton Mountain, Central Beaverton",
    faqs: [
      { q: "How quickly can you get to Beaverton?", a: "Beaverton is one of our core service areas — we can typically be there within 2-3 hours of your call." },
      { q: "Do you serve the Cedar Hills area?", a: "Yes — Cedar Hills, Progress Ridge, Murrayhill, and all Beaverton neighborhoods." },
      { q: "Is pricing different for Beaverton?", a: "Nope — same upfront pricing as all our service areas. No travel fees for Beaverton." },
    ],
  },
  {
    slug: "gresham",
    city: "Gresham",
    state: "OR",
    description:
      "Need junk removed in Gresham OR? The Junk Moose serves all of Gresham and East Multnomah County. We handle furniture removal, yard waste, construction debris, and full property cleanouts throughout Gresham. From the Gresham downtown area to neighborhoods near Mt. Hood Community College, our crew covers all of Gresham with the same fast, reliable service Portland knows us for.",
    neighborhoods: "Downtown Gresham, Centennial, Pleasant Valley, Rockwood, Powell Valley",
    faqs: [
      { q: "Do you charge extra to come to Gresham?", a: "No — Gresham is within our standard service area. Same pricing, no travel surcharge." },
      { q: "How fast can you get to Gresham?", a: "Most Gresham pickups happen within 2-4 hours. Same-day service available." },
      { q: "Do you serve the Rockwood area?", a: "Yes — Rockwood, Pleasant Valley, Centennial, and all Gresham neighborhoods." },
    ],
  },
  {
    slug: "lake-oswego",
    city: "Lake Oswego",
    state: "OR",
    description:
      "The Junk Moose provides premium junk removal service in Lake Oswego OR. We understand Lake Oswego homeowners expect a higher standard — that's exactly what we deliver. From estate cleanouts in Lake Oswego's lakefront homes to furniture removal in First Addition, we handle every Lake Oswego job with care and professionalism. Our crew treats your Lake Oswego property with respect.",
    neighborhoods: "First Addition, Lake Grove, Westlake, Mountain Park, Palisades",
    faqs: [
      { q: "Do you handle Lake Oswego estate cleanouts?", a: "Yes — we've done many estate cleanouts in Lake Oswego. We work carefully and can set aside items you want to keep." },
      { q: "Is there a premium for Lake Oswego?", a: "No — same transparent pricing for Lake Oswego as all our service areas." },
      { q: "Can you work around HOA rules in Lake Oswego?", a: "Absolutely — we're familiar with Lake Oswego HOA requirements and schedule accordingly." },
    ],
  },
  {
    slug: "tigard",
    city: "Tigard",
    state: "OR",
    description:
      "The Junk Moose delivers reliable junk removal in Tigard OR. We serve all Tigard neighborhoods including areas near Bridgeport Village, Durham, and Bull Mountain. Tigard homeowners trust us for everything from garage cleanouts to full property clearing. Same-day junk removal available in Tigard for calls before noon. Upfront pricing, no hidden fees.",
    neighborhoods: "Bull Mountain, Durham, Metzger, Tigard Triangle, Summerlake",
    faqs: [
      { q: "How fast can you get to Tigard?", a: "Tigard is a quick drive for our crew — typically 2-3 hours from booking to arrival." },
      { q: "Do you serve the Bull Mountain area?", a: "Yes — Bull Mountain, Durham, Metzger, and all Tigard neighborhoods." },
      { q: "Can I get same-day service in Tigard?", a: "Yes — call before noon and we'll be there the same day." },
    ],
  },
  {
    slug: "hillsboro",
    city: "Hillsboro",
    state: "OR",
    description:
      "The Junk Moose serves Hillsboro OR with fast, professional junk removal. From Orenco Station to downtown Hillsboro, we cover every neighborhood. Hillsboro's growing tech corridor means lots of office cleanouts and residential moves — we handle both. Whether it's a Hillsboro garage packed with old stuff or a Hillsboro commercial space that needs clearing, our crew is ready.",
    neighborhoods: "Orenco Station, Tanasbourne, AmberGlen, Downtown Hillsboro, Jackson School",
    faqs: [
      { q: "Do you serve Hillsboro's tech campuses?", a: "Yes — we do commercial junk removal for businesses throughout Hillsboro including the tech corridor." },
      { q: "Is Hillsboro within your service area?", a: "Absolutely — Hillsboro is a core part of our metro area coverage." },
      { q: "How fast can you get to Hillsboro?", a: "Most Hillsboro pickups are scheduled within 2-4 hours. Same-day available." },
    ],
  },
  {
    slug: "vancouver-wa",
    city: "Vancouver",
    state: "WA",
    description:
      "The Junk Moose now serves Vancouver WA! We cross the Columbia to bring the same fast, reliable junk removal service to Vancouver Washington. From Vancouver's downtown waterfront to Salmon Creek and Hazel Dell, we cover all Vancouver WA neighborhoods. Same upfront pricing, same-day service, same crew that Portland trusts.",
    neighborhoods: "Downtown Vancouver, Salmon Creek, Hazel Dell, Felida, Cascade Park",
    faqs: [
      { q: "Do you really serve Vancouver WA?", a: "Yes — we cross the bridge regularly. Vancouver WA is a full part of our service area." },
      { q: "Is there an extra fee for Vancouver WA?", a: "No — same pricing as our Oregon service areas. No bridge toll surcharge." },
      { q: "How fast can you get to Vancouver WA?", a: "Depending on traffic, typically 2-4 hours from booking. Same-day available for morning calls." },
    ],
  },
  {
    slug: "tualatin",
    city: "Tualatin",
    state: "OR",
    description:
      "The Junk Moose provides junk removal in Tualatin OR for homes and businesses. We serve all of Tualatin from the Tualatin Commons area to Martinazzi and beyond. Tualatin residents count on us for fast service, honest pricing, and a crew that actually shows up on time. From single-item pickups to full Tualatin property cleanouts, we handle it all.",
    neighborhoods: "Tualatin Commons, Martinazzi, Byrom, Sagert, Ibach",
    faqs: [
      { q: "How fast can you get to Tualatin?", a: "Tualatin is within our core service area — most pickups happen within 2-3 hours." },
      { q: "Do you serve Tualatin businesses?", a: "Yes — we do commercial junk removal throughout Tualatin." },
      { q: "Is same-day available in Tualatin?", a: "Yes — call before noon for same-day Tualatin junk removal." },
    ],
  },
  {
    slug: "milwaukie",
    city: "Milwaukie",
    state: "OR",
    description:
      "The Junk Moose handles junk removal in Milwaukie OR with the same speed and reliability we're known for across the metro. We serve all Milwaukie neighborhoods including the areas near downtown Milwaukie, Ardenwald, and Island Station. Milwaukie homeowners appreciate our no-nonsense pricing and professional crew.",
    neighborhoods: "Downtown Milwaukie, Ardenwald, Island Station, Hector Campbell, Lake Road",
    faqs: [
      { q: "Do you serve Milwaukie?", a: "Yes — Milwaukie is within our standard service area. No extra fees." },
      { q: "How fast can you get to Milwaukie?", a: "Milwaukie is close to our home base — typically 1-3 hours from booking." },
      { q: "Can I get a Milwaukie cleanout done same-day?", a: "Yes — call before noon and we'll schedule you for same-day service." },
    ],
  },
  {
    slug: "oregon-city",
    city: "Oregon City",
    state: "OR",
    description:
      "The Junk Moose brings reliable junk removal to Oregon City OR. From the historic downtown Oregon City area to the Beavercreek Road corridor and McLoughlin neighborhoods, we cover all of Oregon City. Whether you need furniture hauled from an Oregon City home or debris cleared from a property, our crew handles it all with the professionalism Oregon City residents expect.",
    neighborhoods: "Downtown Oregon City, Beavercreek, McLoughlin, Park Place, Canemah",
    faqs: [
      { q: "Is Oregon City within your service area?", a: "Yes — Oregon City is a full part of our metro area coverage." },
      { q: "How fast can you get to Oregon City?", a: "Most Oregon City pickups happen within 2-4 hours of booking." },
      { q: "Do you charge extra for Oregon City?", a: "No — same pricing as all our service areas. No distance surcharge." },
    ],
  },
];

export const HOMEPAGE_FAQS = [
  {
    q: "How much does junk removal cost?",
    a: "Pricing depends on the volume and type of items. We give free, no-obligation quotes upfront — what we quote is what you pay. Most single-truck loads run between $250–$500.",
  },
  {
    q: "Do you serve my area?",
    a: "We cover all of Portland and the surrounding Metro Area including Beaverton, Gresham, Lake Oswego, Tigard, Hillsboro, Tualatin, Milwaukie, Oregon City, and Vancouver WA.",
  },
  {
    q: "How fast can you show up?",
    a: "We offer same-day service for calls placed before noon. Most pickups are completed within 2–4 hours of booking. Need it faster? Just ask — we'll do our best.",
  },
  {
    q: "What items do you NOT take?",
    a: "We can't haul hazardous materials like paint, chemicals, asbestos, or medical waste. Pretty much everything else is fair game. When in doubt, give us a call.",
  },
  {
    q: "Do I need to be home during pickup?",
    a: "Nope. As long as we can access the items and you've approved the quote, we'll get it done. We'll send a photo confirmation when the job's complete.",
  },
  {
    q: "How do I get a quote?",
    a: "Call or text us at (503) 555-0100, or fill out the form on this page. We typically respond within 15 minutes during business hours.",
  },
];
