# Hero Semi-Circle Product Slider Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current static-image Hero section with a 5-slide product slider where each garment image swings along a semi-circular arc on rotation, and the text content (headline/description) changes in sync, image-leads-text-follows.

**Architecture:** `Hero.jsx` owns slide state (active index, autoplay timer, pause-on-hover, reduced-motion gating) and renders the text panel directly; it delegates the arc/image mechanic to a new isolated `HeroArcSlider.jsx` component driven by the same `activeIndex`. Product content lives in a new `lib/products.js` (5 entries, mirrors the existing `industries.js`/`services.js` pattern) and 5 new entries in `lib/images.js`. The arc's curve math reuses the same quadratic-Bezier approach already established in `ThreadLine.jsx`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion (`motion/react`), Lucide React icons — no new dependencies.

**No test framework exists in this project** (confirmed: no jest/vitest/playwright in `package.json`). Verification for every task is done by running the dev server and checking the browser, per this project's own `frontend-developer-guide.md` (§ "test the golden path... in a browser before reporting complete"). Steps below say exactly what to look at instead of an automated assertion.

---

### Task 1: Add product category data

**Files:**
- Create: `src/lib/products.js`

- [ ] **Step 1: Write the data file**

```javascript
import { Briefcase, Shirt, HeartPulse, Shield, HardHat } from "lucide-react";

/**
 * The 5 product categories from the client's new hero/products requirement.
 * Shared between the Hero slider and the upcoming Products section so both
 * read from one list rather than duplicating category copy.
 */
export const PRODUCTS = [
  {
    slug: "administration",
    name: "Administration Wear",
    headline: "Administration Wear",
    description:
      "Sharp, professional attire for front-desk, office, and administrative teams who set the tone the moment a client walks in.",
    icon: Briefcase,
    imageKey: "productAdministration",
  },
  {
    slug: "polos-tshirts",
    name: "Polos & T-Shirts",
    headline: "Polos & T-Shirts",
    description:
      "Everyday branded polos and tees — comfortable, durable, and stitched with your logo for teams on the move.",
    icon: Shirt,
    imageKey: "productPolosTshirts",
  },
  {
    slug: "health-wear",
    name: "Health Wear",
    headline: "Health Wear",
    description:
      "Scrubs and clinical uniforms built for long shifts, frequent washing, and the clean, trustworthy look patients expect.",
    icon: HeartPulse,
    imageKey: "productHealthWear",
  },
  {
    slug: "security",
    name: "Security",
    headline: "Security",
    description:
      "Durable, authoritative security uniforms designed to hold up to long shifts while keeping your team clearly identifiable.",
    icon: Shield,
    imageKey: "productSecurity",
  },
  {
    slug: "industrial-hospitality",
    name: "Industrial & Hospitality",
    headline: "Industrial & Hospitality",
    description:
      "Rugged workwear and hospitality uniforms made to handle grease, wear, and fast-moving floors and job sites alike.",
    icon: HardHat,
    imageKey: "productIndustrialHospitality",
  },
];
```

- [ ] **Step 2: Verify no import errors**

Run: `npm run dev` (leave running for later tasks), then in another terminal:
Run: `node -e "require('esbuild')" 2>/dev/null; echo skip` (esbuild not needed — Next.js compiles on request)

Instead, just confirm the file has no syntax errors by importing it in the browser later (Task 3 will surface any issue immediately as a build error in the terminal running `next dev`). No standalone check needed for a plain data file.

- [ ] **Step 3: Commit**

```bash
git add src/lib/products.js
git commit -m "feat: add product category data for hero slider"
```

---

### Task 2: Add 5 product placeholder images

**Files:**
- Modify: `src/lib/images.js`

All 5 URLs below were verified to return real (non-404) JPEG responses from `images.unsplash.com` before being added here.

- [ ] **Step 1: Add the 5 new entries to `STOCK_IMAGES`**

Open `src/lib/images.js`. Insert the following 5 keys into the existing `STOCK_IMAGES` object, after the `industryPlaceholder` entry (before the closing `};` on line 28):

```javascript
  // One distinct placeholder per hero/product category — swap for real
  // client photography per garment as it becomes available.
  productAdministration: {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&fit=crop&auto=format",
    alt: "Person in a dark business suit and tie, hands clasped, in an office setting",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  productPolosTshirts: {
    src: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&q=80&fit=crop&auto=format",
    alt: "Plain polo shirt hanging on a wooden hanger against a dark wall",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  productHealthWear: {
    src: "https://images.unsplash.com/photo-1666887360921-85952a86894f?w=1200&q=80&fit=crop&auto=format",
    alt: "Close-up of a person in light blue medical scrubs with a stethoscope",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  productSecurity: {
    src: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=1200&q=80&fit=crop&auto=format",
    alt: "Security guard in a dark uniform standing watch in a building lobby",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  productIndustrialHospitality: {
    src: "https://images.unsplash.com/photo-1559073760-0ee41703dbf7?w=1200&q=80&fit=crop&auto=format",
    alt: "Worker in orange hi-vis coveralls and a hard hat on an industrial site",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
```

The full file's `STOCK_IMAGES` object should now contain 8 total keys: `hero`, `about`, `industryPlaceholder`, plus these 5.

- [ ] **Step 2: Verify the dev server compiles**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000` with no compile errors in the terminal (this file is imported by `Hero.jsx`/`About.jsx`, so a syntax error here would break the whole app).

- [ ] **Step 3: Commit**

```bash
git add src/lib/images.js
git commit -m "feat: add 5 product placeholder images for hero slider"
```

---

### Task 3: Build the arc path math as a small shared helper

**Files:**
- Create: `src/lib/arcPath.js`

The arc's swing needs the same point-on-a-curve math in two places (the visible dashed guide-arc SVG path, and the JS driving the image's x/y/scale/opacity as it travels). Centralizing it avoids duplicating the curve formula.

- [ ] **Step 1: Write the helper**

```javascript
/**
 * Point-on-a-semicircular-arc math shared by HeroArcSlider's guide path
 * (SVG `d` string) and the image's motion values (x/y at a given progress).
 * Mirrors the quadratic-Bezier approach already used by ThreadLine.jsx, so
 * the site's "thread" curve language stays consistent.
 *
 * The arc runs bottom-to-top along the right edge of its container:
 * progress 0 = bottom of the arc, progress 1 = top of the arc.
 */

// SVG path `d` string for the dashed guide-arc, drawn as a quadratic curve
// bulging left into the panel (bottom-right -> mid-left -> top-right).
export function arcGuidePath(width, height) {
  const bottom = { x: width - 1, y: height - 1 };
  const top = { x: width - 1, y: 1 };
  const control = { x: 1, y: height / 2 };
  return `M ${bottom.x} ${bottom.y} Q ${control.x} ${control.y} ${top.x} ${top.y}`;
}

// Point on that same quadratic curve at parameter t (0 = bottom, 1 = top).
export function pointOnArc(width, height, t) {
  const bottom = { x: width - 1, y: height - 1 };
  const top = { x: width - 1, y: 1 };
  const control = { x: 1, y: height / 2 };

  const oneMinusT = 1 - t;
  const x =
    oneMinusT * oneMinusT * bottom.x +
    2 * oneMinusT * t * control.x +
    t * t * top.x;
  const y =
    oneMinusT * oneMinusT * bottom.y +
    2 * oneMinusT * t * control.y +
    t * t * top.y;

  return { x, y };
}
```

- [ ] **Step 2: Sanity-check the math manually**

Run:
```bash
node -e "
const { pointOnArc } = require('./src/lib/arcPath.js');
" 2>&1 || echo "expected: ES module error, not a math error — file uses export syntax, that's fine for Next.js"
```

This file uses ESM `export` syntax (matching every other file in `src/lib/`), so it can't run directly under plain `node -e` without a loader — that's expected and fine, Next.js's bundler handles it. Instead, verify visually: this helper's output will be exercised directly on-screen in Task 4's dev-server check (the dashed arc line and image position either look like a smooth curve or they don't).

- [ ] **Step 3: Commit**

```bash
git add src/lib/arcPath.js
git commit -m "feat: add shared arc-path math for hero slider"
```

---

### Task 4: Build `HeroArcSlider` (the image/arc mechanic)

**Files:**
- Create: `src/components/sections/hero/HeroArcSlider.jsx`

This component owns only the visual arc + swinging image + dot indicators. It receives `activeIndex` and `onSelect` as props from `Hero.jsx` — it does not own the timer itself, so `Hero.jsx` stays the single source of truth for "what slide are we on."

- [ ] **Step 1: Write the component**

```jsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { STOCK_IMAGES } from "@/lib/images";
import { arcGuidePath, pointOnArc } from "@/lib/arcPath";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

// Viewbox for the guide-arc + image travel math. Actual rendered size is
// responsive (className controls real width/height); this is just the
// coordinate space the curve math operates in.
const ARC_WIDTH = 220;
const ARC_HEIGHT = 420;

// Resting position (top of arc, t = 1) vs. fully-exited position (bottom
// of arc, t = 0). Images swing between these two points on rotation.
const REST_T = 1;
const EXIT_T = 0;

/**
 * The hero's signature interaction: one product image at a time, resting
 * at the top of a semicircular arc. On rotation, the outgoing image swings
 * down-and-out along the curve while shrinking/fading; the incoming image
 * swings in from the bottom of the same curve, growing to full size as it
 * settles at rest. One continuous swing per image — not a cross-fade.
 *
 * `size` scales the whole stage down for the mobile strip layout without
 * needing a second animation implementation.
 */
export default function HeroArcSlider({ activeIndex, onSelect, size = "large" }) {
  const prefersReducedMotion = useReducedMotion();
  const active = PRODUCTS[activeIndex];
  const restPoint = pointOnArc(ARC_WIDTH, ARC_HEIGHT, REST_T);
  const exitPoint = pointOnArc(ARC_WIDTH, ARC_HEIGHT, EXIT_T);

  const stageHeight = size === "large" ? "h-[560px]" : "h-[320px]";
  const imageSize = size === "large" ? 260 : 150;

  return (
    <div className={`relative w-full ${stageHeight}`}>
      <svg
        viewBox={`0 0 ${ARC_WIDTH} ${ARC_HEIGHT}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={arcGuidePath(ARC_WIDTH, ARC_HEIGHT)}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>

      {PRODUCTS.map((product, index) => {
        const isActive = index === activeIndex;
        const point = isActive ? restPoint : exitPoint;
        const image = STOCK_IMAGES[product.imageKey];

        return (
          <motion.div
            key={product.slug}
            className="absolute overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_-20px_rgba(20,19,15,0.25)]"
            style={{
              width: imageSize,
              height: imageSize * 1.25,
              left: `${(point.x / ARC_WIDTH) * 100}%`,
              top: `${(point.y / ARC_HEIGHT) * 100}%`,
            }}
            initial={false}
            animate={
              prefersReducedMotion
                ? { opacity: isActive ? 1 : 0, x: "-50%", y: "-50%" }
                : {
                    x: "-50%",
                    y: "-50%",
                    scale: isActive ? 1 : 0.55,
                    opacity: isActive ? 1 : 0,
                    rotate: isActive ? 0 : -12,
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.9, ease: EASE }
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={size === "large" ? "260px" : "150px"}
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        );
      })}

      {/* Dot indicators — always visible, never hover-gated */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
        {PRODUCTS.map((product, index) => (
          <button
            key={product.slug}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show ${product.name}`}
            aria-pressed={index === activeIndex}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-6 bg-primary"
                : "w-2 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
```

Note on the swing path: each image's `left`/`top` are set once (rest or exit position) and Motion animates the `x`/`y` transform + `scale`/`opacity`/`rotate` between those two fixed anchor points — this keeps every animated property on `transform`/`opacity` only (no `left`/`top` animation), matching the guide's performance rule, while the *positions themselves* still come from the same arc curve via `pointOnArc`.

- [ ] **Step 2: Verify it renders without a parent yet**

This component isn't wired into the page until Task 5. Skip standalone verification — Task 5's browser check covers it.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero/HeroArcSlider.jsx
git commit -m "feat: add HeroArcSlider component for arc swing animation"
```

---

### Task 5: Rewrite `Hero.jsx` to orchestrate slides + text sync

**Files:**
- Modify: `src/components/sections/hero/Hero.jsx` (full rewrite)

- [ ] **Step 1: Replace the entire file**

```jsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import ThreadLine from "@/components/animations/ThreadLine";
import Highlight from "@/components/shared/Highlight";
import HeroArcSlider from "@/components/sections/hero/HeroArcSlider";
import { PRODUCTS } from "@/lib/products";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

const AUTOPLAY_MS = 4500;
// Image swing takes 0.9s (see HeroArcSlider); text waits until the
// incoming image is roughly mid-arc before it changes — "image leads,
// text follows" per the approved design.
const TEXT_SYNC_DELAY_MS = 450;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = PRODUCTS[textIndex];

  // Autoplay: advances the image immediately; re-arms on every manual
  // change so a manual pick resets the timer instead of racing it.
  // Fully disabled under reduced motion and while paused (hover/focus).
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % PRODUCTS.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused, prefersReducedMotion]);

  // Text follows the image change after a short delay so the image swing
  // visibly starts first. Reduced motion collapses this to an instant
  // swap by matching textIndex to activeIndex immediately below instead.
  useEffect(() => {
    if (prefersReducedMotion) {
      setTextIndex(activeIndex);
      return;
    }

    const delay = setTimeout(() => {
      setTextIndex(activeIndex);
    }, TEXT_SYNC_DELAY_MS);

    return () => clearTimeout(delay);
  }, [activeIndex, prefersReducedMotion]);

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  return (
    <section
      className="relative flex min-h-[85svh] w-full flex-col overflow-hidden bg-background pt-20 lg:min-h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative flex flex-1 flex-col lg:flex-row">
        {/* Copy panel */}
        <div className="relative z-10 flex flex-1 items-center px-6 py-10 md:px-10 lg:py-16 lg:pl-16 lg:pr-0 xl:pl-24">
          <div className="w-full">
            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
              className="max-w-xl"
            >
              <motion.p
                variants={revealUp}
                transition={{ duration: 0.7, ease: EASE }}
                className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Calgary · Custom Uniforms &amp; Embroidery
              </motion.p>

              <div className="min-h-[1.05em] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h1
                    key={active.slug}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="text-balance font-display text-[clamp(3.25rem,7vw,5.25rem)] leading-[1.05] text-foreground"
                  >
                    <Highlight>{active.headline}</Highlight>
                  </motion.h1>
                </AnimatePresence>
              </div>

              <motion.div
                variants={revealUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-5 w-40"
              >
                <ThreadLine
                  width={160}
                  height={10}
                  delay={0.9}
                  trigger="parent"
                  className="w-40"
                />
              </motion.div>

              <div className="mt-5 min-h-[3.5rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={active.slug}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: EASE, delay: prefersReducedMotion ? 0 : 0.05 }}
                    className="max-w-md font-sans text-lg leading-relaxed text-muted-foreground"
                  >
                    {active.description}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.div
                variants={revealUp}
                transition={{ duration: 0.7, ease: EASE }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  href="/contact"
                  className="rounded-full bg-foreground px-7 py-3.5 font-sans text-sm font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  Request a Quote
                </a>
                <a
                  href="/gallery"
                  className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-sans text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-deep"
                >
                  View Our Work
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Arc slider panel — desktop: right column. Mobile/tablet: shorter
            strip below the text, scaled down, same mechanic. */}
        <div className="relative flex items-center justify-center px-6 pb-10 lg:w-[52%] lg:px-0 lg:pb-0">
          <div className="w-full max-w-sm lg:hidden">
            <HeroArcSlider activeIndex={activeIndex} onSelect={handleSelect} size="small" />
          </div>
          <div className="hidden w-full lg:block">
            <HeroArcSlider activeIndex={activeIndex} onSelect={handleSelect} size="large" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

Notes on choices made here, so a reviewer isn't left guessing:
- `activeIndex` (drives the image) and `textIndex` (drives the copy) are separate state — this is what implements "image leads, text follows" instead of both changing in the same render.
- `min-h-[1.05em]` / `min-h-[3.5rem]` on the headline/description wrappers prevent layout shift while `AnimatePresence mode="wait"` swaps text heights of different lengths.
- Pause-on-hover/focus is implemented as section-level mouse/focus handlers rather than per-element, since the whole hero should pause, not just the slider.
- The `<Highlight>` component now wraps the entire per-slide headline (previously only wrapped one word in the static copy) since each category name is short and is itself the "one key word the sentence is about" per the site's typographic rule in `Highlight.jsx`.

- [ ] **Step 2: Run the dev server and check the browser**

Run: `npm run dev`
Open: `http://localhost:3000`

Check for all of the following:
1. Hero loads with "Administration Wear" headline and its image at rest at the top of the arc, dashed gold arc guide visible behind it.
2. After ~4.5s, the image swings down-and-out along the arc while shrinking/fading, the next image swings in from the bottom growing to full size — confirm this reads as one continuous swing, not a jump-cut.
3. The headline/description text changes roughly mid-swing (image visibly moving before text updates), no layout jump when text length changes between slides.
4. Hovering anywhere in the hero pauses the rotation; moving the mouse away resumes it.
5. Clicking a dot indicator jumps directly to that slide and resets the timer.
6. Resize the browser below the `lg` breakpoint (or use devtools device toolbar) — confirm the arc slider now appears below the text as a smaller strip, not hidden.
7. In devtools, enable "prefers-reduced-motion: reduce" (Rendering tab) and reload — confirm slides still change on the timer but instantly (no swing animation, no text fade).
8. No horizontal scrollbar/overflow at any breakpoint (guide §9 requirement).

If the swing looks janky (per the spec's flagged risk in §9), note this in the task result before proceeding — this is a real risk called out in the design spec, not a hypothetical.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero/Hero.jsx
git commit -m "feat: rebuild hero as 5-slide semi-circle arc product slider"
```

---

### Task 6: Final visual QA pass against the design spec

**Files:** none (verification-only task)

- [ ] **Step 1: Re-read the approved spec**

Open `docs/superpowers/specs/2026-08-18-hero-arc-slider-design.md` and check the running dev server against every row of its §2 decisions table:

- [ ] Layout: text fixed left ~48%, arc stage right ~52% on desktop
- [ ] Arc mechanic: image visibly swings along the curve (not a fade)
- [ ] Sync: image starts moving before text changes
- [ ] All 5 categories appear in rotation: Administration Wear, Polos & T-Shirts, Health Wear, Security, Industrial & Hospitality
- [ ] Autoplay works; pauses on hover/focus; dots allow direct jump; no prev/next arrows present
- [ ] Mobile shows a smaller arc strip below text, not hidden
- [ ] Reduced motion collapses to instant swaps

- [ ] **Step 2: Check accessibility basics**

- [ ] Tab through the hero with keyboard only — dot buttons are reachable and show a visible focus state (should inherit default browser/Tailwind focus ring; if none is visible, that's a gap to fix, not to ignore)
- [ ] Confirm no `<h1>` conflicts elsewhere on the page (`Hero.jsx` should be the only `<h1>` on the homepage — check `About.jsx`/`Industries.jsx`/`Services.jsx` use `<h2>`, which they already do per the existing code)

- [ ] **Step 3: Stop the dev server**

Run: Ctrl+C in the terminal running `npm run dev`

- [ ] **Step 4: Report status**

No commit for this task (verification-only). If every checklist item passes, the feature is complete. If anything fails, fix it as a follow-up task before considering this plan done — do not report success with known-failing items.

---

## Plan Self-Review Notes

- **Spec coverage:** Layout (Task 5), arc mechanic (Task 3+4), text sync (Task 5), 5 slides (Task 1), autoplay+controls (Task 5), mobile behavior (Task 5), imagery (Task 2), reduced motion (Task 4+5) — all 8 rows of the spec's decisions table have a corresponding task. §9's risk (swing feeling janky) is explicitly called out as a check in Task 5 Step 2 and isn't glossed over.
- **Type/name consistency:** `PRODUCTS` (from `lib/products.js`) is used identically in `HeroArcSlider.jsx` and `Hero.jsx`. `imageKey` values in `products.js` (`productAdministration`, `productPolosTshirts`, `productHealthWear`, `productSecurity`, `productIndustrialHospitality`) match exactly the keys added to `STOCK_IMAGES` in Task 2. `arcGuidePath`/`pointOnArc` exported from `arcPath.js` in Task 3 match the import in `HeroArcSlider.jsx` in Task 4.
- **No placeholders:** every step has literal, complete code — no "add appropriate styling," no TBDs. The one open item (swing feel) is explicitly flagged as a verification checkpoint, not left vague.
