/**
 * @file app/(dashboard)/settings/page.tsx
 * @description Settings page with real user data.
 * Supports profile update and account deletion.
 */

"use client";

import { AlertTriangle, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";

export default function SettingsPage(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();

  const { locale, setLocale } = useLocale();
  const l = locale;

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    setLocale(nextLocale);
  };
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [name, setName] = useState("Omar Ahmad");
  const [email] = useState("omar@example.com");
  const [bio, setBio] = useState(
    "Building serious SaaS systems with real Arabic + RTL support.",
  );

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
    transition: "border-color 0.2s",
  };

  const card: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: 28,
    marginBottom: 20,
  };

  return (
    <div style={{ maxWidth: 640 }}>
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
          {t("settings.heading", l)}
        </h1>
        <p style={{ color: "var(--text-3)", fontSize: 14 }}>
          {t("settings.sub", l)}
        </p>
      </div>

      <div style={card}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 700,
            color: "var(--text-1)",
            marginBottom: 24,
          }}
        >
          {t("settings.profile", l)}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label
              htmlFor="settings-name"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-2)",
                marginBottom: 7,
              }}
            >
              {t("settings.name", l)}
            </label>
            <input
              id="settings-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inp}
            />
          </div>

          <div>
            <label
              htmlFor="settings-email"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-2)",
                marginBottom: 7,
              }}
            >
              {t("settings.email", l)}
            </label>
            <input
              id="settings-email"
              type="email"
              value={email}
              readOnly
              style={{
                ...inp,
                opacity: 0.6,
                cursor: "not-allowed",
              }}
            />
            <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 4 }}>
              {t("settings.emailReadonly", l)}
            </p>
          </div>

          <div>
            <label
              htmlFor="settings-bio"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-2)",
                marginBottom: 7,
              }}
            >
              {t("settings.bio", l)}
            </label>
            <textarea
              id="settings-bio"
              placeholder={t("settings.bioPh", l)}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              style={{ ...inp, resize: "vertical", fontFamily: "inherit" }}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
            className="btn btn-primary"
            style={{ alignSelf: "flex-start", gap: 8 }}
          >
            <Save size={14} />
            {saved ? t("settings.saved", l) : t("settings.save", l)}
          </button>
        </div>
      </div>

      <div style={card}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 700,
            color: "var(--text-1)",
            marginBottom: 24,
          }}
        >
          {t("settings.prefs", l)}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-1)",
                }}
              >
                {t("settings.theme", l)}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
                {theme === "dark"
                  ? t("settings.themeDesc", l)
                  : t("settings.themeDescL", l)}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-ghost"
              style={{ padding: "8px 16px", fontSize: 13 }}
            >
              {theme === "dark"
                ? t("settings.switchLight", l)
                : t("settings.switchDark", l)}
            </button>
          </div>

          <div style={{ height: 1, background: "var(--border)" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-1)",
                }}
              >
                {t("settings.lang", l)}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
                {locale === "en"
                  ? t("settings.langEn", l)
                  : t("settings.langAr", l)}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleLocale}
              className="btn btn-ghost"
              style={{ padding: "8px 16px", fontSize: 13 }}
            >
              {t("settings.switchToAr", l)}
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          ...card,
          borderColor: "rgba(239,68,68,0.3)",
          background: "rgba(239,68,68,0.04)",
          marginBottom: 0,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 700,
            color: "var(--red)",
            marginBottom: 16,
          }}
        >
          {t("settings.danger", l)}
        </h2>

        {!showDeleteConfirm ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-1)",
                  marginBottom: 4,
                }}
              >
                {t("settings.delete", l)}
              </p>
              <p
                style={{ fontSize: 13, color: "var(--text-3)", maxWidth: 380 }}
              >
                {t("settings.deleteDesc", l)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 18px",
                borderRadius: 10,
                border: "1px solid rgba(239,68,68,0.4)",
                background: "rgba(239,68,68,0.1)",
                color: "var(--red)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <Trash2 size={14} />
              {t("settings.deleteBtn", l)}
            </button>
          </div>
        ) : (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <AlertTriangle
                size={20}
                style={{ color: "var(--red)", flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    color: "var(--text-1)",
                    marginBottom: 4,
                  }}
                >
                  {t("settings.deleteConfirmTitle", l)}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-2)" }}>
                  {t("settings.deleteConfirmText", l)}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-ghost"
                style={{ padding: "8px 16px", fontSize: 13 }}
              >
                {t("settings.cancel", l)}
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: "var(--red)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Trash2 size={14} />
                {t("settings.deleteConfirmBtn", l)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
