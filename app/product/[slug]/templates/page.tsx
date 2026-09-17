import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug, getCategoryAncestors } from "@/lib/catalog";
import { Navbar, Footer } from "@/components/sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TemplatesGallery } from "@/components/templates-flow/templates-gallery";

interface TemplatesPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: TemplatesPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return { title: `Templates — ${product.name} | Outprint` };
}

export default function TemplatesPage({ params }: TemplatesPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const ancestors = getCategoryAncestors(product.categoryId);
  const breadcrumbItems = [
    ...ancestors.map((category) => ({ label: category.name, href: `/category/${category.slug}` })),
    { label: product.name, href: `/product/${product.slug}` },
    { label: "Templates" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        <React.Suspense fallback={null}>
          <TemplatesGallery product={product} />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}
