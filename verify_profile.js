const fs=require('fs');
const c=fs.readFileSync('src/components/Sidebar.tsx','utf8');
const checks=[
  ['height:80','Banner yüksekliği 80px'],
  ['width="60" height="40"','Avatar 60x40'],
  ['flexShrink:0','Avatar flexShrink'],
  ['alignItems:"flex-start"','flex-start hizalama'],
  ['marginTop:-30','marginTop -30'],
  ['marginTop:10','Buton üst boşluk'],
  ['margin:"14px 0 3px"','İsim üst margin'],
];
checks.forEach(([str,label])=>{
  console.log((c.includes(str)?'✓':'✗'),label);
});
