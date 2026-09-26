import { NEW_PRODUCTS, NEW_CATEGORIES } from "@/lib/newProducts";

/**
 * Facet definitions for a catalog filter sidebar. Each facet reads its
 * option list directly from the given product set rather than a
 * hardcoded list, so adding a new item or subcategory automatically
 * surfaces as a filter option with no changes needed here.
 *
 * The Category facet still filters on subcategorySlug (e.g. "Unisex
 * Scrub Pant"), not the parent NEW_CATEGORIES entry (e.g. "Health
 * Wear") — a style code only means something next to its garment type.
 * But with 6 parent categories and 23 subcategories, a flat subcategory
 * list is no longer scannable, so `options` is now grouped: each entry
 * is a parent category carrying its own `subcategories` array, rather
 * than one flat list of 23 rows. ProductFilters.jsx renders this as a
 * nested accordion (parent expands to reveal its subcategory
 * checkboxes) instead of the single-level list used before. Selection
 * still stores subcategorySlug values (matchesFilters is unchanged) —
 * only the sidebar's grouping/presentation changed.
 *
 * Only Category and Colour are faceted here, unlike the legacy
 * placeholder catalog's 5 fixed facets: real items carry a flexible
 * `specs` list rather than shared fields like gender/garmentType/
 * sleeveLength (see lib/newProducts.js), so there's no fixed field to
 * facet on yet. Revisit once enough real categories exist to know which
 * spec labels are common enough across items to facet on.
 *
 * `buildFacets(items)` lets a page scope the sidebar to a subset of the
 * catalog (e.g. /accessories building facets from only its own category's
 * products, so its Category facet only ever offers Accessories'
 * subcategories) instead of always faceting the entire catalog. `FACETS`
 * stays exported as the full-catalog default for /products and any nav
 * component (ProductsMegaMenu.jsx, MobileNav.jsx) that needs every real
 * category regardless of which page it renders in.
 */
export function buildFacets(items) {
  return [
    {
      key: "subcategorySlug",
      label: "Category",
      isGrouped: true,
      options: groupSubcategoriesByCategory(items),
    },
    {
      key: "colours",
      label: "Colour",
      isMultiValue: true,
      options: dedupeColours(items),
    },
  ];
}

export const FACETS = buildFacets(NEW_PRODUCTS);

/**
 * Every subcategorySlug that belongs to a given parent NEW_CATEGORIES slug
 * (e.g. "health-wear" -> ["unisex-scrub-pant", "unisex-scrub-top", ...]).
 * Lets a link that only knows the broad parent category (the homepage
 * Categories cards, the mega-menu's "View All") pre-select every matching
 * subcategory in the Category facet, without inventing a second,
 * separate "parent category" facet alongside the existing
 * subcategorySlug-based one.
 */
export function subcategorySlugsForCategory(categorySlug) {
  return NEW_PRODUCTS.filter((item) => item.categorySlug === categorySlug).map(
    (item) => item.subcategorySlug
  );
}

/**
 * One entry per NEW_CATEGORIES parent (in NEW_CATEGORIES order), each
 * carrying only the subcategories that actually have products, in
 * first-seen order. A parent with zero matching products (e.g.
 * "corporate-wear" as of 2026-09-26, reserved for future products) is
 * still included with an empty `subcategories` array — client wants an
 * empty category visibly listed (an expandable-but-empty accordion row
 * in ProductFilters.jsx, a "View all" link with no items in
 * ProductsMegaMenu.jsx/MobileNav.jsx) rather than silently hidden, so a
 * real category that just doesn't have products yet doesn't read as
 * missing/broken.
 */
function groupSubcategoriesByCategory(items) {
  const subcategoriesByCategory = new Map();
  for (const item of items) {
    if (!subcategoriesByCategory.has(item.categorySlug)) {
      subcategoriesByCategory.set(item.categorySlug, new Map());
    }
    const subcategories = subcategoriesByCategory.get(item.categorySlug);
    if (!subcategories.has(item.subcategorySlug)) {
      subcategories.set(item.subcategorySlug, { value: item.subcategorySlug, label: item.subcategoryName });
    }
  }

  return NEW_CATEGORIES.map((category) => ({
    value: category.slug,
    label: category.name,
    subcategories: Array.from(subcategoriesByCategory.get(category.slug)?.values() ?? []),
  }));
}

function dedupeColours(items) {
  const seen = new Map();
  for (const item of items) {
    for (const colour of item.colours) {
      if (!seen.has(colour.name)) {
        seen.set(colour.name, { value: colour.name, label: colour.name, hex: colour.hex });
      }
    }
  }
  return Array.from(seen.values());
}

/**
 * Returns true if `item` matches every active facet selection. Each
 * facet's selected values are OR'd together (any match passes that
 * facet); facets are AND'd together (must pass every facet with an
 * active selection). `facets` defaults to the full-catalog FACETS but
 * accepts a scoped buildFacets() result too — both use the same two
 * facet keys (subcategorySlug, colours), so the matching logic itself
 * doesn't change, only which options a page's sidebar offered.
 */
export function matchesFilters(item, activeFilters, facets = FACETS) {
  return facets.every((facet) => {
    const selected = activeFilters[facet.key];
    if (!selected || selected.length === 0) return true;

    if (facet.isMultiValue) {
      const itemValues = item[facet.key].map((colour) => colour.name);
      return selected.some((value) => itemValues.includes(value));
    }

    return selected.includes(item[facet.key]);
  });
}

/**
 * Returns true if `item` matches a free-text search query — checked
 * against name, style code, subcategory name, and colour names, since
 * those are what a real query is likely to name (e.g. "SPB-122",
 * "scrub top", "navy"). ANDs with matchesFilters in ProductCatalog.jsx,
 * so search and facets narrow the result set together rather than as
 * two separate ways to filter.
 */
export function matchesSearch(item, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [item.name, item.style, item.subcategoryName, ...item.colours.map((colour) => colour.name)]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}
