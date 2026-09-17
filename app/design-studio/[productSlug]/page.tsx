import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug } from "@/lib/catalog";
import { DesignStudioLoader } from "@/components/design-studio/design-studio-loader";

interface DesignStudioPageProps {
  params: { productSlug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({ params }: DesignStudioPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.productSlug);
  if (!product) return {};
  return { title: `Design Studio — ${product.name} | Outprint` };
}

export default function DesignStudioPage({ params }: DesignStudioPageProps) {
  const product = getProductBySlug(params.productSlug);
  if (!product) notFound();

  return <DesignStudioLoader product={product} />;
}
