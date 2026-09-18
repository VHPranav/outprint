import { redirect } from "next/navigation";

/** Product the design studio opens with when reached without a specific product (e.g. the homepage button). */
const DEFAULT_STUDIO_PRODUCT = "standard-business-cards";

export default function DesignStudioIndexPage() {
  redirect(`/design-studio/${DEFAULT_STUDIO_PRODUCT}`);
}
