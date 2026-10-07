const fs=require('fs');
const c=fs.readFileSync('src/components/PostCard.tsx','utf8');
const lines=c.split('\n');
for(let i=35;i<78;i++) process.stdout.write((i+1)+'|'+lines[i]+'\n');
