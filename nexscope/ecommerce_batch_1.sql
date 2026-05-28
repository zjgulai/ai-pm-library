INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES ('Amazon Global Selling 🌍', 'Amazon Global Selling 🌍', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "全球化"]', '["Amazon", "跨境电商", "AI技能", "全球化"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-global-selling', 'name: amazon-global-selling', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 71, '8.1K', 4),('Amazon Brand Tailored Promotions', 'Amazon Brand Tailored Promotions', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "品牌", "促销"]', '["Amazon", "跨境电商", "AI技能", "品牌", "促销"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-brand-tailored-promotions', 'name: amazon-brand-tailored-promotions', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 64, '3.7K', 7),('Amazon FBA Calculator (Lite)', 'Amazon FBA Calculator (Lite)', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "FBA"]', '["Amazon", "跨境电商", "AI技能", "FBA"]', '---
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
python3 scripts/calculator.py \'{\"length\": 10, \"width\": 6, ...}\' --zh
```

---

_Version 1.0.0 | Platform: Amazon | Variant: Lite_

---

**Part of [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI tools for e-commerce sellers.**', 'name: amazon-fba-calculator', 'name: amazon-fba-calculator', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 52, '9.0K', 15),('Amazon FBA Prep 📋', 'Amazon FBA Prep 📋', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "FBA"]', '["Amazon", "跨境电商", "AI技能", "FBA"]', '---
name: amazon-fba-prep
description: \"Complete FBA preparation guide. Product labeling, packaging requirements, shipment planning, and compliance with Amazon\'s fulfillment center requirements. Avoid common rejection reasons.\"
metadata:
  nexscope:
    emoji: \"📋\"
    category: amazon
---

# Amazon FBA Prep 📋

Complete FBA preparation guide. Product labeling, packaging requirements, shipment planning, and compliance with Amazon\'s fulfillment center requirements. Avoid common rejection reasons.

**Supported platforms:** Amazon, Shopify, WooCommerce, Walmart, TikTok Shop, Etsy, eBay, BigCommerce.

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.

## Install

```bash
npx skills add nexscope-ai/eCommerce-Skills --skill amazon-fba-prep -g
```

## Usage

```
I\'m sending my first FBA shipment — 500 units of a glass water bottle. Walk me through the entire prep process so nothing gets rejected.
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-fba-prep', 'name: amazon-fba-prep', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 79, '6.8K', 17),('Amazon Enhanced Brand Content', 'Amazon Enhanced Brand Content', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "品牌", "内容营销"]', '["Amazon", "跨境电商", "AI技能", "品牌", "内容营销"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-enhanced-brand-content', 'name: amazon-enhanced-brand-content', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 78, '7.6K', 6),('Amazon Private Label', 'Amazon Private Label', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "自有品牌"]', '["Amazon", "跨境电商", "AI技能", "自有品牌"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-private-label', 'name: amazon-private-label', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 76, '9.1K', 4),('Amazon International Listings', 'Amazon International Listings', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "Listing优化"]', '["Amazon", "跨境电商", "AI技能", "Listing优化"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-international-listings', 'name: amazon-international-listings', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 68, '5.7K', 16),('Amazon Negative Keywords 🚫', 'Amazon Negative Keywords 🚫', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "关键词"]', '["Amazon", "跨境电商", "AI技能", "关键词"]', '---
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
Analyze my Amazon search term report. I\'m spending $2,000/month on PPC with 40% ACoS. Help me find negative keywords to cut waste.
```

## Capabilities

- Search term report analysis for negative keyword candidates
- Negative keyword categorization (irrelevant, low-converting, competitor)
- Campaign-level vs ad-group-level negative targeting strategy
- Negative phrase vs negative exact match decision framework
- Estimated savings calculation from negative keyword implementation
- Ongoing negative keyword management workflow

## How This Skill Works

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-negative-keywords', 'name: amazon-negative-keywords', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 57, '4.0K', 15),('Amazon Backend Keywords 🏷️', 'Amazon Backend Keywords 🏷️', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "关键词", "后台关键词"]', '["Amazon", "跨境电商", "AI技能", "关键词", "后台关键词"]', '---
name: amazon-backend-keywords
description: \"Optimize Amazon backend search terms for maximum discoverability. Generate the optimal 250-byte backend keyword set by deduplicating, prioritizing, and formatting keywords that aren\'t already in your listing.\"
metadata:
  nexscope:
    emoji: \"🏷️\"
    category: amazon
---

# Amazon Backend Keywords 🏷️

Optimize Amazon backend search terms for maximum discoverability. Generate the optimal 250-byte backend keyword set by deduplicating, prioritizing, and formatting keywords that aren\'t already in your listing.

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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-backend-keywords', 'name: amazon-backend-keywords', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 79, '4.0K', 12),('Amazon Deal Finder 🎫', 'Amazon Deal Finder 🎫', 'ecommerce', '["Amazon", "跨境电商", "AI技能", " Deals"]', '["Amazon", "跨境电商", "AI技能", " Deals"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-deal-finder', 'name: amazon-deal-finder', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 51, '8.3K', 9),('Amazon PPC Campaign Optimization 📢', 'Amazon PPC Campaign Optimization 📢', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "广告投放"]', '["Amazon", "跨境电商", "AI技能", "广告投放"]', '---
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
- **Keyword grouping**: Organize keywords into campaign buckets with match types and initial bids based on confidence level
- **Bid optimization**: Apply ACoS-based bid adjustment rules using industry-standard formulas (cut/increase by percentage based on ACoS range)
- **Keyword funnel analysis**: Identify migration opportunities (Auto→Broad→Exact) and wasted spend (high-click zero-sale terms)
- **Negative keyword management**: Generate seed lists (cross-campaign, irrelevant terms, generic waste modifiers) and ongoing additions from search term data
- **Search term report analysis**: Parse user-provided campaign data to find profitable terms, wasteful terms, and optimization gaps
- **Competitor ASIN targeting**: Build product targeting campaigns aimed at competitor product pages
- **Integration chain**: Works with [amazon-keyword-research](https://github.com/nexscope-ai/Amazon-Skills/tree/main/amazon-keyword-research) for keyword input and [amazon-listing-optimization](https://github.com/nexscope-ai/Amazon-Skill', 'name: amazon-ppc-campaign', 'name: amazon-ppc-campaign', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 49, '10.6K', 12),('Amazon Product Research 🔎', 'Amazon Product Research 🔎', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "选品"]', '["Amazon", "跨境电商", "AI技能", "选品"]', '---
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
I want to sell silicone kitchen utensils on Amazon. Is this a good market? What\'s the competition like?
```

## Capabilities

- Market demand estimation using BSR and category benchmarks
- Competition intensity scoring (number of sellers, review counts, brand dominance)
- Profit potential calculation including FBA fees and advertising costs
- Entry barrier assessment (capital required, IP risks, certification needs)
- Product differentiation opportunity identification from review gaps
- Seasonal demand pattern analysis

## How This Skill Works

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-product-research', 'name: amazon-product-research', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 42, '7.0K', 15),('Amazon Keyword Research 🔍', 'Amazon Keyword Research 🔍', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "关键词"]', '["Amazon", "跨境电商", "AI技能", "关键词"]', '---
name: amazon-keyword-research
description: \"Amazon keyword research and market opportunity analysis for sellers. Retrieve autocomplete suggestions (long-tail keywords), analyze competitor landscape, and assess market opportunity for any keyword on 12 Amazon marketplaces (US/UK/DE/FR/IT/ES/JP/CA/AU/IN/MX/BR). No API key required. Make sure to use this skill whenever the user mentions Amazon product research, finding products to sell on Amazon, Amazon keyword ideas, niche analysis, competition analysis for Amazon, market opportunity on Amazon, comparing Amazon keywords, evaluating whether a product is worth selling, Amazon autocomplete data, seasonal demand for Amazon products, or anything related to researching what to sell on Amazon — even if they don\'t explicitly say \'keyword research\'. Also trigger when the user asks vague questions like \'is this a good product to sell?\', \'what\'s the competition like for X on Amazon?\', \'should I sell X or Y?\', or \'what are people searching for on Amazon?\'.\"
metadata: {\"nexscope\":{\"emoji\":\"🔍\",\"category\":\"amazon\"}}
---

# Amazon Keyword Research 🔍

Free keyword research for Amazon sellers. No API key — works out of the box.

## Installation

```bash
npx skills add nexscope-ai/Amazon-Skills --skill amazon-keyword-research -g
```

## Capabilities

- **Long-tail keyword mining**: Extract 100-200 real search terms from Amazon\'s autocomplete engine
- **Competitor landscape analysis**: Product count, price range, average rating, review distribution, top brands
- **Seasonal trend detection**: 12-month Google Trends data to identify peak seasons and demand shifts
- **Market opportunity scoring**: 1-10 score combining competition density, price room, and demand signals
- **Multi-marketplace support**: US, UK, DE, FR, IT, ES, JP, CA, AU, IN, MX, BR
- **Keyword comparison**: Side-by-side analysis of multiple keywords

## Usage Examples

Users can ask naturally. Examples:

```
Research the keyword \"portable blender\" on Amazon US
```

```
Find long-tail keywords for \"yoga mat\" on Amazon
```

```
I want to sell resistance bands. What does the Amazon keyword landscape look like?
```

```
Compare \"laptop stand\" vs \"monitor stand\" on Amazon US — which has more opportunity?
```

```
Analyze \"Küchenmesser\" on Amazon Germany
```

```
Research \"water bottle\" across Amazon US, UK, and DE
```

## Workflow

### Step 1: Gather Autocomplete Data

Run the bundled script to collect Amazon autocomplete suggestions:

```bash
<skill>/scripts/research.sh \"<keyword>\" [marketplace]
```

**Parameters:**
- `keyword` (required): The seed keyword to research
- `marketplace` (optional): `us` (default), `uk`, `de`, `fr`, `it`, `es`, `jp`, `ca`, `au`, `in`, `mx`, `br`

**What the script does:**
- Queries Amazon\'s autocomplete API with the seed keyword
- Expands with prefixes: \"best [keyword]\", \"cheap [keyword]\", \"top [keyword]\"
- Expands with a-z suffixes: \"[keyword] a\", \"[keyword] b\", ... \"[keyword', 'name: amazon-keyword-research', 'name: amazon-keyword-research', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 43, '4.8K', 11),('Amazon Repricing Strategy 🔄', 'Amazon Repricing Strategy 🔄', 'ecommerce', '["Amazon", "跨境电商", "AI技能"]', '["Amazon", "跨境电商", "AI技能"]', '---
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
I\'m losing the Buy Box on 30% of my listings. I have 200 SKUs in electronics, price range $15-$80. Help me build a repricing strategy that wins Buy Box without destroying margins.
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

**Step 1:** Collect seller details — number of SKUs, categories, current Buy Box win rate, fulfillment method, average margin, pricing range, current repricing approach.

**Step 2:** Ask one follow-up with all remaining questions using multiple-choice format. Allow shorthand answers (e.g., \"1b 2c 3a\").

**Step 3:** Analyze the competitive landscape and design repricing rules tailored to the seller\'s goals and product mix.

**Step 4:** Deliver a complete repricing strategy with specific rules, tool recommendations, and implementation steps.

## Output Format

- Current state diagnosis: Buy Box win rate issues, margin analysis, competitive position
- Repricing rules: specific logic for each product segment (floor, ceiling, match/beat rules)
- Tool recommendation with setup instructions
- Implementation timeline: phased rollout to minimize risk
- KPIs to track: Buy Box %, margin %, velocity, revenue impact
- Mark estimates with ⚠️ when based on incomplete data
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific s', 'name: amazon-repricing-strategy', 'name: amazon-repricing-strategy', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 65, '4.8K', 8),('Amazon Seasonal Planning', 'Amazon Seasonal Planning', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "季节性"]', '["Amazon", "跨境电商", "AI技能", "季节性"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-seasonal-planning', 'name: amazon-seasonal-planning', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 66, '9.6K', 9),('Amazon Seller Analytics 📊', 'Amazon Seller Analytics 📊', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "数据分析"]', '["Amazon", "跨境电商", "AI技能", "数据分析"]', '---
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
Analyze this Amazon seller\'s strategy: they sell kitchen gadgets and have about 50 products. Help me understand their approach.
```

## Capabilities

- Seller storefront analysis (product count, categories, pricing strategy)
- Revenue estimation from BSR and category benchmarks
- Product portfolio assessment (hero products, long-tail, new launches)
- Review velocity and quality scoring
- Growth trajectory estimation
- Competitive positioning analysis

## How This Skill Works

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-seller-analytics', 'name: amazon-seller-analytics', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 42, '9.7K', 10),('Amazon Storefront Design', 'Amazon Storefront Design', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "品牌旗舰店"]', '["Amazon", "跨境电商", "AI技能", "品牌旗舰店"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-storefront-design', 'name: amazon-storefront-design', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 46, '3.5K', 14),('Amazon Return Reduction', 'Amazon Return Reduction', 'ecommerce', '["Amazon", "跨境电商", "AI技能"]', '["Amazon", "跨境电商", "AI技能"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-return-reduction', 'name: amazon-return-reduction', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 41, '8.0K', 9),('Amazon Review Strategy', 'Amazon Review Strategy', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "评论管理"]', '["Amazon", "跨境电商", "AI技能", "评论管理"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-review-strategy', 'name: amazon-review-strategy', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 79, '8.5K', 17),('Amazon Vine Program', 'Amazon Vine Program', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "Vine计划"]', '["Amazon", "跨境电商", "AI技能", "Vine计划"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-vine-program', 'name: amazon-vine-program', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 67, '4.7K', 10),('Amazon Variation Strategy', 'Amazon Variation Strategy', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "变体"]', '["Amazon", "跨境电商", "AI技能", "变体"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-variation-strategy', 'name: amazon-variation-strategy', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 38, '9.1K', 16),('Tariff Calculator — Amazon 💰', 'Tariff Calculator — Amazon 💰', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "关税"]', '["Amazon", "跨境电商", "AI技能", "关税"]', '---
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
| 42xx | Bags, accessories | 7.5% |

## Landed Cost Formula

```
Landed Cost = 
    FOB Value
  + International Freight
  + Insurance
  + Import Duty
  + VAT/GST (if applicable)
  + Customs Clearance
  + Port Fees
  + Inland Freight
```

## Usage

### Basic Calculation

```bash
python3 scripts/calculator.py
```

### With Parameters

```bash
python3 scripts/calculator.py \'{
  \"hs_code\": \"8518300000\",
  \"origin_country\": \"CN\",
  \"destination_country\": \"US\",
  \"fob_value\": 5000.00,
  \"quantity\": 500,
  \"freight_cost\": 200.00
}\'
```

### HS Code Lookup

```bash
python3 scripts/hs_lookup.py \"wireless earbuds\"
python3 scripts/hs_lookup.py \"bluetooth speaker\"
```

### Custom Trade Route

```bash
python3 scripts/calculator.py \'{
  \"hs_code\": \"9503009000\",
  \"origin_country\": \"VN\",
  \"destination_country\": \"DE\",
  \"fob_value\": 10000.00,
  \"quantity\": 1000,
  \"freight_cost\": 500.00,
  \"custom_duty_rate\": 0.047,
  \"custom_vat_rate\": 0.19
}\'
```

## Output Example

```
💰 Tari', 'name: tariff-calculator-amazon', 'name: tariff-calculator-amazon', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 46, '7.8K', 14),('Amazon Review Analyzer 💬', 'Amazon Review Analyzer 💬', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "评论管理"]', '["Amazon", "跨境电商", "AI技能", "评论管理"]', '---
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
Analyze the reviews for my competitor\'s yoga mat (has 2,500 reviews, 4.2 stars). What are customers complaining about that I can fix in my product?
```

## Capabilities

- Sentiment analysis across star ratings (positive/negative/neutral themes)
- Recurring complaint identification and severity ranking
- Feature request extraction from customer language
- Competitor review comparison (what customers like about alternatives)
- UGC (user-generated content) mining for marketing copy
- Review-based product improvement priority matrix

## How This Skill Works

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-review-analyzer', 'name: amazon-review-analyzer', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 46, '9.4K', 4),('Amazon Profit Analyzer 💰', 'Amazon Profit Analyzer 💰', 'ecommerce', '["Amazon", "跨境电商", "AI技能"]', '["Amazon", "跨境电商", "AI技能"]', '---
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

**Step 3:** Build a complete profit waterfall breaking down every cost line. Calculate true net margin after ALL fees (not just the obvious ones).

**Step 4:** Deliver structured output with specific dollar amounts, margin percentages, and prioritized optimization recommendations.

## Output Format

- Profit waterfall table: each cost as $ amount and % of revenue
- True net margin (not gross margin — include everything)
- Break-even analysis: minimum price, maximum ACoS, maximum return rate
- Top 3 optimization opportunities ranked by $ impact
- Mark estimates with ⚠️ when based on incomplete data (e.g., assumed FBA fees without exact dimensions)
- End with concrete next steps

## Other Skills

More e-commerce skills: [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

Amazon-specific skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills)

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter ', 'name: amazon-profit-analyzer', 'name: amazon-profit-analyzer', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 62, '9.0K', 15),('Api Monitoring', 'Api Monitoring', 'ecommerce', '["通用电商", "跨境电商", "AI技能"]', '["通用电商", "跨境电商", "AI技能"]', '---
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

> \"I run a [your business type] on [platform]. Help me set up api monitoring for my business. Here\'s my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform\'s current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*', 'nexscope:', 'nexscope:', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 64, '9.5K', 17),('Amazon Buy Box Strategy 🏅', 'Amazon Buy Box Strategy 🏅', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "购物车"]', '["Amazon", "跨境电商", "AI技能", "购物车"]', '---
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
I\'m losing the Buy Box on my top product to 3 other sellers. I use FBA, my price is $24.99, competitors are at $23.99-$25.49. How do I win it back?
```

## Capabilities

- Buy Box eligibility factor analysis
- Competitive pricing strategy for Buy Box capture
- FBA vs FBM impact on Buy Box share
- Account health metrics optimization
- Repricing strategy recommendations (manual vs automated)
- Buy Box share tracking and improvement plan

## How This Skill Works

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-buy-box', 'name: amazon-buy-box', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 32, '5.8K', 5),('Amazon Listing Images 📸', 'Amazon Listing Images 📸', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "Listing优化", "图片"]', '["Amazon", "跨境电商", "AI技能", "Listing优化", "图片"]', '---
name: amazon-listing-images
description: \"Plan Amazon product listing images for maximum conversion. Create shot lists, infographic layouts, lifestyle scene briefs, and A/B testing plans following Amazon\'s image requirements and best practices.\"
metadata:
  nexscope:
    emoji: \"📸\"
    category: amazon
---

# Amazon Listing Images 📸

Plan Amazon product listing images for maximum conversion. Create shot lists, infographic layouts, lifestyle scene briefs, and A/B testing plans following Amazon\'s image requirements and best practices.

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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-listing-images', 'name: amazon-listing-images', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 36, '7.2K', 14),('Amazon A+ Content 🎨', 'Amazon A+ Content 🎨', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "内容营销", "A+页面"]', '["Amazon", "跨境电商", "AI技能", "内容营销", "A+页面"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-a-plus-content', 'name: amazon-a-plus-content', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 59, '4.5K', 17),('Amazon Advertising Strategy 📣', 'Amazon Advertising Strategy 📣', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "广告投放"]', '["Amazon", "跨境电商", "AI技能", "广告投放"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-advertising-strategy', 'name: amazon-advertising-strategy', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 70, '7.7K', 13),('Amazon Listing Optimization 📝', 'Amazon Listing Optimization 📝', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "Listing优化"]', '["Amazon", "跨境电商", "AI技能", "Listing优化"]', '---
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
| **Both** | User provides keywords + competitor ASINs → skill merges both sources for maximum coverage |

## Capabilities

- **Keyword-driven listing generation**: Import keywords (from amazon-keyword-research, manual list, or extracted from competitor ASINs), rank by priority, generate copy that maximizes keyword coverage
- **Competitor keyword extraction**: Fetch competitor listings and automatically extract their title/bullet keywords as your baseline
- **8-dimension audit & scoring**: Title, bullets, description, images, A+ content, pricing, reviews, SEO coverage
- **Keyword coverage tracking**: Visual map showing which keywords appear in title / bullets / description / missing
- **Tone selection**: Professional, Friendly, Urgent, Luxury — affects AI copywriting style
- **Competitive benchmarking**: Compare your listing against competitors
- **Multi-marketplace**: US, UK, DE, FR, IT, ES, JP, CA, AU, IN, MX, BR

## Usage Examples

### Mode A — Create from Keywords

```
Create a listing for a portable blender. Keywords: portable blender, smoothie maker, USB rechargeabl', 'name: amazon-listing-optimization', 'name: amazon-listing-optimization', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 66, '3.4K', 4),('eBay Product Research', 'eBay Product Research', 'ecommerce', '["eBay", "跨境电商", "AI技能", "选品"]', '["eBay", "跨境电商", "AI技能", "选品"]', '# eBay Product Research

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

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*', 'Research profitable products to sell on eBay. Analyze completed listings, sell-through rates, average selling prices, competition density, and seasonal demand patterns.', 'Research profitable products to sell on eBay. Analyze completed listings, sell-through rates, average selling prices, competition density, and seasonal demand patterns.', 'eBay平台跨境电商运营AI技能', 'eBay cross-border e-commerce AI skill', 'eBay运营复杂需要系统化AI工具提效', 'eBay operations complex needing systematic AI tools', 'eBay · nexscope-ai', 61, '10.2K', 14),('Dropshipping Product Research 📦', 'Dropshipping Product Research 📦', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "选品", "物流", "Dropshipping"]', '["通用电商", "跨境电商", "AI技能", "选品", "物流", "Dropshipping"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: dropshipping-product-research', 'name: dropshipping-product-research', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 39, '6.4K', 7),('eBay Seller Guide', 'eBay Seller Guide', 'ecommerce', '["eBay", "跨境电商", "AI技能", "卖家指南"]', '["eBay", "跨境电商", "AI技能", "卖家指南"]', '# eBay Seller Guide

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

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*', 'Complete guide for selling on eBay — auction and fixed-price strategies, listing optimization, eBay SEO, shipping setup, seller ratings, and scaling from casual seller to Top Rated Seller.', 'Complete guide for selling on eBay — auction and fixed-price strategies, listing optimization, eBay SEO, shipping setup, seller ratings, and scaling from casual seller to Top Rated Seller.', 'eBay平台跨境电商运营AI技能', 'eBay cross-border e-commerce AI skill', 'eBay运营复杂需要系统化AI工具提效', 'eBay operations complex needing systematic AI tools', 'eBay · nexscope-ai', 33, '10.4K', 16),('eBay Seller Tools', 'eBay Seller Tools', 'ecommerce', '["eBay", "跨境电商", "AI技能"]', '["eBay", "跨境电商", "AI技能"]', '# eBay Seller Tools

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

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*', 'Essential tools and software for eBay sellers. Listing tools, repricing, analytics, inventory management, shipping, and research tools to scale your eBay business.', 'Essential tools and software for eBay sellers. Listing tools, repricing, analytics, inventory management, shipping, and research tools to scale your eBay business.', 'eBay平台跨境电商运营AI技能', 'eBay cross-border e-commerce AI skill', 'eBay运营复杂需要系统化AI工具提效', 'eBay operations complex needing systematic AI tools', 'eBay · nexscope-ai', 57, '6.7K', 10),('Customer Feedback Analysis', 'Customer Feedback Analysis', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "客服"]', '["通用电商", "跨境电商", "AI技能", "客服"]', '---
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

> \"I run a [your business type] on [platform]. Help me set up customer feedback analysis for my business. Here\'s my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform\'s current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*', 'nexscope:', 'nexscope:', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 53, '10.0K', 6),('E-Commerce Branding 🎨', 'E-Commerce Branding 🎨', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "品牌"]', '["通用电商", "跨境电商", "AI技能", "品牌"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: ecommerce-branding', 'name: ecommerce-branding', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 70, '9.6K', 3),('E-Commerce Business Plan 📑', 'E-Commerce Business Plan 📑', 'ecommerce', '["通用电商", "跨境电商", "AI技能"]', '["通用电商", "跨境电商", "AI技能"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: ecommerce-business-plan', 'name: ecommerce-business-plan', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 59, '10.3K', 12),('E-Commerce A/B Testing', 'E-Commerce A/B Testing', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "AB测试"]', '["通用电商", "跨境电商", "AI技能", "AB测试"]', '# E-Commerce A/B Testing

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

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*', 'Master A/B testing for e-commerce across all platforms. Test product pages, pricing, ads, emails, and checkout flows with statistical rigor to maximize conversion and revenue.', 'Master A/B testing for e-commerce across all platforms. Test product pages, pricing, ads, emails, and checkout flows with statistical rigor to maximize conversion and revenue.', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 33, '8.6K', 6),('Cross-Border E-Commerce ✈️', 'Cross-Border E-Commerce ✈️', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "跨境"]', '["通用电商", "跨境电商", "AI技能", "跨境"]', '---
name: cross-border-ecommerce
description: \"Cross-border e-commerce expansion advisor. Scores target markets on 8 weighted dimensions (market size, ecommerce penetration, competition, regulatory complexity, logistics infrastructure, payment ecosystem, cultural distance, IP protection), compares 5 fulfillment models with cost and transit data, provides country-by-country tax/duty compliance guides (EU VAT/IOSS, UK VAT, US sales tax, CA GST, AU GST, JP consumption tax), maps local payment preferences by market, and builds a phased expansion roadmap. No API key required.\"
metadata:
  nexscope:
    emoji: \"✈️\"
    category: ecommerce
---

# Cross-Border E-Commerce ✈️

Your strategic advisor for international e-commerce expansion. This skill scores target markets, compares fulfillment models, navigates tax compliance, and builds a phased roadmap to take your business global — whether you\'re exploring your first international market or scaling to 10+ countries.

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

> *\"I sell pet products on Shopify in the US doing $30K/month. I want to expand to Canada and UK. What\'s the best approach for logistics, payments, and taxes?\"*

> *\"We\'re an Amazon US seller doing $80K/month in kitchen gadgets. Which 3 countries should we expand to next? Score them by market size, ease of entry, and competition.\"*

> *\"I\'m shipping consumer electronics from China to EU customers. Walk me through VAT, IOSS registration, customs duties, and the cheapest fulfillment setup.\"*

> *\"My Etsy jewelry shop gets orders from Germany, Australia, and Japan but I\'m losing money on shipping and returns. Help me fix my cross-border operations.\"*

## Capabilities

- Target market scoring on 8 weighted dimensions with composite ranking
- Fulfillment model comparison (direct ship, 3PL, FBA/FBT/WFS, dropship, consolidation) with cost and transit data
- Country-by-country tax and duty compliance guides (EU, UK, US, CA, AU, JP, and more)
- Local payment method mapping by market with adoption rates
- Currency display and FX risk management strategy
- Localization checklist (language, currency, units, SEO, cultural adaptation)
- Landed cost calculator framework with margin impact analysis
- Legal and IP protection requirements by market (trademarks, certifications, data privacy)
- Expansion readiness a', 'name: cross-border-ecommerce', 'name: cross-border-ecommerce', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 55, '8.2K', 8),('eBay SEO', 'eBay SEO', 'ecommerce', '["eBay", "跨境电商", "AI技能", "SEO"]', '["eBay", "跨境电商", "AI技能", "SEO"]', '# eBay SEO

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

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*', 'Optimize eBay listings for Cassini search algorithm. Master item specifics, title optimization, category selection, and seller performance factors that drive search visibility.', 'Optimize eBay listings for Cassini search algorithm. Master item specifics, title optimization, category selection, and seller performance factors that drive search visibility.', 'eBay平台跨境电商运营AI技能', 'eBay cross-border e-commerce AI skill', 'eBay运营复杂需要系统化AI工具提效', 'eBay operations complex needing systematic AI tools', 'eBay · nexscope-ai', 56, '3.8K', 14),('Competitive Pricing Strategy', 'Competitive Pricing Strategy', 'ecommerce', '["通用电商", "跨境电商", "AI技能"]', '["通用电商", "跨境电商", "AI技能"]', '# Competitive Pricing Strategy

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

*Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce tools for sellers worldwide.*', 'Develop data-driven pricing strategies for e-commerce. Competitive analysis, price positioning, psychological pricing, margin optimization, and dynamic repricing across marketplaces.', 'Develop data-driven pricing strategies for e-commerce. Competitive analysis, price positioning, psychological pricing, margin optimization, and dynamic repricing across marketplaces.', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 48, '5.6K', 6),('E-Commerce Competitor Analysis 🔬', 'E-Commerce Competitor Analysis 🔬', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "竞品分析"]', '["通用电商", "跨境电商", "AI技能", "竞品分析"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: ecommerce-competitor-analysis', 'name: ecommerce-competitor-analysis', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 79, '4.3K', 12),('Amazon Rank Tracker 📍', 'Amazon Rank Tracker 📍', 'ecommerce', '["Amazon", "跨境电商", "AI技能", "排名"]', '["Amazon", "跨境电商", "AI技能", "排名"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: amazon-rank-tracker', 'name: amazon-rank-tracker', 'Amazon平台跨境电商运营AI技能', 'Amazon cross-border e-commerce AI skill', 'Amazon运营复杂需要系统化AI工具提效', 'Amazon operations complex needing systematic AI tools', 'Amazon · nexscope-ai', 42, '3.0K', 15),('Ecommerce Feed Management', 'Ecommerce Feed Management', 'ecommerce', '["通用电商", "跨境电商", "AI技能"]', '["通用电商", "跨境电商", "AI技能"]', '---
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

> \"I run a [your business type] on [platform]. Help me set up e-commerce feed management for my business. Here\'s my current situation: [describe context].\"

## Limitations

- Requires your specific business data for accurate recommendations
- Market benchmarks are based on US/EU data — adjust for other regions
- Recommendations should be validated against your platform\'s current policies
- Does not replace dedicated monitoring SaaS tools — designs the strategy and framework

---

*Built by [Nexscope AI](https://www.nexscope.ai/?co-from=skill) — AI-powered e-commerce intelligence.*', 'nexscope:', 'nexscope:', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 79, '10.7K', 7),('E-Commerce Content Marketing Planner 📣', 'E-Commerce Content Marketing Planner 📣', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "营销", "内容营销"]', '["通用电商", "跨境电商", "AI技能", "营销", "内容营销"]', '---
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
| **Amazon A+** | Brand story, enhanced product descriptions, comparison charts |

## Usage Examples

### Mode A — Build Strategy
```
Build a content marketing strategy for my portable blender brand.
Target market: US. Platforms: TikTok, Instagram, Blog.
Content goal: Brand awareness + product education.
Target audience: Health-conscious millennials, gym-goers.
Content period: 4 weeks.
```

```
Create a content calendar for my handmade candle shop on Etsy.
Platforms: Pinterest, Instagram, TikTok.
Competitor: https://www.instagram.com/brooklyncandlestudio/
Goal: Drive traffic to my Etsy store.
```

### Mode B — Audit
```
Audit my content strategy. Here\'s my TikTok: @mybrandhandle
Compare against competitors: @competitor1, @competitor2
Find gaps and opportunities.
```

---

## First Interaction

When user first asks about content marketing, mentions this skill, or gives a vague content-related request, greet them with:

```
✅ Content Marketing Planner ready!

I can help you with two modes:

**A — Build**: Create a full content strategy from scratch', 'name: ecommerce-content-marketing', 'name: ecommerce-content-marketing', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 74, '5.5K', 17),('E-Commerce Growth Strategy 🚀', 'E-Commerce Growth Strategy 🚀', 'ecommerce', '["通用电商", "跨境电商", "AI技能"]', '["通用电商", "跨境电商", "AI技能"]', '---
name: ecommerce-growth-strategy
description: \"E-commerce growth strategy advisor. Diagnoses current business health using unit economics (CAC, LTV, AOV, contribution margin), identifies the highest-impact growth opportunities across 5 levers (traffic, conversion, AOV, retention, expansion), and builds a prioritized 90-day growth roadmap. Uses the Ansoff Matrix adapted for e-commerce to evaluate market penetration, channel expansion, product expansion, and new market entry. Includes multichannel readiness assessment (Amazon, Walmart, TikTok Shop, Etsy, DTC/Shopify/Shopify) and product line expansion analysis. No API key required. Use when: (1) planning next phase of e-commerce growth, (2) deciding whether to expand to new channels or products, (3) diagnosing why growth has stalled, (4) prioritizing what to fix or build next.\"
metadata:
  nexscope:
    emoji: \"🚀\"
    category: ecommerce
---

# E-Commerce Growth Strategy 🚀

Your strategic growth advisor for e-commerce. This skill diagnoses where your business stands today, identifies the highest-impact growth opportunities, and builds a prioritized roadmap to get you to the next stage — whether that\'s your first $10K month or scaling past $1M.

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
I sell pet clothes on Shopify, doing about $8K/month. Margin is 65%. I want to hit 
$20K/month in 6 months. What should I focus on?
```

```
We\'re an Amazon seller doing $50K/month in kitchen gadgets. Should we expand to 
Walmart or TikTok Shop? Or launch new products first?
```

```
My Etsy jewelry shop makes $3K/month but growth has stalled. I have 2,000 email 
subscribers and 5K Instagram followers. What\'s my best path to $10K/month?
```

## Capabilities

- Business health diagnosis using unit economics (CAC, LTV, LTV:CAC ratio, contribution margin, payback period, AOV)
- Growth opportunity identification across 5 levers: traffic, conversion, AOV, retention, expansion
- Ansoff Matrix adapted for e-commerce — evaluates 4 growth paths: penetrate, expand channels, expand products, enter new markets
- Growth Opportunity Matrix — maps each opportunity by impact vs effort for prioritization
- Multichannel readiness assessment — when and where to expand (Amazon, Walmart, TikTok Shop, Etsy, DTC/Shop', 'name: ecommerce-growth-strategy', 'name: ecommerce-growth-strategy', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 32, '9.7K', 10),('E-Commerce Keyword Research 🔍', 'E-Commerce Keyword Research 🔍', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "关键词"]', '["通用电商", "跨境电商", "AI技能", "关键词"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: ecommerce-keyword-research', 'name: ecommerce-keyword-research', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 47, '8.0K', 15),('E-Commerce Marketing Strategy Builder 🎯', 'E-Commerce Marketing Strategy Builder 🎯', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "营销"]', '["通用电商", "跨境电商", "AI技能", "营销"]', '---
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
- **Paid ads brief**: High-level ad strategy per platform (for detailed campaign setup, use [ecommerce-ppc-strategy-planner](https://github.com/nexscope-ai/eCommerce-Skills/tree/main/ecommerce-ppc-strategy-planner))
- **Social media plan**: Platform selection, content pillars, posting frequency
- **Influencer & affiliate direction**: Who to partner with, what to offer, how to structure deals
- **Referral & loyalty program**: How to turn existing customers into growth engines
- **Pricing positioning**: Where to price relative to competitors based on market analysis
- **90-day action plan**: Week-by-week roadmap with priorities and milestones

## Usage Examples

```
I\'m launching a Shopify store selling premium dog treats, $24.99 per bag. Margin is 65%. 
Budget: $3,000/month for marketing. Target: US dog owners. Help me build a marketing strategy.
```

```
I sell handmade jewelry on Etsy and my own website. Price range $40-120. I have 2,000 
Instagram followers and 800 email subscribers. Monthly marketing budget is $1,500. 
I want to grow beyond Etsy. What\'s my strategy?
```

```
We\'re a new DTC skincare brand on Shopify. AOV $55, margin 70%. We have $10,000/month 
marketing budget an', 'name: ecommerce-marketing-strategy-builder', 'name: ecommerce-marketing-strategy-builder', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 30, '7.8K', 8),('E-Commerce Personalization 🎯', 'E-Commerce Personalization 🎯', 'ecommerce', '["通用电商", "跨境电商", "AI技能"]', '["通用电商", "跨境电商", "AI技能"]', '---
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

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: ecommerce-personalization', 'name: ecommerce-personalization', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 43, '10.5K', 11),('Competitor Price Analysis 💲', 'Competitor Price Analysis 💲', 'ecommerce', '["通用电商", "跨境电商", "AI技能", "定价", "竞品分析"]', '["通用电商", "跨境电商", "AI技能", "定价", "竞品分析"]', '---
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
Analyze the pricing landscape for wireless earbuds on Amazon. Price range $20-80. Who\'s winning at each price point and where are the gaps?
```

## Capabilities

- Price mapping across competitors (price bands, positioning)
- Price gap identification (underserved price points)
- Price elasticity signal analysis from review/sales patterns
- Promotional pricing pattern detection
- MAP/MSRP compliance monitoring framework
- Dynamic pricing strategy recommendations

## How This Skill Works

**Step 1:** Collect information from the user\'s message — product, platform, current situation, and goals.

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

Built by [Nexscope](https://www.nexscope.ai/?co-from=skill) — your AI assistant for smarter e-commerce decisions.', 'name: competitor-price-analysis', 'name: competitor-price-analysis', '通用电商平台跨境电商运营AI技能', '通用电商 cross-border e-commerce AI skill', '通用电商运营复杂需要系统化AI工具提效', '通用电商 operations complex needing systematic AI tools', '通用电商 · nexscope-ai', 79, '8.5K', 17);