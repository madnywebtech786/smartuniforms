"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check } from "lucide-react";
import { FACETS } from "@/components/sections/product-catalog/filters";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

/**
 * The catalog's spec-sheet filter panel — styled as a docket rather than
 * a generic e-commerce facet list, matching the numbered/dashed-rule
 * vocabulary already established in ProductCard and WhyChooseUs. Each
 * facet is its own numbered entry that expands to show its checkable
 * options; only one is expanded at a time to keep the panel scannable at
 * a fixed sidebar width.
 */
export default function ProductFilters({ activeFilters, activeCount, onToggle, onClearAll }) {
  const [openFacet, setOpenFacet] = useState(FACETS[0].key);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-foreground/15 pb-4">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Filter Garments
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="font-sans text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <div className="divide-y divide-border">
        {FACETS.map((facet, index) => {
          const isOpen = openFacet === facet.key;
          const selectedCount = activeFilters[facet.key].length;

          return (
            <div key={facet.key}>
              <button
                type="button"
                onClick={() => setOpenFacet(isOpen ? null : facet.key)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="font-display text-sm leading-none text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-sans text-sm font-semibold text-foreground">
                  {facet.label}
                  {selectedCount > 0 && (
                    <span className="ml-2 font-sans text-xs font-normal text-muted-foreground">
                      ({selectedCount})
                    </span>
                  )}
                </span>
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
                    <ul className="flex flex-col gap-3 pb-5 pl-8">
                      {facet.options.map((option) => {
                        const isSelected = activeFilters[facet.key].includes(option.value);
                        return (
                          <li key={option.value}>
                            <button
                              type="button"
                              onClick={() => onToggle(facet.key, option.value)}
                              aria-pressed={isSelected}
                              className="group flex w-full items-center gap-3 text-left"
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-200 ${
                                  isSelected
                                    ? "border-primary bg-primary"
                                    : "border-foreground/25 group-hover:border-foreground/50"
                                }`}
                              >
                                {isSelected && (
                                  <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                                )}
                              </span>
                              {option.hex && (
                                <span
                                  className="h-3.5 w-3.5 shrink-0 rounded-full border border-foreground/15"
                                  style={{ backgroundColor: option.hex }}
                                  aria-hidden="true"
                                />
                              )}
                              <span
                                className={`font-sans text-sm transition-colors duration-200 ${
                                  isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                }`}
                              >
                                {option.label}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
