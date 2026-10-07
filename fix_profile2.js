const fs=require('fs');
let c=fs.readFileSync('src/components/Sidebar.tsx','utf8');

// İstatistik grid bloğunu sil (paddingTop:12'den kapanan </div>'e kadar)
// Pattern: div grid + map + kapanış
const statsStart=`          ${String.fromCharCode(60)}div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",paddingTop:12,borderTop:"1px solid #f3f4f6",textAlign:"center"}}${String.fromCharCode(62)}`;
const statsEnd=`          ${String.fromCharCode(60)}/div${String.fromCharCode(62)}`;

const si=c.indexOf(statsStart);
if(si===-1){console.log('stats block not found');process.exit(1);}

// statsEnd'i si'den sonra bul
const ei=c.indexOf(statsEnd,si);
if(ei===-1){console.log('stats end not found');process.exit(1);}

const removeBlock=c.slice(si, ei+statsEnd.length+1);
console.log('Removing block length:',removeBlock.length);
c=c.replace(removeBlock,'');

// @akgenc_tr margin'ini de temizle (artık son eleman)
c=c.replace('margin:"0 0 12px",fontWeight:400','margin:"0 0 0",fontWeight:400');

// padding bottom'u azalt (istatistik gitti)
c=c.replace('padding:"0 16px 16px"','padding:"0 16px 14px"');

fs.writeFileSync('src/components/Sidebar.tsx',c,'utf8');
console.log('Stats removed OK');
