"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore, timeAgo } from "@/store/useStore";
import Avatar from "./Avatar";

const notifIcon = (t: string) =>
  ({ like: "❤️", comment: "💬", follow: "👤", mention: "@️", event: "🎯" }[t] ?? "🔔");

export default function Navbar() {
  const router = useRouter();
  const { currentUser, notifications, markAllNotifsRead, markNotifRead, searchQuery, setSearchQuery, posts, users } = useStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const q = searchQuery.trim().toLowerCase();
  const results = q.length > 1 ? [
    ...users.filter(u => u.name.toLowerCase().includes(q) || u.username.includes(q))
      .map(u => ({ kind: "user", id: u.id, label: u.name, sub: `@${u.username}`, color: u.avatarColor })),
    ...posts.filter(p => p.content.toLowerCase().includes(q)).slice(0, 3)
      .map(p => ({ kind: "post", id: p.id, label: p.content.slice(0, 48) + "…", sub: timeAgo(p.createdAt), color: null as string[] | null })),
  ] : [];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#fff", borderBottom: "1px solid #f0f0f0", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", height: 60 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", height: "100%", display: "grid", gridTemplateColumns: "240px 1fr auto", alignItems: "center", gap: 16, padding: "0 20px" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <div style={{ borderRadius: 8, overflow: "hidden", width: 42, height: 28, flexShrink: 0 }}>
            <svg width="42" height="28" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
              <rect width="900" height="600" fill="#E30A17"/>
              <circle cx="300" cy="300" r="200" fill="white"/>
              <circle cx="360" cy="300" r="160" fill="#E30A17"/>
              <g transform="translate(530,300) rotate(-12)"><polygon fill="white" points="0,-80 18.6,-57.2 59.5,-24.7 30.4,21.9 37.3,65.2 0,40 -37.3,65.2 -30.4,21.9 -59.5,-24.7 -18.6,-57.2"/></g>
            </svg>
          </div>
          <div>
            <span style={{ fontWeight: 900, fontSize: 17, background: "linear-gradient(135deg,#e63946,#c1121f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block", lineHeight: 1 }}>AKGENÇLER</span>
            <span style={{ fontSize: 8.5, color: "#9ca3af", fontWeight: 500, display: "block", marginTop: 2, letterSpacing: "0.1px", lineHeight: 1.3 }}>Türkiye&apos;nin Ak ve Âkil Gençlik Platformu</span>
          </div>
        </Link>

        {/* Search */}
        <div ref={searchRef} style={{ position: "relative", width: "100%", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <svg width="15" height="15" fill="none" stroke={searchOpen ? "#e63946" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ transition: "stroke .2s" }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input type="text" placeholder="Kişi, gönderi veya hashtag ara..." value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            style={{ width: "100%", paddingLeft: 38, paddingRight: 16, paddingTop: 9, paddingBottom: 9, borderRadius: 24, fontSize: 13.5, outline: "none", border: searchOpen ? "1.5px solid #e63946" : "1.5px solid transparent", background: searchOpen ? "#fff" : "#f3f4f6", boxShadow: searchOpen ? "0 0 0 3px rgba(230,57,70,0.10)" : "none", color: "#1f2937", transition: "all .2s", boxSizing: "border-box" as const }}
          />
          {searchOpen && results.length > 0 && (
            <div style={{ position: "absolute", top: 44, left: 0, right: 0, background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid #f0f0f0", zIndex: 200, overflow: "hidden" }}>
              {results.map((r, i) => (
                <div key={i} onClick={() => { setSearchOpen(false); setSearchQuery(""); if (r.kind === "user") router.push(`/profil/${r.id}`); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", borderBottom: i < results.length - 1 ? "1px solid #f9fafb" : "none" }}
                  onMouseOver={e => (e.currentTarget.style.background = "#fafafa")} onMouseOut={e => (e.currentTarget.style.background = "transparent")}>
                  {r.kind === "user" && r.color ? <Avatar name={r.label} size={32} color={r.color} /> : <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📝</div>}
                  <div><p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>{r.label}</p><p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{r.sub}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <Link href="/mesajlar" style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
            <svg width="17" height="17" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </Link>

          <div style={{ position: "relative" }} ref={notifRef}>
            <button onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) markAllNotifsRead(); }}
              style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
              <svg width="17" height="17" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {unread > 0 && <span style={{ position: "absolute", top: -2, right: -2, minWidth: 17, height: 17, background: "#e63946", borderRadius: "50%", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff", padding: "0 3px" }}>{unread}</span>}
            </button>
            {notifOpen && (
              <div style={{ position: "absolute", right: 0, top: 44, background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid #f0f0f0", width: 320, zIndex: 200, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>Bildirimler</span>
                </div>
                {notifications.length === 0 && <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", padding: "24px 0" }}>Bildirim yok</p>}
                {notifications.slice(0, 8).map((n, i) => (
                  <div key={n.id} onClick={() => markNotifRead(n.id)}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 16px", borderBottom: i < 7 ? "1px solid #f9fafb" : "none", background: n.read ? "transparent" : "rgba(230,57,70,0.03)", cursor: "pointer" }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{notifIcon(n.type)}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, color: "#374151", margin: "0 0 2px", lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>{timeAgo(n.createdAt)}</p>
                    </div>
                    {!n.read && <div style={{ width: 8, height: 8, background: "#e63946", borderRadius: "50%", marginTop: 4, flexShrink: 0 }}/>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/profil/me" style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", border: "2.5px solid #e63946", flexShrink: 0, display: "flex", boxShadow: "0 2px 6px rgba(230,57,70,0.2)" }}>
            <Avatar name={currentUser.name} size={38} color={currentUser.avatarColor} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
