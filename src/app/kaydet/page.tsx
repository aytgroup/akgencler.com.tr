"use client";
import React from "react";
import PageLayout from "@/components/PageLayout";
import { useStore, timeAgo } from "@/store/useStore";
import Avatar from "@/components/Avatar";
import Link from "next/link";

export default function KaydetPage() {
  const { posts, bookmarkPost, getUserById } = useStore();
  const saved = posts.filter(p => p.bookmarks.includes("me"));

  return (
    <PageLayout>
      <div className="space-y-3 animate-fade-in">
        <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #eef0f2", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", padding: "16px 20px" }}>
          <h1 style={{ fontWeight: 800, fontSize: 18, color: "#111827", margin: "0 0 4px" }}>🔖 Kaydettiklerim</h1>
          <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>{saved.length} kayıtlı gönderi</p>
        </div>

        {saved.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #eef0f2", padding: "48px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 40, margin: "0 0 12px" }}>🔖</p>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#374151", margin: "0 0 6px" }}>Henüz kayıt yok</p>
            <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>Beğendiğin gönderileri kaydet, burada görünsün.</p>
          </div>
        )}

        {saved.map((p, i) => {
          const author = getUserById(p.authorId);
          if (!author) return null;
          return (
            <div key={p.id} style={{ background: "#fff", borderRadius: 18, border: "1px solid #eef0f2", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", padding: "16px 20px", animation: `fadeIn .3s ease ${i * 0.07}s both` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Link href={`/profil/${p.authorId}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                  <Avatar name={author.name} size={36} color={author.avatarColor} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 13, color: "#111827", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{author.name}</p>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{timeAgo(p.createdAt)}</p>
                  </div>
                </Link>
                <button onClick={() => bookmarkPost(p.id)} title="Kaydı kaldır" style={{ background: "none", border: "none", cursor: "pointer", color: "#1d3557", flexShrink: 0 }}>
                  <svg width="16" height="16" fill="#1d3557" viewBox="0 0 24 24"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
              </div>
              <p style={{ fontSize: 13.5, color: "#1c1e21", lineHeight: 1.6, margin: 0 }}>{p.content}</p>
              {p.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {p.tags.map(t => <span key={t} style={{ fontSize: 11.5, fontWeight: 600, color: "#e63946", background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 20, padding: "3px 10px" }}>{t}</span>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
