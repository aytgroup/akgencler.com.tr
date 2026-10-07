"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { showToast } from "./Toast";

const NAV = [
  { href: "/",            label: "Ana Sayfa",      icon: "home" },
  { href: "/kesfet",      label: "Keşfet",         icon: "search" },
  { href: "/topluluklar", label: "Topluluklar",    icon: "users" },
  { href: "/etkinlikler", label: "Etkinlikler",    icon: "calendar" },
  { href: "/mesajlar",    label: "Mesajlar",       icon: "message" },
  { href: "/kaydet",      label: "Kaydettiklerim", icon: "bookmark" },
  { href: "/profil/me",   label: "Profilim",       icon: "user" },
];

const ICONS: Record<string, React.ReactNode> = {
  home:     <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  search:   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  users:    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  calendar: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  message:  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  bookmark: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>,
  user:     <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
};

const BASE_COUNTS = [12400, 8900, 6200, 4800, 3100];
const TREND_TAGS = [
  { tag: "#AkGençler",       keyword: "akgençler",       color: "#e63946", bg: "#fff1f2", growth: "+24%"  },
  { tag: "#TürkiyeGençliği", keyword: "türkiye",         color: "#1d3557", bg: "#eff6ff", growth: "+18%"  },
  { tag: "#GençFikirler",    keyword: "genç",             color: "#2d6a4f", bg: "#f0fdf4", growth: "+31%"  },
  { tag: "#İnovasyon",       keyword: "inovasyon",        color: "#7c3aed", bg: "#f5f3ff", growth: "+9%"   },
  { tag: "#Teknoloji",       keyword: "teknoloji",        color: "#0369a1", bg: "#f0f9ff", growth: "+7%"   },
];

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const { messages, logout, posts, setSearchQuery } = useStore();
  const unreadMsgs = messages.filter(m => m.to === "me" && !m.read).length;
  const card: React.CSSProperties = { background: "#fff", borderRadius: 16, border: "1px solid #eef0f2", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" };

  // Gerçek post sayısını keyword'e göre hesapla
  function getCount(keyword: string, base: number) {
    const real = posts.filter(p =>
      p.content.toLowerCase().includes(keyword.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(keyword.toLowerCase()))
    ).length;
    return real > 0 ? base + real * 10 : base;
  }

  function fmtCount(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
  }

  function handleTrend(t: typeof TREND_TAGS[0]) {
    setSearchQuery(t.tag);
    router.push("/kesfet");
    showToast(`${t.tag} konusu keşfediliyor 🔍`, "info");
  }

  function handleLogout() {
    logout();
    showToast("Çıkış yapıldı. Güle güle! 👋", "info");
    router.push("/giris");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={card}>
        {NAV.map((item, i) => {
          const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
          const badge = item.href === "/mesajlar" ? unreadMsgs : 0;
          return (
            <Link key={item.href} href={item.href}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", textDecoration: "none", background: active ? "#fff5f5" : "transparent", borderLeft: active ? "3px solid #e63946" : "3px solid transparent", borderBottom: i < NAV.length - 1 ? "1px solid #f9fafb" : "none" }}>
              <span style={{ color: active ? "#e63946" : "#6b7280", display: "flex", alignItems: "center", flexShrink: 0, width: 20 }}>{ICONS[item.icon]}</span>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: active ? 700 : 500, color: active ? "#e63946" : "#1f2937" }}>{item.label}</span>
              {badge > 0 && <span style={{ background: "#e63946", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, minWidth: 20, textAlign: "center", lineHeight: "16px" }}>{badge}</span>}
            </Link>
          );
        })}
      </div>

      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 10px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={{ fontWeight: 700, fontSize: 13.5, color: "#111827" }}>Trend Konular</span>
          </div>
          <button onClick={() => router.push("/kesfet")} style={{ fontSize: 10.5, fontWeight: 600, color: "#e63946", background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 20, padding: "3px 9px", cursor: "pointer" }}>
            Tümü →
          </button>
        </div>
        {TREND_TAGS.map((t, i) => {
          const count = getCount(t.keyword, BASE_COUNTS[i]);
          const barWidth = Math.round((count / BASE_COUNTS[0]) * 100);
          return (
            <div key={i}
              onClick={() => handleTrend(t)}
              style={{ padding: "10px 14px", borderBottom: i < TREND_TAGS.length - 1 ? "1px solid #f9fafb" : "none", cursor: "pointer", transition: "background .15s" }}
              onMouseOver={e => (e.currentTarget.style.background = t.bg)}
              onMouseOut={e => (e.currentTarget.style.background = "transparent")}>
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.color, display: "inline-block", flexShrink: 0 }}/>
                  <div>
                    <p style={{ fontSize: 9.5, color: "#9ca3af", margin: "0 0 1px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px" }}>#{i + 1} Trend</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: "#1f2937", margin: 0 }}>{t.tag}</p>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={{ fontSize: 11.5, color: t.color, fontWeight: 700, background: t.bg, border: `1px solid ${t.color}33`, padding: "2px 8px", borderRadius: 20, display: "block" }}>{fmtCount(count)}</span>
                  <span style={{ fontSize: 9.5, color: "#22c55e", fontWeight: 600, display: "block", marginTop: 2 }}>↑ {t.growth}</span>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ height: 3, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${barWidth}%`, background: `linear-gradient(90deg,${t.color}88,${t.color})`, borderRadius: 4, transition: "width .4s ease" }}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <button onClick={handleLogout}
        style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 16px", background: "#fff", borderRadius: 16, border: "1px solid #eef0f2", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", cursor: "pointer", color: "#e63946", fontWeight: 700, fontSize: 13.5 }}>
        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Çıkış Yap
      </button>
    </div>
  );
}
