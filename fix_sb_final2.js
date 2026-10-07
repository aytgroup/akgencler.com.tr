const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62),amp=String.fromCharCode(38);
const L=JSON.parse(fs.readFileSync('c:/Users/agity/Desktop/akgencler.com.tr/fix_sb_final_data.json','utf8'));
const a=t=>L.push(t);

a('export default function Sidebar(){');
a('  const path=usePathname();');
a('  const card:React.CSSProperties={background:"#fff",borderRadius:16,border:"1px solid #eef0f2",boxShadow:"0 1px 6px rgba(0,0,0,0.06)",overflow:"hidden"};');
a('  return(');
a('    '+d+'div style={{display:"flex",flexDirection:"column",gap:12}}'+s);

// ── Profil Kartı ──
a('      '+d+'div style={card}'+s);
// Banner
a('        '+d+'div style={{height:80,background:"linear-gradient(135deg,#e63946 0%,#c1121f 45%,#1d3557 100%)",position:"relative",overflow:"hidden"}}'+s);
a('          '+d+'div style={{position:"absolute",inset:0,opacity:.1,backgroundImage:"radial-gradient(circle,#fff 1.5px,transparent 1.5px)",backgroundSize:"18px 18px"}}'+s+d+'/div'+s);
a('        '+d+'/div'+s);
// İçerik
a('        '+d+'div style={{padding:"0 16px 16px"}}'+s);
// Avatar + isim + buton — tek flex row
a('          '+d+'div style={{display:"flex",alignItems:"center",gap:12,marginTop:-22}}'+s);
// Yuvarlak avatar
a('            '+d+'div style={{width:52,height:52,borderRadius:"50%",overflow:"hidden",border:"3px solid #fff",boxShadow:"0 4px 12px rgba(0,0,0,0.18)",flexShrink:0}}'+s);
a('              '+d+'svg width="52" height="52" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}'+s);
a('                '+d+'rect width="900" height="600" fill="#E30A17"/'+s);
a('                '+d+'circle cx="300" cy="300" r="200" fill="white"/'+s);
a('                '+d+'circle cx="360" cy="300" r="160" fill="#E30A17"/'+s);
a('                '+d+'g transform="translate(530,300) rotate(-12)"'+s+d+'polygon fill="white" points="0,-80 18.6,-57.2 59.5,-24.7 30.4,21.9 37.3,65.2 0,40 -37.3,65.2 -30.4,21.9 -59.5,-24.7 -18.6,-57.2"/'+s+d+'/g'+s);
a('              '+d+'/svg'+s);
a('            '+d+'/div'+s);
// İsim + kullanıcı adı
a('            '+d+'div style={{flex:1,minWidth:0,paddingTop:18}}'+s);
a('              '+d+'p style={{fontWeight:800,fontSize:14,color:"#111827",margin:"0 0 2px",letterSpacing:"-0.2px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}'+s+'Ak Genç'+d+'/p'+s);
a('              '+d+'p style={{fontSize:11.5,color:"#9ca3af",margin:0}}'+s+'@akgenc_tr'+d+'/p'+s);
a('            '+d+'/div'+s);
// Takip Et butonu
a('            '+d+'Link href="/profil" style={{fontSize:11,fontWeight:700,color:"#e63946",padding:"6px 14px",border:"1.5px solid #e63946",borderRadius:20,textDecoration:"none",background:"transparent",flexShrink:0,whiteSpace:"nowrap",marginTop:18}}'+s+'Takip Et'+d+'/Link'+s);
a('          '+d+'/div'+s);
a('        '+d+'/div'+s);
a('      '+d+'/div'+s);

// ── Navigasyon ──
a('      '+d+'div style={card}'+s);
a('        {NAV.map((item,i)=>{');
a('          const active=path===item.href;');
a('          const Icon=ICONS[item.icon];');
a('          return(');
a('            '+d+'Link key={item.href} href={item.href} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",textDecoration:"none",background:active?"#fff5f5":"transparent",borderLeft:active?"3px solid #e63946":"3px solid transparent",borderBottom:i'+d+'NAV.length-1?"1px solid #f9fafb":"none"}}'+s);
a('              '+d+'span style={{color:active?"#e63946":"#6b7280",display:"flex",alignItems:"center",flexShrink:0,width:20}}'+s+d+'Icon/'+s+d+'/span'+s);
a('              '+d+'span style={{flex:1,fontSize:13.5,fontWeight:active?700:500,color:active?"#e63946":"#1f2937"}}'+s+'{item.label}'+d+'/span'+s);
a('              {item.badge'+amp+amp+d+'span style={{background:"#e63946",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:20,minWidth:20,textAlign:"center",lineHeight:"16px"}}'+s+'{item.badge}'+d+'/span'+s+'}');
a('            '+d+'/Link'+s);
a('          );');
a('        })}');
a('      '+d+'/div'+s);

// ── Trend Konular ──
a('      '+d+'div style={card}'+s);
a('        '+d+'div style={{display:"flex",alignItems:"center",gap:8,padding:"14px 16px 10px",borderBottom:"1px solid #f3f4f6"}}'+s);
a('          '+d+'span style={{fontSize:16}}'+s+'🔥'+d+'/span'+s);
a('          '+d+'span style={{fontWeight:700,fontSize:13.5,color:"#111827"}}'+s+'Trend Konular'+d+'/span'+s);
a('        '+d+'/div'+s);
a('        '+d+'div'+s);
a('        {TRENDS.map((t,i)=>(');
a('          '+d+'div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",borderBottom:i'+d+'TRENDS.length-1?"1px solid #f9fafb":"none",cursor:"pointer"}}'+s);
a('            '+d+'div'+s);
a('              '+d+'p style={{fontSize:10,color:"#9ca3af",margin:"0 0 2px",fontWeight:500,textTransform:"uppercase",letterSpacing:".4px"}}'+s+'#{i+1} Trend'+d+'/p'+s);
a('              '+d+'p style={{fontSize:13.5,fontWeight:700,color:"#1f2937",margin:0}}'+s+'{t.tag}'+d+'/p'+s);
a('            '+d+'/div'+s);
a('            '+d+'span style={{fontSize:11,color:"#6b7280",fontWeight:600,background:"#f3f4f6",padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}'+s+'{t.count}'+d+'/span'+s);
a('          '+d+'/div'+s);
a('        ))}');
a('        '+d+'/div'+s);
a('      '+d+'/div'+s);

a('    '+d+'/div'+s);
a('  );');
a('}');

const out=L.join('\n');
fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/src/components/Sidebar.tsx',out,'utf8');
console.log('Sidebar final written, lines:',L.length);
