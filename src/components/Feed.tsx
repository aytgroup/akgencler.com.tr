"use client";
import React, { useState, useRef } from "react";
import { useStore } from "@/store/useStore";
import PostCard from "./PostCard";
import Avatar from "./Avatar";
import StoryBar from "./StoryBar";
import { showToast } from "./Toast";

const GRADS = [
  { label:"Kirmizi",  val:"linear-gradient(135deg,#e63946,#c1121f)" },
  { label:"Lacivert", val:"linear-gradient(135deg,#1d3557,#457b9d)" },
  { label:"Yesil",    val:"linear-gradient(135deg,#2d6a4f,#52b788)" },
  { label:"Turuncu",  val:"linear-gradient(135deg,#e76f51,#f4a261)" },
  { label:"Mor",      val:"linear-gradient(135deg,#7c3aed,#a855f7)" },
  { label:"Altin",    val:"linear-gradient(135deg,#b45309,#fbbf24)" },
];
const MOODS = ["🔥","💡","❤️","🚀","😂","🎉","💪","🌍","📚","🤝"];
const TABS = [
  { key:"akis",   label:"Akis",   icon:"📰" },
  { key:"trend",  label:"Trend",  icon:"🔥" },
  { key:"kesfet", label:"Kesfet", icon:"🔍" },
] as const;
type Tab = typeof TABS[number]["key"];

export default function Feed() {
  const { posts, addPost, currentUser } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>("akis");
  const [txt, setTxt] = useState("");
  const [selGrad, setSelGrad] = useState<number|null>(null);
  const [posting, setPosting] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selMood, setSelMood] = useState<string|null>(null);
  const [imgPreview, setImgPreview] = useState<string|null>(null);
  const [activePanel, setActivePanel] = useState<"grad"|"mood"|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const MAX = 500;
  const over = txt.length > MAX;
  const canPost = txt.trim().length > 0 && !over;

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { showToast("Sadece resim yukleyebilirsin","error"); return; }
    if (file.size > 5*1024*1024) { showToast("Dosya 5MB dan buyuk olamaz","error"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => { setImgPreview(ev.target?.result as string); };
    reader.readAsDataURL(file);
  }

  function submit() {
    if (!canPost || posting) return;
    setPosting(true);
    const finalTxt = selMood ? selMood + " " + txt.trim() : txt.trim();
    setTimeout(() => {
      addPost(finalTxt, selGrad !== null ? GRADS[selGrad].val : undefined);
      setTxt(""); setSelGrad(null); setSelMood(null); setImgPreview(null);
      setPosting(false); setExpanded(false); setActivePanel(null);
      if (fileRef.current) fileRef.current.value = "";
      showToast("Gonderi paylasild!");
    }, 600);
  }

  const displayed = activeTab==="trend"
    ? [...posts].sort((a,b)=>b.likes.length-a.likes.length)
    : activeTab==="kesfet"
    ? posts.filter(p=>p.authorId!=="me")
    : posts;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <StoryBar/>
      <div style={{background:"#fff",borderRadius:16,border:"1px solid #eef0f2",padding:"6px 8px",display:"flex",gap:4}}>
        {TABS.map(tab=>{
          const active=activeTab===tab.key;
          return(
            <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
              style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 8px",border:"none",cursor:"pointer",borderRadius:14,background:active?"linear-gradient(135deg,#fff1f2,#ffe4e6)":"transparent",position:"relative"}}>
              <span style={{fontSize:18}}>{tab.icon}</span>
              <span style={{fontSize:13,fontWeight:active?700:500,color:active?"#e63946":"#6b7280"}}>{tab.label}</span>
              {active&&<span style={{position:"absolute",bottom:6,left:"50%",transform:"translateX(-50%)",width:20,height:2.5,borderRadius:4,background:"#e63946"}}/>}
            </button>
          );
        })}
      </div>
      <div style={{background:"#fff",borderRadius:20,border:"1px solid #eef0f2",boxShadow:"0 2px 12px rgba(0,0,0,0.07)",overflow:"hidden"}}>
        <div style={{display:"flex",gap:12,padding:"16px 16px 0"}}>
          <Avatar name={currentUser.name} size={42} color={currentUser.avatarColor}/>
          <div style={{flex:1}}>
            {selMood&&(<div style={{display:"inline-flex",alignItems:"center",gap:5,background:"#fff1f2",border:"1px solid #fecdd3",borderRadius:20,padding:"3px 10px 3px 6px",marginBottom:8}}>
              <span style={{fontSize:16}}>{selMood}</span>
              <button onClick={()=>setSelMood(null)} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:11,padding:0}}>x</button>
            </div>)}
            <textarea value={txt} onChange={e=>setTxt(e.target.value)} onFocus={()=>setExpanded(true)}
              placeholder={expanded?"Ne dusunuyorsun? #hashtag ile etiketle...":"Ne dusunuyorsun? Fikirlerini paylas..."}
              rows={expanded?3:2}
              style={{width:"100%",resize:"none",fontSize:14.5,color:"#1c1e21",background:"transparent",border:"none",outline:"none",lineHeight:1.65,fontFamily:"inherit",paddingTop:4}}/>
          </div>
        </div>
        {selGrad!==null&&(<div style={{margin:'10px 16px 0',borderRadius:12,overflow:'hidden',position:'relative'}}>
          <div style={{height:72,background:GRADS[selGrad].val,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#fff',fontSize:13,fontWeight:700}}>{txt.slice(0,50)}</span>
          </div>
          <button onClick={()=>setSelGrad(null)} style={{position:'absolute',top:6,right:6,width:22,height:22,borderRadius:'50%',background:'rgba(0,0,0,0.4)',border:'none',cursor:'pointer',color:'#fff',fontSize:11}}>x</button>
        </div>)}
        {imgPreview&&(<div style={{margin:'10px 16px 0',borderRadius:12,overflow:'hidden',position:'relative'}}>
          <img src={imgPreview} alt='' style={{width:'100%',maxHeight:240,objectFit:'cover',display:'block'}}/>
          <button onClick={()=>{setImgPreview(null);if(fileRef.current)fileRef.current.value='';}} style={{position:'absolute',top:8,right:8,width:26,height:26,borderRadius:'50%',background:'rgba(0,0,0,0.55)',border:'none',cursor:'pointer',color:'#fff',fontSize:12}}>x</button>
        </div>)}
        {activePanel==='grad'&&(<div style={{margin:'10px 16px 0',padding:'12px 14px',background:'#f9fafb',borderRadius:14}}>
          <p style={{fontSize:11,fontWeight:700,color:'#6b7280',margin:'0 0 8px'}}>ARKA PLAN RENGI</p>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {GRADS.map((g,i)=>(<button key={i} onClick={()=>{setSelGrad(selGrad===i?null:i);setActivePanel(null);}} style={{width:38,height:38,borderRadius:10,background:g.val,border:selGrad===i?'3px solid #111':'3px solid transparent',cursor:'pointer',padding:0}}/>))}
          </div>
        </div>)}
        {activePanel==='mood'&&(<div style={{margin:'10px 16px 0',padding:'12px 14px',background:'#f9fafb',borderRadius:14}}>
          <p style={{fontSize:11,fontWeight:700,color:'#6b7280',margin:'0 0 8px'}}>HISSIYAT</p>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {MOODS.map((m,i)=>(<button key={i} onClick={()=>{setSelMood(selMood===m?null:m);setActivePanel(null);}} style={{width:40,height:40,borderRadius:10,background:selMood===m?'#fff1f2':'#fff',border:selMood===m?'2px solid #e63946':'1.5px solid #e5e7eb',cursor:'pointer',fontSize:22,display:'flex',alignItems:'center',justifyContent:'center',padding:0}}>{m}</button>))}
          </div>
        </div>)}
        <div style={{height:1,background:'#f3f4f6',margin:'10px 0 0'}}/>
        <div style={{display:'flex',alignItems:'center',padding:'8px 10px',gap:2}}>
          <input ref={fileRef} type='file' accept='image/*' onChange={handleFile} style={{display:'none'}}/>
          <button onClick={()=>fileRef.current?.click()} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 10px',borderRadius:10,border:'none',background:imgPreview?'#fff1f2':'none',cursor:'pointer',color:imgPreview?'#e63946':'#6b7280',fontSize:12,fontWeight:600}}>
            <svg width='17' height='17' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><rect x='3' y='3' width='18' height='18' rx='2'/><circle cx='8.5' cy='8.5' r='1.5'/><polyline points='21 15 16 10 5 21'/></svg>
            <span>Fotograf</span>
          </button>
          <button onClick={()=>setActivePanel(activePanel==='grad'?null:'grad')} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 10px',borderRadius:10,border:'none',background:activePanel==='grad'||selGrad!==null?'#fff1f2':'none',cursor:'pointer',color:activePanel==='grad'||selGrad!==null?'#e63946':'#6b7280',fontSize:12,fontWeight:600}}>
            <svg width='17' height='17' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M12 2v4M12 18v4'/></svg>
            <span>Renk</span>
          </button>
          <button onClick={()=>setActivePanel(activePanel==='mood'?null:'mood')} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 10px',borderRadius:10,border:'none',background:activePanel==='mood'||selMood?'#fff1f2':'none',cursor:'pointer',color:activePanel==='mood'||selMood?'#e63946':'#6b7280',fontSize:12,fontWeight:600}}>
            <svg width='17' height='17' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M8 13s1.5 2 4 2 4-2 4-2'/><line x1='9' y1='9' x2='9.01' y2='9'/><line x1='15' y1='9' x2='15.01' y2='9'/></svg>
            <span>Hissiyat</span>
          </button>
          <button onClick={()=>showToast('Konum ozelligi yakinda!','info')} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 10px',borderRadius:10,border:'none',background:'none',cursor:'pointer',color:'#6b7280',fontSize:12,fontWeight:600}}>
            <svg width='17' height='17' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' viewBox='0 0 24 24'><path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'/><circle cx='12' cy='10' r='3'/></svg>
            <span>Konum</span>
          </button>
          <div style={{flex:1}}/>
          {txt.length>0&&(<div style={{position:'relative',width:28,height:28,marginRight:6}}>
            <svg width='28' height='28' viewBox='0 0 28 28' style={{transform:'rotate(-90deg)'}}>
              <circle cx='14' cy='14' r='11' fill='none' stroke='#f3f4f6' strokeWidth='2.5'/>
              <circle cx='14' cy='14' r='11' fill='none' stroke={over?'#e63946':txt.length>MAX*0.8?'#f59e0b':'#22c55e'} strokeWidth='2.5' strokeDasharray={String(2*Math.PI*11)} strokeDashoffset={String(2*Math.PI*11*(1-Math.min(txt.length/MAX,1)))} strokeLinecap='round'/>
            </svg>
            {txt.length>MAX*0.8&&<span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:7.5,fontWeight:700,color:over?'#e63946':'#f59e0b'}}>{over?'-'+(txt.length-MAX):MAX-txt.length}</span>}
          </div>)}
          <button onClick={submit} disabled={!canPost||posting} style={{background:canPost&&!posting?'linear-gradient(135deg,#e63946,#c1121f)':'#f3f4f6',color:canPost&&!posting?'#fff':'#9ca3af',border:'none',borderRadius:22,padding:'9px 22px',fontSize:13.5,fontWeight:800,cursor:canPost&&!posting?'pointer':'not-allowed',whiteSpace:'nowrap',transition:'all .2s',boxShadow:canPost&&!posting?'0 4px 14px rgba(230,57,70,0.35)':'none',display:'flex',alignItems:'center',gap:6}}>
            {posting?'Paylasiliyor...':'Paylas'}
          </button>
        </div>
      </div>
      {displayed.map((post,i)=>(<div key={post.id} style={{animation:'fadeIn .3s ease both'}}><PostCard post={post}/></div>))}
    </div>
  );
}
