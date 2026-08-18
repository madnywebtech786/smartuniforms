# Products Marquee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current single-active-card "lookbook" Products section (which jiggles the section's height because its spec panel is content-sized) with a horizontally auto-scrolling marquee of fixed-size product cards, so the section's height is constant on every device regardless of which product copy is showing.

**Architecture:** `CATALOG_ITEMS` in `lib/catalog.js` gets each item's single `colour: string` replaced with a `colours: [{ name, hex }]` array (2–4 entries) to drive swatch dots. A new `ProductCard.jsx` renders one fixed-height card (photo, category eyebrow, name, meta line, swatches) — a single definition reused by the marquee. `Products.jsx` is rewritten: the section header (eyebrow/heading/ThreadLine) is unchanged, but the lookbook-card grid + arrows + thumbnail rail are replaced with a `motion.div` track rendering `CATALOG_ITEMS` twice back-to-back, translated on a continuous linear loop from `0%` to `-50%`, paused on hover/focus/touch, and reduced to a plain scrollable row under `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion (`motion/react`), Lucide React icons — no new dependencies.

**No test framework exists in this project** (confirmed: no jest/vitest/playwright in `package.json`). Verification for every task is done by running the dev server and checking the browser, per this project's `frontend-developer-guide.md` (§ "test the golden path... in a browser before reporting complete"). Steps below say exactly what to look at instead of an automated assertion.

---

### Task 1: Add `colours` arrays to catalog data

**Files:**
- Modify: `src/lib/catalog.js` (full rewrite — every item's `colour` field replaced)

- [ ] **Step 1: Replace the file contents**

```javascript
/**
 * Individual product-level items for the homepage Products marquee — one
 * level more specific than the PRODUCTS categories in lib/products.js
 * (e.g. "Health Wear" the category vs. "Scrub Set" a specific product
 * within it). Fields mirror the full product schema the client wants
 * (colours, gender, fabric type, size range, feature/description, garment
 * care) so a future /products/[slug] page can render the complete spec
 * from the same entries — the homepage marquee only surfaces a subset
 * (photo, name, size range, fabric, colour swatches — no description).
 *
 * `colours` holds a few realistic placeholder swatch options per item
 * (name + hex), standing in for the client's real available colourways —
 * flagged here as pending confirmation before publish, same as every
 * other placeholder value in this file.
 *
 * `imageKey` points at a single placeholder photo per item in
 * lib/images.js; a future /products/[slug] detail page would need up to
 * ~23 real photos per item, not modeled here yet. Specs are drafted,
 * realistic placeholder values — not the client's real catalog data.
 */
export const CATALOG_ITEMS = [
  {
    slug: "executive-polo",
    name: "Executive Polo",
    categorySlug: "administration",
    colours: [
      { name: "Charcoal", hex: "#36322c" },
      { name: "Navy", hex: "#1c2b45" },
      { name: "Ivory", hex: "#f5f2ea" },
      { name: "Black", hex: "#14130f" },
    ],
    gender: "Unisex",
    fabricType: "65% Cotton / 35% Polyester Piqué",
    sizeRange: "XS – 3XL",
    description:
      "Structured fit with a reinforced collar and moisture-wicking fabric — built for front-desk and administrative teams on their feet all day.",
    garmentCare: "Machine wash cold, tumble dry low, do not bleach.",
    imageKey: "productAdministration",
  },
  {
    slug: "branded-crew-tee",
    name: "Branded Crew Tee",
    categorySlug: "polos-tshirts",
    colours: [
      { name: "Heather Grey", hex: "#9c9890" },
      { name: "Black", hex: "#14130f" },
      { name: "Maroon", hex: "#7a1f1f" },
    ],
    gender: "Unisex",
    fabricType: "100% Ringspun Cotton",
    sizeRange: "XS – 4XL",
    description:
      "Soft-cotton crew tee built for daily wear and repeat washing, with a clean chest print or embroidery area.",
    garmentCare: "Machine wash cold, inside out, tumble dry low.",
    imageKey: "productPolosTshirts",
  },
  {
    slug: "scrub-set",
    name: "Scrub Set",
    categorySlug: "health-wear",
    colours: [
      { name: "Ceil Blue", hex: "#7a9bb0" },
      { name: "Surgical Green", hex: "#3d5a4a" },
      { name: "Plum", hex: "#5c3d66" },
      { name: "Black", hex: "#14130f" },
      { name: "Navy", hex: "#1c2b45" },
    ],
    gender: "Unisex",
    fabricType: "Poly-cotton Antimicrobial Blend",
    sizeRange: "XS – 3XL",
    description:
      "Two-piece scrub set with reinforced seams and deep pockets, built for long shifts and frequent hospital-grade washing.",
    garmentCare: "Machine wash hot, tumble dry medium, no fabric softener.",
    imageKey: "productHealthWear",
  },
  {
    slug: "security-jacket",
    name: "Security Jacket",
    categorySlug: "security",
    colours: [
      { name: "Black", hex: "#14130f" },
      { name: "Navy", hex: "#1c2b45" },
    ],
    gender: "Unisex",
    fabricType: "Waterproof Ripstop Shell",
    sizeRange: "S – 3XL",
    description:
      "Weatherproof shell jacket with reflective trim and a dedicated ID/badge panel for round-the-clock visibility.",
    garmentCare: "Machine wash cold, hang dry, do not iron reflective trim.",
    imageKey: "productSecurity",
  },
  {
    slug: "hi-vis-coverall",
    name: "Hi-Vis Coverall",
    categorySlug: "industrial",
    colours: [
      { name: "Safety Orange", hex: "#e0692e" },
      { name: "Safety Yellow", hex: "#e0c02e" },
    ],
    gender: "Unisex",
    fabricType: "Cotton-Poly Twill with Reflective Tape",
    sizeRange: "S – 4XL",
    description:
      "Reinforced coverall built for job-site wear, with high-visibility panels and durable stitching at every stress point.",
    garmentCare: "Machine wash warm, tumble dry low, inspect reflective tape before reuse.",
    imageKey: "productIndustrialHospitality",
  },
  {
    slug: "server-uniform-set",
    name: "Server Uniform Set",
    categorySlug: "hospitality",
    colours: [
      { name: "Black", hex: "#14130f" },
      { name: "White", hex: "#f5f2ea" },
      { name: "Charcoal", hex: "#36322c" },
    ],
    gender: "Unisex",
    fabricType: "Poly-cotton Twill, Stain-Resistant Finish",
    sizeRange: "XS – 3XL",
    description:
      "Classic front-of-house set — jacket, shirt, and apron — built to stay sharp through a full service shift.",
    garmentCare: "Machine wash cold, tumble dry low, iron on low heat.",
    imageKey: "productHospitality",
  },
];
```

- [ ] **Step 2: Verify the dev server compiles**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000` with no compile errors in the terminal. The homepage will render an error/blank in the Products section specifically at this point (still references the old `active.colour` shape) — that's expected and fixed in Task 3; only confirm there's no *syntax* error in this file itself (a valid JS object literal, matching export name `CATALOG_ITEMS`).

- [ ] **Step 3: Commit**

```bash
git add src/lib/catalog.js
git commit -m "feat: add colour swatch data to product catalog"
```

---

### Task 2: Build `ProductCard` — one fixed-size card

**Files:**
- Create: `src/components/sections/products/ProductCard.jsx`

This component renders exactly one card. It is deliberately presentational (no state, no animation of its own beyond hover/focus color transitions) — the marquee's motion is owned entirely by the parent track in Task 3.

- [ ] **Step 1: Write the component**

```jsx
import Link from "next/link";
import Image from "next/image";
import { STOCK_IMAGES } from "@/lib/images";
import { PRODUCTS } from "@/lib/products";

const MAX_VISIBLE_SWATCHES = 3;

/**
 * One fixed-size card in the Products marquee (see Products.jsx). Every
 * card shares identical geometry — fixed photo aspect ratio, a capped
 * single-line meta row, and a swatch row sized to its own content rather
 * than stretched — so card height never varies with product copy length.
 * This is what makes the marquee's row height, and therefore the whole
 * section's height, constant regardless of which products are showing.
 *
 * No description text is rendered here on purpose: it's the
 * variable-length field (105-138 characters across today's catalog) that
 * caused the old single-card layout's height to jiggle. It still lives on
 * each CATALOG_ITEMS entry for a future /products/[slug] detail page.
 */
export default function ProductCard({ product }) {
  const category = PRODUCTS.find((item) => item.slug === product.categorySlug);
  const image = STOCK_IMAGES[product.imageKey];
  const visibleColours = product.colours.slice(0, MAX_VISIBLE_SWATCHES);
  const hiddenCount = product.colours.length - visibleColours.length;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-primary sm:w-72"
    >
      <div className="relative aspect-4/5 w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 640px) 288px, 256px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 border-t border-border px-4 py-4 sm:px-5">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
          {category?.name ?? product.categorySlug}
        </p>

        <h3 className="font-display text-lg leading-tight text-foreground sm:text-xl">
          {product.name}
        </h3>

        <p className="truncate whitespace-nowrap border-t border-dashed border-border pt-2 font-sans text-xs text-muted-foreground">
          {product.sizeRange} · {product.fabricType}
        </p>

        <div className="flex w-fit items-center gap-1.5">
          {visibleColours.map((colour) => (
            <span
              key={colour.name}
              title={colour.name}
              className="h-4 w-4 rounded-full border border-foreground/15 ring-1 ring-surface"
              style={{ backgroundColor: colour.hex }}
            />
          ))}
          {hiddenCount > 0 && (
            <span className="ml-0.5 font-sans text-[11px] font-semibold text-muted-foreground">
              +{hiddenCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
```

Notes on choices made here:
- `w-64 sm:w-72 shrink-0` gives every card a literal fixed width (not a fraction of the container), matching the spec's "fixed rem/px value per breakpoint, not %" mechanic (§5).
- The meta line uses `truncate whitespace-nowrap` so an unusually long fabric name can never wrap and grow the card — it degrades to an ellipsis instead of changing height.
- Swatch row is `w-fit`, not `w-full`/`justify-between` — sits left-aligned, sized to however many dots it has, no dead space stretch (matches the brainstormed feedback on the mockup).
- Whole card is the `Link` (replacing the old design's separate "View Full Details" button) since there's no room for a second CTA on a compact card.

- [ ] **Step 2: No standalone verification**

This component isn't rendered anywhere until Task 3 wires it into `Products.jsx`. Skip standalone verification — Task 3's browser check covers it.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/products/ProductCard.jsx
git commit -m "feat: add ProductCard component for products marquee"
```

---

### Task 3: Rewrite `Products.jsx` as an auto-scrolling marquee

**Files:**
- Modify: `src/components/sections/products/Products.jsx` (full rewrite)

- [ ] **Step 1: Replace the entire file**

```jsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import ProductCard from "@/components/sections/products/ProductCard";
import { CATALOG_ITEMS } from "@/lib/catalog";

// Full loop duration for one full pass of the track (one copy's width).
// Slow and ambient — this is a background-motion showcase, not a
// discrete slide-and-hold carousel like Hero/Testimonials.
const LOOP_SECONDS = 34;

/**
 * Auto-scrolling card marquee — replaces the old single-active-card
 * "lookbook" layout, whose spec panel's height varied with each
 * product's copy length and jiggled the section's height on every
 * autoplay tick. Every ProductCard here has fixed geometry (see
 * ProductCard.jsx), so this section's height is constant regardless of
 * which products are visible or how long their names/specs are.
 *
 * The track renders CATALOG_ITEMS twice back-to-back and animates a
 * continuous linear x translation from 0% to -50% on an infinite loop —
 * the standard seamless-marquee technique, since the second copy picks
 * up visually exactly where the first one's translation "removes" it.
 */
export default function Products() {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimationControls();
  const isPaused = useRef(false);

  const startLoop = () => {
    if (prefersReducedMotion || isPaused.current) return;
    controls.start({
      x: "-50%",
      transition: { duration: LOOP_SECONDS, ease: "linear", repeat: Infinity },
    });
  };

  // Starts the loop on mount, same as every other autoplay section on
  // this page (Hero/Testimonials start their setInterval unconditionally
  // in a mount effect rather than gating on scroll-into-view) — this
  // section sits below the fold but not so far that a scroll-triggered
  // start is worth the added complexity.
  useEffect(() => {
    startLoop();
    return () => controls.stop();
  }, [prefersReducedMotion]);

  const pause = () => {
    isPaused.current = true;
    controls.stop();
  };

  const resume = () => {
    isPaused.current = false;
    startLoop();
  };

  return (
    <section className="overflow-hidden bg-background py-24 md:py-32">
      <Container>
        <div>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Products
          </motion.p>
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance font-display text-[clamp(2.75rem,4vw,3.5rem)] leading-[1.05] text-foreground"
          >
            Featured <Highlight>garments.</Highlight>
          </motion.h2>
          <div className="mt-4 w-28">
            <ThreadLine width={112} height={8} className="w-28" />
          </div>
        </div>
      </Container>

      {/* Full-bleed track — deliberately breaks out of Container's max-width
          so cards can peek at the viewport edge, reinforcing "more content
          this way" the way a true marquee should, rather than stopping
          abruptly at the same gutter as the text above it. */}
      <div
        className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {prefersReducedMotion ? (
          <div className="flex gap-4 overflow-x-auto px-6 pb-2 md:px-10 lg:px-16">
            {CATALOG_ITEMS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <motion.div
            className="flex w-max gap-4 pl-6 md:pl-10 lg:pl-16"
            animate={controls}
            initial={{ x: "0%" }}
          >
            {[...CATALOG_ITEMS, ...CATALOG_ITEMS].map((product, index) => (
              <ProductCard key={`${product.slug}-${index}`} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

Notes on choices made here, so a reviewer isn't left guessing:
- `useAnimationControls()` (confirmed exported from `motion/react` in this project's installed `motion@13.1.0`, re-exporting `framer-motion`'s `useAnimationControls`) gives an imperative handle to start/stop the loop from plain event handlers, rather than relying on `whileInView`/`animate` object props alone — needed because pause/resume are triggered by mouse/focus/touch handlers, not by a declarative state change. Its return type is named `LegacyAnimationControls` in this version's `.d.ts` and flagged `@deprecated` in a doc comment, but it is still the current, fully supported way to imperatively drive an `animate` prop — the editor may show a strikethrough/deprecation hint on the import; that's expected and not a sign anything is broken.
- Pause/resume mutate a `ref` (not `useState`) for the paused flag — this loop doesn't need a re-render to pause/resume, only to call `controls.stop()`/`controls.start()` imperatively; using a ref avoids an unnecessary render on every hover.
- `w-max` on the track lets it size to its true content width (two copies of the catalog) rather than being constrained to the viewport, which is required for the `0%` → `-50%` loop math to land exactly on the seam between the two copies.
- The `mask-image` gradient softens both edges of the track (fades to transparent) — a deliberate finish so cards don't hard-clip at the viewport edge, consistent with the "every visual element should feel designed" principle in the guide, and works identically in both themes since it's a luminance mask, not a color.
- Section root has `overflow-hidden` so the second (duplicate) copy of the track, which extends past the viewport, never causes horizontal page scroll.
- `EASE_CINEMATIC` is inlined as `[0.16, 1, 0.3, 1]` for the header reveals (matching the literal array already used identically in `lib/motion.js`) rather than imported, since this file no longer needs `EASE_CINEMATIC` for anything else — importing just for two header transitions when the value is this small and already stable is optional; if you prefer strict consistency with other sections, `import { EASE_CINEMATIC as EASE } from "@/lib/motion"` and use `EASE` in both spots is equally correct. Either is acceptable; the array values must match `lib/motion.js` exactly.

- [ ] **Step 2: Run the dev server and check the browser**

Run: `npm run dev`
Open: `http://localhost:3000`

Check for all of the following:
1. Scroll to the Products section — the card row is continuously scrolling right-to-left, showing roughly 3.5–4.5 cards at once on a standard desktop width, with a card visibly peeking (partially cut off) at the trailing edge.
2. No visible scrollbar under the card row.
3. The loop is seamless — watch through one full cycle (or speed-check by temporarily setting `LOOP_SECONDS = 8` locally, then reverting) and confirm there's no visible jump/stutter where the track resets from -50% back to 0%.
4. Hover the mouse over the card row — scrolling pauses; move the mouse away — it resumes smoothly (no snap-back, no re-acceleration jolt).
5. Tab to a card with the keyboard — scrolling pauses on focus; tab away — it resumes.
6. Resize the browser through mobile/tablet/desktop widths — confirm card count visibly adjusts (fewer cards fit on mobile) but **the section's overall height does not change** at any width as you resize or as the row scrolls (this is the core bug being fixed — watch the space above/below the section specifically).
7. On a touch device or devtools touch emulation, touch-and-drag the row — confirm it's a real scrollable track (manual swipe works) and that touching pauses the automatic motion.
8. In devtools, enable "prefers-reduced-motion: reduce" (Rendering tab) and reload — confirm the row renders as a single (non-duplicated) static strip with normal horizontal scroll/swipe and no JS-driven motion.
9. Click a card — confirm it's a real link (check the href in devtools or the status bar) pointing to `/products/<slug>` (the route itself doesn't exist yet — a 404 here is expected and fine, this step only verifies the link element and href are correct).
10. Confirm every card shows: photo, category label in gold, product name, a single-line size/fabric row, and 2-5 colour swatch dots (with a `+N` badge on items that have more than 3 colours — check "Scrub Set", which has 5).

If the loop stutters or jumps at the seam (the risk flagged in the design spec §7), note this in the task result before proceeding — this is a known risk, not a hypothetical.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/products/Products.jsx
git commit -m "feat: rebuild products section as auto-scrolling card marquee"
```

---

### Task 4: Final visual QA pass against the design spec

**Files:** none (verification-only task)

- [ ] **Step 1: Re-read the approved spec**

Open `docs/superpowers/specs/2026-08-18-products-marquee-design.md` and check the running dev server against every row of its §2 decisions table:

- [ ] Format is a continuous auto-scrolling marquee, not a single active card with arrows
- [ ] ~3.5–4.5 cards visible at once on desktop, fewer on mobile, no visible scrollbar
- [ ] Card content order: photo → eyebrow → name → meta line → swatches, no description
- [ ] Card height is visibly identical across every product regardless of name/fabric length
- [ ] Colour swatches show as dots, capped at 3 visible with a `+N` badge beyond that
- [ ] Swatch row is left-aligned/content-sized, not stretched full-width
- [ ] Motion is continuous/ambient, not discrete slide-and-hold
- [ ] Pauses on hover, focus, and touch; resumes on leave/blur/touch-end
- [ ] Auto-scrolls on all breakpoints including mobile, and manual swipe still works
- [ ] Reduced motion produces a static, manually-scrollable strip with no autoplay

- [ ] **Step 2: Check accessibility basics**

- [ ] Tab through the card row with keyboard only — each card is a reachable link with a visible focus state (verify the browser's default focus ring or an inherited one actually shows; if nothing is visible when a card is focused, that's a gap to fix, not to ignore)
- [ ] Confirm each card link's accessible name make sense when read alone (the product name text inside the link, e.g. "Executive Polo" — not just "link")
- [ ] Confirm the `<h2>` in this section's header is still the only heading change on the page — no new `<h1>` was introduced

- [ ] **Step 3: Confirm no regressions elsewhere on the homepage**

Scroll the full homepage top to bottom: Hero, About, Categories, Products, WhyChooseUs, Testimonials, CtaBand, Footer. Confirm nothing above or below the Products section shifted position or broke — the old `Products.jsx` export signature (`export default function Products()`, no props) is unchanged, so `src/app/page.js` needs no edit.

- [ ] **Step 4: Stop the dev server**

Run: Ctrl+C in the terminal running `npm run dev`

- [ ] **Step 5: Report status**

No commit for this task (verification-only). If every checklist item passes, the feature is complete. If anything fails, fix it as a follow-up task before considering this plan done — do not report success with known-failing items.

---

## Plan Self-Review Notes

- **Spec coverage:** Every row of the design spec's §2 decisions table maps to a task — catalog format/colours (Task 1), card content/sizing/swatch layout (Task 2), marquee mechanic/pause behavior/mobile/reduced-motion (Task 3), and every decision re-verified explicitly in Task 4's checklist. §7's flagged risk (seamless-loop jump/stutter) is called out as an explicit check in both Task 3 Step 2 and referenced again in Task 4.
- **Type/name consistency:** `CATALOG_ITEMS` entries now use `colours: [{ name, hex }]` (Task 1) — `ProductCard.jsx` (Task 2) reads `product.colours` with that exact shape (`.name`, `.hex`) and no other field name is invented. `ProductCard` is imported in `Products.jsx` (Task 3) via the exact path created in Task 2 (`@/components/sections/products/ProductCard`). `product.categorySlug` (unchanged from the original catalog.js) is used in `ProductCard.jsx` to cross-reference `PRODUCTS` from `lib/products.js`, matching that file's existing `slug` field.
- **No placeholders:** every step has literal, complete code — no "add appropriate styling," no TBDs. The `colours` values are explicit placeholder swatches (documented as such in Task 1's file-header comment, matching this file's pre-existing placeholder-disclosure pattern) rather than a vague "add some colors" instruction.
