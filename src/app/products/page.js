import Container from "@/components/shared/Container";
import Highlight from "@/components/shared/Highlight";
import ThreadLine from "@/components/animations/ThreadLine";
import ProductCatalog from "@/components/sections/product-catalog/ProductCatalog";

export const metadata = {
  title: "Products | Smart Uniform and Embroidery",
  description:
    "Browse the full Smart Uniform and Embroidery catalog — administration, health, security, industrial, and hospitality garments, manufactured and embroidered in-house in Calgary.",
};

export default function ProductsPage() {
  return (
    <main className="bg-background pt-32 pb-20 md:pt-40 md:pb-28">
      <Container>
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Catalog
        </p>
        <h1 className="mt-5 text-balance font-display text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.05] text-foreground">
          Every garment we <Highlight>build</Highlight>.
        </h1>
        <div className="mt-4 w-28">
          <ThreadLine width={112} height={8} className="w-28" />
        </div>
        <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
          Manufactured, embroidered, and sublimated under one roof in Calgary. Filter by
          category, colour, or fit to find the piece your team needs.
        </p>
      </Container>

      <ProductCatalog />
    </main>
  );
}
