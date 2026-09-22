"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import ProductCard from "@/components/sections/products/ProductCard";
import ProductGallery from "@/components/sections/product-detail/ProductGallery";
import SpecAccordion from "@/components/sections/product-detail/SpecAccordion";
import CareInstructions from "@/components/sections/product-detail/CareInstructions";
import { NEW_PRODUCTS, NEW_CATEGORIES } from "@/lib/newProducts";
import { EASE_CINEMATIC as EASE, revealUp } from "@/lib/motion";

/**
 * /products/[slug] detail page. Colour selection is local UI state only
 * (no variant-specific imagery yet — see lib/images.js, one placeholder
 * photo per catalog item today) — selecting a swatch updates the shown
 * colour name but not the photo, same honesty-about-placeholder-data
 * approach as the rest of the catalog.
 *
 * Reads from lib/newProducts.js (real client data), not the legacy
 * lib/catalog.js + lib/products.js placeholder pair — see newProducts.js
 * for why. `category` is looked up here (not passed from the server page)
 * so this stays a plain client-side lookup over static data, consistent
 * with how the legacy version did it.
 */
export default function ProductDetail({ product }) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedColour, setSelectedColour] = useState(product.colours[0]);
  const category = NEW_CATEGORIES.find((entry) => entry.slug === product.categorySlug);

  // When the selected colour has its own real photo (colour.imageKey —
  // see lib/newProducts.js), show that instead of the product's default
  // gallery, so picking a swatch actually changes the picture. Falls
  // back to product.gallery for colours/products without a per-colour
  // photo, which is every product except the ones with real per-colour
  // photography extracted so far.
  const gallery = selectedColour.imageKey ? [selectedColour.imageKey] : product.gallery;

  const relatedItems = NEW_PRODUCTS.filter(
    (item) => item.subcategorySlug === product.subcategorySlug && item.slug !== product.slug
  );

  return (
    <main className="bg-background pt-28 pb-20 md:pt-32 md:pb-28">
      <Container>
        <div className="mt-6">
          <BackButton />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ProductGallery key={gallery.join(",")} gallery={gallery} />
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            {(category || product.subcategoryName) && (
              <motion.p
                variants={revealUp}
                transition={{ duration: 0.4, ease: EASE }}
                className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary"
              >
                {[category?.name, product.subcategoryName].filter(Boolean).join(" > ")}
              </motion.p>
            )}

            <motion.h1
              variants={revealUp}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-3 text-balance font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] text-foreground"
            >
              {product.style ?? product.name}
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
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
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

            <motion.div variants={revealUp} transition={{ duration: 0.4, ease: EASE }} className="mt-6">
              <SpecAccordion product={product} />
              <CareInstructions care={product.care} />
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
              {product.subcategoryName ? (
                <Highlight>{product.subcategoryName}</Highlight>
              ) : category ? (
                <Highlight>{category.name}</Highlight>
              ) : (
                "This category"
              )}
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

// Back button, replacing the old breadcrumb trail. Prefers router.back()
// so a visitor who arrived from a filtered/searched /products?... view
// lands back on that exact result set (filters live in the URL, see
// ProductCatalog.jsx) rather than a plain Link href="/products" resetting
// them. Falls back to a normal link when there's no in-app catalog visit
// to go back to (e.g. landing here directly from an external link or a
// new tab), since router.back() would otherwise leave the site or land
// somewhere unrelated.
function BackButton() {
  const router = useRouter();
  const [cameFromCatalog, setCameFromCatalog] = useState(false);

  useEffect(() => {
    setCameFromCatalog(sessionStorage.getItem("cameFromCatalog") === "1");
  }, []);

  const className =
    "group inline-flex items-center gap-2 font-sans text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground";

  if (cameFromCatalog) {
    return (
      <button type="button" onClick={() => router.back()} className={className}>
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
        Back
      </button>
    );
  }

  return (
    <Link href="/products" className={className}>
      <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
      Back to Products
    </Link>
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
