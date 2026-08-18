"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import { TESTIMONIALS } from "@/lib/testimonials";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

const AUTO_ADVANCE_MS = 6000;

/**
 * Dark, editorial testimonial stage — breaks the light rhythm of the
 * surrounding sections the way the old Services block used to, so the
 * page has real light/dark contrast rather than one unbroken tone. A
 * huge decorative quotation glyph anchors the layout instead of a small
 * icon; the active quote sits large and left-aligned like a magazine
 * pull-quote, with a numbered index rail (not plain dots) for navigation.
 */
export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TESTIMONIALS[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-foreground py-16 text-background md:py-24">
      {/* Giant decorative quotation mark — a real typographic element tied
          to the section's content (a quote), not a generic decorative
          shape, echoing the large-numeral motif used elsewhere on the page. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-8 select-none font-display text-[24rem] leading-none text-background/[0.04] md:-top-4"
      >
        &ldquo;
      </span>

      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-background/50"
            >
              What Clients Say
            </motion.p>
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-balance font-display text-[clamp(2.5rem,3.6vw,3rem)] leading-[1.05] text-background"
            >
              Trusted by <Highlight>Calgary businesses.</Highlight>
            </motion.h2>
            <div className="mt-4 w-28">
              <ThreadLine width={112} height={8} className="w-28" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="relative min-h-64 lg:col-span-9">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <p className="text-balance font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.25] text-background">
                  {active.quote}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-primary" aria-hidden="true" />
                  <div>
                    <p className="font-sans text-sm font-semibold text-background">
                      {active.name}
                    </p>
                    <p className="mt-0.5 font-sans text-sm text-background/50">{active.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Numbered index rail — reads as a contents list, not decoration */}
          <div className="flex gap-3 border-t border-background/10 pt-6 lg:col-span-3 lg:flex-col lg:gap-1 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={testimonial.name + index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-pressed={activeIndex === index}
                className="group flex items-center gap-3 py-3 text-left"
              >
                <span
                  className={`font-display text-lg leading-none transition-colors duration-300 ${
                    activeIndex === index ? "text-primary" : "text-background/30"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`h-px flex-1 transition-colors duration-300 lg:flex-none lg:w-8 ${
                    activeIndex === index ? "bg-primary" : "bg-background/15 group-hover:bg-background/35"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
