/**
 * Stand-in stock photography for sections that don't yet have real client
 * photography (see client-business-info.md — gallery/photography is a
 * confirmed content gap). Sourced from Unsplash, free to use.
 *
 * Swap these entries for real Smart Uniform and Embroidery photography as
 * it becomes available — every consumer reads from here rather than
 * hardcoding URLs, so that's a one-file change.
 */
export const STOCK_IMAGES = {
  hero: {
    src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80&fit=crop&auto=format",
    alt: "Rack of neatly arranged uniform garments in multiple colors",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  about: {
    src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80&fit=crop&auto=format",
    alt: "Rack of neatly arranged uniform garments in multiple colors",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  // Shared placeholder for per-industry/per-service swatches until each
  // gets its own real photo — swap for distinct images per entry later.
  industryPlaceholder: {
    src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80&fit=crop&auto=format",
    alt: "Uniform garment placeholder",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  // One distinct placeholder per hero/product category — swap for real
  // client photography per garment as it becomes available.
  productAdministration: {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&fit=crop&auto=format",
    alt: "Person in a dark business suit and tie, hands clasped, in an office setting",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  productPolosTshirts: {
    src: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&q=80&fit=crop&auto=format",
    alt: "Plain polo shirt hanging on a wooden hanger against a dark wall",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  productHealthWear: {
    src: "https://images.unsplash.com/photo-1666887360921-85952a86894f?w=1200&q=80&fit=crop&auto=format",
    alt: "Close-up of a person in light blue medical scrubs with a stethoscope",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  productSecurity: {
    src: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=1200&q=80&fit=crop&auto=format",
    alt: "Security guard in a dark uniform standing watch in a building lobby",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  productIndustrialHospitality: {
    src: "https://images.unsplash.com/photo-1559073760-0ee41703dbf7?w=1200&q=80&fit=crop&auto=format",
    alt: "Worker in orange hi-vis coveralls and a hard hat on an industrial site",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  productHospitality: {
    src: "https://images.unsplash.com/photo-1719573019827-d06944a0c2be?w=1200&q=80&fit=crop&auto=format",
    alt: "Waiter in a formal black tuxedo jacket, white shirt, and apron carrying a serving tray",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  aboutStory: {
    src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1400&q=80&fit=crop&auto=format",
    alt: "Folded knit sweaters and denim garments arranged flat",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  aboutCraft: {
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80&fit=crop&auto=format",
    alt: "Rack of neatly hung garments in warm, earthy tones",
    credit: "Unsplash — placeholder photography, pending client assets",
  },

  // Real client product photography, extracted from the PDF spec sheets
  // in public/images/smart-uniforms/ and re-saved under
  // public/images/products/<category-slug>/<subcategory-slug>/<style-code
  // (lowercase)>.jpg. One entry per style as real photos are extracted —
  // NEW_PRODUCTS entries still on a shared productXxx placeholder above
  // haven't been extracted yet.
  capBcp79: {
    src: "/images/products/accessories/cap/bcp-79.jpg",
    alt: "Black adjustable baseball cap on a concrete studio surface",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSpg101: {
    src: "/images/products/health-wear/unisex-scrub-pant/spg-101.jpg",
    alt: "Green unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSpb122: {
    src: "/images/products/health-wear/unisex-scrub-pant/spb-122.jpg",
    alt: "Black unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSpg144: {
    src: "/images/products/health-wear/unisex-scrub-pant/spg-144.jpg",
    alt: "Grey unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  // SPLB-155 is one style code across 4 colours (see newProducts.js) —
  // each colour has its own real photo, so this is 4 keys, not 1. File
  // names follow the numeric-sequence convention (style.jpg, style-2.jpg,
  // ...) in PDF page order, not a colour-word suffix.
  scrubPantSplb155LightBlue: {
    src: "/images/products/health-wear/unisex-scrub-pant/splb-155.jpg",
    alt: "Light blue unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSplb155Navy: {
    src: "/images/products/health-wear/unisex-scrub-pant/splb-155-2.jpg",
    alt: "Navy unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSplb155RoyalBlue: {
    src: "/images/products/health-wear/unisex-scrub-pant/splb-155-3.jpg",
    alt: "Royal blue unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSplb155Purple: {
    src: "/images/products/health-wear/unisex-scrub-pant/splb-155-4.jpg",
    alt: "Purple unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStg02: {
    src: "/images/products/health-wear/unisex-scrub-top/stg-02.jpg",
    alt: "Green unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStb03: {
    src: "/images/products/health-wear/unisex-scrub-top/stb-03.jpg",
    alt: "Black unisex scrub top with V-neck and chest pocket",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStg04: {
    src: "/images/products/health-wear/unisex-scrub-top/stg-04.jpg",
    alt: "Grey unisex scrub top with V-neck and chest pocket",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStlb05: {
    src: "/images/products/health-wear/unisex-scrub-top/stlb-05.jpg",
    alt: "Light blue unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStn06: {
    src: "/images/products/health-wear/unisex-scrub-top/stn-06.jpg",
    alt: "Navy unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStrb07: {
    src: "/images/products/health-wear/unisex-scrub-top/strb-07.jpg",
    alt: "Royal blue unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStp08: {
    src: "/images/products/health-wear/unisex-scrub-top/stp-08.jpg",
    alt: "Purple unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  // MBBFY-16 etc: re-extracted 2026-09-22 with the fixed >=30KB-per-image
  // method (see project memory) — each style has 4 real photos, not 3:
  // page 1 clean front, page 2 clean back, page 3 has TWO images (front
  // and back with a sample embroidery logo applied). File/key order
  // follows PDF page order, then extraction byte-size order within page 3.
  counterShirtMbbfy16: {
    src: "/images/products/industrial/mens-counter-shirt/mbbfy-16.jpg",
    alt: "Mens two-tone counter shirt in Black/Royal Blue, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbbfy16Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbbfy-16-2.jpg",
    alt: "Mens two-tone counter shirt in Black/Royal Blue, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbbfy16Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbbfy-16-3.jpg",
    alt: "Mens two-tone counter shirt in Black/Royal Blue with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbbfy16Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbbfy-16-4.jpg",
    alt: "Mens two-tone counter shirt in Black/Royal Blue with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbyfy07: {
    src: "/images/products/industrial/mens-counter-shirt/mbyfy-07.jpg",
    alt: "Mens two-tone counter shirt in Black/Yellow, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbyfy07Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbyfy-07-2.jpg",
    alt: "Mens two-tone counter shirt in Black/Yellow, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbyfy07Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbyfy-07-3.jpg",
    alt: "Mens two-tone counter shirt in Black/Yellow with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbyfy07Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbyfy-07-4.jpg",
    alt: "Mens two-tone counter shirt in Black/Yellow with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbrfy09: {
    src: "/images/products/industrial/mens-counter-shirt/mbrfy-09.jpg",
    alt: "Mens two-tone counter shirt in Black/Red, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbrfy09Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbrfy-09-2.jpg",
    alt: "Mens two-tone counter shirt in Black/Red, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbrfy09Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbrfy-09-3.jpg",
    alt: "Mens two-tone counter shirt in Black/Red with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbrfy09Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbrfy-09-4.jpg",
    alt: "Mens two-tone counter shirt in Black/Red with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgnfy28: {
    src: "/images/products/industrial/mens-counter-shirt/mbgnfy-28.jpg",
    alt: "Mens two-tone counter shirt in Black/Green, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgnfy28Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbgnfy-28-2.jpg",
    alt: "Mens two-tone counter shirt in Black/Green, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgnfy28Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbgnfy-28-3.jpg",
    alt: "Mens two-tone counter shirt in Black/Green with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgnfy28Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbgnfy-28-4.jpg",
    alt: "Mens two-tone counter shirt in Black/Green with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgyfy13: {
    src: "/images/products/industrial/mens-counter-shirt/mbgyfy-13.jpg",
    alt: "Mens two-tone counter shirt in Black/Grey, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgyfy13Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbgyfy-13-2.jpg",
    alt: "Mens two-tone counter shirt in Black/Grey, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgyfy13Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbgyfy-13-3.jpg",
    alt: "Mens two-tone counter shirt in Black/Grey with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgyfy13Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbgyfy-13-4.jpg",
    alt: "Mens two-tone counter shirt in Black/Grey with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbufy12: {
    src: "/images/products/industrial/mens-counter-shirt/mbufy-12.jpg",
    alt: "Mens two-tone counter shirt in Black/Burgundy, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbufy12Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbufy-12-2.jpg",
    alt: "Mens two-tone counter shirt in Black/Burgundy, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbufy12Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbufy-12-3.jpg",
    alt: "Mens two-tone counter shirt in Black/Burgundy with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbufy12Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbufy-12-4.jpg",
    alt: "Mens two-tone counter shirt in Black/Burgundy with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbfy16: {
    src: "/images/products/industrial/mens-counter-shirt/mgbfy-16.jpg",
    alt: "Mens two-tone counter shirt in Grey/Royal Blue, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbfy16Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgbfy-16-2.jpg",
    alt: "Mens two-tone counter shirt in Grey/Royal Blue, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbfy16Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgbfy-16-3.jpg",
    alt: "Mens two-tone counter shirt in Grey/Royal Blue with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbfy16Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgbfy-16-4.jpg",
    alt: "Mens two-tone counter shirt in Grey/Royal Blue with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgyfy07: {
    src: "/images/products/industrial/mens-counter-shirt/mgyfy-07.jpg",
    alt: "Mens two-tone counter shirt in Grey/Gold, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgyfy07Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgyfy-07-2.jpg",
    alt: "Mens two-tone counter shirt in Grey/Gold, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgyfy07Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgyfy-07-3.jpg",
    alt: "Mens two-tone counter shirt in Grey/Gold with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgyfy07Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgyfy-07-4.jpg",
    alt: "Mens two-tone counter shirt in Grey/Gold with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgrfy09: {
    src: "/images/products/industrial/mens-counter-shirt/mgrfy-09.jpg",
    alt: "Mens two-tone counter shirt in Grey/Red, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgrfy09Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgrfy-09-2.jpg",
    alt: "Mens two-tone counter shirt in Grey/Red, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgrfy09Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgrfy-09-3.jpg",
    alt: "Mens two-tone counter shirt in Grey/Red with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgrfy09Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgrfy-09-4.jpg",
    alt: "Mens two-tone counter shirt in Grey/Red with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMggfy28: {
    src: "/images/products/industrial/mens-counter-shirt/mggfy-28.jpg",
    alt: "Mens two-tone counter shirt in Grey/Green, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMggfy28Back: {
    src: "/images/products/industrial/mens-counter-shirt/mggfy-28-2.jpg",
    alt: "Mens two-tone counter shirt in Grey/Green, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMggfy28Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mggfy-28-3.jpg",
    alt: "Mens two-tone counter shirt in Grey/Green with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMggfy28Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mggfy-28-4.jpg",
    alt: "Mens two-tone counter shirt in Grey/Green with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbkfy15: {
    src: "/images/products/industrial/mens-counter-shirt/mgbkfy-15.jpg",
    alt: "Mens two-tone counter shirt in Grey/Black, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbkfy15Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgbkfy-15-2.jpg",
    alt: "Mens two-tone counter shirt in Grey/Black, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbkfy15Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgbkfy-15-3.jpg",
    alt: "Mens two-tone counter shirt in Grey/Black with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbkfy15Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgbkfy-15-4.jpg",
    alt: "Mens two-tone counter shirt in Grey/Black with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgufy12: {
    src: "/images/products/industrial/mens-counter-shirt/mgufy-12.jpg",
    alt: "Mens two-tone counter shirt in Grey/Burgundy, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgufy12Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgufy-12-2.jpg",
    alt: "Mens two-tone counter shirt in Grey/Burgundy, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgufy12Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgufy-12-3.jpg",
    alt: "Mens two-tone counter shirt in Grey/Burgundy with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgufy12Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgufy-12-4.jpg",
    alt: "Mens two-tone counter shirt in Grey/Burgundy with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  securityShirtMssd820: {
    src: "/images/products/security/mens-security-shirt/mssd-820.jpg",
    alt: "Mens security shirt in Dark Grey/Charcoal with epaulettes and Security Services chest patch",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbbfy16: {
    src: "/images/products/industrial/womans-counter-shirt/wbbfy-16.jpg",
    alt: "Womans two-tone counter shirt in Black/Royal Blue, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbbfy16Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbbfy-16-2.jpg",
    alt: "Womans two-tone counter shirt in Black/Royal Blue, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbbfy16Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbbfy-16-3.jpg",
    alt: "Womans two-tone counter shirt in Black/Royal Blue with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbbfy16Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbbfy-16-4.jpg",
    alt: "Womans two-tone counter shirt in Black/Royal Blue with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbyfy07: {
    src: "/images/products/industrial/womans-counter-shirt/wbyfy-07.jpg",
    alt: "Womans two-tone counter shirt in Black/Gold, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbyfy07Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbyfy-07-2.jpg",
    alt: "Womans two-tone counter shirt in Black/Gold, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbyfy07Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbyfy-07-3.jpg",
    alt: "Womans two-tone counter shirt in Black/Gold with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbyfy07Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbyfy-07-4.jpg",
    alt: "Womans two-tone counter shirt in Black/Gold with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbrfy09: {
    src: "/images/products/industrial/womans-counter-shirt/wbrfy-09.jpg",
    alt: "Womans two-tone counter shirt in Black/Red, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbrfy09Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbrfy-09-2.jpg",
    alt: "Womans two-tone counter shirt in Black/Red, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbrfy09Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbrfy-09-3.jpg",
    alt: "Womans two-tone counter shirt in Black/Red with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbrfy09Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbrfy-09-4.jpg",
    alt: "Womans two-tone counter shirt in Black/Red with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgnfy28: {
    src: "/images/products/industrial/womans-counter-shirt/wbgnfy-28.jpg",
    alt: "Womans two-tone counter shirt in Black/Green, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgnfy28Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbgnfy-28-2.jpg",
    alt: "Womans two-tone counter shirt in Black/Green, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgnfy28Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbgnfy-28-3.jpg",
    alt: "Womans two-tone counter shirt in Black/Green with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgnfy28Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbgnfy-28-4.jpg",
    alt: "Womans two-tone counter shirt in Black/Green with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgyfy13: {
    src: "/images/products/industrial/womans-counter-shirt/wbgyfy-13.jpg",
    alt: "Womans two-tone counter shirt in Black/Grey, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgyfy13Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbgyfy-13-2.jpg",
    alt: "Womans two-tone counter shirt in Black/Grey, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgyfy13Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbgyfy-13-3.jpg",
    alt: "Womans two-tone counter shirt in Black/Grey with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgyfy13Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbgyfy-13-4.jpg",
    alt: "Womans two-tone counter shirt in Black/Grey with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbufy12: {
    src: "/images/products/industrial/womans-counter-shirt/wbufy-12.jpg",
    alt: "Womans two-tone counter shirt in Black/Burgundy, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbufy12Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbufy-12-2.jpg",
    alt: "Womans two-tone counter shirt in Black/Burgundy, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbufy12Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbufy-12-3.jpg",
    alt: "Womans two-tone counter shirt in Black/Burgundy with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbufy12Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbufy-12-4.jpg",
    alt: "Womans two-tone counter shirt in Black/Burgundy with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbfy16: {
    src: "/images/products/industrial/womans-counter-shirt/wgbfy-16.jpg",
    alt: "Womans two-tone counter shirt in Grey/Royal Blue, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbfy16Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgbfy-16-2.jpg",
    alt: "Womans two-tone counter shirt in Grey/Royal Blue, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbfy16Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgbfy-16-3.jpg",
    alt: "Womans two-tone counter shirt in Grey/Royal Blue with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbfy16Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgbfy-16-4.jpg",
    alt: "Womans two-tone counter shirt in Grey/Royal Blue with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgyfy07: {
    src: "/images/products/industrial/womans-counter-shirt/wgyfy-07.jpg",
    alt: "Womans two-tone counter shirt in Grey/Gold, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgyfy07Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgyfy-07-2.jpg",
    alt: "Womans two-tone counter shirt in Grey/Gold, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgyfy07Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgyfy-07-3.jpg",
    alt: "Womans two-tone counter shirt in Grey/Gold with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgyfy07Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgyfy-07-4.jpg",
    alt: "Womans two-tone counter shirt in Grey/Gold with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgrfy09: {
    src: "/images/products/industrial/womans-counter-shirt/wgrfy-09.jpg",
    alt: "Womans two-tone counter shirt in Grey/Red, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgrfy09Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgrfy-09-2.jpg",
    alt: "Womans two-tone counter shirt in Grey/Red, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgrfy09Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgrfy-09-3.jpg",
    alt: "Womans two-tone counter shirt in Grey/Red with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgrfy09Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgrfy-09-4.jpg",
    alt: "Womans two-tone counter shirt in Grey/Red with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWggnfy28: {
    src: "/images/products/industrial/womans-counter-shirt/wggnfy-28.jpg",
    alt: "Womans two-tone counter shirt in Grey/Green, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWggnfy28Back: {
    src: "/images/products/industrial/womans-counter-shirt/wggnfy-28-2.jpg",
    alt: "Womans two-tone counter shirt in Grey/Green, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWggnfy28Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wggnfy-28-3.jpg",
    alt: "Womans two-tone counter shirt in Grey/Green with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWggnfy28Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wggnfy-28-4.jpg",
    alt: "Womans two-tone counter shirt in Grey/Green with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbkfy15: {
    src: "/images/products/industrial/womans-counter-shirt/wgbkfy-15.jpg",
    alt: "Womans two-tone counter shirt in Grey/Black, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbkfy15Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgbkfy-15-2.jpg",
    alt: "Womans two-tone counter shirt in Grey/Black, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbkfy15Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgbkfy-15-3.jpg",
    alt: "Womans two-tone counter shirt in Grey/Black with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbkfy15Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgbkfy-15-4.jpg",
    alt: "Womans two-tone counter shirt in Grey/Black with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgufy12: {
    src: "/images/products/industrial/womans-counter-shirt/wgufy-12.jpg",
    alt: "Womans two-tone counter shirt in Grey/Burgundy, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgufy12Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgufy-12-2.jpg",
    alt: "Womans two-tone counter shirt in Grey/Burgundy, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgufy12Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgufy-12-3.jpg",
    alt: "Womans two-tone counter shirt in Grey/Burgundy with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgufy12Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgufy-12-4.jpg",
    alt: "Womans two-tone counter shirt in Grey/Burgundy with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  womansSkirtWsks150: {
    src: "/images/products/industrial/womans-skirt/wsks-150.jpg",
    alt: "Navy womans skirt, short length, laid flat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  womansSkirtWskl160: {
    src: "/images/products/industrial/womans-skirt/wskl-160.jpg",
    alt: "Navy womans skirt, long length, laid flat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },

  // Adjustable apron — the source PDF shows one representative photo per
  // colour group (White covers APW-001..004, Black covers APW-005..008),
  // not one photo per pocket configuration, since the 4 configs in each
  // colour are a text-only distinction on the spec sheet. Shared across
  // 4 products each; APWB-009 (white/black two-tone) has its own photo.
  apronWhitePocketConfigs: {
    src: "/images/products/hospitality/adjustable-apron/apw-001-004-white.jpg",
    alt: "White adjustable apron with chest and waist pockets, hanging on a wall hook",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  apronBlackPocketConfigs: {
    src: "/images/products/hospitality/adjustable-apron/apw-005-008-black.jpg",
    alt: "Black adjustable apron with waist pocket, hanging on a wall hook",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  apronApwb009: {
    src: "/images/products/hospitality/adjustable-apron/apwb-009.jpg",
    alt: "White adjustable apron with black chest pocket, waist pocket, neck strap, and side straps",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  cookCapCcw105: {
    src: "/images/products/hospitality/cook-cap/ccw-105.jpg",
    alt: "White unisex cook cap, back-adjustable, on a wooden countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  cookCapCcb110: {
    src: "/images/products/hospitality/cook-cap/ccb-110.jpg",
    alt: "Black unisex cook cap, back-adjustable, on a marble countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  bandanaBbu115: {
    src: "/images/products/hospitality/bandana/bbu-115.jpg",
    alt: "Black unisex bandana-style cap with back ties, on a wooden countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefHatChw120: {
    src: "/images/products/hospitality/chef-hat/chw-120.jpg",
    alt: "White unisex chef hat, back-adjustable, on a wooden countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefHatChb125: {
    src: "/images/products/hospitality/chef-hat/chb-125.jpg",
    alt: "Black unisex chef hat, back-adjustable, on a marble countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  consultationCoatMcc7250: {
    src: "/images/products/health-wear/mens-consultation-coat/mcc-7250.jpg",
    alt: "White mens consultation coat on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  consultationCoatMcc7250Detail: {
    src: "/images/products/health-wear/mens-consultation-coat/mcc-7250-detail.jpg",
    alt: "Close-up of the mens consultation coat collar and chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  consultationCoatWcc7300: {
    src: "/images/products/health-wear/womans-consultation-coat/wcc-7300.jpg",
    alt: "White womans consultation coat on a mannequin",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  consultationCoatWcc7300Detail: {
    src: "/images/products/health-wear/womans-consultation-coat/wcc-7300-detail.jpg",
    alt: "Close-up of the womans consultation coat collar and chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  labCoatDcn534: {
    src: "/images/products/industrial/lab-coat/dcn-534.jpg",
    alt: "White unisex lab coat on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  labCoatDcn534Detail: {
    src: "/images/products/industrial/lab-coat/dcn-534-detail.jpg",
    alt: "Close-up of the lab coat collar and chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  dustCoatDcn534: {
    src: "/images/products/industrial/dust-coat/dcn-534.jpg",
    alt: "Navy dust coat on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  dustCoatDcn534Detail: {
    src: "/images/products/industrial/dust-coat/dcn-534-detail.jpg",
    alt: "Close-up of the dust coat collar and chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  mensTshirtMts99: {
    src: "/images/products/corporate-wear/mens-tshirt/mts-99.jpg",
    alt: "Black mens crew-neck t-shirt, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  womansTshirtWtssf97: {
    src: "/images/products/corporate-wear/womans-tshirt/wtssf-97.jpg",
    alt: "Blue womans slim-fit t-shirt, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMcca210: {
    src: "/images/products/hospitality/mens-chef-coat/mcca-210.jpg",
    alt: "White mens short-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccb212: {
    src: "/images/products/hospitality/mens-chef-coat/mccb-212.jpg",
    alt: "White mens long-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccc220: {
    src: "/images/products/hospitality/mens-chef-coat/mccc-220.jpg",
    alt: "Black mens short-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccd222: {
    src: "/images/products/hospitality/mens-chef-coat/mccd-222.jpg",
    alt: "Black mens long-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMcce230: {
    src: "/images/products/hospitality/mens-chef-coat/mcce-230.jpg",
    alt: "White mens short-sleeve chef coat with black piping and pocket trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccf232: {
    src: "/images/products/hospitality/mens-chef-coat/mccf-232.jpg",
    alt: "White mens long-sleeve chef coat with black piping and cuff/pocket trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccg240: {
    src: "/images/products/hospitality/mens-chef-coat/mccg-240.jpg",
    alt: "Black mens short-sleeve chef coat with white piping and pocket trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMcch242: {
    src: "/images/products/hospitality/mens-chef-coat/mcch-242.jpg",
    alt: "Black mens long-sleeve chef coat with white piping and cuff trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  unisexPoloUps100: {
    src: "/images/products/corporate-wear/unisex-polo/ups-100.jpg",
    alt: "White unisex polo shirt, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefPantCpb67: {
    src: "/images/products/hospitality/chef-pant/cpb-67.jpg",
    alt: "Black elastic-waist chef pant on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWcca320: {
    src: "/images/products/hospitality/womans-chef-coat/wcca-320.jpg",
    alt: "White womans short-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccb325: {
    src: "/images/products/hospitality/womans-chef-coat/wccb-325.jpg",
    alt: "White womans long-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccc330: {
    src: "/images/products/hospitality/womans-chef-coat/wccc-330.jpg",
    alt: "Black womans short-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccd335: {
    src: "/images/products/hospitality/womans-chef-coat/wccd-335.jpg",
    alt: "Black womans long-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWcce340: {
    src: "/images/products/hospitality/womans-chef-coat/wcce-340.jpg",
    alt: "White womans short-sleeve chef coat with black collar and piping",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccf345: {
    src: "/images/products/hospitality/womans-chef-coat/wccf-345.jpg",
    alt: "White womans long-sleeve chef coat with black collar, piping, and cuffs",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccg350: {
    src: "/images/products/hospitality/womans-chef-coat/wccg-350.jpg",
    alt: "Black womans short-sleeve chef coat with white collar and piping",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWcch355: {
    src: "/images/products/hospitality/womans-chef-coat/wcch-355.jpg",
    alt: "Black womans long-sleeve chef coat with white collar, piping, and cuffs",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallClr1020: {
    src: "/images/products/industrial/coverall/clr-1020.jpg",
    alt: "White lightweight coverall fabric swatch",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallClrr1030: {
    src: "/images/products/industrial/coverall/clrr-1030.jpg",
    alt: "White lightweight coverall with reflector fabric swatch",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallCon4225: {
    src: "/images/products/industrial/coverall/con-4225.jpg",
    alt: "Orange and navy hi-vis coverall with reflective tape, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallCon4225Detail: {
    src: "/images/products/industrial/coverall/con-4225-detail.jpg",
    alt: "Close-up of the orange and navy hi-vis coverall chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallCyn4335: {
    src: "/images/products/industrial/coverall/cyn-4335.jpg",
    alt: "Yellow and navy hi-vis coverall with reflective tape, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallCyn4335Detail: {
    src: "/images/products/industrial/coverall/cyn-4335-detail.jpg",
    alt: "Close-up of the yellow and navy hi-vis coverall chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpos2030: {
    src: "/images/products/industrial/industrial-polo/ipos-2030.jpg",
    alt: "Orange and black hi-vis industrial polo, short sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpos2030Detail: {
    src: "/images/products/industrial/industrial-polo/ipos-2030-detail.jpg",
    alt: "Close-up of the orange and black hi-vis industrial polo chest with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpol2040: {
    src: "/images/products/industrial/industrial-polo/ipol-2040.jpg",
    alt: "Orange and navy hi-vis industrial polo, long sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpol2040Detail: {
    src: "/images/products/industrial/industrial-polo/ipol-2040-detail.jpg",
    alt: "Close-up of the orange and navy hi-vis industrial polo chest with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpgs2050: {
    src: "/images/products/industrial/industrial-polo/ipgs-2050.jpg",
    alt: "Yellow and navy hi-vis industrial polo, short sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpgs2050Detail: {
    src: "/images/products/industrial/industrial-polo/ipgs-2050-detail.jpg",
    alt: "Close-up of the yellow and navy hi-vis industrial polo chest with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpgl2060: {
    src: "/images/products/industrial/industrial-polo/ipgl-2060.jpg",
    alt: "Yellow and navy hi-vis industrial polo, long sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpgl2060Detail: {
    src: "/images/products/industrial/industrial-polo/ipgl-2060-detail.jpg",
    alt: "Close-up of the yellow and navy hi-vis industrial polo chest with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsos3535: {
    src: "/images/products/industrial/industrial-shirt/isos-3535.jpg",
    alt: "Orange and navy hi-vis industrial shirt, short sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsos3535Detail: {
    src: "/images/products/industrial/industrial-shirt/isos-3535-detail.jpg",
    alt: "Close-up of the orange and navy hi-vis industrial shirt chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsol3545: {
    src: "/images/products/industrial/industrial-shirt/isol-3545.jpg",
    alt: "Orange and navy hi-vis industrial shirt, long sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsol3545Detail: {
    src: "/images/products/industrial/industrial-shirt/isol-3545-detail.jpg",
    alt: "Close-up of the orange and navy hi-vis industrial shirt chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsys3550: {
    src: "/images/products/industrial/industrial-shirt/isys-3550.jpg",
    alt: "Yellow and navy hi-vis industrial shirt, short sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsys3550Detail: {
    src: "/images/products/industrial/industrial-shirt/isys-3550-detail.jpg",
    alt: "Close-up of the yellow and navy hi-vis industrial shirt chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsyl3560: {
    src: "/images/products/industrial/industrial-shirt/isyl-3560.jpg",
    alt: "Yellow and navy hi-vis industrial shirt, long sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsyl3560Detail: {
    src: "/images/products/industrial/industrial-shirt/isyl-3560-detail.jpg",
    alt: "Close-up of the yellow and navy hi-vis industrial shirt chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMcci243: {
    src: "/images/products/hospitality/mens-chef-coat/mcci-243.jpg",
    alt: "White mens long-sleeve chef coat with black collar and cuff trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
};
