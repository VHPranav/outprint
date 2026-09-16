import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug, getCategoryAncestors, getProductsByCategory } from "@/lib/catalog";
import {
  Navbar,
  Footer,
  ProductGallery,
  ProductConfigurator,
  ProductInfoTabs,
  ProductReviews,
  RelatedProducts,
} from "@/components/sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: product.seo.title,
    description: product.seo.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const ancestors = getCategoryAncestors(product.categoryId);
  const breadcrumbItems = [
    ...ancestors.map((category) => ({ label: category.name, href: `/category/${category.slug}` })),
    { label: product.name },
  ];

  const topCategory = ancestors[0];
  const relatedProducts = (topCategory ? getProductsByCategory(topCategory.slug) : [])
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 sm:py-10">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <ProductGallery images={product.images} productName={product.name} />
          <React.Suspense fallback={null}>
            <ProductConfigurator product={product} />
          </React.Suspense>
        </div>

        <div className="mt-20 space-y-20">
          <ProductInfoTabs product={product} />
          <ProductReviews />
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
