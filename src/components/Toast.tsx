"use client";
import React, { useEffect, useState } from "react";

export interface ToastMsg { id: string; text: string; type?: "success"|"error"|"info"; }

let _show: ((msg: ToastMsg) => void) | null = null;

export function showToast(text: string, type: ToastMsg["type"] = "success") {
  if (_show) _show({ id: Math.random().toString(36).slice(2), text, type });
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    _show = (msg) => {
      setToasts(t => [...t, msg]);
      setTimeout(() => setToasts(t => t.filter(x => x.id !== msg.id)), 2800);
    };
    return () => { _show = null; };
  }, []);

  const colors: Record<string, { bg: string; border: string; icon: string }> = {
    success: { bg: "#f0fdf4", border: "#86efac", icon: "✅" },
    error:   { bg: "#fff1f2", border: "#fca5a5", icon: "❌" },
    info:    { bg: "#eff6ff", border: "#93c5fd", icon: "ℹ️" },
  };

  return (
    <div style={{ position: "fixed", bottom: 80, right: 20, zIndex: 1000, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
      {toasts.map(t => {
        const c = colors[t.type || "success"];
        return (
          <div key={t.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "#111827", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", animation: "slideInRight .25s ease both", minWidth: 200, maxWidth: 320 }}>
            <span>{c.icon}</span>
            <span style={{ flex: 1 }}>{t.text}</span>
          </div>
        );
      })}
      <style>{`@keyframes slideInRight { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}
