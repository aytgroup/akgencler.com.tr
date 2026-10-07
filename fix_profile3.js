const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62);
let c=fs.readFileSync('src/components/Sidebar.tsx','utf8');

// Eski yapı: avatar+buton div, sonra isim p ve kullanici p ayrı ayrı
// Yeni yapı: avatar SOL + (isim+kullanici) ORTA + buton SAĞ hepsi tek flex row

const oldRow=
`          ${d}div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginTop:-30,marginBottom:0}}${s}
            ${d}div style={{borderRadius:14,overflow:"hidden",border:"3px solid #fff",boxShadow:"0 4px 14px rgba(0,0,0,0.18)",flexShrink:0}}${s}
              ${d}svg width="60" height="40" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}${s}
                ${d}rect width="900" height="600" fill="#E30A17"/${s}
                ${d}circle cx="300" cy="300" r="200" fill="white"/${s}
                ${d}circle cx="360" cy="300" r="160" fill="#E30A17"/${s}
                ${d}g transform="translate(530,300) rotate(-12)"${s}${d}polygon fill="white" points="0,-80 18.6,-57.2 59.5,-24.7 30.4,21.9 37.3,65.2 0,40 -37.3,65.2 -30.4,21.9 -59.5,-24.7 -18.6,-57.2"/${s}${d}/g${s}
              ${d}/svg${s}
            ${d}/div${s}
            ${d}Link href="/profil" style={{fontSize:11,fontWeight:600,color:"#374151",padding:"6px 14px",border:"1.5px solid #e5e7eb",borderRadius:20,textDecoration:"none",background:"#fff",transition:"all .2s",marginTop:10,flexShrink:0}}${s}Profili Gör${d}/Link${s}
          ${d}/div${s}
          ${d}div style={{marginTop:12,marginBottom:14}}${s}
            ${d}p style={{fontWeight:800,fontSize:15,color:"#111827",margin:"14px 0 3px",letterSpacing:"-0.3px"}}${s}Ak Genç${d}/p${s}
            ${d}p style={{fontSize:12,color:"#9ca3af",margin:"0 0 0",fontWeight:400}}${s}@akgenc_tr${d}/p${s}
          ${d}/div${s}`;

const newRow=
`          ${d}div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:-24,marginBottom:0,gap:10}}${s}
            ${d}div style={{borderRadius:50,overflow:"hidden",border:"3px solid #fff",boxShadow:"0 4px 14px rgba(0,0,0,0.18)",flexShrink:0,width:52,height:52,background:"#E30A17",display:"flex",alignItems:"center",justifyContent:"center"}}${s}
              ${d}svg width="52" height="52" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}${s}
                ${d}rect width="900" height="600" fill="#E30A17"/${s}
                ${d}circle cx="300" cy="300" r="200" fill="white"/${s}
                ${d}circle cx="360" cy="300" r="160" fill="#E30A17"/${s}
                ${d}g transform="translate(530,300) rotate(-12)"${s}${d}polygon fill="white" points="0,-80 18.6,-57.2 59.5,-24.7 30.4,21.9 37.3,65.2 0,40 -37.3,65.2 -30.4,21.9 -59.5,-24.7 -18.6,-57.2"/${s}${d}/g${s}
              ${d}/svg${s}
            ${d}/div${s}
            ${d}div style={{flex:1,minWidth:0}}${s}
              ${d}p style={{fontWeight:800,fontSize:14,color:"#111827",margin:"0 0 2px",letterSpacing:"-0.2px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}${s}Ak Genç${d}/p${s}
              ${d}p style={{fontSize:11.5,color:"#9ca3af",margin:0,fontWeight:400}}${s}@akgenc_tr${d}/p${s}
            ${d}/div${s}
            ${d}Link href="/profil" style={{fontSize:11,fontWeight:600,color:"#e63946",padding:"6px 12px",border:"1.5px solid #e63946",borderRadius:20,textDecoration:"none",background:"transparent",flexShrink:0,whiteSpace:"nowrap"}}${s}Takip Et${d}/Link${s}
          ${d}/div${s}`;

if(c.includes(oldRow)){
  c=c.replace(oldRow,newRow);
  console.log('Row replaced OK');
} else {
  console.log('Pattern not found, trying partial replace...');
  // Fallback: sadece avatar yuvarlak yap
  c=c.replace('borderRadius:14,overflow:"hidden"','borderRadius:50,overflow:"hidden"');
  c=c.replace('width="60" height="40"','width="52" height="52"');
  console.log('Partial replace done');
}

fs.writeFileSync('src/components/Sidebar.tsx',c,'utf8');
console.log('Done');
