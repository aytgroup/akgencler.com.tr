const fs = require('fs');
const p = 'c:/Users/agity/Desktop/akgencler.com.tr/src/app/profil/[id]/page.tsx';
let c = fs.readFileSync(p, 'utf8');

c += '      {editOpen && (\n';
c += '        <div onClick={() => setEditOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>\n';
c += '          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, padding: 28, width: 420, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>\n';
c += '            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>\n';
c += '              <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Profili D\u00fczenle</h3>\n';
c += '              <button onClick={() => setEditOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>\u2715</button>\n';
c += '            </div>\n';
c += '            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f3f4f6" }}>\n';
c += '              <div style={{ position: "relative", marginBottom: 10 }}>\n';
c += '                <div style={{ width: 96, height: 96, borderRadius: "50%", overflow: "hidden", border: "3px solid #e5e7eb" }}>\n';
c += '                  {profilePhoto ? <img src={profilePhoto} alt="av" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Avatar name={currentUser.name} size={96} color={currentUser.avatarColor} />}\n';
c += '                </div>\n';
c += '                <button onClick={() => avatarInputRef.current?.click()} style={{ position: "absolute", bottom: 0, right: 0, width: 30, height: 30, borderRadius: "50%", border: "2px solid #fff", background: "#e63946", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>\uD83D\uDCF7</button>\n';
c += '              </div>\n';
c += '              <div style={{ display: "flex", gap: 12 }}>\n';
c += '                <button onClick={() => avatarInputRef.current?.click()} style={{ background: "none", border: "none", color: "#e63946", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Foto\u011fraf\u0131 De\u011fi\u015ftir</button>\n';
c += '                {profilePhoto && <button onClick={() => { setProfilePhoto(null); showToast("Foto\u011fraf kald\u0131r\u0131ld\u0131"); }} style={{ background: "none", border: "none", color: "#9ca3af", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Kald\u0131r</button>}\n';
c += '              </div>\n            </div>\n';

fs.writeFileSync(p, c, 'utf8');
console.log('p6a ok:', c.length);
