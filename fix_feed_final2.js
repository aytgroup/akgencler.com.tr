const fs=require('fs');
const d=String.fromCharCode(60),s=String.fromCharCode(62),amp=String.fromCharCode(38);
const L=JSON.parse(fs.readFileSync('c:/Users/agity/Desktop/akgencler.com.tr/fix_feed_data.json','utf8'));
const a=t=>L.push(t);

// Posts listesi
a('      {dp.map((p,i)=>(');
a('        '+d+'div key={p.id} style={{animation:"fadeIn 0.3s ease both",animationDelay:`${i*0.05}s`}}'+s);
a('          '+d+'PostCard post={p} onLike={()=>like(p.id)} onBookmark={()=>bm(p.id)}/'+s);
a('        '+d+'/div'+s);
a('      ))}');
a('    '+d+'/div'+s);
a('  );');
a('}');

fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/src/components/Feed.tsx',L.join('\n'),'utf8');
console.log('Feed.tsx written, lines:',L.length);