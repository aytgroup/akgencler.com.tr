const fs = require('fs');
const p = 'c:/Users/agity/Desktop/akgencler.com.tr/src/app/profil/[id]/page.tsx';
let c = fs.readFileSync(p, 'utf8');

// Form alanlari
c += '            {([\n';
c += '              ["\u0130sim", editName, setEditName, "text", "Ad\u0131n\u0131z\u0131 girin"],\n';
c += '              ["Kullan\u0131c\u0131 Ad\u0131", editUsername, setEditUsername, "text", "@kullaniciadi"],\n';
c += '              ["Website", editWeb, setEditWeb, "url", "https://"],\n';
c += '              ["Konum", editLoc, setEditLoc, "text", "\u015eehir, \u00dclke"],\n';
c += '            ] as [string, string, (v: string) => void, string, string][]).map(([lbl, val, setter, type, ph]) => (\n';
c += '              <div key={lbl} style={{ marginBottom: 14 }}>\n';
c += '                <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>{lbl}</label>\n';
c += '                <input value={val} onChange={e => setter(e.target.value)} type={type} placeholder={ph}\n';
c += '                  style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", outline: "none", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" as const }}\n';
c += '                  onFocus={e => e.target.style.borderColor = "#e63946"} onBlur={e => e.target.style.borderColor = "#e5e7eb"} />\n';
c += '              </div>\n            ))}\n';
// Bio
c += '            <div style={{ marginBottom: 14 }}>\n';
c += '              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Bio</label>\n';
c += '              <textarea value={editBio} onChange={e => setEditBio(e.target.value)} maxLength={150} rows={3} placeholder="Kendinizi tan\u0131t\u0131n..."\n';
c += '                style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", outline: "none", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" as const, resize: "none" }}\n';
c += '                onFocus={e => e.target.style.borderColor = "#e63946"} onBlur={e => e.target.style.borderColor = "#e5e7eb"} />\n';
c += '              <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "right", margin: "4px 0 0" }}>{editBio.length}/150</p>\n';
c += '            </div>\n';
// Cinsiyet
c += '            <div style={{ marginBottom: 14 }}>\n';
c += '              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Cinsiyet</label>\n';
c += '              <select value={editGender} onChange={e => setEditGender(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", outline: "none", fontSize: 14, fontFamily: "inherit", background: "#fff", boxSizing: "border-box" as const }}>\n';
c += '                <option value="">Se\u00e7iniz</option>\n';
c += '                <option value="erkek">Erkek</option>\n';
c += '                <option value="kadin">Kad\u0131n</option>\n';
c += '                <option value="belirtmek-istemiyorum">Belirtmek \u0130stemiyorum</option>\n';
c += '              </select>\n            </div>\n';
// Dogum tarihi
c += '            <div style={{ marginBottom: 24 }}>\n';
c += '              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Do\u011fum Tarihi</label>\n';
c += '              <input type="date" value={editBirth} onChange={e => setEditBirth(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e5e7eb", outline: "none", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" as const }} />\n';
c += '            </div>\n';
// Kaydet iptal
c += '            <div style={{ display: "flex", gap: 10 }}>\n';
c += '              <button onClick={() => setEditOpen(false)} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "1px solid #e5e7eb", background: "#f9fafb", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>\u0130ptal</button>\n';
c += '              <button onClick={saveEdit} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "none", background: "#e63946", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Kaydet</button>\n';
c += '            </div>\n';
c += '          </div>\n        </div>\n      )}\n    </PageLayout>\n  );\n}\n';

fs.writeFileSync(p, c, 'utf8');
console.log('DONE. Bytes:', fs.statSync(p).size);