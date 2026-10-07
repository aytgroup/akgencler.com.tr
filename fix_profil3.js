const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62),amp=String.fromCharCode(38);
const L=JSON.parse(fs.readFileSync('c:/Users/agity/Desktop/akgencler.com.tr/fix_profil_data2.json','utf8'));
const a=t=>L.push(t);

// ── Highlights ──
a('        '+d+'div style={{background:"#fff",borderRadius:20,border:"1px solid #eef0f2",boxShadow:"0 1px 6px rgba(0,0,0,0.05)",padding:"16px 20px"}}'+s);
a('          '+d+'p style={{fontWeight:700,fontSize:13,color:"#111827",margin:"0 0 14px"}}'+s+'Öne Çıkanlar'+d+'/p'+s);
a('          '+d+'div style={{display:"flex",gap:16,overflowX:"auto",scrollbarWidth:"none" as "none"}}'+s);
a('          {HIGHLIGHTS.map(h=>(');
a('            '+d+'div key={h.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,flexShrink:0,cursor:"pointer"}}'+s);
a('              '+d+'div style={{width:64,height:64,borderRadius:"50%",padding:2.5,background:`linear-gradient(135deg,${h.color[0]},${h.color[1]})`}}'+s);
a('                '+d+'div style={{width:"100%",height:"100%",borderRadius:"50%",border:"2.5px solid #fff",background:`linear-gradient(135deg,${h.color[0]}22,${h.color[1]}22)`,display:"flex",alignItems:"center",justifyContent:"center"}}'+s);
a('                  '+d+'span style={{fontSize:24}}'+s+'{h.icon}'+d+'/span'+s);
a('                '+d+'/div'+s);
a('              '+d+'/div'+s);
a('              '+d+'span style={{fontSize:11,color:"#374151",fontWeight:500,textAlign:"center"}}'+s+'{h.label}'+d+'/span'+s);
a('            '+d+'/div'+s);
a('          ))}');
a('          '+d+'/div'+s);
a('        '+d+'/div'+s);

// ── Tab Bar ──
a('        '+d+'div style={{background:"#fff",borderRadius:20,border:"1px solid #eef0f2",boxShadow:"0 1px 6px rgba(0,0,0,0.05)",overflow:"hidden"}}'+s);
a('          '+d+'div style={{display:"flex",borderBottom:"1px solid #f3f4f6"}}'+s);
a('          {TABS.map((t)=>(');
a('            '+d+'button key={t.key} onClick={()=>setTab(t.key)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"14px 8px",border:"none",background:"transparent",cursor:"pointer",fontSize:12.5,fontWeight:tab===t.key?700:500,color:tab===t.key?"#e63946":"#6b7280",borderBottom:tab===t.key?"2.5px solid #e63946":"2.5px solid transparent",transition:"all .2s"}}'+s);
a('              '+d+'span style={{fontSize:14}}'+s+'{t.icon}'+d+'/span'+s);
a('              '+d+'span'+s+'{t.label}'+d+'/span'+s);
a('            '+d+'/button'+s);
a('          ))}');
a('          '+d+'/div'+s);

// ── Gönderi Grid (tab=0) ──
a('          {tab===0'+amp+amp+'(');
a('            '+d+'div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,padding:2}}'+s);
a('            {POSTS.map((p)=>(');
a('              '+d+'div key={p.id} style={{position:"relative",aspectRatio:"1",overflow:"hidden",cursor:"pointer",borderRadius:4,background:p.img}} onClick={()=>toggleLike(p.id)}'+s);
a('                '+d+'div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0)",transition:"background .2s"}} onMouseOver={e=>(e.currentTarget.style.background="rgba(0,0,0,0.3)")} onMouseOut={e=>(e.currentTarget.style.background="rgba(0,0,0,0)")}'+s);
a('                  '+d+'div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",gap:12,opacity:0,transition:"opacity .2s"}} onMouseOver={e=>(e.currentTarget.style.opacity="1")} onMouseOut={e=>(e.currentTarget.style.opacity="0")}'+s);
a('                    '+d+'span style={{color:"#fff",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:4}}'+s+'❤️ {p.likes}'+d+'/span'+s);
a('                    '+d+'span style={{color:"#fff",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:4}}'+s+'💬 {p.comments}'+d+'/span'+s);
a('                  '+d+'/div'+s);
a('                '+d+'/div'+s);
a('              '+d+'/div'+s);
a('            ))}');
a('            '+d+'/div'+s);
a('          )}');

// ── Gönderi List (tab=0 alternatif — mobil için ayrı blok) ──
// ── Medya/Beğeni/Kaydet boş state ──
a('          {tab'+d+'0'+amp+amp+'(');
a('            '+d+'div style={{padding:"48px 24px",textAlign:"center"}}'+s);
a('              '+d+'p style={{fontSize:40,margin:"0 0 12px"}}'+s+'{["🖼️","❤️","🔖"][tab-1]}'+d+'/p'+s);
a('              '+d+'p style={{fontWeight:700,fontSize:15,color:"#374151",margin:"0 0 6px"}}'+s+'{["Henüz medya yok","Beğenilen gönderi yok","Kaydedilen gönderi yok"][tab-1]}'+d+'/p'+s);
a('              '+d+'p style={{fontSize:13,color:"#9ca3af",margin:0}}'+s+'İçerikler burada görünecek'+d+'/p'+s);
a('            '+d+'/div'+s);
a('          )}');
a('        '+d+'/div'+s);

// Kapanış
a('      '+d+'/div'+s);
a('    '+d+'/PageLayout'+s);
a('  );');
a('}');

const out=L.join('\n');
fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/src/app/profil/page.tsx',out,'utf8');
console.log('profil/page.tsx written, lines:',L.length);
