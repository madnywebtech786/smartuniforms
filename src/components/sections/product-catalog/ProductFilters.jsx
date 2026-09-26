"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check, ChevronDown } from "lucide-react";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

/**
 * The catalog's spec-sheet filter panel — styled as a docket rather than
 * a generic e-commerce facet list, matching the numbered/dashed-rule
 * vocabulary already established in ProductCard and WhyChooseUs. Each
 * top-level facet (Category, Colour) is its own numbered entry that
 * expands to show its checkable options; only one top-level facet is
 * expanded at a time to keep the panel scannable at a fixed sidebar
 * width.
 *
 * The Category facet is itself two levels (see filters.js's
 * groupSubcategoriesByCategory): once expanded, it renders one row per
 * parent category (e.g. "Health Wear"), each independently expandable to
 * reveal that parent's subcategory checkboxes (e.g. "Unisex Scrub
 * Pant"). Several parent rows can be open at once — unlike the top-level
 * facet accordion, there's no reason to force choosing between "Health
 * Wear" and "Industrial" just to see their subcategories. Selecting a
 * subcategory checkbox is what actually filters; the parent row is pure
 * navigation and shows a count of how many of its own subcategories are
 * currently selected so a collapsed parent still communicates state.
 */
export default function ProductFilters({ facets, activeFilters, activeCount, onToggle, onClearAll }) {
  const [openFacet, setOpenFacet] = useState(facets[0].key);

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
        {facets.map((facet, index) => {
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
                    {facet.isGrouped ? (
                      <GroupedFacetOptions facet={facet} activeFilters={activeFilters} onToggle={onToggle} />
                    ) : (
                      <FlatFacetOptions facet={facet} activeFilters={activeFilters} onToggle={onToggle} />
                    )}
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

function FlatFacetOptions({ facet, activeFilters, onToggle }) {
  return (
    <ul className="flex flex-col gap-3 pb-5 pl-8">
      {facet.options.map((option) => {
        const isSelected = activeFilters[facet.key].includes(option.value);
        return (
          <li key={option.value}>
            <OptionCheckbox
              isSelected={isSelected}
              onClick={() => onToggle(facet.key, option.value)}
              hex={option.hex}
              label={option.label}
            />
          </li>
        );
      })}
    </ul>
  );
}

function GroupedFacetOptions({ facet, activeFilters, onToggle }) {
  const [openGroups, setOpenGroups] = useState(() => new Set([facet.options[0]?.value]));

  const toggleGroup = (value) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <ul className="flex flex-col gap-1 pb-5 pl-8">
      {facet.options.map((category) => {
        const isGroupOpen = openGroups.has(category.value);
        const selectedInGroup = category.subcategories.filter((sub) =>
          activeFilters[facet.key].includes(sub.value)
        ).length;

        return (
          <li key={category.value} className="border-b border-dashed border-border last:border-b-0">
            <button
              type="button"
              onClick={() => toggleGroup(category.value)}
              aria-expanded={isGroupOpen}
              className="flex w-full items-center gap-2 py-2.5 text-left"
            >
              <ChevronDown
                strokeWidth={1.75}
                className={`h-3.5 w-3.5 shrink-0 text-foreground/50 transition-transform duration-250 ${
                  isGroupOpen ? "rotate-180" : ""
                }`}
              />
              <span className="flex-1 font-sans text-sm font-semibold text-foreground">
                {category.label}
                {selectedInGroup > 0 && (
                  <span className="ml-2 font-sans text-xs font-normal text-primary">({selectedInGroup})</span>
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isGroupOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-col gap-3 py-1 pb-4 pl-5.5">
                    {category.subcategories.map((sub) => {
                      const isSelected = activeFilters[facet.key].includes(sub.value);
                      return (
                        <li key={sub.value}>
                          <OptionCheckbox
                            isSelected={isSelected}
                            onClick={() => onToggle(facet.key, sub.value)}
                            label={sub.label}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function OptionCheckbox({ isSelected, onClick, label, hex }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={isSelected} className="group flex w-full items-center gap-3 text-left">
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-200 ${
          isSelected ? "border-primary bg-primary" : "border-foreground/25 group-hover:border-foreground/50"
        }`}
      >
        {isSelected && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
      </span>
      {hex && (
        <span
          className="h-3.5 w-3.5 shrink-0 rounded-full border border-foreground/15"
          style={{ backgroundColor: hex }}
          aria-hidden="true"
        />
      )}
      <span
        className={`font-sans text-sm transition-colors duration-200 ${
          isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
