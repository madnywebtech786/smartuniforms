"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import { PenTool, Scissors, Sparkles, Palette } from "lucide-react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import { STOCK_IMAGES } from "@/lib/images";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

/**
 * The "everything under one roof" claim (client-business-info.md §3),
 * shown as the actual four-stage capability chain rather than restated as
 * a plain sentence — makes the "no outsourcing" positioning concrete.
 */
const CAPABILITIES = [
  {
    icon: PenTool,
    title: "Design",
    description: "Working from your logo and brief to a finished garment spec.",
  },
  {
    icon: Scissors,
    title: "Manufacturing",
    description: "Cut and sewn in-house, to size, not pulled from a generic stock run.",
  },
  {
    icon: Sparkles,
    title: "Embroidery",
    description: "Precision logo application built to survive daily wear and washing.",
  },
  {
    icon: Palette,
    title: "Sublimation",
    description: "Full-colour, all-over designs for teams who need more than a logo.",
  },
];

export default function Capabilities() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={sectionRef} className="bg-background py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              What Makes Us Different
            </motion.p>
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-balance font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] text-foreground"
            >
              Everything under <Highlight>one roof.</Highlight>
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
              No outsourcing, no vendor handoffs. A garment moves through
              every stage in the same building.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
              className="mt-12 divide-y divide-border border-t border-border"
            >
              {CAPABILITIES.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  variants={revealUp}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8"
                >
                  <span className="font-display text-3xl leading-none text-primary sm:w-16 sm:shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <capability.icon
                        strokeWidth={1.5}
                        className="h-5 w-5 text-foreground/40"
                        aria-hidden="true"
                      />
                      <h3 className="font-display text-xl leading-tight text-foreground sm:text-2xl">
                        {capability.title}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
                      {capability.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sticky image column */}
          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl">
                <motion.div
                  style={prefersReducedMotion ? undefined : { y: imageY }}
                  className="absolute inset-0 -top-[6%] -bottom-[6%]"
                >
                  <Image
                    src={STOCK_IMAGES.aboutCraft.src}
                    alt={STOCK_IMAGES.aboutCraft.alt}
                    fill
                    sizes="38vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 border border-border" />
              </div>
              <p className="mt-3 font-sans text-xs text-muted-foreground">
                {STOCK_IMAGES.aboutCraft.credit}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
