"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import ThreadLine from "@/components/animations/ThreadLine";
import Highlight from "@/components/shared/Highlight";
import HeroArcSlider from "@/components/sections/hero/HeroArcSlider";
import { PRODUCTS } from "@/lib/products";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

const AUTOPLAY_MS = 3000;
// Image swing takes 1.1s (see HeroArcSlider); text starts changing
// shortly after so the image is visibly moving first, without making
// the copy feel like it's lagging behind — "image leads, text follows"
// per the approved design, but by a beat, not a pause.
const TEXT_SYNC_DELAY_MS = 150;

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
      className="relative flex h-[170svh] w-full flex-col overflow-hidden bg-background pt-20 lg:h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Decorative backdrop — a large outlined circle echoing the arc
          slider's own geometry, anchored off the right edge. Reinforces
          the circular motif rather than introducing an unrelated shape,
          and gives the section's negative space intentional structure. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-22vw] hidden aspect-square w-[70vw] max-w-275 -translate-y-1/2 rounded-full border border-foreground/6 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-26vw] hidden aspect-square w-[54vw] max-w-215 -translate-y-1/2 rounded-full border border-foreground/5 lg:block"
      />

      <div className="relative flex flex-1 flex-col lg:flex-row">
        {/* Copy panel — the entire block re-plays its stagger on every
            slide change, keyed to the active product, so every element
            (eyebrow, headline, thread, description, CTAs) moves together
            as one choreographed unit rather than some elements animating
            once on load while others swap independently. */}
        <div className="relative z-10 flex flex-1 items-center px-6 py-10 md:px-10 lg:py-16 lg:pl-16 lg:pr-0 xl:pl-24">
          <div className="w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                initial={prefersReducedMotion ? false : "hidden"}
                animate="show"
                exit="exit"
                variants={{
                  show: {
                    transition: { staggerChildren: 0.05, delayChildren: 0 },
                  },
                  exit: {
                    transition: {
                      staggerChildren: 0.025,
                      staggerDirection: -1,
                    },
                  },
                }}
                className="max-w-2xl"
              >
                <motion.p
                  variants={revealUp}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mb-7 font-sans text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground"
                >
                  Calgary · Custom Uniforms &amp; Embroidery
                </motion.p>

                <motion.h1
                  variants={revealUp}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-balance font-display text-[clamp(3.25rem,6vw,4.75rem)] leading-[1.05] text-foreground"
                >
                  <Highlight>{active.headline}</Highlight>
                </motion.h1>

                <motion.div
                  variants={revealUp}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mt-6 w-48"
                >
                  <ThreadLine
                    width={192}
                    height={12}
                    duration={0.4}
                    trigger="parent"
                    className="w-48"
                  />
                </motion.div>

                <motion.p
                  variants={revealUp}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-muted-foreground"
                >
                  {active.description}
                </motion.p>

                <motion.div
                  variants={revealUp}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mt-12 flex items-center gap-5"
                >
                  <a
                    href="/contact"
                    className="flex-1 whitespace-nowrap rounded-full bg-foreground px-9 py-3 md:py-3.5 lg:py-4.5 text-center font-sans text-base font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground sm:flex-none"
                  >
                    Request a Quote
                  </a>
                  <a
                    href="/gallery"
                    className="group flex flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-primary px-9 py-3 md:py-3.5 lg:py-4.5 font-sans text-base font-semibold text-white transition-colors duration-300 hover:bg-primary-deep sm:flex-none"
                  >
                    View Our Work
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Arc slider panel — desktop: right column. Mobile/tablet: shorter
            strip below the text, same component scaling fluidly to
            whatever width this panel actually renders at. */}
        <div className="relative flex items-center justify-center px-6 pb-6 lg:w-[52%] lg:px-12 lg:pb-0">
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-none">
            <HeroArcSlider activeIndex={activeIndex} aspect={1.3} />
          </div>
        </div>
      </div>

      {/* Dot indicators — centered across the full section, always
          visible, never hover-gated. Lives at the section level (not
          inside HeroArcSlider) so it centers on the whole hero rather
          than just the image column. */}
      <div className="relative z-10 flex items-center justify-center gap-3 pb-8 lg:pb-10">
        {PRODUCTS.map((product, index) => (
          <button
            key={product.slug}
            type="button"
            onClick={() => handleSelect(index)}
            aria-label={`Show ${product.name}`}
            aria-pressed={index === activeIndex}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-primary"
                : "w-2.5 bg-foreground/15 hover:bg-foreground/35"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
