"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

/**
 * Reuses the client's existing positioning (quality/reliability/style —
 * client-business-info.md §3) but as a dedicated values statement rather
 * than the homepage's differentiator list, so the two pages don't read
 * as the same section twice.
 */
const VALUES = [
  {
    title: "Quality",
    description:
      "Every garment is held to the same standard whether it's a single sample or a five-hundred-piece order — fabric, fit, and finish that hold up past the first wash.",
  },
  {
    title: "Reliability",
    description:
      "Design, manufacturing, and embroidery all happen in-house, so timelines don't depend on a third party — and neither does the quality of the work.",
  },
  {
    title: "Style",
    description:
      "A uniform should look intentional, not generic. We design around what your team actually does, so the finished look fits the work, not just the body.",
  },
];

export default function Values() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-foreground py-16 text-background md:py-24">
      <Container>
        <div className="max-w-2xl">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-background/50"
          >
            Mission &amp; Values
          </motion.p>
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-balance font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] text-background"
          >
            One standard, <Highlight>every order.</Highlight>
          </motion.h2>
          <div className="mt-4 w-28">
            <ThreadLine width={112} height={8} className="w-28" />
          </div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          className="mt-16 grid grid-cols-1 gap-10 border-t border-background/15 pt-12 sm:grid-cols-3 sm:gap-8"
        >
          {VALUES.map((value, index) => (
            <motion.div key={value.title} variants={revealUp} transition={{ duration: 0.6, ease: EASE }}>
              <span className="font-display text-sm leading-none text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-2xl leading-tight text-background">
                {value.title}
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-background/60">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
