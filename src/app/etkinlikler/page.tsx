"use client";
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/store/useStore";
import { showToast } from "@/components/Toast";

const EVENTS = [
  { id:1, emoji:"🏆", title:"Gençlik Zirvesi 2026",      date:"15 Ekim 2026",  loc:"İstanbul",   cat:"Zirve",    attendees:234, color:"#e63946", bg:"#fff1f2", full:false },
  { id:2, emoji:"💡", title:"Startup Weekend Ankara",    date:"22 Ekim 2026",  loc:"Ankara",     cat:"Girişim",  attendees:156, color:"#1d3557", bg:"#f0f4ff", full:false },
  { id:3, emoji:"🔬", title:"TÜBİTAK Genç Buluşması",   date:"1 Kasım 2026",  loc:"Online",     cat:"Bilim",    attendees:512, color:"#2a9d8f", bg:"#f0faf9", full:false },
  { id:4, emoji:"🤖", title:"YZ & Teknoloji Konferansı", date:"8 Kasım 2026",  loc:"İzmir",      cat:"Teknoloji",attendees:389, color:"#457b9d", bg:"#eff6ff", full:true  },
  { id:5, emoji:"📚", title:"Genç Mentorlar Programı",   date:"15 Kasım 2026", loc:"Bursa",      cat:"Eğitim",   attendees:98,  color:"#7c3aed", bg:"#f5f3ff", full:false },
  { id:6, emoji:"🌍", title:"Sürdürülebilirlik Forumu",  date:"22 Kasım 2026", loc:"İstanbul",   cat:"Çevre",    attendees:201, color:"#059669", bg:"#ecfdf5", full:false },
];
const CATS = ["Tümü","Girişim","Bilim","Teknoloji","Eğitim","Çevre","Zirve"];

export default function EtkinliklerPage() {
  const { joinedEvents, toggleEvent } = useStore();
  const [cat, setCat] = useState("Tümü");
  const filtered = cat === "Tümü" ? EVENTS : EVENTS.filter(e => e.cat === cat);

  function toggle(id: number) {
    const isJoined = joinedEvents.includes(id);
    toggleEvent(id);
    showToast(isJoined ? "Etkinlikten ayrıldın" : "Etkinliğe katıldın 🎉");
  }

  return (
    <PageLayout>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ background:"#fff", borderRadius:18, border:"1px solid #eef0f2", padding:"16px 20px" }}>
          <h1 style={{ fontWeight:800, fontSize:18, color:"#111827", margin:"0 0 4px" }}>🎯 Etkinlikler</h1>
          <p style={{ fontSize:13, color:"#9ca3af", margin:"0 0 14px" }}>{EVENTS.length} yaklaşan etkinlik</p>
          <div style={{ display:"flex", gap:8, overflowX:"auto", scrollbarWidth:"none" as const }}>
            {CATS.map(c => <button key={c} onClick={() => setCat(c)} style={{ flexShrink:0, padding:"7px 14px", borderRadius:20, fontSize:12, fontWeight:600, border:"none", cursor:"pointer", background:cat===c?"#e63946":"#f3f4f6", color:cat===c?"#fff":"#6b7280" }}>{c}</button>)}
          </div>
        </div>

        {filtered.map((ev, i) => {
          const isJoined = joinedEvents.includes(ev.id);
          return (
            <div key={ev.id} style={{ background:"#fff", borderRadius:18, border:"1px solid #eef0f2", boxShadow:"0 1px 6px rgba(0,0,0,0.05)", overflow:"hidden", animation:`fadeIn .3s ease ${i*0.05}s both` }}>
              <div style={{ background:`linear-gradient(135deg,${ev.color},${ev.color}cc)`, padding:"20px 20px 16px", display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:14, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{ev.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <h2 style={{ fontWeight:800, fontSize:15, color:"#fff", margin:"0 0 6px", lineHeight:1.3 }}>{ev.title}</h2>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.9)" }}>📅 {ev.date}</span>
                    <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.9)" }}>📍 {ev.loc}</span>
                    <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.9)" }}>👥 {ev.attendees} katılımcı</span>
                  </div>
                </div>
                <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:20, flexShrink:0 }}>{ev.cat}</span>
              </div>
              <div style={{ padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {ev.full ? (
                    <span style={{ fontSize:12, color:"#ef4444", fontWeight:700, background:"#fef2f2", padding:"4px 12px", borderRadius:20 }}>❌ Dolu</span>
                  ) : (
                    <span style={{ fontSize:12, color:"#16a34a", fontWeight:700, background:"#f0fdf4", padding:"4px 12px", borderRadius:20 }}>✅ Kayıt Açık</span>
                  )}
                  <div style={{ display:"flex", marginLeft:4 }}>
                    {[...Array(Math.min(3,ev.attendees))].map((_,j) => (
                      <div key={j} style={{ width:20, height:20, borderRadius:"50%", background:`hsl(${j*60},60%,50%)`, border:"2px solid #fff", marginLeft:j?-6:0 }}/>
                    ))}
                    {ev.attendees > 3 && <div style={{ width:20, height:20, borderRadius:"50%", background:"#e5e7eb", border:"2px solid #fff", marginLeft:-6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:7, color:"#6b7280", fontWeight:700 }}>+{ev.attendees-3}</div>}
                  </div>
                </div>
                <button onClick={() => toggle(ev.id)} disabled={ev.full && !isJoined}
                  style={{ padding:"9px 20px", borderRadius:20, fontSize:12, fontWeight:700, border:"none", cursor:ev.full&&!isJoined?"not-allowed":"pointer", background:isJoined?"#f3f4f6":ev.full?"#f3f4f6":"#e63946", color:isJoined?"#6b7280":ev.full?"#9ca3af":"#fff" }}>
                  {isJoined ? "✓ Katılıyorum" : ev.full ? "Dolu" : "Katıl"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
