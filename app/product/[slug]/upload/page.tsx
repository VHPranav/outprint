import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug, getCategoryAncestors } from "@/lib/catalog";
import { Navbar, Footer } from "@/components/sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { UploadArtworkFlow } from "@/components/upload-flow/upload-artwork-flow";

interface UploadPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: UploadPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return { title: `Upload Artwork — ${product.name} | Outprint` };
}

export default function UploadPage({ params }: UploadPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const ancestors = getCategoryAncestors(product.categoryId);
  const breadcrumbItems = [
    ...ancestors.map((category) => ({ label: category.name, href: `/category/${category.slug}` })),
    { label: product.name, href: `/product/${product.slug}` },
    { label: "Upload Artwork" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        <React.Suspense fallback={null}>
          <UploadArtworkFlow product={product} />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}
