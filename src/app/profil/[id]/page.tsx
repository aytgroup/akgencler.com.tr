"use client";
import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/store/useStore";
import FollowersModal from "@/components/FollowersModal";
import { showToast } from "@/components/Toast";
import Avatar from "@/components/Avatar";
import PostCard from "@/components/PostCard";

const TABS = ["Gönderiler", "Beğeniler", "Kaydettiklerim", "Etiketlenenler"];

export default function ProfilPage() {
  const { id } = useParams<{ id: string }>();
  const { users, currentUser, posts, followUser, unfollowUser, updateProfile, stories } = useStore();
  const [tab, setTab] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLoc, setEditLoc] = useState("");
  const [editWeb, setEditWeb] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editBirth, setEditBirth] = useState("");
  const [followModal, setFollowModal] = useState<"followers" | "following" | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const profileId = id === "me" ? "me" : id;
  const isMe = profileId === "me" || profileId === currentUser.id;
  const user = isMe ? currentUser : users.find((u) => u.id === profileId);

  if (!user) return (
    <PageLayout>
      <div style={{ background: "#fff", borderRadius: 18, padding: "48px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 36, margin: "0 0 12px" }}>🔍</p>
        <p style={{ fontWeight: 700, color: "#374151" }}>Kullanıcı bulunamadı</p>
      </div>
    </PageLayout>
  );

  const isFollowing = currentUser.following.includes(user.id);
  const userPosts = posts.filter((p) => p.authorId === user.id);
  const likedPosts = posts.filter((p) => p.likes.includes(user.id));
  const savedPosts = posts.filter((p) => p.bookmarks.includes(user.id));
  const displayed = tab === 0 ? userPosts : tab === 1 ? likedPosts : tab === 2 ? savedPosts : [];
  const profileUrl = `https://akgencler.com.tr/profil/${user.id}`;

  function openEdit() {
    setEditName(currentUser.name); setEditUsername(currentUser.username);
    setEditBio(currentUser.bio); setEditLoc(currentUser.location); setEditWeb(currentUser.website);
    setEditOpen(true);
  }

  function saveEdit() {
    updateProfile({ name: editName, bio: editBio, location: editLoc, website: editWeb });
    setEditOpen(false); showToast("Profil güncellendi ✅");
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setCoverPhoto(ev.target?.result as string); showToast("Kapak fotoğrafı güncellendi ✅"); };
    reader.readAsDataURL(file);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setProfilePhoto(ev.target?.result as string); showToast("Profil fotoğrafı güncellendi ✅"); };
    reader.readAsDataURL(file);
  }

  function copyLink() { navigator.clipboard.writeText(profileUrl); showToast("Link kopyalandı 🔗"); setShareOpen(false); }

  return (
    <PageLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

        <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #eef0f2", overflow: "hidden", marginBottom: 12 }}>
          <div style={{ position: "relative", height: 200, background: coverPhoto ? "transparent" : `linear-gradient(135deg,${user.avatarColor[0]},${user.avatarColor[1]})`, overflow: "hidden" }}>
            {coverPhoto && <img src={coverPhoto} alt="kapak" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            {isMe && (
              <div style={{ position: "absolute", bottom: 12, right: 12, display: "flex", gap: 8 }}>
                <button onClick={() => coverInputRef.current?.click()} style={{ padding: "7px 14px", borderRadius: 20, border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>📷 Kapak Ekle</button>
                {coverPhoto && <button onClick={() => { setCoverPhoto(null); showToast("Kapak kaldırıldı"); }} style={{ padding: "7px 14px", borderRadius: 20, border: "none", background: "rgba(230,57,70,0.85)", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>🗑️ Kaldır</button>}
              </div>
            )}
            <input ref={coverInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleCoverChange} />
          </div>

          <div style={{ padding: "0 20px 20px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: -44, marginBottom: 16 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 88, height: 88, borderRadius: "50%", border: "4px solid #fff", overflow: "hidden", background: "#eee", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
                  {profilePhoto ? <img src={profilePhoto} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Avatar name={user.name} size={88} color={user.avatarColor} />}
                </div>
                {isMe && <button onClick={() => avatarInputRef.current?.click()} style={{ position: "absolute", bottom: 2, right: 2, width: 28, height: 28, borderRadius: "50%", border: "2px solid #fff", background: "#1a1a1a", color: "#fff", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>📷</button>}
                {isMe && profilePhoto && <button onClick={() => { setProfilePhoto(null); showToast("Fotoğraf kaldırıldı"); }} style={{ position: "absolute", top: 0, right: 0, width: 22, height: 22, borderRadius: "50%", border: "2px solid #fff", background: "#e63946", color: "#fff", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>}
                <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                {isMe ? (
                  <>
                    <button onClick={openEdit} style={{ padding: "9px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>✏️ Profili Düzenle</button>
                    <button onClick={() => setShareOpen(true)} style={{ padding: "9px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>🔗 Paylaş</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => isFollowing ? unfollowUser(user.id) : followUser(user.id)} style={{ padding: "9px 20px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", background: isFollowing ? "#f3f4f6" : "#e63946", color: isFollowing ? "#374151" : "#fff" }}>{isFollowing ? "Takipten Çık" : "+ Takip Et"}</button>
                    <button style={{ padding: "9px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>💬 Mesaj</button>
                    <button onClick={() => setShareOpen(true)} style={{ padding: "9px 14px", borderRadius: 20, fontSize: 16, fontWeight: 700, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>⋯</button>
                  </>
                )}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <h2 style={{ fontWeight: 800, fontSize: 20, margin: 0, color: "#111827" }}>{user.name}</h2>
                {user.verified && <span title="Doğrulanmış" style={{ fontSize: 16 }}>✅</span>}
              </div>
              <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 8px" }}>@{user.username}</p>
              {user.bio && <p style={{ fontSize: 14, color: "#374151", margin: "0 0 10px", lineHeight: 1.55 }}>{user.bio}</p>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 13, color: "#6b7280", marginBottom: 14 }}>
                {user.location && <span>📍 {user.location}</span>}
                {user.website && <a href={user.website.startsWith("http") ? user.website : `https://${user.website}`} target="_blank" rel="noopener noreferrer" style={{ color: "#e63946", textDecoration: "none", fontWeight: 600 }}>🔗 {user.website}</a>}
                <span>📅 {new Date(user.joinedAt).toLocaleDateString("tr-TR", { month: "long", year: "numeric" })} katıldı</span>
              </div>
              <div style={{ display: "flex", gap: 28 }}>
                <div style={{ textAlign: "center" }}><p style={{ fontWeight: 800, fontSize: 17, color: "#111827", margin: 0 }}>{userPosts.length}</p><p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Gönderi</p></div>
                <div onClick={() => setFollowModal("followers")} style={{ textAlign: "center", cursor: "pointer" }}><p style={{ fontWeight: 800, fontSize: 17, color: "#111827", margin: 0 }}>{user.followers.length}</p><p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Takipçi</p></div>
                <div onClick={() => setFollowModal("following")} style={{ textAlign: "center", cursor: "pointer" }}><p style={{ fontWeight: 800, fontSize: 17, color: "#111827", margin: 0 }}>{user.following.length}</p><p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Takip</p></div>
              </div>
            </div>
          </div>
        </div>

        {isMe && stories.filter(s => s.authorId === "me").length > 0 && (
          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #eef0f2", padding: "16px 20px", marginBottom: 12 }}>
            <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 12px", color: "#374151" }}>Hikayelerim</p>
            <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
              {stories.filter(s => s.authorId === "me").map(story => (
                <div key={story.id} style={{ flexShrink: 0, textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${story.gradient[0]},${story.gradient[1]})`, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #e63946", cursor: "pointer" }}>
                    <span style={{ fontSize: 24 }}>📖</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#6b7280", margin: "4px 0 0", width: 64, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Hikaye</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #eef0f2", overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #eef0f2" }}>
            {TABS.map((t, i) => (
              <button key={t} onClick={() => setTab(i)} style={{ flex: 1, padding: "14px 0", fontSize: 13, fontWeight: tab === i ? 700 : 500, border: "none", cursor: "pointer", background: "transparent", color: tab === i ? "#e63946" : "#6b7280", borderBottom: tab === i ? "2px solid #e63946" : "2px solid transparent", transition: "all 0.2s" }}>
                {t}{i === 0 && userPosts.length > 0 && <span style={{ marginLeft: 4, fontSize: 11, background: "#f3f4f6", borderRadius: 10, padding: "1px 6px" }}>{userPosts.length}</span>}
              </button>
            ))}
          </div>

          {tab === 0 && (
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 16px", borderBottom: "1px solid #f3f4f6", gap: 4 }}>
              <button onClick={() => setViewMode("grid")} style={{ padding: "6px 12px", borderRadius: 10, border: "none", background: viewMode === "grid" ? "#fff1f2" : "transparent", color: viewMode === "grid" ? "#e63946" : "#9ca3af", cursor: "pointer", fontSize: 18 }}>⋮⋮</button>
              <button onClick={() => setViewMode("list")} style={{ padding: "6px 12px", borderRadius: 10, border: "none", background: viewMode === "list" ? "#fff1f2" : "transparent", color: viewMode === "list" ? "#e63946" : "#9ca3af", cursor: "pointer", fontSize: 18 }}>☰</button>
            </div>
          )}

          <div style={{ padding: tab === 0 && viewMode === "grid" ? 2 : 12 }}>
            {displayed.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center" }}><p style={{ fontSize: 40, margin: "0 0 12px" }}>📭</p><p style={{ fontSize: 14, color: "#9ca3af", margin: 0 }}>Henüz içerik yok.</p></div>
            ) : tab === 0 && viewMode === "grid" ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                {displayed.map(post => (
                  <div key={post.id} style={{ position: "relative", paddingBottom: "100%", overflow: "hidden", cursor: "pointer", background: "#f3f4f6" }}>
                    {post.imageUrl
                      ? <img src={post.imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 8, background: `linear-gradient(135deg,${user.avatarColor[0]}22,${user.avatarColor[1]}33)` }}><p style={{ fontSize: 11, color: "#374151", textAlign: "center", margin: 0, lineHeight: 1.4 }}>{post.content.substring(0, 80)}</p></div>}
                    <div style={{ position: "absolute", inset: 0, opacity: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, color: "#fff", fontSize: 13, fontWeight: 700, transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = "1"} onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = "0"}>
                      <span>❤️ {post.likes.length}</span><span>💬 {post.comments.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {displayed.map(post => <PostCard key={post.id} post={post} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {followModal && <FollowersModal title={followModal === "followers" ? `Takipçiler (${user.followers.length})` : `Takip Edilenler (${user.following.length})`} userIds={followModal === "followers" ? user.followers : user.following} onClose={() => setFollowModal(null)} />}

      {shareOpen && (
        <div onClick={() => setShareOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, padding: 28, width: 340, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Profili Paylaş</h3>
              <button onClick={() => setShareOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>✕</button>
            </div>
            <div style={{ background: "#f9fafb", borderRadius: 12, padding: "12px 16px", marginBottom: 16, wordBreak: "break-all", fontSize: 13, color: "#374151" }}>{profileUrl}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={copyLink} style={{ padding: "12px 0", borderRadius: 12, border: "none", background: "#e63946", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🔗 Linki Kopyala</button>
              <button onClick={() => { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(user.name + " - AkGençler")}`, "_blank"); setShareOpen(false); }} style={{ padding: "12px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🐦 Twitter'da Paylaş</button>
              <button onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(user.name + " - AkGençler: " + profileUrl)}`, "_blank"); setShareOpen(false); }} style={{ padding: "12px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>💬 WhatsApp'ta Paylaş</button>
            </div>
          </div>
        </div>
      )}

      {editOpen && (
        <div onClick={() => setEditOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, padding: 28, width: 420, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Profili Düzenle</h3>
              <button onClick={() => setEditOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ position: "relative", marginBottom: 10 }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", overflow: "hidden", border: "3px solid #e5e7eb" }}>
                  {profilePhoto ? <img src={profilePhoto} alt="av" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Avatar name={currentUser.name} size={96} color={currentUser.avatarColor} />}
                </div>
                <button onClick={() => avatarInputRef.current?.click()} style={{ position: "absolute", bottom: 0, right: 0, width: 30, height: 30, borderRadius: "50%", border: "2px solid #fff", background: "#e63946", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>📷</button>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => avatarInputRef.current?.click()} style={{ background: "none", border: "none", color: "#e63946", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Fotoğrafı Değiştir</button>
                {profilePhoto && <button onClick={() => { setProfilePhoto(null); showToast("Fotoğraf kaldırıldı"); }} style={{ background: "none", border: "none", color: "#9ca3af", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Kaldır</button>}
              </div>
            </div>
            {([
              ["İsim", editName, setEditName, "text", "Adınızı girin"],
              ["Kullanıcı Adı", editUsername, setEditUsername, "text", "@kullaniciadi"],
              ["Website", editWeb, setEditWeb, "url", "https://"],
              ["Konum", editLoc, setEditLoc, "text", "Şehir, Ülke"],
            ] as [string, string, (v: string) => void, string, string][]).map(([lbl, val, setter, type, ph]) => (
              <div key={lbl} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>{lbl}</label>
                <input value={val} onChange={e => setter(e.target.value)} type={type} placeholder={ph}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", outline: "none", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" as const }}
                  onFocus={e => e.target.style.borderColor = "#e63946"} onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Bio</label>
              <textarea value={editBio} onChange={e => setEditBio(e.target.value)} maxLength={150} rows={3} placeholder="Kendinizi tanıtın..."
                style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", outline: "none", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" as const, resize: "none" }}
                onFocus={e => e.target.style.borderColor = "#e63946"} onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
              <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "right", margin: "4px 0 0" }}>{editBio.length}/150</p>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Cinsiyet</label>
              <select value={editGender} onChange={e => setEditGender(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", outline: "none", fontSize: 14, fontFamily: "inherit", background: "#fff", boxSizing: "border-box" as const }}>
                <option value="">Seçiniz</option>
                <option value="erkek">Erkek</option>
                <option value="kadin">Kadın</option>
                <option value="belirtmek-istemiyorum">Belirtmek İstemiyorum</option>
              </select>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Doğum Tarihi</label>
              <input type="date" value={editBirth} onChange={e => setEditBirth(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", outline: "none", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" as const }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditOpen(false)} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "1px solid #e5e7eb", background: "#f9fafb", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>İptal</button>
              <button onClick={saveEdit} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "none", background: "#e63946", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
