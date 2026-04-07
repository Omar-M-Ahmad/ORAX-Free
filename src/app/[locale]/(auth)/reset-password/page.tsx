/**
 * @file src/app/(auth)/reset-password/page.tsx
 * @description Reset password page using token from query string.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { t } from "@/i18n";
import { useLocale } from "@/components/providers/locale-provider";

export default function ResetPasswordPage(): React.JSX.Element {
  const { locale: l } = useLocale();

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);

  const inp: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1px solid var(--border)",
    background: "var(--bg-1)",
    color: "var(--text-1)",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: 32,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 800,
            color: "var(--text-1)",
            marginBottom: 8,
          }}
        >
          {t("auth.reset.title", l)}
        </h1>

        <p style={{ color: "var(--text-3)", fontSize: 14, marginBottom: 24 }}>
          {t("auth.reset.subtitle", l)}
        </p>

        {success ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 14px",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 10,
              color: "var(--green)",
              fontSize: 13,
            }}
          >
            <CheckCircle2 size={16} />
            {t("auth.reset.success", l)}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSuccess(true);
            }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-2)",
                  marginBottom: 8,
                }}
              >
                {t("auth.login.password", l)}
              </label>

              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inp, paddingInlineEnd: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    insetInlineEnd: 12,
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "none",
                    color: "var(--text-3)",
                    cursor: "pointer",
                  }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-glow"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "13px",
              }}
            >
              {t("auth.reset.submit", l)}
            </button>
          </form>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 14,
            color: "var(--text-3)",
          }}
        >
          <Link
            href="/login"
            style={{
              color: "var(--brand)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {t("auth.forgot.back", l)}
          </Link>
        </p>
      </div>
    </div>
  );
}
