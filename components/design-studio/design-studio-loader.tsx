"use client";

// Fabric.js touches the DOM at module scope in places, so the whole editor
// is loaded client-only (ssr: false) — this is the one file allowed to call
// next/dynamic that way, since App Router forbids it directly in a Server
// Component (see app/design-studio/[productSlug]/page.tsx).

import * as React from "react";
import dynamic from "next/dynamic";
import type { Product } from "@/data/products";
import { StudioLoadingScreen } from "./studio-loading-screen";

const DesignStudio = dynamic(() => import("./design-studio").then((m) => m.DesignStudio), {
  ssr: false,
  loading: () => <StudioLoadingScreen />,
});

export function DesignStudioLoader({ product }: { product: Product }) {
  return (
    <React.Suspense fallback={<StudioLoadingScreen />}>
      <DesignStudio product={product} />
    </React.Suspense>
  );
}
