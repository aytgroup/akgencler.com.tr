const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62),amp=String.fromCharCode(38);
const L=JSON.parse(fs.readFileSync('c:/Users/agity/Desktop/akgencler.com.tr/fix_navbar_data.json','utf8'));
const a=t=>L.push(t);

// Bildirimler butonu
a('        '+d+'div style={{position:"relative"}} ref={notifRef}'+s);
a('          '+d+'button onClick={()=>setNotifOpen(!notifOpen)} style={{position:"relative",width:36,height:36,borderRadius:"50%",background:"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center",border:"none",cursor:"pointer",flexShrink:0}}'+s);
a('            '+d+'svg width="17" height="17" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"'+s);
a('              '+d+'path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/'+s);
a('              '+d+'path d="M13.73 21a2 2 0 0 1-3.46 0"/'+s);
a('            '+d+'/svg'+s);
a('            '+d+'span style={{position:"absolute",top:-2,right:-2,width:17,height:17,background:"#e63946",borderRadius:"50%",color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #fff"}}'+s+'5'+d+'/span'+s);
a('          '+d+'/button'+s);

// Bildirim dropdown
a('          {notifOpen'+amp+amp+'(');
a('            '+d+'div style={{position:"absolute",right:0,top:44,background:"#fff",borderRadius:16,boxShadow:"0 8px 32px rgba(0,0,0,0.12)",border:"1px solid #f0f0f0",width:320,zIndex:100,overflow:"hidden"}}'+s);
a('              '+d+'div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid #f3f4f6"}}'+s);
a('                '+d+'span style={{fontWeight:700,fontSize:14,color:"#111827"}}'+s+'Bildirimler'+d+'/span'+s);
a('                '+d+'button style={{fontSize:11,color:"#e63946",fontWeight:600,background:"none",border:"none",cursor:"pointer"}}'+s+'Tümünü gör'+d+'/button'+s);
a('              '+d+'/div'+s);
a('              {NOTIFS.map((n,i)=>(');
a('                '+d+'div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"10px 16px",borderBottom:i'+d+'NOTIFS.length-1?"1px solid #f9fafb":"none",background:n.unread?"rgba(230,57,70,0.03)":"transparent",cursor:"pointer"}}'+s);
a('                  '+d+'span style={{fontSize:18,flexShrink:0,marginTop:1}}'+s+'{n.icon}'+d+'/span'+s);
a('                  '+d+'div style={{flex:1,minWidth:0}}'+s);
a('                    '+d+'p style={{fontSize:12,color:"#374151",margin:"0 0 2px",lineHeight:1.4}}'+s+'{n.text}'+d+'/p'+s);
a('                    '+d+'p style={{fontSize:10,color:"#9ca3af",margin:0}}'+s+'{n.time} önce'+d+'/p'+s);
a('                  '+d+'/div'+s);
a('                  {n.unread'+amp+amp+d+'div style={{width:8,height:8,background:"#e63946",borderRadius:"50%",flexShrink:0,marginTop:4}}'+s+d+'/div'+s+'}');
a('                '+d+'/div'+s);
a('              ))}');
a('            '+d+'/div'+s);
a('          )}');
a('        '+d+'/div'+s);

// Profil
a('        '+d+'Link href="/profil" style={{width:38,height:38,borderRadius:"50%",overflow:"hidden",border:"2px solid #e63946",flexShrink:0,display:"block",boxShadow:"0 2px 6px rgba(230,57,70,0.2)"}}'+s);
a('          '+d+'svg width="38" height="38" viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}'+s);
a('            '+d+'rect width="900" height="900" fill="#E30A17"/'+s);
a('            '+d+'g transform="translate(0,150)"'+s);
a('              '+d+'circle cx="300" cy="300" r="200" fill="white"/'+s);
a('              '+d+'circle cx="360" cy="300" r="160" fill="#E30A17"/'+s);
a('              '+d+'g transform="translate(530,300) rotate(-12)"'+s+d+'polygon fill="white" points="0,-80 18.6,-57.2 59.5,-24.7 30.4,21.9 37.3,65.2 0,40 -37.3,65.2 -30.4,21.9 -59.5,-24.7 -18.6,-57.2"/'+s+d+'/g'+s);
a('            '+d+'/g'+s);
a('          '+d+'/svg'+s);
a('        '+d+'/Link'+s);

// Kapanışlar
a('      '+d+'/div'+s); // sağ div
a('    '+d+'/nav'+s);
a('  );');
a('}');

const out=L.join('\n');
fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/src/components/Navbar.tsx',out,'utf8');
console.log('Navbar.tsx written, lines:',L.length);
