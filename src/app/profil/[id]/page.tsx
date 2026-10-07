"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/store/useStore";
import FollowersModal from "@/components/FollowersModal";
import { showToast } from "@/components/Toast";
import Avatar from "@/components/Avatar";
import PostCard from "@/components/PostCard";

const TABS = ["Gönderiler","Beğeniler","Kaydettiklerim"];

export default function ProfilPage() {
  const { id } = useParams<{ id: string }>();
  const { users, currentUser, posts, followUser, unfollowUser, updateProfile, stories } = useStore();
  const [tab, setTab] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLoc, setEditLoc] = useState("");
  const [editWeb, setEditWeb] = useState("");
  const [followModal, setFollowModal] = useState<"followers"|"following"|null>(null);

  const profileId = id === "me" ? "me" : id;
  const isMe = profileId === "me" || profileId === currentUser.id;
  const user = isMe ? currentUser : users.find(u => u.id === profileId);

  if (!user) return (
    <PageLayout>
      <div style={{ background:"#fff", borderRadius:18, padding:"48px 24px", textAlign:"center" }}>
        <p style={{ fontSize:36, margin:"0 0 12px" }}>🔍</p>
        <p style={{ fontWeight:700, color:"#374151" }}>Kullanıcı bulunamadı</p>
      </div>
    </PageLayout>
  );

  const isFollowing = currentUser.following.includes(user.id);
  const userPosts = posts.filter(p => p.authorId === user.id);
  const likedPosts = posts.filter(p => p.likes.includes(user.id));
  const savedPosts = posts.filter(p => p.bookmarks.includes(user.id));
  const userStories = stories.filter(s => s.authorId === user.id);
  const displayed = tab === 0 ? userPosts : tab === 1 ? likedPosts : savedPosts;

  function openEdit() {
    setEditName(currentUser.name); setEditBio(currentUser.bio);
    setEditLoc(currentUser.location); setEditWeb(currentUser.website);
    setEditOpen(true);
  }
  function saveEdit() { updateProfile({ name:editName, bio:editBio, location:editLoc, website:editWeb }); setEditOpen(false); showToast("Profil güncellendi ✅"); }

  return (
    <PageLayout>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {/* Profile card */}
        <div style={{ background:"#fff", borderRadius:18, border:"1px solid #eef0f2", overflow:"hidden" }}>
          <div style={{ height:110, background:`linear-gradient(135deg,${user.avatarColor[0]},${user.avatarColor[1]})` }}/>
          <div style={{ padding:"0 20px 20px" }}>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginTop:-34, marginBottom:12 }}>
              <div style={{ width:72, height:72, borderRadius:"50%", border:"4px solid #fff", overflow:"hidden", flexShrink:0 }}>
                <Avatar name={user.name} size={72} color={user.avatarColor} />
              </div>
              {isMe ? (
                <button onClick={openEdit} style={{ padding:"9px 18px", borderRadius:20, fontSize:13, fontWeight:700, border:"1.5px solid #e5e7eb", background:"#fff", color:"#374151", cursor:"pointer" }}>✏️ Düzenle</button>
              ) : (
                <button onClick={() => isFollowing ? unfollowUser(user.id) : followUser(user.id)}
                  style={{ padding:"9px 20px", borderRadius:20, fontSize:13, fontWeight:700, border:"none", cursor:"pointer", background:isFollowing?"#f3f4f6":"#e63946", color:isFollowing?"#374151":"#fff" }}>
                  {isFollowing ? "Takipten Çık" : "+ Takip Et"}
                </button>
              )}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <h1 style={{ fontWeight:800, fontSize:18, color:"#111827", margin:0 }}>{user.name}</h1>
              {user.verified && <span style={{ width:18, height:18, background:"#e63946", borderRadius:"50%", display:"inline-flex", alignItems:"center", justifyContent:"center" }}><svg width="8" height="8" fill="white" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>}
            </div>
            <p style={{ fontSize:13, color:"#6b7280", margin:"0 0 8px" }}>@{user.username}</p>
            {user.bio && <p style={{ fontSize:13.5, color:"#374151", margin:"0 0 10px", lineHeight:1.6 }}>{user.bio}</p>}
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:14 }}>
              {user.location && <span style={{ fontSize:12, color:"#6b7280" }}>📍 {user.location}</span>}
              {user.website && <span style={{ fontSize:12, color:"#e63946" }}>🔗 {user.website}</span>}
            </div>
            <div style={{ display:"flex", gap:20 }}>
              <div style={{ textAlign:"center" }}>
                <p style={{ fontWeight:800, fontSize:16, color:"#111827", margin:0 }}>{userPosts.length}</p>
                <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Gönderi</p>
              </div>
              <div onClick={() => setFollowModal("followers")} style={{ textAlign:"center", cursor:"pointer" }}>
                <p style={{ fontWeight:800, fontSize:16, color:"#111827", margin:0 }}>{user.followers.length}</p>
                <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Takipçi</p>
              </div>
              <div onClick={() => setFollowModal("following")} style={{ textAlign:"center", cursor:"pointer" }}>
                <p style={{ fontWeight:800, fontSize:16, color:"#111827", margin:0 }}>{user.following.length}</p>
                <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Takip</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background:"#fff", borderRadius:18, border:"1px solid #eef0f2", padding:"6px 8px", display:"flex", gap:4 }}>
          {TABS.map((t,i)=>(
            <button key={t} onClick={()=>setTab(i)} style={{ flex:1, padding:"10px 0", borderRadius:14, fontSize:13, fontWeight:tab===i?700:500, border:"none", cursor:"pointer", background:tab===i?"#fff1f2":"transparent", color:tab===i?"#e63946":"#6b7280" }}>{t}</button>
          ))}
        </div>

        {displayed.length===0 && <div style={{ background:"#fff", borderRadius:18, border:"1px solid #eef0f2", padding:"36px 24px", textAlign:"center" }}><p style={{ fontSize:13, color:"#9ca3af" }}>Henüz içerik yok.</p></div>}
        {displayed.map(p => <PostCard key={p.id} post={p} />)}
      </div>

      {followModal && (
        <FollowersModal
          title={followModal === "followers" ? `Takipçiler (${user.followers.length})` : `Takip Edilenler (${user.following.length})`}
          userIds={followModal === "followers" ? user.followers : user.following}
          onClose={() => setFollowModal(null)}
        />
      )}

      {editOpen && (
        <div onClick={() => setEditOpen(false)} style={{ position:"fixed", inset:0, zIndex:300, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:24, padding:28, width:380, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontWeight:800, fontSize:18, margin:"0 0 18px" }}>Profili Düzenle</h3>
            {([["İsim",editName,setEditName],["Bio",editBio,setEditBio],["Konum",editLoc,setEditLoc],["Website",editWeb,setEditWeb]] as [string,string,(v:string)=>void][]).map(([lbl,val,setter])=>(
              <div key={lbl} style={{ marginBottom:12 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:4 }}>{lbl}</label>
                <input value={val} onChange={e=>setter(e.target.value)} style={{ width:"100%", padding:"9px 14px", borderRadius:12, border:"1.5px solid #e5e7eb", outline:"none", fontSize:13, fontFamily:"inherit", boxSizing:"border-box" as const }}/>
              </div>
            ))}
            <div style={{ display:"flex", gap:10, marginTop:18 }}>
              <button onClick={() => setEditOpen(false)} style={{ flex:1, padding:"10px 0", borderRadius:12, border:"1px solid #e5e7eb", background:"#f9fafb", fontWeight:700, fontSize:13, cursor:"pointer" }}>İptal</button>
              <button onClick={saveEdit} style={{ flex:1, padding:"10px 0", borderRadius:12, border:"none", background:"#e63946", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
