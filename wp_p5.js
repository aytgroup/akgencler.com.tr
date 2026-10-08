const fs = require('fs');
const p = 'c:/Users/agity/Desktop/akgencler.com.tr/src/app/profil/[id]/page.tsx';
let c = fs.readFileSync(p, 'utf8');

// Takipci modal
c += '      {followModal && <FollowersModal title={followModal === "followers" ? `Takip\u00e7iler (${user.followers.length})` : `Takip Edilenler (${user.following.length})`} userIds={followModal === "followers" ? user.followers : user.following} onClose={() => setFollowModal(null)} />}\n\n';

// Paylasim modal
c += '      {shareOpen && (\n';
c += '        <div onClick={() => setShareOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>\n';
c += '          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, padding: 28, width: 340, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>\n';
c += '            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>\n';
c += '              <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Profili Payla\u015f</h3>\n';
c += '              <button onClick={() => setShareOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>\u2715</button>\n            </div>\n';
c += '            <div style={{ background: "#f9fafb", borderRadius: 12, padding: "12px 16px", marginBottom: 16, wordBreak: "break-all", fontSize: 13, color: "#374151" }}>{profileUrl}</div>\n';
c += '            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>\n';
c += '              <button onClick={copyLink} style={{ padding: "12px 0", borderRadius: 12, border: "none", background: "#e63946", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>\uD83D\uDD17 Linki Kopyala</button>\n';
c += '              <button onClick={() => { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(user.name + " - AkGen\u00e7ler")}`, "_blank"); setShareOpen(false); }} style={{ padding: "12px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>\uD83D\uDC26 Twitter\'da Payla\u015f</button>\n';
c += '              <button onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(user.name + " - AkGen\u00e7ler: " + profileUrl)}`, "_blank"); setShareOpen(false); }} style={{ padding: "12px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>\uD83D\uDCAC WhatsApp\'ta Payla\u015f</button>\n';
c += '            </div>\n          </div>\n        </div>\n      )}\n\n';

fs.writeFileSync(p, c, 'utf8');
console.log('p5 ok:', c.length);
