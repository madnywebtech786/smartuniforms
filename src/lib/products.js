import { Briefcase, Shirt, HeartPulse, Shield, HardHat, ChefHat } from "lucide-react";

/**
 * The 6 product categories from the client's new requirement (Administration
 * wear, Polos & t-shirts, Health wear, Security, Industrial, Hospitality —
 * kept as distinct entries per the client's literal list). Shared between
 * the Hero slider and the Categories section so both read from one list
 * rather than duplicating category copy.
 */
export const PRODUCTS = [
  {
    slug: "administration",
    name: "Administration Wear",
    headline: "Administration Wear",
    description:
      "Sharp, professional attire for front-desk, office, and administrative teams who set the tone the moment a client walks in.",
    icon: Briefcase,
    imageKey: "productAdministration",
  },
  {
    slug: "polos-tshirts",
    name: "Polos & T-Shirts",
    headline: "Polos & T-Shirts",
    description:
      "Everyday branded polos and tees — comfortable, durable, and stitched with your logo for teams on the move.",
    icon: Shirt,
    imageKey: "productPolosTshirts",
  },
  {
    slug: "health-wear",
    name: "Health Wear",
    headline: "Health Wear",
    description:
      "Scrubs and clinical uniforms built for long shifts, frequent washing, and the clean, trustworthy look patients expect.",
    icon: HeartPulse,
    imageKey: "productHealthWear",
  },
  {
    slug: "security",
    name: "Security",
    headline: "Security",
    description:
      "Durable, authoritative security uniforms designed to hold up to long shifts while keeping your team clearly identifiable.",
    icon: Shield,
    imageKey: "productSecurity",
  },
  {
    slug: "industrial",
    name: "Industrial",
    headline: "Industrial",
    description:
      "Rugged workwear built to handle grease, wear, and long hours on the job site.",
    icon: HardHat,
    imageKey: "productIndustrialHospitality",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    headline: "Hospitality",
    description:
      "Uniforms for fast-moving hotel, restaurant, and café floors that still look sharp at the end of a shift.",
    icon: ChefHat,
    imageKey: "productHospitality",
  },
];
