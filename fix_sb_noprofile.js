const fs=require('fs');
let c=fs.readFileSync('src/components/Sidebar.tsx','utf8');

// Profil kartı bloğunu bul ve sil
// Başlangıç: ilk <div style={card}> 
// Bitiş: kapanış </div> (navigasyon div'inden önce)
// Pattern: banner div + içerik div ile birlikte

const cardStart='      '+String.fromCharCode(60)+'div style={card}'+String.fromCharCode(62);
const firstCard=c.indexOf(cardStart);
const secondCard=c.indexOf(cardStart, firstCard+1);

if(firstCard===-1||secondCard===-1){
  console.log('card markers not found');
  process.exit(1);
}

// firstCard'dan secondCard'a kadar olan bloğu sil
const removeBlock=c.slice(firstCard, secondCard);
console.log('Removing block length:',removeBlock.length,'chars');
c=c.replace(removeBlock,'');

fs.writeFileSync('src/components/Sidebar.tsx',c,'utf8');
console.log('Profile card removed OK');
