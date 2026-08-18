"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

/**
 * Final full-bleed conversion moment before the footer — gold, not dark,
 * so it doesn't visually merge into the dark Testimonials section right
 * above it. Spacious, one headline, one primary action: the closing
 * beat, not another showcase.
 */
export default function CtaBand() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-balance font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] text-primary-foreground"
          >
            Let&rsquo;s build your team&rsquo;s look.
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="mx-auto mt-6 max-w-lg font-sans text-lg leading-relaxed text-primary-foreground/70"
          >
            Tell us what your team needs and we&rsquo;ll put together a
            quote — design, manufacturing, and embroidery, all handled
            in-house in Calgary.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mt-10"
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-9 py-4.5 font-sans text-base font-semibold text-background transition-colors duration-300 hover:bg-background hover:text-foreground"
            >
              Request a Quote
              <ArrowRight
                strokeWidth={1.5}
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
