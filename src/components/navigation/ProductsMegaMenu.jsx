"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { PRODUCTS } from "@/lib/products";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

/**
 * Desktop mega-menu for the header's "Products" link. Layout follows the
 * client's reference image exactly: a horizontal category row across the
 * top, and a light-grey panel below with a "View All" column plus that
 * category's items — no description copy, matching the reference's plain
 * link-column structure. The reference's other facet columns (Garment
 * Type, Fabric Type, Sleeve Length, Brand) aren't reproduced: CATALOG_ITEMS
 * only has one item per category today, so those would each render a
 * single fake-looking option — can be added once the catalog has enough
 * items per category for them to be real.
 */
export default function ProductsMegaMenu({ isOpen, onNavigate }) {
  const [activeSlug, setActiveSlug] = useState(PRODUCTS[0].slug);
  const activeCategory = PRODUCTS.find((category) => category.slug === activeSlug) ?? PRODUCTS[0];
  const items = CATALOG_ITEMS.filter((item) => item.categorySlug === activeCategory.slug);

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
                {PRODUCTS.map((category) => {
                  const isActive = category.slug === activeSlug;
                  return (
                    <li key={category.slug}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveSlug(category.slug)}
                        onFocus={() => setActiveSlug(category.slug)}
                        className={`font-sans text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                          isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                        }`}
                      >
                        {category.name}
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
                key={activeCategory.slug}
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
                    href={`/products?category=${activeCategory.slug}`}
                    onClick={onNavigate}
                    className="mt-3 block font-sans text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {activeCategory.name}
                  </Link>
                </div>

                {items.length > 0 && (
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                      Items
                    </p>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={onNavigate}
                            className="font-sans text-sm text-foreground/80 transition-colors hover:text-primary"
                          >
                            {item.name}
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
