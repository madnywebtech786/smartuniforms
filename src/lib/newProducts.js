/**
 * Real client product data — replaces lib/products.js + lib/catalog.js for
 * the /products and /products/[slug] pages only. Those two legacy files
 * are left untouched and still power the Hero slider, homepage Categories
 * grid, footer links, and nav (mega menu / mobile nav) until real category
 * photography/data exists to replace them there too.
 *
 * Unlike the legacy catalog's fixed schema (gender, sleeveLength,
 * fabricType, sizeRange as dedicated fields), items here carry `specs`: a
 * flexible ordered list of { label, value } pairs. Different categories
 * (a cap vs. a polo vs. whatever comes next) have genuinely different
 * attribute sets, so a fixed set of fields would force blank/fake values
 * onto items that don't have that attribute — see SpecAccordion.jsx and
 * ProductDetail.jsx, which render whatever `specs` an item has rather than
 * assuming fixed fields.
 *
 * `care` is a generic, non-client-provided set of standard garment-care
 * cautions (no real care label text was supplied for these items) —
 * flagged here so it's replaced with the client's actual care label
 * copy once available, same placeholder-honesty approach as the rest of
 * this codebase's placeholder data.
 *
 * Each product also carries `subcategorySlug`/`subcategoryName` — the
 * garment type within its parent category (e.g. "Unisex Scrub Pant"
 * within Health Wear). The catalog's Category filter and each card's
 * eyebrow label both read subcategory, not the parent NEW_CATEGORIES
 * entry, since a single style code (e.g. "SPB-122") only means something
 * next to its garment type, not next to the broad parent category shared
 * by everything in Health Wear. There's no separate subcategory list yet
 * (unlike NEW_CATEGORIES) — with 2 subcategories total today, inlining
 * slug+name on each product is simpler than a second list to keep in
 * sync; promote to a real list once a subcategory needs its own metadata
 * (description, image) or is shared by enough products that typos become
 * a real risk.
 */

// Accessories (the Cap) is deliberately NOT listed here — it's excluded
// from the /products catalog's Category filter and grid per client
// request (2026-09-26), and browsable only on its own dedicated
// /accessories page (see app/accessories/page.js, which filters
// NEW_PRODUCTS by categorySlug directly rather than reading this list).
// The Cap's own product record still carries categorySlug: "accessories"
// unchanged — only this display list omits it.
export const NEW_CATEGORIES = [
  { slug: "polo-and-tshirts", name: "Polo and T-Shirts" },
  { slug: "health-wear", name: "Health Wear" },
  { slug: "industrial", name: "Industrial" },
  { slug: "security", name: "Security" },
  { slug: "hospitality", name: "Hospitality" },
  { slug: "corporate-wear", name: "Corporate Wear" },
];

const GENERIC_CARE_INSTRUCTIONS = [
  "Machine wash cold, inside out, with like colours",
  "Do not bleach",
  "Tumble dry low",
  "Do not iron directly over embroidery or print",
  "Do not dry clean",
];

// Shared real care label text — identical wording across every 15Sep spec
// sheet checked so far (Scrub Pant, Scrub Top, Mens Counter Shirt).
const STANDARD_CARE = [
  "Machine wash normal",
  "Wash dark colours separately",
  "Do not bleach",
  "Tumble dry normal",
  "Iron medium heat",
  "Do not dry clean",
];

/**
 * Scrub pant style codes don't map 1:1 to a single colour — the source
 * spec sheet (15Sep/Healthwear Scrub Pant Web.pdf) reuses SPLB-155 across
 * 4 different colours (Light Blue, Navy, Royal Blue, Purple), while
 * SPG-101/SPB-122/SPG-144 are each their own single-colour style. Client
 * confirmed: group by style code, one product per style, all of that
 * style's colours in `colours`.
 *
 * Scrub tops (15Sep/Healthwear Scrub Top Web.pdf) are the opposite case:
 * every one of the 7 colours has its own unique style code (no sharing),
 * so each stays its own single-colour product rather than being grouped.
 * Mens Counter Shirts (15Sep/Mens 2 Tone Black Web.pdf) follow the same
 * one-style-per-colourway pattern as scrub tops — 6 distinct two-tone
 * colourways (e.g. "Black/Royal Blue"), each its own style code, each its
 * own product. Each colourway's swatch hex is the accent tone only (the
 * base is black on every style), since these are two-tone garments, not
 * a single flat colour.
 *
 * Mens Counter Shirts also come in a grey base (15Sep/Mens 2 Tone Grey
 * web.pdf, style prefix "MG*") in addition to black ("MB*") — same
 * garment/subcategory, just a second base colour, so those 6 styles join
 * the same `mens-counter-shirt` subcategory rather than getting their own.
 * The Womans Counter Shirt (15Sep/Womans 2 Tone Black Shirt.pdf +
 * Womans Grey 2 tone.pdf, style prefix "WB*"/"WG*") is the same shirt
 * pattern tailored for women, same two base colours, same one-style-
 * per-colourway rule — its own `womans-counter-shirt` subcategory since
 * it's a genuinely different garment (not just a colour of the mens one).
 * Note the accent-colour name for style *Y-07/*Y-08 reads "Gold" on the
 * Womans sheets vs. "Yellow" on the Mens sheets for what looks like the
 * same swatch — each sheet's own label is used as given rather than
 * normalized, consistent with treating every spec sheet as its own
 * source of truth.
 *
 * Correction (2026-09-18): the 6 Mens Grey Counter Shirt style codes were
 * originally transcribed one digit off (e.g. MGBFY-17 instead of the
 * PDF's actual MGBFY-16) and "Grey/Charcoal" was used instead of the
 * PDF's actual "Grey/Black" for MGBKFY-15 — caught while extracting real
 * photos and cross-checking each page's style code against the catalog.
 * Fixed to match 15Sep/Mens 2 Tone Grey web.pdf exactly: MGBFY-16
 * (Grey/Royal Blue), MGYFY-07 (Grey/Gold), MGRFY-09 (Grey/Red), MGGFY-28
 * (Grey/Green), MGBKFY-15 (Grey/Black), MGUFY-12 (Grey/Burgundy).
 *
 * Womans Skirt (15Sep/Womans Skirt Web.pdf) has 2 styles that are a
 * length variant of the same garment (WSKS-150 short/26", WSKL-160
 * long/31"), both Navy, both 100% polyester — kept as 2 separate products
 * since length is a distinct choice a customer makes, not a colourway.
 *
 * Mens Security Shirt (15Sep/Security Shirt web.pdf, style MSSD-820) is a
 * single product, single colourway (Dark Grey/Charcoal) — first item in a
 * new "Security" parent category.
 */
export const NEW_PRODUCTS = [
  {
    slug: "cap-bcp-79",
    name: "Cap",
    style: "BCP-79",
    categorySlug: "accessories",
    subcategorySlug: "cap",
    subcategoryName: "Cap",
    colours: [
      { name: "Black", hex: "#14130f" },
      { name: "Red", hex: "#b3221a" },
      { name: "Royal Blue", hex: "#1c4fa0" },
      { name: "Charcoal", hex: "#3f3d3a" },
    ],
    imageKey: "capBcp79",
    gallery: ["capBcp79"],
    description:
      "Style BCP-79 cap, embroidered with your logo — available in Black, Red, Royal Blue, and Charcoal.",
    specs: [
      { label: "Style", value: "BCP-79" },
      { label: "Size", value: "One Size" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "scrub-pant-spg-101",
    name: "Unisex Scrub Pant",
    style: "SPG-101",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-pant",
    subcategoryName: "Unisex Scrub Pant",
    colours: [{ name: "Green", hex: "#1f6f5c" }],
    imageKey: "scrubPantSpg101",
    gallery: ["scrubPantSpg101"],
    description:
      "Style SPG-101 unisex scrub pant in a 65% poly / 35% cotton blend — available in Green.",
    specs: [
      { label: "Style", value: "SPG-101" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-pant-spb-122",
    name: "Unisex Scrub Pant",
    style: "SPB-122",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-pant",
    subcategoryName: "Unisex Scrub Pant",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "scrubPantSpb122",
    gallery: ["scrubPantSpb122"],
    description:
      "Style SPB-122 unisex scrub pant in a 65% poly / 35% cotton blend — available in Black.",
    specs: [
      { label: "Style", value: "SPB-122" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-pant-spg-144",
    name: "Unisex Scrub Pant",
    style: "SPG-144",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-pant",
    subcategoryName: "Unisex Scrub Pant",
    colours: [{ name: "Grey", hex: "#87898c" }],
    imageKey: "scrubPantSpg144",
    gallery: ["scrubPantSpg144"],
    description:
      "Style SPG-144 unisex scrub pant in a 65% poly / 35% cotton blend — available in Grey.",
    specs: [
      { label: "Style", value: "SPG-144" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-pant-splb-155",
    name: "Unisex Scrub Pant",
    style: "SPLB-155",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-pant",
    subcategoryName: "Unisex Scrub Pant",
    colours: [
      { name: "Light Blue", hex: "#7ba7d9", imageKey: "scrubPantSplb155LightBlue" },
      { name: "Navy", hex: "#1c2b45", imageKey: "scrubPantSplb155Navy" },
      { name: "Royal Blue", hex: "#1c4fa0", imageKey: "scrubPantSplb155RoyalBlue" },
      { name: "Purple", hex: "#4b2e83", imageKey: "scrubPantSplb155Purple" },
    ],
    imageKey: "scrubPantSplb155LightBlue",
    gallery: ["scrubPantSplb155LightBlue"],
    description:
      "Style SPLB-155 unisex scrub pant in a 65% poly / 35% cotton blend — available in Light Blue, Navy, Royal Blue, and Purple.",
    specs: [
      { label: "Style", value: "SPLB-155" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-top-stg-02",
    name: "Unisex Scrub Top",
    style: "STG-02",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-top",
    subcategoryName: "Unisex Scrub Top",
    colours: [{ name: "Green", hex: "#1f6f5c" }],
    imageKey: "scrubTopStg02",
    gallery: ["scrubTopStg02"],
    description:
      "Style STG-02 unisex scrub top in a 65% poly / 35% cotton blend — available in Green.",
    specs: [
      { label: "Style", value: "STG-02" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-top-stb-03",
    name: "Unisex Scrub Top",
    style: "STB-03",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-top",
    subcategoryName: "Unisex Scrub Top",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "scrubTopStb03",
    gallery: ["scrubTopStb03"],
    description:
      "Style STB-03 unisex scrub top in a 65% poly / 35% cotton blend — available in Black.",
    specs: [
      { label: "Style", value: "STB-03" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-top-stg-04",
    name: "Unisex Scrub Top",
    style: "STG-04",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-top",
    subcategoryName: "Unisex Scrub Top",
    colours: [{ name: "Grey", hex: "#87898c" }],
    imageKey: "scrubTopStg04",
    gallery: ["scrubTopStg04"],
    description:
      "Style STG-04 unisex scrub top in a 65% poly / 35% cotton blend — available in Grey.",
    specs: [
      { label: "Style", value: "STG-04" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-top-stlb-05",
    name: "Unisex Scrub Top",
    style: "STLB-05",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-top",
    subcategoryName: "Unisex Scrub Top",
    colours: [{ name: "Light Blue", hex: "#7ba7d9" }],
    imageKey: "scrubTopStlb05",
    gallery: ["scrubTopStlb05"],
    description:
      "Style STLB-05 unisex scrub top in a 65% poly / 35% cotton blend — available in Light Blue.",
    specs: [
      { label: "Style", value: "STLB-05" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-top-stn-06",
    name: "Unisex Scrub Top",
    style: "STN-06",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-top",
    subcategoryName: "Unisex Scrub Top",
    colours: [{ name: "Navy", hex: "#1c2b45" }],
    imageKey: "scrubTopStn06",
    gallery: ["scrubTopStn06"],
    description:
      "Style STN-06 unisex scrub top in a 65% poly / 35% cotton blend — available in Navy.",
    specs: [
      { label: "Style", value: "STN-06" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-top-strb-07",
    name: "Unisex Scrub Top",
    style: "STRB-07",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-top",
    subcategoryName: "Unisex Scrub Top",
    colours: [{ name: "Royal Blue", hex: "#1c4fa0" }],
    imageKey: "scrubTopStrb07",
    gallery: ["scrubTopStrb07"],
    description:
      "Style STRB-07 unisex scrub top in a 65% poly / 35% cotton blend — available in Royal Blue.",
    specs: [
      { label: "Style", value: "STRB-07" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "scrub-top-stp-08",
    name: "Unisex Scrub Top",
    style: "STP-08",
    categorySlug: "health-wear",
    subcategorySlug: "unisex-scrub-top",
    subcategoryName: "Unisex Scrub Top",
    colours: [{ name: "Purple", hex: "#4b2e83" }],
    imageKey: "scrubTopStp08",
    gallery: ["scrubTopStp08"],
    description:
      "Style STP-08 unisex scrub top in a 65% poly / 35% cotton blend — available in Purple.",
    specs: [
      { label: "Style", value: "STP-08" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mbbfy-16",
    name: "Mens Counter Shirt",
    style: "MBBFY-16",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Black/Royal Blue", hex: "#1c4fa0" }],
    imageKey: "counterShirtMbbfy16",
    gallery: [
      "counterShirtMbbfy16",
      "counterShirtMbbfy16Back",
      "counterShirtMbbfy16Alt",
      "counterShirtMbbfy16Detail",
    ],
    description:
      "Style MBBFY-16 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Black/Royal Blue.",
    specs: [
      { label: "Style", value: "MBBFY-16" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mbyfy-07",
    name: "Mens Counter Shirt",
    style: "MBYFY-07",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Black/Yellow", hex: "#e0b02e" }],
    imageKey: "counterShirtMbyfy07",
    gallery: [
      "counterShirtMbyfy07",
      "counterShirtMbyfy07Back",
      "counterShirtMbyfy07Alt",
      "counterShirtMbyfy07Detail",
    ],
    description:
      "Style MBYFY-07 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Black/Yellow.",
    specs: [
      { label: "Style", value: "MBYFY-07" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mbrfy-09",
    name: "Mens Counter Shirt",
    style: "MBRFY-09",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Black/Red", hex: "#b3221a" }],
    imageKey: "counterShirtMbrfy09",
    gallery: [
      "counterShirtMbrfy09",
      "counterShirtMbrfy09Back",
      "counterShirtMbrfy09Alt",
      "counterShirtMbrfy09Detail",
    ],
    description:
      "Style MBRFY-09 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Black/Red.",
    specs: [
      { label: "Style", value: "MBRFY-09" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mbgnfy-28",
    name: "Mens Counter Shirt",
    style: "MBGNFY-28",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Black/Green", hex: "#3d8a53" }],
    imageKey: "counterShirtMbgnfy28",
    gallery: [
      "counterShirtMbgnfy28",
      "counterShirtMbgnfy28Back",
      "counterShirtMbgnfy28Alt",
      "counterShirtMbgnfy28Detail",
    ],
    description:
      "Style MBGNFY-28 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Black/Green.",
    specs: [
      { label: "Style", value: "MBGNFY-28" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mbgyfy-13",
    name: "Mens Counter Shirt",
    style: "MBGYFY-13",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Black/Grey", hex: "#87898c" }],
    imageKey: "counterShirtMbgyfy13",
    gallery: [
      "counterShirtMbgyfy13",
      "counterShirtMbgyfy13Back",
      "counterShirtMbgyfy13Alt",
      "counterShirtMbgyfy13Detail",
    ],
    description:
      "Style MBGYFY-13 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Black/Grey.",
    specs: [
      { label: "Style", value: "MBGYFY-13" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mbufy-12",
    name: "Mens Counter Shirt",
    style: "MBUFY-12",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Black/Burgundy", hex: "#6e1f2e" }],
    imageKey: "counterShirtMbufy12",
    gallery: [
      "counterShirtMbufy12",
      "counterShirtMbufy12Back",
      "counterShirtMbufy12Alt",
      "counterShirtMbufy12Detail",
    ],
    description:
      "Style MBUFY-12 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Black/Burgundy.",
    specs: [
      { label: "Style", value: "MBUFY-12" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mgbfy-16",
    name: "Mens Counter Shirt",
    style: "MGBFY-16",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Grey/Royal Blue", hex: "#1c4fa0" }],
    imageKey: "counterShirtMgbfy16",
    gallery: [
      "counterShirtMgbfy16",
      "counterShirtMgbfy16Back",
      "counterShirtMgbfy16Alt",
      "counterShirtMgbfy16Detail",
    ],
    description:
      "Style MGBFY-16 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Royal Blue.",
    specs: [
      { label: "Style", value: "MGBFY-16" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mgyfy-07",
    name: "Mens Counter Shirt",
    style: "MGYFY-07",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Grey/Gold", hex: "#e0b02e" }],
    imageKey: "counterShirtMgyfy07",
    gallery: [
      "counterShirtMgyfy07",
      "counterShirtMgyfy07Back",
      "counterShirtMgyfy07Alt",
      "counterShirtMgyfy07Detail",
    ],
    description:
      "Style MGYFY-07 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Gold.",
    specs: [
      { label: "Style", value: "MGYFY-07" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mgrfy-09",
    name: "Mens Counter Shirt",
    style: "MGRFY-09",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Grey/Red", hex: "#b3221a" }],
    imageKey: "counterShirtMgrfy09",
    gallery: [
      "counterShirtMgrfy09",
      "counterShirtMgrfy09Back",
      "counterShirtMgrfy09Alt",
      "counterShirtMgrfy09Detail",
    ],
    description:
      "Style MGRFY-09 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Red.",
    specs: [
      { label: "Style", value: "MGRFY-09" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mggfy-28",
    name: "Mens Counter Shirt",
    style: "MGGFY-28",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Grey/Green", hex: "#3d8a53" }],
    imageKey: "counterShirtMggfy28",
    gallery: [
      "counterShirtMggfy28",
      "counterShirtMggfy28Back",
      "counterShirtMggfy28Alt",
      "counterShirtMggfy28Detail",
    ],
    description:
      "Style MGGFY-28 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Green.",
    specs: [
      { label: "Style", value: "MGGFY-28" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mgbkfy-15",
    name: "Mens Counter Shirt",
    style: "MGBKFY-15",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Grey/Black", hex: "#1c1c1c" }],
    imageKey: "counterShirtMgbkfy15",
    gallery: [
      "counterShirtMgbkfy15",
      "counterShirtMgbkfy15Back",
      "counterShirtMgbkfy15Alt",
      "counterShirtMgbkfy15Detail",
    ],
    description:
      "Style MGBKFY-15 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Black.",
    specs: [
      { label: "Style", value: "MGBKFY-15" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-mgufy-12",
    name: "Mens Counter Shirt",
    style: "MGUFY-12",
    categorySlug: "industrial",
    subcategorySlug: "mens-counter-shirt",
    subcategoryName: "Mens Counter Shirt",
    colours: [{ name: "Grey/Burgundy", hex: "#6e1f2e" }],
    imageKey: "counterShirtMgufy12",
    gallery: [
      "counterShirtMgufy12",
      "counterShirtMgufy12Back",
      "counterShirtMgufy12Alt",
      "counterShirtMgufy12Detail",
    ],
    description:
      "Style MGUFY-12 two-tone mens counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Burgundy.",
    specs: [
      { label: "Style", value: "MGUFY-12" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wbbfy-16",
    name: "Womans Counter Shirt",
    style: "WBBFY-16",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Black/Royal Blue", hex: "#1c4fa0" }],
    imageKey: "counterShirtWbbfy16",
    gallery: [
      "counterShirtWbbfy16",
      "counterShirtWbbfy16Back",
      "counterShirtWbbfy16Alt",
      "counterShirtWbbfy16Detail",
    ],
    description:
      "Style WBBFY-16 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Black/Royal Blue.",
    specs: [
      { label: "Style", value: "WBBFY-16" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wbyfy-07",
    name: "Womans Counter Shirt",
    style: "WBYFY-07",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Black/Gold", hex: "#e0b02e" }],
    imageKey: "counterShirtWbyfy07",
    gallery: [
      "counterShirtWbyfy07",
      "counterShirtWbyfy07Back",
      "counterShirtWbyfy07Alt",
      "counterShirtWbyfy07Detail",
    ],
    description:
      "Style WBYFY-07 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Black/Gold.",
    specs: [
      { label: "Style", value: "WBYFY-07" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wbrfy-09",
    name: "Womans Counter Shirt",
    style: "WBRFY-09",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Black/Red", hex: "#b3221a" }],
    imageKey: "counterShirtWbrfy09",
    gallery: [
      "counterShirtWbrfy09",
      "counterShirtWbrfy09Back",
      "counterShirtWbrfy09Alt",
      "counterShirtWbrfy09Detail",
    ],
    description:
      "Style WBRFY-09 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Black/Red.",
    specs: [
      { label: "Style", value: "WBRFY-09" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wbgnfy-28",
    name: "Womans Counter Shirt",
    style: "WBGNFY-28",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Black/Green", hex: "#3d8a53" }],
    imageKey: "counterShirtWbgnfy28",
    gallery: [
      "counterShirtWbgnfy28",
      "counterShirtWbgnfy28Back",
      "counterShirtWbgnfy28Alt",
      "counterShirtWbgnfy28Detail",
    ],
    description:
      "Style WBGNFY-28 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Black/Green.",
    specs: [
      { label: "Style", value: "WBGNFY-28" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wbgyfy-13",
    name: "Womans Counter Shirt",
    style: "WBGYFY-13",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Black/Grey", hex: "#87898c" }],
    imageKey: "counterShirtWbgyfy13",
    gallery: [
      "counterShirtWbgyfy13",
      "counterShirtWbgyfy13Back",
      "counterShirtWbgyfy13Alt",
      "counterShirtWbgyfy13Detail",
    ],
    description:
      "Style WBGYFY-13 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Black/Grey.",
    specs: [
      { label: "Style", value: "WBGYFY-13" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wbufy-12",
    name: "Womans Counter Shirt",
    style: "WBUFY-12",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Black/Burgundy", hex: "#6e1f2e" }],
    imageKey: "counterShirtWbufy12",
    gallery: [
      "counterShirtWbufy12",
      "counterShirtWbufy12Back",
      "counterShirtWbufy12Alt",
      "counterShirtWbufy12Detail",
    ],
    description:
      "Style WBUFY-12 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Black/Burgundy.",
    specs: [
      { label: "Style", value: "WBUFY-12" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wgbfy-16",
    name: "Womans Counter Shirt",
    style: "WGBFY-16",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Grey/Royal Blue", hex: "#1c4fa0" }],
    imageKey: "counterShirtWgbfy16",
    gallery: [
      "counterShirtWgbfy16",
      "counterShirtWgbfy16Back",
      "counterShirtWgbfy16Alt",
      "counterShirtWgbfy16Detail",
    ],
    description:
      "Style WGBFY-16 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Royal Blue.",
    specs: [
      { label: "Style", value: "WGBFY-16" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wgyfy-07",
    name: "Womans Counter Shirt",
    style: "WGYFY-07",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Grey/Gold", hex: "#e0b02e" }],
    imageKey: "counterShirtWgyfy07",
    gallery: [
      "counterShirtWgyfy07",
      "counterShirtWgyfy07Back",
      "counterShirtWgyfy07Alt",
      "counterShirtWgyfy07Detail",
    ],
    description:
      "Style WGYFY-07 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Gold.",
    specs: [
      { label: "Style", value: "WGYFY-07" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wgrfy-09",
    name: "Womans Counter Shirt",
    style: "WGRFY-09",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Grey/Red", hex: "#b3221a" }],
    imageKey: "counterShirtWgrfy09",
    gallery: [
      "counterShirtWgrfy09",
      "counterShirtWgrfy09Back",
      "counterShirtWgrfy09Alt",
      "counterShirtWgrfy09Detail",
    ],
    description:
      "Style WGRFY-09 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Red.",
    specs: [
      { label: "Style", value: "WGRFY-09" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wggnfy-28",
    name: "Womans Counter Shirt",
    style: "WGGNFY-28",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Grey/Green", hex: "#3d8a53" }],
    imageKey: "counterShirtWggnfy28",
    gallery: [
      "counterShirtWggnfy28",
      "counterShirtWggnfy28Back",
      "counterShirtWggnfy28Alt",
      "counterShirtWggnfy28Detail",
    ],
    description:
      "Style WGGNFY-28 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Green.",
    specs: [
      { label: "Style", value: "WGGNFY-28" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wgbkfy-15",
    name: "Womans Counter Shirt",
    style: "WGBKFY-15",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Grey/Black", hex: "#1c1c1c" }],
    imageKey: "counterShirtWgbkfy15",
    gallery: [
      "counterShirtWgbkfy15",
      "counterShirtWgbkfy15Back",
      "counterShirtWgbkfy15Alt",
      "counterShirtWgbkfy15Detail",
    ],
    description:
      "Style WGBKFY-15 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Black.",
    specs: [
      { label: "Style", value: "WGBKFY-15" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "counter-shirt-wgufy-12",
    name: "Womans Counter Shirt",
    style: "WGUFY-12",
    categorySlug: "industrial",
    subcategorySlug: "womans-counter-shirt",
    subcategoryName: "Womans Counter Shirt",
    colours: [{ name: "Grey/Burgundy", hex: "#6e1f2e" }],
    imageKey: "counterShirtWgufy12",
    gallery: [
      "counterShirtWgufy12",
      "counterShirtWgufy12Back",
      "counterShirtWgufy12Alt",
      "counterShirtWgufy12Detail",
    ],
    description:
      "Style WGUFY-12 two-tone womans counter shirt in a 60% cotton / 40% polyester blend — available in Grey/Burgundy.",
    specs: [
      { label: "Style", value: "WGUFY-12" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "womans-skirt-wsks-150",
    name: "Womans Skirt",
    style: "WSKS-150",
    categorySlug: "industrial",
    subcategorySlug: "womans-skirt",
    subcategoryName: "Womans Skirt",
    colours: [{ name: "Navy", hex: "#1c2b45" }],
    imageKey: "womansSkirtWsks150",
    gallery: ["womansSkirtWsks150"],
    description:
      "Style WSKS-150 short womans skirt (26\") in 100% polyester — available in Navy.",
    specs: [
      { label: "Style", value: "WSKS-150" },
      { label: "Length", value: "Short (26\")" },
      { label: "Size", value: "28 – 52" },
      { label: "Fabric", value: "100% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "womans-skirt-wskl-160",
    name: "Womans Skirt",
    style: "WSKL-160",
    categorySlug: "industrial",
    subcategorySlug: "womans-skirt",
    subcategoryName: "Womans Skirt",
    colours: [{ name: "Navy", hex: "#1c2b45" }],
    imageKey: "womansSkirtWskl160",
    gallery: ["womansSkirtWskl160"],
    description:
      "Style WSKL-160 long womans skirt (31\") in 100% polyester — available in Navy.",
    specs: [
      { label: "Style", value: "WSKL-160" },
      { label: "Length", value: "Long (31\")" },
      { label: "Size", value: "28 – 52" },
      { label: "Fabric", value: "100% Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "security-shirt-mssd-820",
    name: "Mens Security Shirt",
    style: "MSSD-820",
    categorySlug: "security",
    subcategorySlug: "mens-security-shirt",
    subcategoryName: "Mens Security Shirt",
    colours: [{ name: "Dark Grey/Charcoal", hex: "#3f3d3a" }],
    imageKey: "securityShirtMssd820",
    gallery: ["securityShirtMssd820"],
    description:
      "Style MSSD-820 mens security shirt in a 60% cotton / 40% polyester blend, with epaulettes and a \"Security Services\" chest patch — available in Dark Grey/Charcoal.",
    specs: [
      { label: "Style", value: "MSSD-820" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "60% Cotton / 40% Polyester" },
    ],
    care: STANDARD_CARE,
  },

  /**
   * 25Aug batch — hospitality (kitchen/food-service) and corporate-wear
   * (branded everyday shirts) categories, added per client PDFs in
   * 25Aug/. Two new NEW_CATEGORIES entries introduced here: "hospitality"
   * (chef coats/pants/caps/aprons/bandanas — kitchen/food-service wear)
   * and "corporate-wear" (t-shirts, polos — general branded apparel).
   * Consultation coats join "health-wear" since they're medical/pharmacy
   * context (dental office, pharmacy logos shown on the sample garments),
   * not kitchen wear.
   *
   * UPDATE 2026-09-26: the t-shirt/polo products below were moved to a
   * new "polo-and-tshirts" categorySlug per client request — "corporate
   * wear" as a label now refers to a separate, currently-empty category
   * reserved for future products, not this batch. See NEW_CATEGORIES.
   *
   * Apron.pdf (25Aug/Apron.pdf): "4 STYLE" adjustable aprons come in
   * White and Black, each with 4 pocket configurations (no pocket / top
   * only / bottom only / top+bottom) — that's a genuine style-code-per-
   * configuration split (APW-001..008), not a colourway grouping, so each
   * stays its own product per the one-product-per-style-code rule. A 9th
   * style (APWB-009) is a two-tone white/black combo with both pockets +
   * neck/side straps called out — its own product, not a colour variant
   * of either single-tone apron.
   *
   * Backup_of_Chef Cap web.pdf: 5 distinct head-wear styles (cook cap,
   * bandana, poofy chef hat), each in one fixed colour per style code —
   * these are different garment shapes, not colourways of one garment, so
   * each gets its own subcategory (cook-cap, bandana, chef-hat) with
   * colour folded into the name since the source PDF doesn't separate
   * "style" from "colour" for these (e.g. "White Unisex Cook Cap" is the
   * full product name, not "Cook Cap" in colour "White").
   *
   * Consultation Coat Web.pdf: Mens (MCC-7250) and Womans (WCC-7300) are
   * different garments (cut, sizing table), not a gender colourway of one
   * style — separate subcategories, each single-colour (White).
   *
   * Industrial.pdf: despite sharing style code "DCN - 534" on the sheet,
   * Unisex Lab Coat (white) and Dust Coat (navy) are visibly different
   * garments (lab coat front pockets/cut vs. mechanic's dust coat) with
   * different size charts on the source PDF — treated as two separate
   * products/subcategories rather than one style's two colourways,
   * unlike the scrub-pant/counter-shirt grouping rule used elsewhere in
   * this file (that rule applies when the *same* garment repeats across
   * colours with one shared code; here the garment itself differs).
   *
   * Mens Chef Coat Web.pdf: 8 chef coat styles (MCCA–MCCH) — sleeve
   * length (short/long) and trim (plain / contrast piping) both vary per
   * style code, so each is its own product rather than a colour or length
   * variant of a shared style. Plus 1 Chef Pant (CPB-67, elastic-waist,
   * Black). Womans Chef Coat Web Pic.pdf mirrors the same 8-style pattern
   * (WCCA–WCCH) tailored for women, same subcategory-per-style approach.
   *
   * Mens T-Shirt / Unisex Polo Shirt / Womans T-Shirt: each PDF shows
   * multiple overlapping colour-swatch charts (a primary named grid plus
   * later "OTHER AVAILABLE COLORS" reference grids with some renamed/
   * re-numbered duplicates of the same colours). Per client instruction,
   * only the first/primary swatch image on each PDF was used as that
   * style's real colour list, deduped by name — later charts on the same
   * PDF were reference material, not additional real options. Every named
   * swatch that survived dedup is kept as a distinct colour even where
   * two names look visually similar (e.g. "Grey" vs "Grey Charcoal"),
   * since names weren't independently verified against sampled pixels.
   */
  {
    slug: "apron-apw-001",
    name: "White Adjustable Apron — No Pocket",
    style: "APW-001",
    categorySlug: "hospitality",
    subcategorySlug: "adjustable-apron",
    subcategoryName: "Adjustable Apron",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "apronWhitePocketConfigs",
    gallery: ["apronWhitePocketConfigs"],
    description: "Style APW-001 white adjustable apron with no pocket.",
    specs: [
      { label: "Style", value: "APW-001" },
      { label: "Configuration", value: "No pocket" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "apron-apw-002",
    name: "White Adjustable Apron — Top Pocket",
    style: "APW-002",
    categorySlug: "hospitality",
    subcategorySlug: "adjustable-apron",
    subcategoryName: "Adjustable Apron",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "apronWhitePocketConfigs",
    gallery: ["apronWhitePocketConfigs"],
    description: "Style APW-002 white adjustable apron with a top pocket only.",
    specs: [
      { label: "Style", value: "APW-002" },
      { label: "Configuration", value: "Top pocket only" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "apron-apw-003",
    name: "White Adjustable Apron — Bottom Pocket",
    style: "APW-003",
    categorySlug: "hospitality",
    subcategorySlug: "adjustable-apron",
    subcategoryName: "Adjustable Apron",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "apronWhitePocketConfigs",
    gallery: ["apronWhitePocketConfigs"],
    description: "Style APW-003 white adjustable apron with a bottom pocket only.",
    specs: [
      { label: "Style", value: "APW-003" },
      { label: "Configuration", value: "Bottom pocket only" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "apron-apw-004",
    name: "White Adjustable Apron — Top & Bottom Pocket",
    style: "APW-004",
    categorySlug: "hospitality",
    subcategorySlug: "adjustable-apron",
    subcategoryName: "Adjustable Apron",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "apronWhitePocketConfigs",
    gallery: ["apronWhitePocketConfigs"],
    description: "Style APW-004 white adjustable apron with top and bottom pockets.",
    specs: [
      { label: "Style", value: "APW-004" },
      { label: "Configuration", value: "Top and bottom pocket" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "apron-apw-005",
    name: "Black Adjustable Apron — No Pocket",
    style: "APW-005",
    categorySlug: "hospitality",
    subcategorySlug: "adjustable-apron",
    subcategoryName: "Adjustable Apron",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "apronBlackPocketConfigs",
    gallery: ["apronBlackPocketConfigs"],
    description: "Style APW-005 black adjustable apron with no pocket.",
    specs: [
      { label: "Style", value: "APW-005" },
      { label: "Configuration", value: "No pocket" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "apron-apw-006",
    name: "Black Adjustable Apron — Top Pocket",
    style: "APW-006",
    categorySlug: "hospitality",
    subcategorySlug: "adjustable-apron",
    subcategoryName: "Adjustable Apron",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "apronBlackPocketConfigs",
    gallery: ["apronBlackPocketConfigs"],
    description: "Style APW-006 black adjustable apron with a top pocket only.",
    specs: [
      { label: "Style", value: "APW-006" },
      { label: "Configuration", value: "Top pocket only" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "apron-apw-007",
    name: "Black Adjustable Apron — Bottom Pocket",
    style: "APW-007",
    categorySlug: "hospitality",
    subcategorySlug: "adjustable-apron",
    subcategoryName: "Adjustable Apron",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "apronBlackPocketConfigs",
    gallery: ["apronBlackPocketConfigs"],
    description: "Style APW-007 black adjustable apron with a bottom pocket only.",
    specs: [
      { label: "Style", value: "APW-007" },
      { label: "Configuration", value: "Bottom pocket only" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "apron-apw-008",
    name: "Black Adjustable Apron — Top & Bottom Pocket",
    style: "APW-008",
    categorySlug: "hospitality",
    subcategorySlug: "adjustable-apron",
    subcategoryName: "Adjustable Apron",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "apronBlackPocketConfigs",
    gallery: ["apronBlackPocketConfigs"],
    description: "Style APW-008 black adjustable apron with top and bottom pockets.",
    specs: [
      { label: "Style", value: "APW-008" },
      { label: "Configuration", value: "Top and bottom pocket" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "apron-apwb-009",
    name: "White/Black Adjustable Apron",
    style: "APWB-009",
    categorySlug: "hospitality",
    subcategorySlug: "adjustable-apron",
    subcategoryName: "Adjustable Apron",
    colours: [{ name: "White/Black", hex: "#14130f" }],
    imageKey: "apronApwb009",
    gallery: ["apronApwb009"],
    description:
      "Style APWB-009 white apron with black top pocket, bottom pocket, neck strap, and 2 side straps.",
    specs: [
      { label: "Style", value: "APWB-009" },
      { label: "Configuration", value: "Top + bottom pocket, neck strap, 2 side straps" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "cap-ccw-105",
    name: "White Unisex Cook Cap",
    style: "CCW-105",
    categorySlug: "hospitality",
    subcategorySlug: "cook-cap",
    subcategoryName: "Cook Cap",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "cookCapCcw105",
    gallery: ["cookCapCcw105"],
    description:
      "Style CCW-105 white unisex cook cap in a 65% poly / 35% cotton blend, back adjustable.",
    specs: [
      { label: "Style", value: "CCW-105" },
      { label: "Fit", value: "Back adjustable" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "cap-ccb-110",
    name: "Black Unisex Cook Cap",
    style: "CCB-110",
    categorySlug: "hospitality",
    subcategorySlug: "cook-cap",
    subcategoryName: "Cook Cap",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "cookCapCcb110",
    gallery: ["cookCapCcb110"],
    description:
      "Style CCB-110 black unisex cook cap in a 65% poly / 35% cotton blend, back adjustable.",
    specs: [
      { label: "Style", value: "CCB-110" },
      { label: "Fit", value: "Back adjustable" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "bandana-bbu-115",
    name: "Black Unisex Bandana",
    style: "BBU-115",
    categorySlug: "hospitality",
    subcategorySlug: "bandana",
    subcategoryName: "Bandana",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "bandanaBbu115",
    gallery: ["bandanaBbu115"],
    description:
      "Style BBU-115 black unisex bandana in a 65% poly / 35% cotton blend, back adjustable.",
    specs: [
      { label: "Style", value: "BBU-115" },
      { label: "Fit", value: "Back adjustable" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "chef-hat-chw-120",
    name: "White Unisex Chef Hat",
    style: "CHW-120",
    categorySlug: "hospitality",
    subcategorySlug: "chef-hat",
    subcategoryName: "Chef Hat",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "chefHatChw120",
    gallery: ["chefHatChw120"],
    description:
      "Style CHW-120 white unisex chef hat in a 65% poly / 35% cotton blend, back adjustable.",
    specs: [
      { label: "Style", value: "CHW-120" },
      { label: "Fit", value: "Back adjustable" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "chef-hat-chb-125",
    name: "Black Unisex Chef Hat",
    style: "CHB-125",
    categorySlug: "hospitality",
    subcategorySlug: "chef-hat",
    subcategoryName: "Chef Hat",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "chefHatChb125",
    gallery: ["chefHatChb125"],
    description:
      "Style CHB-125 black unisex chef hat in a 65% poly / 35% cotton blend, back adjustable.",
    specs: [
      { label: "Style", value: "CHB-125" },
      { label: "Fit", value: "Back adjustable" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "consultation-coat-mcc-7250",
    name: "Mens Consultation Coat",
    style: "MCC-7250",
    categorySlug: "health-wear",
    subcategorySlug: "mens-consultation-coat",
    subcategoryName: "Mens Consultation Coat",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "consultationCoatMcc7250",
    gallery: ["consultationCoatMcc7250", "consultationCoatMcc7250Detail"],
    description:
      "Style MCC-7250 mens consultation coat in a 65% poly / 35% cotton blend — available in White.",
    specs: [
      { label: "Style", value: "MCC-7250" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "consultation-coat-wcc-7300",
    name: "Womans Consultation Coat",
    style: "WCC-7300",
    categorySlug: "health-wear",
    subcategorySlug: "womans-consultation-coat",
    subcategoryName: "Womans Consultation Coat",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "consultationCoatWcc7300",
    gallery: ["consultationCoatWcc7300", "consultationCoatWcc7300Detail"],
    description:
      "Style WCC-7300 womans consultation coat in a 65% poly / 35% cotton blend — available in White.",
    specs: [
      { label: "Style", value: "WCC-7300" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "lab-coat-dcn-534",
    name: "Unisex Lab Coat",
    style: "DCN-534",
    categorySlug: "industrial",
    subcategorySlug: "lab-coat",
    subcategoryName: "Lab Coat",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "labCoatDcn534",
    gallery: ["labCoatDcn534", "labCoatDcn534Detail"],
    description:
      "Style DCN-534 unisex lab coat in a 65% poly / 35% cotton blend — available in White.",
    specs: [
      { label: "Style", value: "DCN-534" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "dust-coat-dcn-534",
    name: "Dust Coat",
    style: "DCN-534",
    categorySlug: "industrial",
    subcategorySlug: "dust-coat",
    subcategoryName: "Dust Coat",
    colours: [{ name: "Navy", hex: "#1c2b45" }],
    imageKey: "dustCoatDcn534",
    gallery: ["dustCoatDcn534", "dustCoatDcn534Detail"],
    description:
      "Style DCN-534 dust coat in a 65% poly / 35% cotton blend — available in Navy.",
    specs: [
      { label: "Style", value: "DCN-534" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-mcca-210",
    name: "Mens Chef Coat — Short Sleeve",
    style: "MCCA-210",
    categorySlug: "hospitality",
    subcategorySlug: "mens-chef-coat",
    subcategoryName: "Mens Chef Coat",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "chefCoatMcca210",
    gallery: ["chefCoatMcca210"],
    description:
      "Style MCCA-210 mens short-sleeve chef coat in a 65% poly / 35% cotton blend — available in White.",
    specs: [
      { label: "Style", value: "MCCA-210" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 3XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-mccb-212",
    name: "Mens Chef Coat — Long Sleeve",
    style: "MCCB-212",
    categorySlug: "hospitality",
    subcategorySlug: "mens-chef-coat",
    subcategoryName: "Mens Chef Coat",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "chefCoatMccb212",
    gallery: ["chefCoatMccb212"],
    description:
      "Style MCCB-212 mens long-sleeve chef coat in a 65% poly / 35% cotton blend — available in White.",
    specs: [
      { label: "Style", value: "MCCB-212" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 3XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-mccc-220",
    name: "Mens Chef Coat — Short Sleeve",
    style: "MCCC-220",
    categorySlug: "hospitality",
    subcategorySlug: "mens-chef-coat",
    subcategoryName: "Mens Chef Coat",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "chefCoatMccc220",
    gallery: ["chefCoatMccc220"],
    description:
      "Style MCCC-220 mens short-sleeve chef coat in a 65% poly / 35% cotton blend — available in Black.",
    specs: [
      { label: "Style", value: "MCCC-220" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 3XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-mccd-222",
    name: "Mens Chef Coat — Long Sleeve",
    style: "MCCD-222",
    categorySlug: "hospitality",
    subcategorySlug: "mens-chef-coat",
    subcategoryName: "Mens Chef Coat",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "chefCoatMccd222",
    gallery: ["chefCoatMccd222"],
    description:
      "Style MCCD-222 mens long-sleeve chef coat in a 65% poly / 35% cotton blend — available in Black.",
    specs: [
      { label: "Style", value: "MCCD-222" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 3XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-mcce-230",
    name: "Mens Chef Coat — Short Sleeve, Black Trim",
    style: "MCCE-230",
    categorySlug: "hospitality",
    subcategorySlug: "mens-chef-coat",
    subcategoryName: "Mens Chef Coat",
    colours: [{ name: "White/Black", hex: "#14130f" }],
    imageKey: "chefCoatMcce230",
    gallery: ["chefCoatMcce230"],
    description:
      "Style MCCE-230 mens short-sleeve chef coat in a 65% poly / 35% cotton blend, white body with black piping and pocket trim.",
    specs: [
      { label: "Style", value: "MCCE-230" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 3XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-mccf-232",
    name: "Mens Chef Coat — Long Sleeve, Black Trim",
    style: "MCCF-232",
    categorySlug: "hospitality",
    subcategorySlug: "mens-chef-coat",
    subcategoryName: "Mens Chef Coat",
    colours: [{ name: "White/Black", hex: "#14130f" }],
    imageKey: "chefCoatMccf232",
    gallery: ["chefCoatMccf232"],
    description:
      "Style MCCF-232 mens long-sleeve chef coat in a 65% poly / 35% cotton blend, white body with black piping and cuff/pocket trim.",
    specs: [
      { label: "Style", value: "MCCF-232" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 3XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-mccg-240",
    name: "Mens Chef Coat — Short Sleeve, White Trim",
    style: "MCCG-240",
    categorySlug: "hospitality",
    subcategorySlug: "mens-chef-coat",
    subcategoryName: "Mens Chef Coat",
    colours: [{ name: "Black/White", hex: "#ffffff" }],
    imageKey: "chefCoatMccg240",
    gallery: ["chefCoatMccg240"],
    description:
      "Style MCCG-240 mens short-sleeve chef coat in a 65% poly / 35% cotton blend, black body with white piping and pocket trim.",
    specs: [
      { label: "Style", value: "MCCG-240" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 3XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-mcch-242",
    name: "Mens Chef Coat — Long Sleeve, White Trim",
    style: "MCCH-242",
    categorySlug: "hospitality",
    subcategorySlug: "mens-chef-coat",
    subcategoryName: "Mens Chef Coat",
    colours: [{ name: "Black/White", hex: "#ffffff" }],
    imageKey: "chefCoatMcch242",
    gallery: ["chefCoatMcch242"],
    description:
      "Style MCCH-242 mens long-sleeve chef coat in a 65% poly / 35% cotton blend, black body with white piping and cuff trim.",
    specs: [
      { label: "Style", value: "MCCH-242" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 3XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-pant-cpb-67",
    name: "Chef Pant",
    style: "CPB-67",
    categorySlug: "hospitality",
    subcategorySlug: "chef-pant",
    subcategoryName: "Chef Pant",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "chefPantCpb67",
    gallery: ["chefPantCpb67"],
    description: "Style CPB-67 elastic-waist chef pant in poly-cotton — available in Black.",
    specs: [
      { label: "Style", value: "CPB-67" },
      { label: "Size", value: "28 – 48" },
      { label: "Fabric", value: "Poly-Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-wcca-320",
    name: "Womans Chef Coat — Short Sleeve",
    style: "WCCA-320",
    categorySlug: "hospitality",
    subcategorySlug: "womans-chef-coat",
    subcategoryName: "Womans Chef Coat",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "chefCoatWcca320",
    gallery: ["chefCoatWcca320"],
    description:
      "Style WCCA-320 womans short-sleeve chef coat in a 65% poly / 35% cotton blend — available in White.",
    specs: [
      { label: "Style", value: "WCCA-320" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-wccb-325",
    name: "Womans Chef Coat — Long Sleeve",
    style: "WCCB-325",
    categorySlug: "hospitality",
    subcategorySlug: "womans-chef-coat",
    subcategoryName: "Womans Chef Coat",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "chefCoatWccb325",
    gallery: ["chefCoatWccb325"],
    description:
      "Style WCCB-325 womans long-sleeve chef coat in a 65% poly / 35% cotton blend — available in White.",
    specs: [
      { label: "Style", value: "WCCB-325" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-wccc-330",
    name: "Womans Chef Coat — Short Sleeve",
    style: "WCCC-330",
    categorySlug: "hospitality",
    subcategorySlug: "womans-chef-coat",
    subcategoryName: "Womans Chef Coat",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "chefCoatWccc330",
    gallery: ["chefCoatWccc330"],
    description:
      "Style WCCC-330 womans short-sleeve chef coat in a 65% poly / 35% cotton blend — available in Black.",
    specs: [
      { label: "Style", value: "WCCC-330" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-wccd-335",
    name: "Womans Chef Coat — Long Sleeve",
    style: "WCCD-335",
    categorySlug: "hospitality",
    subcategorySlug: "womans-chef-coat",
    subcategoryName: "Womans Chef Coat",
    colours: [{ name: "Black", hex: "#14130f" }],
    imageKey: "chefCoatWccd335",
    gallery: ["chefCoatWccd335"],
    description:
      "Style WCCD-335 womans long-sleeve chef coat in a 65% poly / 35% cotton blend — available in Black.",
    specs: [
      { label: "Style", value: "WCCD-335" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-wcce-340",
    name: "Womans Chef Coat — Short Sleeve, Black Trim",
    style: "WCCE-340",
    categorySlug: "hospitality",
    subcategorySlug: "womans-chef-coat",
    subcategoryName: "Womans Chef Coat",
    colours: [{ name: "White/Black", hex: "#14130f" }],
    imageKey: "chefCoatWcce340",
    gallery: ["chefCoatWcce340"],
    description:
      "Style WCCE-340 womans short-sleeve chef coat in a 65% poly / 35% cotton blend, white body with black collar and piping.",
    specs: [
      { label: "Style", value: "WCCE-340" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-wccf-345",
    name: "Womans Chef Coat — Long Sleeve, Black Trim",
    style: "WCCF-345",
    categorySlug: "hospitality",
    subcategorySlug: "womans-chef-coat",
    subcategoryName: "Womans Chef Coat",
    colours: [{ name: "White/Black", hex: "#14130f" }],
    imageKey: "chefCoatWccf345",
    gallery: ["chefCoatWccf345"],
    description:
      "Style WCCF-345 womans long-sleeve chef coat in a 65% poly / 35% cotton blend, white body with black collar, piping, and cuffs.",
    specs: [
      { label: "Style", value: "WCCF-345" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-wccg-350",
    name: "Womans Chef Coat — Short Sleeve, White Trim",
    style: "WCCG-350",
    categorySlug: "hospitality",
    subcategorySlug: "womans-chef-coat",
    subcategoryName: "Womans Chef Coat",
    colours: [{ name: "Black/White", hex: "#ffffff" }],
    imageKey: "chefCoatWccg350",
    gallery: ["chefCoatWccg350"],
    description:
      "Style WCCG-350 womans short-sleeve chef coat in a 65% poly / 35% cotton blend, black body with white collar and piping.",
    specs: [
      { label: "Style", value: "WCCG-350" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-wcch-355",
    name: "Womans Chef Coat — Long Sleeve, White Trim",
    style: "WCCH-355",
    categorySlug: "hospitality",
    subcategorySlug: "womans-chef-coat",
    subcategoryName: "Womans Chef Coat",
    colours: [{ name: "Black/White", hex: "#ffffff" }],
    imageKey: "chefCoatWcch355",
    gallery: ["chefCoatWcch355"],
    description:
      "Style WCCH-355 womans long-sleeve chef coat in a 65% poly / 35% cotton blend, black body with white collar, piping, and cuffs.",
    specs: [
      { label: "Style", value: "WCCH-355" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 2XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "mens-tshirt-mts-99",
    name: "Mens T-Shirt",
    style: "MTS-99",
    categorySlug: "polo-and-tshirts",
    subcategorySlug: "mens-tshirt",
    subcategoryName: "Mens T-Shirt",
    colours: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#14130f" },
      { name: "Beige", hex: "#e8dfc8" },
      { name: "Medium Grey", hex: "#9a9a9a" },
      { name: "Light Blue", hex: "#7ba7d9" },
      { name: "Light Green", hex: "#8fd18f" },
      { name: "Sky Blue", hex: "#3fa9dc" },
      { name: "Gold", hex: "#e0b02e" },
      { name: "Grey Charcoal", hex: "#4a4a4a" },
      { name: "Green", hex: "#1f6f3d" },
      { name: "Maroon", hex: "#6e1f2e" },
      { name: "Navy", hex: "#1c2b45" },
      { name: "Light Grey", hex: "#c9c9c9" },
      { name: "Pink", hex: "#f3a6c9" },
      { name: "Light Red", hex: "#e8412c" },
      { name: "Orange", hex: "#e8760f" },
      { name: "Ocean Blue", hex: "#0f6fb3" },
      { name: "Dark Red", hex: "#7a1c1c" },
      { name: "Lake Blue", hex: "#0f7a6e" },
      { name: "Purple", hex: "#5c3a8f" },
      { name: "Dark Royal", hex: "#1c2f6e" },
      { name: "Coffee", hex: "#3f2f22" },
    ],
    imageKey: "mensTshirtMts99",
    gallery: ["mensTshirtMts99"],
    description:
      "Style MTS-99 mens crew-neck t-shirt in 100% cotton — available in 22 colours.",
    specs: [
      { label: "Style", value: "MTS-99" },
      { label: "Fabric", value: "100% Cotton" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "womans-tshirt-wtssf-97",
    name: "Womans T-Shirt — Slim Fit",
    style: "WTSSF-97",
    categorySlug: "polo-and-tshirts",
    subcategorySlug: "womans-tshirt",
    subcategoryName: "Womans T-Shirt",
    colours: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#14130f" },
      { name: "Baby", hex: "#f7c9dc" },
      { name: "Apple Green", hex: "#7fc93f" },
      { name: "Gold", hex: "#e0b02e" },
      { name: "Purple", hex: "#5c3a8f" },
      { name: "Coffee", hex: "#3f2f22" },
      { name: "Royal Blue", hex: "#1c4fa0" },
      { name: "Navy", hex: "#1c2b45" },
      { name: "Smoke Grey", hex: "#9a9a9a" },
      { name: "Warm Grey", hex: "#8a8378" },
      { name: "Teal", hex: "#0f7a6e" },
      { name: "Ocean Blue", hex: "#0f6fb3" },
      { name: "Red", hex: "#c31f2c" },
      { name: "Hunter Green", hex: "#1f5c33" },
      { name: "Orange", hex: "#e8760f" },
      { name: "Barn Red", hex: "#7a2820" },
      { name: "Maroon", hex: "#6e1f2e" },
    ],
    imageKey: "womansTshirtWtssf97",
    gallery: ["womansTshirtWtssf97"],
    description:
      "Style WTSSF-97 womans slim-fit t-shirt in 100% cotton — available in 18 colours.",
    specs: [
      { label: "Style", value: "WTSSF-97" },
      { label: "Fit", value: "Slim fit" },
      { label: "Fabric", value: "100% Cotton" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },
  {
    slug: "unisex-polo-ups-100",
    name: "Unisex Polo Shirt",
    style: "UPS-100",
    categorySlug: "polo-and-tshirts",
    subcategorySlug: "unisex-polo",
    subcategoryName: "Unisex Polo Shirt",
    colours: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#14130f" },
      { name: "Grey", hex: "#a8a8a8" },
      { name: "Gold", hex: "#e0b02e" },
      { name: "Blue", hex: "#2a8fd6" },
      { name: "Ocean Blue", hex: "#0f6fb3" },
      { name: "Lake Blue", hex: "#0f7a6e" },
      { name: "Red", hex: "#c31f2c" },
      { name: "Green", hex: "#1f6f3d" },
      { name: "Navy", hex: "#1c2b45" },
    ],
    imageKey: "unisexPoloUps100",
    gallery: ["unisexPoloUps100"],
    description:
      "Style UPS-100 unisex polo shirt in 100% cotton — available in 10 colours.",
    specs: [
      { label: "Style", value: "UPS-100" },
      { label: "Fabric", value: "100% Cotton" },
    ],
    care: GENERIC_CARE_INSTRUCTIONS,
  },

  /**
   * 31Aug batch — of the 8 PDFs in 31Aug/, only 4 contained net-new
   * products: Coverall Web.pdf, Industrial Polo.pdf, Industrial
   * Shirt.pdf, and Mens Chef Coat MCCI-243.pdf. The other 4 were skipped
   * as duplicates of data already transcribed elsewhere: Chef Pant.pdf
   * (same CPB-67 already added from 25Aug/Mens Chef Coat Web.pdf),
   * Healthwear Scrub Pant Web.pdf and Healthwear Scrub Top Web.pdf
   * (identical style codes/colours to the versions already added from
   * 15Sep), and SMART TAG.pdf (the company logo, not a product).
   *
   * Coverall Web.pdf: 4 styles, each genuinely different (not
   * colourways of one garment) — CLR-1020 (white/plain, lightweight),
   * CLRR-1030 (white/plain, lightweight, with reflector — a real
   * feature difference from CLR-1020, not just a colour), CON-4225
   * (orange/navy hi-vis, 100% cotton), CYN-4335 (yellow/navy hi-vis,
   * 100% cotton) — so each is its own product/subcategory rather than
   * one style's variants.
   *
   * Industrial Polo.pdf / Industrial Shirt.pdf: 4 styles each, one per
   * style code, each its own colourway (orange/black, navy/orange,
   * yellow/navy, yellow/navy) — no style code is reused across colours
   * here, so no grouping applies (unlike e.g. the 15Sep scrub pant
   * case). Sample images show mock client logos/business names (e.g.
   * "Auto Repair", "Tire Store", "City Paint") baked into the sample
   * photography as embroidery-capability examples — these are not real
   * Smart Uniform products tied to those businesses, so the mock
   * branding is intentionally omitted from name/description/specs.
   *
   * Mens Chef Coat MCCI-243.pdf: a 9th mens chef coat style (white,
   * long sleeve, black trim/cuffs) — joins the existing
   * "mens-chef-coat" subcategory alongside MCCA–MCCH from the 25Aug
   * batch rather than starting a new one, since it's the same garment
   * type as those.
   */
  {
    slug: "coverall-clr-1020",
    name: "Coverall — Lightweight",
    style: "CLR-1020",
    categorySlug: "industrial",
    subcategorySlug: "coverall",
    subcategoryName: "Coverall",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "coverallClr1020",
    gallery: ["coverallClr1020"],
    description:
      "Style CLR-1020 lightweight coverall in a 65% poly / 35% cotton blend — available in White.",
    specs: [
      { label: "Style", value: "CLR-1020" },
      { label: "Weight", value: "Lightweight" },
      { label: "Size", value: "38 – 50" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "coverall-clrr-1030",
    name: "Coverall — Lightweight, With Reflector",
    style: "CLRR-1030",
    categorySlug: "industrial",
    subcategorySlug: "coverall",
    subcategoryName: "Coverall",
    colours: [{ name: "White", hex: "#ffffff" }],
    imageKey: "coverallClrr1030",
    gallery: ["coverallClrr1030"],
    description:
      "Style CLRR-1030 lightweight coverall with reflective tape, in a 65% poly / 35% cotton blend — available in White.",
    specs: [
      { label: "Style", value: "CLRR-1030" },
      { label: "Weight", value: "Lightweight, with reflector" },
      { label: "Size", value: "38 – 50" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "coverall-con-4225",
    name: "Coverall — Hi-Vis",
    style: "CON-4225",
    categorySlug: "industrial",
    subcategorySlug: "coverall",
    subcategoryName: "Coverall",
    colours: [{ name: "Orange/Navy", hex: "#e8760f" }],
    imageKey: "coverallCon4225",
    gallery: ["coverallCon4225", "coverallCon4225Detail"],
    description:
      "Style CON-4225 hi-vis coverall with reflective tape in 100% cotton — available in Orange/Navy.",
    specs: [
      { label: "Style", value: "CON-4225" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "100% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "coverall-cyn-4335",
    name: "Coverall — Hi-Vis",
    style: "CYN-4335",
    categorySlug: "industrial",
    subcategorySlug: "coverall",
    subcategoryName: "Coverall",
    colours: [{ name: "Yellow/Navy", hex: "#e0c02e" }],
    imageKey: "coverallCyn4335",
    gallery: ["coverallCyn4335", "coverallCyn4335Detail"],
    description:
      "Style CYN-4335 hi-vis coverall with reflective tape in 100% cotton — available in Yellow/Navy.",
    specs: [
      { label: "Style", value: "CYN-4335" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "100% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "industrial-polo-ipos-2030",
    name: "Industrial Polo — Short Sleeve",
    style: "IPOS-2030",
    categorySlug: "industrial",
    subcategorySlug: "industrial-polo",
    subcategoryName: "Industrial Polo",
    colours: [{ name: "Orange/Black", hex: "#e8760f" }],
    imageKey: "industrialPoloIpos2030",
    gallery: ["industrialPoloIpos2030", "industrialPoloIpos2030Detail"],
    description:
      "Style IPOS-2030 short-sleeve hi-vis industrial polo in polyester — available in Orange/Black.",
    specs: [
      { label: "Style", value: "IPOS-2030" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "industrial-polo-ipol-2040",
    name: "Industrial Polo — Long Sleeve",
    style: "IPOL-2040",
    categorySlug: "industrial",
    subcategorySlug: "industrial-polo",
    subcategoryName: "Industrial Polo",
    colours: [{ name: "Orange/Navy", hex: "#e8760f" }],
    imageKey: "industrialPoloIpol2040",
    gallery: ["industrialPoloIpol2040", "industrialPoloIpol2040Detail"],
    description:
      "Style IPOL-2040 long-sleeve hi-vis industrial polo in polyester — available in Orange/Navy.",
    specs: [
      { label: "Style", value: "IPOL-2040" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "industrial-polo-ipgs-2050",
    name: "Industrial Polo — Short Sleeve",
    style: "IPGS-2050",
    categorySlug: "industrial",
    subcategorySlug: "industrial-polo",
    subcategoryName: "Industrial Polo",
    colours: [{ name: "Yellow/Navy", hex: "#e0c02e" }],
    imageKey: "industrialPoloIpgs2050",
    gallery: ["industrialPoloIpgs2050", "industrialPoloIpgs2050Detail"],
    description:
      "Style IPGS-2050 short-sleeve hi-vis industrial polo in polyester — available in Yellow/Navy.",
    specs: [
      { label: "Style", value: "IPGS-2050" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "industrial-polo-ipgl-2060",
    name: "Industrial Polo — Long Sleeve",
    style: "IPGL-2060",
    categorySlug: "industrial",
    subcategorySlug: "industrial-polo",
    subcategoryName: "Industrial Polo",
    colours: [{ name: "Yellow/Navy", hex: "#e0c02e" }],
    imageKey: "industrialPoloIpgl2060",
    gallery: ["industrialPoloIpgl2060", "industrialPoloIpgl2060Detail"],
    description:
      "Style IPGL-2060 long-sleeve hi-vis industrial polo in polyester — available in Yellow/Navy.",
    specs: [
      { label: "Style", value: "IPGL-2060" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "Polyester" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "industrial-shirt-isos-3535",
    name: "Industrial Shirt — Short Sleeve",
    style: "ISOS-3535",
    categorySlug: "industrial",
    subcategorySlug: "industrial-shirt",
    subcategoryName: "Industrial Shirt",
    colours: [{ name: "Orange/Navy", hex: "#e8760f" }],
    imageKey: "industrialShirtIsos3535",
    gallery: ["industrialShirtIsos3535", "industrialShirtIsos3535Detail"],
    description:
      "Style ISOS-3535 short-sleeve hi-vis industrial shirt in a 65% poly / 35% cotton blend — available in Orange/Navy.",
    specs: [
      { label: "Style", value: "ISOS-3535" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "industrial-shirt-isol-3545",
    name: "Industrial Shirt — Long Sleeve",
    style: "ISOL-3545",
    categorySlug: "industrial",
    subcategorySlug: "industrial-shirt",
    subcategoryName: "Industrial Shirt",
    colours: [{ name: "Orange/Navy", hex: "#e8760f" }],
    imageKey: "industrialShirtIsol3545",
    gallery: ["industrialShirtIsol3545", "industrialShirtIsol3545Detail"],
    description:
      "Style ISOL-3545 long-sleeve hi-vis industrial shirt in a 65% poly / 35% cotton blend — available in Orange/Navy.",
    specs: [
      { label: "Style", value: "ISOL-3545" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "industrial-shirt-isys-3550",
    name: "Industrial Shirt — Short Sleeve",
    style: "ISYS-3550",
    categorySlug: "industrial",
    subcategorySlug: "industrial-shirt",
    subcategoryName: "Industrial Shirt",
    colours: [{ name: "Yellow/Navy", hex: "#e0c02e" }],
    imageKey: "industrialShirtIsys3550",
    gallery: ["industrialShirtIsys3550", "industrialShirtIsys3550Detail"],
    description:
      "Style ISYS-3550 short-sleeve hi-vis industrial shirt in a 65% poly / 35% cotton blend — available in Yellow/Navy.",
    specs: [
      { label: "Style", value: "ISYS-3550" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "industrial-shirt-isyl-3560",
    name: "Industrial Shirt — Long Sleeve",
    style: "ISYL-3560",
    categorySlug: "industrial",
    subcategorySlug: "industrial-shirt",
    subcategoryName: "Industrial Shirt",
    colours: [{ name: "Yellow/Navy", hex: "#e0c02e" }],
    imageKey: "industrialShirtIsyl3560",
    gallery: ["industrialShirtIsyl3560", "industrialShirtIsyl3560Detail"],
    description:
      "Style ISYL-3560 long-sleeve hi-vis industrial shirt in a 65% poly / 35% cotton blend — available in Yellow/Navy.",
    specs: [
      { label: "Style", value: "ISYL-3560" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 4XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
  {
    slug: "chef-coat-mcci-243",
    name: "Mens Chef Coat — Long Sleeve, Black Trim",
    style: "MCCI-243",
    categorySlug: "hospitality",
    subcategorySlug: "mens-chef-coat",
    subcategoryName: "Mens Chef Coat",
    colours: [{ name: "White/Black", hex: "#14130f" }],
    imageKey: "chefCoatMcci243",
    gallery: ["chefCoatMcci243"],
    description:
      "Style MCCI-243 mens long-sleeve chef coat in a 65% poly / 35% cotton blend, white body with black collar and cuff trim.",
    specs: [
      { label: "Style", value: "MCCI-243" },
      { label: "Sleeve", value: "Long sleeve" },
      { label: "Size", value: "XS – 3XL" },
      { label: "Fabric", value: "65% Polyester / 35% Cotton" },
    ],
    care: STANDARD_CARE,
  },
];
