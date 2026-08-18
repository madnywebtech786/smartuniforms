"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/shared/Container";
import ProductsMegaMenu from "@/components/navigation/ProductsMegaMenu";
import MobileNav from "@/components/navigation/MobileNav";

const NAV_LINKS = [{ href: "/about", label: "About" }];
const POST_PRODUCTS_LINKS = [{ href: "/contact", label: "Contact" }];

// How long the mega-menu stays open after the pointer leaves both the
// trigger and the panel — long enough to move the cursor diagonally from
// the "Products" link down into the panel without it closing underneath.
const CLOSE_DELAY_MS = 300;

/**
 * Transparent-over-hero header that solidifies once the user scrolls past
 * the hero. Reads scroll position via Motion's useScroll rather than a
 * scroll event listener, avoiding extra re-renders.
 *
 * Only the homepage ("/") actually has a hero image for the header to
 * float over — every other route renders the header solid immediately,
 * since there's no hero backdrop there and a see-through header at
 * scrollY 0 would just look transparent against plain page background.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const hasHero = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(!hasHero);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(!hasHero || latest > 64);
  });

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const closeTimer = useRef(null);

  const openMegaMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsMegaMenuOpen(true);
  };

  const scheduleMegaMenuClose = () => {
    closeTimer.current = setTimeout(() => setIsMegaMenuOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const closeMobileNav = () => setIsMobileNavOpen(false);

  const closeMegaMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsMegaMenuOpen(false);
  };

  return (
    <motion.header
      onMouseLeave={scheduleMegaMenuClose}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: isScrolled || isMegaMenuOpen ? "var(--color-background)" : "transparent",
        borderBottom:
          isScrolled || isMegaMenuOpen ? "1px solid var(--color-border)" : "1px solid transparent",
      }}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-sans text-[15px] font-semibold uppercase tracking-[0.04em] text-foreground"
        >
          Smart Uniform
          <span className="text-primary">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={scheduleMegaMenuClose}
              onFocus={scheduleMegaMenuClose}
              className="group relative font-sans text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-[width] duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}

          <div onMouseEnter={openMegaMenu} onFocus={openMegaMenu}>
            <Link
              href="/products"
              onClick={closeMegaMenu}
              aria-expanded={isMegaMenuOpen}
              className="group relative font-sans text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Products
              <span
                className={`absolute -bottom-1 left-0 h-px bg-primary transition-[width] duration-300 ease-out ${
                  isMegaMenuOpen ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>

          {POST_PRODUCTS_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={scheduleMegaMenuClose}
              onFocus={scheduleMegaMenuClose}
              className="group relative font-sans text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-[width] duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-foreground px-5 py-2.5 font-sans text-sm font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground lg:inline-block"
        >
          Request a Quote
        </Link>

        <MobileNavToggle
          isOpen={isMobileNavOpen}
          onOpen={() => setIsMobileNavOpen(true)}
          onClose={closeMobileNav}
        />
      </Container>

      <div onMouseEnter={openMegaMenu}>
        <ProductsMegaMenu isOpen={isMegaMenuOpen} onNavigate={closeMegaMenu} />
      </div>
    </motion.header>
  );
}

function MobileNavToggle({ isOpen, onOpen, onClose }) {
  return (
    <>
      <button
        type="button"
        onClick={isOpen ? onClose : onOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
      >
        <span className="sr-only">Menu</span>
        <div className="flex flex-col gap-1.5">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3.5 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-px w-5 bg-foreground"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3.5 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-px w-5 bg-foreground"
          />
        </div>
      </button>
      <MobileNav isOpen={isOpen} onClose={onClose} />
    </>
  );
}
