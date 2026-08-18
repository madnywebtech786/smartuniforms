import { notFound } from "next/navigation";
import { CATALOG_ITEMS } from "@/lib/catalog";
import ProductDetail from "@/components/sections/product-detail/ProductDetail";

export function generateStaticParams() {
  return CATALOG_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = CATALOG_ITEMS.find((item) => item.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} | Smart Uniform and Embroidery`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = CATALOG_ITEMS.find((item) => item.slug === slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
