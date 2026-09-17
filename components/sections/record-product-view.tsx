"use client";

import * as React from "react";
import { recordProductView } from "@/lib/recently-viewed";

/** Invisible — records this product into the visitor's local "recently viewed" list on mount. */
export function RecordProductView({ slug }: { slug: string }) {
  React.useEffect(() => {
    recordProductView(slug);
  }, [slug]);

  return null;
}
