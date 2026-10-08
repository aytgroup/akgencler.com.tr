"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function GirisPage() {
  const { login } = useStore();
  const router = useRouter();
  const [tab, setTab] = useState<"giris"|"kayit">("giris");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [mounted, setMounted] = useState(false);
  const [sloganIdx, setSloganIdx] = useState(0);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const t = setInterval(() => setSloganIdx(i => (i + 1) % 3), 3500);
    return () => clearInterval(t);
  }, []);

  const SLOGANS = [
    { b1:"AHLAKTAN, İMANDAN", b2:"VE VİCDANDAN", it:"Sapmayacağız" },
    { b1:"GENÇLİK,", b2:"TÜRKİYE'NİN", it:"Geleceğidir" },
    { b1:"HAKTAN VE", b2:"DOĞRUDAN", it:"Ayrılmayacağız" },
  ];
  const STATS = [
    { num:"250K+", label:"Aktif Üye" },
    { num:"48", label:"Şehir" },
    { num:"1200+", label:"Etkinlik" },
    { num:"380+", label:"Topluluk" },
  ];

  function handleSubmit() {
    setErr("");
    if (tab === "kayit") {
      if (!name.trim()) return setErr("İsim boş olamaz.");
      if (!username.trim()) return setErr("Kullanıcı adı boş olamaz.");
      if (username.length < 3) return setErr("En az 3 karakter.");
      if (!/^[a-zA-Z0-9_]+$/.test(username)) return setErr("Sadece harf, rakam ve _ kullanabilirsin.");
    } else {
      if (!username.trim()) return setErr("Kullanıcı adı boş olamaz.");
    }
    setLoading(true);
    setTimeout(() => { login(name || username, username, bio); router.push("/"); }, 800);
  }

  const inp = { width:"100%", padding:"11px 14px", borderRadius:12, border:"1.5px solid #e5e7eb", outline:"none", fontSize:14, fontFamily:"inherit", boxSizing:"border-box" as const, color:"#111827", transition:"all .2s" };
  const s = SLOGANS[sloganIdx];

  return (
    <div style={{minHeight:"100vh",display:"flex",fontFamily:"inherit"}}>
      {/* SOL PANEL */}
      <div style={{flex:1,background:"linear-gradient(145deg,#1a237e 0%,#1565c0 40%,#1976d2 70%,#0d47a1 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 48px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,left:-80,width:320,height:320,borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-120,right:-60,width:400,height:400,borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28,alignSelf:"flex-start"}}>
          <div style={{width:52,height:34,borderRadius:10,overflow:"hidden",boxShadow:"0 4px 16px rgba(0,0,0,0.3)",flexShrink:0}}>
            <svg width="52" height="34" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
              <rect width="900" height="600" fill="#E30A17"/>
              <circle cx="300" cy="300" r="200" fill="white"/>
              <circle cx="360" cy="300" r="160" fill="#E30A17"/>
              <g transform="translate(530,300) rotate(-12)"><polygon fill="white" points="0,-80 18.6,-57.2 59.5,-24.7 30.4,21.9 37.3,65.2 0,40 -37.3,65.2 -30.4,21.9 -59.5,-24.7 -18.6,-57.2"/></g>
            </svg>
          </div>
          <div>
            <p style={{fontWeight:900,fontSize:20,color:"#fff",margin:0,letterSpacing:1}}>AKGENÇLER</p>
            <p style={{fontSize:10,color:"rgba(255,255,255,0.6)",margin:0}}>Türkiye&apos;nin Ak ve Âkil Gençlik Platformu</p>
          </div>
        </div>
        {/* BANNER */}
        <div style={{width:"100%",maxWidth:480,marginBottom:32,alignSelf:"flex-start"}}>
          <div className="hashtag-banner">
            <span className="hashtag-star">✶</span>
            <span className="hashtag-text">#akgençlergeliyor</span>
            <span className="hashtag-star">✶</span>
          </div>
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center",width:"100%",maxWidth:480}}>
          {mounted && (
            <div key={sloganIdx} style={{animation:"fadeSlide .6s ease both"}}>
              <h1 style={{fontWeight:900,fontSize:"clamp(30px,4vw,54px)",color:"#fff",margin:"0",lineHeight:1.1,letterSpacing:-1,textTransform:"uppercase"}}>{s.b1}</h1>
              <h1 style={{fontWeight:900,fontSize:"clamp(30px,4vw,54px)",color:"#fff",margin:"0 0 14px",lineHeight:1.1,letterSpacing:-1,textTransform:"uppercase"}}>{s.b2}</h1>
              <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"clamp(20px,2.8vw,36px)",color:"rgba(255,255,255,0.85)",margin:0,fontWeight:400}}>{s.it}</p>
            </div>
          )}
          <div style={{display:"flex",gap:8,marginTop:32}}>
            {SLOGANS.map((_,i)=>(<button key={i} onClick={()=>setSloganIdx(i)} style={{width:i===sloganIdx?24:8,height:8,borderRadius:4,background:i===sloganIdx?"#fff":"rgba(255,255,255,0.35)",border:"none",cursor:"pointer",padding:0,transition:"all .3s"}}/>))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,width:"100%",maxWidth:480,marginTop:48}}>
          {STATS.map((st,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.1)",backdropFilter:"blur(8px)",borderRadius:16,padding:"16px 20px",border:"1px solid rgba(255,255,255,0.15)"}}>
            <p style={{fontWeight:900,fontSize:26,color:"#fff",margin:"0 0 2px",letterSpacing:-0.5}}>{st.num}</p>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.65)",margin:0,fontWeight:500}}>{st.label}</p>
          </div>))}
        </div>
        <style>{`
          @keyframes fadeSlide{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
          @keyframes hashtagPulse{0%,100%{opacity:1;}50%{opacity:0.45;}}
          @keyframes borderGlow{
            0%,100%{box-shadow:0 0 0 1px rgba(255,255,255,0.4),0 0 16px rgba(100,180,255,0.5),0 0 32px rgba(100,180,255,0.25);border-color:rgba(255,255,255,0.5);}
            50%{box-shadow:0 0 0 1px rgba(255,255,255,0.15),0 0 6px rgba(100,180,255,0.15);border-color:rgba(255,255,255,0.2);}
          }
          @keyframes starSpin{0%{transform:rotate(0deg) scale(1);}50%{transform:rotate(180deg) scale(1.3);}100%{transform:rotate(360deg) scale(1);}}
          @keyframes shimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
          .hashtag-banner{display:inline-flex;align-items:center;gap:10px;padding:10px 24px;border-radius:50px;border:1.5px solid rgba(255,255,255,0.4);background:rgba(255,255,255,0.08);backdrop-filter:blur(10px);animation:borderGlow 2s ease-in-out infinite;cursor:default;}
          .hashtag-text{font-size:16px;font-weight:800;letter-spacing:0.5px;background:linear-gradient(90deg,#fff 0%,#90caf9 30%,#fff 50%,#90caf9 70%,#fff 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 2.5s linear infinite, hashtagPulse 2s ease-in-out infinite;}
          .hashtag-star{font-size:12px;color:#90caf9;animation:starSpin 3s linear infinite;display:inline-block;}
          .hashtag-star:last-child{animation-direction:reverse;}
        `}</style>
      </div>
      {/* SAG PANEL */}
      <div style={{width:"min(480px,100%)",background:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"48px 40px",boxShadow:"-8px 0 40px rgba(0,0,0,0.08)",position:"relative"}}>
        <div style={{width:"100%",maxWidth:380}}>
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{width:64,height:42,margin:"0 auto 14px",borderRadius:12,overflow:"hidden",boxShadow:"0 4px 16px rgba(230,57,70,0.25)"}}>
              <svg width="64" height="42" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="600" fill="#E30A17"/><circle cx="300" cy="300" r="200" fill="white"/><circle cx="360" cy="300" r="160" fill="#E30A17"/><g transform="translate(530,300) rotate(-12)"><polygon fill="white" points="0,-80 18.6,-57.2 59.5,-24.7 30.4,21.9 37.3,65.2 0,40 -37.3,65.2 -30.4,21.9 -59.5,-24.7 -18.6,-57.2"/></g></svg>
            </div>
            <h2 style={{fontWeight:900,fontSize:24,background:"linear-gradient(135deg,#e63946,#c1121f)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 4px"}}>Hoş Geldin!</h2>
            <p style={{fontSize:13,color:"#6b7280",margin:0}}>Hesabına giriş yap veya yeni hesap oluştur</p>
          </div>
          <div style={{display:"flex",background:"#f3f4f6",borderRadius:14,padding:4,marginBottom:24}}>
            {(["giris","kayit"] as const).map(t=>(
              <button key={t} onClick={()=>{setTab(t);setErr("");}}
                style={{flex:1,padding:"10px 0",borderRadius:10,fontSize:14,fontWeight:700,border:"none",cursor:"pointer",background:tab===t?"#fff":"transparent",color:tab===t?"#e63946":"#6b7280",boxShadow:tab===t?"0 2px 8px rgba(0,0,0,0.08)":"none",transition:"all .2s"}}>
                {t==="giris"?"Giriş Yap":"Kayıt Ol"}
              </button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {tab==="kayit"&&(<div>
              <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>İsim Soyisim</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Adın ve soyadın" style={inp}
                onFocus={e=>{e.target.style.borderColor="#e63946";e.target.style.boxShadow="0 0 0 3px rgba(230,57,70,0.1)";}}
                onBlur={e=>{e.target.style.borderColor="#e5e7eb";e.target.style.boxShadow="none";}}/>
            </div>)}
            <div>
              <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>Kullanıcı Adı</label>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#9ca3af",fontWeight:600}}>@</span>
                <input value={username} onChange={e=>setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,""))} placeholder="kullanici_adi"
                  style={{...inp,paddingLeft:32}}
                  onFocus={e=>{e.target.style.borderColor="#e63946";e.target.style.boxShadow="0 0 0 3px rgba(230,57,70,0.1)";}}
                  onBlur={e=>{e.target.style.borderColor="#e5e7eb";e.target.style.boxShadow="none";}}
                  onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/>
              </div>
            </div>
            {tab==="kayit"&&(<div>
              <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>Bio <span style={{fontWeight:400,color:"#9ca3af"}}>(isteğe bağlı)</span></label>
              <input value={bio} onChange={e=>setBio(e.target.value)} placeholder="Kendini kısaca tanıt..." style={inp}
                onFocus={e=>{e.target.style.borderColor="#e63946";e.target.style.boxShadow="0 0 0 3px rgba(230,57,70,0.1)";}}
                onBlur={e=>{e.target.style.borderColor="#e5e7eb";e.target.style.boxShadow="none";}}/>
            </div>)}
            {err&&(<div style={{fontSize:12,color:"#e63946",background:"#fff1f2",border:"1px solid #fecdd3",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>⚠️ {err}</div>)}
            <button onClick={handleSubmit} disabled={loading}
              style={{padding:"14px 0",background:loading?"#f3f4f6":"linear-gradient(135deg,#e63946,#c1121f)",color:loading?"#9ca3af":"#fff",border:"none",borderRadius:14,fontSize:15,fontWeight:800,cursor:loading?"not-allowed":"pointer",marginTop:4,boxShadow:loading?"none":"0 4px 20px rgba(230,57,70,0.35)",transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {loading?<><span style={{width:16,height:16,borderRadius:"50%",border:"2.5px solid #d1d5db",borderTopColor:"transparent",animation:"spin .7s linear infinite",display:"inline-block"}}/>Yükleniyor...</>:tab==="giris"?"Giriş Yap":"Hesap Oluştur 🎉"}
            </button>
          </div>
          <p style={{textAlign:"center",fontSize:11,color:"#9ca3af",marginTop:20,lineHeight:1.7}}>
            Devam ederek <span style={{color:"#e63946",fontWeight:700}}>Kullanım Koşulları</span>&apos;nı kabul etmiş olursun.
          </p>
          <div style={{display:"flex",alignItems:"center",gap:12,marginTop:20}}>
            <div style={{flex:1,height:1,background:"#f3f4f6"}}/>
            <span style={{fontSize:11,color:"#d1d5db",fontWeight:500}}>AKGENÇLER © 2026 🇹🇷</span>
            <div style={{flex:1,height:1,background:"#f3f4f6"}}/>
          </div>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      </div>
    </div>
  );
}
