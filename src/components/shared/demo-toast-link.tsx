/**
 * @file src/components/shared/demo-toast-link.tsx
 * @description Demo link that shows a toast instead of navigating.
 */

"use client";

import { useToast } from "@/components/providers/toast-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";

export default function DemoToastLink({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}): React.JSX.Element {
  const { showToast } = useToast();
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => showToast(t("toast.comingSoon", l), "info")}
    >
      {children}
    </button>
  );
}
