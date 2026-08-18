/**
 * Individual product-level items for the homepage Products marquee and the
 * /products catalog page — one level more specific than the PRODUCTS
 * categories in lib/products.js (e.g. "Health Wear" the category vs.
 * "Scrub Set" a specific product within it). Fields mirror the full
 * product schema the client wants (colours, gender, garment type, sleeve
 * length, fabric type, size range, feature/description, garment care) so
 * a future /products/[slug] page can render the complete spec from the
 * same entries — the homepage marquee only surfaces a subset (photo,
 * name, size range, fabric, colour swatches — no description).
 *
 * `colours` holds a few realistic placeholder swatch options per item
 * (name + hex), standing in for the client's real available colourways —
 * flagged here as pending confirmation before publish, same as every
 * other placeholder value in this file.
 *
 * `gender`, `garmentType`, and `sleeveLength` are the /products catalog
 * page's filterable facets (see ProductFilters.jsx). `fabricType` and
 * `brand` are deliberately NOT faceted: fabricType is a unique free-text
 * spec per item rather than a shared taxonomy, and this business
 * manufactures in-house rather than reselling third-party lines, so a
 * "Brand" facet has no real referent here — both would be facets faking
 * variety the data (or the business) doesn't have.
 *
 * `imageKey` points at each item's own placeholder photo in lib/images.js
 * and is always `gallery[0]` — used everywhere a single image is needed
 * (marquee card, mega-menu preview, catalog grid).
 *
 * `gallery` is the /products/[slug] detail page's image-picker list. A
 * real catalog would have several real photos per garment; today's stock
 * photography only has one distinct image per category, so the other 3
 * slots reuse other categories' STOCK_IMAGES entries purely as
 * structural stand-ins to demo the multi-image picker UI — they do NOT
 * depict this actual garment and must be replaced with real photography
 * of each item before publish.
 */
export const CATALOG_ITEMS = [
  {
    slug: "executive-polo",
    name: "Executive Polo",
    categorySlug: "administration",
    colours: [
      { name: "Charcoal", hex: "#36322c" },
      { name: "Navy", hex: "#1c2b45" },
      { name: "Ivory", hex: "#f5f2ea" },
      { name: "Black", hex: "#14130f" },
    ],
    gender: "Unisex",
    garmentType: "Polo",
    sleeveLength: "Short Sleeve",
    fabricType: "65% Cotton / 35% Polyester Piqué",
    sizeRange: "XS – 3XL",
    description:
      "Structured fit with a reinforced collar and moisture-wicking fabric — built for front-desk and administrative teams on their feet all day.",
    garmentCare: "Machine wash cold, tumble dry low, do not bleach.",
    imageKey: "productAdministration",
    gallery: ["productAdministration", "productPolosTshirts", "productHealthWear", "productSecurity"],
  },
  {
    slug: "branded-crew-tee",
    name: "Branded Crew Tee",
    categorySlug: "polos-tshirts",
    colours: [
      { name: "Heather Grey", hex: "#9c9890" },
      { name: "Black", hex: "#14130f" },
      { name: "Maroon", hex: "#7a1f1f" },
    ],
    gender: "Men's",
    garmentType: "T-Shirt",
    sleeveLength: "Short Sleeve",
    fabricType: "100% Ringspun Cotton",
    sizeRange: "XS – 4XL",
    description:
      "Soft-cotton crew tee built for daily wear and repeat washing, with a clean chest print or embroidery area.",
    garmentCare: "Machine wash cold, inside out, tumble dry low.",
    imageKey: "productPolosTshirts",
    gallery: ["productPolosTshirts", "productAdministration", "productIndustrialHospitality", "productHospitality"],
  },
  {
    slug: "scrub-set",
    name: "Scrub Set",
    categorySlug: "health-wear",
    colours: [
      { name: "Ceil Blue", hex: "#7a9bb0" },
      { name: "Surgical Green", hex: "#3d5a4a" },
      { name: "Plum", hex: "#5c3d66" },
      { name: "Black", hex: "#14130f" },
      { name: "Navy", hex: "#1c2b45" },
    ],
    gender: "Women's",
    garmentType: "Scrub Set",
    sleeveLength: "Short Sleeve",
    fabricType: "Poly-cotton Antimicrobial Blend",
    sizeRange: "XS – 3XL",
    description:
      "Two-piece scrub set with reinforced seams and deep pockets, built for long shifts and frequent hospital-grade washing.",
    garmentCare: "Machine wash hot, tumble dry medium, no fabric softener.",
    imageKey: "productHealthWear",
    gallery: ["productHealthWear", "productSecurity", "productAdministration", "productHospitality"],
  },
  {
    slug: "security-jacket",
    name: "Security Jacket",
    categorySlug: "security",
    colours: [
      { name: "Black", hex: "#14130f" },
      { name: "Navy", hex: "#1c2b45" },
    ],
    gender: "Men's",
    garmentType: "Jacket",
    sleeveLength: "Long Sleeve",
    fabricType: "Waterproof Ripstop Shell",
    sizeRange: "S – 3XL",
    description:
      "Weatherproof shell jacket with reflective trim and a dedicated ID/badge panel for round-the-clock visibility.",
    garmentCare: "Machine wash cold, hang dry, do not iron reflective trim.",
    imageKey: "productSecurity",
    gallery: ["productSecurity", "productIndustrialHospitality", "productAdministration", "productHealthWear"],
  },
  {
    slug: "hi-vis-coverall",
    name: "Hi-Vis Coverall",
    categorySlug: "industrial",
    colours: [
      { name: "Safety Orange", hex: "#e0692e" },
      { name: "Safety Yellow", hex: "#e0c02e" },
    ],
    gender: "Unisex",
    garmentType: "Coverall",
    sleeveLength: "Long Sleeve",
    fabricType: "Cotton-Poly Twill with Reflective Tape",
    sizeRange: "S – 4XL",
    description:
      "Reinforced coverall built for job-site wear, with high-visibility panels and durable stitching at every stress point.",
    garmentCare: "Machine wash warm, tumble dry low, inspect reflective tape before reuse.",
    imageKey: "productIndustrialHospitality",
    gallery: ["productIndustrialHospitality", "productSecurity", "productHospitality", "productPolosTshirts"],
  },
  {
    slug: "server-uniform-set",
    name: "Server Uniform Set",
    categorySlug: "hospitality",
    colours: [
      { name: "Black", hex: "#14130f" },
      { name: "White", hex: "#f5f2ea" },
      { name: "Charcoal", hex: "#36322c" },
    ],
    gender: "Women's",
    garmentType: "Vest",
    sleeveLength: "Sleeveless",
    fabricType: "Poly-cotton Twill, Stain-Resistant Finish",
    sizeRange: "XS – 3XL",
    description:
      "Classic front-of-house set — jacket, shirt, and apron — built to stay sharp through a full service shift.",
    garmentCare: "Machine wash cold, tumble dry low, iron on low heat.",
    imageKey: "productHospitality",
    gallery: ["productHospitality", "productIndustrialHospitality", "productPolosTshirts", "productHealthWear"],
  },
];
