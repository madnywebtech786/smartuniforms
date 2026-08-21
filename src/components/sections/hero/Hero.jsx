"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ThreadLine from "@/components/animations/ThreadLine";
import Highlight from "@/components/shared/Highlight";
import { PRODUCTS } from "@/lib/products";
import { STOCK_IMAGES } from "@/lib/images";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

const AUTOPLAY_MS = 5000;

/**
 * Full-bleed background hero per the client's request: one product photo
 * fills the section, a dark overlay sits between it and the copy for
 * contrast, and the heading/CTAs are layered on top. The background
 * cross-fades through PRODUCTS on the same autoplay/pause/dot-indicator
 * system the previous arc-slider hero used, so the interaction the
 * client already approved carries over — only the visual treatment of
 * "which image is showing" changed, not the underlying slide logic.
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = PRODUCTS[activeIndex];
  const activeImage = STOCK_IMAGES[active.imageKey];

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % PRODUCTS.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % PRODUCTS.length);
  };

  return (
    <section
      className="relative flex min-h-[120vh] w-full flex-col overflow-hidden bg-foreground"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background photo — cross-fades between products, dark overlay on
          top for text contrast per the client's request. */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={active.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="100vw"
              priority={activeIndex === 0}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-foreground/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-transparent to-foreground/20" aria-hidden="true" />
      </div>

      {/* Wave transition into the page background below, per the client's
          reference — a plain white S-curve, not a photo, so it sits above
          the overlay but doesn't compete with the text content. An inline
          SVG (stretched via preserveAspectRatio="none") rather than an
          image asset: it scales cleanly to any width with no cropping,
          and the height is capped so it can never grow tall enough to
          reach the copy/CTAs above it. */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-10 w-full sm:h-14 md:h-20 lg:h-24"
      >
        <path
          d="M0,80 C 240,20 480,20 720,55 C 960,90 1200,90 1440,40 L1440,120 L0,120 Z"
          fill="var(--color-background)"
        />
      </svg>

      <div className="relative z-10 flex flex-1 items-center pt-30">
        {/* Prev/next arrows — always visible, never hover-only, centered
            against this content band rather than the taller section the
            wave sits within. */}
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-background/30 text-background transition-colors duration-300 hover:border-background hover:bg-background/10 md:left-8"
        >
          <ChevronLeft strokeWidth={1.75} className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-background/30 text-background transition-colors duration-300 hover:border-background hover:bg-background/10 md:right-8"
        >
          <ChevronRight strokeWidth={1.75} className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              initial={prefersReducedMotion ? false : "hidden"}
              animate="show"
              exit="exit"
              variants={{
                show: { transition: { staggerChildren: 0.05, delayChildren: 0 } },
                exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
              }}
              className="max-w-2xl"
            >
              <motion.p
                variants={revealUp}
                transition={{ duration: 0.35, ease: EASE }}
                className="mb-7 font-sans text-sm font-semibold uppercase tracking-[0.24em] text-background/80"
              >
                Calgary · Custom Uniforms &amp; Embroidery
              </motion.p>

              <motion.h1
                variants={revealUp}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-balance font-display text-[clamp(2.5rem,9vw,4.75rem)] leading-[1.05] text-background"
              >
                <Highlight>{active.headline}</Highlight>
              </motion.h1>

              <motion.div variants={revealUp} transition={{ duration: 0.3, ease: EASE }} className="mt-6 w-48">
                <ThreadLine width={192} height={12} duration={0.4} trigger="parent" className="w-48" />
              </motion.div>

              <motion.p
                variants={revealUp}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-6 max-w-lg font-sans text-base leading-relaxed text-background/85 sm:text-lg"
              >
                {active.description}
              </motion.p>

              <motion.div
                variants={revealUp}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
              >
                <a
                  href="/contact"
                  className="whitespace-nowrap rounded-full bg-background px-6 py-3 text-center font-sans text-base font-semibold text-foreground transition-colors duration-300 hover:bg-primary hover:text-primary-foreground sm:px-9 md:py-3.5 lg:py-4.5"
                >
                  Request a Quote
                </a>
                <a
                  href="/gallery"
                  className="group flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-primary px-6 py-3 font-sans text-base font-semibold text-white transition-colors duration-300 hover:bg-primary-deep sm:px-9 md:py-3.5 lg:py-4.5"
                >
                  View Our Work
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
