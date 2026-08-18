# Smart Uniform and Embroidery — Site Architecture & Content Plan

Status: **Draft for content/design work — not yet build-ready.** Sections marked `[NEEDS CLIENT INPUT]` use placeholder content until real facts/assets are confirmed (see open questions in [client-business-info.md](../client-business-info.md)). Restructure this doc as real client data comes in; nothing here is final copy.

Source of truth for business facts: [client-business-info.md](../client-business-info.md).

---

## 1. Goals

The site must simultaneously:

1. **SEO** — rank for what people type into Google ("custom uniforms Calgary", "embroidery services Calgary", "medical scrubs supplier Alberta").
2. **AEO (Answer Engine Optimization)** — be the source an AI answer engine (Google AI Overviews, ChatGPT, Perplexity, Copilot) pulls a direct answer from when someone asks "who makes custom uniforms in Calgary" or "how does custom embroidery pricing work."
3. **GEO (Generative Engine Optimization)** — be structured, factual, and specific enough that generative engines choose to cite/quote this site over competitors when synthesizing answers.
4. **Convert real potential clients** — a business owner/manager evaluating a uniform supplier needs to quickly find: proof of quality, industries/experience relevance to them, how ordering works, and an easy way to ask for a quote.

The architecture pattern used throughout: **a hub page per content type, with focused dedicated child pages underneath, cross-linked contextually.** Each dedicated page targets one specific search/answer intent and carries its own schema markup — stronger for SEO, AEO, and GEO than combining everything onto a few large pages.

---

## 2. Full Sitemap

```
/                                    Home
/about                               About / Our Story
/industries                          Industries We Serve (hub)
  /industries/healthcare-medical
  /industries/hospitality-food-service
  /industries/retail-commercial
  /industries/industrial-trades
/services                            Services (hub)
  /services/custom-manufacturing
  /services/embroidery
  /services/sublimation
  /services/logo-branding
  /services/uniform-supply
/gallery                             Gallery / Portfolio (hub, filterable by industry/service)
/how-it-works                        Process (inquiry → design → sample → production → delivery)
/faq                                 FAQ hub (structured Q&A)
/blog                                Resources / Blog (hub)
  /blog/[slug]                       Individual articles
/contact                             Contact / Request a Quote
```

**Global (in every page's `<head>`, not a nav item):** `/sitemap.xml`, `/robots.txt`, `/llms.txt`.

### Primary navigation
Home · Industries · Services · Gallery · How It Works · Blog · About · Contact (+ "Request a Quote" as a persistent CTA button, not a nav link)

### Footer navigation
All industry pages, all service pages, FAQ, Blog, About, Contact, phone/email, address, social links `[NEEDS CLIENT INPUT — socials]`, business hours `[NEEDS CLIENT INPUT]`.

---

## 3. Page-by-Page Section Breakdown

For each page: purpose, sections in order, and what it needs to win at SEO/AEO/GEO.

### 3.1 Home (`/`)

**Purpose:** Answer "what is this business, who is it for, why trust them, what do I do next" within seconds.

Sections:
1. **Hero** — brand statement/tagline, primary CTA ("Request a Quote"), secondary CTA ("View Our Work" → Gallery)
2. **Trust bar** — years in business, number of industries served, Calgary-based/local badge `[NEEDS CLIENT INPUT — exact years]`
3. **Industries we serve** — visual grid teaser linking to the 4 industry hub pages
4. **Services overview** — teaser grid linking to the 5 service pages
5. **Why choose us** — quality, reliability, style, in-house embroidery/sublimation capability
6. **Featured work** — gallery teaser (3–6 images) linking to `/gallery` `[NEEDS CLIENT INPUT — real photos]`
7. **How it works preview** — condensed 4-step process teaser linking to `/how-it-works`
8. **Testimonials** — `[NEEDS CLIENT INPUT — none currently available; use a "trusted by Calgary businesses" placeholder pattern until supplied]`
9. **FAQ snippet** — 3–4 top questions with a link to full `/faq`
10. **Final CTA / contact band** — quote request form or link, phone, email

SEO/AEO/GEO: `LocalBusiness` schema (name, address, phone, hours, geo-coordinates), `Organization` schema, primary keyword target "custom uniforms Calgary."

### 3.2 About (`/about`)

**Purpose:** Establish credibility and a real human story — currently the weakest, most inconsistent content on the existing site.

Sections:
1. **Our story** — founding narrative `[NEEDS CLIENT INPUT — reconcile 1987 vs. 1997 vs. "25+ years" conflict]`
2. **Mission & values** — quality, reliability, style (existing positioning, can reuse)
3. **What makes us different** — in-house manufacturing + embroidery + sublimation under one roof
4. **Meet the team / founder** — `[NEEDS CLIENT INPUT — bio, photo]`
5. **Milestones/timeline** — optional, only if client confirms real dates `[NEEDS CLIENT INPUT]`
6. **CTA band** — link to Contact/Quote

SEO/AEO/GEO: `AboutPage` schema, targets "who is Smart Uniform and Embroidery" / brand-name queries, feeds AI answer engines a clean factual bio.

### 3.3 Industries hub (`/industries`)

**Purpose:** Let a visitor self-identify ("I run a dental clinic / restaurant / warehouse") and jump to the page written for them.

Sections:
1. **Intro** — one paragraph: industries served, tailored approach
2. **Industry grid** — 4 cards (Healthcare & Medical, Hospitality & Food Service, Retail & Commercial, Industrial & Trades), each linking to its dedicated page
3. **Cross-industry proof** — small gallery strip pulling images across all industries
4. **CTA band**

SEO/AEO/GEO: `CollectionPage`/`ItemList` schema linking the 4 child pages; targets "industries we serve" / "who do you make uniforms for."

### 3.4 Individual industry pages (`/industries/[industry]`)

Same structure for all four (Healthcare & Medical, Hospitality & Food Service, Retail & Commercial, Industrial & Trades), populated per-industry:

1. **Hero** — industry name, one-line value prop specific to that industry
2. **Sub-categories served** — e.g. under Healthcare & Medical: hospital, dental, physiotherapy, pharmacy, lab uniforms (from existing product list)
3. **Why this industry chooses us** — relevant fabric/comfort/hygiene/safety considerations per industry `[NEEDS CLIENT INPUT — industry-specific selling points]`
4. **Gallery strip** — photos of uniforms made for this industry `[NEEDS CLIENT INPUT — real photos]`
5. **Related services** — links to relevant service pages (e.g. Healthcare page links to Embroidery, Custom Manufacturing)
6. **Industry-specific FAQ** — 2–4 Q&As (e.g. "Do you make antimicrobial/easy-clean scrubs?") `[NEEDS CLIENT INPUT]`
7. **CTA band** — "Get a quote for [industry] uniforms"

SEO/AEO/GEO: `Service` + `FAQPage` schema per page; targets long-tail queries like "hospital uniform supplier Calgary," "restaurant uniforms Calgary."

### 3.5 Services hub (`/services`)

**Purpose:** Explain the "how" — what the company actually does/makes in-house.

Sections:
1. **Intro** — full-service capability statement (design → manufacture → embroider/sublimate → deliver)
2. **Service grid** — 5 cards (Custom Manufacturing, Embroidery, Sublimation, Logo & Branding, Uniform Supply), each linking to its dedicated page
3. **Capability proof** — equipment/process photos if available `[NEEDS CLIENT INPUT]`
4. **CTA band**

SEO/AEO/GEO: `ItemList` schema of services; targets "uniform manufacturing services Calgary."

### 3.6 Individual service pages (`/services/[service]`)

Same structure for all five (Custom Manufacturing, Embroidery, Sublimation, Logo & Branding, Uniform Supply):

1. **Hero** — service name, one-line definition (important for AEO — answer engines often quote a page's opening definition verbatim)
2. **What it is / how it works** — plain-language explanation of the technique (e.g. sublimation vs. embroidery — when each is used)
3. **What it's good for** — garment types, use cases, which industries typically use this service (cross-links to industry pages)
4. **Process for this service** — short version specific to this service (design proof → sample → production)
5. **Gallery strip** — examples of this service's work `[NEEDS CLIENT INPUT — real photos]`
6. **Service-specific FAQ** — e.g. "What's the difference between embroidery and sublimation?", "Is there a minimum order for embroidery?" `[NEEDS CLIENT INPUT — MOQ/turnaround facts]`
7. **CTA band** — "Get a quote for [service]"

SEO/AEO/GEO: `Service` + `FAQPage` schema; targets high-intent queries like "embroidery services Calgary," "garment sublimation Calgary," and definitional queries answer engines love ("what is garment sublimation").

### 3.7 Gallery (`/gallery`)

**Purpose:** Visual proof of quality — currently the single biggest content gap on the live site (empty).

Sections:
1. **Intro** — short framing line
2. **Filterable grid** — filter by industry and/or service; each image tagged
3. **Featured project spotlights** — optional, 2–3 larger case-study-style entries if client can supply a story per project `[NEEDS CLIENT INPUT — real photos + project context]`
4. **CTA band** — "Like what you see? Get a quote."

SEO/AEO/GEO: `ImageObject` schema with descriptive alt text/captions per image (industry + garment + technique) — this is what lets image search and AI engines understand and surface the work.

### 3.8 How It Works (`/how-it-works`)

**Purpose:** Remove the biggest first-time-buyer uncertainty: "what actually happens if I contact them?"

Sections:
1. **Hero** — "From idea to uniform" framing
2. **Step-by-step process** — Inquiry/Consultation → Design & Proof → Sample Approval → Production → Delivery (5 steps, each with what happens, who's involved, rough timeframe) `[NEEDS CLIENT INPUT — confirm real steps/timeframes]`
3. **What we need from you** — logo files, sizing, quantities — sets expectations
4. **Turnaround & MOQ note** — `[NEEDS CLIENT INPUT]`
5. **CTA band** — "Start your order"

SEO/AEO/GEO: `HowTo` schema — a strong AEO target since "how does custom uniform ordering work" is a natural AI-assistant question this page can directly answer.

### 3.9 FAQ (`/faq`)

**Purpose:** The single highest-leverage AEO/GEO page — structured, citable Q&A.

Sections:
1. **Intro**
2. **Grouped Q&A** by topic:
   - Ordering & process (MOQ, turnaround, how to start)
   - Pricing (how pricing works, even without exact numbers)
   - Products & customization (sizing, fabrics, logo formats accepted)
   - Services (embroidery vs. sublimation, in-house vs. outsourced)
   - Service area & delivery
   - Company (experience, location, industries)
   `[NEEDS CLIENT INPUT — most answers depend on facts not yet confirmed; draft with placeholder answers marked clearly]`
3. **Still have questions? CTA** — link to Contact

SEO/AEO/GEO: Full `FAQPage` schema — this page alone can generate multiple rich-result snippets and is the most likely page to be quoted verbatim by an AI answer engine.

### 3.10 Blog / Resources (`/blog`, `/blog/[slug]`)

**Purpose:** Ongoing AEO/GEO content engine — answer-shaped articles that AI engines and search both reward.

Hub sections:
1. **Intro**
2. **Article grid** — filterable by category (Buying Guides, Care & Maintenance, Industry Spotlights, Company News)

Starter topic list (draft, to refine with client later):
- "How to Choose the Right Uniforms for Your Medical Clinic"
- "Embroidery vs. Sublimation: Which Is Right for Your Team?"
- "How Many Uniforms Should You Order Per Employee?"
- "A Guide to Restaurant & Hospitality Uniform Standards"
- "How to Care for Embroidered and Sublimated Uniforms"
- "What to Prepare Before Requesting a Custom Uniform Quote"

Individual article template:
1. Title + intro answering the question in the first paragraph (AEO best practice: lead with the direct answer)
2. Body content with subheadings
3. Related services/industries cross-links
4. CTA band

SEO/AEO/GEO: `Article`/`BlogPosting` schema, targets long-tail informational queries, is the primary lever for being cited by generative engines over time.

### 3.11 Contact / Request a Quote (`/contact`)

**Purpose:** Convert. Also functions as the quote-request flow (no separate `/quote` page — avoids splitting intent).

Sections:
1. **Hero** — "Let's build your team's look" framing
2. **Quote request form** — name, email, phone, company, industry (dropdown), service(s) interested in, approximate quantity, message
3. **Direct contact info** — phone, email, address, map embed, business hours `[NEEDS CLIENT INPUT — hours]`
4. **What happens next** — brief 2–3 line expectation-setter, links to `/how-it-works`
5. **FAQ snippet** — 2–3 most contact-relevant questions

SEO/AEO/GEO: `ContactPage` + `LocalBusiness` schema (repeated/consistent NAP — Name, Address, Phone — is a core local-SEO signal).

---

## 4. Technical SEO / AEO / GEO Infrastructure

| Item | Purpose | Applies to |
|---|---|---|
| `sitemap.xml` | Standard XML sitemap, auto-generated from routes | Site-wide |
| `robots.txt` | Allow all crawlers incl. AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) unless client requests otherwise | Site-wide |
| `llms.txt` | Plain-language site summary for LLM/AI-agent consumption — business description, page list, key facts | Site root |
| Metadata (`<title>`, `meta description`) | Unique per page, keyword-relevant, written for humans first | Every page |
| Open Graph / Twitter cards | Social preview consistency | Every page |
| `LocalBusiness` schema | NAP consistency, hours, geo — core local SEO + AEO signal | Home, Contact, layout-level |
| `Organization` schema | Brand identity for knowledge-graph eligibility | Home |
| `Service` schema | Per-service structured data | Each service page |
| `FAQPage` schema | Direct answer eligibility in search + AI engines | FAQ page, industry pages, service pages (contextual blocks) |
| `HowTo` schema | Step-by-step structured data | How It Works page |
| `Article`/`BlogPosting` schema | Authorship, date, structured content | Blog posts |
| `ImageObject` schema + descriptive alt text | Image search + visual answer eligibility | Gallery |
| `BreadcrumbList` schema | Clear hierarchy signal | All non-home pages |
| Canonical URLs | Avoid duplicate-content issues | Every page |
| Core Web Vitals | Fast LCP/CLS/INP — ranking factor + user experience | Site-wide (Next.js Image, minimal client JS per `frontend-developer-guide.md`) |
| Semantic HTML + heading hierarchy | One clear direct-answer paragraph near the top of each page, single `<h1>`, logical `<h2>`/`<h3>` nesting | Every page |
| Internal linking | Every page links to at least 2–3 contextually related pages (industry↔service↔blog↔FAQ) | Site-wide |

**AEO-specific writing rule for every page:** open the main content with a single plain-language sentence that directly answers the page's core question (e.g. Embroidery page opens with "Embroidery is..."), *before* any marketing language. This is what gets lifted verbatim into AI answers.

---

## 5. Placeholder Strategy

Since real client data (photos, exact history, testimonials, MOQs, hours, socials) isn't confirmed yet:

- Every section needing unconfirmed facts is tagged `[NEEDS CLIENT INPUT — ...]` in this doc and should carry the same explicit marker in code/CMS comments during build, not silently invented copy.
- Use realistic, clearly-labeled placeholder text during design/build (not "Lorem ipsum") so layout and tone can be evaluated properly, but nothing here ships to production until the client confirms it.
- Gallery/testimonials sections should be built to gracefully support "coming soon" states if real assets aren't ready at launch, rather than blocking launch entirely.

---

## 6. Open Items Before Build

Carried over from [client-business-info.md](../client-business-info.md), plus new ones surfaced while planning this architecture:

- Reconcile founding year/experience claim (1987 / 1997 / "25+ years").
- Real photography: uniforms in use, workspace, embroidery/sublimation process, team.
- Testimonials or named client examples, with permission to publish.
- Service area (Calgary only / Alberta / Canada-wide).
- Business hours.
- MOQ, typical turnaround time, and whether any pricing tiers can be published.
- Quote form: confirm required fields with client (industry, quantity, service, timeline).
- Social media accounts to link, if any.
- Blog: confirm who will own ongoing article writing post-launch (agency vs. client).
