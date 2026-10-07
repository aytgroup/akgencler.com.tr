"use client";
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/store/useStore";
import Avatar from "@/components/Avatar";
import Link from "next/link";

const CATS = ["Tümü","Teknoloji","Eğitim","Girişim","Sanat","Spor"];
const HT = [
  { tag:"#AkGençler",posts:"12.4K",g:"+24%",c0:"#e63946",c1:"#c1121f"},
  { tag:"#Gençlik",  posts:"8.9K", g:"+18%",c0:"#1d3557",c1:"#457b9d"},
  { tag:"#Fikirler", posts:"6.2K", g:"+31%",c0:"#2d6a4f",c1:"#40916c"},
  { tag:"#Startup",  posts:"5.7K", g:"+12%",c0:"#e76f51",c1:"#f4a261"},
];

export default function KesfetPage() {
  const { users, currentUser, followUser, unfollowUser, posts, searchQuery, setSearchQuery } = useStore();
  const [cat, setCat] = useState(0);
  const [search, setSearch] = useState(searchQuery || "");
  const CAT_TAGS: Record<string,string> = { "Teknoloji":"teknoloji", "Eğitim":"eğitim", "Girişim":"startup", "Sanat":"sanat", "Spor":"spor" };
  const trend = [...posts].sort((a,b)=>b.likes.length-a.likes.length);
  const catTag = cat > 0 ? CAT_TAGS[CATS[cat]] : null;
  const sq = search.toLowerCase().replace("#","");

  // Hem kategori hem de arama sorgusuna göre filtrele
  const filteredPosts = trend.filter(p => {
    const matchCat = catTag ? (p.content.toLowerCase().includes(catTag) || p.tags.some(t => t.toLowerCase().includes(catTag))) : true;
    const matchSearch = sq ? (p.content.toLowerCase().includes(sq) || p.tags.some(t => t.toLowerCase().includes(sq))) : true;
    return matchCat && matchSearch;
  }).slice(0, 5);

  const people = users.filter(u=>u.id!=="me"&&(search===""||u.name.toLowerCase().includes(sq)||u.username.toLowerCase().includes(sq)));
  const s: React.CSSProperties = {background:"#fff",borderRadius:18,border:"1px solid #eef0f2",padding:16,boxShadow:"0 1px 6px rgba(0,0,0,0.06)"};

  return (
    <PageLayout>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>

        <div style={s}>
          <h1 style={{fontWeight:800,fontSize:18,color:"#111827",margin:"0 0 12px"}}>🔍 Keşfet</h1>
          <div style={{position:"relative",marginBottom:12}}>
            <svg style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}} width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input placeholder="Kişi, hashtag veya konu ara..." value={search} onChange={e=>{setSearch(e.target.value);setSearchQuery(e.target.value);}} style={{width:"100%",paddingLeft:36,paddingRight:search?36:14,paddingTop:10,paddingBottom:10,borderRadius:14,background:"#f3f4f6",border:"none",outline:"none",fontSize:13,boxSizing:"border-box" as const}}/>
            {search && <button onClick={()=>{setSearch(""); setSearchQuery("");}} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"#9ca3af",border:"none",borderRadius:"50%",width:18,height:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
              <svg width="8" height="8" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>}
          </div>
          <div style={{display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none" as const}}>
            {CATS.map((c,i)=><button key={c} onClick={()=>setCat(i)} style={{flexShrink:0,padding:"7px 14px",borderRadius:20,fontSize:12,fontWeight:600,border:"none",cursor:"pointer",background:cat===i?"#e63946":"#f3f4f6",color:cat===i?"#fff":"#6b7280"}}>{c}</button>)}
          </div>
        </div>

        <div style={s}>
          <h2 style={{fontWeight:700,fontSize:14,color:"#111827",margin:"0 0 12px"}}>🔥 Trend Hashtagler</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {HT.map((h,i)=>(
              <div key={i} style={{borderRadius:14,padding:"12px 14px",background:`linear-gradient(135deg,${h.c0},${h.c1})`,cursor:"pointer"}}>
                <p style={{fontWeight:800,fontSize:13,color:"#fff",margin:"0 0 3px"}}>{h.tag}</p>
                <p style={{fontSize:10,color:"rgba(255,255,255,0.8)",margin:"0 0 2px"}}>{h.posts} gönderi</p>
                <span style={{fontSize:10,color:"#4ade80",fontWeight:700}}>↑ {h.g}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={s}>
          <h2 style={{fontWeight:700,fontSize:14,color:"#111827",margin:"0 0 12px"}}>
            {sq ? `🔍 "${search}" için sonuçlar (${filteredPosts.length})` : "⚡ Popüler Gönderiler"}
          </h2>
          {filteredPosts.length === 0 && <p style={{fontSize:13,color:"#9ca3af",textAlign:"center",padding:"16px 0"}}>Bu kategoride gönderi bulunamadı.</p>}
          {filteredPosts.map((p,i)=>{
            const a=users.find(u=>u.id===p.authorId);
            if(!a)return null;
            return(
              <div key={p.id} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<trend.length-1?"1px solid #f9fafb":"none"}}>
                <span style={{fontSize:15,color:"#e63946",fontWeight:800,minWidth:22}}>#{i+1}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <Avatar name={a.name} size={22} color={a.avatarColor}/>
                    <span style={{fontSize:12,fontWeight:700,color:"#111827"}}>{a.name}</span>
                  </div>
                  <p style={{fontSize:12,color:"#374151",margin:"0 0 4px",lineHeight:1.5}}>{p.content.slice(0,75)}{p.content.length>75?"…":""}</p>
                  <span style={{fontSize:10,color:"#9ca3af"}}>❤️ {p.likes.length} · 💬 {p.comments.length}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={s}>
          <h2 style={{fontWeight:700,fontSize:14,color:"#111827",margin:"0 0 12px"}}>⭐ Kişiler</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {people.map(u=>{
              const isF=currentUser.following.includes(u.id);
              return(
                <div key={u.id} style={{border:"1px solid #f0f0f0",borderRadius:14,padding:12,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                  <Link href={`/profil/${u.id}`} style={{textDecoration:"none"}}><Avatar name={u.name} size={44} color={u.avatarColor}/></Link>
                  <p style={{fontWeight:700,fontSize:12,color:"#111827",margin:0,textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%"}}>{u.name}</p>
                  <p style={{fontSize:11,color:"#e63946",fontWeight:600,margin:0}}>{u.followers.length} takipçi</p>
                  <button onClick={()=>isF?unfollowUser(u.id):followUser(u.id)} style={{width:"100%",padding:"7px 0",borderRadius:20,fontSize:11,fontWeight:700,border:isF?"1px solid #e5e7eb":"none",background:isF?"#f3f4f6":"#e63946",color:isF?"#6b7280":"#fff",cursor:"pointer"}}>
                    {isF?"Takipte ✓":"+ Takip"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
