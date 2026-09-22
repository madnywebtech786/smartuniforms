import { notFound } from "next/navigation";
import { NEW_PRODUCTS } from "@/lib/newProducts";
import ProductDetail from "@/components/sections/product-detail/ProductDetail";

export function generateStaticParams() {
  return NEW_PRODUCTS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = NEW_PRODUCTS.find((item) => item.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} | Smart Uniform and Embroidery`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = NEW_PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
