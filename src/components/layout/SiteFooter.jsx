import Link from "next/link";
import Image from "next/image";
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
              className="relative block h-16 w-36 rounded-md bg-white px-1 py-1.5"
            >
              <Image
                src="/images/smart-uniform-logo.png"
                alt="Smart Uniform and Embroidery"
                fill
                sizes="144px"
                className="object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
              Custom uniform manufacturing, supply, and in-house embroidery
              for businesses across Suva, Fiji.
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
                <a href="tel:+6793395162" className="transition-colors hover:text-primary">
                  +679 339 5162
                </a>
              </li>
              <li>
                <a href="tel:+6799705444" className="transition-colors hover:text-primary">
                  +679 970 5444
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
                Lot 1 Shop 9, Ratu Dovi Road
                <br />
                Nasinu, Suva, Fiji Islands
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-muted-foreground">
            © {new Date().getFullYear()} Smart Uniform and Embroidery. All rights reserved.
          </p>
          <p className="font-sans text-xs text-muted-foreground">
            Lot 1 Shop 9, Ratu Dovi Road, Nasinu, Suva, Fiji
          </p>
        </div>
      </Container>
    </footer>
  );
}
