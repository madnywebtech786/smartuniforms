import Link from "next/link";
import Image from "next/image";
import { STOCK_IMAGES } from "@/lib/images";
import { PRODUCTS } from "@/lib/products";

const MAX_VISIBLE_SWATCHES = 3;

/**
 * One fixed-size card in the Products marquee (see Products.jsx). Every
 * card shares identical geometry — fixed photo aspect ratio, a capped
 * single-line meta row, and a swatch row sized to its own content rather
 * than stretched — so card height never varies with product copy length.
 * This is what makes the marquee's row height, and therefore the whole
 * section's height, constant regardless of which products are showing.
 *
 * No description text is rendered here on purpose: it's the
 * variable-length field (105-138 characters across today's catalog) that
 * caused the old single-card layout's height to jiggle. It still lives on
 * each CATALOG_ITEMS entry for a future /products/[slug] detail page.
 */
export default function ProductCard({ product, className = "w-64 shrink-0 sm:w-72" }) {
  const category = PRODUCTS.find((item) => item.slug === product.categorySlug);
  const image = STOCK_IMAGES[product.imageKey];
  const visibleColours = product.colours.slice(0, MAX_VISIBLE_SWATCHES);
  const hiddenCount = product.colours.length - visibleColours.length;

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-primary ${className}`}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 640px) 288px, 256px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 border-t border-border px-4 py-4 sm:px-5">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
          {category?.name ?? product.categorySlug}
        </p>

        <h3 className="font-display text-lg leading-tight text-foreground sm:text-xl">
          {product.name}
        </h3>

        <p className="truncate whitespace-nowrap border-t border-dashed border-border pt-2 font-sans text-xs text-muted-foreground">
          {product.sizeRange} · {product.fabricType}
        </p>

        <div className="flex w-fit items-center gap-1.5">
          {visibleColours.map((colour) => (
            <span
              key={colour.name}
              title={colour.name}
              className="h-4 w-4 rounded-full border border-foreground/15 ring-1 ring-surface"
              style={{ backgroundColor: colour.hex }}
            />
          ))}
          {hiddenCount > 0 && (
            <span className="ml-0.5 font-sans text-[11px] font-semibold text-muted-foreground">
              +{hiddenCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
