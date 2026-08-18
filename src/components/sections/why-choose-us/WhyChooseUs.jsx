"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

/**
 * Differentiators drawn from the client's existing positioning
 * (client-business-info.md §3): in-house manufacturing + embroidery +
 * sublimation under one roof, Calgary-based, quality/reliability/style.
 */
const REASONS = [
  {
    title: "Everything under one roof",
    description:
      "Design, manufacturing, embroidery, and sublimation all happen in-house — no outsourcing, no handoffs between vendors, no surprises.",
  },
  {
    title: "Built for your industry",
    description:
      "Healthcare, hospitality, retail, and industrial teams all need different things from a uniform. We design around what your team actually does all day.",
  },
  {
    title: "Embroidery & sublimation done right",
    description:
      "Precision logo application and full-colour, all-over designs that hold up to daily wear and repeated washing — not just a first-sample finish.",
  },
  {
    title: "Calgary-based, dependable",
    description:
      "A local team you can reach directly, order after order — not a call centre or an account rep who changes every quarter.",
  },
];

export default function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-background py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Why Choose Us
              </motion.p>
              <motion.h2
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="text-balance font-display text-[clamp(2.75rem,4vw,3.5rem)] leading-[1.05] text-foreground"
              >
                Quality, <Highlight>reliability</Highlight>, and style.
              </motion.h2>
              <div className="mt-4 w-28">
                <ThreadLine width={112} height={8} className="w-28" />
              </div>
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="mt-5 max-w-sm font-sans text-base leading-relaxed text-muted-foreground"
              >
                We built this business around one standard, and every order
                is still held to it.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            className="divide-y divide-border border-t border-border lg:col-span-8 lg:col-start-5"
          >
            {REASONS.map((reason, index) => (
              <motion.div
                key={reason.title}
                variants={revealUp}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8"
              >
                <span className="font-display text-3xl leading-none text-primary sm:w-16 sm:shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight text-foreground sm:text-2xl">
                    {reason.title}
                  </h3>
                  <p className="mt-2 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
