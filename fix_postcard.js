const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62),amp=String.fromCharCode(38);
const L=[];const a=t=>L.push(t);

a('"use client";');
a('import React,{useState}from"react";');
a('interface Post{id:number;author:{name:string;username:string;avatar:string;verified:boolean};content:string;image:string|null;likes:number;comments:number;shares:number;time:string;tags:string[];liked:boolean;bookmarked:boolean;}');
a('interface Props{post:Post;onLike:()=>void;onBookmark:()=>void;}');
a('const IG:Record'+d+'string,{bg:string;icon:string;label:string}'+s+'={');
a('  gradient1:{bg:"linear-gradient(135deg,#c1121f,#457b9d)",icon:"🚀",label:"Girişim"},');
a('  gradient2:{bg:"linear-gradient(135deg,#2d6a4f,#52b788)",icon:"🌱",label:"Doğa"},');
a('  gradient3:{bg:"linear-gradient(135deg,#1d3557,#457b9d)",icon:"💡",label:"Teknoloji"},');
a('};');
a('const PAL=["#e63946","#1d3557","#2d6a4f","#e76f51","#457b9d","#c1121f"];');
a('function avatarBg(n:string){return PAL[n.charCodeAt(0)%PAL.length];}');
a('');
a('export default function PostCard({post,onLike,onBookmark}:Props){');
a('  const [showC,setShowC]=useState(false);');
a('  const [likeAnim,setLA]=useState(false);');
a('  const [cTxt,setCTxt]=useState("");');
a('  const [comments,setComments]=useState'+d+'string[]'+s+'([]);');
a('  const [shared,setShared]=useState(false);');
a('');
a('  function doLike(){setLA(true);setTimeout(()=>setLA(false),400);onLike();}');
a('  function doComment(){if(!cTxt.trim())return;setComments(x=>[...x,cTxt]);setCTxt("");}');
a('  function doShare(){setShared(true);setTimeout(()=>setShared(false),1500);}');
a('  const img=post.image?IG[post.image]:null;');
a('  const tc=post.comments+comments.length;');
a('  const avBg=avatarBg(post.author.name);');
a('');
a('  return(');
a('    '+d+'div style={{background:"#fff",borderRadius:16,border:"1px solid #eef0f2",boxShadow:"0 1px 6px rgba(0,0,0,0.06)",overflow:"hidden"}}'+s);

// Header
a('      '+d+'div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px 10px"}}'+s);
a('        '+d+'div style={{display:"flex",alignItems:"center",gap:10}}'+s);
a('          '+d+'div style={{width:42,height:42,borderRadius:"50%",background:avBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 2px 6px rgba(0,0,0,0.15)"}}'+s);
a('            '+d+'span style={{color:"#fff",fontWeight:800,fontSize:12,letterSpacing:"-0.5px"}}'+s+'{post.author.avatar}'+d+'/span'+s);
a('          '+d+'/div'+s);
a('          '+d+'div'+s);
a('            '+d+'div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}'+s);
a('              '+d+'span style={{fontWeight:700,fontSize:14,color:"#111827"}}'+s+'{post.author.name}'+d+'/span'+s);
a('              {post.author.verified'+amp+amp+'('+d+'span style={{width:15,height:15,background:"#e63946",borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0}}'+s+d+'svg width="7" height="7" fill="white" viewBox="0 0 24 24"'+s+d+'path d="M20 6 9 17l-5-5"/'+s+d+'/svg'+s+d+'/span'+s+')}');
a('            '+d+'/div'+s);
a('            '+d+'p style={{fontSize:11.5,color:"#9ca3af",margin:0}}'+s+'@{post.author.username} · {post.time}'+d+'/p'+s);
a('          '+d+'/div'+s);
a('        '+d+'/div'+s);
a('        '+d+'button style={{width:30,height:30,border:"none",background:"none",cursor:"pointer",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af"}}'+s);
a('          '+d+'svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"'+s+d+'circle cx="12" cy="5" r="1.5"/'+s+d+'circle cx="12" cy="12" r="1.5"/'+s+d+'circle cx="12" cy="19" r="1.5"/'+s+d+'/svg'+s);
a('        '+d+'/button'+s);
a('      '+d+'/div'+s);

// Content
a('      '+d+'div style={{padding:"0 16px 12px"}}'+s);
a('        '+d+'p style={{fontSize:14,color:"#1c1e21",lineHeight:1.7,margin:0}}'+s+'{post.content}'+d+'/p'+s);
a('        {post.tags.length'+d+'0'+amp+amp+'('+d+'div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10}}'+s+'{post.tags.map(t=>('+d+'span key={t} style={{fontSize:11.5,fontWeight:600,color:"#e63946",background:"#fff1f2",border:"1px solid #fecdd3",borderRadius:20,padding:"3px 10px"}}'+s+'{t}'+d+'/span'+s+'))}'+d+'/div'+s+')}');
a('      '+d+'/div'+s);

// Image
a('      {img'+amp+amp+'('+d+'div style={{margin:"0 14px 12px",borderRadius:12,overflow:"hidden",position:"relative",height:140,background:img.bg}}'+s);
a('        '+d+'div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.25),transparent)"}}'+s+d+'/div'+s);
a('        '+d+'div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6}}'+s);
a('          '+d+'span style={{fontSize:36}}'+s+'{img.icon}'+d+'/span'+s);
a('          '+d+'span style={{color:"#fff",fontWeight:600,fontSize:12,opacity:.9,textShadow:"0 1px 4px rgba(0,0,0,0.3)"}}'+s+'{img.label}'+d+'/span'+s);
a('        '+d+'/div'+s);
a('      '+d+'/div'+s+')}');

fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/fix_postcard_data.json',JSON.stringify(L),'utf8');
console.log('postcard part1 ok',L.length);
