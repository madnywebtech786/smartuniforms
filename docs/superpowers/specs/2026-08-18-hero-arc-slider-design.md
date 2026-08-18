# Hero Section — Semi-Circle Product Slider

Status: **Approved — ready for implementation planning.**

Source of truth for the broader redesign context: [client-business-info.md](../../../client-business-info.md), [site-architecture.md](../../site-architecture.md), [frontend-developer-guide.md](../../../frontend-developer-guide.md).

## 1. Background

The client has issued a new page structure for the homepage: Hero → About → Industries/Categories → Products → Why Choose Us → Testimonials → CTA → Footer. This spec covers **only the Hero section rebuild** — the first piece of that new structure.

The client's request, verbatim intent: a hero where the product image rotates through a set of category garments using a **semi-circle slider animation** — the image swings along a curved path as it changes — with the text content also changing with a "nice entry animation" in sync.

This replaces the current static-image `Hero.jsx` ([src/components/sections/hero/Hero.jsx](../../../src/components/sections/hero/Hero.jsx)).

## 2. Decisions (from brainstorming session)

| Question | Decision |
|---|---|
| Stage layout | **Option A — Side Arc.** Text fixed left (~48%), image/arc stage right (~52%), matching the current Hero's split-panel proportions. |
| Arc motion mechanic | **Option 3 — the product image itself swings along the curved path** (position + scale + slight rotation animated along an SVG-path-derived arc), not a simple fade or a multi-image orbit carousel. |
| Text/image sync | **Image leads, text follows.** The image swing starts first; once the incoming image is roughly mid-arc (~50% progress), the old text exits and new text staggers in. |
| Slide count/content | **5 slides**, one per category: Administration Wear, Polos & T-Shirts, Health Wear, Security, Industrial & Hospitality. |
| Autoplay | **Autoplay + manual controls.** Timer-driven auto-advance, pauses on hover/focus, dot indicators for direct jump. No prev/next arrows (dots + autoplay cover both needs; keeps controls minimal per the guide's "premium and alive, not everything is moving" principle). |
| Mobile behavior | **Simplified arc, smaller scale.** The arc stage is not hidden on mobile — it moves below the text as a shorter strip, keeping the signature interaction on all breakpoints (departs from the current Hero, which hides the image entirely below `lg`). |
| Imagery | **Unsplash placeholders**, one distinct image per category, following the existing `lib/images.js` pattern (clearly commented as pending real client assets). |
| Reduced motion | Autoplay stops; slide changes become instant swaps (no arc swing, no stagger) — consistent with how every existing section on the page already gates motion via `useReducedMotion()`. |

## 3. Component Structure

```
src/components/sections/hero/
  Hero.jsx              — orchestrates slide state (active index, autoplay timer, pause-on-hover); renders text panel + <HeroArcSlider>
  HeroArcSlider.jsx      — the arc/image mechanic in isolation: SVG guide-arc + the swinging product image + dot indicators

src/lib/
  products.js            — NEW. 5 category entries (slug, name, headline, description, image key), mirrors the existing industries.js/services.js pattern
  images.js               — EXTENDED. 5 new STOCK_IMAGES entries, one per category, each commented "pending client assets"
```

Rationale for splitting `HeroArcSlider` out of `Hero`: the arc's path math (position/scale/rotation interpolation) is a distinct, testable-in-isolation concern from the text stagger and timer orchestration. Keeps `Hero.jsx` readable as "here's the sequencing," while `HeroArcSlider.jsx` is "here's how one image moves along a curve."

`products.js` is deliberately reused later by the upcoming Products section (per the client's new page list) rather than being a hero-only data shape — same principle already used for `industries.js`/`services.js` being shared between the homepage teaser and future detail pages.

## 4. Arc Mechanic Detail

- An SVG semicircular path is anchored within the right-hand image panel (~180° sweep, bottom-to-top), sized responsively to the panel.
- A thin dashed guide-arc using `--color-primary` stays visible at low opacity behind the image — a deliberate echo of the site's existing "thread" motif ([ThreadLine.jsx](../../../src/components/animations/ThreadLine.jsx)), not a new decorative element invented from scratch.
- The active image sits at the top of the arc (full scale/opacity, resting position).
- On advance: the outgoing image animates along the arc's path from top toward the bottom, shrinking and fading as it goes; the incoming image animates from the bottom of the arc toward the top, growing/settling into the resting position. One continuous swing per image, not a cross-fade.
- Implementation approach: interpolate `x`/`y` from the same quadratic Bezier control-point math already used in `ThreadLine.jsx` (`M x1 y Q midX midY x2 y`-style), driving Motion `transform`/`opacity` values only — no animated `width`/`height`/`top`/`left`, per the guide's performance-first animation rule (§8).

## 5. Text Panel Detail

- Eyebrow label stays static across slides ("Calgary · Custom Uniforms & Embroidery").
- Per-slide: one large headline naming the category (e.g. "Administration Wear"), one short supporting line specific to that category, the `ThreadLine` accent.
- CTAs (Request a Quote / View Our Work) persist without re-animating on slide change — only content that actually changes should move, per the guide's "every animation should have a reason to exist" principle.
- Text re-entry reuses the existing `revealUp` variant + `EASE_CINEMATIC` from [lib/motion.js](../../../src/lib/motion.js) — same stagger grammar already used site-wide, not a new animation system.

## 6. Autoplay & Controls Detail

- Reuses the proven pattern already in [Services.jsx](../../../src/components/sections/services/Services.jsx): `setInterval` advancing the active index, effect re-armed on every manual change so a manual pick resets the timer rather than racing it, fully disabled under `useReducedMotion()`.
- Pause on hover/focus within the hero (new behavior relative to `Services`, appropriate here since the hero is the first thing a visitor sees and shouldn't race them).
- Dot indicators, one per slide, always visible (never hover-gated), positioned near the text panel; clicking jumps directly and resets the timer. `aria-pressed`/`aria-label` per dot for accessibility, matching the pattern already used for `Services`' roster buttons.

## 7. Mobile Behavior Detail

- Below `lg`, the arc stage renders under the text panel rather than being hidden, at a reduced scale (smaller arc radius, smaller image).
- Swing animation keeps the same mechanic, just smaller — no separate "simple fade" mobile-only code path, keeping one animation system rather than two to maintain.
- Text panel becomes the full-width column above it, matching the current Hero's mobile stacking otherwise.

## 8. Explicitly Out of Scope (for this spec)

- About, Industries/Categories icons-only section, Products section, Why Choose Us, Testimonials, CTA band, Footer — all listed by the client as upcoming work, not part of this Hero rebuild.
- Real client photography — placeholders only, per confirmed decision.
- Any change to `SiteHeader.jsx` or global layout.

## 9. Open Risk Noted

Option 3 (image swings along the path with rotation) is explicitly the most motion-craft-intensive of the three mechanics considered, and was flagged during brainstorming as the one most likely to feel janky if not tuned carefully. Implementation should validate the swing feels natural (correct easing, no jitter, no layout shift) before considering the section done — this is a "test in browser" item per the guide's UI verification requirement, not just a code-complete item.
