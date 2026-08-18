import { PRODUCTS } from "@/lib/products";
import { CATALOG_ITEMS } from "@/lib/catalog";

/**
 * Facet definitions for the /products catalog filter sidebar. Each facet
 * reads its option list directly from CATALOG_ITEMS/PRODUCTS rather than
 * a hardcoded list, so adding a new item or category automatically
 * surfaces as a filter option with no changes needed here.
 *
 * Deliberately 5 facets, not the reference site's 6: fabricType is a
 * unique free-text spec per item (faceting it would produce one filter
 * per item), and this business manufactures in-house rather than
 * reselling third-party lines, so "Brand" has no real referent — both
 * were dropped rather than faked. See catalog.js for the full rationale.
 */
export const FACETS = [
  {
    key: "categorySlug",
    label: "Category",
    options: PRODUCTS.map((category) => ({ value: category.slug, label: category.name })),
  },
  {
    key: "colours",
    label: "Colour",
    isMultiValue: true,
    options: dedupeColours(CATALOG_ITEMS),
  },
  {
    key: "gender",
    label: "Gender",
    options: uniqueValues(CATALOG_ITEMS, "gender"),
  },
  {
    key: "garmentType",
    label: "Garment Type",
    options: uniqueValues(CATALOG_ITEMS, "garmentType"),
  },
  {
    key: "sleeveLength",
    label: "Sleeve Length",
    options: uniqueValues(CATALOG_ITEMS, "sleeveLength"),
  },
];

function uniqueValues(items, field) {
  const seen = new Set();
  const options = [];
  for (const item of items) {
    if (!seen.has(item[field])) {
      seen.add(item[field]);
      options.push({ value: item[field], label: item[field] });
    }
  }
  return options;
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
 * active selection).
 */
export function matchesFilters(item, activeFilters) {
  return FACETS.every((facet) => {
    const selected = activeFilters[facet.key];
    if (!selected || selected.length === 0) return true;

    if (facet.isMultiValue) {
      const itemValues = item[facet.key].map((colour) => colour.name);
      return selected.some((value) => itemValues.includes(value));
    }

    return selected.includes(item[facet.key]);
  });
}
