"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import { PRODUCTS } from "@/lib/products";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

/**
 * Quiet, icon-first category index — a deliberate palate cleanser between
 * the Hero's motion-heavy arc slider and the Products grid below. Every
 * category gets equal weight (icon + name only, per the client's new
 * requirement), laid out as a single evenly-divided row rather than
 * cards, so it reads as an index/legend rather than another block of
 * competing content.
 */
export default function Categories() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-y border-border bg-background py-14 md:py-20">
      <Container>
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Categories
        </motion.p>

        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl text-balance font-display text-[clamp(2.5rem,3.6vw,3rem)] leading-[1.05] text-foreground"
        >
          Uniforms built for <Highlight>every role</Highlight> on your team.
        </motion.h2>

        <div className="mt-4 w-28">
          <ThreadLine width={112} height={8} className="w-28" />
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {PRODUCTS.map((category, index) => (
            <motion.div key={category.slug} variants={revealUp} transition={{ duration: 0.5, ease: EASE }}>
              <CategoryCard category={category} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function CategoryCard({ category, index }) {
  const Icon = category.icon;

  return (
    <Link
      href={`/industries/${category.slug}`}
      className="group relative flex h-64 flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-primary hover:bg-primary sm:h-72"
    >
      {/* Ghost register numeral — same "spec sheet" numbering motif used
          in WhyChooseUs/Products, marking this as entry N of 6 in the
          catalog rather than as decoration. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-3 select-none font-display text-7xl leading-none text-foreground/[0.05] transition-colors duration-300 group-hover:text-white/15"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white group-hover:text-white">
        <Icon strokeWidth={1.5} className="h-5 w-5" />
      </span>

      <div className="relative mt-auto">
        <span className="block font-display text-lg leading-tight text-foreground transition-colors duration-300 group-hover:text-white sm:text-xl">
          {category.name}
        </span>
        <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
