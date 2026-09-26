import { Briefcase, Shirt, HeartPulse, Shield, HardHat, ChefHat } from "lucide-react";

/**
 * The 6 product categories from the client's new requirement (Corporate
 * wear, Polos & t-shirts, Health wear, Security, Industrial, Hospitality —
 * kept as distinct entries per the client's literal list). Shared between
 * the Hero slider and the Categories section so both read from one list
 * rather than duplicating category copy.
 *
 * `productsCategorySlug` is the real /products catalog's NEW_CATEGORIES
 * parent slug (lib/newProducts.js) this card should filter to when clicked
 * — kept separate from `slug` (this card's own identity, used as its React
 * key and by the legacy Hero slider's lookups) since "Corporate Wear" and
 * "Polos & T-Shirts" are two distinct cards here but both point at the
 * real catalog's "polo-and-tshirts" category (2026-09-26: the t-shirt/polo
 * products moved there from "corporate-wear", which is now a separate,
 * currently-empty real category reserved for future products — see
 * NEW_CATEGORIES). The nav mega-menu and mobile nav no longer read this
 * file — see ProductsMegaMenu.jsx / MobileNav.jsx, which now read the
 * real catalog's NEW_CATEGORIES via filters.js's grouped Category facet.
 */
export const PRODUCTS = [
  {
    slug: "corporate-wear",
    name: "Corporate Wear",
    headline: "Corporate Wear",
    description:
      "Sharp, professional attire for front-desk, office, and administrative teams who set the tone the moment a client walks in.",
    icon: Briefcase,
    imageKey: "productAdministration",
    productsCategorySlug: "polo-and-tshirts",
  },
  {
    slug: "polos-tshirts",
    name: "Polos & T-Shirts",
    headline: "Polos & T-Shirts",
    description:
      "Everyday branded polos and tees — comfortable, durable, and stitched with your logo for teams on the move.",
    icon: Shirt,
    imageKey: "productPolosTshirts",
    productsCategorySlug: "polo-and-tshirts",
  },
  {
    slug: "health-wear",
    name: "Health Wear",
    headline: "Health Wear",
    description:
      "Scrubs and clinical uniforms built for long shifts, frequent washing, and the clean, trustworthy look patients expect.",
    icon: HeartPulse,
    imageKey: "productHealthWear",
    productsCategorySlug: "health-wear",
  },
  {
    slug: "security",
    name: "Security",
    headline: "Security",
    description:
      "Durable, authoritative security uniforms designed to hold up to long shifts while keeping your team clearly identifiable.",
    icon: Shield,
    imageKey: "productSecurity",
    productsCategorySlug: "security",
  },
  {
    slug: "industrial",
    name: "Industrial",
    headline: "Industrial",
    description:
      "Rugged workwear built to handle grease, wear, and long hours on the job site.",
    icon: HardHat,
    imageKey: "productIndustrialHospitality",
    productsCategorySlug: "industrial",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    headline: "Hospitality",
    description:
      "Uniforms for fast-moving hotel, restaurant, and café floors that still look sharp at the end of a shift.",
    icon: ChefHat,
    imageKey: "productHospitality",
    productsCategorySlug: "hospitality",
  },
];
