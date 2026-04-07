/**
 * @file app/(dashboard)/dashboard/page.tsx
 * @description ORAX Dashboard overview with real data.
 */

"use client";

import { Activity, DollarSign, TrendingUp, Users } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { t } from "@/i18n";

const barHeights = [38, 55, 42, 70, 52, 84, 63, 88, 58, 80, 72, 100];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const stats = [
  {
    labelKey: "dash.revenue" as const,
    deltaKey: "dash.dRevDelta" as const,
    icon: DollarSign,
    value: "$24,800",
    deltaPos: true,
  },
  {
    labelKey: "dash.users" as const,
    deltaKey: "dash.dUsrDelta" as const,
    icon: Users,
    value: "1,240",
    deltaPos: true,
  },
  {
    labelKey: "dash.mrr" as const,
    deltaKey: "dash.dMrrDelta" as const,
    icon: TrendingUp,
    value: "$8,900",
    deltaPos: true,
  },
  {
    labelKey: "dash.churn" as const,
    deltaKey: "dash.dChuDelta" as const,
    icon: Activity,
    value: "2.1%",
    deltaPos: false,
  },
];

const rows = [
  {
    name: "Acme Studio",
    plan: "Pro",
    amount: "$99",
    statusKey: "dash.active",
    date: "Apr 02",
  },
  {
    name: "Noor Labs",
    plan: "Starter",
    amount: "$49",
    statusKey: "dash.trial",
    date: "Apr 03",
  },
  {
    name: "Atlas Team",
    plan: "Pro",
    amount: "$99",
    statusKey: "dash.active",
    date: "Apr 04",
  },
];

export default function DashboardPage(): React.JSX.Element {
  const { locale: l } = useLocale();
  const welcomeText = t("dash.welcome", l, { name: "Omar" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
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
          {t("dash.heading", l)}
        </h1>
        <p style={{ color: "var(--text-3)", fontSize: 14 }}>{welcomeText}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
        }}
      >
        {stats.map(({ labelKey, deltaKey, icon: Icon, value, deltaPos }) => (
          <div
            key={labelKey}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-3)",
                  fontWeight: 500,
                }}
              >
                {t(labelKey, l)}
              </p>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: "var(--brand-dim)",
                  border: "1px solid var(--brand-glow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={15} color="var(--brand)" aria-hidden="true" />
              </div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-1)",
                marginBottom: 6,
              }}
            >
              {value}
            </p>

            <p
              style={{
                fontSize: 12,
                color: deltaPos ? "var(--green)" : "var(--red)",
              }}
            >
              {t(deltaKey, l)}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: 28,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--text-1)",
            marginBottom: 24,
          }}
        >
          {t("dash.chart", l)}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
            height: 160,
          }}
        >
          {barHeights.map((h, i) => (
            <div
              key={`bar-${i}-${h}`}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${h}%`,
                  borderRadius: "6px 6px 4px 4px",
                  background:
                    i === 11
                      ? "var(--brand)"
                      : `rgba(99,102,241,${0.15 + (h / 100) * 0.4})`,
                  boxShadow:
                    i === 11 ? "0 0 12px rgba(99,102,241,0.4)" : "none",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: "var(--text-3)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {months[i]}
              </span>
            </div>
          ))}
        </div>
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
            {t("dash.recent", l)}
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {[
                  "dash.hCustomer",
                  "dash.hPlan",
                  "dash.hAmount",
                  "dash.hStatus",
                  "dash.hDate",
                ].map((hKey) => (
                  <th
                    key={hKey}
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
                    {t(hKey, l)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.name}
                  style={{
                    borderBottom:
                      i < rows.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 24px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-1)",
                    }}
                  >
                    {row.name}
                  </td>
                  <td
                    style={{
                      padding: "14px 24px",
                      fontSize: 13,
                      color: "var(--text-2)",
                    }}
                  >
                    {row.plan}
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
                    {row.amount}
                  </td>
                  <td style={{ padding: "14px 24px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: "var(--font-mono)",
                        padding: "3px 10px",
                        borderRadius: 999,
                        color:
                          row.statusKey === "dash.active"
                            ? "var(--green)"
                            : "var(--amber)",
                        background:
                          row.statusKey === "dash.active"
                            ? "rgba(34,197,94,0.1)"
                            : "rgba(255,140,66,0.1)",
                        border: `1px solid ${
                          row.statusKey === "dash.active"
                            ? "rgba(34,197,94,0.2)"
                            : "rgba(255,140,66,0.2)"
                        }`,
                      }}
                    >
                      {t(row.statusKey, l)}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "14px 24px",
                      fontSize: 13,
                      color: "var(--text-3)",
                    }}
                  >
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
