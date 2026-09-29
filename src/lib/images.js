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
    src: "/images/about/about-index.webp",
    alt: "Row of six uniformed professionals — healthcare, hospitality, and industrial roles — each in their work uniform",
    credit: "Smart Uniform and Embroidery — client-provided photography",
  },
  // Shared placeholder for per-industry/per-service swatches until each
  // gets its own real photo — swap for distinct images per entry later.
  industryPlaceholder: {
    src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80&fit=crop&auto=format",
    alt: "Uniform garment placeholder",
    credit: "Unsplash — placeholder photography, pending client assets",
  },
  // Real hero/category photography (client-provided, converted to WebP
  // 2026-09-29) — one distinct photo per PRODUCTS category, replacing the
  // Unsplash placeholders these keys used to point at. Used as the Hero
  // slider's full-bleed background per slide (see Hero.jsx).
  productAdministration: {
    src: "/images/hero/corporate-wear.webp",
    alt: "Close-up of a person in a dark business suit and tie adjusting their cuff",
    credit: "Smart Uniform and Embroidery — client-provided photography",
  },
  productPolosTshirts: {
    src: "/images/hero/polos-tshirts.webp",
    alt: "Plain white t-shirt hanging on a wooden hanger against a dark wood wall",
    credit: "Smart Uniform and Embroidery — client-provided photography",
  },
  productHealthWear: {
    src: "/images/hero/health-wear.webp",
    alt: "Stethoscope resting on a grey medical scrub top beside a clipboard",
    credit: "Smart Uniform and Embroidery — client-provided photography",
  },
  productSecurity: {
    src: "/images/hero/security.webp",
    alt: "Security guard viewed from behind, wearing a uniform printed with \"Security\"",
    credit: "Smart Uniform and Embroidery — client-provided photography",
  },
  productIndustrialHospitality: {
    src: "/images/hero/industrial.webp",
    alt: "Five industrial workers in hard hats, hi-vis vests, and coveralls standing together on a factory floor",
    credit: "Smart Uniform and Embroidery — client-provided photography",
  },
  productHospitality: {
    src: "/images/hero/hospitality.webp",
    alt: "Waiter in a formal black vest and bow tie carrying a plated dish through a restaurant",
    credit: "Smart Uniform and Embroidery — client-provided photography",
  },
  aboutStory: {
    src: "/images/about/about-side.webp",
    alt: "Folded scrub tops and lab coats neatly stacked on a shelf in blue, white, and grey",
    credit: "Smart Uniform and Embroidery — client-provided photography",
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
    src: "/images/products/accessories/cap/bcp-79.webp",
    alt: "Black adjustable baseball cap on a concrete studio surface",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSpg101: {
    src: "/images/products/health-wear/unisex-scrub-pant/spg-101.webp",
    alt: "Green unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSpb122: {
    src: "/images/products/health-wear/unisex-scrub-pant/spb-122.webp",
    alt: "Black unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSpg144: {
    src: "/images/products/health-wear/unisex-scrub-pant/spg-144.webp",
    alt: "Grey unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  // SPLB-155 is one style code across 4 colours (see newProducts.js) —
  // each colour has its own real photo, so this is 4 keys, not 1. File
  // names follow the numeric-sequence convention (style.jpg, style-2.jpg,
  // ...) in PDF page order, not a colour-word suffix.
  scrubPantSplb155LightBlue: {
    src: "/images/products/health-wear/unisex-scrub-pant/splb-155.webp",
    alt: "Light blue unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSplb155Navy: {
    src: "/images/products/health-wear/unisex-scrub-pant/splb-155-2.webp",
    alt: "Navy unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSplb155RoyalBlue: {
    src: "/images/products/health-wear/unisex-scrub-pant/splb-155-3.webp",
    alt: "Royal blue unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubPantSplb155Purple: {
    src: "/images/products/health-wear/unisex-scrub-pant/splb-155-4.webp",
    alt: "Purple unisex scrub pant with drawstring waist and cargo pockets",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStg02: {
    src: "/images/products/health-wear/unisex-scrub-top/stg-02.webp",
    alt: "Green unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStb03: {
    src: "/images/products/health-wear/unisex-scrub-top/stb-03.webp",
    alt: "Black unisex scrub top with V-neck and chest pocket",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStg04: {
    src: "/images/products/health-wear/unisex-scrub-top/stg-04.webp",
    alt: "Grey unisex scrub top with V-neck and chest pocket",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStlb05: {
    src: "/images/products/health-wear/unisex-scrub-top/stlb-05.webp",
    alt: "Light blue unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStn06: {
    src: "/images/products/health-wear/unisex-scrub-top/stn-06.webp",
    alt: "Navy unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStrb07: {
    src: "/images/products/health-wear/unisex-scrub-top/strb-07.webp",
    alt: "Royal blue unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  scrubTopStp08: {
    src: "/images/products/health-wear/unisex-scrub-top/stp-08.webp",
    alt: "Purple unisex scrub top with V-neck and chest pocket, on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  // MBBFY-16 etc: re-extracted 2026-09-22 with the fixed >=30KB-per-image
  // method (see project memory) — each style has 4 real photos, not 3:
  // page 1 clean front, page 2 clean back, page 3 has TWO images (front
  // and back with a sample embroidery logo applied). File/key order
  // follows PDF page order, then extraction byte-size order within page 3.
  counterShirtMbbfy16: {
    src: "/images/products/industrial/mens-counter-shirt/mbbfy-16.webp",
    alt: "Mens two-tone counter shirt in Black/Royal Blue, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbbfy16Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbbfy-16-2.webp",
    alt: "Mens two-tone counter shirt in Black/Royal Blue, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbbfy16Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbbfy-16-3.webp",
    alt: "Mens two-tone counter shirt in Black/Royal Blue with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbbfy16Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbbfy-16-4.webp",
    alt: "Mens two-tone counter shirt in Black/Royal Blue with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbyfy07: {
    src: "/images/products/industrial/mens-counter-shirt/mbyfy-07.webp",
    alt: "Mens two-tone counter shirt in Black/Yellow, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbyfy07Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbyfy-07-2.webp",
    alt: "Mens two-tone counter shirt in Black/Yellow, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbyfy07Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbyfy-07-3.webp",
    alt: "Mens two-tone counter shirt in Black/Yellow with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbyfy07Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbyfy-07-4.webp",
    alt: "Mens two-tone counter shirt in Black/Yellow with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbrfy09: {
    src: "/images/products/industrial/mens-counter-shirt/mbrfy-09.webp",
    alt: "Mens two-tone counter shirt in Black/Red, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbrfy09Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbrfy-09-2.webp",
    alt: "Mens two-tone counter shirt in Black/Red, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbrfy09Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbrfy-09-3.webp",
    alt: "Mens two-tone counter shirt in Black/Red with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbrfy09Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbrfy-09-4.webp",
    alt: "Mens two-tone counter shirt in Black/Red with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgnfy28: {
    src: "/images/products/industrial/mens-counter-shirt/mbgnfy-28.webp",
    alt: "Mens two-tone counter shirt in Black/Green, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgnfy28Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbgnfy-28-2.webp",
    alt: "Mens two-tone counter shirt in Black/Green, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgnfy28Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbgnfy-28-3.webp",
    alt: "Mens two-tone counter shirt in Black/Green with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgnfy28Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbgnfy-28-4.webp",
    alt: "Mens two-tone counter shirt in Black/Green with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgyfy13: {
    src: "/images/products/industrial/mens-counter-shirt/mbgyfy-13.webp",
    alt: "Mens two-tone counter shirt in Black/Grey, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgyfy13Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbgyfy-13-2.webp",
    alt: "Mens two-tone counter shirt in Black/Grey, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgyfy13Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbgyfy-13-3.webp",
    alt: "Mens two-tone counter shirt in Black/Grey with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbgyfy13Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbgyfy-13-4.webp",
    alt: "Mens two-tone counter shirt in Black/Grey with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbufy12: {
    src: "/images/products/industrial/mens-counter-shirt/mbufy-12.webp",
    alt: "Mens two-tone counter shirt in Black/Burgundy, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbufy12Back: {
    src: "/images/products/industrial/mens-counter-shirt/mbufy-12-2.webp",
    alt: "Mens two-tone counter shirt in Black/Burgundy, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbufy12Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mbufy-12-3.webp",
    alt: "Mens two-tone counter shirt in Black/Burgundy with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMbufy12Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mbufy-12-4.webp",
    alt: "Mens two-tone counter shirt in Black/Burgundy with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbfy16: {
    src: "/images/products/industrial/mens-counter-shirt/mgbfy-16.webp",
    alt: "Mens two-tone counter shirt in Grey/Royal Blue, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbfy16Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgbfy-16-2.webp",
    alt: "Mens two-tone counter shirt in Grey/Royal Blue, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbfy16Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgbfy-16-3.webp",
    alt: "Mens two-tone counter shirt in Grey/Royal Blue with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbfy16Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgbfy-16-4.webp",
    alt: "Mens two-tone counter shirt in Grey/Royal Blue with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgyfy07: {
    src: "/images/products/industrial/mens-counter-shirt/mgyfy-07.webp",
    alt: "Mens two-tone counter shirt in Grey/Gold, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgyfy07Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgyfy-07-2.webp",
    alt: "Mens two-tone counter shirt in Grey/Gold, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgyfy07Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgyfy-07-3.webp",
    alt: "Mens two-tone counter shirt in Grey/Gold with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgyfy07Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgyfy-07-4.webp",
    alt: "Mens two-tone counter shirt in Grey/Gold with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgrfy09: {
    src: "/images/products/industrial/mens-counter-shirt/mgrfy-09.webp",
    alt: "Mens two-tone counter shirt in Grey/Red, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgrfy09Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgrfy-09-2.webp",
    alt: "Mens two-tone counter shirt in Grey/Red, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgrfy09Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgrfy-09-3.webp",
    alt: "Mens two-tone counter shirt in Grey/Red with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgrfy09Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgrfy-09-4.webp",
    alt: "Mens two-tone counter shirt in Grey/Red with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMggfy28: {
    src: "/images/products/industrial/mens-counter-shirt/mggfy-28.webp",
    alt: "Mens two-tone counter shirt in Grey/Green, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMggfy28Back: {
    src: "/images/products/industrial/mens-counter-shirt/mggfy-28-2.webp",
    alt: "Mens two-tone counter shirt in Grey/Green, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMggfy28Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mggfy-28-3.webp",
    alt: "Mens two-tone counter shirt in Grey/Green with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMggfy28Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mggfy-28-4.webp",
    alt: "Mens two-tone counter shirt in Grey/Green with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbkfy15: {
    src: "/images/products/industrial/mens-counter-shirt/mgbkfy-15.webp",
    alt: "Mens two-tone counter shirt in Grey/Black, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbkfy15Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgbkfy-15-2.webp",
    alt: "Mens two-tone counter shirt in Grey/Black, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbkfy15Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgbkfy-15-3.webp",
    alt: "Mens two-tone counter shirt in Grey/Black with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgbkfy15Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgbkfy-15-4.webp",
    alt: "Mens two-tone counter shirt in Grey/Black with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgufy12: {
    src: "/images/products/industrial/mens-counter-shirt/mgufy-12.webp",
    alt: "Mens two-tone counter shirt in Grey/Burgundy, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgufy12Back: {
    src: "/images/products/industrial/mens-counter-shirt/mgufy-12-2.webp",
    alt: "Mens two-tone counter shirt in Grey/Burgundy, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgufy12Alt: {
    src: "/images/products/industrial/mens-counter-shirt/mgufy-12-3.webp",
    alt: "Mens two-tone counter shirt in Grey/Burgundy with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtMgufy12Detail: {
    src: "/images/products/industrial/mens-counter-shirt/mgufy-12-4.webp",
    alt: "Mens two-tone counter shirt in Grey/Burgundy with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  securityShirtMssd820: {
    src: "/images/products/security/mens-security-shirt/mssd-820.webp",
    alt: "Mens security shirt in Dark Grey/Charcoal with epaulettes and Security Services chest patch",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbbfy16: {
    src: "/images/products/industrial/womans-counter-shirt/wbbfy-16.webp",
    alt: "Womans two-tone counter shirt in Black/Royal Blue, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbbfy16Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbbfy-16-2.webp",
    alt: "Womans two-tone counter shirt in Black/Royal Blue, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbbfy16Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbbfy-16-3.webp",
    alt: "Womans two-tone counter shirt in Black/Royal Blue with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbbfy16Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbbfy-16-4.webp",
    alt: "Womans two-tone counter shirt in Black/Royal Blue with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbyfy07: {
    src: "/images/products/industrial/womans-counter-shirt/wbyfy-07.webp",
    alt: "Womans two-tone counter shirt in Black/Gold, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbyfy07Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbyfy-07-2.webp",
    alt: "Womans two-tone counter shirt in Black/Gold, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbyfy07Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbyfy-07-3.webp",
    alt: "Womans two-tone counter shirt in Black/Gold with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbyfy07Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbyfy-07-4.webp",
    alt: "Womans two-tone counter shirt in Black/Gold with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbrfy09: {
    src: "/images/products/industrial/womans-counter-shirt/wbrfy-09.webp",
    alt: "Womans two-tone counter shirt in Black/Red, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbrfy09Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbrfy-09-2.webp",
    alt: "Womans two-tone counter shirt in Black/Red, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbrfy09Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbrfy-09-3.webp",
    alt: "Womans two-tone counter shirt in Black/Red with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbrfy09Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbrfy-09-4.webp",
    alt: "Womans two-tone counter shirt in Black/Red with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgnfy28: {
    src: "/images/products/industrial/womans-counter-shirt/wbgnfy-28.webp",
    alt: "Womans two-tone counter shirt in Black/Green, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgnfy28Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbgnfy-28-2.webp",
    alt: "Womans two-tone counter shirt in Black/Green, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgnfy28Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbgnfy-28-3.webp",
    alt: "Womans two-tone counter shirt in Black/Green with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgnfy28Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbgnfy-28-4.webp",
    alt: "Womans two-tone counter shirt in Black/Green with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgyfy13: {
    src: "/images/products/industrial/womans-counter-shirt/wbgyfy-13.webp",
    alt: "Womans two-tone counter shirt in Black/Grey, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgyfy13Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbgyfy-13-2.webp",
    alt: "Womans two-tone counter shirt in Black/Grey, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgyfy13Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbgyfy-13-3.webp",
    alt: "Womans two-tone counter shirt in Black/Grey with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbgyfy13Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbgyfy-13-4.webp",
    alt: "Womans two-tone counter shirt in Black/Grey with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbufy12: {
    src: "/images/products/industrial/womans-counter-shirt/wbufy-12.webp",
    alt: "Womans two-tone counter shirt in Black/Burgundy, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbufy12Back: {
    src: "/images/products/industrial/womans-counter-shirt/wbufy-12-2.webp",
    alt: "Womans two-tone counter shirt in Black/Burgundy, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbufy12Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wbufy-12-3.webp",
    alt: "Womans two-tone counter shirt in Black/Burgundy with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWbufy12Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wbufy-12-4.webp",
    alt: "Womans two-tone counter shirt in Black/Burgundy with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbfy16: {
    src: "/images/products/industrial/womans-counter-shirt/wgbfy-16.webp",
    alt: "Womans two-tone counter shirt in Grey/Royal Blue, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbfy16Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgbfy-16-2.webp",
    alt: "Womans two-tone counter shirt in Grey/Royal Blue, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbfy16Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgbfy-16-3.webp",
    alt: "Womans two-tone counter shirt in Grey/Royal Blue with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbfy16Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgbfy-16-4.webp",
    alt: "Womans two-tone counter shirt in Grey/Royal Blue with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgyfy07: {
    src: "/images/products/industrial/womans-counter-shirt/wgyfy-07.webp",
    alt: "Womans two-tone counter shirt in Grey/Gold, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgyfy07Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgyfy-07-2.webp",
    alt: "Womans two-tone counter shirt in Grey/Gold, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgyfy07Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgyfy-07-3.webp",
    alt: "Womans two-tone counter shirt in Grey/Gold with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgyfy07Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgyfy-07-4.webp",
    alt: "Womans two-tone counter shirt in Grey/Gold with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgrfy09: {
    src: "/images/products/industrial/womans-counter-shirt/wgrfy-09.webp",
    alt: "Womans two-tone counter shirt in Grey/Red, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgrfy09Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgrfy-09-2.webp",
    alt: "Womans two-tone counter shirt in Grey/Red, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgrfy09Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgrfy-09-3.webp",
    alt: "Womans two-tone counter shirt in Grey/Red with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgrfy09Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgrfy-09-4.webp",
    alt: "Womans two-tone counter shirt in Grey/Red with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWggnfy28: {
    src: "/images/products/industrial/womans-counter-shirt/wggnfy-28.webp",
    alt: "Womans two-tone counter shirt in Grey/Green, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWggnfy28Back: {
    src: "/images/products/industrial/womans-counter-shirt/wggnfy-28-2.webp",
    alt: "Womans two-tone counter shirt in Grey/Green, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWggnfy28Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wggnfy-28-3.webp",
    alt: "Womans two-tone counter shirt in Grey/Green with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWggnfy28Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wggnfy-28-4.webp",
    alt: "Womans two-tone counter shirt in Grey/Green with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbkfy15: {
    src: "/images/products/industrial/womans-counter-shirt/wgbkfy-15.webp",
    alt: "Womans two-tone counter shirt in Grey/Black, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbkfy15Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgbkfy-15-2.webp",
    alt: "Womans two-tone counter shirt in Grey/Black, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbkfy15Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgbkfy-15-3.webp",
    alt: "Womans two-tone counter shirt in Grey/Black with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgbkfy15Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgbkfy-15-4.webp",
    alt: "Womans two-tone counter shirt in Grey/Black with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgufy12: {
    src: "/images/products/industrial/womans-counter-shirt/wgufy-12.webp",
    alt: "Womans two-tone counter shirt in Grey/Burgundy, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgufy12Back: {
    src: "/images/products/industrial/womans-counter-shirt/wgufy-12-2.webp",
    alt: "Womans two-tone counter shirt in Grey/Burgundy, back view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgufy12Alt: {
    src: "/images/products/industrial/womans-counter-shirt/wgufy-12-3.webp",
    alt: "Womans two-tone counter shirt in Grey/Burgundy with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  counterShirtWgufy12Detail: {
    src: "/images/products/industrial/womans-counter-shirt/wgufy-12-4.webp",
    alt: "Womans two-tone counter shirt in Grey/Burgundy with sample embroidery logo, alternate view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  womansSkirtWsks150: {
    src: "/images/products/corporate-wear/womans-skirt/wsks-150.webp",
    alt: "Navy womans skirt, short length, laid flat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  womansSkirtWskl160: {
    src: "/images/products/corporate-wear/womans-skirt/wskl-160.webp",
    alt: "Navy womans skirt, long length, laid flat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },

  // Adjustable apron — the source PDF shows one representative photo per
  // colour group (White covers APW-001..004, Black covers APW-005..008),
  // not one photo per pocket configuration, since the 4 configs in each
  // colour are a text-only distinction on the spec sheet. Shared across
  // 4 products each; APWB-009 (white/black two-tone) has its own photo.
  apronWhitePocketConfigs: {
    src: "/images/products/hospitality/adjustable-apron/apw-001-004-white.webp",
    alt: "White adjustable apron with chest and waist pockets, hanging on a wall hook",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  apronBlackPocketConfigs: {
    src: "/images/products/hospitality/adjustable-apron/apw-005-008-black.webp",
    alt: "Black adjustable apron with waist pocket, hanging on a wall hook",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  apronApwb009: {
    src: "/images/products/hospitality/adjustable-apron/apwb-009.webp",
    alt: "White adjustable apron with black chest pocket, waist pocket, neck strap, and side straps",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  cookCapCcw105: {
    src: "/images/products/hospitality/cook-cap/ccw-105.webp",
    alt: "White unisex cook cap, back-adjustable, on a wooden countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  cookCapCcb110: {
    src: "/images/products/hospitality/cook-cap/ccb-110.webp",
    alt: "Black unisex cook cap, back-adjustable, on a marble countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  bandanaBbu115: {
    src: "/images/products/hospitality/bandana/bbu-115.webp",
    alt: "Black unisex bandana-style cap with back ties, on a wooden countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefHatChw120: {
    src: "/images/products/hospitality/chef-hat/chw-120.webp",
    alt: "White unisex chef hat, back-adjustable, on a wooden countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefHatChb125: {
    src: "/images/products/hospitality/chef-hat/chb-125.webp",
    alt: "Black unisex chef hat, back-adjustable, on a marble countertop",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  consultationCoatMcc7250: {
    src: "/images/products/health-wear/mens-consultation-coat/mcc-7250.webp",
    alt: "White mens consultation coat on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  consultationCoatMcc7250Detail: {
    src: "/images/products/health-wear/mens-consultation-coat/mcc-7250-detail.webp",
    alt: "Close-up of the mens consultation coat collar and chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  consultationCoatWcc7300: {
    src: "/images/products/health-wear/womans-consultation-coat/wcc-7300.webp",
    alt: "White womans consultation coat on a mannequin",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  consultationCoatWcc7300Detail: {
    src: "/images/products/health-wear/womans-consultation-coat/wcc-7300-detail.webp",
    alt: "Close-up of the womans consultation coat collar and chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  labCoatDcn534: {
    src: "/images/products/industrial/lab-coat/dcn-534.webp",
    alt: "White unisex lab coat on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  labCoatDcn534Detail: {
    src: "/images/products/industrial/lab-coat/dcn-534-detail.webp",
    alt: "Close-up of the lab coat collar and chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  dustCoatDcn534: {
    src: "/images/products/industrial/dust-coat/dcn-534.webp",
    alt: "Navy dust coat on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  dustCoatDcn534Detail: {
    src: "/images/products/industrial/dust-coat/dcn-534-detail.webp",
    alt: "Close-up of the dust coat collar and chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  mensTshirtMts99: {
    src: "/images/products/corporate-wear/mens-tshirt/mts-99.webp",
    alt: "Black mens crew-neck t-shirt, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  womansTshirtWtssf97: {
    src: "/images/products/corporate-wear/womans-tshirt/wtssf-97.webp",
    alt: "Blue womans slim-fit t-shirt, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMcca210: {
    src: "/images/products/hospitality/mens-chef-coat/mcca-210.webp",
    alt: "White mens short-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccb212: {
    src: "/images/products/hospitality/mens-chef-coat/mccb-212.webp",
    alt: "White mens long-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccc220: {
    src: "/images/products/hospitality/mens-chef-coat/mccc-220.webp",
    alt: "Black mens short-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccd222: {
    src: "/images/products/hospitality/mens-chef-coat/mccd-222.webp",
    alt: "Black mens long-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMcce230: {
    src: "/images/products/hospitality/mens-chef-coat/mcce-230.webp",
    alt: "White mens short-sleeve chef coat with black piping and pocket trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccf232: {
    src: "/images/products/hospitality/mens-chef-coat/mccf-232.webp",
    alt: "White mens long-sleeve chef coat with black piping and cuff/pocket trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMccg240: {
    src: "/images/products/hospitality/mens-chef-coat/mccg-240.webp",
    alt: "Black mens short-sleeve chef coat with white piping and pocket trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMcch242: {
    src: "/images/products/hospitality/mens-chef-coat/mcch-242.webp",
    alt: "Black mens long-sleeve chef coat with white piping and cuff trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  unisexPoloUps100: {
    src: "/images/products/corporate-wear/unisex-polo/ups-100.webp",
    alt: "White unisex polo shirt, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefPantCpb67: {
    src: "/images/products/hospitality/chef-pant/cpb-67.webp",
    alt: "Black elastic-waist chef pant on a hanger",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWcca320: {
    src: "/images/products/hospitality/womans-chef-coat/wcca-320.webp",
    alt: "White womans short-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccb325: {
    src: "/images/products/hospitality/womans-chef-coat/wccb-325.webp",
    alt: "White womans long-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccc330: {
    src: "/images/products/hospitality/womans-chef-coat/wccc-330.webp",
    alt: "Black womans short-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccd335: {
    src: "/images/products/hospitality/womans-chef-coat/wccd-335.webp",
    alt: "Black womans long-sleeve chef coat",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWcce340: {
    src: "/images/products/hospitality/womans-chef-coat/wcce-340.webp",
    alt: "White womans short-sleeve chef coat with black collar and piping",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccf345: {
    src: "/images/products/hospitality/womans-chef-coat/wccf-345.webp",
    alt: "White womans long-sleeve chef coat with black collar, piping, and cuffs",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWccg350: {
    src: "/images/products/hospitality/womans-chef-coat/wccg-350.webp",
    alt: "Black womans short-sleeve chef coat with white collar and piping",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatWcch355: {
    src: "/images/products/hospitality/womans-chef-coat/wcch-355.webp",
    alt: "Black womans long-sleeve chef coat with white collar, piping, and cuffs",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallClr1020: {
    src: "/images/products/industrial/coverall/clr-1020.webp",
    alt: "White lightweight coverall fabric swatch",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallClrr1030: {
    src: "/images/products/industrial/coverall/clrr-1030.webp",
    alt: "White lightweight coverall with reflector fabric swatch",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallCon4225: {
    src: "/images/products/industrial/coverall/con-4225.webp",
    alt: "Orange and navy hi-vis coverall with reflective tape, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallCon4225Detail: {
    src: "/images/products/industrial/coverall/con-4225-detail.webp",
    alt: "Close-up of the orange and navy hi-vis coverall chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallCyn4335: {
    src: "/images/products/industrial/coverall/cyn-4335.webp",
    alt: "Yellow and navy hi-vis coverall with reflective tape, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  coverallCyn4335Detail: {
    src: "/images/products/industrial/coverall/cyn-4335-detail.webp",
    alt: "Close-up of the yellow and navy hi-vis coverall chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpos2030: {
    src: "/images/products/industrial/industrial-polo/ipos-2030.webp",
    alt: "Orange and black hi-vis industrial polo, short sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpos2030Detail: {
    src: "/images/products/industrial/industrial-polo/ipos-2030-detail.webp",
    alt: "Close-up of the orange and black hi-vis industrial polo chest with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpol2040: {
    src: "/images/products/industrial/industrial-polo/ipol-2040.webp",
    alt: "Orange and navy hi-vis industrial polo, long sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpol2040Detail: {
    src: "/images/products/industrial/industrial-polo/ipol-2040-detail.webp",
    alt: "Close-up of the orange and navy hi-vis industrial polo chest with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpgs2050: {
    src: "/images/products/industrial/industrial-polo/ipgs-2050.webp",
    alt: "Yellow and navy hi-vis industrial polo, short sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpgs2050Detail: {
    src: "/images/products/industrial/industrial-polo/ipgs-2050-detail.webp",
    alt: "Close-up of the yellow and navy hi-vis industrial polo chest with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpgl2060: {
    src: "/images/products/industrial/industrial-polo/ipgl-2060.webp",
    alt: "Yellow and navy hi-vis industrial polo, long sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialPoloIpgl2060Detail: {
    src: "/images/products/industrial/industrial-polo/ipgl-2060-detail.webp",
    alt: "Close-up of the yellow and navy hi-vis industrial polo chest with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsos3535: {
    src: "/images/products/industrial/industrial-shirt/isos-3535.webp",
    alt: "Orange and navy hi-vis industrial shirt, short sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsos3535Detail: {
    src: "/images/products/industrial/industrial-shirt/isos-3535-detail.webp",
    alt: "Close-up of the orange and navy hi-vis industrial shirt chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsol3545: {
    src: "/images/products/industrial/industrial-shirt/isol-3545.webp",
    alt: "Orange and navy hi-vis industrial shirt, long sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsol3545Detail: {
    src: "/images/products/industrial/industrial-shirt/isol-3545-detail.webp",
    alt: "Close-up of the orange and navy hi-vis industrial shirt chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsys3550: {
    src: "/images/products/industrial/industrial-shirt/isys-3550.webp",
    alt: "Yellow and navy hi-vis industrial shirt, short sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsys3550Detail: {
    src: "/images/products/industrial/industrial-shirt/isys-3550-detail.webp",
    alt: "Close-up of the yellow and navy hi-vis industrial shirt chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsyl3560: {
    src: "/images/products/industrial/industrial-shirt/isyl-3560.webp",
    alt: "Yellow and navy hi-vis industrial shirt, long sleeve, front view",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  industrialShirtIsyl3560Detail: {
    src: "/images/products/industrial/industrial-shirt/isyl-3560-detail.webp",
    alt: "Close-up of the yellow and navy hi-vis industrial shirt chest pocket with sample embroidery logo",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
  chefCoatMcci243: {
    src: "/images/products/hospitality/mens-chef-coat/mcci-243.webp",
    alt: "White mens long-sleeve chef coat with black collar and cuff trim",
    credit: "Smart Uniform and Embroidery — client-provided product photography",
  },
};
