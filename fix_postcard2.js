const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62),amp=String.fromCharCode(38);
const L=JSON.parse(fs.readFileSync('c:/Users/agity/Desktop/akgencler.com.tr/fix_postcard_data.json','utf8'));
const a=t=>L.push(t);

// Stats row
a('      '+d+'div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px 10px"}}'+s);
a('        '+d+'div style={{display:"flex",alignItems:"center",gap:6}}'+s);
a('          '+d+'span style={{width:16,height:16,background:"#e63946",borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center"}}'+s);
a('            '+d+'svg width="8" height="8" fill="white" viewBox="0 0 24 24"'+s+d+'path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/'+s+d+'/svg'+s);
a('          '+d+'/span'+s);
a('          '+d+'span style={{fontSize:11.5,color:"#6b7280",fontWeight:500}}'+s+'{post.likes} beğeni'+d+'/span'+s);
a('        '+d+'/div'+s);
a('        {tc'+d+'0'+amp+amp+'('+d+'button onClick={()=>setShowC(!showC)} style={{fontSize:11.5,color:"#9ca3af",background:"none",border:"none",cursor:"pointer",padding:0,fontWeight:500}}'+s+'{tc} yorum'+d+'/button'+s+')}');
a('      '+d+'/div'+s);

// Action bar
a('      '+d+'div style={{borderTop:"1px solid #f3f4f6",display:"flex",alignItems:"center"}}'+s);
// Beğen
a('        '+d+'button onClick={doLike} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"11px 0",border:"none",background:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,color:post.liked?"#e63946":"#6b7280",borderRight:"1px solid #f3f4f6"}}'+s);
a('          '+d+'svg width="16" height="16" fill={post.liked?"#e63946":"none"} stroke={post.liked?"#e63946":"#6b7280"} strokeWidth="2" viewBox="0 0 24 24" style={{transform:likeAnim?"scale(1.35)":"scale(1)",transition:"transform 0.15s"}}'+s+d+'path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/'+s+d+'/svg'+s);
a('          {post.liked?"Beğenildi":"Beğen"}');
a('        '+d+'/button'+s);
// Yorum
a('        '+d+'button onClick={()=>setShowC(!showC)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"11px 0",border:"none",background:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,color:"#6b7280",borderRight:"1px solid #f3f4f6"}}'+s);
a('          '+d+'svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"'+s+d+'path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/'+s+d+'/svg'+s);
a('          Yorum');
a('        '+d+'/button'+s);
// Paylaş
a('        '+d+'button onClick={doShare} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"11px 0",border:"none",background:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,color:shared?"#16a34a":"#6b7280",borderRight:"1px solid #f3f4f6"}}'+s);
a('          '+d+'svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"'+s+d+'path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/'+s+d+'polyline points="16 6 12 2 8 6"/'+s+d+'line x1="12" y1="2" x2="12" y2="15"/'+s+d+'/svg'+s);
a('          {shared?"Paylaşıldı!":"Paylaş"}');
a('        '+d+'/button'+s);
// Kaydet
a('        '+d+'button onClick={onBookmark} style={{padding:"11px 16px",border:"none",background:"none",cursor:"pointer",color:post.bookmarked?"#1d3557":"#9ca3af"}}'+s);
a('          '+d+'svg width="16" height="16" fill={post.bookmarked?"#1d3557":"none"} stroke={post.bookmarked?"#1d3557":"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"'+s+d+'path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/'+s+d+'/svg'+s);
a('        '+d+'/button'+s);
a('      '+d+'/div'+s);

// Yorum bölümü
a('      {showC'+amp+amp+'('+d+'div style={{borderTop:"1px solid #f3f4f6",padding:"12px 16px",background:"#fafafa"}}'+s);
a('        {comments.map((c,i)=>('+d+'div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}'+s);
a('          '+d+'div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#e63946,#1d3557)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:700,flexShrink:0}}'+s+'AG'+d+'/div'+s);
a('          '+d+'div style={{background:"#fff",borderRadius:12,padding:"7px 12px",fontSize:13,color:"#1c1e21",flex:1,border:"1px solid #eef0f2",lineHeight:1.5}}'+s+'{c}'+d+'/div'+s);
a('        '+d+'/div'+s+'))}');
a('        '+d+'div style={{display:"flex",gap:8,alignItems:"center",marginTop:4}}'+s);
a('          '+d+'div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#e63946,#1d3557)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:700,flexShrink:0}}'+s+'AG'+d+'/div'+s);
a('          '+d+'input value={cTxt} onChange={e=>setCTxt(e.target.value)} onKeyDown={e=>e.key==="Enter"'+amp+amp+'doComment()} placeholder="Yorum yaz..." style={{flex:1,border:"1.5px solid #e5e7eb",borderRadius:20,padding:"8px 14px",fontSize:13,outline:"none",fontFamily:"inherit",background:"#fff",color:"#1c1e21"}}'+s+d+'/input'+s);
a('          '+d+'button onClick={doComment} disabled={!cTxt.trim()} style={{background:"#e63946",color:"#fff",border:"none",borderRadius:20,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer",opacity:cTxt.trim()?1:0.4,whiteSpace:"nowrap",flexShrink:0}}'+s+'Gönder'+d+'/button'+s);
a('        '+d+'/div'+s);
a('      '+d+'/div'+s+')}');
a('    '+d+'/div'+s);
a('  );');
a('}');

fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/src/components/PostCard.tsx',L.join('\n'),'utf8');
console.log('PostCard.tsx written, lines:',L.length);
