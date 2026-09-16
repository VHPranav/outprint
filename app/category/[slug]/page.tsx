import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import {
  getCategoryBySlug,
  getSubcategories,
  getProductsByCategory,
  getCategoryAncestors,
} from "@/lib/catalog";
import { Navbar, Footer, SubcategoryTiles, CategoryProductGrid } from "@/components/sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface CategoryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  return {
    title: category.seo?.title ?? `${category.name} | Outprint`,
    description:
      category.seo?.description ??
      `Shop custom ${category.name.toLowerCase()} at Outprint — bulk pricing, free digital proof, pan-India delivery.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const subcategories = getSubcategories(category.slug);
  const products = getProductsByCategory(category.slug);
  const ancestors = getCategoryAncestors(category.slug);

  const breadcrumbItems = ancestors.map((c) => ({
    label: c.name,
    href: `/category/${c.slug}`,
  }));

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-14">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="mb-10 max-w-2xl">
          <h1 className="font-serif text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
            {category.name}
          </h1>
          {category.seo?.description && (
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              {category.seo.description}
            </p>
          )}
        </div>

        {subcategories.length > 0 && (
          <div className="mb-14">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Browse {category.name}
            </h2>
            <SubcategoryTiles subcategories={subcategories} />
          </div>
        )}

        <CategoryProductGrid products={products} />
      </main>

      <Footer />
    </div>
  );
}
