const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62),amp=String.fromCharCode(38);
const L=JSON.parse(fs.readFileSync('c:/Users/agity/Desktop/akgencler.com.tr/fix_profil_data.json','utf8'));
const a=t=>L.push(t);

a('export default function ProfilPage(){');
a('  const [tab,setTab]=useState(0);');
a('  const [following,setFollowing]=useState(false);');
a('  const [likedPosts,setLikedPosts]=useState'+d+'Record'+d+'number,boolean'+s+s+'({});');
a('  function toggleLike(id:number){setLikedPosts(p=>({...p,[id]:!p[id]}));}');
a('  return(');
a('    '+d+'PageLayout'+s);
a('      '+d+'div style={{display:"flex",flexDirection:"column",gap:16}}'+s);

// ── Profil Kartı ──
a('        '+d+'div style={{background:"#fff",borderRadius:20,border:"1px solid #eef0f2",boxShadow:"0 2px 12px rgba(0,0,0,0.07)",overflow:"hidden"}}'+s);
// Banner
a('          '+d+'div style={{height:160,background:"linear-gradient(135deg,#e63946 0%,#c1121f 40%,#1d3557 100%)",position:"relative",overflow:"hidden"}}'+s);
a('            '+d+'div style={{position:"absolute",inset:0,opacity:.08,backgroundImage:"radial-gradient(circle,#fff 1.5px,transparent 1.5px)",backgroundSize:"20px 20px"}}'+s+d+'/div'+s);
a('            '+d+'div style={{position:"absolute",bottom:0,left:0,right:0,height:60,background:"linear-gradient(to top,rgba(0,0,0,0.08),transparent)"}}'+s+d+'/div'+s);
a('            '+d+'button style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.4)",color:"#fff",fontSize:12,fontWeight:600,padding:"6px 14px",borderRadius:20,cursor:"pointer",backdropFilter:"blur(4px)"}}'+s+'✏️ Düzenle'+d+'/button'+s);
a('          '+d+'/div'+s);
// Avatar + butonlar
a('          '+d+'div style={{padding:"0 24px 24px"}}'+s);
a('            '+d+'div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginTop:-44,marginBottom:16}}'+s);
a('              '+d+'div style={{width:88,height:88,borderRadius:"50%",border:"4px solid #fff",overflow:"hidden",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",flexShrink:0,background:"#E30A17"}}'+s);
a('                '+d+'svg width="88" height="88" viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}'+s);
a('                  '+d+'rect width="900" height="900" fill="#E30A17"/'+s);
a('                  '+d+'g transform="translate(0,150)"'+s);
a('                    '+d+'circle cx="300" cy="300" r="200" fill="white"/'+s);
a('                    '+d+'circle cx="360" cy="300" r="160" fill="#E30A17"/'+s);
a('                    '+d+'g transform="translate(530,300) rotate(-12)"'+s+d+'polygon fill="white" points="0,-80 18.6,-57.2 59.5,-24.7 30.4,21.9 37.3,65.2 0,40 -37.3,65.2 -30.4,21.9 -59.5,-24.7 -18.6,-57.2"/'+s+d+'/g'+s);
a('                  '+d+'/g'+s);
a('                '+d+'/svg'+s);
a('              '+d+'/div'+s);
a('              '+d+'div style={{display:"flex",gap:8,paddingBottom:4}}'+s);
a('              '+d+'button style={{fontSize:12,fontWeight:600,padding:"8px 18px",borderRadius:20,border:"1.5px solid #e5e7eb",background:"#fff",color:"#374151",cursor:"pointer"}}'+s+'📤 Paylaş'+d+'/button'+s);
a('              '+d+'button onClick={()=>setFollowing(!following)} style={{fontSize:12,fontWeight:700,padding:"8px 20px",borderRadius:20,border:"none",cursor:"pointer",background:following?"#f3f4f6":"#e63946",color:following?"#374151":"#fff",transition:"all .2s"}}'+s);
a('                {following?"✓ Takipte":"+ Takip Et"}');
a('              '+d+'/button'+s);
a('              '+d+'/div'+s);
a('            '+d+'/div'+s);
// İsim + bio
a('            '+d+'div style={{marginBottom:16}}'+s);
a('              '+d+'div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}'+s);
a('                '+d+'h1 style={{fontWeight:900,fontSize:20,color:"#111827",margin:0,letterSpacing:"-0.5px"}}'+s+'Ak Genç'+d+'/h1'+s);
a('                '+d+'Verified/'+s);
a('              '+d+'/div'+s);
a('              '+d+'p style={{fontSize:13,color:"#9ca3af",margin:"0 0 10px",fontWeight:400}}'+s+'@akgenc_tr'+d+'/p'+s);
a('              '+d+'p style={{fontSize:14,color:"#374151",margin:"0 0 8px",lineHeight:1.6}}'+s+'🚀 Girişimci · 🎓 Boğaziçi Üniversitesi · 🇹🇷 Türkiye\'nin geleceğini şekillendiriyoruz!'+d+'/p'+s);
a('              '+d+'div style={{display:"flex",gap:16,flexWrap:"wrap"}}'+s);
a('              {[["📍","İstanbul"],["🔗","akgenc.com.tr"],["📅","Ocak 2024\'ten beri"]].map(([ic,tx])=>(');
a('                '+d+'span key={tx} style={{fontSize:12,color:"#6b7280",display:"flex",alignItems:"center",gap:4}}'+s+'{ic} {tx}'+d+'/span'+s);
a('              ))}');
a('              '+d+'/div'+s);
a('            '+d+'/div'+s);
// İstatistikler
a('            '+d+'div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,borderTop:"1px solid #f3f4f6",paddingTop:16}}'+s);
a('            {[["248","Gönderi"],["1.2K","Takipçi"],["890","Takip"],["48","Topluluk"]].map(([v,l],i)=>(');
a('              '+d+'div key={l} style={{textAlign:"center",padding:"8px 0",borderRight:i'+d+'3?"1px solid #f3f4f6":"none",cursor:"pointer"}}'+s);
a('                '+d+'p style={{fontWeight:800,fontSize:16,color:"#111827",margin:"0 0 2px"}}'+s+'{v}'+d+'/p'+s);
a('                '+d+'p style={{fontSize:11,color:"#9ca3af",margin:0,fontWeight:500}}'+s+'{l}'+d+'/p'+s);
a('              '+d+'/div'+s);
a('            ))}');
a('            '+d+'/div'+s);
a('          '+d+'/div'+s);
a('        '+d+'/div'+s);

fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/fix_profil_data2.json',JSON.stringify(L),'utf8');
console.log('part2 ok',L.length);
