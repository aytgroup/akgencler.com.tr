const fs=require('fs');
const c=fs.readFileSync('src/components/Navbar.tsx','utf8');
const lines=c.split('\n');
for(let i=68;i<90;i++) console.log((i+1)+'|'+lines[i]);
