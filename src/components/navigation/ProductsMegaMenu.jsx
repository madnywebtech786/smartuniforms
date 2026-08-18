"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/Container";
import { PRODUCTS } from "@/lib/products";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { STOCK_IMAGES } from "@/lib/images";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

// Rail hover switches the active category after this settles, rather than
// on every mouseenter — without it, sweeping the cursor down the rail
// fires a content remount per row passed over, which reads as jittery
// rather than smooth.
const RAIL_HOVER_DELAY_MS = 90;

/**
 * Desktop mega-menu for the header's "Products" link — a left rail of the
 * 6 categories (lib/products.js) and a right pane listing that category's
 * items (lib/catalog.js, matched by categorySlug). Open/close is owned by
 * the parent (SiteHeader) via `isOpen`/hover-intent handlers passed down,
 * so there's one shared close-delay timer rather than the trigger and
 * panel racing two independent ones.
 */
export default function ProductsMegaMenu({ isOpen, onNavigate }) {
  const [activeSlug, setActiveSlug] = useState(PRODUCTS[0].slug);
  const railTimer = useRef(null);
  const activeCategory = PRODUCTS.find((category) => category.slug === activeSlug) ?? PRODUCTS[0];
  const items = CATALOG_ITEMS.filter((item) => item.categorySlug === activeCategory.slug);
  const previewImage = STOCK_IMAGES[activeCategory.imageKey];

  const setActiveSlugDebounced = (slug) => {
    clearTimeout(railTimer.current);
    railTimer.current = setTimeout(() => setActiveSlug(slug), RAIL_HOVER_DELAY_MS);
  };

  useEffect(() => () => clearTimeout(railTimer.current), []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="absolute inset-x-0 top-full border-b border-border bg-background shadow-[0_24px_48px_-24px_rgba(20,19,15,0.18)]"
        >
          <Container className="grid grid-cols-[240px_1fr_260px] gap-8 py-10">
            <ul className="flex flex-col gap-1 border-r border-border pr-8">
              {PRODUCTS.map((category) => {
                const Icon = category.icon;
                const isActive = category.slug === activeSlug;
                return (
                  <li key={category.slug}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveSlugDebounced(category.slug)}
                      onFocus={() => setActiveSlug(category.slug)}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-200 ${
                        isActive ? "bg-surface text-foreground" : "text-foreground/70 hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      <Icon
                        strokeWidth={1.5}
                        className={`h-4.5 w-4.5 shrink-0 transition-colors duration-200 ${
                          isActive ? "text-primary" : "text-foreground/40 group-hover:text-primary"
                        }`}
                      />
                      <span className="font-sans text-sm font-medium">{category.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div>
              <motion.div
                key={activeCategory.slug}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {activeCategory.name}
                </p>
                <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
                  {activeCategory.description}
                </p>

                <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                  {items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={onNavigate}
                        className="group inline-flex items-start gap-1 font-sans text-sm text-foreground/80 transition-colors hover:text-primary"
                      >
                        {item.name}
                        <ArrowUpRight
                          strokeWidth={1.75}
                          className="h-3.5 w-3.5 shrink-0 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-1 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/products?category=${activeCategory.slug}`}
                  onClick={onNavigate}
                  className="group mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  View all {activeCategory.name}
                  <ArrowRight
                    strokeWidth={1.75}
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>

            <motion.div
              key={activeCategory.slug}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative aspect-4/5 w-full overflow-hidden rounded-xl"
            >
              <Image
                src={previewImage.src}
                alt={previewImage.alt}
                fill
                sizes="260px"
                className="object-cover"
              />
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
