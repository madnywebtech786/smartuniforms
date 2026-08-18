"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The site's signature motif: a single gold thread drawing itself in.
 * Used sparingly and intentionally — under headlines, as section dividers,
 * as underline accents. Never as decoration; each use marks something the
 * page wants attention on.
 *
 * `width` is the SVG viewBox width in px (defines line length at 1:1 scale;
 * the element still stretches to its container via className="w-full").
 *
 * `trigger`:
 *  - "inView" (default) — draws itself once it scrolls into view. Use for
 *    standalone/mid-page placements.
 *  - "parent" — draws immediately via `animate`, relying on the parent's
 *    own whileInView/stagger to gate *when* this mounts into view. Use
 *    when already nested inside another viewport-triggered reveal, so the
 *    thread doesn't need its own separate (and easy-to-miss) trigger.
 */
export default function ThreadLine({
  width = 240,
  height = 12,
  className = "",
  delay = 0,
  duration = 1.1,
  trigger = "inView",
}) {
  const prefersReducedMotion = useReducedMotion();

  const pathAnimationProps =
    trigger === "parent"
      ? { animate: { pathLength: 1 } }
      : { whileInView: { pathLength: 1 }, viewport: { once: true, amount: "some" } };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={`block ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={`M1 ${height - 1} Q ${width / 2} 1 ${width - 1} ${height - 1}`}
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        {...pathAnimationProps}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration, delay, ease: [0.16, 1, 0.3, 1] }
        }
      />
    </svg>
  );
}
