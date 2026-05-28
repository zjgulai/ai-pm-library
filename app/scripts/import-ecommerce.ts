import { getDb } from "../api/queries/connection";
import { skills } from "../db/schema";

async function importEcommerceSkills() {
  const db = getDb();
  console.log("Importing 158 ecommerce skills...");
  let count = 0;

  await db.insert(skills).values({
    title: "Amazon Global Selling 🌍",
    titleEn: "Amazon Global Selling 🌍",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-global-selling
description: \"Evaluate and plan Amazon marketplace expansion to international sites. Market sizing, regulatory requirements, logistics planning, and localization strategy for EU, UK, Japan, Australia, and other Amazon marketplaces.\"
metadata:
  nexscope:
    emoji: \"🌍\"
    category: amazon
---

# Amazon Global Selling 🌍

Evaluate and plan Amazon marketplace expansion to international sites. Market sizing, regulatory requirements, logistics planning, and localization strategy for EU, UK, Japan, Australia, and other Amazon marketplaces.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-global-selling -g
```

## Usage

```
I sell kitchen products on Amazon US doing $50K/month. Should I expand to Amazon UK and Germany? What do I need to prepare?
```

## Capabilities

- Marketplace opportunity assessment (demand, competition, fees per country)
- Regulatory and compliance requirements by market (CE marking, WEEE, etc.)
- Logistics and fulfillment options (FBA export, local FBA, 3PL)
- Listing localization strategy (translation, keyword research, cultural adaptation)
- Tax and VAT registration requirements
- Currency and pricing strategy
- Phased expansion roadmap (which markets first and why)

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include",
    description: "name: amazon-global-selling",
    descriptionEn: "name: amazon-global-selling",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 71, views: "8.1K", comments: 4,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Brand Tailored Promotions",
    titleEn: "Amazon Brand Tailored Promotions",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "品牌"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "品牌"],
    content: "---
name: amazon-brand-tailored-promotions
description: \"Brand Tailored Promotions — audience targeting, discount tiers, customer segmentation, repeat purchase incentives\"
metadata:
  nexscope:
    category: amazon
---

# Amazon Brand Tailored Promotions

Brand Tailored Promotions — audience targeting, discount tiers, customer segmentation, repeat purchase incentives

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-brand-tailored-promotions
```

## Usage

```
Help me with amazon brand tailored promotions for my e-commerce business.
```

## Capabilities

- Brand Tailored Promotions
- audience targeting
- discount tiers
- customer segmentation
- repeat purchase incentives

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-brand-tailored-promotions",
    descriptionEn: "name: amazon-brand-tailored-promotions",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 64, views: "3.7K", comments: 7,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon FBA Calculator (Lite)",
    titleEn: "Amazon FBA Calculator (Lite)",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "FBA"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "FBA"],
    content: "---
name: amazon-fba-calculator
version: 1.0.0
description: Amazon FBA Calculator - Complete fee breakdown and profit analysis
platform: amazon
lang: en
---

# Amazon FBA Calculator (Lite)

Precise FBA fee calculation based on product dimensions and weight.

## Features

- **Size Tier Detection** - Automatic classification
- **FBA Fulfillment Fee** - 2024 rates
- **Monthly Storage Fee** - Standard & Peak season
- **Long-term Storage Fee** - 271+ days aging
- **Referral Fee** - By category
- **Profit Analysis** - Gross/Net margin, ROI
- **Optimization Tips** - Size, weight, inventory

## Size Tiers (2024)

| Tier | Max Weight | Max Dimensions |
|------|------------|----------------|
| Small Standard | 1 lb | 15\"×12\"×0.75\" |
| Large Standard | 20 lb | 18\"×14\"×8\" |
| Small Oversize | 70 lb | 60\"×30\" |
| Medium Oversize | 150 lb | L+Girth ≤108\" |
| Large Oversize | 150 lb | L+Girth ≤165\" |
| Special Oversize | >150 lb | >165\" |

## Input

```json
{
  \"length\": 10.0,
  \"width\": 6.0,
  \"height\": 3.0,
  \"weight\": 1.2,
  \"selling_price\": 29.99,
  \"product_cost\": 8.00,
  \"inbound_shipping_cost\": 1.50,
  \"category\": \"kitchen\"
}
```

## Output

- Size tier classification
- Fee breakdown table
- Profit metrics (margin, ROI)
- Optimization suggestions

## Usage

```bash
python3 scripts/calculator.py
python3 scripts/calculator.py '{\"length\": 10, \"width\": 6, ...}' --zh
```

---

_Version 1.0.0 | Platform: Amazon | Variant: Lite_

---

**Part of [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI tools for e-commerce sellers.**",
    description: "name: amazon-fba-calculator",
    descriptionEn: "name: amazon-fba-calculator",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 52, views: "9.0K", comments: 15,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon FBA Prep 📋",
    titleEn: "Amazon FBA Prep 📋",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "FBA"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "FBA"],
    content: "---
name: amazon-fba-prep
description: \"Complete FBA preparation guide. Product labeling, packaging requirements, shipment planning, and compliance with Amazon's fulfillment center requirements. Avoid common rejection reasons.\"
metadata:
  nexscope:
    emoji: \"📋\"
    category: amazon
---

# Amazon FBA Prep 📋

Complete FBA preparation guide. Product labeling, packaging requirements, shipment planning, and compliance with Amazon's fulfillment center requirements. Avoid common rejection reasons.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-fba-prep -g
```

## Usage

```
I'm sending my first FBA shipment — 500 units of a glass water bottle. Walk me through the entire prep process so nothing gets rejected.
```

## Capabilities

- FBA prep requirements checklist by product type
- FNSKU labeling guide and best practices
- Packaging requirements (poly bags, bubble wrap, overboxing)
- Shipment plan creation methodology
- Carton packing optimization for minimum fees
- Common FBA rejection reasons and how to avoid them
- Prep service vs self-prep cost comparison

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete n",
    description: "name: amazon-fba-prep",
    descriptionEn: "name: amazon-fba-prep",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 79, views: "6.8K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Enhanced Brand Content",
    titleEn: "Amazon Enhanced Brand Content",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "品牌"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "品牌"],
    content: "---
name: amazon-enhanced-brand-content
description: \"Premium A+ and Brand Story — module design, lifestyle imagery, comparison charts, mobile optimization\"
metadata:
  nexscope:
    category: amazon
---

# Amazon Enhanced Brand Content

Premium A+ and Brand Story — module design, lifestyle imagery, comparison charts, mobile optimization

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-enhanced-brand-content
```

## Usage

```
Help me with amazon enhanced brand content for my e-commerce business.
```

## Capabilities

- Premium A+ and Brand Story
- module design
- lifestyle imagery
- comparison charts
- mobile optimization

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-enhanced-brand-content",
    descriptionEn: "name: amazon-enhanced-brand-content",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 78, views: "7.6K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Private Label",
    titleEn: "Amazon Private Label",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-private-label
description: \"Private label launch playbook — product selection, branding, supplier management, differentiation strategy\"
metadata:
  nexscope:
    category: amazon
---

# Amazon Private Label

Private label launch playbook — product selection, branding, supplier management, differentiation strategy

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-private-label
```

## Usage

```
Help me with amazon private label for my e-commerce business.
```

## Capabilities

- Private label launch playbook
- product selection
- branding
- supplier management
- differentiation strategy

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-private-label",
    descriptionEn: "name: amazon-private-label",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 76, views: "9.1K", comments: 4,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon International Listings",
    titleEn: "Amazon International Listings",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "Listing优化"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "Listing优化"],
    content: "---
name: amazon-international-listings
description: \"Multi-marketplace listing management — translation, pricing localization, BIL (Build International Listings)\"
metadata:
  nexscope:
    category: amazon
---

# Amazon International Listings

Multi-marketplace listing management — translation, pricing localization, BIL (Build International Listings)

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-international-listings
```

## Usage

```
Help me with amazon international listings for my e-commerce business.
```

## Capabilities

- Multi-marketplace listing management
- translation
- pricing localization
- BIL (Build International Listings)

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-international-listings",
    descriptionEn: "name: amazon-international-listings",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 68, views: "5.7K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Negative Keywords 🚫",
    titleEn: "Amazon Negative Keywords 🚫",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "关键词"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "关键词"],
    content: "---
name: amazon-negative-keywords
description: \"Optimize Amazon PPC campaigns by identifying and managing negative keywords. Reduce wasted ad spend by eliminating irrelevant search terms while protecting valuable converting terms.\"
metadata:
  nexscope:
    emoji: \"🚫\"
    category: amazon
---

# Amazon Negative Keywords 🚫

Optimize Amazon PPC campaigns by identifying and managing negative keywords. Reduce wasted ad spend by eliminating irrelevant search terms while protecting valuable converting terms.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/Amazon-Skills --skill amazon-negative-keywords -g
```

## Usage

```
Analyze my Amazon search term report. I'm spending $2,000/month on PPC with 40% ACoS. Help me find negative keywords to cut waste.
```

## Capabilities

- Search term report analysis for negative keyword candidates
- Negative keyword categorization (irrelevant, low-converting, competitor)
- Campaign-level vs ad-group-level negative targeting strategy
- Negative phrase vs negative exact match decision framework
- Estimated savings calculation from negative keyword implementation
- Ongoing negative keyword management workflow

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️",
    description: "name: amazon-negative-keywords",
    descriptionEn: "name: amazon-negative-keywords",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 57, views: "4.0K", comments: 15,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Backend Keywords 🏷️",
    titleEn: "Amazon Backend Keywords 🏷️",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "关键词"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "关键词"],
    content: "---
name: amazon-backend-keywords
description: \"Optimize Amazon backend search terms for maximum discoverability. Generate the optimal 250-byte backend keyword set by deduplicating, prioritizing, and formatting keywords that aren't already in your listing.\"
metadata:
  nexscope:
    emoji: \"🏷️\"
    category: amazon
---

# Amazon Backend Keywords 🏷️

Optimize Amazon backend search terms for maximum discoverability. Generate the optimal 250-byte backend keyword set by deduplicating, prioritizing, and formatting keywords that aren't already in your listing.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-backend-keywords -g
```

## Usage

```
Optimize my backend keywords. My product is a bamboo laptop stand. Here are my current title and bullets: [paste listing]. Here are 50 keyword candidates: [paste keywords].
```

## Capabilities

- 250-byte limit optimization (maximum keyword coverage in minimum space)
- Deduplication against title, bullets, and description
- Keyword prioritization by relevance and search volume signals
- Spanish/multilingual keyword inclusion strategy
- Misspelling and synonym coverage
- Prohibited term filtering (competitor brands, restricted claims)
- Before/after coverage comparison

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific da",
    description: "name: amazon-backend-keywords",
    descriptionEn: "name: amazon-backend-keywords",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 79, views: "4.0K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Deal Finder 🎫",
    titleEn: "Amazon Deal Finder 🎫",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-deal-finder
description: \"Plan and optimize Amazon promotional deals — Lightning Deals, Best Deals, Coupons, and Prime Exclusive Discounts. Evaluate deal ROI, timing, and strategy for maximum sales impact.\"
metadata:
  nexscope:
    emoji: \"🎫\"
    category: amazon
---

# Amazon Deal Finder 🎫

Plan and optimize Amazon promotional deals — Lightning Deals, Best Deals, Coupons, and Prime Exclusive Discounts. Evaluate deal ROI, timing, and strategy for maximum sales impact.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-deal-finder -g
```

## Usage

```
Should I run a Lightning Deal for my product? It costs $150 fee, my product is $29.99 with 40% margin. I sell about 10 units/day normally.
```

## Capabilities

- Deal type selection (Lightning Deal, Best Deal, Coupon, Prime Exclusive)
- Deal ROI calculator (fee vs incremental sales)
- Optimal timing and seasonality planning
- Inventory preparation for deal volume
- Deal stacking strategy (coupon + deal + PPC)
- Post-deal momentum capture plan

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills:",
    description: "name: amazon-deal-finder",
    descriptionEn: "name: amazon-deal-finder",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 51, views: "8.3K", comments: 9,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon PPC Campaign Optimization 📢",
    titleEn: "Amazon PPC Campaign Optimization 📢",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "广告投放"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "广告投放"],
    content: "---
name: amazon-ppc-campaign
description: \"Amazon PPC campaign builder and optimizer for sellers. Two modes: (A) Build — design a complete campaign structure from scratch with keyword groupings, bid calculations, and negative keyword lists, (B) Optimize — audit existing campaigns using search term reports, identify keyword funnel opportunities, calculate bid adjustments, and generate a week-by-week action plan. Integrates with amazon-keyword-research for keyword input. No API key required. Use when: (1) setting up Amazon PPC campaigns for a new product, (2) auditing existing campaign performance and ACoS, (3) optimizing keyword bids and negative keywords, (4) building Auto/Manual/Exact campaign structures, (5) analyzing search term reports for opportunities, (6) calculating break-even ACoS and target ACoS, (7) scaling profitable campaigns to Sponsored Brands or Display.\"
metadata: {\"nexscope\":{\"emoji\":\"📢\",\"category\":\"amazon\"}}
---

# Amazon PPC Campaign Optimization 📢

Build profitable PPC campaign structures from scratch, or audit and optimize existing campaigns with data-driven bid adjustments. No API key — works out of the box.

## Installation

```bash
npx skills add nexscope-ai/Amazon-Skills --skill amazon-ppc -g
```

## Two Modes

| Mode | When to Use | Input | Output |
|------|-------------|-------|--------|
| **A — Build** | Launching PPC for a new product | Product info + keywords + margins | Complete campaign blueprint + keyword groupings + initial bids |
| **B — Optimize** | Improving existing campaigns | Campaign data + search term reports + current ACoS | Optimization plan + bid adjustments + negative keyword list |

## Capabilities

- **ACoS financial framework**: Calculate break-even ACoS, target ACoS, and Max CPC from product margins — the foundation for every bid decision
- **Campaign architecture design**: Build a structured Auto → Broad → Exact funnel with proper negative keyword isolation between campaigns
- **Keyword grouping**: Org",
    description: "name: amazon-ppc-campaign",
    descriptionEn: "name: amazon-ppc-campaign",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 49, views: "10.6K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Product Research 🔎",
    titleEn: "Amazon Product Research 🔎",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "选品"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "选品"],
    content: "---
name: amazon-product-research
description: \"Comprehensive Amazon product research and opportunity analysis. Evaluate market demand, competition intensity, profit potential, and entry barriers for any product category or niche. Uses BSR data, review analysis, and pricing patterns.\"
metadata:
  nexscope:
    emoji: \"🔎\"
    category: amazon
---

# Amazon Product Research 🔎

Comprehensive Amazon product research and opportunity analysis. Evaluate market demand, competition intensity, profit potential, and entry barriers for any product category or niche. Uses BSR data, review analysis, and pricing patterns.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-product-research -g
```

## Usage

```
I want to sell silicone kitchen utensils on Amazon. Is this a good market? What's the competition like?
```

## Capabilities

- Market demand estimation using BSR and category benchmarks
- Competition intensity scoring (number of sellers, review counts, brand dominance)
- Profit potential calculation including FBA fees and advertising costs
- Entry barrier assessment (capital required, IP risks, certification needs)
- Product differentiation opportunity identification from review gaps
- Seasonal demand pattern analysis

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific",
    description: "name: amazon-product-research",
    descriptionEn: "name: amazon-product-research",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 42, views: "7.0K", comments: 15,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Keyword Research 🔍",
    titleEn: "Amazon Keyword Research 🔍",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "关键词"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "关键词"],
    content: "---
name: amazon-keyword-research
description: \"Amazon keyword research and market opportunity analysis for sellers. Retrieve autocomplete suggestions (long-tail keywords), analyze competitor landscape, and assess market opportunity for any keyword on 12 Amazon marketplaces (US/UK/DE/FR/IT/ES/JP/CA/AU/IN/MX/BR). No API key required. Make sure to use this skill whenever the user mentions Amazon product research, finding products to sell on Amazon, Amazon keyword ideas, niche analysis, competition analysis for Amazon, market opportunity on Amazon, comparing Amazon keywords, evaluating whether a product is worth selling, Amazon autocomplete data, seasonal demand for Amazon products, or anything related to researching what to sell on Amazon — even if they don't explicitly say 'keyword research'. Also trigger when the user asks vague questions like 'is this a good product to sell?', 'what's the competition like for X on Amazon?', 'should I sell X or Y?', or 'what are people searching for on Amazon?'.\"
metadata: {\"nexscope\":{\"emoji\":\"🔍\",\"category\":\"amazon\"}}
---

# Amazon Keyword Research 🔍

Free keyword research for Amazon sellers. No API key — works out of the box.

## Installation

```bash
npx skills add nexscope-ai/Amazon-Skills --skill amazon-keyword-research -g
```

## Capabilities

- **Long-tail keyword mining**: Extract 100-200 real search terms from Amazon's autocomplete engine
- **Competitor landscape analysis**: Product count, price range, average rating, review distribution, top brands
- **Seasonal trend detection**: 12-month Google Trends data to identify peak seasons and demand shifts
- **Market opportunity scoring**: 1-10 score combining competition density, price room, and demand signals
- **Multi-marketplace support**: US, UK, DE, FR, IT, ES, JP, CA, AU, IN, MX, BR
- **Keyword comparison**: Side-by-side analysis of multiple keywords

## Usage Examples

Users can ask naturally. Examples:

```
Research the keyword \"portable blender\" on Amazon ",
    description: "name: amazon-keyword-research",
    descriptionEn: "name: amazon-keyword-research",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 43, views: "4.8K", comments: 11,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Repricing Strategy 🔄",
    titleEn: "Amazon Repricing Strategy 🔄",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-repricing-strategy
description: \"Amazon repricing strategy advisor — competitive pricing rules, Buy Box optimization, margin protection, and repricing tool selection. Builds custom repricing logic based on your goals: Buy Box win rate, margin targets, or velocity.\"
metadata:
  nexscope:
    emoji: \"🔄\"
    category: amazon
---

# Amazon Repricing Strategy 🔄

Amazon repricing strategy advisor — competitive pricing rules, Buy Box optimization, margin protection, and repricing tool selection. Builds custom repricing logic based on your goals: Buy Box win rate, margin targets, or velocity.

**Supported platforms:** Amazon (all marketplaces — US, UK, DE, CA, JP, AU, etc.).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-repricing-strategy
```

## Usage

```
I'm losing the Buy Box on 30% of my listings. I have 200 SKUs in electronics, price range $15-$80. Help me build a repricing strategy that wins Buy Box without destroying margins.
```

## Capabilities

- Buy Box algorithm analysis: price, fulfillment, seller metrics, shipping speed weighting
- Repricing rule design: floor/ceiling prices, competitor-based rules, velocity-based adjustments
- Margin protection: minimum margin guardrails, break-even price floors, fee-aware pricing
- Competitive landscape assessment: number of sellers, FBA vs FBM mix, pricing patterns
- Repricing tool comparison: Amazon Automate Pricing vs third-party (RepricerExpress, Informed, BQool, Aura)
- Scenario-specific strategies: private label, wholesale, arbitrage, seasonal products
- Buy Box win rate optimization: identify which factors are costing you the Box
- Time-based repricing: peak hours, day-of-week patterns, seasonal adjustments

## How This Skill Works

**Step 1:** Collect seller details — number of SKUs, categories, current Buy Box win rate, fulfillment method, average margin, pricing range, curre",
    description: "name: amazon-repricing-strategy",
    descriptionEn: "name: amazon-repricing-strategy",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 65, views: "4.8K", comments: 8,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Seasonal Planning",
    titleEn: "Amazon Seasonal Planning",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-seasonal-planning
description: \"Seasonal sales calendar — Prime Day, Black Friday, Q4 prep, inventory planning, promotion scheduling\"
metadata:
  nexscope:
    category: amazon
---

# Amazon Seasonal Planning

Seasonal sales calendar — Prime Day, Black Friday, Q4 prep, inventory planning, promotion scheduling

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-seasonal-planning
```

## Usage

```
Help me with amazon seasonal planning for my e-commerce business.
```

## Capabilities

- Seasonal sales calendar
- Prime Day
- Black Friday
- Q4 prep
- inventory planning
- promotion scheduling

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-seasonal-planning",
    descriptionEn: "name: amazon-seasonal-planning",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 66, views: "9.6K", comments: 9,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Seller Analytics 📊",
    titleEn: "Amazon Seller Analytics 📊",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "数据分析"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "数据分析"],
    content: "---
name: amazon-seller-analytics
description: \"Analyze Amazon seller storefronts and product portfolios. Estimate revenue, identify top products, assess growth trajectory, and uncover strategy patterns. Useful for competitive intelligence and market research.\"
metadata:
  nexscope:
    emoji: \"📊\"
    category: amazon
---

# Amazon Seller Analytics 📊

Analyze Amazon seller storefronts and product portfolios. Estimate revenue, identify top products, assess growth trajectory, and uncover strategy patterns. Useful for competitive intelligence and market research.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-seller-analytics -g
```

## Usage

```
Analyze this Amazon seller's strategy: they sell kitchen gadgets and have about 50 products. Help me understand their approach.
```

## Capabilities

- Seller storefront analysis (product count, categories, pricing strategy)
- Revenue estimation from BSR and category benchmarks
- Product portfolio assessment (hero products, long-tail, new launches)
- Review velocity and quality scoring
- Growth trajectory estimation
- Competitive positioning analysis

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on ",
    description: "name: amazon-seller-analytics",
    descriptionEn: "name: amazon-seller-analytics",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 42, views: "9.7K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Storefront Design",
    titleEn: "Amazon Storefront Design",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-storefront-design
description: \"Amazon Store builder — page layouts, brand story, shoppable images, traffic driving, conversion optimization\"
metadata:
  nexscope:
    category: amazon
---

# Amazon Storefront Design

Amazon Store builder — page layouts, brand story, shoppable images, traffic driving, conversion optimization

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-storefront-design
```

## Usage

```
Help me with amazon storefront design for my e-commerce business.
```

## Capabilities

- Amazon Store builder
- page layouts
- brand story
- shoppable images
- traffic driving
- conversion optimization

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-storefront-design",
    descriptionEn: "name: amazon-storefront-design",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 46, views: "3.5K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Return Reduction",
    titleEn: "Amazon Return Reduction",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-return-reduction
description: \"Return rate reduction — root cause analysis, listing accuracy, packaging improvements, size guides\"
metadata:
  nexscope:
    category: amazon
---

# Amazon Return Reduction

Return rate reduction — root cause analysis, listing accuracy, packaging improvements, size guides

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-return-reduction
```

## Usage

```
Help me with amazon return reduction for my e-commerce business.
```

## Capabilities

- Return rate reduction
- root cause analysis
- listing accuracy
- packaging improvements
- size guides

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-return-reduction",
    descriptionEn: "name: amazon-return-reduction",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 41, views: "8.0K", comments: 9,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Review Strategy",
    titleEn: "Amazon Review Strategy",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "评论管理"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "评论管理"],
    content: "---
name: amazon-review-strategy
description: \"Review generation strategy — Request a Review, follow-up emails, insert cards, Vine, early reviewer programs\"
metadata:
  nexscope:
    category: amazon
---

# Amazon Review Strategy

Review generation strategy — Request a Review, follow-up emails, insert cards, Vine, early reviewer programs

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-review-strategy
```

## Usage

```
Help me with amazon review strategy for my e-commerce business.
```

## Capabilities

- Review generation strategy
- Request a Review
- follow-up emails
- insert cards
- Vine
- early reviewer programs

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-review-strategy",
    descriptionEn: "name: amazon-review-strategy",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 79, views: "8.5K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Vine Program",
    titleEn: "Amazon Vine Program",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-vine-program
description: \"Vine review program strategy — enrollment, product selection, timing, review quality maximization\"
metadata:
  nexscope:
    category: amazon
---

# Amazon Vine Program

Vine review program strategy — enrollment, product selection, timing, review quality maximization

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-vine-program
```

## Usage

```
Help me with amazon vine program for my e-commerce business.
```

## Capabilities

- Vine review program strategy
- enrollment
- product selection
- timing
- review quality maximization

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-vine-program",
    descriptionEn: "name: amazon-vine-program",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 67, views: "4.7K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Variation Strategy",
    titleEn: "Amazon Variation Strategy",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-variation-strategy
description: \"Parent-child variation planning — when to merge/split, color/size variations, ranking benefits\"
metadata:
  nexscope:
    category: amazon
---

# Amazon Variation Strategy

Parent-child variation planning — when to merge/split, color/size variations, ranking benefits

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-variation-strategy
```

## Usage

```
Help me with amazon variation strategy for my e-commerce business.
```

## Capabilities

- Parent-child variation planning
- when to merge/split
- color/size variations
- ranking benefits

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.",
    description: "name: amazon-variation-strategy",
    descriptionEn: "name: amazon-variation-strategy",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 38, views: "9.1K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "Tariff Calculator — Amazon 💰",
    titleEn: "Tariff Calculator — Amazon 💰",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: tariff-calculator-amazon
version: 1.0.0
author: Nexscope AI
description: \"Universal tariff calculator for Amazon sellers. Calculate import duties, landed costs, and VAT/GST for any trade route. Supports CN→US, CN→EU, US→EU, EU→US, US→CN and custom origin/destination pairs. Includes Section 301 tariffs, trade agreement rates (USMCA, EVFTA), and HS code lookup. No API key required.\"
metadata: {\"nexscope\":{\"emoji\":\"💰\",\"category\":\"ecommerce\"}}
---

# Tariff Calculator — Amazon 💰

Universal tariff and landed cost calculator for international Amazon sellers.

## Installation

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tariff-calculator-amazon -g
```

## Features

- **Universal Trade Routes** — Any origin to any destination
- **Tariff Rate Lookup** — HS code → duty rate
- **Section 301 Tariffs** — US additional duties on China imports
- **VAT/GST Calculation** — EU, UK, CA, AU, CN rates
- **Landed Cost** — Complete cost breakdown
- **HS Code Matcher** — Product description → HS code suggestions
- **Trade Agreements** — USMCA, EVFTA, RCEP preferential rates

## Supported Trade Routes

| Route | Key Tariffs | VAT/GST |
|-------|-------------|---------|
| 🇨🇳 → 🇺🇸 China → USA | Section 301 (7.5-25%) | N/A |
| 🇨🇳 → 🇪🇺 China → EU | Standard duties | 19-22% |
| 🇨🇳 → 🇬🇧 China → UK | Standard duties | 20% |
| 🇺🇸 → 🇪🇺 USA → EU | Standard duties | 19-22% |
| 🇪🇺 → 🇺🇸 EU → USA | Standard duties | N/A |
| 🇺🇸 → 🇨🇳 USA → China | Retaliatory tariffs | 13% VAT |
| 🇨🇳 → 🇨🇦 China → Canada | Standard duties | 5% GST |
| 🇨🇳 → 🇦🇺 China → Australia | Standard duties | 10% GST |
| **Custom** | User-defined | User-defined |

## Section 301 Tariffs (China → USA)

| HS Chapter | Products | Additional Rate |
|------------|----------|-----------------|
| 84xx | Computers, machinery | 25% |
| 85xx | Electronics (some) | 0-25% |
| 94xx | Furniture, lighting | 25% |
| 95xx | Toys | 25% |
| 61/62 | Apparel | 7.5% |
| 64xx | Footwear | 7.5% |
| 42xx | Bags, accessories",
    description: "name: tariff-calculator-amazon",
    descriptionEn: "name: tariff-calculator-amazon",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 46, views: "7.8K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Review Analyzer 💬",
    titleEn: "Amazon Review Analyzer 💬",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "评论管理"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "评论管理"],
    content: "---
name: amazon-review-analyzer
description: \"Deep-dive Amazon review analysis. Extract sentiment patterns, recurring complaints, feature requests, and competitive insights from product reviews. Turn customer feedback into product improvement and marketing opportunities.\"
metadata:
  nexscope:
    emoji: \"💬\"
    category: amazon
---

# Amazon Review Analyzer 💬

Deep-dive Amazon review analysis. Extract sentiment patterns, recurring complaints, feature requests, and competitive insights from product reviews. Turn customer feedback into product improvement and marketing opportunities.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/Amazon-Skills --skill amazon-review-analyzer -g
```

## Usage

```
Analyze the reviews for my competitor's yoga mat (has 2,500 reviews, 4.2 stars). What are customers complaining about that I can fix in my product?
```

## Capabilities

- Sentiment analysis across star ratings (positive/negative/neutral themes)
- Recurring complaint identification and severity ranking
- Feature request extraction from customer language
- Competitor review comparison (what customers like about alternatives)
- UGC (user-generated content) mining for marketing copy
- Review-based product improvement priority matrix

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and ",
    description: "name: amazon-review-analyzer",
    descriptionEn: "name: amazon-review-analyzer",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 46, views: "9.4K", comments: 4,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Profit Analyzer 💰",
    titleEn: "Amazon Profit Analyzer 💰",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-profit-analyzer
description: \"Comprehensive Amazon profit analysis — revenue breakdown, fee structure, true net margin, and optimization opportunities. Analyzes per-ASIN and portfolio-level profitability including advertising costs, returns, and hidden fees.\"
metadata:
  nexscope:
    emoji: \"💰\"
    category: amazon
---

# Amazon Profit Analyzer 💰

Comprehensive Amazon profit analysis — revenue breakdown, fee structure, true net margin, and optimization opportunities. Analyzes per-ASIN and portfolio-level profitability including advertising costs, returns, and hidden fees.

**Supported platforms:** Amazon (US, UK, DE, CA, JP, AU, and all marketplaces).

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope/amazon-profit-analyzer
```

## Usage

```
Analyze the profitability of my Amazon product: I sell a yoga mat for $34.99, COGS is $8, I spend $400/month on PPC with 15% ACoS. My return rate is about 5%. Is this product actually profitable?
```

## Capabilities

- Per-ASIN profit waterfall: Revenue → COGS → FBA fees → referral fees → ad spend → returns → net profit
- Hidden fee identification: long-term storage, removal orders, reimbursement gaps, coupon costs
- ACoS/TACoS impact on true margin — break-even ACoS calculation
- Return cost analysis: return shipping, restocking loss, unsellable inventory
- Portfolio-level profitability: identify top performers vs. margin drains
- Scenario modeling: price change impact, fee increase simulation, ad budget shifts
- Benchmark comparison: category-average margins, fee ratios, return rates

## How This Skill Works

**Step 1:** Collect product details from the user — selling price, COGS, category, dimensions/weight (for FBA fees), monthly units, ad spend, return rate.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

",
    description: "name: amazon-profit-analyzer",
    descriptionEn: "name: amazon-profit-analyzer",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 62, views: "9.0K", comments: 15,
  });
  count++;

  await db.insert(skills).values({
    title: "Api Monitoring",
    titleEn: "Api Monitoring",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"API Monitoring\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"api\"
    - \"webhook\"
    - \"monitoring\"
    - \"integration\"
    - \"ecommerce\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"api monitoring\"
---

# API Monitoring

AI-powered API and webhook monitoring skill for e-commerce integrations. Designs health check systems, alerting strategies, SLA reporting templates, and integration validation for e-commerce API endpoints.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install api-monitoring
```

## Usage

**Input:**
API endpoints, webhook URLs, SLA requirements, integration architecture

**Output:**
Health check framework, alerting rules, SLA report templates, integration validation checklist

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up api monitoring for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 64, views: "9.5K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Buy Box Strategy 🏅",
    titleEn: "Amazon Buy Box Strategy 🏅",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-buy-box
description: \"Win and maintain the Amazon Buy Box. Analyze Buy Box eligibility factors, competitor pricing dynamics, and develop pricing and fulfillment strategies to maximize your Buy Box percentage.\"
metadata:
  nexscope:
    emoji: \"🏅\"
    category: amazon
---

# Amazon Buy Box Strategy 🏅

Win and maintain the Amazon Buy Box. Analyze Buy Box eligibility factors, competitor pricing dynamics, and develop pricing and fulfillment strategies to maximize your Buy Box percentage.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-buy-box -g
```

## Usage

```
I'm losing the Buy Box on my top product to 3 other sellers. I use FBA, my price is $24.99, competitors are at $23.99-$25.49. How do I win it back?
```

## Capabilities

- Buy Box eligibility factor analysis
- Competitive pricing strategy for Buy Box capture
- FBA vs FBM impact on Buy Box share
- Account health metrics optimization
- Repricing strategy recommendations (manual vs automated)
- Buy Box share tracking and improvement plan

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skill",
    description: "name: amazon-buy-box",
    descriptionEn: "name: amazon-buy-box",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 32, views: "5.8K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Listing Images 📸",
    titleEn: "Amazon Listing Images 📸",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "Listing优化"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "Listing优化"],
    content: "---
name: amazon-listing-images
description: \"Plan Amazon product listing images for maximum conversion. Create shot lists, infographic layouts, lifestyle scene briefs, and A/B testing plans following Amazon's image requirements and best practices.\"
metadata:
  nexscope:
    emoji: \"📸\"
    category: amazon
---

# Amazon Listing Images 📸

Plan Amazon product listing images for maximum conversion. Create shot lists, infographic layouts, lifestyle scene briefs, and A/B testing plans following Amazon's image requirements and best practices.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-listing-images -g
```

## Usage

```
Plan the listing images for my portable blender. Target audience: gym-goers and office workers. Key features: USB rechargeable, 6 blades, BPA-free, 16oz.
```

## Capabilities

- 7-image strategy planning (main + 6 supporting images)
- Main image optimization (white background, fill ratio, lighting)
- Infographic layout design with callouts and feature highlights
- Lifestyle image scene planning (target customer context)
- Size/scale reference image planning
- Mobile-optimized image design (readable on small screens)
- Image A/B testing strategy

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Pr",
    description: "name: amazon-listing-images",
    descriptionEn: "name: amazon-listing-images",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 36, views: "7.2K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon A+ Content 🎨",
    titleEn: "Amazon A+ Content 🎨",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-a-plus-content
description: \"Plan and create Amazon A+ Content (Enhanced Brand Content). Design module layouts, write persuasive copy, plan comparison charts, and create image briefs that convert browsers into buyers.\"
metadata:
  nexscope:
    emoji: \"🎨\"
    category: amazon
---

# Amazon A+ Content 🎨

Plan and create Amazon A+ Content (Enhanced Brand Content). Design module layouts, write persuasive copy, plan comparison charts, and create image briefs that convert browsers into buyers.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-a-plus-content -g
```

## Usage

```
Create an A+ Content plan for my premium stainless steel water bottle on Amazon. Key features: double-wall insulation, leak-proof lid, 3 sizes.
```

## Capabilities

- A+ module selection and layout planning (up to 7 modules)
- Persuasive copy writing for each module
- Comparison chart design (your product vs alternatives)
- Image brief generation for designers (dimensions, content, style)
- Brand story module optimization
- Mobile-first design recommendations
- A/B testing strategy for A+ content

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete",
    description: "name: amazon-a-plus-content",
    descriptionEn: "name: amazon-a-plus-content",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 59, views: "4.5K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Advertising Strategy 📣",
    titleEn: "Amazon Advertising Strategy 📣",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "广告投放"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "广告投放"],
    content: "---
name: amazon-advertising-strategy
description: \"Build a comprehensive Amazon advertising strategy combining Sponsored Products, Sponsored Brands, and Sponsored Display. Budget allocation, campaign structure, keyword strategy, and ACoS optimization.\"
metadata:
  nexscope:
    emoji: \"📣\"
    category: amazon
---

# Amazon Advertising Strategy 📣

Build a comprehensive Amazon advertising strategy combining Sponsored Products, Sponsored Brands, and Sponsored Display. Budget allocation, campaign structure, keyword strategy, and ACoS optimization.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-advertising-strategy -g
```

## Usage

```
Build an ad strategy for my Amazon product line (5 products in kitchen category). Monthly budget: $3,000. Current ACoS: 35%. Target: 25%.
```

## Capabilities

- Full-funnel ad strategy (SP + SB + SD)
- Campaign structure design (auto, broad, phrase, exact)
- Budget allocation across campaign types
- ACoS/TACoS target setting by product lifecycle stage
- Keyword harvesting and negative keyword management workflow
- Bid optimization methodology
- New product launch advertising playbook

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates",
    description: "name: amazon-advertising-strategy",
    descriptionEn: "name: amazon-advertising-strategy",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 70, views: "7.7K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Listing Optimization 📝",
    titleEn: "Amazon Listing Optimization 📝",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "Listing优化"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "Listing优化"],
    content: "---
name: amazon-listing-optimization
description: \"Amazon listing builder and optimizer for sellers. Two modes: (A) Create — build keyword-optimized listings from scratch using keyword lists + product characteristics + AI copywriting, (B) Optimize — audit existing listings, find keyword gaps, score across 8 dimensions, and rewrite with missing keywords. Integrates with amazon-keyword-research for keyword input. Works on 12 Amazon marketplaces. No API key required. Use when: (1) creating a new Amazon listing from keywords, (2) auditing an existing listing for SEO and conversion, (3) checking keyword coverage in title/bullets/description, (4) generating listing copy with target keywords and tone, (5) comparing listings against competitors, (6) preparing a listing for launch or relaunch.\"
metadata: {\"nexscope\":{\"emoji\":\"📝\",\"category\":\"amazon\"}}
---

# Amazon Listing Optimization 📝

Build keyword-optimized listings from scratch, or audit and optimize existing ones. No API key — works out of the box.

## Installation

```bash
npx skills add nexscope-ai/Amazon-Skills --skill amazon-listing-optimization -g
```

## Two Modes

| Mode | When to Use | Input | Output |
|------|-------------|-------|--------|
| **A — Create** | Building a new listing | Keywords and/or competitor ASINs + product info + tone | Full listing copy + keyword coverage score |
| **B — Optimize** | Improving an existing listing | Your ASIN or URL (+ optional keywords or competitor ASINs) | Optimized listing copy + audit report + gap analysis |

## Mode A — Three Ways to Start

| Input Source | How it Works |
|-------------|-------------|
| **Keywords** | User provides keyword list → skill prioritizes and generates listing |
| **Competitor ASINs** | User provides 1-3 competitor ASINs → skill fetches their listings, extracts their keywords, then generates a listing that covers all their keywords and more |
| **Both** | User provides keywords + competitor ASINs → skill merges both sources for m",
    description: "name: amazon-listing-optimization",
    descriptionEn: "name: amazon-listing-optimization",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 66, views: "3.4K", comments: 4,
  });
  count++;

  await db.insert(skills).values({
    title: "eBay Product Research",
    titleEn: "eBay Product Research",
    role: "ecommerce",
    tags: ["eBay", "跨境电商", "AI技能", "选品"],
    tagsEn: ["eBay", "跨境电商", "AI技能", "选品"],
    content: "# eBay Product Research

Research profitable products to sell on eBay. Analyze completed listings, sell-through rates, average selling prices, competition density, and seasonal demand patterns.

## Capabilities

- Completed listings analysis for real selling prices
- Sell-through rate calculation and benchmarks
- Competition density assessment by category
- Seasonal demand pattern identification
- Sourcing opportunity identification (arbitrage, wholesale, thrift)
- Category-specific fee analysis
- Trending product detection on eBay

## Install

```bash
npx skills add nexscope/ebay-product-research
```

## Usage

Ask your AI agent:

- \"Research profitable product categories to sell on eBay.\"
- \"Analyze the sell-through rate for vintage watches on eBay.\"
- \"Find low-competition niches on eBay with high demand.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Research profitable products to sell on eBay. Analyze completed listings, sell-through rates, average selling prices, competition density, and seasonal demand patterns.",
    descriptionEn: "Research profitable products to sell on eBay. Analyze completed listings, sell-through rates, average selling prices, competition density, and seasonal demand patterns.",
    scenario: "跨境电商卖家运营eBay平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for eBay operations",
    problemFocus: "eBay平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "eBay operations are complex, needing systematic tools to improve efficiency",
    author: "eBay · nexscope-ai",
    likes: 61, views: "10.2K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Dropshipping Product Research 📦",
    titleEn: "Dropshipping Product Research 📦",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "选品", "物流"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "选品", "物流"],
    content: "---
name: dropshipping-product-research
description: \"Product research for dropshipping businesses. Identify profitable products with reliable suppliers, healthy margins, and manageable competition. Evaluates shipping times, return risk, and marketing viability.\"
metadata:
  nexscope:
    emoji: \"📦\"
    category: ecommerce
---

# Dropshipping Product Research 📦

Product research for dropshipping businesses. Identify profitable products with reliable suppliers, healthy margins, and manageable competition. Evaluates shipping times, return risk, and marketing viability.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill dropshipping-product-research -g
```

## Usage

```
Help me find dropshipping products in the pet accessories niche. Budget is $2000 to start. I want to sell via Shopify with Meta ads.
```

## Capabilities

- Product viability scoring for dropshipping (margin, weight, fragility, return risk)
- Supplier reliability assessment framework
- Shipping time and cost analysis by origin/destination
- Marketing angle identification (social media, paid ads, SEO)
- Competition analysis specific to dropshipping niches
- Trend validation and longevity assessment

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide pri",
    description: "name: dropshipping-product-research",
    descriptionEn: "name: dropshipping-product-research",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 39, views: "6.4K", comments: 7,
  });
  count++;

  await db.insert(skills).values({
    title: "eBay Seller Guide",
    titleEn: "eBay Seller Guide",
    role: "ecommerce",
    tags: ["eBay", "跨境电商", "AI技能"],
    tagsEn: ["eBay", "跨境电商", "AI技能"],
    content: "# eBay Seller Guide

Complete guide for selling on eBay — auction and fixed-price strategies, listing optimization, eBay SEO, shipping setup, seller ratings, and scaling from casual seller to Top Rated Seller.

## Capabilities

- Account setup and seller level progression
- Listing format strategy: auction vs Buy It Now vs Best Offer
- eBay SEO: item specifics, titles, and Cassini search algorithm
- Photography and description best practices
- Shipping and returns policy optimization
- eBay Promoted Listings strategy
- Top Rated Seller requirements and benefits
- International selling and Global Shipping Program

## Install

```bash
npx skills add nexscope/ebay-seller-guide
```

## Usage

Ask your AI agent:

- \"Help me set up my eBay store and create optimized listings.\"
- \"What is the best listing strategy for used electronics on eBay?\"
- \"How do I become a Top Rated Seller on eBay?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Complete guide for selling on eBay — auction and fixed-price strategies, listing optimization, eBay SEO, shipping setup, seller ratings, and scaling from casual seller to Top Rated Seller.",
    descriptionEn: "Complete guide for selling on eBay — auction and fixed-price strategies, listing optimization, eBay SEO, shipping setup, seller ratings, and scaling from casual seller to Top Rated Seller.",
    scenario: "跨境电商卖家运营eBay平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for eBay operations",
    problemFocus: "eBay平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "eBay operations are complex, needing systematic tools to improve efficiency",
    author: "eBay · nexscope-ai",
    likes: 33, views: "10.4K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "eBay Seller Tools",
    titleEn: "eBay Seller Tools",
    role: "ecommerce",
    tags: ["eBay", "跨境电商", "AI技能"],
    tagsEn: ["eBay", "跨境电商", "AI技能"],
    content: "# eBay Seller Tools

Essential tools and software for eBay sellers. Listing tools, repricing, analytics, inventory management, shipping, and research tools to scale your eBay business.

## Capabilities

- Listing creation and bulk editing tools
- Repricing automation software comparison
- Sales analytics and profit tracking
- Inventory management and cross-platform sync
- Shipping label and tracking tools
- Product research and sourcing tools
- eBay API integrations and automation
- Free vs paid tool recommendations by seller level

## Install

```bash
npx skills add nexscope/ebay-seller-tools
```

## Usage

Ask your AI agent:

- \"What tools do I need to scale my eBay business?\"
- \"Compare eBay repricing tools and recommend the best one.\"
- \"Set up inventory management for my eBay store.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Essential tools and software for eBay sellers. Listing tools, repricing, analytics, inventory management, shipping, and research tools to scale your eBay business.",
    descriptionEn: "Essential tools and software for eBay sellers. Listing tools, repricing, analytics, inventory management, shipping, and research tools to scale your eBay business.",
    scenario: "跨境电商卖家运营eBay平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for eBay operations",
    problemFocus: "eBay平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "eBay operations are complex, needing systematic tools to improve efficiency",
    author: "eBay · nexscope-ai",
    likes: 57, views: "6.7K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "Customer Feedback Analysis",
    titleEn: "Customer Feedback Analysis",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Customer Feedback Analysis\"
  category: \"Reviews & Reputation\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"reviews\"
    - \"sentiment-analysis\"
    - \"customer-feedback\"
    - \"product-improvement\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"customer feedback analysis\"
    - \"review sentiment analysis\"
---

# Customer Feedback Analysis

AI-powered customer feedback and review sentiment analysis skill. Extracts pain points, feature requests, and improvement priorities from customer reviews across e-commerce platforms.

## Capabilities

- Generates actionable reviews & reputation frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install customer-feedback-analysis
```

## Usage

**Input:**
Product reviews, customer feedback data, brand/ASIN

**Output:**
Sentiment analysis report, pain point extraction, feature request ranking, improvement priority matrix

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up customer feedback analysis for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 53, views: "10.0K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Branding 🎨",
    titleEn: "E-Commerce Branding 🎨",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "品牌"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "品牌"],
    content: "---
name: ecommerce-branding
description: \"Build and strengthen your e-commerce brand identity. Brand positioning, messaging, visual identity guidelines, and brand consistency across sales channels and marketing touchpoints.\"
metadata:
  nexscope:
    emoji: \"🎨\"
    category: ecommerce
---

# E-Commerce Branding 🎨

Build and strengthen your e-commerce brand identity. Brand positioning, messaging, visual identity guidelines, and brand consistency across sales channels and marketing touchpoints.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-branding -g
```

## Usage

```
Help me build a brand identity for my new eco-friendly cleaning products line. I want to sell on Amazon and Shopify. Target: environmentally conscious millennials.
```

## Capabilities

- Brand positioning statement development
- Target audience persona creation
- Brand voice and messaging framework
- Visual identity guidelines (colors, typography, imagery style)
- Brand consistency audit across channels
- Packaging and unboxing experience design
- Brand story crafting for About pages and A+ content

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End w",
    description: "name: ecommerce-branding",
    descriptionEn: "name: ecommerce-branding",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 70, views: "9.6K", comments: 3,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Business Plan 📑",
    titleEn: "E-Commerce Business Plan 📑",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: ecommerce-business-plan
description: \"Create a comprehensive e-commerce business plan. Market analysis, financial projections, marketing strategy, operations planning, and milestone roadmap for new or growing e-commerce businesses.\"
metadata:
  nexscope:
    emoji: \"📑\"
    category: ecommerce
---

# E-Commerce Business Plan 📑

Create a comprehensive e-commerce business plan. Market analysis, financial projections, marketing strategy, operations planning, and milestone roadmap for new or growing e-commerce businesses.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-business-plan -g
```

## Usage

```
I want to start an e-commerce business selling premium dog accessories. Budget: $15,000. Help me create a business plan.
```

## Capabilities

- Market opportunity sizing and TAM/SAM/SOM estimation
- Competitive landscape analysis
- Business model definition (DTC, marketplace, hybrid)
- Financial projections (revenue, costs, break-even, cash flow)
- Marketing strategy outline with CAC and LTV targets
- Operations plan (fulfillment, supply chain, technology)
- Milestone roadmap (3-month, 6-month, 12-month)

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates ",
    description: "name: ecommerce-business-plan",
    descriptionEn: "name: ecommerce-business-plan",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 59, views: "10.3K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce A/B Testing",
    titleEn: "E-Commerce A/B Testing",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "# E-Commerce A/B Testing

Master A/B testing for e-commerce across all platforms. Test product pages, pricing, ads, emails, and checkout flows with statistical rigor to maximize conversion and revenue.

## Capabilities

- A/B testing methodology for e-commerce
- Platform-specific testing: Amazon Experiments, Shopify, Google Optimize
- Test prioritization frameworks (ICE, PIE, RICE)
- Statistical significance and sample size calculators
- Product page element testing hierarchy
- Price testing methodology and guard rails
- Ad creative A/B testing (Meta, Google, TikTok)
- Email and SMS A/B testing best practices

## Install

```bash
npx skills add nexscope/ecommerce-ab-testing
```

## Usage

Ask your AI agent:

- \"Create an A/B testing roadmap for my e-commerce store.\"
- \"How do I use Amazon Manage Your Experiments for listing tests?\"
- \"Calculate the sample size needed for my price test.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Master A/B testing for e-commerce across all platforms. Test product pages, pricing, ads, emails, and checkout flows with statistical rigor to maximize conversion and revenue.",
    descriptionEn: "Master A/B testing for e-commerce across all platforms. Test product pages, pricing, ads, emails, and checkout flows with statistical rigor to maximize conversion and revenue.",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 33, views: "8.6K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "Cross-Border E-Commerce ✈️",
    titleEn: "Cross-Border E-Commerce ✈️",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: cross-border-ecommerce
description: \"Cross-border e-commerce expansion advisor. Scores target markets on 8 weighted dimensions (market size, ecommerce penetration, competition, regulatory complexity, logistics infrastructure, payment ecosystem, cultural distance, IP protection), compares 5 fulfillment models with cost and transit data, provides country-by-country tax/duty compliance guides (EU VAT/IOSS, UK VAT, US sales tax, CA GST, AU GST, JP consumption tax), maps local payment preferences by market, and builds a phased expansion roadmap. No API key required.\"
metadata:
  nexscope:
    emoji: \"✈️\"
    category: ecommerce
---

# Cross-Border E-Commerce ✈️

Your strategic advisor for international e-commerce expansion. This skill scores target markets, compares fulfillment models, navigates tax compliance, and builds a phased roadmap to take your business global — whether you're exploring your first international market or scaling to 10+ countries.

This is the international expansion layer. It tells you **where to expand, how to get there, and what it will cost**, then connects you to specialized skills for execution in each market.

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-growth-strategy -g
```

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce, and multi-channel sellers.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill cross-border-ecommerce -g
```

## Usage

Ask your AI assistant naturally. Example prompts:

> *\"I sell pet products on Shopify in the US doing $30K/month. I want to expand to Canada and UK. What's the best approach for logistics, payments, and taxes?\"*

> *\"We're an Amazon US seller doing $80K/month in kitchen gadgets. Which 3 countries should we expand to next? Score them by market size, ease of entry, and competit",
    description: "name: cross-border-ecommerce",
    descriptionEn: "name: cross-border-ecommerce",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 55, views: "8.2K", comments: 8,
  });
  count++;

  await db.insert(skills).values({
    title: "eBay SEO",
    titleEn: "eBay SEO",
    role: "ecommerce",
    tags: ["eBay", "跨境电商", "AI技能", "SEO"],
    tagsEn: ["eBay", "跨境电商", "AI技能", "SEO"],
    content: "# eBay SEO

Optimize eBay listings for Cassini search algorithm. Master item specifics, title optimization, category selection, and seller performance factors that drive search visibility.

## Capabilities

- Cassini search algorithm ranking factors
- Title optimization: keyword placement and character limits
- Item specifics completion for maximum visibility
- Category and subcategory selection strategy
- Listing quality score improvement
- Seller performance metrics that affect search rank
- Best Match algorithm optimization
- Promoted Listings integration with organic SEO

## Install

```bash
npx skills add nexscope/ebay-seo
```

## Usage

Ask your AI agent:

- \"Optimize my eBay listing titles for better search ranking.\"
- \"What item specifics should I fill in for electronics on eBay?\"
- \"How does eBay Cassini algorithm rank listings?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Optimize eBay listings for Cassini search algorithm. Master item specifics, title optimization, category selection, and seller performance factors that drive search visibility.",
    descriptionEn: "Optimize eBay listings for Cassini search algorithm. Master item specifics, title optimization, category selection, and seller performance factors that drive search visibility.",
    scenario: "跨境电商卖家运营eBay平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for eBay operations",
    problemFocus: "eBay平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "eBay operations are complex, needing systematic tools to improve efficiency",
    author: "eBay · nexscope-ai",
    likes: 56, views: "3.8K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Competitive Pricing Strategy",
    titleEn: "Competitive Pricing Strategy",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "# Competitive Pricing Strategy

Develop data-driven pricing strategies for e-commerce. Competitive analysis, price positioning, psychological pricing, margin optimization, and dynamic repricing across marketplaces.

## Capabilities

- Competitor price mapping and monitoring
- Price positioning: premium, value, penetration, skimming
- Psychological pricing techniques (charm pricing, anchoring, bundling)
- Margin-based pricing with platform fee calculations
- MAP (Minimum Advertised Price) compliance
- Seasonal and demand-based price adjustments
- Multi-marketplace price consistency strategy
- A/B price testing methodology

## Install

```bash
npx skills add nexscope/competitive-pricing-strategy
```

## Usage

Ask your AI agent:

- \"Analyze competitor pricing for my product category and recommend positioning.\"
- \"What pricing strategy should I use for a new product launch on Amazon?\"
- \"Help me set up a dynamic pricing model across Amazon and Shopify.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Develop data-driven pricing strategies for e-commerce. Competitive analysis, price positioning, psychological pricing, margin optimization, and dynamic repricing across marketplaces.",
    descriptionEn: "Develop data-driven pricing strategies for e-commerce. Competitive analysis, price positioning, psychological pricing, margin optimization, and dynamic repricing across marketplaces.",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 48, views: "5.6K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Competitor Analysis 🔬",
    titleEn: "E-Commerce Competitor Analysis 🔬",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "竞品分析"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "竞品分析"],
    content: "---
name: ecommerce-competitor-analysis
description: \"Cross-platform competitor analysis for e-commerce brands. Compare competitors across Amazon, Shopify, social media, and advertising channels. Build a complete competitive intelligence picture.\"
metadata:
  nexscope:
    emoji: \"🔬\"
    category: ecommerce
---

# E-Commerce Competitor Analysis 🔬

Cross-platform competitor analysis for e-commerce brands. Compare competitors across Amazon, Shopify, social media, and advertising channels. Build a complete competitive intelligence picture.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-competitor-analysis -g
```

## Usage

```
Analyze my top 3 competitors in the organic skincare space. They sell on Amazon, Shopify, and Instagram. I need to know their strategy.
```

## Capabilities

- Multi-channel competitor presence mapping
- Website and store UX comparison framework
- Social media strategy analysis (content, engagement, frequency)
- Ad creative and messaging comparison
- SEO and content strategy assessment
- Pricing and positioning matrix across platforms

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concret",
    description: "name: ecommerce-competitor-analysis",
    descriptionEn: "name: ecommerce-competitor-analysis",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 79, views: "4.3K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Rank Tracker 📍",
    titleEn: "Amazon Rank Tracker 📍",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-rank-tracker
description: \"Track and analyze Amazon keyword rankings. Set up rank monitoring workflows, interpret ranking changes, and develop strategies to improve organic search position.\"
metadata:
  nexscope:
    emoji: \"📍\"
    category: amazon
---

# Amazon Rank Tracker 📍

Track and analyze Amazon keyword rankings. Set up rank monitoring workflows, interpret ranking changes, and develop strategies to improve organic search position.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-rank-tracker -g
```

## Usage

```
Track my rankings for these 10 keywords. My product is a stainless steel water bottle, currently on page 2 for my main keyword. Help me get to page 1.
```

## Capabilities

- Keyword rank tracking methodology and setup
- Ranking factor analysis (relevance, velocity, conversion, reviews)
- Rank change diagnosis (why did ranking go up or down?)
- Keyword rank improvement strategy by priority
- Rank tracking tool recommendations and comparison
- Organic vs sponsored rank monitoring
- BSR tracking and correlation with keyword rankings

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with con",
    description: "name: amazon-rank-tracker",
    descriptionEn: "name: amazon-rank-tracker",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 42, views: "3.0K", comments: 15,
  });
  count++;

  await db.insert(skills).values({
    title: "Ecommerce Feed Management",
    titleEn: "Ecommerce Feed Management",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"E-Commerce Feed Management\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"product-feed\"
    - \"catalog\"
    - \"monitoring\"
    - \"data-quality\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"ecommerce feed management\"
---

# E-Commerce Feed Management

AI-powered product feed management and monitoring skill. Designs feed health checks, sync error diagnostics, missing SKU detection, and attribute completeness validation for e-commerce product catalogs.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install ecommerce-feed-management
```

## Usage

**Input:**
Product feed URL/file, marketplace requirements, catalog size

**Output:**
Feed health report, sync error diagnosis, missing SKU detection, attribute completeness audit

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up e-commerce feed management for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 79, views: "10.7K", comments: 7,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Content Marketing Planner 📣",
    titleEn: "E-Commerce Content Marketing Planner 📣",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "营销"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "营销"],
    content: "---
name: ecommerce-content-marketing
description: \"E-commerce content marketing strategy planner. Generates content calendars, topic ideas, and platform-specific strategies by analyzing customer reviews, trends, competitor content, and SEO opportunities. Two modes: (A) Build — create a full content strategy from scratch, (B) Audit — analyze existing content and find gaps. Supports TikTok, Instagram, YouTube, Pinterest, blog/SEO, and Amazon A+. No API key required. Use when: (1) planning content for a new product launch, (2) building a content calendar, (3) finding viral content ideas, (4) analyzing competitor content strategies, (5) extracting customer pain points for content topics.\"
metadata: {\"nexscope\":{\"emoji\":\"📣\",\"category\":\"ecommerce\"}}
---

# E-Commerce Content Marketing Planner 📣

Plan your content marketing strategy: discover what topics resonate with your audience, analyze competitor content, find trending formats, and generate a ready-to-execute content calendar. No API key required.

## Installation

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-content-marketing -g
```

## Two Modes

| Mode | When to Use | Input |
|------|-------------|-------|
| **A — Build** | Creating content strategy from scratch | Product info + target platforms + optional competitor URLs |
| **B — Audit** | Analyzing existing content performance | Your content URLs/handles + competitor URLs |

## Supported Platforms

| Platform | Content Types |
|----------|---------------|
| **TikTok** | Short-form video, TikTok Shop, trends, duets, sounds |
| **Instagram** | Reels, Stories, carousels, static posts, Lives |
| **YouTube** | Shorts, long-form tutorials, product reviews, vlogs |
| **X (Twitter)** | Threads, short videos, product announcements, engagement posts |
| **Pinterest** | Pins, Idea Pins, product pins, boards |
| **Blog/SEO** | Articles, guides, listicles, comparison posts |
| **Amazon A+** | Brand story, enhanced product descriptions, c",
    description: "name: ecommerce-content-marketing",
    descriptionEn: "name: ecommerce-content-marketing",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 74, views: "5.5K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Growth Strategy 🚀",
    titleEn: "E-Commerce Growth Strategy 🚀",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: ecommerce-growth-strategy
description: \"E-commerce growth strategy advisor. Diagnoses current business health using unit economics (CAC, LTV, AOV, contribution margin), identifies the highest-impact growth opportunities across 5 levers (traffic, conversion, AOV, retention, expansion), and builds a prioritized 90-day growth roadmap. Uses the Ansoff Matrix adapted for e-commerce to evaluate market penetration, channel expansion, product expansion, and new market entry. Includes multichannel readiness assessment (Amazon, Walmart, TikTok Shop, Etsy, DTC/Shopify/Shopify) and product line expansion analysis. No API key required. Use when: (1) planning next phase of e-commerce growth, (2) deciding whether to expand to new channels or products, (3) diagnosing why growth has stalled, (4) prioritizing what to fix or build next.\"
metadata:
  nexscope:
    emoji: \"🚀\"
    category: ecommerce
---

# E-Commerce Growth Strategy 🚀

Your strategic growth advisor for e-commerce. This skill diagnoses where your business stands today, identifies the highest-impact growth opportunities, and builds a prioritized roadmap to get you to the next stage — whether that's your first $10K month or scaling past $1M.

This is the strategy layer above marketing execution. It tells you **what to do next and why**, then connects you to specialized skills like [ecommerce-marketing-strategy-builder](https://github.com/nexscope-ai/eCommerce-Skills/tree/main/ecommerce-marketing-strategy-builder) for **how to do it**.

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-marketing-strategy-builder -g
```

**Supported platforms:** Shopify, WooCommerce, Amazon, Walmart, TikTok Shop, Etsy, eBay, BigCommerce, and multi-channel sellers.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-growth-strategy -g
```

## Usage

```
I sell pet c",
    description: "name: ecommerce-growth-strategy",
    descriptionEn: "name: ecommerce-growth-strategy",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 32, views: "9.7K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Keyword Research 🔍",
    titleEn: "E-Commerce Keyword Research 🔍",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "关键词"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "关键词"],
    content: "---
name: ecommerce-keyword-research
description: \"Cross-platform keyword research for e-commerce. Discover high-converting keywords across Amazon, Shopify, Etsy, Google Shopping, TikTok Shop, and Walmart. Analyzes search volume signals, competition indicators, commercial intent, and long-tail opportunities.\"
metadata:
  nexscope:
    emoji: \"🔍\"
    category: ecommerce
---

# E-Commerce Keyword Research 🔍

Cross-platform keyword research for e-commerce. Discover high-converting keywords across Amazon, Shopify, Etsy, Google Shopping, TikTok Shop, and Walmart. Analyzes search volume signals, competition indicators, commercial intent, and long-tail opportunities.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-keyword-research -g
```

## Usage

```
Find the best keywords for my bamboo cutting board. I sell on Amazon US and my own Shopify store.
```

## Capabilities

- Cross-platform keyword discovery (Amazon, Google, Etsy, Walmart, TikTok)
- Long-tail keyword expansion with commercial intent scoring
- Keyword grouping by search intent (informational, commercial, transactional)
- Competition assessment based on keyword structure and modifier analysis
- Seasonal trend identification and keyword calendar planning
- Platform-specific keyword optimization (Amazon A9, Etsy SEO, Google Shopping)

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vag",
    description: "name: ecommerce-keyword-research",
    descriptionEn: "name: ecommerce-keyword-research",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 47, views: "8.0K", comments: 15,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Marketing Strategy Builder 🎯",
    titleEn: "E-Commerce Marketing Strategy Builder 🎯",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "营销"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "营销"],
    content: "---
name: ecommerce-marketing-strategy-builder
description: \"Full-stack e-commerce marketing strategy builder. Analyzes your product, market, and competitors, then builds a complete omnichannel marketing plan covering paid ads, SEO, email/SMS, content marketing, social media, influencer partnerships, and referral programs. Includes target audience persona, competitive landscape, channel prioritization with budget allocation, content direction, and a 90-day action plan. Works for any e-commerce platform — Shopify, Amazon, Etsy, WooCommerce, TikTok Shop, and more. No API key required.\"
metadata:
  nexscope:
    emoji: 🎯
    category: ecommerce
---

# E-Commerce Marketing Strategy Builder 🎯

Build a complete omnichannel marketing strategy for your e-commerce business. Covers all major channels — paid ads, SEO, email, content, social media, influencers, and referral programs — with budget allocation, audience targeting, and a 90-day action plan.

## Installation

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-marketing-strategy-builder -g
```

## Capabilities

- **Target audience persona**: Demographics, interests, pain points, buying motivations, and where they spend time online — built from product analysis and competitor research
- **Competitive landscape**: How competitors position, price, and market — and where the gaps are
- **Channel prioritization**: Which marketing channels to use and in what order, ranked by expected ROI for your specific product and stage
- **Budget allocation**: How to split your marketing budget across channels, with benchmarks
- **Email & SMS strategy**: Flows, sequences, and campaign types — the highest-ROI channel most sellers ignore
- **SEO & content plan**: Keyword themes, content types, and publishing cadence
- **Paid ads brief**: High-level ad strategy per platform (for detailed campaign setup, use [ecommerce-ppc-strategy-planner](https://github.com/nexscope-ai/eCommerce-Skills/tree/main/ecommerce-ppc-strateg",
    description: "name: ecommerce-marketing-strategy-builder",
    descriptionEn: "name: ecommerce-marketing-strategy-builder",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 30, views: "7.8K", comments: 8,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Personalization 🎯",
    titleEn: "E-Commerce Personalization 🎯",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: ecommerce-personalization
description: \"Design personalization strategies for e-commerce stores. Product recommendations, dynamic content, customer segmentation, and personalized email/SMS based on browsing and purchase behavior.\"
metadata:
  nexscope:
    emoji: \"🎯\"
    category: ecommerce
---

# E-Commerce Personalization 🎯

Design personalization strategies for e-commerce stores. Product recommendations, dynamic content, customer segmentation, and personalized email/SMS based on browsing and purchase behavior.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-personalization -g
```

## Usage

```
I run a Shopify store with 5,000 customers. How do I set up personalization? I want to show different products to different customer segments.
```

## Capabilities

- Customer segmentation framework (RFM, behavioral, demographic)
- Product recommendation engine strategy (collaborative, content-based, hybrid)
- Dynamic content personalization for homepage, PDP, and checkout
- Personalized email/SMS strategy by customer segment
- A/B testing framework for personalization
- Privacy-compliant data collection strategy
- Tool and app recommendations by platform (Shopify, WooCommerce)

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchma",
    description: "name: ecommerce-personalization",
    descriptionEn: "name: ecommerce-personalization",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 43, views: "10.5K", comments: 11,
  });
  count++;

  await db.insert(skills).values({
    title: "Competitor Price Analysis 💲",
    titleEn: "Competitor Price Analysis 💲",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "定价", "竞品分析"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "定价", "竞品分析"],
    content: "---
name: competitor-price-analysis
description: \"Analyze competitor pricing strategies across e-commerce platforms. Map price positions, identify pricing gaps, evaluate price elasticity signals, and develop data-driven pricing strategies.\"
metadata:
  nexscope:
    emoji: \"💲\"
    category: ecommerce
---

# Competitor Price Analysis 💲

Analyze competitor pricing strategies across e-commerce platforms. Map price positions, identify pricing gaps, evaluate price elasticity signals, and develop data-driven pricing strategies.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill competitor-price-analysis -g
```

## Usage

```
Analyze the pricing landscape for wireless earbuds on Amazon. Price range $20-80. Who's winning at each price point and where are the gaps?
```

## Capabilities

- Price mapping across competitors (price bands, positioning)
- Price gap identification (underserved price points)
- Price elasticity signal analysis from review/sales patterns
- Promotional pricing pattern detection
- MAP/MSRP compliance monitoring framework
- Dynamic pricing strategy recommendations

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with",
    description: "name: competitor-price-analysis",
    descriptionEn: "name: competitor-price-analysis",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 79, views: "8.5K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Competitor Analysis",
    titleEn: "Etsy Competitor Analysis",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "竞品分析"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "竞品分析"],
    content: "---
name: etsy-competitor-analysis
description: \"Competitor research — pricing comparison, bestseller analysis, differentiation strategy\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Competitor Analysis

Competitor research — pricing comparison, bestseller analysis, differentiation strategy.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-competitor-analysis -g
```

## Usage

After installation, ask your AI assistant about Etsy Competitor Analysis topics. Example prompts:

- \"Help me with etsy competitor analysis for my Etsy shop\"
- \"What are the best practices for etsy competitor analysis?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-competitor-analysis",
    descriptionEn: "name: etsy-competitor-analysis",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 41, views: "10.7K", comments: 4,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Video Marketing",
    titleEn: "E-Commerce Video Marketing",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "营销"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "营销"],
    content: "# E-Commerce Video Marketing

Create video marketing strategy for e-commerce brands. Product videos, unboxing, tutorials, UGC, live streams, and platform-specific video optimization for Amazon, TikTok, YouTube, and Instagram.

## Capabilities

- Video content strategy by funnel stage (awareness, consideration, purchase)
- Product demo and tutorial video frameworks
- UGC collection and repurposing workflow
- Platform-specific video specs and best practices
- Amazon product video and A+ content video
- Short-form video strategy (Reels, TikTok, Shorts)
- Video SEO: titles, descriptions, tags, thumbnails
- Video production workflow on a budget

## Install

```bash
npx skills add nexscope/ecommerce-video-marketing
```

## Usage

Ask your AI agent:

- \"Create a video marketing plan for my product launch.\"
- \"What types of product videos convert best on Amazon?\"
- \"Build a UGC video collection strategy for my brand.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Create video marketing strategy for e-commerce brands. Product videos, unboxing, tutorials, UGC, live streams, and platform-specific video optimization for Amazon, TikTok, YouTube, and Instagram.",
    descriptionEn: "Create video marketing strategy for e-commerce brands. Product videos, unboxing, tutorials, UGC, live streams, and platform-specific video optimization for Amazon, TikTok, YouTube, and Instagram.",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 56, views: "7.8K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Digital Products",
    titleEn: "Etsy Digital Products",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "选品"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "选品"],
    content: "---
name: etsy-digital-products
description: \"Digital product creation and selling — templates, printables, planners, digital art, delivery setup\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Digital Products

Digital product creation and selling — templates, printables, planners, digital art, delivery setup.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-digital-products -g
```

## Usage

After installation, ask your AI assistant about Etsy Digital Products topics. Example prompts:

- \"Help me with etsy digital products for my Etsy shop\"
- \"What are the best practices for etsy digital products?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-digital-products",
    descriptionEn: "name: etsy-digital-products",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 38, views: "5.1K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Listing Photography",
    titleEn: "Etsy Listing Photography",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "Listing优化"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "Listing优化"],
    content: "---
name: etsy-listing-photography
description: \"Product photography for Etsy — composition, lighting, backgrounds, editing, lifestyle shots, 360 views\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Listing Photography

Product photography for Etsy — composition, lighting, backgrounds, editing, lifestyle shots, 360 views.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-listing-photography -g
```

## Usage

After installation, ask your AI assistant about Etsy Listing Photography topics. Example prompts:

- \"Help me with etsy listing photography for my Etsy shop\"
- \"What are the best practices for etsy listing photography?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-listing-photography",
    descriptionEn: "name: etsy-listing-photography",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 42, views: "7.7K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Email Marketing Builder 📧",
    titleEn: "E-Commerce Email Marketing Builder 📧",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "营销"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "营销"],
    content: "---
name: ecommerce-email-marketing-builder
description: \"E-commerce email marketing system builder. Creates complete email automation flows with full copywriting, subject lines, ESP setup instructions, segmentation rules, and annual campaign calendars. Generates copy-paste-ready email sequences for Klaviyo, Omnisend, Mailchimp, or any ESP. Covers welcome series, cart abandonment, browse abandonment, post-purchase, review requests, cross-sell, win-back, VIP/loyalty, replenishment, and sunset flows. Includes A/B test subject line variants, send timing, trigger conditions, branching logic, and seasonal campaign calendar. No API key required. Use when: (1) setting up email marketing for an e-commerce store, (2) writing email sequences and flows, (3) planning seasonal email campaigns.\"
metadata:
  nexscope:
    emoji: \"📧\"
    category: ecommerce
---

# E-Commerce Email Marketing Builder 📧

Build a complete, copy-paste-ready email marketing system for any e-commerce business. Covers 10 core automation flows with full copywriting, ESP setup instructions, segmentation rules, and annual campaign calendars.

**Supported platforms:** Shopify, WooCommerce, BigCommerce, Squarespace, Etsy, TikTok Shop, Amazon, and any platform that connects to an ESP. For marketplace platforms (Amazon, TikTok Shop, Etsy) where buyer emails are restricted, this skill focuses on cross-channel strategies to capture emails via your own website or landing pages.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-email-marketing-builder -g
```

## Usage

Once installed, just describe your business and ask for email marketing help. The skill activates automatically.

```
I'm launching a Shopify store selling premium dog treats at $24.99. Help me set up 
my email marketing — I'm using Klaviyo and have about 500 subscribers.
```

```
I sell handmade jewelr",
    description: "name: ecommerce-email-marketing-builder",
    descriptionEn: "name: ecommerce-email-marketing-builder",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 73, views: "6.3K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Offsite Ads",
    titleEn: "Etsy Offsite Ads",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "广告投放"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "广告投放"],
    content: "---
name: etsy-offsite-ads
description: \"Offsite Ads analysis — when to opt out, ROI tracking, fee impact on margins, attribution\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Offsite Ads

Offsite Ads analysis — when to opt out, ROI tracking, fee impact on margins, attribution.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-offsite-ads -g
```

## Usage

After installation, ask your AI assistant about Etsy Offsite Ads topics. Example prompts:

- \"Help me with etsy offsite ads for my Etsy shop\"
- \"What are the best practices for etsy offsite ads?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-offsite-ads",
    descriptionEn: "name: etsy-offsite-ads",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 53, views: "6.1K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Keyword Research",
    titleEn: "Etsy Keyword Research",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "关键词"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "关键词"],
    content: "---
name: etsy-keyword-research
description: \"Etsy search optimization — long-tail keywords, tag research, competitor analysis, seasonal trends\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Keyword Research

Etsy search optimization — long-tail keywords, tag research, competitor analysis, seasonal trends.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-keyword-research -g
```

## Usage

After installation, ask your AI assistant about Etsy Keyword Research topics. Example prompts:

- \"Help me with etsy keyword research for my Etsy shop\"
- \"What are the best practices for etsy keyword research?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-keyword-research",
    descriptionEn: "name: etsy-keyword-research",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 51, views: "4.8K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Product Description",
    titleEn: "Etsy Product Description",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "选品"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "选品"],
    content: "---
name: etsy-product-description
description: \"Product description writing — keyword integration, benefit-focused copy, FAQ, formatting\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Product Description

Product description writing — keyword integration, benefit-focused copy, FAQ, formatting.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-product-description -g
```

## Usage

After installation, ask your AI assistant about Etsy Product Description topics. Example prompts:

- \"Help me with etsy product description for my Etsy shop\"
- \"What are the best practices for etsy product description?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-product-description",
    descriptionEn: "name: etsy-product-description",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 54, views: "5.8K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Advertising",
    titleEn: "Etsy Advertising",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "广告投放"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "广告投放"],
    content: "---
name: etsy-advertising
description: \"Etsy Ads strategy — budget allocation, bid management, promoted listings, offsite ads opt-out analysis\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Advertising

Etsy Ads strategy — budget allocation, bid management, promoted listings, offsite ads opt-out analysis.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-advertising -g
```

## Usage

After installation, ask your AI assistant about Etsy Advertising topics. Example prompts:

- \"Help me with etsy advertising for my Etsy shop\"
- \"What are the best practices for etsy advertising?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-advertising",
    descriptionEn: "name: etsy-advertising",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 54, views: "5.2K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Seasonal Strategy",
    titleEn: "Etsy Seasonal Strategy",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能"],
    tagsEn: ["Etsy", "跨境电商", "AI技能"],
    content: "---
name: etsy-seasonal-strategy
description: \"Seasonal selling calendar — holiday prep, trending categories, listing refresh timing, inventory planning\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Seasonal Strategy

Seasonal selling calendar — holiday prep, trending categories, listing refresh timing, inventory planning.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-seasonal-strategy -g
```

## Usage

After installation, ask your AI assistant about Etsy Seasonal Strategy topics. Example prompts:

- \"Help me with etsy seasonal strategy for my Etsy shop\"
- \"What are the best practices for etsy seasonal strategy?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-seasonal-strategy",
    descriptionEn: "name: etsy-seasonal-strategy",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 51, views: "6.2K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy SEO 🔍",
    titleEn: "Etsy SEO 🔍",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "SEO"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "SEO"],
    content: "---
name: etsy-seo
version: 1.0.0
author: Nexscope AI
description: \"Etsy SEO analyzer and optimizer. Improve search visibility with title optimization, tag analysis, description scoring, and keyword research. Includes SEO scoring (0-100), long-tail keyword suggestions, and prioritized action plans. No API key required.\"
metadata: {\"nexscope\":{\"emoji\":\"🔍\",\"category\":\"ecommerce\"}}
---

# Etsy SEO 🔍

Analyze and optimize Etsy listings for better search visibility.

## Installation

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-seo -g
```

## Features

- **SEO Score** — 0-100 comprehensive rating
- **Title Optimization** — Keyword placement, length analysis
- **Tag Analysis** — 13 tag optimization, long-tail suggestions
- **Description Analysis** — First 160 chars, keyword density
- **Attribute Check** — Completeness validation
- **Keyword Research** — Category-based suggestions
- **Action Plan** — Prioritized improvement roadmap

## SEO Scoring Weights

| Dimension | Weight | Max Score |
|-----------|--------|-----------|
| Title | 30% | 100 |
| Tags | 25% | 100 |
| Description | 20% | 100 |
| Attributes | 15% | 100 |
| Images | 10% | 100 |

## Etsy Tag Rules

| Rule | Specification |
|------|---------------|
| Quantity | Max 13 tags |
| Length | Max 20 characters each |
| Format | Multi-word phrases allowed |
| Strategy | Long-tail + synonyms + attributes |

## Title Best Practices

```
[Core Keyword] + [Attributes] + [Material/Style] + [Use Case/Occasion]

✅ Good:
\"Personalized Name Bracelet, Custom Gold Bracelet for Women, Birthday Gift\"

❌ Bad:
\"Beautiful Handmade Bracelet\"
```

## Usage

### Interactive Mode

```bash
python3 scripts/analyzer.py
```

### With Listing Data

```bash
python3 scripts/analyzer.py '{
  \"title\": \"Handmade Silver Ring\",
  \"tags\": [\"silver ring\", \"handmade jewelry\"],
  \"description\": \"Beautiful handmade ring...\",
  \"category\": \"Jewelry\"
}'
```

### Demo Mode

```bash
python3 scripts/analy",
    description: "name: etsy-seo",
    descriptionEn: "name: etsy-seo",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 57, views: "4.5K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Shop Branding",
    titleEn: "Etsy Shop Branding",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "品牌"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "品牌"],
    content: "---
name: etsy-shop-branding
description: \"Shop branding — banner design, logo, brand story, cohesive listing photography, packaging\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Shop Branding

Shop branding — banner design, logo, brand story, cohesive listing photography, packaging.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-shop-branding -g
```

## Usage

After installation, ask your AI assistant about Etsy Shop Branding topics. Example prompts:

- \"Help me with etsy shop branding for my Etsy shop\"
- \"What are the best practices for etsy shop branding?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-shop-branding",
    descriptionEn: "name: etsy-shop-branding",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 51, views: "4.2K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Domain Monitoring",
    titleEn: "Domain Monitoring",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Domain Monitoring\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"domain\"
    - \"ssl\"
    - \"security\"
    - \"monitoring\"
    - \"ecommerce\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"domain monitoring\"
    - \"ssl monitoring\"
---

# Domain Monitoring

AI-powered domain and SSL certificate monitoring skill. Designs domain health checks, SSL expiry alerts, DNS anomaly detection, and security rating assessments for e-commerce websites.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install domain-monitoring
```

## Usage

**Input:**
Domain name(s), current SSL provider, DNS configuration

**Output:**
Domain health check plan, SSL expiry alert setup, DNS monitoring rules, security rating assessment

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up domain monitoring for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 79, views: "10.5K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Brand Monitoring 📡",
    titleEn: "Brand Monitoring 📡",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "品牌"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "品牌"],
    content: "---
name: brand-monitoring
version: 1.0.0
author: Nexscope AI
description: \"Brand monitoring tool for tracking mentions across social media platforms. Monitor Reddit, Google News, YouTube, and DuckDuckGo for brand mentions. Includes sentiment analysis, trend tracking, crisis detection, and competitor comparison. No API key required for basic monitoring.\"
metadata: {\"nexscope\":{\"emoji\":\"📡\",\"category\":\"ecommerce\"}}
---

# Brand Monitoring 📡

Track brand mentions across social media platforms and analyze sentiment.

## Installation

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill brand-monitoring -g
```

## Features

- **Mention Monitoring** — Track brand mentions across platforms
- **Sentiment Analysis** — Positive/negative/neutral classification
- **Trend Tracking** — Monitor mention volume changes
- **Crisis Detection** — Alerts for negative spikes or crisis keywords
- **Competitor Comparison** — Share of voice analysis
- **Keyword Extraction** — Identify trending topics
- **Report Generation** — Weekly/monthly reports

## Supported Platforms

| Platform | Method | Stability |
|----------|--------|-----------|
| Reddit | Public JSON API | ⚠️ Rate limited |
| Google News | RSS Feed | ✅ Stable |
| DuckDuckGo | Instant Answer API | ✅ Stable |
| YouTube | HTML/RSS | ⚠️ Unstable |

## Analysis Dimensions

| Dimension | Method | Output |
|-----------|--------|--------|
| Volume | Mention count | Trend graph |
| Sentiment | NLP analysis | Sentiment score |
| Sources | Platform breakdown | Source distribution |
| Keywords | Topic extraction | Word cloud |
| Competitors | Share of voice | Comparison chart |

## Usage

### Basic Monitoring

```bash
python3 scripts/monitor.py \"YourBrand\"
```

### With Competitors

```bash
python3 scripts/monitor.py '{
  \"brand\": \"YourBrand\",
  \"competitors\": [\"CompA\", \"CompB\"],
  \"platforms\": [\"reddit\", \"google_news\"]
}'
```

### Demo Mode

```bash
python3 scripts/monitor.py --demo
```

## Output Examp",
    description: "name: brand-monitoring",
    descriptionEn: "name: brand-monitoring",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 58, views: "7.2K", comments: 11,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Social Media Marketing",
    titleEn: "Etsy Social Media Marketing",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "营销"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "营销"],
    content: "---
name: etsy-social-media-marketing
description: \"Social media marketing for Etsy — Pinterest, Instagram, TikTok strategies to drive shop traffic\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Social Media Marketing

Social media marketing for Etsy — Pinterest, Instagram, TikTok strategies to drive shop traffic.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-social-media-marketing -g
```

## Usage

After installation, ask your AI assistant about Etsy Social Media Marketing topics. Example prompts:

- \"Help me with etsy social media marketing for my Etsy shop\"
- \"What are the best practices for etsy social media marketing?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-social-media-marketing",
    descriptionEn: "name: etsy-social-media-marketing",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 66, views: "7.3K", comments: 9,
  });
  count++;

  await db.insert(skills).values({
    title: "File Integrity Monitoring",
    titleEn: "File Integrity Monitoring",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"File Integrity Monitoring\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"security\"
    - \"monitoring\"
    - \"file-integrity\"
    - \"ecommerce\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"file integrity monitoring\"
---

# File Integrity Monitoring

AI-powered file integrity monitoring skill for e-commerce websites. Designs file change detection systems, tamper alerts, security baselines, and recovery procedures to protect online stores.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install file-integrity-monitoring
```

## Usage

**Input:**
Website/server details, critical file paths, security requirements

**Output:**
FIM implementation plan, tamper detection rules, security baseline config, incident recovery procedures

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up file integrity monitoring for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 58, views: "3.7K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Returns Management 📥",
    titleEn: "E-Commerce Returns Management 📥",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: ecommerce-returns-management
description: \"Optimize e-commerce returns process and reduce return rates. Returns policy design, reverse logistics, root cause analysis, and customer retention through better returns experience.\"
metadata:
  nexscope:
    emoji: \"📥\"
    category: ecommerce
---

# E-Commerce Returns Management 📥

Optimize e-commerce returns process and reduce return rates. Returns policy design, reverse logistics, root cause analysis, and customer retention through better returns experience.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-returns-management -g
```

## Usage

```
My return rate is 22% on Amazon (clothing category). Industry average is 15-20%. Help me analyze why and reduce it.
```

## Capabilities

- Returns rate benchmarking by category
- Return reason analysis and root cause identification
- Returns policy optimization (balancing customer satisfaction vs cost)
- Reverse logistics workflow design
- Return cost calculation (shipping, restocking, loss)
- Product listing improvements to reduce returns (size guides, photos, descriptions)
- Customer retention strategies post-return

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estim",
    description: "name: ecommerce-returns-management",
    descriptionEn: "name: ecommerce-returns-management",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 50, views: "7.1K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "Inventory Tracking Software",
    titleEn: "Inventory Tracking Software",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "库存管理", "数据分析"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "库存管理", "数据分析"],
    content: "---
nexscope:
  name: \"Inventory Tracking Software\"
  category: \"Supply Chain & Logistics\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"inventory\"
    - \"stock-management\"
    - \"monitoring\"
    - \"supply-chain\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"inventory tracking software\"
---

# Inventory Tracking Software

AI-powered inventory tracking and monitoring skill for e-commerce businesses. Designs inventory monitoring systems, low-stock alerts, reorder point calculations, and multi-channel sync strategies.

## Capabilities

- Generates actionable supply chain & logistics frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install inventory-tracking-software
```

## Usage

**Input:**
SKU list, sales velocity data, platform(s), warehouse info

**Output:**
Inventory monitoring framework, low-stock alert rules, reorder point calculations, multi-channel sync strategy

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up inventory tracking software for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 71, views: "8.2K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Checkout Optimization 💳",
    titleEn: "E-Commerce Checkout Optimization 💳",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: ecommerce-checkout-optimization
description: \"Optimize e-commerce checkout flow to reduce cart abandonment. Friction analysis, payment method optimization, trust signals, and checkout UX best practices.\"
metadata:
  nexscope:
    emoji: \"💳\"
    category: ecommerce
---

# E-Commerce Checkout Optimization 💳

Optimize e-commerce checkout flow to reduce cart abandonment. Friction analysis, payment method optimization, trust signals, and checkout UX best practices.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-checkout-optimization -g
```

## Usage

```
My Shopify store has 68% cart abandonment rate. Checkout has 3 steps. Help me identify and fix the biggest friction points.
```

## Capabilities

- Checkout funnel analysis (drop-off points identification)
- Cart abandonment rate benchmarking (70% average — Baymard Institute)
- Payment method optimization (PayPal, Apple Pay, BNPL, local methods)
- Guest checkout vs account creation strategy
- Trust signal placement (security badges, guarantees, return policy)
- Shipping cost and delivery time transparency
- Post-checkout optimization (order confirmation, cross-sell)

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mar",
    description: "name: ecommerce-checkout-optimization",
    descriptionEn: "name: ecommerce-checkout-optimization",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 75, views: "10.2K", comments: 8,
  });
  count++;

  await db.insert(skills).values({
    title: "Multichannel E-Commerce Management",
    titleEn: "Multichannel E-Commerce Management",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "# Multichannel E-Commerce Management

Manage e-commerce operations across multiple marketplaces and channels. Inventory sync, order routing, listing management, and unified analytics for Amazon, Shopify, Walmart, eBay, Etsy, and TikTok Shop.

## Capabilities

- Multichannel management platform comparison (ChannelAdvisor, Sellbrite, LitCommerce)
- Inventory synchronization and oversell prevention
- Centralized order management and fulfillment routing
- Product listing syndication and adaptation by channel
- Pricing strategy across marketplaces
- Unified analytics and reporting
- Returns and customer service management across channels
- Scaling strategy: when and how to add new channels

## Install

```bash
npx skills add nexscope/multichannel-ecommerce
```

## Usage

Ask your AI agent:

- \"Set up multichannel selling across Amazon, Shopify, and Walmart.\"
- \"What is the best multichannel management tool for my business size?\"
- \"How do I prevent overselling when selling on 4 marketplaces?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Manage e-commerce operations across multiple marketplaces and channels. Inventory sync, order routing, listing management, and unified analytics for Amazon, Shopify, Walmart, eBay, Etsy, and TikTok Sh",
    descriptionEn: "Manage e-commerce operations across multiple marketplaces and channels. Inventory sync, order routing, listing management, and unified analytics for Amazon, Shopify, Walmart, eBay, Etsy, and TikTok Sh",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 57, views: "10.4K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "Influencer Outreach",
    titleEn: "Influencer Outreach",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "# Influencer Outreach

Find, contact, and manage influencer partnerships for e-commerce brands. Outreach templates, negotiation tactics, contract frameworks, and relationship management across Instagram, TikTok, YouTube, and more.

## Capabilities

- Influencer discovery by platform, niche, and audience demographics
- Outreach email and DM templates (cold and warm)
- Rate negotiation frameworks and pricing benchmarks
- Campaign brief creation and content guidelines
- Contract templates covering usage rights and deliverables
- Performance tracking and reporting
- Long-term ambassador program design
- Micro-influencer vs macro-influencer strategy

## Install

```bash
npx skills add nexscope/influencer-outreach
```

## Usage

Ask your AI agent:

- \"Write outreach emails for 10 fitness influencers for my supplement brand.\"
- \"What should I pay a TikTok creator with 50K followers?\"
- \"Create a contract template for influencer partnerships.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Find, contact, and manage influencer partnerships for e-commerce brands. Outreach templates, negotiation tactics, contract frameworks, and relationship management across Instagram, TikTok, YouTube, an",
    descriptionEn: "Find, contact, and manage influencer partnerships for e-commerce brands. Outreach templates, negotiation tactics, contract frameworks, and relationship management across Instagram, TikTok, YouTube, an",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 65, views: "6.5K", comments: 8,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Brand Analytics 📋",
    titleEn: "Amazon Brand Analytics 📋",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能", "品牌", "数据分析"],
    tagsEn: ["Amazon", "跨境电商", "AI技能", "品牌", "数据分析"],
    content: "---
name: amazon-brand-analytics
description: \"Interpret and act on Amazon Brand Analytics data. Analyze Search Frequency Rank (SFR), click share, conversion share, market basket analysis, and repeat purchase behavior to optimize your Amazon strategy.\"
metadata:
  nexscope:
    emoji: \"📋\"
    category: amazon
---

# Amazon Brand Analytics 📋

Interpret and act on Amazon Brand Analytics data. Analyze Search Frequency Rank (SFR), click share, conversion share, market basket analysis, and repeat purchase behavior to optimize your Amazon strategy.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-brand-analytics -g
```

## Usage

```
Help me analyze my Amazon Brand Analytics data. My top search term has SFR #5,200 with 15% click share but only 8% conversion share. What should I do?
```

## Capabilities

- Search Frequency Rank (SFR) trend interpretation
- Click share and conversion share analysis
- Market basket analysis (frequently bought together insights)
- Repeat purchase behavior patterns
- Demographics data interpretation
- Search term performance optimization recommendations

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
-",
    description: "name: amazon-brand-analytics",
    descriptionEn: "name: amazon-brand-analytics",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 34, views: "5.2K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Amazon Search Optimization 🔍",
    titleEn: "Amazon Search Optimization 🔍",
    role: "ecommerce",
    tags: ["Amazon", "跨境电商", "AI技能"],
    tagsEn: ["Amazon", "跨境电商", "AI技能"],
    content: "---
name: amazon-search-optimization
description: \"Optimize product visibility in Amazon search results. Analyze current search ranking factors, identify optimization gaps, and provide actionable improvements for Amazon's A9/COSMO algorithm.\"
metadata:
  nexscope:
    emoji: \"🔍\"
    category: amazon
---

# Amazon Search Optimization 🔍

Optimize product visibility in Amazon search results. Analyze current search ranking factors, identify optimization gaps, and provide actionable improvements for Amazon's A9/COSMO algorithm.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-search-optimization -g
```

## Usage

```
My product ranks on page 3 for my main keyword. Help me create a plan to get to page 1. Product: wireless phone charger, 150 reviews, 4.3 stars.
```

## Capabilities

- Search ranking factor analysis (relevance, performance, customer satisfaction)
- Title optimization for A9 algorithm (keyword placement, structure)
- Bullet point optimization for conversion and indexing
- Index verification methodology
- Search term harvesting from auto-campaigns
- Ranking improvement action plan with priority scoring

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ",
    description: "name: amazon-search-optimization",
    descriptionEn: "name: amazon-search-optimization",
    scenario: "跨境电商卖家运营Amazon平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Amazon operations",
    problemFocus: "Amazon平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Amazon operations are complex, needing systematic tools to improve efficiency",
    author: "Amazon · nexscope-ai",
    likes: 59, views: "10.5K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Product Description Generator 📝",
    titleEn: "Product Description Generator 📝",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "选品"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "选品"],
    content: "---
name: product-description-generator
description: \"E-commerce product description generator for any platform. Generates optimized titles, bullet points, descriptions, and backend keywords using competitor research + keyword scoring + FABE copywriting. Two modes: (A) Create — generate listing from product specs with optional competitor analysis, (B) Optimize — improve existing listing with keyword gap analysis. Supports Amazon, eBay, Walmart, Shopify, Etsy, TikTok Shop, Lazada, Shopee. No API key required. Use when: (1) writing a new product listing, (2) analyzing what makes competitors rank, (3) improving an underperforming listing.\"
metadata: {\"nexscope\":{\"emoji\":\"📝\",\"category\":\"ecommerce\"}}
---

# Product Description Generator 📝

Generate platform-optimized product copy — titles, bullet points, descriptions, and backend keywords — for any major e-commerce platform. No API key required.

## Installation

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill product-description-generator -g
```

> **For Amazon listings**, use our dedicated skill with Cosmo algorithm optimization:
> ```bash
> npx skills add nexscope-ai/Amazon-Skills --skill amazon-listing-optimization -g
> ```
> See: [amazon-listing-optimization](https://github.com/nexscope-ai/Amazon-Skills/tree/main/amazon-listing-optimization)

## Two Modes

| Mode | When to Use | Input |
|------|-------------|-------|
| **A — Create** | Writing a new listing | Product specs + optional competitor URLs |
| **B — Optimize** | Improving existing listing | Current listing or URL + optional competitor URLs |

Both modes support competitor analysis — just include competitor URLs to enable it.

## Supported Platforms

| Platform | Output Components |
|----------|-------------------|
| **Amazon** | Title (≤200) + 5 Bullets (≤500 each) + Description (≤2000) + Backend (≤250 bytes) |
| **eBay** | Title (≤80) + HTML Description |
| **Walmart** | Title (≤75) + Short Desc (≤150) + 10 Features + Long Desc |
|",
    description: "name: product-description-generator",
    descriptionEn: "name: product-description-generator",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 52, views: "3.2K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Product Launch Strategy 🚀",
    titleEn: "Product Launch Strategy 🚀",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "选品"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "选品"],
    content: "---
name: product-launch-strategy
description: \"Plan and execute e-commerce product launches. Pre-launch, launch day, and post-launch playbooks for Amazon, Shopify, and multi-channel sellers. Covers inventory, pricing, advertising, and review strategy.\"
metadata:
  nexscope:
    emoji: \"🚀\"
    category: ecommerce
---

# Product Launch Strategy 🚀

Plan and execute e-commerce product launches. Pre-launch, launch day, and post-launch playbooks for Amazon, Shopify, and multi-channel sellers. Covers inventory, pricing, advertising, and review strategy.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill product-launch-strategy -g
```

## Usage

```
I'm launching a new kitchen gadget on Amazon next month. Help me create a launch plan. Budget: $2,000 for launch. I have 500 email subscribers.
```

## Capabilities

- Pre-launch checklist (listing, inventory, pricing, imagery)
- Launch timeline creation (4-8 week plan)
- Launch pricing strategy (introductory pricing, coupons, deals)
- Review generation plan (compliant strategies per platform)
- Launch advertising playbook (PPC ramp-up schedule)
- Social proof and influencer seeding strategy
- Post-launch optimization workflow (days 7, 14, 30)

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where av",
    description: "name: product-launch-strategy",
    descriptionEn: "name: product-launch-strategy",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 34, views: "3.7K", comments: 7,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Customer Retention",
    titleEn: "E-Commerce Customer Retention",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "# E-Commerce Customer Retention

Increase customer retention and repeat purchases for e-commerce businesses. Email flows, loyalty programs, subscription models, customer segmentation, and win-back strategies.

## Capabilities

- Customer retention metrics and benchmarking (by industry)
- Post-purchase email and SMS flow design
- Loyalty and rewards program setup
- Subscription and auto-replenishment models
- Customer segmentation: RFM analysis
- Win-back campaign strategy for lapsed customers
- Review and referral program integration
- Customer lifetime value optimization

## Install

```bash
npx skills add nexscope/ecommerce-customer-retention
```

## Usage

Ask your AI agent:

- \"Build a customer retention strategy for my Shopify store.\"
- \"Design a loyalty program for my beauty brand.\"
- \"Create win-back email flows for customers who haven't purchased in 90 days.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Increase customer retention and repeat purchases for e-commerce businesses. Email flows, loyalty programs, subscription models, customer segmentation, and win-back strategies.",
    descriptionEn: "Increase customer retention and repeat purchases for e-commerce businesses. Email flows, loyalty programs, subscription models, customer segmentation, and win-back strategies.",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 48, views: "3.5K", comments: 11,
  });
  count++;

  await db.insert(skills).values({
    title: "Product Page SEO 🔎",
    titleEn: "Product Page SEO 🔎",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "SEO", "选品"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "SEO", "选品"],
    content: "---
name: product-page-seo
description: \"Optimize e-commerce product pages for search engine visibility. On-page SEO, structured data, page speed, mobile optimization, and content strategy for Google, Bing, and platform-specific search.\"
metadata:
  nexscope:
    emoji: \"🔎\"
    category: ecommerce
---

# Product Page SEO 🔎

Optimize e-commerce product pages for search engine visibility. On-page SEO, structured data, page speed, mobile optimization, and content strategy for Google, Bing, and platform-specific search.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill product-page-seo -g
```

## Usage

```
Audit the SEO of my Shopify product page for a yoga mat. URL: [paste URL]. I'm getting zero organic traffic from Google.
```

## Capabilities

- Product page SEO audit framework (title tag, meta description, H1, URL)
- Structured data markup (Product schema, Review schema, FAQ schema)
- Image optimization (alt text, file size, WebP conversion)
- Page speed optimization recommendations
- Mobile usability optimization
- Internal linking strategy for product pages
- Content enrichment (FAQs, buying guides, comparison tables)

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates w",
    description: "name: product-page-seo",
    descriptionEn: "name: product-page-seo",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 58, views: "7.6K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "Public Status Page",
    titleEn: "Public Status Page",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Public Status Page\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"status-page\"
    - \"incident-communication\"
    - \"transparency\"
    - \"monitoring\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"public status page\"
---

# Public Status Page

AI-powered public status page design skill for e-commerce businesses. Creates status page architecture, incident communication templates, subscriber notification systems, and uptime reporting frameworks.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install public-status-page
```

## Usage

**Input:**
Services/systems to monitor, audience (customers/partners), SLA targets

**Output:**
Status page architecture, incident template library, notification subscription design, uptime reporting framework

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up public status page for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 34, views: "9.3K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Pricing Strategy",
    titleEn: "Etsy Pricing Strategy",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能"],
    tagsEn: ["Etsy", "跨境电商", "AI技能"],
    content: "---
name: etsy-pricing-strategy
description: \"Etsy pricing — cost calculation, competitor pricing, perceived value, shipping cost integration, sales and coupons\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Pricing Strategy

Etsy pricing — cost calculation, competitor pricing, perceived value, shipping cost integration, sales and coupons.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-pricing-strategy -g
```

## Usage

After installation, ask your AI assistant about Etsy Pricing Strategy topics. Example prompts:

- \"Help me with etsy pricing strategy for my Etsy shop\"
- \"What are the best practices for etsy pricing strategy?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-pricing-strategy",
    descriptionEn: "name: etsy-pricing-strategy",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 43, views: "4.8K", comments: 11,
  });
  count++;

  await db.insert(skills).values({
    title: "Product Title Optimization ✏️",
    titleEn: "Product Title Optimization ✏️",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "选品"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "选品"],
    content: "---
name: product-title-optimization
description: \"Optimize product titles for search visibility and click-through rate across e-commerce platforms. Platform-specific title rules for Amazon (200 chars), Etsy (140 chars), Walmart, Shopify SEO, and eBay.\"
metadata:
  nexscope:
    emoji: \"✏️\"
    category: ecommerce
---

# Product Title Optimization ✏️

Optimize product titles for search visibility and click-through rate across e-commerce platforms. Platform-specific title rules for Amazon (200 chars), Etsy (140 chars), Walmart, Shopify SEO, and eBay.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill product-title-optimization -g
```

## Usage

```
Optimize my product title for Amazon and Etsy. Product: handmade leather wallet, RFID blocking, bifold, for men. Current Amazon title: 'Leather Wallet for Men'.
```

## Capabilities

- Platform-specific title structure templates
- Keyword placement optimization (front-loading high-value terms)
- Character limit compliance per platform
- Click-through rate optimization (benefit-driven language)
- A/B title variant generation for testing
- Multi-platform title adaptation from a single product

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark",
    description: "name: product-title-optimization",
    descriptionEn: "name: product-title-optimization",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 64, views: "9.5K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Review Monitoring 👁️",
    titleEn: "Review Monitoring 👁️",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "评论管理"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "评论管理"],
    content: "---
name: review-monitoring
description: \"Set up systematic review monitoring across e-commerce platforms. Track new reviews, detect negative review spikes, monitor competitor reviews, and automate review response workflows.\"
metadata:
  nexscope:
    emoji: \"👁️\"
    category: ecommerce
---

# Review Monitoring 👁️

Set up systematic review monitoring across e-commerce platforms. Track new reviews, detect negative review spikes, monitor competitor reviews, and automate review response workflows.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill review-monitoring -g
```

## Usage

```
Set up a review monitoring system for my products. I sell on Amazon (3 ASINs) and Etsy (15 listings). I want to catch negative reviews within 24 hours.
```

## Capabilities

- Multi-platform review monitoring setup (Amazon, Etsy, Walmart, Shopify)
- Negative review alert framework and response templates
- Review velocity tracking and anomaly detection
- Competitor review monitoring strategy
- Review response best practices by platform
- Review solicitation compliance guide (per platform rules)

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with co",
    description: "name: review-monitoring",
    descriptionEn: "name: review-monitoring",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 44, views: "5.5K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Product Review Analysis ⭐",
    titleEn: "Product Review Analysis ⭐",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "选品", "评论管理"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "选品", "评论管理"],
    content: "---
name: product-review-analysis
description: \"Analyze product reviews across any e-commerce platform. Extract actionable insights from customer feedback including pain points, praise patterns, feature requests, and sentiment trends.\"
metadata:
  nexscope:
    emoji: \"⭐\"
    category: ecommerce
---

# Product Review Analysis ⭐

Analyze product reviews across any e-commerce platform. Extract actionable insights from customer feedback including pain points, praise patterns, feature requests, and sentiment trends.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill product-review-analysis -g
```

## Usage

```
I have 200 reviews on my Etsy shop averaging 4.5 stars. Help me analyze the negative reviews to find product improvement opportunities.
```

## Capabilities

- Multi-platform review aggregation framework (Amazon, Etsy, Shopify, etc.)
- Sentiment trend analysis over time
- Pain point categorization and frequency ranking
- Feature satisfaction scoring
- Review authenticity signal detection
- Competitive review benchmarking

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerc",
    description: "name: product-review-analysis",
    descriptionEn: "name: product-review-analysis",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 73, views: "6.3K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Analytics Guide",
    titleEn: "Shopify Analytics Guide",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能", "数据分析"],
    tagsEn: ["Shopify", "跨境电商", "AI技能", "数据分析"],
    content: "# Shopify Analytics Guide

Master Shopify analytics and reporting. Understand key metrics, build custom reports, track customer behavior, and make data-driven decisions to grow your Shopify store.

## Capabilities

- Dashboard metrics interpretation (sessions, CVR, AOV, revenue)
- Customer acquisition and behavior analysis
- Product performance reporting
- Marketing channel attribution
- Cohort analysis and customer lifetime value
- Custom report building
- Third-party analytics integration (GA4, Triple Whale, Polar)
- Benchmarking against industry averages

## Install

```bash
npx skills add nexscope/shopify-analytics-guide
```

## Usage

Ask your AI agent:

- \"Explain my Shopify analytics dashboard and what to focus on.\"
- \"Build a weekly KPI report template for my Shopify store.\"
- \"How do I track customer lifetime value in Shopify?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Master Shopify analytics and reporting. Understand key metrics, build custom reports, track customer behavior, and make data-driven decisions to grow your Shopify store.",
    descriptionEn: "Master Shopify analytics and reporting. Understand key metrics, build custom reports, track customer behavior, and make data-driven decisions to grow your Shopify store.",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 67, views: "4.8K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Sales Tracking Tool 📉",
    titleEn: "Sales Tracking Tool 📉",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "数据分析"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "数据分析"],
    content: "---
name: sales-tracking-tool
description: \"Track and analyze e-commerce sales performance across platforms. Set up KPI dashboards, trend analysis, and performance alerts to catch issues and opportunities early.\"
metadata:
  nexscope:
    emoji: \"📉\"
    category: ecommerce
---

# Sales Tracking Tool 📉

Track and analyze e-commerce sales performance across platforms. Set up KPI dashboards, trend analysis, and performance alerts to catch issues and opportunities early.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill sales-tracking-tool -g
```

## Usage

```
Help me set up sales tracking for my business. I sell on Amazon ($30K/mo) and Shopify ($10K/mo). What KPIs should I track and how often?
```

## Capabilities

- Cross-platform sales dashboard framework (Amazon, Shopify, Walmart, etc.)
- KPI definition and target setting by business stage
- Trend analysis methodology (daily, weekly, monthly, YoY)
- Anomaly detection framework (unusual spikes or drops)
- SKU-level performance tracking
- Cohort analysis for customer behavior insights

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

Mor",
    description: "name: sales-tracking-tool",
    descriptionEn: "name: sales-tracking-tool",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 56, views: "9.0K", comments: 9,
  });
  count++;

  await db.insert(skills).values({
    title: "Restock Alert",
    titleEn: "Restock Alert",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Restock Alert\"
  category: \"Supply Chain & Logistics\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"inventory\"
    - \"restock\"
    - \"supply-chain\"
    - \"alerts\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"restock alert\"
---

# Restock Alert

AI-powered restock alert and replenishment planning skill. Calculates optimal reorder points, safety stock levels, and stockout risk scores to prevent lost sales from inventory gaps.

## Capabilities

- Generates actionable supply chain & logistics frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install restock-alert
```

## Usage

**Input:**
SKU data, sales velocity, lead times, storage costs

**Output:**
Restock alert rules, safety stock calculations, reorder timing windows, stockout risk scores

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up restock alert for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 69, views: "8.0K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Blog Strategy",
    titleEn: "Shopify Blog Strategy",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-blog-strategy
description: \"Content marketing via Shopify blog — SEO content, product education, buying guides, internal linking\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Blog Strategy

Content marketing via Shopify blog — SEO content, product education, buying guides, internal linking.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-blog-strategy -g
```

## Usage

After installation, ask your AI assistant about shopify blog strategy topics. Example prompts:

- \"Help me with shopify blog strategy for my Shopify store\"
- \"What are the best practices for shopify blog strategy?\"
- \"Audit my current shopify blog strategy setup and suggest improvements\"
- \"Create a step-by-step shopify blog strategy implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-blog-strategy",
    descriptionEn: "name: shopify-blog-strategy",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 52, views: "3.4K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "Share Of Shelf",
    titleEn: "Share Of Shelf",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Share of Shelf\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"digital-shelf\"
    - \"visibility\"
    - \"category-analysis\"
    - \"monitoring\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"share of shelf\"
---

# Share of Shelf

AI-powered digital share of shelf analysis skill. Measures brand visibility within product categories, benchmarks against competitors, and tracks shelf position trends across e-commerce platforms.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install share-of-shelf
```

## Usage

**Input:**
Brand name, product category, target marketplace(s), competitor brands

**Output:**
Share of shelf score, category positioning map, competitor visibility comparison, trend tracking framework

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up share of shelf for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 42, views: "5.8K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Checkout Customization",
    titleEn: "Shopify Checkout Customization",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-checkout-customization
description: \"Checkout optimization — Checkout Extensibility, custom fields, express payments, trust elements\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Checkout Customization

Checkout optimization — Checkout Extensibility, custom fields, express payments, trust elements.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-checkout-customization -g
```

## Usage

After installation, ask your AI assistant about shopify checkout customization topics. Example prompts:

- \"Help me with shopify checkout customization for my Shopify store\"
- \"What are the best practices for shopify checkout customization?\"
- \"Audit my current shopify checkout customization setup and suggest improvements\"
- \"Create a step-by-step shopify checkout customization implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-checkout-customization",
    descriptionEn: "name: shopify-checkout-customization",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 72, views: "3.1K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Cart Abandonment",
    titleEn: "Shopify Cart Abandonment",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-cart-abandonment
description: \"Cart abandonment recovery — email sequences, SMS, retargeting, exit intent, checkout friction audit\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Cart Abandonment

Cart abandonment recovery — email sequences, SMS, retargeting, exit intent, checkout friction audit.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-cart-abandonment -g
```

## Usage

After installation, ask your AI assistant about shopify cart abandonment topics. Example prompts:

- \"Help me with shopify cart abandonment for my Shopify store\"
- \"What are the best practices for shopify cart abandonment?\"
- \"Audit my current shopify cart abandonment setup and suggest improvements\"
- \"Create a step-by-step shopify cart abandonment implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-cart-abandonment",
    descriptionEn: "name: shopify-cart-abandonment",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 38, views: "9.8K", comments: 11,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy SEO Tags",
    titleEn: "Etsy SEO Tags",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "SEO"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "SEO"],
    content: "---
name: etsy-seo-tags
description: \"Etsy tag optimization — 13-tag strategy, attribute optimization, search ranking factors\"
metadata:
  nexscope:
    category: etsy
---

# Etsy SEO Tags

Etsy tag optimization — 13-tag strategy, attribute optimization, search ranking factors.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-seo-tags -g
```

## Usage

After installation, ask your AI assistant about Etsy SEO Tags topics. Example prompts:

- \"Help me with etsy seo tags for my Etsy shop\"
- \"What are the best practices for etsy seo tags?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-seo-tags",
    descriptionEn: "name: etsy-seo-tags",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 63, views: "4.3K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Conversion Optimization",
    titleEn: "Shopify Conversion Optimization",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "# Shopify Conversion Optimization

Increase Shopify store conversion rates with data-driven optimization. Product pages, checkout flow, trust signals, page speed, mobile UX, and A/B testing for higher revenue per visitor.

## Capabilities

- Conversion funnel analysis and drop-off identification
- Product page optimization: images, descriptions, social proof
- Checkout flow streamlining and friction reduction
- Trust signal implementation (reviews, badges, guarantees)
- Mobile-first UX optimization
- Page speed impact on conversion and fixes
- Urgency and scarcity tactics (ethical implementation)
- Post-purchase upsell and cross-sell setup

## Install

```bash
npx skills add nexscope/shopify-conversion-optimization
```

## Usage

Ask your AI agent:

- \"Audit my Shopify store conversion rate and give me a fix list.\"
- \"How do I reduce cart abandonment on my Shopify store?\"
- \"Optimize my product pages for higher conversion.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Increase Shopify store conversion rates with data-driven optimization. Product pages, checkout flow, trust signals, page speed, mobile UX, and A/B testing for higher revenue per visitor.",
    descriptionEn: "Increase Shopify store conversion rates with data-driven optimization. Product pages, checkout flow, trust signals, page speed, mobile UX, and A/B testing for higher revenue per visitor.",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 70, views: "3.4K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Google Channel",
    titleEn: "Shopify Google Channel",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-google-channel
description: \"Google integration — Shopping feed, Performance Max, free listings, Merchant Center optimization\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Google Channel

Google integration — Shopping feed, Performance Max, free listings, Merchant Center optimization.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-google-channel -g
```

## Usage

After installation, ask your AI assistant about shopify google channel topics. Example prompts:

- \"Help me with shopify google channel for my Shopify store\"
- \"What are the best practices for shopify google channel?\"
- \"Audit my current shopify google channel setup and suggest improvements\"
- \"Create a step-by-step shopify google channel implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-google-channel",
    descriptionEn: "name: shopify-google-channel",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 53, views: "4.0K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Email Flows",
    titleEn: "Shopify Email Flows",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-email-flows
description: \"Email automation flows — welcome series, abandoned cart, post-purchase, win-back, browse abandonment\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Email Flows

Email automation flows — welcome series, abandoned cart, post-purchase, win-back, browse abandonment.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-email-flows -g
```

## Usage

After installation, ask your AI assistant about shopify email flows topics. Example prompts:

- \"Help me with shopify email flows for my Shopify store\"
- \"What are the best practices for shopify email flows?\"
- \"Audit my current shopify email flows setup and suggest improvements\"
- \"Create a step-by-step shopify email flows implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-email-flows",
    descriptionEn: "name: shopify-email-flows",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 64, views: "9.6K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Dropshipping",
    titleEn: "Shopify Dropshipping",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能", "物流"],
    tagsEn: ["Shopify", "跨境电商", "AI技能", "物流"],
    content: "---
name: shopify-dropshipping
description: \"Dropshipping setup and scaling — supplier integration, automation, pricing strategy, customer experience\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Dropshipping

Dropshipping setup and scaling — supplier integration, automation, pricing strategy, customer experience.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-dropshipping -g
```

## Usage

After installation, ask your AI assistant about shopify dropshipping topics. Example prompts:

- \"Help me with shopify dropshipping for my Shopify store\"
- \"What are the best practices for shopify dropshipping?\"
- \"Audit my current shopify dropshipping setup and suggest improvements\"
- \"Create a step-by-step shopify dropshipping implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-dropshipping",
    descriptionEn: "name: shopify-dropshipping",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 37, views: "6.2K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify International Selling",
    titleEn: "Shopify International Selling",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-international
description: \"Shopify Markets — multi-currency, translation, duties/taxes, localized pricing, market-specific content\"
metadata:
  nexscope:
    category: shopify
---

# Shopify International Selling

Shopify Markets — multi-currency, translation, duties/taxes, localized pricing, market-specific content.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-international -g
```

## Usage

After installation, ask your AI assistant about shopify international selling topics. Example prompts:

- \"Help me with shopify international selling for my Shopify store\"
- \"What are the best practices for shopify international selling?\"
- \"Audit my current shopify international selling setup and suggest improvements\"
- \"Create a step-by-step shopify international selling implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-international",
    descriptionEn: "name: shopify-international",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 78, views: "3.4K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Inventory Management",
    titleEn: "Shopify Inventory Management",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能", "库存管理"],
    tagsEn: ["Shopify", "跨境电商", "AI技能", "库存管理"],
    content: "---
name: shopify-inventory-management
description: \"Multi-location inventory — transfers, low stock alerts, demand forecasting, safety stock, ABC analysis\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Inventory Management

Multi-location inventory — transfers, low stock alerts, demand forecasting, safety stock, ABC analysis.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-inventory-management -g
```

## Usage

After installation, ask your AI assistant about shopify inventory management topics. Example prompts:

- \"Help me with shopify inventory management for my Shopify store\"
- \"What are the best practices for shopify inventory management?\"
- \"Audit my current shopify inventory management setup and suggest improvements\"
- \"Create a step-by-step shopify inventory management implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-inventory-management",
    descriptionEn: "name: shopify-inventory-management",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 35, views: "10.0K", comments: 3,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Facebook & Instagram Shop",
    titleEn: "Shopify Facebook & Instagram Shop",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-facebook-instagram-shop
description: \"Social selling setup — Facebook Shop, Instagram Shopping, product tagging, social checkout\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Facebook & Instagram Shop

Social selling setup — Facebook Shop, Instagram Shopping, product tagging, social checkout.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-facebook-instagram-shop -g
```

## Usage

After installation, ask your AI assistant about shopify facebook & instagram shop topics. Example prompts:

- \"Help me with shopify facebook & instagram shop for my Shopify store\"
- \"What are the best practices for shopify facebook & instagram shop?\"
- \"Audit my current shopify facebook & instagram shop setup and suggest improvements\"
- \"Create a step-by-step shopify facebook & instagram shop implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-facebook-instagram-shop",
    descriptionEn: "name: shopify-facebook-instagram-shop",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 69, views: "6.4K", comments: 7,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Loyalty Program",
    titleEn: "Shopify Loyalty Program",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-loyalty-program
description: \"Customer loyalty and rewards — points systems, VIP tiers, referral programs, app selection\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Loyalty Program

Customer loyalty and rewards — points systems, VIP tiers, referral programs, app selection.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-loyalty-program -g
```

## Usage

After installation, ask your AI assistant about shopify loyalty program topics. Example prompts:

- \"Help me with shopify loyalty program for my Shopify store\"
- \"What are the best practices for shopify loyalty program?\"
- \"Audit my current shopify loyalty program setup and suggest improvements\"
- \"Create a step-by-step shopify loyalty program implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-loyalty-program",
    descriptionEn: "name: shopify-loyalty-program",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 64, views: "9.6K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Product Photography Guide",
    titleEn: "Shopify Product Photography Guide",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能", "选品"],
    tagsEn: ["Shopify", "跨境电商", "AI技能", "选品"],
    content: "---
name: shopify-product-photography-guide
description: \"DIY product photography — setup, lighting, backgrounds, editing, lifestyle shots, 360 views\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Product Photography Guide

DIY product photography — setup, lighting, backgrounds, editing, lifestyle shots, 360 views.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-product-photography-guide -g
```

## Usage

After installation, ask your AI assistant about shopify product photography guide topics. Example prompts:

- \"Help me with shopify product photography guide for my Shopify store\"
- \"What are the best practices for shopify product photography guide?\"
- \"Audit my current shopify product photography guide setup and suggest improvements\"
- \"Create a step-by-step shopify product photography guide implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-product-photography-guide",
    descriptionEn: "name: shopify-product-photography-guide",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 78, views: "7.4K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Tax Compliance",
    titleEn: "Shopify Tax Compliance",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-tax-compliance
description: \"Tax setup and compliance — sales tax, VAT, duty collection, tax-exempt customers, reporting\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Tax Compliance

Tax setup and compliance — sales tax, VAT, duty collection, tax-exempt customers, reporting.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-tax-compliance -g
```

## Usage

After installation, ask your AI assistant about shopify tax compliance topics. Example prompts:

- \"Help me with shopify tax compliance for my Shopify store\"
- \"What are the best practices for shopify tax compliance?\"
- \"Audit my current shopify tax compliance setup and suggest improvements\"
- \"Create a step-by-step shopify tax compliance implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-tax-compliance",
    descriptionEn: "name: shopify-tax-compliance",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 79, views: "10.8K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Theme Optimization",
    titleEn: "Shopify Theme Optimization",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-theme-optimization
description: \"Theme speed and UX optimization — Core Web Vitals, Liquid code, image loading, mobile responsiveness\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Theme Optimization

Theme speed and UX optimization — Core Web Vitals, Liquid code, image loading, mobile responsiveness.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-theme-optimization -g
```

## Usage

After installation, ask your AI assistant about shopify theme optimization topics. Example prompts:

- \"Help me with shopify theme optimization for my Shopify store\"
- \"What are the best practices for shopify theme optimization?\"
- \"Audit my current shopify theme optimization setup and suggest improvements\"
- \"Create a step-by-step shopify theme optimization implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-theme-optimization",
    descriptionEn: "name: shopify-theme-optimization",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 43, views: "8.2K", comments: 11,
  });
  count++;

  await db.insert(skills).values({
    title: "Dynamic Pricing for E-Commerce",
    titleEn: "Dynamic Pricing for E-Commerce",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "# Dynamic Pricing for E-Commerce

Implement dynamic pricing strategies for e-commerce businesses. Demand-based pricing, competitor-responsive repricing, time-based adjustments, and algorithmic pricing models.

## Capabilities

- Dynamic pricing models: demand-based, competitor-based, time-based
- Repricing tool selection and setup (Amazon, Walmart, Shopify)
- Price elasticity measurement and response curves
- Rule-based vs algorithmic pricing comparison
- Competitive intelligence integration
- Margin floor and ceiling guardrails
- Seasonal and event-driven pricing automation
- Customer segment-based pricing (new vs returning)

## Install

```bash
npx skills add nexscope/dynamic-pricing-ecommerce
```

## Usage

Ask your AI agent:

- \"Set up a dynamic repricing strategy for my Amazon products.\"
- \"What dynamic pricing model works best for my product category?\"
- \"How do I implement demand-based pricing on Shopify?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Implement dynamic pricing strategies for e-commerce businesses. Demand-based pricing, competitor-responsive repricing, time-based adjustments, and algorithmic pricing models.",
    descriptionEn: "Implement dynamic pricing strategies for e-commerce businesses. Demand-based pricing, competitor-responsive repricing, time-based adjustments, and algorithmic pricing models.",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 56, views: "9.2K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "eBay Advertising",
    titleEn: "eBay Advertising",
    role: "ecommerce",
    tags: ["eBay", "跨境电商", "AI技能", "广告投放"],
    tagsEn: ["eBay", "跨境电商", "AI技能", "广告投放"],
    content: "# eBay Advertising

Master eBay advertising — Promoted Listings Standard, Advanced, and Offsite Ads. Campaign setup, bidding strategy, budget allocation, and ROI optimization for eBay sellers.

## Capabilities

- Promoted Listings Standard: ad rate strategy by category
- Promoted Listings Advanced: CPC bidding and keyword targeting
- Offsite Ads opt-in analysis and fee calculation
- Campaign structure and listing selection
- Budget allocation across Promoted Listings types
- Performance metrics: ROAS, impression share, click-through rate
- Seasonal campaign planning
- A/B testing promoted vs organic performance

## Install

```bash
npx skills add nexscope/ebay-advertising
```

## Usage

Ask your AI agent:

- \"Set up Promoted Listings campaigns for my top eBay products.\"
- \"What ad rate should I use for Promoted Listings Standard?\"
- \"Compare my eBay ad ROAS against category benchmarks.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Master eBay advertising — Promoted Listings Standard, Advanced, and Offsite Ads. Campaign setup, bidding strategy, budget allocation, and ROI optimization for eBay sellers.",
    descriptionEn: "Master eBay advertising — Promoted Listings Standard, Advanced, and Offsite Ads. Campaign setup, bidding strategy, budget allocation, and ROI optimization for eBay sellers.",
    scenario: "跨境电商卖家运营eBay平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for eBay operations",
    problemFocus: "eBay平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "eBay operations are complex, needing systematic tools to improve efficiency",
    author: "eBay · nexscope-ai",
    likes: 52, views: "9.7K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "Minimum Advertised Price",
    titleEn: "Minimum Advertised Price",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "定价"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "定价"],
    content: "---
nexscope:
  name: \"Minimum Advertised Price\"
  category: \"Pricing & Profitability\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"MAP\"
    - \"pricing\"
    - \"compliance\"
    - \"brand-protection\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"minimum advertised price\"
    - \"map enforcement\"
    - \"map violation monitoring\"
---

# Minimum Advertised Price

AI-powered MAP (Minimum Advertised Price) policy and enforcement skill. Helps brands create MAP policies, monitor violations across channels, manage dealer compliance, and design enforcement workflows.

## Capabilities

- Generates actionable pricing & profitability frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install minimum-advertised-price
```

## Usage

**Input:**
Brand name, product line, distribution channels, current pricing policy

**Output:**
MAP policy document, violation monitoring plan, dealer compliance checklist, enforcement escalation procedures

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up minimum advertised price for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 54, views: "5.8K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Market Gap Analysis 🎯",
    titleEn: "Market Gap Analysis 🎯",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: market-gap-analysis
description: \"Identify underserved market gaps and unmet customer needs in e-commerce. Analyzes competitor blind spots, review pain points, search demand without adequate supply, and emerging customer segments.\"
metadata:
  nexscope:
    emoji: \"🎯\"
    category: ecommerce
---

# Market Gap Analysis 🎯

Identify underserved market gaps and unmet customer needs in e-commerce. Analyzes competitor blind spots, review pain points, search demand without adequate supply, and emerging customer segments.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill market-gap-analysis -g
```

## Usage

```
Find market gaps in the home office furniture category on Amazon. What are customers asking for that nobody is providing well?
```

## Capabilities

- Competitor coverage gap identification
- Review-based pain point extraction and opportunity mapping
- Search demand vs supply analysis
- Underserved customer segment identification
- Price gap analysis (price points with no quality options)
- Feature gap mapping across competitor products

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Othe",
    description: "name: market-gap-analysis",
    descriptionEn: "name: market-gap-analysis",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 75, views: "4.4K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "Shoppable Video",
    titleEn: "Shoppable Video",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "# Shoppable Video

Create and optimize shoppable video content for e-commerce. Strategy for TikTok Shop, Instagram Reels, YouTube Shorts, and Amazon Live with product tagging, CTAs, and conversion optimization.

## Capabilities

- Shoppable video format selection by platform
- Product tagging and linking best practices
- Script frameworks for product demonstration videos
- Thumbnail and hook optimization for scroll-stopping
- CTA placement and conversion optimization
- Live shopping event planning and execution
- UGC shoppable content strategy
- Video analytics: view-to-purchase rate, engagement, ROAS

## Install

```bash
npx skills add nexscope/shoppable-video
```

## Usage

Ask your AI agent:

- \"Create a shoppable video strategy for my beauty brand on TikTok.\"
- \"What makes a high-converting product video for social commerce?\"
- \"Plan a live shopping event for my product launch.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Create and optimize shoppable video content for e-commerce. Strategy for TikTok Shop, Instagram Reels, YouTube Shorts, and Amazon Live with product tagging, CTAs, and conversion optimization.",
    descriptionEn: "Create and optimize shoppable video content for e-commerce. Strategy for TikTok Shop, Instagram Reels, YouTube Shorts, and Amazon Live with product tagging, CTAs, and conversion optimization.",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 65, views: "6.7K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "Social Media Monitor 📱",
    titleEn: "Social Media Monitor 📱",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: social-media-monitor
description: \"Monitor social media mentions, trends, and competitor activity for e-commerce brands. Set up listening workflows across Reddit, TikTok, Instagram, Twitter/X, and YouTube.\"
metadata:
  nexscope:
    emoji: \"📱\"
    category: ecommerce
---

# Social Media Monitor 📱

Monitor social media mentions, trends, and competitor activity for e-commerce brands. Set up listening workflows across Reddit, TikTok, Instagram, Twitter/X, and YouTube.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill social-media-monitor -g
```

## Usage

```
Set up social media monitoring for my skincare brand. I want to track mentions on TikTok, Instagram, and Reddit. Also monitor 3 competitors.
```

## Capabilities

- Social listening keyword and hashtag setup
- Platform-specific monitoring strategy (Reddit, TikTok, Instagram, Twitter, YouTube)
- Sentiment tracking methodology
- Competitor social media activity tracking
- Influencer mention detection
- Crisis detection and response framework
- UGC (user-generated content) discovery for marketing

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps",
    description: "name: social-media-monitor",
    descriptionEn: "name: social-media-monitor",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 46, views: "3.0K", comments: 9,
  });
  count++;

  await db.insert(skills).values({
    title: "Synthetic Monitoring",
    titleEn: "Synthetic Monitoring",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Synthetic Monitoring\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"monitoring\"
    - \"checkout\"
    - \"uptime\"
    - \"testing\"
    - \"ecommerce\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"synthetic monitoring\"
---

# Synthetic Monitoring

AI-powered synthetic monitoring skill for e-commerce websites. Designs automated user journey tests for add-to-cart, checkout, and payment flows with alerting rules and performance baselines.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install synthetic-monitoring
```

## Usage

**Input:**
Website URL, critical user flows, SLA targets

**Output:**
Synthetic test suite design, alerting rules, performance baselines, incident response procedures

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up synthetic monitoring for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 53, views: "4.0K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Creator Marketplace",
    titleEn: "TikTok Creator Marketplace",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-creator-marketplace
description: \"Creator Marketplace strategy — finding creators, negotiation, campaign management, performance metrics\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Creator Marketplace

Creator Marketplace strategy — finding creators, negotiation, campaign management, performance metrics.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-creator-marketplace -g
```

## Usage

After installation, ask your AI assistant about TikTok Creator Marketplace topics. Example prompts:

- \"Help me with tiktok creator marketplace for my TikTok Shop\"
- \"What are the best practices for tiktok creator marketplace?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-creator-marketplace",
    descriptionEn: "name: tiktok-creator-marketplace",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 32, views: "5.8K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Upsell & Cross-Sell",
    titleEn: "Shopify Upsell & Cross-Sell",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-upsell-cross-sell
description: \"Upsell and cross-sell strategy — product recommendations, cart upsells, post-purchase offers, bundles\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Upsell & Cross-Sell

Upsell and cross-sell strategy — product recommendations, cart upsells, post-purchase offers, bundles.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-upsell-cross-sell -g
```

## Usage

After installation, ask your AI assistant about shopify upsell & cross-sell topics. Example prompts:

- \"Help me with shopify upsell & cross-sell for my Shopify store\"
- \"What are the best practices for shopify upsell & cross-sell?\"
- \"Audit my current shopify upsell & cross-sell setup and suggest improvements\"
- \"Create a step-by-step shopify upsell & cross-sell implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-upsell-cross-sell",
    descriptionEn: "name: shopify-upsell-cross-sell",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 56, views: "3.0K", comments: 9,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Ads",
    titleEn: "TikTok Shop Ads",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "广告投放"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "广告投放"],
    content: "---
name: tiktok-shop-ads
description: \"TikTok Shop advertising — Product Shopping Ads, Video Shopping Ads, Live Shopping Ads, bidding strategy\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Ads

TikTok Shop advertising — Product Shopping Ads, Video Shopping Ads, Live Shopping Ads, bidding strategy.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-ads -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Ads topics. Example prompts:

- \"Help me with tiktok shop ads for my TikTok Shop\"
- \"What are the best practices for tiktok shop ads?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-ads",
    descriptionEn: "name: tiktok-shop-ads",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 74, views: "5.3K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "Localization Testing",
    titleEn: "Localization Testing",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Localization Testing\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"localization\"
    - \"i18n\"
    - \"testing\"
    - \"international\"
    - \"ecommerce\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"localization testing\"
---

# Localization Testing

AI-powered localization and internationalization testing skill for e-commerce sites. Designs multi-language QA frameworks, currency validation checks, shipping info verification, and regional compliance audits.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install localization-testing
```

## Usage

**Input:**
Multi-language site URL(s), target markets, supported languages/currencies

**Output:**
Localization test plan, translation quality checklist, currency/pricing validation, shipping info audit, regional compliance check

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up localization testing for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 52, views: "9.4K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Wholesale Channel",
    titleEn: "Shopify Wholesale Channel",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-wholesale-channel
description: \"B2B/wholesale setup — wholesale pricing, minimum orders, custom catalogs, net payment terms\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Wholesale Channel

B2B/wholesale setup — wholesale pricing, minimum orders, custom catalogs, net payment terms.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-wholesale-channel -g
```

## Usage

After installation, ask your AI assistant about shopify wholesale channel topics. Example prompts:

- \"Help me with shopify wholesale channel for my Shopify store\"
- \"What are the best practices for shopify wholesale channel?\"
- \"Audit my current shopify wholesale channel setup and suggest improvements\"
- \"Create a step-by-step shopify wholesale channel implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-wholesale-channel",
    descriptionEn: "name: shopify-wholesale-channel",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 74, views: "7.0K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Affiliate Program",
    titleEn: "TikTok Shop Affiliate Program",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-shop-affiliate-program
description: \"Affiliate collaboration — commission structure, creator selection, sample management, performance tracking\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Affiliate Program

Affiliate collaboration — commission structure, creator selection, sample management, performance tracking.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-affiliate-program -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Affiliate Program topics. Example prompts:

- \"Help me with tiktok shop affiliate program for my TikTok Shop\"
- \"What are the best practices for tiktok shop affiliate program?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-affiliate-program",
    descriptionEn: "name: tiktok-shop-affiliate-program",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 63, views: "10.3K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Seller Guide",
    titleEn: "Etsy Seller Guide",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能"],
    tagsEn: ["Etsy", "跨境电商", "AI技能"],
    content: "# Etsy Seller Guide

Complete guide for selling on Etsy — from shop setup to scaling. Covers listing optimization, Etsy SEO, pricing strategy, Star Seller requirements, advertising, and shop analytics for handmade, vintage, and digital product sellers.

## Capabilities

- Shop setup and configuration best practices
- Etsy SEO: tags, titles, categories, and search ranking factors
- Listing photography and description optimization
- Pricing strategy including Etsy fees calculation
- Etsy Ads setup and budget allocation
- Star Seller program requirements and tips
- Seasonal selling and trend analysis
- Shop analytics interpretation and action plans

## Install

```bash
npx skills add nexscope/etsy-seller-guide
```

## Usage

Ask your AI agent:

- \"I want to start selling handmade jewelry on Etsy. Help me set up my shop.\"
- \"Optimize my Etsy listings for better search visibility.\"
- \"What pricing strategy should I use for my Etsy digital downloads?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Complete guide for selling on Etsy — from shop setup to scaling. Covers listing optimization, Etsy SEO, pricing strategy, Star Seller requirements, advertising, and shop analytics for handmade, vintag",
    descriptionEn: "Complete guide for selling on Etsy — from shop setup to scaling. Covers listing optimization, Etsy SEO, pricing strategy, Star Seller requirements, advertising, and shop analytics for handmade, vintag",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 52, views: "5.4K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Content Strategy",
    titleEn: "TikTok Shop Content Strategy",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-shop-content-strategy
description: \"Content creation for TikTok Shop — trending formats, hooks, product showcasing, hashtag strategy\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Content Strategy

Content creation for TikTok Shop — trending formats, hooks, product showcasing, hashtag strategy.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-content-strategy -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Content Strategy topics. Example prompts:

- \"Help me with tiktok shop content strategy for my TikTok Shop\"
- \"What are the best practices for tiktok shop content strategy?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-content-strategy",
    descriptionEn: "name: tiktok-shop-content-strategy",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 74, views: "7.7K", comments: 7,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Landing Page 🖥️",
    titleEn: "E-Commerce Landing Page 🖥️",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: ecommerce-landing-page
description: \"Audit and optimize e-commerce landing pages for conversion. CTA placement, trust signals, page structure, copy optimization, and A/B testing strategy for product pages, collection pages, and campaign landing pages.\"
metadata:
  nexscope:
    emoji: \"🖥️\"
    category: ecommerce
---

# E-Commerce Landing Page 🖥️

Audit and optimize e-commerce landing pages for conversion. CTA placement, trust signals, page structure, copy optimization, and A/B testing strategy for product pages, collection pages, and campaign landing pages.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill ecommerce-landing-page -g
```

## Usage

```
Audit my Shopify landing page for our summer collection launch. Conversion rate is 0.8%. I'm driving traffic from Meta ads.
```

## Capabilities

- Landing page conversion audit (CTA, fold, trust signals, friction)
- Hero section optimization (headline, subheadline, CTA, hero image)
- Social proof placement strategy (reviews, testimonials, press mentions)
- Mobile conversion optimization
- Page speed impact analysis
- Copy optimization framework (benefit-driven, objection-handling)
- A/B testing plan with hypothesis prioritization

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks w",
    description: "name: ecommerce-landing-page",
    descriptionEn: "name: ecommerce-landing-page",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 38, views: "9.3K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Live Selling",
    titleEn: "TikTok Live Selling",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "# TikTok Live Selling

Master TikTok live selling for e-commerce. Plan live sessions, engage audiences, pin products, handle real-time sales, and optimize GPM (GMV per mille) for maximum live revenue.

## Capabilities

- Live selling session planning and scheduling
- Equipment and setup requirements
- Audience engagement techniques during live streams
- Product pinning and showcase management
- Real-time sales tactics: flash deals, bundles, giveaways
- GPM optimization and benchmarking
- Multi-host and guest collaboration strategy
- Post-live analytics and iteration

## Install

```bash
npx skills add nexscope/tiktok-live-selling
```

## Usage

Ask your AI agent:

- \"Plan my first TikTok live selling session.\"
- \"How do I increase engagement and sales during TikTok lives?\"
- \"What GPM should I target for my product category?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Master TikTok live selling for e-commerce. Plan live sessions, engage audiences, pin products, handle real-time sales, and optimize GPM (GMV per mille) for maximum live revenue.",
    descriptionEn: "Master TikTok live selling for e-commerce. Plan live sessions, engage audiences, pin products, handle real-time sales, and optimize GPM (GMV per mille) for maximum live revenue.",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 53, views: "6.4K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "E-Commerce Subscription Model",
    titleEn: "E-Commerce Subscription Model",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "# E-Commerce Subscription Model

Design and launch subscription-based e-commerce businesses. Subscribe-and-save, membership boxes, replenishment models, pricing tiers, and churn reduction strategies.

## Capabilities

- Subscription model types: replenishment, curation, access
- Platform setup: Shopify subscriptions, Amazon Subscribe & Save, ReCharge
- Pricing and tier design for maximum LTV
- Subscriber acquisition strategy
- Onboarding flow optimization
- Churn analysis and reduction tactics
- Subscription analytics: MRR, churn rate, ARPU
- Regulatory compliance (auto-renewal laws)

## Install

```bash
npx skills add nexscope/ecommerce-subscription-model
```

## Usage

Ask your AI agent:

- \"Should I add a subscription option to my product?\"
- \"Design a subscribe-and-save program for my consumable product.\"
- \"How do I reduce subscription churn for my box service?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Design and launch subscription-based e-commerce businesses. Subscribe-and-save, membership boxes, replenishment models, pricing tiers, and churn reduction strategies.",
    descriptionEn: "Design and launch subscription-based e-commerce businesses. Subscribe-and-save, membership boxes, replenishment models, pricing tiers, and churn reduction strategies.",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 50, views: "5.0K", comments: 3,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Analytics",
    titleEn: "TikTok Shop Analytics",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "数据分析"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "数据分析"],
    content: "# TikTok Shop Analytics

Master TikTok Shop analytics and data-driven selling. Track shop performance, video analytics, live selling metrics, creator affiliate ROI, and advertising performance.

## Capabilities

- TikTok Shop dashboard metrics interpretation
- Video performance analytics: views, engagement, conversion
- Live selling metrics: viewers, engagement rate, GPM
- Creator affiliate performance tracking
- Advertising analytics: ROAS, CPA, attribution
- Product performance and trending analysis
- Customer demographics and behavior insights
- Benchmarking against category averages

## Install

```bash
npx skills add nexscope/tiktok-shop-analytics
```

## Usage

Ask your AI agent:

- \"Analyze my TikTok Shop performance and identify growth opportunities.\"
- \"Which of my products perform best on TikTok Shop and why?\"
- \"Track ROI from my TikTok creator affiliate campaigns.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Master TikTok Shop analytics and data-driven selling. Track shop performance, video analytics, live selling metrics, creator affiliate ROI, and advertising performance.",
    descriptionEn: "Master TikTok Shop analytics and data-driven selling. Track shop performance, video analytics, live selling metrics, creator affiliate ROI, and advertising performance.",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 34, views: "9.2K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Product Research",
    titleEn: "TikTok Shop Product Research",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "选品"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "选品"],
    content: "---
name: tiktok-shop-product-research
description: \"Product research for TikTok Shop — viral potential scoring, creator demand, category analysis\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Product Research

Product research for TikTok Shop — viral potential scoring, creator demand, category analysis.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-product-research -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Product Research topics. Example prompts:

- \"Help me with tiktok shop product research for my TikTok Shop\"
- \"What are the best practices for tiktok shop product research?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-product-research",
    descriptionEn: "name: tiktok-shop-product-research",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 65, views: "8.3K", comments: 3,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Cross-Border",
    titleEn: "TikTok Shop Cross-Border",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-shop-cross-border
description: \"Cross-border selling on TikTok Shop — market selection, logistics, localization, compliance\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Cross-Border

Cross-border selling on TikTok Shop — market selection, logistics, localization, compliance.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-cross-border -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Cross-Border topics. Example prompts:

- \"Help me with tiktok shop cross-border for my TikTok Shop\"
- \"What are the best practices for tiktok shop cross-border?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-cross-border",
    descriptionEn: "name: tiktok-shop-cross-border",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 36, views: "7.8K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Conversion Optimization",
    titleEn: "TikTok Shop Conversion Optimization",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-shop-conversion
description: \"Conversion optimization — product detail pages, video hooks, urgency tactics, checkout flow\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Conversion Optimization

Conversion optimization — product detail pages, video hooks, urgency tactics, checkout flow.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-conversion -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Conversion Optimization topics. Example prompts:

- \"Help me with tiktok shop conversion optimization for my TikTok Shop\"
- \"What are the best practices for tiktok shop conversion optimization?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-conversion",
    descriptionEn: "name: tiktok-shop-conversion",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 77, views: "6.2K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Etsy Review Strategy",
    titleEn: "Etsy Review Strategy",
    role: "ecommerce",
    tags: ["Etsy", "跨境电商", "AI技能", "评论管理"],
    tagsEn: ["Etsy", "跨境电商", "AI技能", "评论管理"],
    content: "---
name: etsy-review-strategy
description: \"Etsy review generation — thank you cards, follow-up messages, photo review incentives\"
metadata:
  nexscope:
    category: etsy
---

# Etsy Review Strategy

Etsy review generation — thank you cards, follow-up messages, photo review incentives.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for Etsy sellers.

## Capabilities

- Analyze your current Etsy shop setup and identify optimization opportunities
- Provide data-driven recommendations based on Etsy best practices
- Generate step-by-step implementation plans tailored to your shop
- Compare tools, strategies, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill etsy-review-strategy -g
```

## Usage

After installation, ask your AI assistant about Etsy Review Strategy topics. Example prompts:

- \"Help me with etsy review strategy for my Etsy shop\"
- \"What are the best practices for etsy review strategy?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Etsy API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: etsy-review-strategy",
    descriptionEn: "name: etsy-review-strategy",
    scenario: "跨境电商卖家运营Etsy平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Etsy operations",
    problemFocus: "Etsy平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Etsy operations are complex, needing systematic tools to improve efficiency",
    author: "Etsy · nexscope-ai",
    likes: 40, views: "7.5K", comments: 8,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify App Recommendations",
    titleEn: "Shopify App Recommendations",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-app-recommendations
description: \"App stack advisor — essential apps by business stage, cost optimization, performance impact analysis\"
metadata:
  nexscope:
    category: shopify
---

# Shopify App Recommendations

App stack advisor — essential apps by business stage, cost optimization, performance impact analysis.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-app-recommendations -g
```

## Usage

After installation, ask your AI assistant about shopify app recommendations topics. Example prompts:

- \"Help me with shopify app recommendations for my Shopify store\"
- \"What are the best practices for shopify app recommendations?\"
- \"Audit my current shopify app recommendations setup and suggest improvements\"
- \"Create a step-by-step shopify app recommendations implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-app-recommendations",
    descriptionEn: "name: shopify-app-recommendations",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 65, views: "6.7K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Fulfillment",
    titleEn: "TikTok Shop Fulfillment",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "物流"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "物流"],
    content: "---
name: tiktok-shop-fulfillment
description: \"Fulfillment setup — Fulfilled by TikTok, self-fulfillment, shipping templates, return policies\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Fulfillment

Fulfillment setup — Fulfilled by TikTok, self-fulfillment, shipping templates, return policies.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-fulfillment -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Fulfillment topics. Example prompts:

- \"Help me with tiktok shop fulfillment for my TikTok Shop\"
- \"What are the best practices for tiktok shop fulfillment?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-fulfillment",
    descriptionEn: "name: tiktok-shop-fulfillment",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 51, views: "6.4K", comments: 4,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Shipping",
    titleEn: "TikTok Shop Shipping",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "物流"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "物流"],
    content: "---
name: tiktok-shop-shipping
description: \"TikTok Shop shipping setup — carrier selection, shipping templates, delivery expectations\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Shipping

TikTok Shop shipping setup — carrier selection, shipping templates, delivery expectations.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-shipping -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Shipping topics. Example prompts:

- \"Help me with tiktok shop shipping for my TikTok Shop\"
- \"What are the best practices for tiktok shop shipping?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-shipping",
    descriptionEn: "name: tiktok-shop-shipping",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 77, views: "4.2K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify A/B Testing",
    titleEn: "Shopify A/B Testing",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "# Shopify A/B Testing

Run data-driven A/B tests on your Shopify store. Test product pages, pricing, images, copy, checkout flow, and marketing campaigns with proper statistical methodology.

## Capabilities

- A/B testing tool selection for Shopify (native and third-party)
- Test hypothesis formulation and prioritization (ICE/PIE)
- Product page element testing: images, titles, prices, descriptions
- Checkout and cart page optimization tests
- Statistical significance calculation and sample size planning
- Test duration and traffic allocation
- Multi-variate testing for high-traffic stores
- Results interpretation and implementation workflow

## Install

```bash
npx skills add nexscope/shopify-ab-testing
```

## Usage

Ask your AI agent:

- \"Set up A/B tests for my Shopify product pages.\"
- \"What should I test first to improve my conversion rate?\"
- \"Calculate how long I need to run my A/B test for significance.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Run data-driven A/B tests on your Shopify store. Test product pages, pricing, images, copy, checkout flow, and marketing campaigns with proper statistical methodology.",
    descriptionEn: "Run data-driven A/B tests on your Shopify store. Test product pages, pricing, images, copy, checkout flow, and marketing campaigns with proper statistical methodology.",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 56, views: "5.3K", comments: 9,
  });
  count++;

  await db.insert(skills).values({
    title: "Walmart Advertising Strategy",
    titleEn: "Walmart Advertising Strategy",
    role: "ecommerce",
    tags: ["Walmart", "跨境电商", "AI技能", "广告投放"],
    tagsEn: ["Walmart", "跨境电商", "AI技能", "广告投放"],
    content: "# Walmart Advertising Strategy

Master Walmart Connect advertising. Sponsored Products, Sponsored Brands, Display Ads, and onsite/offsite campaigns with bidding strategy, budget allocation, and ROAS optimization.

## Capabilities

- Walmart Sponsored Products campaign setup and optimization
- Sponsored Brands and Sponsored Videos strategy
- Display advertising and DSP campaigns
- Keyword research and targeting for Walmart
- Bidding strategy: automatic vs manual, bid modifiers
- Budget allocation across campaign types
- ROAS tracking and optimization
- Seasonal campaign planning for Walmart events

## Install

```bash
npx skills add nexscope/walmart-advertising-strategy
```

## Usage

Ask your AI agent:

- \"Set up my first Walmart Sponsored Products campaign.\"
- \"What bidding strategy should I use for Walmart advertising?\"
- \"Optimize my Walmart ad campaigns for better ROAS.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Master Walmart Connect advertising. Sponsored Products, Sponsored Brands, Display Ads, and onsite/offsite campaigns with bidding strategy, budget allocation, and ROAS optimization.",
    descriptionEn: "Master Walmart Connect advertising. Sponsored Products, Sponsored Brands, Display Ads, and onsite/offsite campaigns with bidding strategy, budget allocation, and ROAS optimization.",
    scenario: "跨境电商卖家运营Walmart平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Walmart operations",
    problemFocus: "Walmart平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Walmart operations are complex, needing systematic tools to improve efficiency",
    author: "Walmart · nexscope-ai",
    likes: 30, views: "3.4K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "Walmart Listing Optimization 🏪",
    titleEn: "Walmart Listing Optimization 🏪",
    role: "ecommerce",
    tags: ["Walmart", "跨境电商", "AI技能", "Listing优化"],
    tagsEn: ["Walmart", "跨境电商", "AI技能", "Listing优化"],
    content: "---
name: walmart-listing-optimization
description: \"Optimize Walmart Marketplace product listings for search visibility and conversion. Covers Walmart SEO, content quality scoring, rich media, and Walmart-specific listing requirements.\"
metadata:
  nexscope:
    emoji: \"🏪\"
    category: walmart
---

# Walmart Listing Optimization 🏪

Optimize Walmart Marketplace product listings for search visibility and conversion. Covers Walmart SEO, content quality scoring, rich media, and Walmart-specific listing requirements.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill walmart-listing-optimization -g
```

## Usage

```
Optimize my Walmart listing for a kitchen knife set. I already sell it on Amazon and want to adapt the listing for Walmart's algorithm.
```

## Capabilities

- Walmart Content Quality Score optimization
- Title, description, and attribute optimization for Walmart search
- Rich media and shelf description recommendations
- Category-specific attribute completion
- Walmart vs Amazon listing difference guide
- Pro Seller badge qualification checklist
- Walmart Connect ad readiness assessment

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ⚠️ when based on inco",
    description: "name: walmart-listing-optimization",
    descriptionEn: "name: walmart-listing-optimization",
    scenario: "跨境电商卖家运营Walmart平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Walmart operations",
    problemFocus: "Walmart平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Walmart operations are complex, needing systematic tools to improve efficiency",
    author: "Walmart · nexscope-ai",
    likes: 59, views: "6.4K", comments: 7,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Seller Guide",
    titleEn: "TikTok Shop Seller Guide",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "# TikTok Shop Seller Guide

Complete guide for selling on TikTok Shop — product listing, content strategy, live selling, affiliate creator partnerships, TikTok Ads, and analytics for social commerce success.

## Capabilities

- TikTok Shop account setup and product listing
- Content-first selling strategy: short video + live + showcase
- Creator affiliate program setup and management
- TikTok Shop Ads: Video Shopping Ads, LIVE Shopping Ads
- Product page optimization for social commerce
- Trending product identification and sourcing
- Order fulfillment and customer service
- Shop analytics and performance tracking

## Install

```bash
npx skills add nexscope/tiktok-shop-seller-guide
```

## Usage

Ask your AI agent:

- \"I want to start selling beauty products on TikTok Shop. Guide me.\"
- \"How do I set up a TikTok Shop affiliate program with creators?\"
- \"What content strategy works best for TikTok Shop sales?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Complete guide for selling on TikTok Shop — product listing, content strategy, live selling, affiliate creator partnerships, TikTok Ads, and analytics for social commerce success.",
    descriptionEn: "Complete guide for selling on TikTok Shop — product listing, content strategy, live selling, affiliate creator partnerships, TikTok Ads, and analytics for social commerce success.",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 70, views: "9.4K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Trending Products",
    titleEn: "TikTok Shop Trending Products",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "选品"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "选品"],
    content: "---
name: tiktok-shop-trending-products
description: \"Trending product discovery — viral product analysis, category trends, seasonal opportunities on TikTok\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Trending Products

Trending product discovery — viral product analysis, category trends, seasonal opportunities on TikTok.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-trending-products -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Trending Products topics. Example prompts:

- \"Help me with tiktok shop trending products for my TikTok Shop\"
- \"What are the best practices for tiktok shop trending products?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-trending-products",
    descriptionEn: "name: tiktok-shop-trending-products",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 50, views: "7.0K", comments: 3,
  });
  count++;

  await db.insert(skills).values({
    title: "WooCommerce SEO",
    titleEn: "WooCommerce SEO",
    role: "ecommerce",
    tags: ["WooCommerce", "跨境电商", "AI技能", "SEO"],
    tagsEn: ["WooCommerce", "跨境电商", "AI技能", "SEO"],
    content: "# WooCommerce SEO

Optimize WooCommerce stores for search engines. Covers technical SEO, product page optimization, schema markup, site speed, URL structure, and content strategy for organic traffic growth.

## Capabilities

- Technical SEO audit for WooCommerce sites
- Product page title, meta description, and URL optimization
- Schema markup: Product, Review, FAQ, Breadcrumb
- Site speed optimization (image compression, caching, CDN)
- Category and tag taxonomy strategy
- Internal linking structure for product pages
- Blog content strategy for product-related keywords
- XML sitemap and robots.txt configuration

## Install

```bash
npx skills add nexscope/woocommerce-seo
```

## Usage

Ask your AI agent:

- \"Audit my WooCommerce store SEO and give me a fix list.\"
- \"Optimize my product pages for better Google rankings.\"
- \"Set up proper schema markup for my WooCommerce products.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Optimize WooCommerce stores for search engines. Covers technical SEO, product page optimization, schema markup, site speed, URL structure, and content strategy for organic traffic growth.",
    descriptionEn: "Optimize WooCommerce stores for search engines. Covers technical SEO, product page optimization, schema markup, site speed, URL structure, and content strategy for organic traffic growth.",
    scenario: "跨境电商卖家运营WooCommerce平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for WooCommerce operations",
    problemFocus: "WooCommerce平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "WooCommerce operations are complex, needing systematic tools to improve efficiency",
    author: "WooCommerce · nexscope-ai",
    likes: 30, views: "5.3K", comments: 3,
  });
  count++;

  await db.insert(skills).values({
    title: "Walmart Price Tracker",
    titleEn: "Walmart Price Tracker",
    role: "ecommerce",
    tags: ["Walmart", "跨境电商", "AI技能", "定价"],
    tagsEn: ["Walmart", "跨境电商", "AI技能", "定价"],
    content: "---
nexscope:
  name: \"Walmart Price Tracker\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"walmart\"
    - \"price-tracking\"
    - \"monitoring\"
    - \"competitor-analysis\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"walmart price tracker\"
---

# Walmart Price Tracker

AI-powered Walmart price tracking and competitive pricing skill. Analyzes Walmart marketplace pricing trends, competitor price positioning, and generates repricing strategies for Walmart sellers.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install walmart-price-tracker
```

## Usage

**Input:**
Product URL, category, or competitor list on Walmart

**Output:**
Price trend analysis, competitor price comparison, price band analysis, repricing strategy recommendations

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up walmart price tracker for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营Walmart平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Walmart operations",
    problemFocus: "Walmart平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Walmart operations are complex, needing systematic tools to improve efficiency",
    author: "Walmart · nexscope-ai",
    likes: 63, views: "6.5K", comments: 11,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Migration",
    titleEn: "Shopify Migration",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-migration
description: \"Platform migration to Shopify — from WooCommerce, Magento, BigCommerce, data transfer, URL redirects\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Migration

Platform migration to Shopify — from WooCommerce, Magento, BigCommerce, data transfer, URL redirects.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-migration -g
```

## Usage

After installation, ask your AI assistant about shopify migration topics. Example prompts:

- \"Help me with shopify migration for my Shopify store\"
- \"What are the best practices for shopify migration?\"
- \"Audit my current shopify migration setup and suggest improvements\"
- \"Create a step-by-step shopify migration implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-migration",
    descriptionEn: "name: shopify-migration",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 67, views: "4.8K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Page Speed",
    titleEn: "Shopify Page Speed",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Shopify Page Speed\"
  category: \"Site Performance\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"shopify\"
    - \"page-speed\"
    - \"performance\"
    - \"core-web-vitals\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"shopify page speed\"
---

# Shopify Page Speed

AI-powered Shopify page speed optimization skill. Diagnoses performance bottlenecks, provides Core Web Vitals improvement plans, and recommends theme and app optimizations for faster Shopify stores.

## Capabilities

- Generates actionable site performance frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install shopify-page-speed
```

## Usage

**Input:**
Shopify store URL, current theme, installed apps

**Output:**
Speed diagnostic report, Core Web Vitals improvement plan, theme optimization guide, app performance audit

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up shopify page speed for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 67, views: "6.6K", comments: 15,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Store Setup",
    titleEn: "Shopify Store Setup",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "# Shopify Store Setup

Step-by-step Shopify store setup guide. From account creation to first sale — theme selection, product uploads, payment and shipping configuration, domain setup, and launch checklist.

## Capabilities

- Shopify plan comparison and selection
- Theme selection and customization strategy
- Product catalog setup: titles, descriptions, images, variants
- Payment gateway configuration (Shopify Payments, PayPal, etc.)
- Shipping zones, rates, and carrier setup
- Tax configuration by region
- Domain connection and email setup
- Pre-launch checklist and soft launch strategy

## Install

```bash
npx skills add nexscope/shopify-store-setup
```

## Usage

Ask your AI agent:

- \"Walk me through setting up a new Shopify store from scratch.\"
- \"Which Shopify theme is best for a fashion brand?\"
- \"Set up my shipping rates and payment options on Shopify.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Step-by-step Shopify store setup guide. From account creation to first sale — theme selection, product uploads, payment and shipping configuration, domain setup, and launch checklist.",
    descriptionEn: "Step-by-step Shopify store setup guide. From account creation to first sale — theme selection, product uploads, payment and shipping configuration, domain setup, and launch checklist.",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 47, views: "6.3K", comments: 15,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Subscription Setup",
    titleEn: "Shopify Subscription Setup",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-subscription-setup
description: \"Subscription program setup — recurring billing, frequency options, churn reduction, lifetime value\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Subscription Setup

Subscription program setup — recurring billing, frequency options, churn reduction, lifetime value.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-subscription-setup -g
```

## Usage

After installation, ask your AI assistant about shopify subscription setup topics. Example prompts:

- \"Help me with shopify subscription setup for my Shopify store\"
- \"What are the best practices for shopify subscription setup?\"
- \"Audit my current shopify subscription setup setup and suggest improvements\"
- \"Create a step-by-step shopify subscription setup implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-subscription-setup",
    descriptionEn: "name: shopify-subscription-setup",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 36, views: "3.4K", comments: 4,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Influencer Marketing",
    titleEn: "TikTok Influencer Marketing",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "营销"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "营销"],
    content: "# TikTok Influencer Marketing

Plan and execute TikTok influencer marketing campaigns for e-commerce brands. Find creators, negotiate deals, track ROI, and scale UGC content across TikTok and TikTok Shop.

## Capabilities

- Creator discovery by niche, audience size, and engagement rate
- Outreach templates and negotiation frameworks
- Campaign briefing and content guidelines
- TikTok Shop affiliate vs paid partnership comparison
- UGC content repurposing strategy
- ROI tracking: CPM, CPA, ROAS by creator
- Micro vs macro influencer selection criteria
- Contract and usage rights best practices

## Install

```bash
npx skills add nexscope/tiktok-influencer-marketing
```

## Usage

Ask your AI agent:

- \"Find TikTok creators for my skincare brand in the \$500-2000 budget range.\"
- \"Create an influencer campaign brief for my product launch.\"
- \"How do I measure ROI from TikTok influencer partnerships?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Plan and execute TikTok influencer marketing campaigns for e-commerce brands. Find creators, negotiate deals, track ROI, and scale UGC content across TikTok and TikTok Shop.",
    descriptionEn: "Plan and execute TikTok influencer marketing campaigns for e-commerce brands. Find creators, negotiate deals, track ROI, and scale UGC content across TikTok and TikTok Shop.",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 65, views: "6.4K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "Online Reputation Management",
    titleEn: "Online Reputation Management",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Online Reputation Management\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"reputation\"
    - \"brand-monitoring\"
    - \"crisis-management\"
    - \"review-management\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"online reputation management\"
---

# Online Reputation Management

AI-powered online reputation management skill for e-commerce brands. Builds reputation monitoring frameworks, negative review response strategies, rating recovery plans, and crisis communication templates.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install online-reputation-management
```

## Usage

**Input:**
Brand name, product name, or store URL

**Output:**
Reputation monitoring plan, negative review response templates, rating recovery roadmap, crisis response playbook

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up online reputation management for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 60, views: "3.4K", comments: 13,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Compliance",
    titleEn: "TikTok Shop Compliance",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-shop-compliance
description: \"TikTok Shop policies and compliance — restricted products, intellectual property, content guidelines\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Compliance

TikTok Shop policies and compliance — restricted products, intellectual property, content guidelines.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-compliance -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Compliance topics. Example prompts:

- \"Help me with tiktok shop compliance for my TikTok Shop\"
- \"What are the best practices for tiktok shop compliance?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-compliance",
    descriptionEn: "name: tiktok-shop-compliance",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 74, views: "5.8K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Listing Optimization",
    titleEn: "TikTok Shop Listing Optimization",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "Listing优化"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "Listing优化"],
    content: "---
name: tiktok-shop-listing-optimization
description: \"Product listing optimization — titles, descriptions, images, video, attributes for TikTok search\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Listing Optimization

Product listing optimization — titles, descriptions, images, video, attributes for TikTok search.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-listing-optimization -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Listing Optimization topics. Example prompts:

- \"Help me with tiktok shop listing optimization for my TikTok Shop\"
- \"What are the best practices for tiktok shop listing optimization?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-listing-optimization",
    descriptionEn: "name: tiktok-shop-listing-optimization",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 42, views: "5.4K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Pricing",
    titleEn: "TikTok Shop Pricing",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-shop-pricing
description: \"Pricing strategy for TikTok — competitive pricing, commission impact, bundling, discount psychology\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Pricing

Pricing strategy for TikTok — competitive pricing, commission impact, bundling, discount psychology.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-pricing -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Pricing topics. Example prompts:

- \"Help me with tiktok shop pricing for my TikTok Shop\"
- \"What are the best practices for tiktok shop pricing?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-pricing",
    descriptionEn: "name: tiktok-shop-pricing",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 50, views: "7.0K", comments: 3,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Customer Service",
    titleEn: "TikTok Shop Customer Service",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-shop-customer-service
description: \"Customer service on TikTok Shop — response time, dispute resolution, auto-replies, buyer satisfaction\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Customer Service

Customer service on TikTok Shop — response time, dispute resolution, auto-replies, buyer satisfaction.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-customer-service -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Customer Service topics. Example prompts:

- \"Help me with tiktok shop customer service for my TikTok Shop\"
- \"What are the best practices for tiktok shop customer service?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-customer-service",
    descriptionEn: "name: tiktok-shop-customer-service",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 78, views: "9.0K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Reviews",
    titleEn: "TikTok Shop Reviews",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "评论管理"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "评论管理"],
    content: "---
name: tiktok-shop-reviews
description: \"Review strategy for TikTok Shop — encouraging reviews, responding, leveraging UGC, social proof\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Reviews

Review strategy for TikTok Shop — encouraging reviews, responding, leveraging UGC, social proof.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-reviews -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Reviews topics. Example prompts:

- \"Help me with tiktok shop reviews for my TikTok Shop\"
- \"What are the best practices for tiktok shop reviews?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-reviews",
    descriptionEn: "name: tiktok-shop-reviews",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 53, views: "6.5K", comments: 11,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Inventory",
    titleEn: "TikTok Shop Inventory",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "库存管理"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "库存管理"],
    content: "---
name: tiktok-shop-inventory
description: \"Inventory management for TikTok Shop — demand forecasting, viral stock planning, FBT optimization\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Inventory

Inventory management for TikTok Shop — demand forecasting, viral stock planning, FBT optimization.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-inventory -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Inventory topics. Example prompts:

- \"Help me with tiktok shop inventory for my TikTok Shop\"
- \"What are the best practices for tiktok shop inventory?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-inventory",
    descriptionEn: "name: tiktok-shop-inventory",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 37, views: "10.5K", comments: 5,
  });
  count++;

  await db.insert(skills).values({
    title: "Visual Regression Testing",
    titleEn: "Visual Regression Testing",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
nexscope:
  name: \"Visual Regression Testing\"
  category: \"Monitoring & Alerts\"
  version: \"1.0.0\"
  author: \"Nexscope AI\"
  tags:
    - \"testing\"
    - \"visual-regression\"
    - \"QA\"
    - \"monitoring\"
    - \"ecommerce\"
  model: \"any\"
  tokens: \"~2000\"
  keywords:
    - \"visual regression testing\"
---

# Visual Regression Testing

AI-powered visual regression testing skill for e-commerce websites. Designs screenshot comparison workflows, mobile/desktop visual checks, and change detection alerts to prevent conversion-killing UI bugs.

## Capabilities

- Generates actionable monitoring & alerts frameworks based on your specific business context
- Works across major e-commerce platforms (Amazon, Shopify, Walmart, WooCommerce, Etsy, TikTok Shop)
- Provides data-driven recommendations with industry benchmarks
- Outputs ready-to-implement plans, not just generic advice

## Install

```
clawhub install visual-regression-testing
```

## Usage

**Input:**
Website URL, critical pages, device/viewport targets

**Output:**
Visual test suite design, screenshot comparison rules, mobile check checklist, anomaly alerting config

### Example Prompt

> \"I run a [your business type] on [platform]. Help me set up visual regression testing for my business. Here's my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform's current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*",
    description: "nexscope:",
    descriptionEn: "nexscope:",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 56, views: "5.4K", comments: 4,
  });
  count++;

  await db.insert(skills).values({
    title: "Walmart Seller Tools",
    titleEn: "Walmart Seller Tools",
    role: "ecommerce",
    tags: ["Walmart", "跨境电商", "AI技能"],
    tagsEn: ["Walmart", "跨境电商", "AI技能"],
    content: "# Walmart Seller Tools

Essential tools for Walmart Marketplace sellers. Product research, listing optimization, advertising management, inventory sync, and analytics tools for scaling on Walmart.

## Capabilities

- Walmart product research and opportunity finding tools
- Listing optimization and content quality tools
- Walmart Connect ad management platforms
- Inventory and order management software
- Price monitoring and repricing tools
- Analytics and reporting dashboards
- WFS inventory planning tools
- Multi-channel tools with Walmart integration

## Install

```bash
npx skills add nexscope/walmart-seller-tools
```

## Usage

Ask your AI agent:

- \"What tools do I need to start selling on Walmart Marketplace?\"
- \"Compare Walmart seller tools for listing optimization.\"
- \"Set up analytics tracking for my Walmart store.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Essential tools for Walmart Marketplace sellers. Product research, listing optimization, advertising management, inventory sync, and analytics tools for scaling on Walmart.",
    descriptionEn: "Essential tools for Walmart Marketplace sellers. Product research, listing optimization, advertising management, inventory sync, and analytics tools for scaling on Walmart.",
    scenario: "跨境电商卖家运营Walmart平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Walmart operations",
    problemFocus: "Walmart平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Walmart operations are complex, needing systematic tools to improve efficiency",
    author: "Walmart · nexscope-ai",
    likes: 71, views: "10.2K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Landing Page Builder",
    titleEn: "Shopify Landing Page Builder",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-landing-page-builder
description: \"High-converting landing pages — campaign pages, collection pages, seasonal promos, A/B testing\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Landing Page Builder

High-converting landing pages — campaign pages, collection pages, seasonal promos, A/B testing.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-landing-page-builder -g
```

## Usage

After installation, ask your AI assistant about shopify landing page builder topics. Example prompts:

- \"Help me with shopify landing page builder for my Shopify store\"
- \"What are the best practices for shopify landing page builder?\"
- \"Audit my current shopify landing page builder setup and suggest improvements\"
- \"Create a step-by-step shopify landing page builder implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-landing-page-builder",
    descriptionEn: "name: shopify-landing-page-builder",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 38, views: "7.3K", comments: 6,
  });
  count++;

  await db.insert(skills).values({
    title: "Warehouse & Inventory Optimization 🏭",
    titleEn: "Warehouse & Inventory Optimization 🏭",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能"],
    tagsEn: ["通用电商", "跨境电商", "AI技能"],
    content: "---
name: warehouse-optimization
description: \"E-commerce warehouse and inventory optimization advisor. Analyzes inventory health, calculates safety stock and reorder points, performs ABC analysis, evaluates fulfillment costs, and provides actionable recommendations for improving efficiency. Supports all major fulfillment models: Self-fulfillment, Amazon FBA/FBM, Walmart WFS, 3PL, Shopify Fulfillment, TikTok Shop, Dropshipping, and Hybrid setups. No API key required. Use when: (1) reducing stockouts or overstock, (2) calculating safety stock levels, (3) optimizing warehouse costs, (4) improving Amazon IPI score, (5) analyzing inventory KPIs.\"
metadata: {\"nexscope\":{\"emoji\":\"🏭\",\"category\":\"ecommerce\"}}
---

# Warehouse & Inventory Optimization 🏭

Diagnose and optimize your warehouse operations: analyze inventory health, calculate safety stock, reduce costs, and improve efficiency. No API key required.

## Installation

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill warehouse-optimization -g
```

## Supported Fulfillment Models

| Model | Platform | Optimization Focus |
|-------|----------|-------------------|
| **Self-Fulfillment** | Any | Warehouse layout, staffing, pick/pack efficiency, storage costs |
| **Amazon FBA** | Amazon | IPI score, storage fees, aged inventory, restock limits |
| **Amazon FBM** | Amazon | Shipping speed, Prime eligibility, cost vs FBA |
| **Walmart WFS** | Walmart | Fulfillment fees, storage limits, Pro Seller status |
| **3PL** | Multi-channel | Provider costs, SLAs, contract optimization, hidden fees |
| **Shopify Fulfillment Network** | Shopify | Distributed inventory, delivery speed, cost analysis |
| **TikTok Shop Fulfillment** | TikTok | TikTok-specific requirements, shipping SLAs |
| **Dropshipping** | Any | Supplier reliability, lead times, stockout prevention |
| **Hybrid** | Multi-channel | Inventory allocation, channel balancing, split strategy |

## Usage Examples

```
Audit my warehouse operations. I'm",
    description: "name: warehouse-optimization",
    descriptionEn: "name: warehouse-optimization",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 62, views: "7.7K", comments: 10,
  });
  count++;

  await db.insert(skills).values({
    title: "Price Optimization Tool",
    titleEn: "Price Optimization Tool",
    role: "ecommerce",
    tags: ["通用电商", "跨境电商", "AI技能", "定价"],
    tagsEn: ["通用电商", "跨境电商", "AI技能", "定价"],
    content: "# Price Optimization Tool

Optimize product pricing using data-driven methods. Elasticity analysis, competitor benchmarking, margin modeling, and A/B price testing to maximize revenue and profit across e-commerce platforms.

## Capabilities

- Price elasticity estimation by category
- Competitor price benchmarking and gap analysis
- Margin optimization modeling with platform fees
- A/B price testing framework and statistical significance
- Bundle and tiered pricing optimization
- Promotional price planning (coupons, lightning deals)
- Cross-marketplace price harmonization
- Price monitoring alert setup

## Install

```bash
npx skills add nexscope/price-optimization-tool
```

## Usage

Ask your AI agent:

- \"What is the optimal price for my product given these costs and competitor prices?\"
- \"Set up a price testing plan for my top 5 SKUs.\"
- \"Calculate the ideal bundle price for maximum margin.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Optimize product pricing using data-driven methods. Elasticity analysis, competitor benchmarking, margin modeling, and A/B price testing to maximize revenue and profit across e-commerce platforms.",
    descriptionEn: "Optimize product pricing using data-driven methods. Elasticity analysis, competitor benchmarking, margin modeling, and A/B price testing to maximize revenue and profit across e-commerce platforms.",
    scenario: "跨境电商卖家运营通用电商平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for 通用电商 operations",
    problemFocus: "通用电商平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "通用电商 operations are complex, needing systematic tools to improve efficiency",
    author: "通用电商 · nexscope-ai",
    likes: 68, views: "5.7K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Speed Optimization",
    titleEn: "Shopify Speed Optimization",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能"],
    tagsEn: ["Shopify", "跨境电商", "AI技能"],
    content: "---
name: shopify-speed-optimization
description: \"Store speed audit — lazy loading, image compression, app bloat removal, theme code optimization\"
metadata:
  nexscope:
    category: shopify
---

# Shopify Speed Optimization

Store speed audit — lazy loading, image compression, app bloat removal, theme code optimization.

## Status

🔶 **Beta** — This skill provides expert guidance and actionable frameworks for Shopify sellers.

## Capabilities

- Analyze your current Shopify store setup and identify optimization opportunities
- Provide data-driven recommendations based on industry best practices
- Generate step-by-step implementation plans tailored to your business stage
- Compare tools, apps, and strategies with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-speed-optimization -g
```

## Usage

After installation, ask your AI assistant about shopify speed optimization topics. Example prompts:

- \"Help me with shopify speed optimization for my Shopify store\"
- \"What are the best practices for shopify speed optimization?\"
- \"Audit my current shopify speed optimization setup and suggest improvements\"
- \"Create a step-by-step shopify speed optimization implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool/app recommendations with cost comparison
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct Shopify API integration
- Recommendations based on general best practices — always validate with your specific store data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: shopify-speed-optimization",
    descriptionEn: "name: shopify-speed-optimization",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 51, views: "6.0K", comments: 9,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify SEO",
    titleEn: "Shopify SEO",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能", "SEO"],
    tagsEn: ["Shopify", "跨境电商", "AI技能", "SEO"],
    content: "# Shopify SEO

Comprehensive Shopify SEO optimization guide. Technical SEO, on-page optimization, collection pages, blog strategy, site architecture, and link building for Shopify stores.

## Capabilities

- Technical SEO audit: site speed, mobile, crawlability, indexing
- Product page SEO: titles, meta descriptions, image alt text
- Collection page optimization and URL structure
- Blog content strategy for organic traffic
- Internal linking and site architecture
- Schema markup for Shopify (Product, FAQ, Breadcrumb)
- Shopify SEO app recommendations and setup
- Duplicate content handling (variants, pagination)

## Install

```bash
npx skills add nexscope/shopify-seo
```

## Usage

Ask your AI agent:

- \"Run an SEO audit on my Shopify store.\"
- \"Optimize my Shopify collection pages for better rankings.\"
- \"Create a blog content plan to drive organic traffic to my store.\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Comprehensive Shopify SEO optimization guide. Technical SEO, on-page optimization, collection pages, blog strategy, site architecture, and link building for Shopify stores.",
    descriptionEn: "Comprehensive Shopify SEO optimization guide. Technical SEO, on-page optimization, collection pages, blog strategy, site architecture, and link building for Shopify stores.",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 78, views: "3.4K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Creator Management",
    titleEn: "TikTok Shop Creator Management",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-shop-creator-management
description: \"Creator relationship management — recruitment, briefing, content approval, commission optimization\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Creator Management

Creator relationship management — recruitment, briefing, content approval, commission optimization.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-creator-management -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Creator Management topics. Example prompts:

- \"Help me with tiktok shop creator management for my TikTok Shop\"
- \"What are the best practices for tiktok shop creator management?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-creator-management",
    descriptionEn: "name: tiktok-shop-creator-management",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 60, views: "5.2K", comments: 8,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Returns",
    titleEn: "TikTok Shop Returns",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能"],
    content: "---
name: tiktok-shop-returns
description: \"Return policy and process — TikTok Shop policies, return rate reduction, customer communication\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Returns

Return policy and process — TikTok Shop policies, return rate reduction, customer communication.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-returns -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Returns topics. Example prompts:

- \"Help me with tiktok shop returns for my TikTok Shop\"
- \"What are the best practices for tiktok shop returns?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-returns",
    descriptionEn: "name: tiktok-shop-returns",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 38, views: "9.1K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "Walmart Seller Guide",
    titleEn: "Walmart Seller Guide",
    role: "ecommerce",
    tags: ["Walmart", "跨境电商", "AI技能"],
    tagsEn: ["Walmart", "跨境电商", "AI技能"],
    content: "# Walmart Seller Guide

Complete guide for selling on Walmart Marketplace. Covers application, listing optimization, Walmart SEO, WFS fulfillment, advertising, and scaling on America second-largest marketplace.

## Capabilities

- Walmart Marketplace application and approval process
- Product listing creation and optimization
- Walmart SEO: search ranking factors and algorithm
- Walmart Fulfillment Services (WFS) setup and benefits
- Walmart Connect advertising (Sponsored Products, Display)
- Buy Box and pricing strategy
- Pro Seller Badge requirements
- Walmart+ customer targeting and visibility

## Install

```bash
npx skills add nexscope/walmart-seller-guide
```

## Usage

Ask your AI agent:

- \"Help me apply and set up my Walmart Marketplace seller account.\"
- \"Optimize my Walmart product listings for better search ranking.\"
- \"Should I use WFS or self-fulfill on Walmart?\"

## Output

Structured recommendations with actionable steps, benchmarks, and platform-specific guidance.

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "Complete guide for selling on Walmart Marketplace. Covers application, listing optimization, Walmart SEO, WFS fulfillment, advertising, and scaling on America second-largest marketplace.",
    descriptionEn: "Complete guide for selling on Walmart Marketplace. Covers application, listing optimization, Walmart SEO, WFS fulfillment, advertising, and scaling on America second-largest marketplace.",
    scenario: "跨境电商卖家运营Walmart平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Walmart operations",
    problemFocus: "Walmart平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Walmart operations are complex, needing systematic tools to improve efficiency",
    author: "Walmart · nexscope-ai",
    likes: 39, views: "6.8K", comments: 17,
  });
  count++;

  await db.insert(skills).values({
    title: "Shopify Marketing 🟢",
    titleEn: "Shopify Marketing 🟢",
    role: "ecommerce",
    tags: ["Shopify", "跨境电商", "AI技能", "营销"],
    tagsEn: ["Shopify", "跨境电商", "AI技能", "营销"],
    content: "---
name: shopify-marketing
description: \"Complete marketing strategy for Shopify stores. SEO, email marketing, paid ads, social media, conversion optimization, and retention tactics specifically tailored for Shopify/DTC brands.\"
metadata:
  nexscope:
    emoji: \"🟢\"
    category: ecommerce
---

# Shopify Marketing 🟢

Complete marketing strategy for Shopify stores. SEO, email marketing, paid ads, social media, conversion optimization, and retention tactics specifically tailored for Shopify/DTC brands.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill shopify-marketing -g
```

## Usage

```
I launched my Shopify store 3 months ago selling handmade candles. Getting 2,000 visitors/month from Instagram but only 1.2% conversion. Help me improve.
```

## Capabilities

- Shopify SEO optimization (collection pages, product pages, blog)
- Email marketing integration and flow setup (Klaviyo, Omnisend)
- Paid ad strategy for DTC (Meta, Google, TikTok)
- Conversion rate optimization for Shopify themes
- Cart abandonment reduction tactics
- Customer retention and loyalty program setup
- App recommendations for marketing automation

## How This Skill Works

**Step 1:** Collect information from the user's message — product, platform, current situation, and goals.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Research and analyze using the frameworks and methodology below.

**Step 4:** Deliver structured, actionable output with specific recommendations, not vague advice.

## Output Format

- Start with a summary of findings
- Include specific data points and benchmarks where available
- Provide prioritized action items
- Mark estimates with ",
    description: "name: shopify-marketing",
    descriptionEn: "name: shopify-marketing",
    scenario: "跨境电商卖家运营Shopify平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for Shopify operations",
    problemFocus: "Shopify平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "Shopify operations are complex, needing systematic tools to improve efficiency",
    author: "Shopify · nexscope-ai",
    likes: 39, views: "10.3K", comments: 12,
  });
  count++;

  await db.insert(skills).values({
    title: "TikTok Shop Branding",
    titleEn: "TikTok Shop Branding",
    role: "ecommerce",
    tags: ["TikTok Shop", "跨境电商", "AI技能", "品牌"],
    tagsEn: ["TikTok Shop", "跨境电商", "AI技能", "品牌"],
    content: "---
name: tiktok-shop-branding
description: \"Brand building on TikTok — brand identity, content pillars, community engagement, brand storytelling\"
metadata:
  nexscope:
    category: tiktok-shop
---

# TikTok Shop Branding

Brand building on TikTok — brand identity, content pillars, community engagement, brand storytelling.

## Status

🔶 **Beta** — Expert guidance and actionable frameworks for TikTok Shop sellers.

## Capabilities

- Analyze your current TikTok Shop setup and identify optimization opportunities
- Provide data-driven recommendations based on platform best practices
- Generate step-by-step implementation plans tailored to your business
- Compare strategies, tools, and approaches with pros/cons analysis

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill tiktok-shop-branding -g
```

## Usage

After installation, ask your AI assistant about TikTok Shop Branding topics. Example prompts:

- \"Help me with tiktok shop branding for my TikTok Shop\"
- \"What are the best practices for tiktok shop branding?\"
- \"Audit my current setup and suggest improvements\"
- \"Create a step-by-step implementation plan\"

## Output

Structured analysis and recommendations including:
- Current state assessment
- Priority action items (quick wins → long-term)
- Tool and strategy recommendations
- Implementation timeline
- KPIs to track

## Limitations

- Provides strategic guidance, not direct TikTok API integration
- Recommendations based on general best practices — validate with your specific shop data
- For real-time analytics and automated optimization, check out [Nexscope](https://www.nexscope.ai/?co-from=skill)

---

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*",
    description: "name: tiktok-shop-branding",
    descriptionEn: "name: tiktok-shop-branding",
    scenario: "跨境电商卖家运营TikTok Shop平台时需要的AI辅助工具",
    scenarioEn: "Cross-border e-commerce sellers needing AI assistance for TikTok Shop operations",
    problemFocus: "TikTok Shop平台运营复杂，需要系统化工具提升效率",
    problemFocusEn: "TikTok Shop operations are complex, needing systematic tools to improve efficiency",
    author: "TikTok Shop · nexscope-ai",
    likes: 44, views: "5.4K", comments: 7,
  });
  count++;

  console.log(`Imported ${count} ecommerce skills`);
  process.exit(0);
}
importEcommerceSkills().catch(console.error);