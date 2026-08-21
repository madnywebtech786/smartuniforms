"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

const STATIC_LINKS = [{ href: "/", label: "Home" },{ href: "/about", label: "About" }];
const POST_PRODUCTS_LINKS = [{ href: "/contact", label: "Contact" }];

/**
 * Full-screen mobile nav drawer. Products renders as a 3-level nested
 * accordion (Products -> category -> catalog items) rather than the
 * desktop mega-menu's hover panel, since hover-intent has no mobile
 * equivalent — matches the client's ask for accordions on mobile
 * specifically. Each level tracks its own open/closed state
 * independently so a category can stay expanded while switching between
 * its sibling categories' items.
 */
export default function MobileNav({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col overflow-y-auto bg-background pt-6 pb-10 lg:hidden"
          >
            <div className="flex justify-end px-6">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
              >
                <X strokeWidth={1.75} className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Primary" className="mt-12 flex flex-col px-6">
              {STATIC_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="border-b border-border py-4 font-sans text-base font-medium text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <ProductsAccordion onNavigate={onClose} />
              {POST_PRODUCTS_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="border-b border-border py-4 font-sans text-base font-medium text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={onClose}
                className="mt-8 rounded-full bg-foreground px-6 py-3.5 text-center font-sans text-sm font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                Request a Quote
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ProductsAccordion({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-sans text-base font-medium text-foreground">Products</span>
        <Plus
          strokeWidth={1.75}
          className={`h-4 w-4 text-foreground/60 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
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
            <ul className="flex flex-col gap-1 pb-4 pl-4">
              {PRODUCTS.map((category) => (
                <CategoryAccordion key={category.slug} category={category} onNavigate={onNavigate} />
              ))}
              <li>
                <Link
                  href="/products"
                  onClick={onNavigate}
                  className="block py-2.5 font-sans text-sm font-semibold text-primary"
                >
                  View all products
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryAccordion({ category, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const items = CATALOG_ITEMS.filter((item) => item.categorySlug === category.slug);

  return (
    <li>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-2.5 text-left"
      >
        <span className="font-sans text-sm font-medium text-foreground/85">{category.name}</span>
        <Plus
          strokeWidth={1.75}
          className={`h-3.5 w-3.5 text-foreground/50 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
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
            <ul className="flex flex-col gap-0.5 py-1 pl-4">
              {items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={onNavigate}
                    className="block py-2 font-sans text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
