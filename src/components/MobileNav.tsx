"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";

const NAV = [
  { href: "/",          icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { href: "/kesfet",    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
  { href: "/mesajlar",  icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { href: "/etkinlikler", icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { href: "/profil/me", icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

export default function MobileNav() {
  const path = usePathname();
  const { messages } = useStore();
  const unread = messages.filter(m => m.to === "me" && !m.read).length;

  return (
    <nav style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "#fff", borderTop: "1px solid #f0f0f0", boxShadow: "0 -2px 12px rgba(0,0,0,0.06)", padding: "6px 0 env(safe-area-inset-bottom,6px)" }} className="mobile-nav">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", maxWidth: 480, margin: "0 auto" }}>
        {NAV.map((item) => {
          const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
          const isMsg = item.href === "/mesajlar";
          return (
            <Link key={item.href} href={item.href}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 16px", textDecoration: "none", color: active ? "#e63946" : "#9ca3af", position: "relative", transition: "color .2s" }}>
              {item.icon}
              {isMsg && unread > 0 && (
                <span style={{ position: "absolute", top: 4, right: 8, minWidth: 16, height: 16, background: "#e63946", borderRadius: "50%", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>{unread}</span>
              )}
              {active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#e63946", marginTop: 3 }}/>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
