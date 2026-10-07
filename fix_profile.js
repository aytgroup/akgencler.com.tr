const fs=require('fs');
let c=fs.readFileSync('src/components/Sidebar.tsx','utf8');

// 1. Banner yüksekliğini artır
c=c.replace('height:70,background:"linear-gradient','height:80,background:"linear-gradient');

// 2. Avatar büyüt
c=c.replace('width="46" height="31"','width="60" height="40"');
c=c.replace('borderRadius:12,overflow:"hidden",border:"3px solid #fff",boxShadow:"0 2px 8px rgba(0,0,0,0.15)"',
            'borderRadius:14,overflow:"hidden",border:"3px solid #fff",boxShadow:"0 4px 14px rgba(0,0,0,0.18)",flexShrink:0');

// 3. Avatar+buton satırı: flex-end -> flex-start, marginTop düzelt
c=c.replace('alignItems:"flex-end",justifyContent:"space-between",marginTop:-22,marginBottom:12',
            'alignItems:"flex-start",justifyContent:"space-between",marginTop:-30,marginBottom:0');

// 4. "Profili Gör" butonuna üstten boşluk
c=c.replace('background:"#fff",transition:"all .2s"',
            'background:"#fff",transition:"all .2s",marginTop:10,flexShrink:0');

// 5. İsim bloğuna üstten margin
c=c.replace('fontWeight:800,fontSize:15,color:"#111827",margin:"0 0 2px"',
            'fontWeight:800,fontSize:15,color:"#111827",margin:"14px 0 3px"');

// 6. @akgenc_tr altındaki boşluk
c=c.replace('margin:"0 0 14px",fontWeight:400',
            'margin:"0 0 12px",fontWeight:400');

fs.writeFileSync('src/components/Sidebar.tsx',c,'utf8');
console.log('Profile card patched');
