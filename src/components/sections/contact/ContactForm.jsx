"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

const FIELDS = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
];

const INITIAL_VALUES = { name: "", email: "", phone: "", message: "" };

/**
 * Underline-style inputs (no boxed/rounded fields) to match the site's
 * editorial spec-sheet language rather than a generic SaaS form. No
 * backend exists yet — this only runs client-side validation and swaps
 * to a confirmation state; wiring a real submit endpoint is a follow-up.
 */
export default function ContactForm() {
  const prefersReducedMotion = useReducedMotion();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex min-h-72 flex-col justify-center"
      >
        <span className="font-display text-3xl leading-none text-primary">Sent</span>
        <p className="mt-5 font-display text-2xl leading-tight text-foreground sm:text-3xl">
          Thanks — that&rsquo;s on its way.
        </p>
        <p className="mt-3 max-w-sm font-sans text-base leading-relaxed text-muted-foreground">
          We&rsquo;ll get back to you shortly to talk through what your team
          needs.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mb-8 font-display text-2xl leading-tight text-foreground sm:text-[1.75rem]">
        Request a quote
      </p>

      {FIELDS.map((field) => (
        <div key={field.name} className="group relative border-b border-border py-4 first:pt-0">
          <label
            htmlFor={field.name}
            className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required
            value={values[field.name]}
            onChange={handleChange}
            className="mt-2 w-full bg-transparent font-sans text-lg text-foreground outline-none placeholder:text-muted-foreground/40"
          />
          <span className="pointer-events-none absolute -bottom-px left-0 h-0.5 w-0 bg-primary transition-[width] duration-300 ease-out group-focus-within:w-full" />
        </div>
      ))}

      <div className="group relative border-b border-border py-4">
        <label
          htmlFor="message"
          className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
        >
          What do you need?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          value={values.message}
          onChange={handleChange}
          placeholder="Garment types, quantities, timeline..."
          className="mt-2 w-full resize-none bg-transparent font-sans text-lg text-foreground outline-none placeholder:text-muted-foreground/40"
        />
        <span className="pointer-events-none absolute -bottom-px left-0 h-0.5 w-0 bg-primary transition-[width] duration-300 ease-out group-focus-within:w-full" />
      </div>

      <button
        type="submit"
        className="group mt-9 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-foreground px-9 py-4.5 font-sans text-base font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground sm:w-auto"
      >
        Send Request
        <ArrowUpRight
          strokeWidth={1.5}
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
    </form>
  );
}
