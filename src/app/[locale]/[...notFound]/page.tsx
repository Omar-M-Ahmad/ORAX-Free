/**
 * @file src/app/[locale]/[...notFound]/page.tsx
 * @description Catch-all route to trigger the localized 404 page.
 */

import { notFound } from "next/navigation";

export default function CatchAllNotFound() {
  notFound();
}
