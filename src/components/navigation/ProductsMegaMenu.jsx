"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { FACETS } from "@/components/sections/product-catalog/filters";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

// Category facet's grouped options already carry, per NEW_CATEGORIES
// parent, the list of real subcategories that have at least one product
// (see filters.js's groupSubcategoriesByCategory) — reused here instead
// of recomputing the same grouping a second time.
const CATEGORY_GROUPS = FACETS[0].options;

/**
 * Desktop mega-menu for the header's "Products" link. Layout follows the
 * client's reference image: a horizontal category row across the top,
 * and a light-grey panel below with a "View All" column plus that
 * category's real subcategories (garment types) as the items column —
 * not individual products, since a category can hold dozens of real
 * products across several subcategories (e.g. Industrial: 40 products,
 * 8 subcategories) and a flat product list would overflow the panel.
 * Each subcategory link goes to /products?subcategorySlug=X, the exact
 * param ProductCatalog.jsx's filters.js already reads.
 */
export default function ProductsMegaMenu({ isOpen, onNavigate }) {
  const [activeSlug, setActiveSlug] = useState(CATEGORY_GROUPS[0].value);
  const activeCategory =
    CATEGORY_GROUPS.find((category) => category.value === activeSlug) ?? CATEGORY_GROUPS[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="absolute inset-x-0 top-full border-b border-border shadow-[0_24px_48px_-24px_rgba(20,19,15,0.28)]"
        >
          {/* Category row — the reference's horizontal top-level bar,
              reproduced here as the panel's own row since "Products"
              stays the single nav trigger rather than splitting into 6
              separate top-level nav items. */}
          <div className="border-b border-border bg-white">
            <Container>
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-1 py-4">
                {CATEGORY_GROUPS.map((category) => {
                  const isActive = category.value === activeSlug;
                  return (
                    <li key={category.value}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveSlug(category.value)}
                        onFocus={() => setActiveSlug(category.value)}
                        className={`font-sans text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                          isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                        }`}
                      >
                        {category.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </div>

          {/* Active category's link columns */}
          <div className="bg-surface">
            <Container>
              <motion.div
                key={activeCategory.value}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex flex-wrap gap-x-16 gap-y-8 py-8"
              >
                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                    View All
                  </p>
                  <Link
                    href={`/products?category=${activeCategory.value}`}
                    onClick={onNavigate}
                    className="mt-3 block font-sans text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {activeCategory.label}
                  </Link>
                </div>

                {activeCategory.subcategories.length > 0 && (
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                      Shop By Type
                    </p>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {activeCategory.subcategories.map((subcategory) => (
                        <li key={subcategory.value}>
                          <Link
                            href={`/products?subcategorySlug=${subcategory.value}`}
                            onClick={onNavigate}
                            className="font-sans text-sm text-foreground/80 transition-colors hover:text-primary"
                          >
                            {subcategory.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </Container>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
