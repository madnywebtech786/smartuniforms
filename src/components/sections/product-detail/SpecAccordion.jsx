"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

/**
 * Product spec accordion — same numbered/expand visual language as
 * ProductFilters.jsx's facet list, reused here rather than inventing a
 * second accordion pattern for the same site.
 */
export default function SpecAccordion({ product }) {
  const sections = [
    { label: "Fabric & Features", body: product.fabricType },
    { label: "Size & Fit", body: `${product.sizeRange} · ${product.garmentType}, ${product.sleeveLength.toLowerCase()}.` },
    { label: "Garment Care", body: product.garmentCare },
  ];

  const [openLabel, setOpenLabel] = useState(sections[0].label);

  return (
    <div className="divide-y divide-border border-t border-border">
      {sections.map((section, index) => {
        const isOpen = openLabel === section.label;
        return (
          <div key={section.label}>
            <button
              type="button"
              onClick={() => setOpenLabel(isOpen ? null : section.label)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 py-4 text-left"
            >
              <span className="font-display text-sm leading-none text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-sans text-sm font-semibold text-foreground">{section.label}</span>
              <Plus
                strokeWidth={1.75}
                className={`h-4 w-4 shrink-0 text-foreground/60 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
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
                  <p className="pb-4 pl-8 font-sans text-sm leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
