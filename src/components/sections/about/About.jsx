"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import Container from "@/components/shared/Container";
import ThreadLine from "@/components/animations/ThreadLine";
import Highlight from "@/components/shared/Highlight";
import { STOCK_IMAGES } from "@/lib/images";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

const STATS = [
  { value: "4", label: "Industries served" },
  { value: "In-house", label: "Manufacturing & embroidery" },
  { value: "Calgary", label: "Locally based" },
];

export default function About() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax drift on the image — purely decorative depth, never
  // enough to feel like a "scroll effect" rather than a still photograph.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // The image reveals into full scale/clarity as the section enters view,
  // then holds — reinforces "sticky storytelling" without moving after
  // the reader has settled into the text column.
  const imageScale = useTransform(scrollYProgress, [0, 0.35], [1.08, 1]);
  const imageClip = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["inset(6% 6% 6% 6%)", "inset(0% 0% 0% 0%)"]
  );

  // A gold progress rule that fills along the sticky image's edge as the
  // reader moves through the section — the thread motif tied directly to
  // scroll position, distinct from the viewport-entry ThreadLine draws.
  const progressScale = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  return (
    <section ref={sectionRef} className="relative bg-background py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Sticky image column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <motion.div
                style={prefersReducedMotion ? undefined : { clipPath: imageClip }}
                className="relative aspect-4/5 w-full overflow-hidden rounded-xl"
              >
                <motion.div
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { y: imageY, scale: imageScale }
                  }
                  className="absolute inset-0  -top-[6%] -bottom-[6%]"
                >
                  <Image
                    src={STOCK_IMAGES.about.src}
                    alt={STOCK_IMAGES.about.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover "
                  />
                </motion.div>
                <div className="absolute inset-0 border border-border" />
              </motion.div>

              {/* Scroll-progress thread — fills as the reader moves through
                  the section's narrative column. */}
              <div className="mt-4 h-0.5 w-full bg-border">
                <motion.div
                  style={prefersReducedMotion ? undefined : { scaleX: progressScale }}
                  className="h-full w-full origin-left bg-primary"
                />
              </div>

              <p className="mt-3 font-sans text-xs text-muted-foreground">
                {STOCK_IMAGES.about.credit}
              </p>
            </div>
          </div>

          {/* Narrative column */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Our Story
            </motion.p>

            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-balance font-display text-[clamp(2.5rem,4.8vw,4.25rem)] leading-[1.05] text-foreground"
            >
              Built on <Highlight>decades</Highlight> at the sewing machine.
            </motion.h2>

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
                Smart Uniform and Embroidery started the way most trades do —
                with a needle, a machine, and a standard for quality that
                never moved. What began as garment and clothing expertise has
                grown into a full-service uniform house: design,
                manufacturing, embroidery, and sublimation, all handled
                in-house in Calgary.
              </p>
              <p>
                We work with hospitals, restaurants, warehouses, and
                dealerships who all need the same thing for different
                reasons — uniforms that hold up, fit properly, and represent
                their business well. That&rsquo;s the standard every order is
                held to.
              </p>
            </motion.div>

            <motion.dl
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
              }}
              className="mt-12 grid grid-cols-3 gap-3 border-t border-border pt-8 sm:gap-6"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={revealUp}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <dt className="font-display text-lg leading-tight text-foreground sm:text-2xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 font-sans text-xs leading-snug text-muted-foreground sm:text-sm">
                    {stat.label}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
