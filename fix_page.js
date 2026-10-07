const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62),amp=String.fromCharCode(38);
const L=[];const a=t=>L.push(t);

a('"use client";');
a('import React,{useState}from"react";');
a('import Navbar from"@/components/Navbar";');
a('import Sidebar from"@/components/Sidebar";');
a('import Feed from"@/components/Feed";');
a('import RightPanel from"@/components/RightPanel";');
a('import StoryBar from"@/components/StoryBar";');
a('');
a('const TABS=[');
a('  {key:"akis",label:"Akış",icon:"📰",desc:"Son paylaşımlar"},');
a('  {key:"kesfet",label:"Keşfet",icon:"🔍",desc:"Yeni içerikler"},');
a('  {key:"trend",label:"Trend",icon:"🔥",desc:"Popüler konular"},');
a('] as const;');
a('');
a('export default function HomePage(){');
a('  const [activeTab,setActiveTab]=useState'+d+'"kesfet"|"akis"|"trend"'+s+'("akis");');
a('  return(');
a('    '+d+'div style={{minHeight:"100vh",background:"#f0f2f5"}}'+s);
a('      '+d+'Navbar/'+s);
a('      '+d+'div style={{marginTop:60,display:"grid",gridTemplateColumns:"240px 1fr 288px",gap:20,alignItems:"start",minHeight:"calc(100vh - 60px)",padding:"20px 20px 32px",maxWidth:1400,margin:"60px auto 0"}}'+s);

// Sol
a('        '+d+'aside style={{minWidth:0}}'+s);
a('          '+d+'div style={{position:"sticky",top:76}}'+s);
a('            '+d+'Sidebar/'+s);
a('          '+d+'/div'+s);
a('        '+d+'/aside'+s);

// Orta
a('        '+d+'main style={{minWidth:0,display:"flex",flexDirection:"column",gap:14}}'+s);

// Hikayeler
a('          '+d+'StoryBar/'+s);

// Tab Bar
a('          '+d+'div style={{background:"#fff",borderRadius:18,border:"1px solid #eef0f2",boxShadow:"0 1px 6px rgba(0,0,0,0.06)",overflow:"hidden",padding:"6px 8px",display:"flex",gap:4}}'+s);
a('          {TABS.map((tab)=>{');
a('            const active=activeTab===tab.key;');
a('            return(');
a('              '+d+'button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,padding:"10px 8px",border:"none",cursor:"pointer",borderRadius:14,transition:"all .2s",background:active?"linear-gradient(135deg,#fff1f2,#ffe4e6)":"transparent",position:"relative"}}'+s);
a('                '+d+'span style={{fontSize:18,lineHeight:1}}'+s+'{tab.icon}'+d+'/span'+s);
a('                '+d+'span style={{fontSize:13,fontWeight:active?700:500,color:active?"#e63946":"#6b7280",lineHeight:1}}'+s+'{tab.label}'+d+'/span'+s);
a('                {active'+amp+amp+'('+d+'span style={{position:"absolute",bottom:6,left:"50%",transform:"translateX(-50%)",width:20,height:2.5,borderRadius:4,background:"#e63946"}}'+s+d+'/span'+s+')}');
a('              '+d+'/button'+s);
a('            );');
a('          })}');
a('          '+d+'/div'+s);

// Feed
a('          '+d+'Feed activeTab={activeTab}/'+s);
a('        '+d+'/main'+s);

// Sağ
a('        '+d+'aside style={{minWidth:0}}'+s);
a('          '+d+'div style={{position:"sticky",top:76}}'+s);
a('            '+d+'RightPanel/'+s);
a('          '+d+'/div'+s);
a('        '+d+'/aside'+s);

a('      '+d+'/div'+s);
a('    '+d+'/div'+s);
a('  );');
a('}');

fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/src/app/page.tsx',L.join('\n'),'utf8');
console.log('page.tsx written, lines:',L.length);
