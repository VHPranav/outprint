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
  RecordProductView,
} from "@/components/sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-config";

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
    alternates: {
      canonical: `${SITE_URL}/product/${product.slug}`,
    },
    openGraph: {
      type: "website",
      title: product.seo.title,
      description: product.seo.description,
      url: `${SITE_URL}/product/${product.slug}`,
      images: product.images.map((image) => ({ url: image })),
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.title,
      description: product.seo.description,
      images: product.images,
    },
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

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    ...ancestors.map((category) => ({ name: category.name, url: `${SITE_URL}/category/${category.slug}` })),
    { name: product.name, url: `${SITE_URL}/product/${product.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <RecordProductView slug={product.slug} />
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28">
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
