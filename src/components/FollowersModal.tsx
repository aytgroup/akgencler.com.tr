"use client";
import React from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import Avatar from "./Avatar";

interface Props {
  title: string;
  userIds: string[];
  onClose: () => void;
}

export default function FollowersModal({ title, userIds, onClose }: Props) {
  const { users, currentUser, followUser, unfollowUser } = useStore();
  const people = userIds.map(id => users.find(u => u.id === id) || (id === "me" ? currentUser : null)).filter(Boolean);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, width: 360, maxHeight: 480, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <h3 style={{ fontWeight: 800, fontSize: 16, color: "#111827", margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {people.length === 0 && <p style={{ textAlign: "center", padding: "32px 0", fontSize: 13, color: "#9ca3af" }}>Henüz kimse yok</p>}
          {people.map((u) => {
            if (!u) return null;
            const isMe = u.id === "me" || u.id === currentUser.id;
            const isFollowing = currentUser.following.includes(u.id);
            return (
              <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", borderBottom: "1px solid #f9fafb" }}>
                <Link href={`/profil/${u.id}`} onClick={onClose} style={{ textDecoration: "none", flexShrink: 0 }}>
                  <Avatar name={u.name} size={40} color={u.avatarColor} />
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link href={`/profil/${u.id}`} onClick={onClose} style={{ textDecoration: "none" }}>
                    <p style={{ fontWeight: 700, fontSize: 13.5, color: "#111827", margin: 0 }}>{u.name}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>@{u.username}</p>
                  </Link>
                </div>
                {!isMe && (
                  <button onClick={() => isFollowing ? unfollowUser(u.id) : followUser(u.id)}
                    style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, border: isFollowing ? "1px solid #e5e7eb" : "none", background: isFollowing ? "#f3f4f6" : "#e63946", color: isFollowing ? "#6b7280" : "#fff", cursor: "pointer", flexShrink: 0 }}>
                    {isFollowing ? "Takipte" : "Takip"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}