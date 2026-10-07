"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import Avatar from "./Avatar";

const events = [
  { day: "15", title: "Gençlik Zirvesi 2026", location: "İstanbul", date: "15 Ekim", attendees: "234", color: "#e63946", bg: "#fff1f2" },
  { day: "22", title: "Startup Weekend",      location: "Ankara",   date: "22 Ekim", attendees: "156", color: "#1d3557", bg: "#f0f4ff" },
  { day: "1",  title: "TÜBİTAK Buluşması",   location: "Online",   date: "1 Kasım", attendees: "512", color: "#2a9d8f", bg: "#f0faf9" },
];

export default function RightPanel() {
  const { users, currentUser, followUser, unfollowUser } = useStore();
  const suggestions = users.filter(u => u.id !== "me" && !currentUser.following.includes(u.id)).slice(0, 4);
  const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" };
  const hdrStyle: React.CSSProperties = { padding: "13px 16px 11px", borderBottom: "1px solid #f5f5f5", display: "flex", alignItems: "center", justifyContent: "space-between" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Suggestions */}
      <div style={cardStyle}>
        <div style={hdrStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>👥</span>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#1c1e21" }}>Tanıyor Olabilirsin</span>
          </div>
        </div>
        <div style={{ padding: "10px 12px 12px" }}>
          {suggestions.length === 0 && <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "12px 0" }}>Tüm kullanıcıları takip ediyorsun! 🎉</p>}
          {suggestions.map(u => {
            const isFollowing = currentUser.following.includes(u.id);
            return (
              <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #f9fafb" }}>
                <Link href={`/profil/${u.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
                  <Avatar name={u.name} size={36} color={u.avatarColor} />
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link href={`/profil/${u.id}`} style={{ textDecoration: "none" }}>
                    <p style={{ fontSize: 12.5, fontWeight: 700, color: "#111827", margin: "0 0 1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</p>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{u.followers.length} takipçi</p>
                  </Link>
                </div>
                <button onClick={() => isFollowing ? unfollowUser(u.id) : followUser(u.id)}
                  style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, border: isFollowing ? "1px solid #e5e7eb" : "none", background: isFollowing ? "#f3f4f6" : "#e63946", color: isFollowing ? "#6b7280" : "#fff", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {isFollowing ? "Takipte" : "+ Takip"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events */}
      <div style={cardStyle}>
        <div style={hdrStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>🎯</span>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#1c1e21" }}>Yaklaşan Etkinlikler</span>
          </div>
          <Link href="/etkinlikler" style={{ fontSize: 11, fontWeight: 600, color: "#e63946", textDecoration: "none", padding: "3px 9px", borderRadius: 20, background: "#fff1f2", border: "1px solid #fecdd3" }}>Tümü</Link>
        </div>
        <div style={{ padding: "10px 14px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          {events.map((ev, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, background: ev.bg, border: `1px solid ${ev.color}20`, cursor: "pointer" }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: ev.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 17, flexShrink: 0 }}>{ev.day}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: "#1c1e21", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 4 }}>{ev.title}</div>
                <div style={{ fontSize: 10.5, color: "#6b7280" }}>📍 {ev.location} · {ev.date}</div>
                <div style={{ fontSize: 10.5, color: "#9ca3af", marginTop: 2 }}>👥 {ev.attendees} katılımcı</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "14px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: "#1c1e21", margin: "0 0 4px" }}>AKGENÇLER © 2026</p>
        <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 10, lineHeight: 1.5 }}>Türkiye&apos;nin Ak ve Âkil Gençlik Platformu</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
          {["Hakkında", "Gizlilik", "Koşullar", "Yardım"].map((item, i, arr) => (
            <span key={item} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 11, color: "#6b7280", cursor: "pointer" }}>{item}</span>
              {i < arr.length - 1 && <span style={{ color: "#d1d5db", fontSize: 10 }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
