"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, SlidersHorizontal } from "lucide-react";
import Container from "@/components/shared/Container";
import ProductCard from "@/components/sections/products/ProductCard";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";
import { FACETS, matchesFilters } from "@/components/sections/product-catalog/filters";
import ProductFilters from "@/components/sections/product-catalog/ProductFilters";

const EMPTY_FILTERS = Object.fromEntries(FACETS.map((facet) => [facet.key, []]));

/**
 * Owns the catalog's filter state and composes the sidebar + result grid.
 * A client component because filtering is inherently interactive state;
 * the page shell around it (app/products/page.js) stays a server
 * component so the route's static shell still renders on the server.
 *
 * Filtering is a plain client-side array filter over CATALOG_ITEMS — the
 * whole catalog is 6 items today, so there's no case for query params,
 * pagination, or a search index yet. Revisit once the real catalog size
 * is known.
 */
export default function ProductCatalog() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilters, setActiveFilters] = useState(EMPTY_FILTERS);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const results = useMemo(
    () => CATALOG_ITEMS.filter((item) => matchesFilters(item, activeFilters)),
    [activeFilters]
  );

  const activeCount = Object.values(activeFilters).reduce((sum, values) => sum + values.length, 0);

  const toggleValue = (facetKey, value) => {
    setActiveFilters((current) => {
      const selected = current[facetKey];
      const next = selected.includes(value)
        ? selected.filter((entry) => entry !== value)
        : [...selected, value];
      return { ...current, [facetKey]: next };
    });
  };

  const clearAll = () => setActiveFilters(EMPTY_FILTERS);

  return (
    <Container as="div" className="py-10 md:py-14">
      <div className="flex items-center justify-between gap-4 lg:hidden">
        <p className="font-sans text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "garment" : "garments"}
        </p>
        <button
          type="button"
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 font-sans text-sm font-semibold text-foreground"
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary font-sans text-[11px] font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-0 lg:grid-cols-[260px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-28">
            <ProductFilters
              activeFilters={activeFilters}
              activeCount={activeCount}
              onToggle={toggleValue}
              onClearAll={clearAll}
            />
          </div>
        </aside>

        <div>
          <p className="hidden font-sans text-sm text-muted-foreground lg:block">
            {results.length} {results.length === 1 ? "garment" : "garments"}
          </p>

          {results.length === 0 ? (
            <EmptyState onClearAll={clearAll} />
          ) : (
            <motion.div
              key={results.map((item) => item.slug).join(",")}
              initial={prefersReducedMotion ? false : "hidden"}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:mt-8"
            >
              {results.map((product) => (
                <motion.div key={product.slug} variants={revealUp} transition={{ duration: 0.4, ease: EASE }}>
                  <ProductCard product={product} className="w-full" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <MobileFilterSheet onClose={() => setIsMobileFiltersOpen(false)}>
            <ProductFilters
              activeFilters={activeFilters}
              activeCount={activeCount}
              onToggle={toggleValue}
              onClearAll={clearAll}
            />
          </MobileFilterSheet>
        )}
      </AnimatePresence>
    </Container>
  );
}

function EmptyState({ onClearAll }) {
  return (
    <div className="mt-6 flex flex-col items-start gap-4 border-t border-dashed border-border py-16 lg:mt-8">
      <p className="font-display text-2xl text-foreground">No garments match those filters.</p>
      <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
        Try clearing a filter or two — our full catalog spans administration, health, security,
        industrial, and hospitality wear.
      </p>
      <button
        type="button"
        onClick={onClearAll}
        className="rounded-full bg-foreground px-6 py-2.5 font-sans text-sm font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
      >
        Clear all filters
      </button>
    </div>
  );
}

function MobileFilterSheet({ onClose, children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-foreground/40 lg:hidden"
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Filter garments"
        initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
        animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
        transition={{ duration: 0.35, ease: EASE }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-background px-6 py-6 lg:hidden"
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-xl text-foreground">Filters</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </motion.div>
    </>
  );
}
