"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

const FIELDS = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
];

const INITIAL_VALUES = { name: "", email: "", phone: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Mirrors the server-side validation in src/app/api/contact/route.js so
 * per-field errors can show instantly on submit, without waiting on a
 * round-trip — the two are kept in sync by hand since there's no shared
 * schema file, see that route if the rules ever change.
 */
function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Full name is required.";
  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  if (!values.message.trim()) errors.message = "Tell us what you need.";
  return errors;
}

/**
 * Underline-style inputs (no boxed/rounded fields) to match the site's
 * editorial spec-sheet language rather than a generic SaaS form. Submits
 * to /api/contact, which emails the request — see that route for
 * server-side validation and src/lib/mailer.js for the Gmail/nodemailer
 * setup.
 */
export default function ContactForm() {
  const prefersReducedMotion = useReducedMotion();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [status, setStatus] = useState("idle");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setFormError("");
      return;
    }

    setStatus("submitting");
    setFieldErrors({});
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        const serverFieldErrors = data.errors || {};
        setFieldErrors(serverFieldErrors);
        setFormError(
          Object.keys(serverFieldErrors).length > 0
            ? ""
            : data.error || "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("submitted");
    } catch {
      setFormError("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
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

      {FIELDS.map((field, index) => (
        <div key={field.name}>
          <div className={`group relative border-b border-border py-4 ${index === 0 ? "pt-0" : ""}`}>
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
              disabled={status === "submitting"}
              aria-invalid={Boolean(fieldErrors[field.name])}
              aria-describedby={fieldErrors[field.name] ? `${field.name}-error` : undefined}
              value={values[field.name]}
              onChange={handleChange}
              className="mt-2 w-full bg-transparent font-sans text-lg text-foreground outline-none placeholder:text-muted-foreground/40 disabled:opacity-50"
            />
            <span className="pointer-events-none absolute -bottom-px left-0 h-0.5 w-0 bg-primary transition-[width] duration-300 ease-out group-focus-within:w-full" />
          </div>
          {fieldErrors[field.name] && (
            <p
              id={`${field.name}-error`}
              role="alert"
              className="pt-2 font-sans text-sm leading-relaxed text-destructive"
            >
              {fieldErrors[field.name]}
            </p>
          )}
        </div>
      ))}

      <div>
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
            disabled={status === "submitting"}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            value={values.message}
            onChange={handleChange}
            placeholder="Garment types, quantities, timeline..."
            className="mt-2 w-full resize-none bg-transparent font-sans text-lg text-foreground outline-none placeholder:text-muted-foreground/40 disabled:opacity-50"
          />
          <span className="pointer-events-none absolute -bottom-px left-0 h-0.5 w-0 bg-primary transition-[width] duration-300 ease-out group-focus-within:w-full" />
        </div>
        {fieldErrors.message && (
          <p id="message-error" role="alert" className="pt-2 font-sans text-sm leading-relaxed text-destructive">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {formError && (
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          role="alert"
          className="mt-6 font-sans text-sm leading-relaxed text-destructive"
        >
          {formError}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-9 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-foreground px-9 py-4.5 font-sans text-base font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-foreground disabled:hover:text-background sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            Sending
            <Loader2 strokeWidth={1.5} className="h-4 w-4 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Send Request
            <ArrowUpRight
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </>
        )}
      </button>
    </form>
  );
}
