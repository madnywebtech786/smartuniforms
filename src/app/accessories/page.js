import { Suspense } from "react";
import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import ProductCatalog from "@/components/sections/product-catalog/ProductCatalog";
import { NEW_PRODUCTS } from "@/lib/newProducts";

export const metadata = {
  title: "Accessories | Smart Uniform and Embroidery",
  description:
    "Caps and other finishing pieces to complete your team's uniform — manufactured and embroidered in-house in Suva, Fiji.",
};

// Same catalog experience as /products (search, filters, pagination —
// see ProductCatalog.jsx), scoped to just the Accessories category via
// its `products` prop, so it grows the same way as the main catalog as
// more accessories are added, without duplicating that component.
const ACCESSORIES = NEW_PRODUCTS.filter((product) => product.categorySlug === "accessories");

export default function AccessoriesPage() {
  return (
    <main className="bg-background pt-32 pb-20 md:pt-40 md:pb-28">
      <Container>
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Catalog
        </p>
        <h1 className="mt-5 text-balance font-display text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.05] text-foreground">
          The finishing <Highlight>pieces.</Highlight>
        </h1>
        <div className="mt-4 w-28">
          <ThreadLine width={112} height={8} className="w-28" />
        </div>
        <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
          Caps and other small pieces that finish a team&rsquo;s look — embroidered
          with the same in-house standard as every uniform we build.
        </p>
      </Container>

      <Suspense fallback={null}>
        <ProductCatalog products={ACCESSORIES} basePath="/accessories" />
      </Suspense>
    </main>
  );
}
