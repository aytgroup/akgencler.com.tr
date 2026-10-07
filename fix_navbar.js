const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62),amp=String.fromCharCode(38);
const L=[];const a=t=>L.push(t);

a('"use client";');
a('import React,{useState,useRef,useEffect}from"react";');
a('import Link from"next/link";');
a('');
a('const NOTIFS=[');
a('  {icon:"❤️",text:"Ahmet Kaya gönderini beğendi",time:"2 dk",unread:true},');
a('  {icon:"💬",text:"Zeynep yorumuna yanıt verdi",time:"15 dk",unread:true},');
a('  {icon:"👥",text:"Mehmet seni takip etmeye başladı",time:"1 sa",unread:true},');
a('  {icon:"🔥",text:"Gönderin trend oldu!",time:"3 sa",unread:false},');
a('  {icon:"🎉",text:"Topluluk etkinliği yarın başlıyor",time:"5 sa",unread:false},');
a('];');
a('');
a('export default function Navbar(){');
a('  const [q,setQ]=useState("");');
a('  const [focused,setFocused]=useState(false);');
a('  const [notifOpen,setNotifOpen]=useState(false);');
a('  const notifRef=useRef'+d+'HTMLDivElement'+s+'(null);');
a('  useEffect(()=>{');
a('    function h(e:MouseEvent){if(notifRef.current'+amp+amp+'!notifRef.current.contains(e.target as Node))setNotifOpen(false);}');
a('    document.addEventListener("mousedown",h);');
a('    return()=>document.removeEventListener("mousedown",h);');
a('  },[]);');
a('  return(');
a('    '+d+'nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:"#fff",borderBottom:"1px solid #f0f0f0",boxShadow:"0 1px 8px rgba(0,0,0,0.06)",height:60,display:"grid",gridTemplateColumns:"240px 1fr auto",alignItems:"center",gap:16,padding:"0 20px"}}'+s);

// Logo
a('      '+d+'Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",flexShrink:0}}'+s);
a('        '+d+'div style={{borderRadius:8,overflow:"hidden",boxShadow:"0 2px 6px rgba(0,0,0,0.15)",flexShrink:0,width:42,height:28}}'+s);
a('          '+d+'svg width="42" height="28" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}'+s);
a('            '+d+'rect width="900" height="600" fill="#E30A17"/'+s);
a('            '+d+'circle cx="300" cy="300" r="200" fill="white"/'+s);
a('            '+d+'circle cx="360" cy="300" r="160" fill="#E30A17"/'+s);
a('            '+d+'g transform="translate(530,300) rotate(-12)"'+s+d+'polygon fill="white" points="0,-80 18.6,-57.2 59.5,-24.7 30.4,21.9 37.3,65.2 0,40 -37.3,65.2 -30.4,21.9 -59.5,-24.7 -18.6,-57.2"/'+s+d+'/g'+s);
a('          '+d+'/svg'+s);
a('        '+d+'/div'+s);
a('        '+d+'div'+s);
a('          '+d+'span style={{fontWeight:900,fontSize:17,background:"linear-gradient(135deg,#e63946,#c1121f)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",display:"block",lineHeight:"1"}}'+s+'AKGENÇLER'+d+'/span'+s);
a('          '+d+'span style={{fontSize:9,color:"#9ca3af",fontWeight:500,display:"block",marginTop:2,lineHeight:"1"}}'+s+"Türkiye'nin Ak ve Âkil Gençlik Platformu"+d+'/span'+s);
a('        '+d+'/div'+s);
a('      '+d+'/Link'+s);

// Arama
a('      '+d+'div style={{position:"relative",width:"100%",maxWidth:480,margin:"0 auto"}}'+s);
a('        '+d+'div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex",alignItems:"center"}}'+s);
a('          '+d+'svg width="15" height="15" fill="none" stroke={focused?"#e63946":"#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{transition:"stroke .2s"}}'+s);
a('            '+d+'circle cx="11" cy="11" r="8"/'+s);
a('            '+d+'path d="m21 21-4.35-4.35"/'+s);
a('          '+d+'/svg'+s);
a('        '+d+'/div'+s);
a('        '+d+'input type="text" placeholder="Kişi, topluluk veya hashtag ara..." value={q} onChange={(e)=>setQ(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={{width:"100%",paddingLeft:38,paddingRight:16,paddingTop:9,paddingBottom:9,borderRadius:24,fontSize:13.5,outline:"none",border:focused?"1.5px solid #e63946":"1.5px solid transparent",background:focused?"#fff":"#f3f4f6",boxShadow:focused?"0 0 0 3px rgba(230,57,70,0.10)":"none",color:"#1f2937",transition:"all .2s",boxSizing:"border-box" as "border-box"}}'+'/'+s);
a('      '+d+'/div'+s);

// Sağ bölüm başlangıcı
a('      '+d+'div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}'+s);
a('        '+d+'button style={{display:"flex",alignItems:"center",gap:6,background:"#e63946",color:"#fff",fontSize:12,fontWeight:700,padding:"8px 16px",borderRadius:24,border:"none",cursor:"pointer",flexShrink:0}}'+s);
a('          '+d+'svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"'+s+d+'path d="M12 5v14M5 12h14"/'+s+d+'/svg'+s);
a('          Paylaş');
a('        '+d+'/button'+s);
a('        '+d+'Link href="/mesajlar" style={{position:"relative",width:36,height:36,borderRadius:"50%",background:"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",flexShrink:0}}'+s);
a('          '+d+'svg width="17" height="17" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"'+s+d+'path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/'+s+d+'/svg'+s);
a('          '+d+'span style={{position:"absolute",top:-2,right:-2,width:17,height:17,background:"#e63946",borderRadius:"50%",color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #fff"}}'+s+'3'+d+'/span'+s);
a('        '+d+'/Link'+s);

fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/fix_navbar_data.json',JSON.stringify(L),'utf8');
console.log('part1 ok',L.length);
