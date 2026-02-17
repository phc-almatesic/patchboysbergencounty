// Blog content generation configuration
// Topics, templates, and prompts for automated blog post generation

export const BLOG_CONFIG = {
  contentDir: "content/blog",
  model: "claude-sonnet-4-20250514" as const,
  maxTokens: 4096,
  targetWordCount: { min: 800, max: 1200 },
};

export const BUSINESS_INFO = {
  name: "The Patch Boys of Bergen County",
  phone: "(201) 630-7181",
  website: "https://www.bergencountypatchboys.com",
  contactPage: "/contact/",
};

// Service slugs matching src/lib/data.ts
export const SERVICES = [
  { slug: "drywall-repair", title: "Drywall Repair" },
  { slug: "ceiling-repair", title: "Ceiling Repair" },
  { slug: "plaster-repair", title: "Plaster Repair" },
  { slug: "drywall-installation", title: "Drywall Installation" },
  { slug: "popcorn-ceiling-removal", title: "Popcorn Ceiling Removal" },
  { slug: "texture-matching", title: "Texture Matching" },
  { slug: "painting", title: "Painting & Touch-Up" },
];

// Town data matching src/lib/data.ts
export const TOWNS = [
  { slug: "hackensack", name: "Hackensack", zip: "07601", tier: 1 },
  { slug: "paramus", name: "Paramus", zip: "07652", tier: 2 },
  { slug: "teaneck", name: "Teaneck", zip: "07666", tier: 1 },
  { slug: "fort-lee", name: "Fort Lee", zip: "07024", tier: 1 },
  { slug: "englewood", name: "Englewood", zip: "07631", tier: 2 },
  { slug: "ridgewood", name: "Ridgewood", zip: "07450", tier: 2 },
  { slug: "bergenfield", name: "Bergenfield", zip: "07621", tier: 2 },
  { slug: "fair-lawn", name: "Fair Lawn", zip: "07410", tier: 1 },
  { slug: "garfield", name: "Garfield", zip: "07026", tier: 1 },
  { slug: "lodi", name: "Lodi", zip: "07644", tier: 2 },
  { slug: "mahwah", name: "Mahwah", zip: "07430", tier: 2 },
  { slug: "ramsey", name: "Ramsey", zip: "07446", tier: 3 },
  { slug: "wyckoff", name: "Wyckoff", zip: "07481", tier: 3 },
  { slug: "glen-rock", name: "Glen Rock", zip: "07452", tier: 3 },
  { slug: "rutherford", name: "Rutherford", zip: "07070", tier: 3 },
  { slug: "lyndhurst", name: "Lyndhurst", zip: "07071", tier: 3 },
  { slug: "saddle-brook", name: "Saddle Brook", zip: "07663", tier: 3 },
  { slug: "river-edge", name: "River Edge", zip: "07661", tier: 3 },
  { slug: "closter", name: "Closter", zip: "07624", tier: 4 },
  { slug: "westwood", name: "Westwood", zip: "07675", tier: 3 },
  { slug: "dumont", name: "Dumont", zip: "07628", tier: 3 },
  { slug: "new-milford", name: "New Milford", zip: "07646", tier: 3 },
  { slug: "oradell", name: "Oradell", zip: "07649", tier: 4 },
  { slug: "waldwick", name: "Waldwick", zip: "07463", tier: 3 },
  { slug: "upper-saddle-river", name: "Upper Saddle River", zip: "07458", tier: 4 },
  { slug: "allendale", name: "Allendale", zip: "07401", tier: 4 },
  { slug: "cresskill", name: "Cresskill", zip: "07626", tier: 4 },
  { slug: "demarest", name: "Demarest", zip: "07627", tier: 4 },
  { slug: "emerson", name: "Emerson", zip: "07630", tier: 4 },
  { slug: "hillsdale", name: "Hillsdale", zip: "07642", tier: 3 },
  { slug: "montvale", name: "Montvale", zip: "07645", tier: 4 },
  { slug: "park-ridge", name: "Park Ridge", zip: "07656", tier: 4 },
  { slug: "washington-township", name: "Washington Township", zip: "07676", tier: 3 },
  { slug: "woodcliff-lake", name: "Woodcliff Lake", zip: "07677", tier: 4 },
  { slug: "haworth", name: "Haworth", zip: "07641", tier: 4 },
  { slug: "old-tappan", name: "Old Tappan", zip: "07675", tier: 4 },
  { slug: "northvale", name: "Northvale", zip: "07647", tier: 4 },
  { slug: "norwood", name: "Norwood", zip: "07648", tier: 4 },
];

// Content template types
export type TemplateType = "location" | "how-to" | "cost" | "signs" | "diy-vs-pro" | "seasonal";

export interface TopicEntry {
  id: string;
  template: TemplateType;
  title: string;
  slug: string;
  service: string;
  town?: string;
  categories: string[];
  tags: string[];
  primaryKeyword: string;
  generated: boolean;
}

// System prompt for the AI content generator
export const SYSTEM_PROMPT = `You are a content writer for The Patch Boys of Bergen County, a drywall repair company serving Bergen County, NJ. Write helpful, informative blog posts that provide genuine value to homeowners.

Guidelines:
- Write in a friendly, professional, knowledgeable tone
- Include specific, actionable advice homeowners can use
- Naturally incorporate the target town name and service keywords
- Reference real local details about Bergen County when relevant
- Include a clear call-to-action mentioning free estimates
- Target 800-1,200 words for the body content
- Use H2 and H3 subheadings for structure (use markdown ## and ###)
- Do NOT sound like AI-generated marketing fluff — write naturally
- Do NOT keyword-stuff — keep keyword density natural (1-2%)
- Include at least one FAQ-style question and answer section
- Mention the phone number (201) 630-7181 where appropriate
- Include markdown links to relevant service pages and area pages on the site
- End with a call-to-action linking to /contact/ for free estimates

Service page URLs you can link to:
- /services/drywall-repair/
- /services/ceiling-repair/
- /services/plaster-repair/
- /services/drywall-installation/
- /services/popcorn-ceiling-removal/
- /services/texture-matching/
- /services/painting/

Area page URLs you can link to (use /areas/{town-slug}/ format):
Examples: /areas/hackensack/, /areas/fort-lee/, /areas/ridgewood/, /areas/paramus/, /areas/teaneck/

IMPORTANT: Output ONLY the markdown body content. Do NOT include YAML frontmatter — that will be added separately. Start directly with the first ## heading.`;

// Template-specific user prompts
export function getUserPrompt(topic: TopicEntry): string {
  const town = topic.town ? TOWNS.find((t) => t.slug === topic.town) : null;
  const service = SERVICES.find((s) => s.slug === topic.service);

  switch (topic.template) {
    case "location":
      return `Write a blog post titled "${topic.title}" about ${service?.title} for homeowners in ${town?.name}, NJ ${town?.zip}.

The post should be SEO-optimized for the primary keyword "${topic.primaryKeyword}".

Structure:
1. Engaging introduction mentioning ${town?.name} and common drywall problems
2. H2: "Common ${service?.title} Problems in ${town?.name} Homes" (3-4 problems with local context)
3. H2: "Our ${service?.title} Services in ${town?.name}" (brief description, link to /services/${service?.slug}/)
4. H2: "How Much Does ${service?.title} Cost in ${town?.name}?" (general price ranges)
5. H2: "Why ${town?.name} Homeowners Choose The Patch Boys" (trust signals)
6. H2: "Frequently Asked Questions" (3-4 Q&As)
7. H2: "Get a Free Estimate in ${town?.name}" (CTA with phone number and link to /contact/)

Include links to /areas/${town?.slug}/ and 2-3 nearby town area pages.`;

    case "how-to":
      return `Write a blog post titled "${topic.title}" providing practical guidance on ${service?.title.toLowerCase()}.

The post should be SEO-optimized for the primary keyword "${topic.primaryKeyword}".

Structure:
1. Introduction explaining the problem and why it matters
2. H2: "What Causes This Problem?" (3-4 common causes)
3. H2: "Can You DIY This Repair?" (honest assessment — small jobs may be DIY, larger ones need a pro)
4. H2: "Step-by-Step Guide" (basic steps for smaller repairs)
5. H2: "When to Call a Professional" (clear criteria, link to /services/${service?.slug}/)
6. H2: "How The Patch Boys Handles This" (process overview)
7. H2: "Frequently Asked Questions" (3-4 Q&As)
8. Conclusion with CTA (free estimate, phone number, link to /contact/)

Mention Bergen County context where natural. Link to relevant service pages.`;

    case "cost":
      return `Write a blog post titled "${topic.title}" providing cost information for ${service?.title.toLowerCase()} in Bergen County, NJ.

The post should be SEO-optimized for the primary keyword "${topic.primaryKeyword}".

Structure:
1. Introduction with a quick cost range answer upfront
2. H2: "Average ${service?.title} Costs" (include a markdown table with repair types and price ranges)
3. H2: "What Affects the Cost?" (5-6 factors)
4. H2: "Is This Covered by Insurance?" (when applicable)
5. H2: "How to Get the Best Value" (tips including free estimates)
6. H2: "Frequently Asked Questions" (3-4 Q&As about pricing)
7. H2: "Get Your Free Estimate Today" (CTA with phone and /contact/ link)

Include the current year (2026) in the content. Link to /services/${service?.slug}/.`;

    case "signs":
      return `Write a blog post titled "${topic.title}" helping homeowners identify when they need professional ${service?.title.toLowerCase()}.

The post should be SEO-optimized for the primary keyword "${topic.primaryKeyword}".

Structure:
1. Introduction about why ignoring damage gets worse
2. Numbered H2 sections for each sign (5-7 signs), each with an explanation and urgency level
3. H2: "What Happens If You Ignore These Signs?" (consequences: mold, structural, home value)
4. H2: "Frequently Asked Questions" (3-4 Q&As)
5. H2: "How The Patch Boys Can Help" (services overview, CTA with phone and /contact/ link)

Mention Bergen County context where natural. Link to /services/${service?.slug}/.`;

    case "diy-vs-pro":
      return `Write a blog post titled "${topic.title}" helping Bergen County homeowners decide between DIY and professional ${service?.title.toLowerCase()}.

The post should be SEO-optimized for the primary keyword "${topic.primaryKeyword}".

Structure:
1. Honest introduction — some repairs are DIY-friendly, others are not
2. H2: "When You Can DIY" (small, simple jobs; list tools needed)
3. H2: "When You Need a Professional" (large areas, water damage, ceilings, texture matching)
4. H2: "Cost Comparison: DIY vs Professional" (materials cost vs pro cost, risk of re-doing work)
5. H2: "Common DIY Mistakes That Cost More to Fix" (3-4 real mistakes)
6. H2: "Frequently Asked Questions" (3-4 Q&As)
7. H2: "Why Bergen County Homeowners Trust The Patch Boys" (CTA with phone and /contact/ link)

Link to /services/${service?.slug}/ and related service pages.`;

    case "seasonal":
      return `Write a blog post titled "${topic.title}" about seasonal drywall concerns for Bergen County homeowners.

The post should be SEO-optimized for the primary keyword "${topic.primaryKeyword}".

Structure:
1. Introduction about why this season matters for homes in NJ
2. H2: "How This Season Affects Your Walls and Ceilings" (weather, humidity, freeze-thaw in Bergen County)
3. H2: "Things to Check This Season" (actionable checklist, 4-6 items)
4. H2: "Common Seasonal Drywall Problems" (3-4 specific issues)
5. H2: "How to Protect Your Home" (prevention tips)
6. H2: "Frequently Asked Questions" (3-4 Q&As)
7. H2: "Need Repairs? Get a Free Estimate" (CTA with phone and /contact/ link)

Link to 2-3 relevant service pages. Mention specific Bergen County towns where natural.`;

    default:
      return `Write a blog post titled "${topic.title}" about ${service?.title.toLowerCase()} for Bergen County, NJ homeowners. Target the keyword "${topic.primaryKeyword}". Include FAQ section and CTA with phone number (201) 630-7181 and link to /contact/.`;
  }
}

// Generate the initial topic queue
export function generateTopicQueue(): TopicEntry[] {
  const topics: TopicEntry[] = [];
  let id = 1;

  // Location guides — Tier 1 towns first, then Tier 2, etc.
  const townsByTier = [...TOWNS].sort((a, b) => a.tier - b.tier);
  for (const town of townsByTier) {
    topics.push({
      id: `loc-${id++}`,
      template: "location",
      title: `Drywall Repair in ${town.name}, NJ: Complete Homeowner's Guide`,
      slug: `drywall-repair-${town.slug}-nj`,
      service: "drywall-repair",
      town: town.slug,
      categories: ["Drywall Repair", "Location Guides"],
      tags: [town.slug, "drywall repair", "bergen county"],
      primaryKeyword: `drywall repair ${town.name} NJ`,
      generated: false,
    });
  }

  // Cost guides — one per service
  for (const service of SERVICES) {
    topics.push({
      id: `cost-${id++}`,
      template: "cost",
      title: `Cost of ${service.title} in Bergen County (2026)`,
      slug: `cost-of-${service.slug}-bergen-county`,
      service: service.slug,
      categories: ["Cost Guides", service.title],
      tags: [service.slug, "cost guide", "bergen county", "pricing"],
      primaryKeyword: `${service.title.toLowerCase()} cost Bergen County NJ`,
      generated: false,
    });
  }

  // How-to guides
  const howToTopics = [
    { title: "How to Fix Water-Damaged Drywall: Bergen County Homeowner's Guide", slug: "how-to-fix-water-damaged-drywall", service: "drywall-repair", keyword: "how to fix water damaged drywall" },
    { title: "How to Fix a Large Hole in Drywall: A Bergen County Guide", slug: "how-to-fix-large-hole-in-drywall", service: "drywall-repair", keyword: "how to fix large hole in drywall" },
    { title: "How to Repair Ceiling Cracks: Bergen County Homeowner's Guide", slug: "how-to-repair-ceiling-cracks", service: "ceiling-repair", keyword: "how to repair ceiling cracks" },
    { title: "How to Fix Nail Pops in Drywall: A Bergen County Guide", slug: "how-to-fix-nail-pops-drywall", service: "drywall-repair", keyword: "how to fix nail pops in drywall" },
    { title: "How to Match Drywall Texture After a Repair", slug: "how-to-match-drywall-texture", service: "texture-matching", keyword: "how to match drywall texture" },
    { title: "How to Repair Plaster Walls in Older Bergen County Homes", slug: "how-to-repair-plaster-walls", service: "plaster-repair", keyword: "how to repair plaster walls" },
    { title: "How to Fix Drywall After a Water Leak", slug: "how-to-fix-drywall-after-water-leak", service: "drywall-repair", keyword: "drywall repair after water leak" },
  ];
  for (const t of howToTopics) {
    topics.push({
      id: `howto-${id++}`,
      template: "how-to",
      title: t.title,
      slug: t.slug,
      service: t.service,
      categories: ["How-To Guides", SERVICES.find((s) => s.slug === t.service)?.title || ""],
      tags: [t.service, "how-to", "bergen county", "diy"],
      primaryKeyword: t.keyword,
      generated: false,
    });
  }

  // Signs posts
  const signsTopics = [
    { title: "7 Signs You Need Ceiling Repair (Don't Ignore #3)", slug: "signs-you-need-ceiling-repair", service: "ceiling-repair", keyword: "signs you need ceiling repair" },
    { title: "5 Signs Your Plaster Walls Need Professional Repair", slug: "signs-plaster-walls-need-repair", service: "plaster-repair", keyword: "signs you need plaster repair" },
    { title: "6 Signs You Need Drywall Repair Before It Gets Worse", slug: "signs-you-need-drywall-repair", service: "drywall-repair", keyword: "signs you need drywall repair" },
    { title: "4 Signs It's Time for Popcorn Ceiling Removal", slug: "signs-time-for-popcorn-ceiling-removal", service: "popcorn-ceiling-removal", keyword: "popcorn ceiling removal signs" },
  ];
  for (const t of signsTopics) {
    topics.push({
      id: `signs-${id++}`,
      template: "signs",
      title: t.title,
      slug: t.slug,
      service: t.service,
      categories: ["Home Tips", SERVICES.find((s) => s.slug === t.service)?.title || ""],
      tags: [t.service, "warning signs", "bergen county"],
      primaryKeyword: t.keyword,
      generated: false,
    });
  }

  // DIY vs Pro posts
  const diyTopics = [
    { title: "DIY vs Professional Drywall Repair: What Bergen County Homeowners Should Know", slug: "diy-vs-professional-drywall-repair", service: "drywall-repair", keyword: "DIY vs professional drywall repair" },
    { title: "DIY vs Professional Popcorn Ceiling Removal: Is It Worth the Risk?", slug: "diy-vs-professional-popcorn-ceiling-removal", service: "popcorn-ceiling-removal", keyword: "DIY popcorn ceiling removal" },
    { title: "DIY vs Professional Plaster Repair: When to Call an Expert", slug: "diy-vs-professional-plaster-repair", service: "plaster-repair", keyword: "DIY vs professional plaster repair" },
  ];
  for (const t of diyTopics) {
    topics.push({
      id: `diy-${id++}`,
      template: "diy-vs-pro",
      title: t.title,
      slug: t.slug,
      service: t.service,
      categories: ["DIY vs Professional", SERVICES.find((s) => s.slug === t.service)?.title || ""],
      tags: [t.service, "diy", "bergen county"],
      primaryKeyword: t.keyword,
      generated: false,
    });
  }

  // Seasonal posts
  const seasonalTopics = [
    { title: "Winter Drywall Damage: What Bergen County Homeowners Need to Know", slug: "winter-drywall-damage-bergen-county", service: "drywall-repair", keyword: "winter drywall damage NJ" },
    { title: "Spring Renovation Guide: Drywall Projects for Bergen County Homes", slug: "spring-drywall-renovation-bergen-county", service: "drywall-installation", keyword: "spring home renovation Bergen County" },
    { title: "Summer Humidity and Your Walls: Bergen County Homeowner's Guide", slug: "summer-humidity-drywall-bergen-county", service: "drywall-repair", keyword: "humidity drywall damage NJ" },
    { title: "Fall Home Prep: Drywall Checks Before the Holidays", slug: "fall-drywall-checks-bergen-county", service: "drywall-repair", keyword: "fall home repair Bergen County" },
  ];
  for (const t of seasonalTopics) {
    topics.push({
      id: `seasonal-${id++}`,
      template: "seasonal",
      title: t.title,
      slug: t.slug,
      service: t.service,
      categories: ["Seasonal Tips", SERVICES.find((s) => s.slug === t.service)?.title || ""],
      tags: [t.service, "seasonal", "bergen county"],
      primaryKeyword: t.keyword,
      generated: false,
    });
  }

  return topics;
}

// Interleave topics so we don't publish the same template type back-to-back
export function getScheduledOrder(topics: TopicEntry[]): TopicEntry[] {
  const byTemplate: Record<TemplateType, TopicEntry[]> = {
    location: [],
    cost: [],
    "how-to": [],
    signs: [],
    "diy-vs-pro": [],
    seasonal: [],
  };

  for (const t of topics) {
    if (!t.generated) {
      byTemplate[t.template].push(t);
    }
  }

  // Interleave: cost, location, how-to, signs, location, diy-vs-pro, seasonal, location, ...
  const order: TemplateType[] = ["cost", "location", "how-to", "signs", "location", "diy-vs-pro", "seasonal", "location"];
  const result: TopicEntry[] = [];
  const indices: Record<TemplateType, number> = {
    location: 0, cost: 0, "how-to": 0, signs: 0, "diy-vs-pro": 0, seasonal: 0,
  };

  let safetyCounter = 0;
  const maxIterations = topics.length;

  while (result.length < topics.filter((t) => !t.generated).length && safetyCounter < maxIterations) {
    for (const template of order) {
      const pool = byTemplate[template];
      if (indices[template] < pool.length) {
        result.push(pool[indices[template]]);
        indices[template]++;
      }
    }
    safetyCounter++;
  }

  return result;
}
