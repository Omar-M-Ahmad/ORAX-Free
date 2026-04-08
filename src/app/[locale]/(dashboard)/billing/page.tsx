/**
 * @file src/app/(dashboard)/billing/page.tsx
 * @description Billing page with dynamic subscription details.
 */

"use client";

import { CreditCard, Download, Zap } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { t } from "@/i18n";

const planFeatureKeys = [
  "billing.f1",
  "billing.f2",
  "billing.f3",
  "billing.f4",
  "billing.f5",
] as const;

const invoices = [
  { id: "INV-001", date: "Apr 01, 2026", amount: "$99" },
  { id: "INV-002", date: "Mar 01, 2026", amount: "$99" },
];

export default function BillingPage(): React.JSX.Element {
  const { locale: l } = useLocale();

  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-1)",
            marginBottom: 4,
          }}
        >
          {t("billing.heading", l)}
        </h1>
        <p style={{ color: "var(--text-3)", fontSize: 14 }}>
          {t("billing.sub", l)}
        </p>
      </div>

      <div
        style={{
          background:
            "linear-gradient(135deg,rgba(99,102,241,0.08) 0%,var(--surface) 100%)",
          border: "1px solid var(--brand)",
          borderRadius: 20,
          padding: 28,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-3)",
                }}
              >
                {t("billing.current", l)}
              </p>

              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 10px",
                  borderRadius: 999,
                  background: "rgba(34,197,94,0.15)",
                  color: "var(--green)",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                {t("billing.active", l)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "var(--text-1)",
                }}
              >
                {t("editions.pro.name", l)}
              </p>

              <p
                style={{ fontSize: 20, fontWeight: 700, color: "var(--brand)" }}
              >
                $99
              </p>
            </div>

            <p
              style={{
                fontSize: 13,
                color: "var(--text-3)",
                fontFamily: "var(--font-mono)",
                marginBottom: 20,
              }}
            >
              {t("billing.period", l)}
            </p>

            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {planFeatureKeys.map((k) => (
                <li
                  key={k}
                  style={{
                    fontSize: 14,
                    color: "var(--text-2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "var(--green)" }}>✓</span>
                  {t(k, l)}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "var(--brand-dim)",
              border: "1px solid var(--brand-glow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={22} color="var(--brand)" />
          </div>
        </div>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "var(--bg-1)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CreditCard size={20} color="var(--text-2)" />
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)" }}>
            •••• •••• •••• 4242
          </p>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>
            {t("billing.cardExpires", l)}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-ghost"
          style={{ padding: "7px 14px", fontSize: 13 }}
        >
          {t("billing.update", l)}
        </button>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 700,
              color: "var(--text-1)",
            }}
          >
            {t("billing.invoices", l)}
          </p>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {(
                [
                  "billing.hInvoice",
                  "billing.hDate",
                  "billing.hAmount",
                  "billing.hStatus",
                  "",
                ] as const
              ).map((h, i) => (
                <th
                  key={h || `empty-${i}`}
                  style={{
                    padding: "12px 24px",
                    textAlign: "start",
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-3)",
                    fontWeight: 500,
                  }}
                >
                  {h ? t(h, l) : ""}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv, i) => (
              <tr
                key={inv.id}
                style={{
                  borderBottom:
                    i < invoices.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <td
                  style={{
                    padding: "14px 24px",
                    fontSize: 14,
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-1)",
                  }}
                >
                  {inv.id}
                </td>

                <td
                  style={{
                    padding: "14px 24px",
                    fontSize: 14,
                    color: "var(--text-2)",
                  }}
                >
                  {inv.date}
                </td>

                <td
                  style={{
                    padding: "14px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-1)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {inv.amount}
                </td>

                <td style={{ padding: "14px 24px" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 999,
                      color: "var(--green)",
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.2)",
                    }}
                  >
                    {t("billing.paid", l)}
                  </span>
                </td>

                <td style={{ padding: "14px 24px" }}>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 12,
                      color: "var(--text-3)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Download size={12} />
                    {t("billing.pdf", l)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
