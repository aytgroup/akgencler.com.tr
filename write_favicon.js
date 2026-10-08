const fs = require('fs');

// Temiz SVG favicon - HTML entity yok, duz karakterler
const svg = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="7" fill="#C8102E"/>
  <circle cx="11" cy="16" r="6.5" fill="white"/>
  <circle cx="13" cy="16" r="5" fill="#C8102E"/>
  <polygon points="19,10 20,13.5 23.5,13.5 20.8,15.5 21.8,19 19,17 16.2,19 17.2,15.5 14.5,13.5 18,13.5" fill="white"/>
</svg>`;

fs.writeFileSync('c:/Users/agity/Desktop/akgencler.com.tr/public/favicon.svg', svg, 'utf8');
console.log('favicon.svg written OK');
console.log(svg);
