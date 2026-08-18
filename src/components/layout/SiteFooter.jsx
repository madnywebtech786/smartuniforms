import Link from "next/link";
import Container from "@/components/shared/Container";
import { PRODUCTS } from "@/lib/products";

/**
 * Footer nav mirrors docs/site-architecture.md §2 — industry pages,
 * company links, and contact/NAP info (name, address, phone), repeated
 * consistently here per that doc's local-SEO guidance. Business hours
 * and social links are flagged [NEEDS CLIENT INPUT] in
 * client-business-info.md — omitted rather than invented.
 */
const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-sans text-[15px] font-semibold uppercase tracking-[0.04em] text-foreground"
            >
              Smart Uniform
              <span className="text-primary">.</span>
            </Link>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
              Custom uniform manufacturing, supply, and in-house embroidery
              for businesses across Calgary.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Industries
            </h3>
            <ul className="mt-5 space-y-3">
              {PRODUCTS.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/industries/${category.slug}`}
                    className="font-sans text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 font-sans text-sm text-foreground/80">
              <li>
                <a href="tel:+14036290862" className="transition-colors hover:text-primary">
                  (403) 629-0862
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@smartuniform.ca"
                  className="transition-colors hover:text-primary"
                >
                  info@smartuniform.ca
                </a>
              </li>
              <li className="leading-relaxed">
                534 Redstone View NE
                <br />
                Calgary, AB T3N 0M9
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-muted-foreground">
            © {new Date().getFullYear()} Smart Uniform and Embroidery. All rights reserved.
          </p>
          <p className="font-sans text-xs text-muted-foreground">
            534 Redstone View NE, Calgary, AB
          </p>
        </div>
      </Container>
    </footer>
  );
}
