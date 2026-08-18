"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import ProductCard from "@/components/sections/products/ProductCard";
import ProductGallery from "@/components/sections/product-detail/ProductGallery";
import SpecAccordion from "@/components/sections/product-detail/SpecAccordion";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { PRODUCTS } from "@/lib/products";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

/**
 * /products/[slug] detail page. Colour selection is local UI state only
 * (no variant-specific imagery yet — see lib/images.js, one placeholder
 * photo per catalog item today) — selecting a swatch updates the shown
 * colour name but not the photo, same honesty-about-placeholder-data
 * approach as the rest of the catalog.
 *
 * `category` is looked up here (not passed from the server page) because
 * PRODUCTS entries carry a `icon` field that's a Lucide component
 * reference — a function — which can't cross the server/client boundary
 * as a prop. CATALOG_ITEMS/PRODUCTS are plain static data either
 * component can import directly, so there's no need to serialize it.
 */
export default function ProductDetail({ product }) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedColour, setSelectedColour] = useState(product.colours[0]);
  const category = PRODUCTS.find((entry) => entry.slug === product.categorySlug);

  const relatedItems = CATALOG_ITEMS.filter(
    (item) => item.categorySlug === product.categorySlug && item.slug !== product.slug
  );

  return (
    <main className="bg-background pt-28 pb-20 md:pt-32 md:pb-28">
      <Container>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground">
          <Link href="/products" className="transition-colors hover:text-foreground">
            Products
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3 w-3" strokeWidth={2} />
              <Link
                href={`/products?category=${category.slug}`}
                className="transition-colors hover:text-foreground"
              >
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3" strokeWidth={2} />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ProductGallery gallery={product.gallery} />
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            {category && (
              <motion.p
                variants={revealUp}
                transition={{ duration: 0.4, ease: EASE }}
                className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary"
              >
                {category.name}
              </motion.p>
            )}

            <motion.h1
              variants={revealUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-3 text-balance font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] text-foreground"
            >
              {product.name}
            </motion.h1>

            <motion.div variants={revealUp} transition={{ duration: 0.35, ease: EASE }} className="mt-4 w-20">
              <ThreadLine width={80} height={8} trigger="parent" className="w-20" />
            </motion.div>

            <motion.p
              variants={revealUp}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-5 max-w-md font-sans text-base leading-relaxed text-muted-foreground"
            >
              {product.description}
            </motion.p>

            <motion.div variants={revealUp} transition={{ duration: 0.4, ease: EASE }} className="mt-8">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Colour <span className="ml-1 font-normal normal-case text-foreground">{selectedColour.name}</span>
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                {product.colours.map((colour) => {
                  const isSelected = colour.name === selectedColour.name;
                  return (
                    <button
                      key={colour.name}
                      type="button"
                      onClick={() => setSelectedColour(colour)}
                      aria-label={colour.name}
                      aria-pressed={isSelected}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                        isSelected ? "border-primary" : "border-transparent hover:border-foreground/20"
                      }`}
                    >
                      <span
                        className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-foreground/15"
                        style={{ backgroundColor: colour.hex }}
                      >
                        {isSelected && (
                          <Check
                            className="h-3.5 w-3.5"
                            strokeWidth={3}
                            style={{ color: isLightColour(colour.hex) ? "#14130f" : "#ffffff" }}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              variants={revealUp}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 border-y border-dashed border-border py-4"
            >
              <SpecStat label="Sizes" value={product.sizeRange} />
              <SpecStat label="Gender" value={product.gender} />
              <SpecStat label="Sleeve" value={product.sleeveLength} />
            </motion.div>

            <motion.div variants={revealUp} transition={{ duration: 0.4, ease: EASE }} className="mt-6">
              <SpecAccordion product={product} />
            </motion.div>

            <motion.div variants={revealUp} transition={{ duration: 0.4, ease: EASE }} className="mt-8">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-9 py-4 text-center font-sans text-base font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground sm:w-auto"
              >
                Request a Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {relatedItems.length > 0 && (
          <div className="mt-24 border-t border-border pt-16">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              More from
            </p>
            <h2 className="mt-3 text-balance font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-foreground">
              {category ? <Highlight>{category.name}</Highlight> : "This category"}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
              {relatedItems.map((item) => (
                <ProductCard key={item.slug} product={item} className="w-full" />
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}

function SpecStat({ label, value }) {
  return (
    <div>
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-sans text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

// Cheap luminance check so the checkmark on a selected swatch stays
// legible against both light and dark colourways.
function isLightColour(hex) {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
