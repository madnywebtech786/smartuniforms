"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import { STOCK_IMAGES } from "@/lib/images";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

/**
 * "25+ years" is the one founding-story figure the client's own homepage
 * copy already used without tying it to a specific year — the safest of
 * the three conflicting claims in client-business-info.md §3 (1987 vs
 * 1997 vs "25+ years"). Used provisionally; replace once the client
 * confirms one accurate figure and narrative.
 */
export default function Story() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.35], [1.1, 1]);
  const imageClip = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["inset(8% 8% 8% 8%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <section ref={sectionRef} className="relative bg-background py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Narrative column — leads on this page, image follows */}
          <div className="lg:col-span-6">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Our Story
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-balance font-display text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.05] text-foreground"
            >
              25+ years of <Highlight>craft</Highlight>, not shortcuts.
            </motion.h1>

            <div className="mt-4 w-28">
              <ThreadLine width={112} height={8} className="w-28" />
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-8 space-y-5 font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              <p>
                Smart Uniform and Embroidery grew out of hands-on garment and
                clothing expertise — the kind you only build by spending
                years at the machine, not reading about it. That standard is
                still the one every order is held to today.
              </p>
              <p>
                What started as tailoring and design know-how has grown into
                a full-service uniform house: design, manufacturing,
                embroidery, and sublimation, all handled in-house in Calgary.
                No outsourcing, no vendor handoffs, no guessing who&rsquo;s
                actually responsible for the finish on a garment.
              </p>
              <p>
                Today we work with hospitals, restaurants, warehouses, and
                dealerships across the city — different industries, same
                expectation: uniforms that fit properly, hold up to daily
                wear, and represent the business wearing them.
              </p>
            </motion.div>
          </div>

          {/* Sticky image column */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <motion.div
                style={prefersReducedMotion ? undefined : { clipPath: imageClip }}
                className="relative aspect-4/5 w-full overflow-hidden rounded-xl"
              >
                <motion.div
                  style={
                    prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }
                  }
                  className="absolute inset-0 -top-[8%] -bottom-[8%]"
                >
                  <Image
                    src={STOCK_IMAGES.aboutStory.src}
                    alt={STOCK_IMAGES.aboutStory.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 border border-border" />
              </motion.div>
              <p className="mt-3 font-sans text-xs text-muted-foreground">
                {STOCK_IMAGES.aboutStory.credit}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
