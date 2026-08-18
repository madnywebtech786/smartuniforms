"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin, Phone, Mail } from "lucide-react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import ContactForm from "@/components/sections/contact/ContactForm";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

/**
 * Confirmed NAP facts only (client-business-info.md §2) — same source the
 * footer already draws from. Business hours and socials are still
 * [NEEDS CLIENT INPUT] there, so they're omitted here rather than invented.
 */
const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "Call us",
    value: "(403) 629-0862",
    href: "tel:+14036290862",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "info@smartuniform.ca",
    href: "mailto:info@smartuniform.ca",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "534 Redstone View NE, Calgary, AB T3N 0M9",
    href: "https://maps.google.com/?q=534+Redstone+View+NE+Calgary+AB+T3N+0M9",
  },
];

export default function Contact({ headingLevel = "h2" }) {
  const prefersReducedMotion = useReducedMotion();
  const Heading = motion[headingLevel];

  return (
    <section className="bg-background py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Info column */}
          <div className="lg:col-span-5">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Get In Touch
            </motion.p>
            <Heading
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-balance font-display text-[clamp(2.75rem,4vw,3.5rem)] leading-[1.05] text-foreground"
            >
              Tell us about <Highlight>your team.</Highlight>
            </Heading>
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
              Reach out directly, or send over what your team needs and
              we&rsquo;ll follow up with next steps.
            </motion.p>

            <motion.ul
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
              className="mt-12 divide-y divide-border border-t border-border"
            >
              {CONTACT_DETAILS.map((detail, index) => (
                <motion.li key={detail.label} variants={revealUp} transition={{ duration: 0.6, ease: EASE }}>
                  <a
                    href={detail.href}
                    target={detail.icon === MapPin ? "_blank" : undefined}
                    rel={detail.icon === MapPin ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-5 py-6"
                  >
                    <span className="font-display text-2xl leading-none text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-1 items-start justify-between gap-4">
                      <span>
                        <span className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {detail.label}
                        </span>
                        <span className="mt-1.5 block max-w-xs font-sans text-lg leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                          {detail.value}
                        </span>
                      </span>
                      <detail.icon
                        strokeWidth={1.5}
                        className="mt-1 h-5 w-5 shrink-0 text-foreground/30 transition-colors duration-300 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Form column — an elevated card so the form reads as a distinct
              object floating on the canvas, vertically centered against the
              taller info column rather than pinned to its top edge. */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex lg:col-span-6 lg:col-start-7 lg:items-center"
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-elevated p-8 sm:p-10 md:p-12">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/6 blur-2xl"
              />
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
