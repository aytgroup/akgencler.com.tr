"use client";
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/store/useStore";
import { showToast } from "@/components/Toast";

const COMMS = [
  { id:1, emoji:"💡", name:"Genç Girişimciler",    desc:"Startup ekosistemi ve girişimcilik",          members:2840, posts:156, color:["#e63946","#c1121f"], joined:true  },
  { id:2, emoji:"🔬", name:"Bilim & Araştırma",    desc:"Bilimsel projeler ve araştırmalar",           members:1920, posts:89,  color:["#1d3557","#457b9d"], joined:false },
  { id:3, emoji:"🤖", name:"Yapay Zeka Türkiye",   desc:"YZ, ML ve veri bilimi tartışmaları",          members:3150, posts:234, color:["#2d6a4f","#40916c"], joined:true  },
  { id:4, emoji:"📚", name:"Genç Liderler",        desc:"Liderlik becerileri ve mentörlük",            members:1450, posts:67,  color:["#e76f51","#f4a261"], joined:false },
  { id:5, emoji:"🌱", name:"Sürdürülebilir Gelecek",desc:"Çevre ve sürdürülebilir yaşam",              members:980,  posts:45,  color:["#059669","#10b981"], joined:false },
  { id:6, emoji:"🎨", name:"Yaratıcı Genç Sanatçılar",desc:"Sanat, müzik, tasarım paylaşımları",       members:2100, posts:312, color:["#7c3aed","#a855f7"], joined:true  },
];

export default function TopluluklarPage() {
  const { joinedCommunities, toggleCommunity } = useStore();
  const [active, setActive] = useState("Tümü");
  const tabs = ["Tümü","Katıldıklarım","Önerilen"];

  function toggle(id: number) {
    const isJoined = joinedCommunities.includes(id);
    toggleCommunity(id);
    showToast(isJoined ? "Topluluktan ayrıldın" : "Topluluğa katıldın! 🎉");
  }

  const list = active === "Katıldıklarım" ? COMMS.filter(c => joinedCommunities.includes(c.id)) : COMMS;

  return (
    <PageLayout>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ background:"#fff", borderRadius:18, border:"1px solid #eef0f2", padding:"16px 20px" }}>
          <h1 style={{ fontWeight:800, fontSize:18, color:"#111827", margin:"0 0 4px" }}>👥 Topluluklar</h1>
          <p style={{ fontSize:13, color:"#9ca3af", margin:"0 0 14px" }}>Seni bekleyen {COMMS.length} topluluk</p>
          <div style={{ display:"flex", gap:4, background:"#f3f4f6", borderRadius:14, padding:4 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActive(t)}
                style={{ flex:1, padding:"8px 0", borderRadius:10, fontSize:12, fontWeight:600, border:"none", cursor:"pointer", background:active===t?"#fff":"transparent", color:active===t?"#e63946":"#6b7280", boxShadow:active===t?"0 1px 4px rgba(0,0,0,0.1)":"none" }}>
                {t} {t==="Katıldıklarım" ? `(${joinedCommunities.length})` : ""}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {list.map((c, i) => {
            const isJoined = joinedCommunities.includes(c.id);
            return (
              <div key={c.id} style={{ background:"#fff", borderRadius:18, border:"1px solid #eef0f2", boxShadow:"0 1px 6px rgba(0,0,0,0.05)", overflow:"hidden", animation:`fadeIn .3s ease ${i*0.06}s both` }}>
                <div style={{ height:64, background:`linear-gradient(135deg,${c.color[0]},${c.color[1]})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:28 }}>{c.emoji}</span>
                </div>
                <div style={{ padding:"12px 14px" }}>
                  <h3 style={{ fontWeight:700, fontSize:13.5, color:"#111827", margin:"0 0 4px", lineHeight:1.3 }}>{c.name}</h3>
                  <p style={{ fontSize:11.5, color:"#6b7280", margin:"0 0 10px", lineHeight:1.4 }}>{c.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                    <span style={{ fontSize:11, color:"#9ca3af" }}>👥 {c.members.toLocaleString()}</span>
                    <span style={{ fontSize:11, color:"#9ca3af" }}>📝 {c.posts}</span>
                  </div>
                  <button onClick={() => toggle(c.id)}
                    style={{ width:"100%", padding:"8px 0", borderRadius:12, fontSize:12, fontWeight:700, border:isJoined?"1px solid #e5e7eb":"none", background:isJoined?"#f3f4f6":c.color[0], color:isJoined?"#6b7280":"#fff", cursor:"pointer" }}>
                    {isJoined ? "✓ Katıldın" : "Katıl"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {list.length === 0 && (
          <div style={{ background:"#fff", borderRadius:18, border:"1px solid #eef0f2", padding:"48px 24px", textAlign:"center" }}>
            <p style={{ fontSize:36, margin:"0 0 12px" }}>👥</p>
            <p style={{ fontWeight:700, color:"#374151", margin:"0 0 6px" }}>Henüz bir topluluğa katılmadın</p>
            <p style={{ fontSize:13, color:"#9ca3af", margin:0 }}>Yukarıdan bir topluluğa katıl!</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}