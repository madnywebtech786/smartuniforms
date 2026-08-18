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
    <section className="overflow-hidden bg-background py-16 md:py-24">
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
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-5 max-w-lg font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A running sample of what we build in-house — every piece
            manufactured and embroidered under one roof in Calgary, ready
            to be fitted, branded, and sized for your team.
          </motion.p>
        </div>
      </Container>

      {/* Full-bleed track — deliberately breaks out of Container's max-width
          so cards can peek at the viewport edge, reinforcing "more content
          this way" the way a true marquee should, rather than stopping
          abruptly at the same gutter as the text above it. */}
      <div
        className="mt-14 mask-[linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]"
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
