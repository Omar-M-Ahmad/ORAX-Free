/**
 * @file src/app/not-found.tsx
 * @description Custom 404 page for ORAX.
 */

"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";

export default function NotFoundPage(): React.JSX.Element {
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 520,
          background:
            "radial-gradient(ellipse,rgba(99,102,241,0.12) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 720,
          textAlign: "center",
          padding: "56px 28px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 28,
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: 74,
            height: 74,
            borderRadius: "50%",
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(99,102,241,0.12)",
            border: "1px solid var(--border-glow)",
            color: "var(--brand)",
          }}
        >
          <AlertTriangle size={30} />
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--brand)",
            marginBottom: 12,
          }}
        >
          404
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px,5vw,56px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "var(--text-1)",
            lineHeight: 1.05,
            marginBottom: 14,
          }}
        >
          {t("notFound.title", l)}
        </h1>

        <p
          style={{
            maxWidth: 520,
            margin: "0 auto 32px",
            fontSize: 15,
            lineHeight: 1.8,
            color: "var(--text-2)",
          }}
        >
          {t("notFound.desc", l)}
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="btn btn-glow">
            <Home size={16} />
            {t("notFound.home", l)}
          </Link>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            {t("notFound.back", l)}
          </button>
        </div>
      </div>
    </main>
  );
}
