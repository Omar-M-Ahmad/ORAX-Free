/**
 * @file src/components/sections/pro-upgrade-pill.tsx
 * @description Compact upgrade banner for ORAX Free hero section.
 */

"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { t } from "@/i18n";

export default function ProNotice(): React.JSX.Element {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: 12,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "10px 14px",
          borderRadius: 999,
          border: "1px solid var(--border)",
          background: "var(--surface)",
          color: "var(--text-2)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          maxWidth: "min(92vw, 720px)",
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--brand-dim)",
            border: "1px solid var(--brand-glow)",
            flexShrink: 0,
          }}
        >
          <Sparkles size={14} color="var(--brand)" />
        </span>

        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text-2)",
            lineHeight: 1.5,
          }}
        >
          {t("proNotice.text", locale)}
        </p>

        <Link
          href="https://omartech.gumroad.com/l/orax-pro"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 12px",
            borderRadius: 999,
            textDecoration: "none",
            background: "var(--brand)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {t("proNotice.cta", locale)}
          <ArrowUpRight
            size={13}
            style={{
              transform: isArabic ? "scaleX(-1)" : "none",
            }}
          />
        </Link>
      </div>
    </div>
  );
}
