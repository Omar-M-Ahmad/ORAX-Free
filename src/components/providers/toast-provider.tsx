/**
 * @file src/components/providers/toast-provider.tsx
 * @description Lightweight global toast provider for ORAX.
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle2, Info, X, AlertTriangle } from "lucide-react";

type ToastVariant = "info" | "success" | "warning";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(1);

  const removeToast = useCallback((id: number): void => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "info"): void => {
      const id = idRef.current++;
      setToasts((current) => [...current, { id, message, variant }]);

      window.setTimeout(() => {
        removeToast(id);
      }, 2800);
    },
    [removeToast],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        style={{
          position: "fixed",
          insetInlineEnd: 20,
          bottom: 20,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => {
          const icon =
            toast.variant === "success" ? (
              <CheckCircle2 size={16} />
            ) : toast.variant === "warning" ? (
              <AlertTriangle size={16} />
            ) : (
              <Info size={16} />
            );

          const accent =
            toast.variant === "success"
              ? "var(--green)"
              : toast.variant === "warning"
                ? "var(--amber)"
                : "var(--brand)";

          return (
            <div
              key={toast.id}
              style={{
                minWidth: 260,
                maxWidth: 360,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 14,
                background: "var(--surface)",
                border: `1px solid ${accent}`,
                color: "var(--text-1)",
                boxShadow:
                  "0 14px 34px rgba(0,0,0,0.18), 0 2px 10px rgba(0,0,0,0.08)",
                backdropFilter: "blur(14px)",
                pointerEvents: "auto",
                animation: "toast-in 0.22s ease-out",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  flexShrink: 0,
                  color: accent,
                }}
              >
                {icon}
              </span>

              <span
                style={{
                  flex: 1,
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "var(--text-1)",
                }}
              >
                {toast.message}
              </span>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                aria-label="Close toast"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  borderRadius: 8,
                  color: "var(--text-3)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return ctx;
}
