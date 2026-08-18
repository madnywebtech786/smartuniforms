"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageSquare, PenTool, CheckCircle2, Factory, Truck } from "lucide-react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

/**
 * Standard garment-industry ordering flow (inquiry -> design -> sample ->
 * production -> delivery) — generic, safe-to-state stages, not
 * client-specific timeframes or MOQs (those are still [NEEDS CLIENT INPUT]
 * per client-business-info.md open questions). Answers the "what actually
 * happens if I reach out" question a first-time buyer has before ever
 * seeing a quote.
 */
const STEPS = [
  {
    icon: MessageSquare,
    title: "Inquiry",
    description: "Tell us what your team needs — industry, garment types, rough quantities.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "We work from your logo and brief to a finished garment and branding spec.",
  },
  {
    icon: CheckCircle2,
    title: "Sample approval",
    description: "You see and approve the actual piece before full production begins.",
  },
  {
    icon: Factory,
    title: "Production",
    description: "Cut, sewn, embroidered, and sublimated in-house — no outside vendors.",
  },
  {
    icon: Truck,
    title: "Delivery",
    description: "Finished order delivered ready to wear, on to the next one when you need it.",
  },
];

export default function Process() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-background py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-balance font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] text-foreground"
          >
            From inquiry to <Highlight>delivery.</Highlight>
          </motion.h2>
          <div className="mt-4 w-28">
            <ThreadLine width={112} height={8} className="w-28" />
          </div>
        </div>

        {/* Mobile / tablet — vertical timeline: a continuous rail running
            through each icon, so the steps read as one connected sequence
            rather than isolated cards. Desktop switches to the horizontal
            rail below instead of stretching this layout wide. */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } } }}
          className="mt-16 flex flex-col lg:hidden"
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              variants={revealUp}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  <step.icon strokeWidth={1.5} className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                {index < STEPS.length - 1 && (
                  <span className="my-2 w-px flex-1 bg-border" aria-hidden="true" />
                )}
              </div>
              <div className={index < STEPS.length - 1 ? "pb-10" : undefined}>
                <span className="block font-display text-sm leading-none text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl leading-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop — horizontal rail across all five stages */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
          className="relative mt-16 hidden lg:grid lg:grid-cols-5 lg:gap-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-6 h-px bg-border"
          />

          {STEPS.map((step, index) => (
            <motion.div key={step.title} variants={revealUp} transition={{ duration: 0.6, ease: EASE }}>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                <step.icon strokeWidth={1.5} className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <span className="mt-4 block font-display text-sm leading-none text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl leading-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
