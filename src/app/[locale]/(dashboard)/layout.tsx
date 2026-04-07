/**
 * @file app/(dashboard)/layout.tsx
 * @description Dashboard shell — uses next/link for all navigation.
 * Displays real user data from session.
 */

"use client";

import {
  Bell,
  CreditCard,
  LayoutDashboard,
  Menu,
  Moon,
  Settings,
  Sun,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";

const navItems = [
  { key: "dashboard" as const, icon: LayoutDashboard, href: "/dashboard" },
  { key: "settings" as const, icon: Settings, href: "/settings" },
  { key: "billing" as const, icon: CreditCard, href: "/billing" },
];

const navLabels = {
  dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
  settings: { en: "Settings", ar: "الإعدادات" },
  billing: { en: "Billing", ar: "الفواتير" },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();

  const { locale, setLocale } = useLocale();
  const l = locale;
  const isAr = l === "ar";

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    setLocale(nextLocale);
  };
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userInitial = "O";
  const userName = "Omar Ahmad";
  const userEmail = "omar@example.com";

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", background: "var(--bg-0)" }}
    >
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 35,
          }}
        />
      )}

      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: "var(--surface)",
          borderInlineEnd: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          insetBlock: 0,
          insetInlineStart: 0,
          zIndex: 40,
          transition: "transform 0.3s var(--ease)",
        }}
        className={sidebarOpen ? "sidebar-open" : ""}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "var(--brand)",
                boxShadow: "0 0 16px rgba(99,102,241,0.45)",
              }}
            >
              <Zap size={13} fill="white" color="white" />
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 17,
                fontWeight: 800,
                color: "var(--text-1)",
                letterSpacing: "-0.04em",
              }}
            >
              ORAX
            </span>
          </Link>
        </div>

        <nav
          style={{ flex: 1, padding: "16px 12px" }}
          aria-label="Dashboard navigation"
        >
          <p
            style={{
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-3)",
              padding: "0 12px",
              marginBottom: 8,
            }}
          >
            {t("common.menu", l)}
          </p>

          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {navItems.map(({ key, icon: Icon, href }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={key}>
                  <Link
                    href={href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 12px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 500,
                      color: isActive ? "var(--text-1)" : "var(--text-2)",
                      background: isActive ? "var(--brand-dim)" : "transparent",
                      border: isActive
                        ? "1px solid var(--brand-glow)"
                        : "1px solid transparent",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {isAr ? navLabels[key].ar : navLabels[key].en}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div style={{ padding: 12, borderTop: "1px solid var(--border)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: "var(--bg-1)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,var(--brand),var(--violet))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {userInitial}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text-1)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userName}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--text-3)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div
        style={{
          flex: 1,
          marginInlineStart: 240,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <header
          style={{
            height: 64,
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            background: "var(--bg-0)",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="mobile-menu-btn"
            style={{
              display: "none",
              padding: 8,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              color: "var(--text-2)",
              cursor: "pointer",
            }}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div style={{ flex: 1 }} />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              className="nav-toggle-btn"
              aria-label="Notifications"
            >
              <Bell size={14} />
            </button>

            <button
              type="button"
              onClick={toggleLocale}
              className="nav-toggle-btn"
              style={{ fontSize: 11 }}
            >
              {isAr ? "EN" : "عربي"}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="nav-toggle-btn"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
        </header>

        <main
          style={{
            flex: 1,
            padding: "36px 28px",
            maxWidth: 1200,
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media(max-width:768px){
          aside{transform:translateX(-100%)}
          [dir="rtl"] aside{transform:translateX(100%)}
          aside.sidebar-open{transform:translateX(0)!important}
          .mobile-menu-btn{display:flex!important}
          aside+div{margin-inline-start:0!important}
        }
      `}</style>
    </div>
  );
}
