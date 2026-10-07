"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useStore, Post, timeAgo } from "@/store/useStore";
import { showToast } from "./Toast";
import Avatar from "./Avatar";

interface Props { post: Post; }

export default function PostCard({ post }: Props) {
  const { likePost, bookmarkPost, addComment, likeComment, deleteComment, sharePost, deletePost, currentUser, getUserById } = useStore();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [likeAnim, setLikeAnim] = useState(false);
  const [shared, setShared] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [doubleTapHeart, setDoubleTapHeart] = useState(false);

  const author = getUserById(post.authorId);
  if (!author) return null;

  const liked = post.likes.includes("me");
  const bookmarked = post.bookmarks.includes("me");
  const isOwn = post.authorId === "me";

  function doLike() {
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 400);
    likePost(post.id);
    if (!liked) showToast("Gönderi beğenildi ❤️");
  }
  function doShare() {
    sharePost(post.id);
    setShared(true);
    showToast("Gönderi paylaşıldı 🔗");
    setTimeout(() => setShared(false), 1800);
  }
  function submitComment() {
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText("");
    showToast("Yorum eklendi 💬");
  }
  function openEdit() {
    setEditText(post.content);
    setEditOpen(true);
    setMenuOpen(false);
  }
  function saveEdit() {
    if (!editText.trim()) return;
    // Store'da editPost henüz yok — posts üzerinde map yapıyoruz
    const { posts: allPosts } = useStore.getState();
    useStore.setState({
      posts: allPosts.map(p => p.id === post.id ? { ...p, content: editText.trim() } : p)
    });
    setEditOpen(false);
    showToast("Gönderi düzenlendi ✏️");
  }

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eef0f2", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 10px" }}>
        <Link href={`/profil/${post.authorId}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Avatar name={author.name} size={42} color={author.avatarColor} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{author.name}</span>
              {author.verified && <span style={{ width: 15, height: 15, background: "#e63946", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><svg width="7" height="7" fill="white" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>}
            </div>
            <p style={{ fontSize: 11.5, color: "#9ca3af", margin: 0 }}>@{author.username} · {timeAgo(post.createdAt)}</p>
          </div>
        </Link>
        <div style={{ position: "relative" }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ width: 30, height: 30, border: "none", background: "none", cursor: "pointer", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </button>
          {menuOpen && (
            <div style={{ position: "absolute", right: 0, top: 34, background: "#fff", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid #f0f0f0", zIndex: 50, minWidth: 150, overflow: "hidden" }}>
              {isOwn && <>
                <button onClick={openEdit} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 14px", border: "none", background: "none", cursor: "pointer", color: "#374151", fontSize: 13, fontWeight: 600 }}>✏️ Düzenle</button>
                <button onClick={() => { deletePost(post.id); setMenuOpen(false); showToast("Gönderi silindi", "error"); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 14px", border: "none", background: "none", cursor: "pointer", color: "#e63946", fontSize: 13, fontWeight: 600 }}>🗑️ Sil</button>
              </>}
              <button onClick={() => { bookmarkPost(post.id); setMenuOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 14px", border: "none", background: "none", cursor: "pointer", color: "#374151", fontSize: 13, fontWeight: 600 }}>{bookmarked ? "🔖 Çıkar" : "🔖 Kaydet"}</button>
              <button onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 14px", border: "none", background: "none", cursor: "pointer", color: "#374151", fontSize: 13, fontWeight: 600 }}>🚩 Raporla</button>
            </div>
          )}
        </div>
      </div>
      {/* Content - double tap to like */}
      <div style={{ padding: "0 16px 12px", position: "relative" }}
        onDoubleClick={() => { if (!liked) { doLike(); } setDoubleTapHeart(true); setTimeout(() => setDoubleTapHeart(false), 800); }}>
        {doubleTapHeart && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 10 }}>
            <span style={{ fontSize: 56, animation: "heartPop .8s ease both" }}>❤️</span>
          </div>
        )}
        <style>{`@keyframes heartPop { 0%{transform:scale(0);opacity:1} 50%{transform:scale(1.3);opacity:1} 100%{transform:scale(1.1);opacity:0} }`}</style>
        <p style={{ fontSize: 14, color: "#1c1e21", lineHeight: 1.7, margin: 0 }}>{post.content}</p>
        {post.tags.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{post.tags.map(t => <span key={t} style={{ fontSize: 11.5, fontWeight: 600, color: "#e63946", background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 20, padding: "3px 10px" }}>{t}</span>)}</div>}
      </div>
      {/* Image */}
      {post.imageGradient && <div style={{ margin: "0 14px 12px", borderRadius: 12, overflow: "hidden", height: 180, background: post.imageGradient, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 48, opacity: 0.5 }}>🖼️</span></div>}
      {/* Stats */}
      {(post.likes.length > 0 || post.comments.length > 0 || post.shares > 0) && (
        <div style={{ display: "flex", alignItems: "center", padding: "0 16px 10px", gap: 12 }}>
          {post.likes.length > 0 && <span style={{ fontSize: 12, color: "#9ca3af" }}>❤️ {post.likes.length}</span>}
          {post.comments.length > 0 && <span style={{ fontSize: 12, color: "#9ca3af", cursor: "pointer" }} onClick={() => setShowComments(!showComments)}>{post.comments.length} yorum</span>}
          {post.shares > 0 && <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.shares} paylaşım</span>}
        </div>
      )}
      {/* Action bar */}
      <div style={{ display: "flex", borderTop: "1px solid #f3f4f6" }}>
        <button onClick={doLike} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", border: "none", background: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 600, color: liked ? "#e63946" : "#6b7280", borderRight: "1px solid #f3f4f6" }}>
          <svg width="16" height="16" fill={liked ? "#e63946" : "none"} stroke={liked ? "#e63946" : "#6b7280"} strokeWidth="2" viewBox="0 0 24 24" style={{ transform: likeAnim ? "scale(1.4)" : "scale(1)", transition: "transform .15s" }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {liked ? "Beğenildi" : "Beğen"}
        </button>
        <button onClick={() => setShowComments(!showComments)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", border: "none", background: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 600, color: "#6b7280", borderRight: "1px solid #f3f4f6" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Yorum
        </button>
        <button onClick={doShare} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", border: "none", background: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 600, color: shared ? "#16a34a" : "#6b7280", borderRight: "1px solid #f3f4f6" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          {shared ? "Paylaşıldı!" : "Paylaş"}
        </button>
        <button onClick={() => bookmarkPost(post.id)} style={{ padding: "10px 16px", border: "none", background: "none", cursor: "pointer", color: bookmarked ? "#1d3557" : "#9ca3af" }}>
          <svg width="16" height="16" fill={bookmarked ? "#1d3557" : "none"} stroke={bookmarked ? "#1d3557" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
        </button>
      </div>
      {/* Comments */}
      {showComments && (
        <div style={{ borderTop: "1px solid #f3f4f6", padding: "12px 16px", background: "#fafafa" }}>
          {post.comments.map(c => {
            const ca = getUserById(c.authorId);
            const cl = c.likes.includes("me");
            return (
              <div key={c.id} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <Avatar name={ca?.name || "?"} size={28} color={ca?.avatarColor} />
                <div style={{ flex: 1, background: "#fff", borderRadius: 12, padding: "7px 12px", fontSize: 13, color: "#1c1e21", border: "1px solid #eef0f2", lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, marginRight: 6 }}>{ca?.name}</span>{c.text}
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <button onClick={() => likeComment(post.id, c.id)} style={{ fontSize: 11, color: cl ? "#e63946" : "#9ca3af", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }}>❤️ {c.likes.length > 0 ? c.likes.length : ""}</button>
                    <span style={{ fontSize: 10, color: "#d1d5db" }}>{timeAgo(c.createdAt)}</span>
                    {c.authorId === "me" && <button onClick={() => deleteComment(post.id, c.id)} style={{ fontSize: 10, color: "#e63946", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Sil</button>}
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
            <Avatar name={currentUser.name} size={28} color={currentUser.avatarColor} />
            <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === "Enter" && submitComment()} placeholder="Yorum yaz..." style={{ flex: 1, border: "1.5px solid #e5e7eb", borderRadius: 20, padding: "7px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", background: "#fff", color: "#1c1e21" }}/>
            <button onClick={submitComment} disabled={!commentText.trim()} style={{ background: "#e63946", color: "#fff", border: "none", borderRadius: 20, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: commentText.trim() ? 1 : 0.4, whiteSpace: "nowrap" }}>Gönder</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && (
        <div onClick={() => setEditOpen(false)} style={{ position:"fixed", inset:0, zIndex:300, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:20, padding:24, width:400, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontWeight:800, fontSize:16, margin:"0 0 14px" }}>✏️ Gönderiyi Düzenle</h3>
            <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={4}
              style={{ width:"100%", padding:"10px 14px", borderRadius:12, border:"1.5px solid #e5e7eb", outline:"none", fontSize:14, fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" as const, lineHeight:1.6 }}/>
            <p style={{ fontSize:11, color:editText.length>500?"#e63946":"#9ca3af", textAlign:"right", margin:"4px 0 14px" }}>{editText.length}/500</p>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setEditOpen(false)} style={{ flex:1, padding:"10px 0", borderRadius:12, border:"1px solid #e5e7eb", background:"#f9fafb", fontWeight:700, fontSize:13, cursor:"pointer" }}>İptal</button>
              <button onClick={saveEdit} disabled={!editText.trim() || editText.length>500}
                style={{ flex:1, padding:"10px 0", borderRadius:12, border:"none", background:"#e63946", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", opacity:editText.trim()&&editText.length<=500?1:0.4 }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
