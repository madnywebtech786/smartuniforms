"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, SlidersHorizontal, Search } from "lucide-react";
import Container from "@/components/shared/Container";
import ProductCard from "@/components/sections/products/ProductCard";
import { NEW_PRODUCTS } from "@/lib/newProducts";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";
import {
  buildFacets,
  matchesFilters,
  matchesSearch,
  subcategorySlugsForCategory,
} from "@/components/sections/product-catalog/filters";
import ProductFilters from "@/components/sections/product-catalog/ProductFilters";

const PAGE_SIZE = 15;
const SEARCH_PARAM = "q";
const CATEGORY_PARAM = "category";

/**
 * Reads active filters + search query out of the URL's query string, so a
 * link to /products?category=...&q=... (e.g. from a product detail page's
 * "Products" breadcrumb, or a bookmarked/shared filtered view) opens with
 * that exact selection already applied, instead of always starting from
 * an empty filter set. Each facet gets its own query param named after
 * the facet's key; values are comma-separated since a facet can have
 * several selections at once.
 *
 * `category` is a separate, broader param (not one of `facets`) for links
 * that only know the parent NEW_CATEGORIES slug (e.g. the homepage
 * Categories cards, the mega-menu's "View All") rather than a specific
 * subcategorySlug — it expands to every subcategory under that parent via
 * subcategorySlugsForCategory, merged into the subcategorySlug facet
 * rather than replacing an explicit subcategorySlug selection.
 */
function filtersFromSearchParams(searchParams, facets, emptyFilters) {
  const filters = { ...emptyFilters };
  for (const facet of facets) {
    const raw = searchParams.get(facet.key);
    filters[facet.key] = raw ? raw.split(",").filter(Boolean) : [];
  }

  const category = searchParams.get(CATEGORY_PARAM);
  if (category) {
    const subcategorySlugs = subcategorySlugsForCategory(category);
    filters.subcategorySlug = Array.from(
      new Set([...filters.subcategorySlug, ...subcategorySlugs])
    );
  }

  return filters;
}

function buildQueryString(filters, searchQuery, facets) {
  const params = new URLSearchParams();
  for (const facet of facets) {
    const values = filters[facet.key];
    if (values.length > 0) params.set(facet.key, values.join(","));
  }
  if (searchQuery.trim()) params.set(SEARCH_PARAM, searchQuery);
  const query = params.toString();
  return query ? `?${query}` : "";
}

/**
 * Owns the catalog's filter state and composes the sidebar + result grid.
 * A client component because filtering is inherently interactive state;
 * the page shell around it (app/products/page.js, app/accessories/page.js)
 * stays a server component so the route's static shell still renders on
 * the server.
 *
 * `products` defaults to the full real catalog (lib/newProducts.js) and
 * `basePath` to "/products" — passing a narrower `products` list (e.g.
 * /accessories passing only its own category's products) scopes both the
 * result set AND the sidebar's facet options (via buildFacets) to that
 * subset, while reusing the exact same search/filter/pagination UI and
 * behavior as the full catalog. `basePath` is where filter/search changes
 * write the URL, so a scoped catalog keeps its own route rather than
 * silently redirecting to /products.
 *
 * Filtering is a plain client-side array filter — the catalog is under
 * 100 items today, so there's no case for a real search index yet.
 * Revisit once the real catalog size is known.
 *
 * Search and facet filters combine (AND) via matchesSearch/matchesFilters
 * in filters.js — a query narrows within whatever the sidebar has already
 * selected, rather than being a second, separate way to filter.
 *
 * Active filters + search query live in the URL's query string (see
 * filtersFromSearchParams/buildQueryString below), not local useState —
 * so navigating to a product's detail page and back (browser back, or the
 * detail page's "Products" breadcrumb, see ProductDetail.jsx's
 * BackToProductsLink) restores the exact filtered/searched view instead of
 * resetting to an empty catalog. Filter/search changes use router.replace
 * (not push) so narrowing results doesn't spam browser history with one
 * entry per click.
 *
 * Results are shown 15 at a time ("Show More" click reveals 15 more)
 * rather than all at once or real pagination — simplest way to keep the
 * initial grid short with a catalog this size, and avoids page-number UI
 * for a flat, single-page browse. `visibleCount` resets to PAGE_SIZE
 * whenever the filtered/searched result set changes (new filter, new
 * search query) so a narrower result never opens already scrolled past
 * its own first page.
 */
export default function ProductCatalog({ products = NEW_PRODUCTS, basePath = "/products" }) {
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const searchParams = useSearchParams();

  const facets = useMemo(() => buildFacets(products), [products]);
  const emptyFilters = useMemo(
    () => Object.fromEntries(facets.map((facet) => [facet.key, []])),
    [facets]
  );

  const activeFilters = useMemo(
    () => filtersFromSearchParams(searchParams, facets, emptyFilters),
    [searchParams, facets, emptyFilters]
  );
  const searchQuery = searchParams.get(SEARCH_PARAM) ?? "";
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Marks that this browser tab has an in-app catalog visit in its
  // history, so a product detail page's "Products" breadcrumb
  // (BackToProductsLink in ProductDetail.jsx) knows router.back() will
  // land here rather than off-site — see that component for why a plain
  // Link isn't enough on its own.
  useEffect(() => {
    sessionStorage.setItem("cameFromCatalog", "1");
  }, []);

  const results = useMemo(
    () =>
      products.filter(
        (item) => matchesFilters(item, activeFilters, facets) && matchesSearch(item, searchQuery)
      ),
    [products, activeFilters, searchQuery, facets]
  );

  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  const activeCount = Object.values(activeFilters).reduce((sum, values) => sum + values.length, 0);

  // Replaces (not pushes) the URL on every filter/search change, so
  // narrowing results doesn't fill browser history with one entry per
  // click — only the final selection is a history entry, which is what
  // the back button from a product detail page should land back on.
  const navigate = useCallback(
    (nextFilters, nextSearchQuery) => {
      router.replace(`${basePath}${buildQueryString(nextFilters, nextSearchQuery, facets)}`, {
        scroll: false,
      });
    },
    [router, basePath, facets]
  );

  const toggleValue = (facetKey, value) => {
    const selected = activeFilters[facetKey];
    const nextValues = selected.includes(value)
      ? selected.filter((entry) => entry !== value)
      : [...selected, value];
    navigate({ ...activeFilters, [facetKey]: nextValues }, searchQuery);
    setVisibleCount(PAGE_SIZE);
  };

  const clearAll = () => {
    navigate(emptyFilters, "");
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearchChange = (event) => {
    navigate(activeFilters, event.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <Container as="div" className="py-10 md:py-14">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.75}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name, style code, or colour…"
          aria-label="Search garments"
          className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 font-sans text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/60 focus:border-primary"
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
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

      <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-8 lg:grid-cols-[260px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <ProductFilters
            facets={facets}
            activeFilters={activeFilters}
            activeCount={activeCount}
            onToggle={toggleValue}
            onClearAll={clearAll}
          />
        </aside>

        <div>
          <p className="hidden font-sans text-sm text-muted-foreground lg:block">
            {results.length} {results.length === 1 ? "garment" : "garments"}
          </p>

          {results.length === 0 ? (
            <EmptyState onClearAll={clearAll} hasSearch={searchQuery.trim().length > 0} />
          ) : (
            <>
              <motion.div
                key={results.map((item) => item.slug).join(",")}
                initial={prefersReducedMotion ? false : "hidden"}
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:mt-8"
              >
                {visibleResults.map((product) => (
                  <motion.div key={product.slug} variants={revealUp} transition={{ duration: 0.4, ease: EASE }}>
                    <ProductCard product={product} className="w-full" />
                  </motion.div>
                ))}
              </motion.div>

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
                    className="group rounded-full bg-primary px-8 py-3 font-sans text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-foreground hover:text-white"
                  >
                    Show More
                    <span className="ml-2 text-primary-foreground/70 transition-colors duration-300 group-hover:text-white/70">
                      ({visibleResults.length} of {results.length})
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <MobileFilterSheet onClose={() => setIsMobileFiltersOpen(false)}>
            <ProductFilters
              facets={facets}
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

function EmptyState({ onClearAll, hasSearch }) {
  return (
    <div className="mt-6 flex flex-col items-start gap-4 border-t border-dashed border-border py-16 lg:mt-8">
      <p className="font-display text-2xl text-foreground">
        {hasSearch ? "No garments match that search." : "No garments match those filters."}
      </p>
      <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
        {hasSearch
          ? "Try a different name, style code, or colour, or clear your search to see the rest of the catalog."
          : "Try clearing a filter or two to see the rest of the catalog."}
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
