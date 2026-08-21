"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/shared/Container";
import TopBar from "@/components/navigation/TopBar";
import ProductsMegaMenu from "@/components/navigation/ProductsMegaMenu";
import MobileNav from "@/components/navigation/MobileNav";

const NAV_LINKS = [{ href: "/", label: "Home" },{ href: "/about", label: "About" }];
const POST_PRODUCTS_LINKS = [{ href: "/contact", label: "Contact" }];

// How long the mega-menu stays open after the pointer leaves both the
// trigger and the panel — long enough to move the cursor diagonally from
// the "Products" link down into the panel without it closing underneath.
const CLOSE_DELAY_MS = 300;

/**
 * Two-tier sticky header: a white contact topbar (phone/email/Facebook,
 * desktop only) stacked above a solid black primary nav (logo + links).
 * Both are always solid — no transparent-over-hero state — since the
 * hero now renders its own dark-overlaid background image behind the
 * header, and a black nav over a black-overlaid hero needs a visible
 * border to read as a separate bar rather than blending into it.
 */
export default function SiteHeader() {
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
    <header onMouseLeave={scheduleMegaMenuClose} className="fixed inset-x-0 top-0 z-50">
      <TopBar />

      <div className="bg-foreground">
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="relative h-9 w-32 shrink-0 sm:h-10 sm:w-36">
            <Image
              src="/images/logo.png"
              alt="Smart Uniform and Embroidery"
              fill
              sizes="144px"
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={scheduleMegaMenuClose}
                onFocus={scheduleMegaMenuClose}
                className="group relative font-sans text-sm font-medium text-background/80 transition-colors hover:text-background"
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
                className="group relative font-sans text-sm font-medium text-background/80 transition-colors hover:text-background"
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
                className="group relative font-sans text-sm font-medium text-background/80 transition-colors hover:text-background"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-[width] duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden rounded-full bg-primary px-5 py-2.5 font-sans text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-deep lg:inline-block"
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
      </div>
    </header>
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
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-background/25 lg:hidden"
      >
        <span className="sr-only">Menu</span>
        <div className="flex flex-col gap-1.5">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3.5 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-px w-5 bg-background"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3.5 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-px w-5 bg-background"
          />
        </div>
      </button>
      <MobileNav isOpen={isOpen} onClose={onClose} />
    </>
  );
}
