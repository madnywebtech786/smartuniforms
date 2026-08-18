"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

/**
 * Confirmed-answer questions only. MOQ, turnaround time, pricing tiers,
 * service area beyond Calgary, and business hours are all
 * [NEEDS CLIENT INPUT] per client-business-info.md §8 open questions —
 * deliberately excluded rather than answered with invented numbers.
 */
const FAQS = [
  {
    question: "What industries do you make uniforms for?",
    answer:
      "Administration and office wear, health wear, security, industrial, and hospitality — six categories in total, each designed around what that team actually does during a shift.",
  },
  {
    question: "Is everything really made in-house?",
    answer:
      "Yes. Design, manufacturing, embroidery, and sublimation all happen in the same building in Calgary — nothing is outsourced to a third-party vendor.",
  },
  {
    question: "What's the difference between embroidery and sublimation?",
    answer:
      "Embroidery stitches your logo directly onto the garment — durable and the standard choice for branding. Sublimation dyes a full-colour, all-over design into the fabric itself, for teams who want more than a logo on a plain garment.",
  },
  {
    question: "Do you work with businesses outside Calgary?",
    answer:
      "We're based in Calgary and that's our core service area. If you're elsewhere in Alberta, reach out and we'll let you know what's possible.",
  },
  {
    question: "How do I start an order?",
    answer:
      "Send us what your team needs — industry, garment types, and rough quantities — through the contact form or by phone or email. We'll follow up to talk through design and next steps.",
  },
];

export default function Faq() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

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
                Common Questions
              </motion.p>
              <motion.h2
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="text-balance font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] text-foreground"
              >
                Before you <Highlight>reach out.</Highlight>
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
                Still have a question? Send it our way — we&rsquo;ll answer
                directly.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            className="divide-y divide-border border-t border-border lg:col-span-7 lg:col-start-6"
          >
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div key={item.question} variants={revealUp} transition={{ duration: 0.6, ease: EASE }}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg leading-none text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-sans text-lg font-semibold text-foreground sm:text-xl">
                      {item.question}
                    </span>
                    <Plus
                      strokeWidth={1.75}
                      className={`h-5 w-5 shrink-0 text-foreground/50 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 pl-11 font-sans text-base leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
