# Products Section — Auto-Scrolling Card Marquee

Status: **Approved — ready for implementation planning.**

Source of truth for the broader redesign context: [client-business-info.md](../../../client-business-info.md), [site-architecture.md](../../site-architecture.md), [frontend-developer-guide.md](../../../frontend-developer-guide.md).

## 1. Background

The current `Products.jsx` shows one catalog item at a time as a large "lookbook card" (big photo + spec-sheet panel), with prev/next arrows and a thumbnail rail. Problem: the spec panel's height is driven by per-product copy length (product name: 1–3 lines; description: 105–138 characters, 2–3 lines), and since the two-column row's height is otherwise content-sized, **the whole section's height changes on every autoplay tick and thumbnail click** — a visible layout jiggle affecting every breakpoint (grid row auto-sizing on desktop, block stacking on mobile).

Rather than patch the height (min-height + line-clamp), the client asked to replace the format entirely: a horizontally auto-scrolling row of fixed-size cards, several visible at once.

This spec covers **only the Products section rebuild** — no other homepage section changes.

## 2. Decisions (from brainstorming session)

| Question | Decision |
|---|---|
| Overall format | **Auto-scrolling card marquee**, not a single active card. Replaces the lookbook-card + arrows + thumbnail-rail pattern entirely. |
| Cards visible at once | **~3.5–4.5 cards** at a time (partial card peeking at the trailing edge signals more content) on desktop; fewer on narrower viewports, scaling down responsively. No visible scrollbar. |
| Card content | Photo (fixed aspect ratio) → category eyebrow → product name → compact meta line (size range · fabric) → color swatch dots. |
| Card sizing | **Fixed height regardless of content.** Every card uses identical geometry — this is what structurally eliminates the jiggle, not a min-height/clamp workaround. |
| Color display | **Small swatch dots** (circles) per product, up to 3 shown with a `+N` overflow badge if a product has more. Requires `CATALOG_ITEMS` to move from one `colour` string to a `colours` array of swatch entries per item. |
| Swatch row layout | Left-aligned, sized to its own content (not stretched to fill the card width) — no dead space, no wrapping to a new line. |
| Autoplay direction/style | Continuous slow marquee motion (not discrete slide-and-hold ticks like Hero/Testimonials) — reads as ambient movement, not a series of jumps. |
| Pause behavior | **Pauses on hover/focus**, resumes on mouse leave/blur — matches the existing Hero/Products(old)/Testimonials pattern already established site-wide. |
| Mobile behavior | **Auto-scroll on all breakpoints**, including mobile. It's a real horizontally-scrollable track underneath, so touch users can swipe to override/browse manually at any time; lifting a finger mid-scroll lets autoplay resume. |
| Reduced motion | Autoplay fully disabled; row becomes a static, manually-scrollable strip — consistent with how every other section on the page gates motion via `useReducedMotion()`. |
| Section header | Unchanged — eyebrow label, `<h2>` with `Highlight`, `ThreadLine` stay exactly as they are today. Only the showcase below the header changes. |

## 3. Component Structure

```
src/components/sections/products/
  Products.jsx          — REWRITTEN. Keeps existing header markup; replaces the lookbook-card
                           grid + arrows + thumbnail rail with the marquee track.
  ProductCard.jsx        — NEW. One fixed-size card: photo, eyebrow, name, meta line, swatches.
                           Pulled into its own component since the marquee needs to render it
                           twice in sequence (see §5) — a single definition, not duplicated JSX.

src/lib/
  catalog.js              — EXTENDED. Each CATALOG_ITEM's `colour: string` becomes
                             `colours: [{ name, hex }, ...]` (2-4 entries per item). All other
                             fields (name, fabricType, sizeRange, description, garmentCare,
                             imageKey) are unchanged and still used by the future
                             `/products/[slug]` detail page per catalog.js's existing doc comment.
```

`STOCK_IMAGES` in `lib/images.js` is unchanged — cards reuse the same per-category placeholder photography already there.

## 4. Card Detail

- Fixed `aspect-[4/5]` photo, `next/image` with `fill` + `object-cover`, same as the rest of the site's image handling.
- Caption block below the photo, fixed structure top-to-bottom:
  1. Eyebrow — category name (`categorySlug` resolved via existing `PRODUCTS` list), uppercase/tracked, `text-primary` (matches the site's existing eyebrow-as-accent usage in this section, distinct from the muted-foreground eyebrows used in other sections' headers).
  2. Product name, `font-display`.
  3. A single dashed-top-border meta line: size range · fabric type, truncated with `text-ellipsis` + `whitespace-nowrap` if it would overflow the fixed card width — never wraps, so it can't affect card height.
  4. Swatch row: one small circular swatch per `colours` entry (border for contrast against white/light swatches), up to 3 shown, a `+N` text badge appended if more exist. Row is `w-fit`, not stretched.
- No description text on the card (the 105–138-char variable-length field that caused the original jiggle is dropped from the card entirely — it still exists in `catalog.js` for the future detail page, just isn't rendered here).
- Whole card is a `Link` to `/products/[slug]` (matches the "View Full Details" affordance from the old design, now the entire card is the click target instead of a separate button).

## 5. Marquee Mechanic Detail

- Track renders `CATALOG_ITEMS` **twice in sequence** (via the new `ProductCard`), and animates a continuous `x` translation from `0%` to `-50%` on loop (`repeat: Infinity, ease: "linear"` via Motion's `animate()`), so the seam between the first and second copy is invisible — standard infinite-marquee technique, avoids any reset-jump.
- Outer wrapper is `overflow-hidden` (hides the scrollbar chrome and the off-screen duplicate) but the track itself remains a real flex row of cards — on touch devices, a manual swipe/drag on the track temporarily overrides the animation (pause on touch-start, same as hover-pause below), so mobile users are never fighting an animation while trying to browse.
- Card width set as a fixed `rem`/`px` value per breakpoint (not `%`) so "3.5–4.5 visible" is achieved by literal card sizing against the container width, matching the brainstormed mockup rather than a fluid fractional-width grid.
- Pause: `animate()`'s returned controls are paused on `onMouseEnter`/`onFocus`/`onTouchStart` and resumed on `onMouseLeave`/`onBlur`/`onTouchEnd`, mirroring the `isPaused` state pattern already used in the old `Products.jsx` and `Hero.jsx`.
- `useReducedMotion()` gate: when true, skip `animate()` entirely — track renders once (not duplicated) as a plain horizontally-scrollable flex row with native scroll/swipe, no JS-driven motion.
- Only `transform` is animated (the `x` translate) — no layout properties — per the guide's performance-first animation rule (§8).

## 6. Explicitly Out of Scope

- Any other homepage section (Hero, About, Categories, WhyChooseUs, Testimonials, CtaBand) — unchanged.
- The future `/products/[slug]` detail page itself — not being built now; this spec only ensures `catalog.js`'s shape still supports it later.
- Real client product photography, real confirmed color options, and real fabric/size data — placeholders throughout, per the project's standing placeholder strategy ([client-business-info.md](../../../client-business-info.md) §6, [site-architecture.md](../../site-architecture.md) §5). The `colours` arrays added to `catalog.js` are realistic placeholder values, clearly documented as such in the file's existing header comment.

## 7. Open Risk Noted

Infinite-marquee loops are prone to a visible "jump" at the seam if the duplicated content width and the translate distance don't match exactly, and to jitter if the animation restarts (rather than continues) on re-render. Implementation should verify in-browser that the loop is seamless and that pausing/resuming doesn't snap or stutter — a "test in browser" verification item per the guide's UI requirement, not just code-complete.
