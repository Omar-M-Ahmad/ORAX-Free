/**
 * @file components/ui/button.tsx
 * @description Button component for ORAX.
 */

"use client";

import { ArrowLeft } from "lucide-react";

type NotFoundBackButtonProps = {
  label: string;
};

export default function NotFoundBackButton({
  label,
}: NotFoundBackButtonProps): React.JSX.Element {
  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={() => window.history.back()}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
